"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  WheelCarousel,
  type WheelCarouselItem,
  type WheelCarouselProps,
} from "@/components/ui/wheel-carousel";

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1200&q=80&auto=format&fit=crop`;

// Imagem icônica de Rack de Servidores idêntica à das imagens do usuário
export const DEFAULT_SERVER_RACK_IMAGE = unsplash("1558494949-ef010cbdcc31");

export const languageItems: WheelCarouselItem[] = [
  {
    label: "JavaScript",
    image: unsplash("1627398242454-45a1465c2479"),
    imageAlt: "JavaScript code on screen",
  },
  {
    label: "TypeScript",
    image: unsplash("1555066931-4365d14bab8c"),
    imageAlt: "TypeScript development",
  },
  {
    label: "Python",
    image: unsplash("1526379095098-d400fd0bf935"),
    imageAlt: "Python programming",
  },
  {
    label: "Java",
    image: unsplash("1517694712202-14dd9538aa97"),
    imageAlt: "Java code on laptop",
  },
  {
    label: "C#",
    image: unsplash("1542831371-29b0f74f9713"),
    imageAlt: "C Sharp development",
  },
  {
    label: "Go",
    image: unsplash("1607799279861-4dd421887fc8"),
    imageAlt: "Go programming language",
  },
  {
    label: "Rust",
    image: unsplash("1504639725590-34d0984f1a00"),
    imageAlt: "Rust language code",
  },
  {
    label: "C++",
    image: unsplash("1515879218367-8c267d8c4ee4"),
    imageAlt: "C++ development setup",
  },
  {
    label: "Ruby",
    image: unsplash("1461749280684-dccba630e2f6"),
    imageAlt: "Ruby on Rails development",
  },
  {
    label: "Swift",
    image: unsplash("1537432376149-e36472f57d16"),
    imageAlt: "Swift iOS development",
  },
  {
    label: "Kotlin",
    image: unsplash("1504868584819-f8e8b4b6d7e3"),
    imageAlt: "Kotlin Android development",
  },
  {
    label: "PHP",
    image: unsplash("1484417894086-9429432eae24"),
    imageAlt: "PHP web development",
  },
  {
    label: "Dart",
    image: unsplash("1519389950473-47ba0277781c"),
    imageAlt: "Dart Flutter development",
  },
  {
    label: "Scala",
    image: unsplash("1550439062-609e1833e76a"),
    imageAlt: "Scala functional programming",
  },
  {
    label: "R",
    image: unsplash("1551288049-bebda4e38f71"),
    imageAlt: "R data science",
  },
  {
    label: "Elixir",
    image: unsplash("1558494949-ef010cbdcc31"),
    imageAlt: "Elixir functional programming",
  },
  {
    label: "React",
    image: unsplash("1558494949-ef010cbdcc31"),
    imageAlt: "React functional programming",
  },
  {
    label: "React Native",
    image: unsplash("1558494949-ef010cbdcc31"),
    imageAlt: "React Native functional programming",
  },
  {
    label: "Next.js",
    image: unsplash("1558494949-ef010cbdcc31"),
    imageAlt: "Next.js functional programming",
  },
  {
    label: "HTML",
    image: unsplash("1558494949-ef010cbdcc31"),
    imageAlt: "HTML functional programming",
  },
  {
    label: "CSS",
    image: unsplash("1558494949-ef010cbdcc31"),
    imageAlt: "CSS functional programming",
  },
  {
    label: "Tailwind",
    image: unsplash("1558494949-ef010cbdcc31"),
    imageAlt: "Tailwind functional programming",
  },
  {
    label: "Bootstrap",
    image: unsplash("1558494949-ef010cbdcc31"),
    imageAlt: "Bootstrap functional programming",
  },
  {
    label: "Perl",
    image: unsplash("1558494949-ef010cbdcc31"),
    imageAlt: "Perl programming",
  },
  {
    label: "Node.js",
    image: unsplash("1558494949-ef010cbdcc31"),
    imageAlt: "Node.js programming",
  },
];

// Curadoria estrita de acordo com as imagens de referência do usuário
export const FRONTEND_LANGUAGES = [
  "Bootstrap",
  "Tailwind",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "HTML",
];

export const BACKEND_LANGUAGES = [
  "Perl",
  "Scala",
  "C++",
  "Node.js",
  "TypeScript",
  "Python",
  "Java",
  "C#",
  "Go",
  "Rust",
  "PHP",
  "Ruby",
  "Elixir",
];

export const AREA_LANGUAGES_MAP: Record<string, string[]> = {
  frontend: FRONTEND_LANGUAGES,
  backend: BACKEND_LANGUAGES,
  web: [...FRONTEND_LANGUAGES, ...BACKEND_LANGUAGES],
  mobile: [
    "Swift",
    "Kotlin",
    "Dart",
    "TypeScript",
    "JavaScript",
    "C#",
    "Java",
    "React Native",
  ],
  data: [
    "Python",
    "R",
    "Scala",
    "C++",
    "Rust",
  ],
};

export function getLanguagesByArea(
  areaLabel: string,
  stack?: "frontend" | "backend" | "fullstack",
  fullstackPhase: "frontend" | "backend" = "frontend"
): WheelCarouselItem[] {
  const normalized = areaLabel.toLowerCase();

  let allowedLabels: string[];
  if (normalized.includes("mobile")) {
    allowedLabels = AREA_LANGUAGES_MAP.mobile;
  } else if (
    normalized.includes("data") ||
    normalized.includes("dados") ||
    normalized.includes("science")
  ) {
    allowedLabels = AREA_LANGUAGES_MAP.data;
  } else {
    // Desenvolvimento Web
    if (stack === "frontend" || (stack === "fullstack" && fullstackPhase === "frontend")) {
      allowedLabels = AREA_LANGUAGES_MAP.frontend;
    } else if (stack === "backend" || (stack === "fullstack" && fullstackPhase === "backend")) {
      allowedLabels = AREA_LANGUAGES_MAP.backend;
    } else {
      allowedLabels = AREA_LANGUAGES_MAP.frontend;
    }
  }

  return allowedLabels
    .map((label) => languageItems.find((item) => item.label === label))
    .filter((item): item is WheelCarouselItem => item !== undefined);
}

export interface LanguageCarouselProps
  extends Omit<WheelCarouselProps, "items"> {
  items?: WheelCarouselItem[];
  stack?: "frontend" | "backend" | "fullstack";
  fullstackPhase?: "frontend" | "backend";
  centerImage?: string;
}

export function LanguageCarousel({
  items,
  stack,
  fullstackPhase = "frontend",
  centerImage = DEFAULT_SERVER_RACK_IMAGE,
  mode = "custom",
  background = "transparent",
  panelColor = "rgba(255, 255, 255, 0.08)",
  textColor = "rgba(255, 255, 255, 0.45)",
  selectedColor = "#ffffff",
  markerColor = "#6C63FF",
  photoAspect = "3/4",
  photoRadius = 18,
  photoWidth = 38,
  contentWidth = 960,
  onActiveChange,
  className,
  ...rest
}: LanguageCarouselProps) {
  // Determina a visualização ativa: "frontend" ou "backend"
  const currentView: "frontend" | "backend" = useMemo(() => {
    if (stack === "backend") return "backend";
    if (stack === "fullstack") return fullstackPhase;
    return "frontend";
  }, [stack, fullstackPhase]);

  // Se não forem passados itens customizados, resolve com base na stack/view
  const resolvedItems = useMemo(() => {
    if (items && items.length > 0) return items;
    return getLanguagesByArea("web", stack, fullstackPhase);
  }, [items, stack, fullstackPhase]);

  const isFrontEnd = currentView === "frontend";

  return (
    <div className={`relative w-full max-w-[1100px] flex items-center justify-center ${className || "h-[340px] sm:h-[380px]"}`}>
      {/* Container de 3 Colunas Perfeitamente Balanceadas com animação fluida de transição */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 220, damping: 26, mass: 0.9 }}
        className="w-full h-full flex items-center justify-center select-none"
      >
        {/* COLUNA ESQUERDA: Texto "FrontEnd" ou Wheel de "BackEnd" */}
        <div className="flex-1 h-full flex items-center justify-end overflow-hidden">
          <AnimatePresence mode="wait">
            {isFrontEnd ? (
              <motion.div
                key="frontend-label-col"
                initial={{ opacity: 0, x: -35 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -35 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full flex items-center justify-end pr-8 sm:pr-12"
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  FrontEnd
                </h3>
              </motion.div>
            ) : (
              <motion.div
                key="backend-wheel-col"
                initial={{ opacity: 0, x: -45 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -45 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="w-full h-full flex items-center justify-end"
              >
                <WheelCarousel
                  key={`wheel-backend-${resolvedItems.length}`}
                  items={resolvedItems}
                  wheelSide="left"
                  showPhoto={false}
                  mode={mode}
                  background="transparent"
                  panelColor={panelColor}
                  textColor={textColor}
                  selectedColor={selectedColor}
                  markerColor={markerColor}
                  contentWidth={360}
                  radius={280}
                  spacing={15}
                  visibleItems={5}
                  apexInset={22}
                  onActiveChange={onActiveChange}
                  {...rest}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* COLUNA CENTRAL: Foto Central (Rack de Servidores) como âncora fixa */}
        <motion.div
          layout
          className="shrink-0 h-[260px] sm:h-[300px] aspect-[3/4] rounded-[18px] overflow-hidden border border-white/10 shadow-2xl relative mx-3 sm:mx-6 z-20 bg-[#121422]/70"
        >
          <img
            src={centerImage}
            alt="Rack de servidores e infraestrutura"
            className="w-full h-full object-cover select-none pointer-events-none"
            draggable={false}
          />
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        </motion.div>

        {/* COLUNA DIREITA: Wheel de "FrontEnd" ou Texto "BackEnd" */}
        <div className="flex-1 h-full flex items-center justify-start overflow-hidden">
          <AnimatePresence mode="wait">
            {isFrontEnd ? (
              <motion.div
                key="frontend-wheel-col"
                initial={{ opacity: 0, x: 45 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 45 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="w-full h-full flex items-center justify-start"
              >
                <WheelCarousel
                  key={`wheel-frontend-${resolvedItems.length}`}
                  items={resolvedItems}
                  wheelSide="right"
                  showPhoto={false}
                  mode={mode}
                  background="transparent"
                  panelColor={panelColor}
                  textColor={textColor}
                  selectedColor={selectedColor}
                  markerColor={markerColor}
                  contentWidth={360}
                  radius={280}
                  spacing={15}
                  visibleItems={5}
                  apexInset={22}
                  onActiveChange={onActiveChange}
                  {...rest}
                />
              </motion.div>
            ) : (
              <motion.div
                key="backend-label-col"
                initial={{ opacity: 0, x: 35 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 35 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full flex items-center justify-start pl-8 sm:pl-12"
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  BackEnd
                </h3>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default LanguageCarousel;
