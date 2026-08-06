import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../supabase";
import { getProfile, type Profile } from "../api/profile";

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  /** Perfil em public.profiles — traz CRP, disponibilidade e o estado do onboarding. */
  profile: Profile | null;
  profileLoading: boolean;
  refreshProfile: () => Promise<void>;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    phone: string,
  ) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  updatePassword: (newPassword: string) => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  // Guarda para qual usuário o perfil em memória foi carregado. Derivar o
  // "carregando" disso evita uma janela de render em que a sessão já existe
  // mas o fetch do perfil ainda nem começou — nela o ProtectedRoute concluiria,
  // por engano, que o onboarding já estava concluído.
  const [loadedForUserId, setLoadedForUserId] = useState<string | null>(null);

  const userId = session?.user?.id ?? null;
  const profileLoading = userId !== null && loadedForUserId !== userId;

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!userId) {
      setProfile(null);
      setLoadedForUserId(null);
      return;
    }
    try {
      setProfile(await getProfile(userId));
    } catch {
      // Se o perfil não puder ser lido, não travamos o usuário fora do app.
      setProfile(null);
    } finally {
      setLoadedForUserId(userId);
    }
  }, [userId]);

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  async function signUp(email: string, password: string, fullName: string, phone: string) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, phone } },
    });
    return { error: error?.message ?? null };
  }

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  async function resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/redefinir-senha`,
    });
    return { error: error?.message ?? null };
  }

  async function updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    return { error: error?.message ?? null };
  }

  return (
    <AuthContext.Provider
      value={{
        user: session?.user ?? null,
        session,
        loading,
        profile,
        profileLoading,
        refreshProfile,
        signUp,
        signIn,
        signOut,
        resetPassword,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
