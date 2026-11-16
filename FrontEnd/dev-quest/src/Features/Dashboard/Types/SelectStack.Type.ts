export type StackOptionId = "frontend" | "backend" | "fullstack";

export type StackAccentColor = "cyan" | "green" | "purple";

export interface StackCardData {
  id: StackOptionId;
  title: string;
  badgeText: string;
  color: StackAccentColor;
  description: string;
  icon: string;
  pillars: string[];
}

export interface SelectStackViewProps {
  onBack: () => void;
  onContinue?: (selectedStack: StackOptionId) => void;
  initialStack?: StackOptionId;
}
