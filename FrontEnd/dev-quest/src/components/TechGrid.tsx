import React from "react";
import { cn } from "@/lib/utils";
import {
  SiSpringboot,
  SiDotnet,
  SiNodedotjs,
  SiFastapi,
  SiDjango,
  SiLaravel,
  SiGo,
  SiRubyonrails,
  SiElixir,
  SiRust,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiVuedotjs,
  SiAngular,
  SiBootstrap,
  SiFlutter,
  SiDart,
  SiSwift,
  SiKotlin,
} from "react-icons/si";

export interface TechItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  paddingClass?: string;
  color?: string;
}

export const DEFAULT_BACKEND_TECH_LIST: TechItem[] = [
  {
    id: "spring-boot",
    name: "Spring Boot",
    icon: SiSpringboot,
    paddingClass: "py-4 px-[2px]",
    color: "#6DB33F",
  },
  {
    id: "aspnet-core",
    name: "ASP.NET Core",
    icon: SiDotnet,
    paddingClass: "py-4 px-[2px]",
    color: "#512BD4",
  },
  {
    id: "nodejs",
    name: "Node.js",
    icon: SiNodedotjs,
    paddingClass: "py-[11px] px-[2px]",
    color: "#5FA04E",
  },
  {
    id: "fastapi",
    name: "FastAPI",
    icon: SiFastapi,
    paddingClass: "py-4 px-[2px]",
    color: "#009688",
  },
  {
    id: "django",
    name: "Django",
    icon: SiDjango,
    paddingClass: "py-4 px-[2px]",
    color: "#092E20",
  },
  {
    id: "laravel",
    name: "Laravel",
    icon: SiLaravel,
    paddingClass: "py-4 px-[2px]",
    color: "#FF2D20",
  },
  {
    id: "go",
    name: "Go",
    icon: SiGo,
    paddingClass: "py-[11px] px-[2px]",
    color: "#00ADD8",
  },
  {
    id: "ruby-on-rails",
    name: "Ruby on Rails",
    icon: SiRubyonrails,
    paddingClass: "py-4 px-[2px]",
    color: "#D30001",
  },
  {
    id: "elixir-phoenix",
    name: "Elixir / Phoenix",
    icon: SiElixir,
    paddingClass: "py-4 px-[2px]",
    color: "#4B275F",
  },
  {
    id: "rust",
    name: "Rust",
    icon: SiRust,
    paddingClass: "py-4 px-[2px]",
    color: "#DEA584",
  },
];

export const DEFAULT_FRONTEND_TECH_LIST: TechItem[] = [
  {
    id: "react",
    name: "React",
    icon: SiReact,
    paddingClass: "py-4 px-[2px]",
    color: "#61DAFB",
  },
  {
    id: "nextjs",
    name: "Next.js",
    icon: SiNextdotjs,
    paddingClass: "py-4 px-[2px]",
    color: "#FFFFFF",
  },
  {
    id: "html5",
    name: "HTML5",
    icon: SiHtml5,
    paddingClass: "py-4 px-[2px]",
    color: "#E34F26",
  },
  {
    id: "vuejs",
    name: "Vue.js",
    icon: SiVuedotjs,
    paddingClass: "py-4 px-[2px]",
    color: "#4FC08D",
  },
  {
    id: "angular",
    name: "Angular",
    icon: SiAngular,
    paddingClass: "py-4 px-[2px]",
    color: "#DD0031",
  },
];

export const DEFAULT_MOBILE_TECH_LIST: TechItem[] = [
  {
    id: "flutter",
    name: "Flutter",
    icon: SiFlutter,
    paddingClass: "py-4 px-[2px]",
    color: "#02569B",
  },
  {
    id: "react-native",
    name: "React Native",
    icon: SiReact,
    paddingClass: "py-4 px-[2px]",
    color: "#61DAFB",
  },
  {
    id: "swift",
    name: "Swift",
    icon: SiSwift,
    paddingClass: "py-4 px-[2px]",
    color: "#F05138",
  },
  {
    id: "kotlin",
    name: "Kotlin",
    icon: SiKotlin,
    paddingClass: "py-4 px-[2px]",
    color: "#7F52FF",
  },
  {
    id: "dart",
    name: "Dart",
    icon: SiDart,
    paddingClass: "py-4 px-[2px]",
    color: "#0175C2",
  },
];

export function getTechListByArea(
  areaLabel: string,
  stack?: "frontend" | "backend" | "fullstack",
  fullstackPhase: "frontend" | "backend" = "frontend"
): TechItem[] {
  const normalized = areaLabel.toLowerCase();

  if (normalized.includes("mobile")) {
    return DEFAULT_MOBILE_TECH_LIST;
  }

  // Desenvolvimento Web
  if (stack === "frontend" || (stack === "fullstack" && fullstackPhase === "frontend")) {
    return DEFAULT_FRONTEND_TECH_LIST;
  }

  if (stack === "backend" || (stack === "fullstack" && fullstackPhase === "backend")) {
    return DEFAULT_BACKEND_TECH_LIST;
  }

  return DEFAULT_FRONTEND_TECH_LIST;
}

export interface TechGridProps {
  items?: TechItem[];
  selectedId?: string | string[];
  onSelect?: (item: TechItem) => void;
  className?: string;
  cardClassName?: string;
}

export function TechGrid({
  items = DEFAULT_BACKEND_TECH_LIST,
  selectedId,
  onSelect,
  className,
  cardClassName,
}: TechGridProps) {
  const isSelected = (item: TechItem) => {
    if (!selectedId) return false;
    if (Array.isArray(selectedId)) {
      return selectedId.includes(item.id) || selectedId.includes(item.name);
    }
    return selectedId === item.id || selectedId === item.name;
  };

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-4 w-full max-w-[706px]",
        className
      )}
    >
      {items.map((item) => {
        const Icon = item.icon;
        const active = isSelected(item);

        return (
          <div
            key={item.id}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            onClick={() => onSelect?.(item)}
            onKeyDown={(e) => {
              if (onSelect && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                onSelect(item);
              }
            }}
            className={cn(
              "w-[100px] flex flex-col items-center justify-center gap-[5px]",
              "rounded-[20px] bg-white/[0.08] border border-white/10",
              "shadow-[0_8px_16px_-6px_rgba(0,0,0,0.2)]",
              "transition-all duration-200 backdrop-blur-sm",
              item.paddingClass || "py-4 px-[2px]",
              onSelect && "cursor-pointer hover:scale-105 hover:bg-white/[0.14] hover:border-white/25 active:scale-95",
              active && "border-brand-violet bg-white/[0.18] ring-2 ring-brand-violet/50 shadow-lg",
              cardClassName
            )}
          >
            <div className="w-[50px] h-[40px] flex items-center justify-center">
              <Icon
                className="w-full h-full object-contain transition-colors"
                style={{ color: active ? item.color || "#ffffff" : "#ffffff" }}
              />
            </div>
            <span className="text-[13px] font-bold leading-[17px] text-white text-center select-none px-1">
              {item.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default TechGrid;
