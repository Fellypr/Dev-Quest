"use client";

import { STACK_OPTIONS, StackOptionId } from "../Types/Presentation.types";

interface DynamicBackgroundProps {
  activeStack?: StackOptionId | null;
  videoUrl?: string;
  cardColor?: string;
}

export function DynamicBackground({
  activeStack = "fullstack",
  videoUrl,
  cardColor = "#6559ff",
}: DynamicBackgroundProps) {
  const currentStack =
    STACK_OPTIONS.find((s) => s.id === activeStack) || STACK_OPTIONS[2];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Imagens de fundo temáticas com transição suave de opacidade */}
      {STACK_OPTIONS.map((stack) => {
        const isActive = currentStack.id === stack.id;
        return (
          <div
            key={stack.id}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{
              opacity: isActive ? 1 : 0,
            }}
          >
            {/* Imagem direta de alta resolução sem atraso de otimizador */}
            <img
              src={stack.backgroundImage}
              alt={stack.title}
              className="w-full h-full object-cover"
            />
          </div>
        );
      })}

      {/* Camada translúcida atmosférica para manter a arte perfeitamente legível sem perder a vivacidade */}
      <div className="absolute inset-0 bg-[#040714]/55 backdrop-blur-[0.5px]" />

      {/* Tonalidade sutil da cor da stack ou card para brilho imersivo */}
      <div
        className="absolute inset-0 opacity-15 mix-blend-overlay transition-colors duration-700"
        style={{ backgroundColor: currentStack.color || cardColor }}
      />
    </div>
  );
}

export default DynamicBackground;
