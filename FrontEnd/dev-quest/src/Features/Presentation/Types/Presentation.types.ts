export interface AreaCardItem {
  color: string;
  label: string;
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

export const DEFAULT_PRACTICE_CARDS: AreaCardItem[] = [
  {
    color: "#6559ff",
    label: "Desenvolvimento Web",
    image: "/images/Web_developer_typing_at_desk__web_.jpg",
    videoUrl: "/Video/Software_developer_web.mp4",
  },
  {
    color: "#14dbff",
    label: "Desenvolvimento Mobile",
    image: "/images/Woman_coding_at_desk_mobile2K_.jpg",
    videoUrl: "/Video/Woman_coding_at_desk_mobile1080p.mp4",
  },
  { color: "#ff3d52", label: "Data Science" },
];
