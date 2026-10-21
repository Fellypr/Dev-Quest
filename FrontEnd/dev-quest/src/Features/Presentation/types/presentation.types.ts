export interface AreaCardItem {
  color: string;
  label: string;
  linkUrl?: string;
}

export type PresentationStep =
  | "intro"
  | "selecting"
  | "zooming_in"
  | "selected"
  | "zooming_out";

export const DEFAULT_PRACTICE_CARDS: AreaCardItem[] = [
  { color: "#6559ff", label: "Desenvolvimento Web" },
  { color: "#14dbff", label: "Desenvolvimento Mobile" },
  { color: "#ff3d52", label: "Data Science" },
];
