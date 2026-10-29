export interface AreaCardItem {
  color: string;
  themeColor?: string;
  label: string;
  flag?: string;
  stats?: string;
  linkUrl?: string;
  image?: string;
  videoUrl?: string;
}

export type PresentationStep =
  | "intro"
  | "selecting"
  | "zooming_in"
  | "selected"
  | "zooming_out";

export type ExperienceLevelId =
  | "estagiario"
  | "junior"
  | "pleno"
  | "senior";

export type StackOptionId = "frontend" | "backend" | "fullstack";

export interface StackOption {
  id: StackOptionId;
  title: string;
  description: string;
  backgroundImage: string;
  color: string;
}

export const STACK_OPTIONS: StackOption[] = [
  {
    id: "frontend",
    title: "Front-End",
    description:
      "Foco em interfaces, experiência do usuário e tecnologias como HTML, CSS, React e JavaScript.",
    backgroundImage: "/images/Web_developer_typing_at_desk__web_.jpg",
    color: "#6C63FF",
  },
  {
    id: "backend",
    title: "Back-End",
    description:
      "Foco em lógica de serviços, banco de dados, APIs e tecnologias como Node.js, Python e SQL.",
    backgroundImage: "/images/backend_developer_desk.jpg",
    color: "#00d2df",
  },
  {
    id: "fullstack",
    title: "Full-Stack",
    description:
      "Domínio de ambas as pontas, integrando o visual e a lógica de servidores com a lógica de dados.",
    backgroundImage: "/images/fullstack_developer_desk.jpg",
    color: "#8b5cf6",
  },
];

export interface UserOnboardingPreferences {
  area: AreaCardItem;
  level: ExperienceLevelId | string;
  stack?: StackOptionId;
  language: string;
  secondaryLanguage?: string;
  completedAt?: string;
}

export const DEFAULT_PRACTICE_CARDS: AreaCardItem[] = [
  {
    color: "#6559ff",
    themeColor: "248 80% 65%",
    label: "Desenvolvimento Web",
    flag: "🌐",
    stats: "Front-End • Back-End • Full-Stack",
    image: "/images/Web_developer_typing_at_desk__web_.jpg",
    videoUrl: "/Video/Software_developer_web.mp4",
  },
  {
    color: "#14dbff",
    themeColor: "190 95% 50%",
    label: "Desenvolvimento Mobile",
    flag: "📱",
    stats: "iOS • Android • React Native",
    image: "/images/Woman_coding_at_desk_mobile2K_.jpg",
    videoUrl: "/Video/Woman_coding_at_desk_mobile1080p.mp4",
  },
];
