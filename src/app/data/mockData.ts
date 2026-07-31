export interface Appointment {
  id: string;
  initials: string;
  name: string;
  time: string;
  platform: string;
  badge: string;
  badgeType: "primary" | "return" | "rescheduled";
  highlighted?: boolean;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: "session" | "cancel" | "new" | "reminder";
}

// ===== PATIENTS DATA =====

export interface Patient {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  age: number;
  gender: "Feminino" | "Masculino" | "Outro";
  status: "ativo" | "inativo" | "pausado";
  modality: "Online" | "Presencial" | "Híbrido";
  startDate: string;
  lastSession: string | null;
  nextSession: string | null;
  totalSessions: number;
  frequency: "Semanal" | "Quinzenal" | "Mensal" | "Sob demanda";
  notes: string;
}

export const patients: Patient[] = [
  {
    id: "p1",
    name: "Roberto Costa",
    initials: "RC",
    email: "roberto.costa@email.com",
    phone: "(11) 98765-4321",
    age: 34,
    gender: "Masculino",
    status: "ativo",
    modality: "Online",
    startDate: "2025-08-15",
    lastSession: "2026-02-28",
    nextSession: "2026-03-03",
    totalSessions: 28,
    frequency: "Semanal",
    notes: "Ansiedade generalizada. Boa evolução nas últimas sessões.",
  },
  {
    id: "p2",
    name: "João Oliveira",
    initials: "JO",
    email: "joao.oliveira@email.com",
    phone: "(11) 91234-5678",
    age: 29,
    gender: "Masculino",
    status: "ativo",
    modality: "Online",
    startDate: "2025-06-10",
    lastSession: "2026-02-26",
    nextSession: "2026-03-04",
    totalSessions: 38,
    frequency: "Semanal",
    notes: "Depressão leve. Acompanhamento com psiquiatra.",
  },
  {
    id: "p3",
    name: "Paula Monteiro",
    initials: "PM",
    email: "paula.monteiro@email.com",
    phone: "(21) 99876-5432",
    age: 42,
    gender: "Feminino",
    status: "ativo",
    modality: "Presencial",
    startDate: "2025-11-03",
    lastSession: "2026-02-20",
    nextSession: "2026-03-05",
    totalSessions: 14,
    frequency: "Quinzenal",
    notes: "Questões de relacionamento. Remarcou última sessão.",
  },
  {
    id: "p4",
    name: "Carla Ferreira",
    initials: "CF",
    email: "carla.ferreira@email.com",
    phone: "(11) 97654-3210",
    age: 26,
    gender: "Feminino",
    status: "ativo",
    modality: "Online",
    startDate: "2025-09-22",
    lastSession: "2026-02-27",
    nextSession: "2026-03-06",
    totalSessions: 22,
    frequency: "Semanal",
    notes: "Síndrome do pânico. Melhora significativa.",
  },
  {
    id: "p5",
    name: "Ana Souza",
    initials: "AS",
    email: "ana.souza@email.com",
    phone: "(11) 98321-6547",
    age: 38,
    gender: "Feminino",
    status: "ativo",
    modality: "Presencial",
    startDate: "2025-04-12",
    lastSession: "2026-03-01",
    nextSession: "2026-03-08",
    totalSessions: 46,
    frequency: "Semanal",
    notes: "Burnout profissional. Transição de carreira.",
  },
  {
    id: "p6",
    name: "Marcos Lima",
    initials: "ML",
    email: "marcos.lima@email.com",
    phone: "(21) 99123-4567",
    age: 51,
    gender: "Masculino",
    status: "ativo",
    modality: "Híbrido",
    startDate: "2025-10-07",
    lastSession: "2026-02-25",
    nextSession: "2026-03-04",
    totalSessions: 18,
    frequency: "Semanal",
    notes: "Luto. Processo de elaboração em andamento.",
  },
  {
    id: "p7",
    name: "Lucas Ribeiro",
    initials: "LR",
    email: "lucas.ribeiro@email.com",
    phone: "(11) 96543-2109",
    age: 22,
    gender: "Masculino",
    status: "ativo",
    modality: "Online",
    startDate: "2026-01-14",
    lastSession: "2026-02-28",
    nextSession: "2026-03-07",
    totalSessions: 7,
    frequency: "Semanal",
    notes: "Autoestima e insegurança. Paciente novo, boa adesão.",
  },
  {
    id: "p8",
    name: "Fernanda Dias",
    initials: "FD",
    email: "fernanda.dias@email.com",
    phone: "(11) 95432-1098",
    age: 33,
    gender: "Feminino",
    status: "pausado",
    modality: "Online",
    startDate: "2025-05-20",
    lastSession: "2026-01-15",
    nextSession: null,
    totalSessions: 32,
    frequency: "Quinzenal",
    notes: "Fobia social. Pausou por viagem ao exterior. Retorna em abril.",
  },
  {
    id: "p9",
    name: "Thiago Mendes",
    initials: "TM",
    email: "thiago.mendes@email.com",
    phone: "(21) 98765-1234",
    age: 45,
    gender: "Masculino",
    status: "inativo",
    modality: "Presencial",
    startDate: "2024-11-05",
    lastSession: "2025-09-30",
    nextSession: null,
    totalSessions: 44,
    frequency: "Semanal",
    notes: "Concluiu tratamento. Alta terapêutica.",
  },
  {
    id: "p10",
    name: "Beatriz Almeida",
    initials: "BA",
    email: "beatriz.almeida@email.com",
    phone: "(11) 94321-0987",
    age: 28,
    gender: "Feminino",
    status: "inativo",
    modality: "Online",
    startDate: "2025-03-18",
    lastSession: "2025-11-20",
    nextSession: null,
    totalSessions: 35,
    frequency: "Semanal",
    notes: "Transtorno alimentar. Abandonou tratamento. Tentar retomar contato.",
  },
  {
    id: "p11",
    name: "Renata Vieira",
    initials: "RV",
    email: "renata.vieira@email.com",
    phone: "(11) 93210-9876",
    age: 37,
    gender: "Feminino",
    status: "ativo",
    modality: "Online",
    startDate: "2025-07-01",
    lastSession: "2026-03-02",
    nextSession: "2026-03-09",
    totalSessions: 34,
    frequency: "Semanal",
    notes: "Ansiedade e TOC. Encaminhada pelo psiquiatra.",
  },
  {
    id: "p12",
    name: "Gabriel Santos",
    initials: "GS",
    email: "gabriel.santos@email.com",
    phone: "(21) 97654-3210",
    age: 19,
    gender: "Masculino",
    status: "ativo",
    modality: "Online",
    startDate: "2026-02-01",
    lastSession: "2026-02-27",
    nextSession: "2026-03-06",
    totalSessions: 4,
    frequency: "Semanal",
    notes: "Adolescente tardio. Orientação vocacional e autoconhecimento.",
  },
];

export const notifications: Notification[] = [
  {
    id: "1",
    title: "Sessão em 30 minutos",
    description: "Roberto Costa - Google Meet",
    time: "Agora",
    read: false,
    type: "reminder",
  },
  {
    id: "2",
    title: "Sessão cancelada",
    description: "Maria Santos cancelou a sessão de amanhã",
    time: "Há 2h",
    read: false,
    type: "cancel",
  },
  {
    id: "3",
    title: "Novo paciente cadastrado",
    description: "Lucas Ribeiro realizou o pré-cadastro",
    time: "Há 5h",
    read: false,
    type: "new",
  },
  {
    id: "4",
    title: "Sessão remarcada",
    description: "Paula Monteiro remarcou para 25/12",
    time: "Ontem",
    read: true,
    type: "session",
  },
  {
    id: "5",
    title: "Lembrete de pagamento",
    description: "3 pacientes com pagamento pendente",
    time: "Ontem",
    read: true,
    type: "reminder",
  },
];
