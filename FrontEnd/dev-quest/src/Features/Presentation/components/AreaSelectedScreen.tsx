"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Sparkles, Compass } from "lucide-react";
import { AreaCardItem } from "../types/presentation.types";

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
      className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 text-white transition-colors duration-700 overflow-hidden select-none"
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

      {/* Botão de voltar para reescolher área com alta visibilidade */}
      {onBack && (
        <button
          onClick={onBack}
          className={`absolute top-8 left-8 z-30 flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xl border border-white/20 text-white text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-2xl ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para áreas</span>
        </button>
      )}

      {/* Card de Conteúdo Prévio com Glassmorphism de alto contraste */}
      <div
        className={`relative z-20 flex flex-col items-center text-center max-w-xl w-full p-8 sm:p-12 rounded-3xl bg-black/45 backdrop-blur-2xl border border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.55)] transition-all duration-700 ease-out ${
          mounted
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-95"
        }`}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-white/10 border border-white/20 mb-6 text-white/90 shadow-inner">
          <Compass className="w-3.5 h-3.5 text-white" />
          <span>Trilha Escolhida</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow-md">
          {card.label}
        </h1>

        <p className="mt-4 text-white/85 text-sm sm:text-base leading-relaxed max-w-md">
          Você selecionou esta área. Esta tela está pronta para receber os próximos módulos, desafios e configurações da sua jornada.
        </p>

        <div className="mt-8 flex items-center gap-2 text-xs text-white/70 font-medium">
          <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
          <span>Conteúdo prévio carregado com sucesso</span>
        </div>
      </div>
    </div>
  );
}
