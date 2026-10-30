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
} from "react-icons/si";

export interface TechItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
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
  const isSelected = (id: string) => {
    if (!selectedId) return false;
    return Array.isArray(selectedId) ? selectedId.includes(id) : selectedId === id;
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
        const active = isSelected(item.id);

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
              <Icon className="w-full h-full text-white object-contain transition-colors" />
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

