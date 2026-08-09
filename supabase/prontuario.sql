-- Prontuário — migration
-- Rodar no SQL Editor do Supabase. Idempotente: pode rodar mais de uma vez.

-- ---------------------------------------------------------------------------
-- 1) Novo status "realizada" em sessions
-- ---------------------------------------------------------------------------
-- Remove qualquer CHECK antigo sobre status (o nome varia conforme como a
-- tabela foi criada), para poder recriá-lo já com 'completed'.
do $$
declare c record;
begin
  for c in
    select conname
    from pg_constraint
    where conrelid = 'public.sessions'::regclass
      and contype = 'c'
      and pg_get_constraintdef(oid) ilike '%status%'
  loop
    execute format('alter table public.sessions drop constraint %I', c.conname);
  end loop;
end $$;

alter table public.sessions
  add constraint sessions_status_check
  check (status in ('confirmed', 'pending', 'cancelled', 'first', 'completed', 'blocked'));

-- ---------------------------------------------------------------------------
-- 2) Registros do prontuário
-- ---------------------------------------------------------------------------
create table if not exists public.patient_records (
  id          uuid primary key default gen_random_uuid(),
  owner_id    uuid not null references auth.users(id) on delete cascade,
  patient_id  uuid not null references public.patients(id) on delete cascade,
  -- Registro pode não ter sessão (falta, contato fora de sessão, encerramento).
  session_id  uuid references public.sessions(id) on delete set null,

  type        text not null default 'evolucao'
              check (type in ('evolucao', 'avulso', 'encerramento')),
  content     text not null default '',
  is_draft    boolean not null default true,
  record_date date not null default current_date,

  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists patient_records_patient_idx
  on public.patient_records (patient_id, record_date desc, created_at desc);

-- ---------------------------------------------------------------------------
-- 3) RLS — mesmo padrão de patients/sessions
-- ---------------------------------------------------------------------------
alter table public.patient_records enable row level security;

drop policy if exists "records_select_own" on public.patient_records;
drop policy if exists "records_insert_own" on public.patient_records;
drop policy if exists "records_update_own" on public.patient_records;
drop policy if exists "records_delete_own" on public.patient_records;

create policy "records_select_own" on public.patient_records
  for select using (owner_id = auth.uid());

create policy "records_insert_own" on public.patient_records
  for insert with check (owner_id = auth.uid());

create policy "records_update_own" on public.patient_records
  for update using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create policy "records_delete_own" on public.patient_records
  for delete using (owner_id = auth.uid());
