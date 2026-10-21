"use client";

import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { AreaCardItem } from "../types/presentation.types";
import { CardStacks } from "./CardStacks";

interface AreaSelectedScreenProps {
  card: AreaCardItem;
  onBack?: () => void;
}

export function AreaSelectedScreen({ card, onBack }: AreaSelectedScreenProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 text-white transition-colors duration-700 overflow-y-auto overflow-x-hidden select-none"
      style={{
        backgroundColor: card.color,
      }}
    >
      {/* Luz ambiente e gradiente para profundidade estética sem perder a cor base */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply"
        style={{
          background:
            "radial-gradient(circle at 50% 25%, rgba(255,255,255,0.25) 0%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Componente CardStacks 2x2 fiel ao Figma */}
      <div
        className={`relative z-20 w-full flex flex-col items-center transition-all duration-700 ease-out ${
          mounted
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-95"
        }`}
      >
        <CardStacks onBack={onBack} />
      </div>
    </div>
  );
}
