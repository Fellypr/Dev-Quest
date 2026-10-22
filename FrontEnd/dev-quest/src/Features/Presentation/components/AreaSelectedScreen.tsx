"use client";

import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { AreaCardItem } from "../types/presentation.types";
import { CardStacks } from "./CardStacks";

interface AreaSelectedScreenProps {
  card: AreaCardItem;
  onBack?: () => void;
}

const DEFAULT_VIDEOS: Record<string, string> = {
  "Desenvolvimento Web": "/Video/Software_developer_web.mp4",
  "Desenvolvimento Mobile": "/Video/Woman_coding_at_desk_mobile1080p.mp4",
};

export function AreaSelectedScreen({ card, onBack }: AreaSelectedScreenProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(timer);
  }, []);

  const videoUrl =
    card.videoUrl ||
    DEFAULT_VIDEOS[card.label] ||
    (card.label.toLowerCase().includes("web")
      ? "/Video/Software_developer_web.mp4"
      : card.label.toLowerCase().includes("mobile")
        ? "/Video/Woman_coding_at_desk_mobile1080p.mp4"
        : undefined);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 text-white overflow-y-auto overflow-x-hidden select-none bg-[#020308]">
      {/* Plano de fundo com vídeo rodando infinitamente sem som */}
      {videoUrl ? (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
          {/* Overlay escuro para contraste e nitidez com os cards */}
          <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px]" />
          <div
            className="absolute inset-0 opacity-15 mix-blend-overlay"
            style={{ backgroundColor: card.color }}
          />
        </div>
      ) : (
        <div
          className="fixed inset-0 pointer-events-none z-0 transition-colors duration-700"
          style={{ backgroundColor: card.color }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-40 mix-blend-multiply"
            style={{
              background:
                "radial-gradient(circle at 50% 25%, rgba(255,255,255,0.25) 0%, rgba(0,0,0,0.7) 100%)",
            }}
          />
        </div>
      )}

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
