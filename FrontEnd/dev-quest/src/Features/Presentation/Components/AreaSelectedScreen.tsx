"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { AreaCardItem } from "../Types/Presentation.types";
import { CardStacks } from "./CardStacks";
import { LanguageCarousel } from "@/components/LanguageCarousel";

interface AreaSelectedScreenProps {
  card: AreaCardItem;
  onBack?: () => void;
  onComplete?: (data: { level: string; language: string; card: AreaCardItem }) => void;
}

const DEFAULT_VIDEOS: Record<string, string> = {
  "Desenvolvimento Web": "/Video/Software_developer_web.mp4",
  "Desenvolvimento Mobile": "/Video/Woman_coding_at_desk_mobile1080p.mp4",
};

export function AreaSelectedScreen({
  card,
  onBack,
  onComplete,
}: AreaSelectedScreenProps) {
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState<"experience" | "language">("experience");
  const [selectedLevel, setSelectedLevel] = useState<string>("estagiario");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("JavaScript");

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

  const handleContinueExperience = (level: string) => {
    setSelectedLevel(level);
    setCurrentStep("language");
  };

  const handleContinueLanguage = () => {
    onComplete?.({
      level: selectedLevel,
      language: selectedLanguage,
      card,
    });
  };

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

      {/* Conteúdo com transição suave entre Experiência e Linguagem */}
      <div
        className={`relative z-20 w-full flex flex-col items-center transition-opacity duration-500 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <AnimatePresence mode="wait">
          {currentStep === "experience" ? (
            <motion.div
              key="experience-step"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-full flex flex-col items-center"
            >
              <CardStacks
                initialLevel={selectedLevel}
                onContinue={handleContinueExperience}
                onBack={onBack}
              />
            </motion.div>
          ) : (
            <motion.div
              key="language-step"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-full flex flex-col items-center justify-center py-4"
            >
              {/* Título e Subtítulo */}
              <div className="max-w-[750px] w-full text-center flex flex-col items-center mb-4 sm:mb-6">
                <h2 className="text-3xl sm:text-[40px] leading-tight sm:leading-[44px] font-bold text-white tracking-tight">
                  Qual tecnologia você quer praticar?
                </h2>
                <p className="mt-3.5 max-w-[580px] text-sm sm:text-base leading-5 font-medium text-[#A9A9A9]">
                  Escolha a linguagem principal para calibrar seus desafios e jornadas.
                </p>
              </div>

              {/* LanguageCarousel centralizado com fundo transparente sobre o vídeo */}
              <div className="w-full max-w-[960px] flex items-center justify-center">
                <LanguageCarousel
                  background="transparent"
                  className="h-[460px] sm:h-[500px]"
                  onActiveChange={(item) => setSelectedLanguage(item.label)}
                />
              </div>

              {/* Ações Inferiores: Continuar e Voltar */}
              <div className="mt-6 flex flex-col items-center w-full max-w-[370px]">
                <button
                  onClick={handleContinueLanguage}
                  className="w-full h-[51px] rounded-[26px] bg-[#5B4FCF] hover:bg-[#6C60E0] active:scale-[0.98] transition-all flex items-center justify-center gap-3.5 text-white font-semibold text-[15px] cursor-pointer shadow-lg shadow-[#5B4FCF]/30"
                >
                  <span>Continuar</span>
                  <Image
                    src="/images/experience/arrow-right.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                </button>

                <button
                  onClick={() => setCurrentStep("experience")}
                  className="mt-4 flex items-center justify-center gap-1.5 text-[#d1d1d1c8] hover:text-white transition-colors text-[13px] font-medium cursor-pointer py-1 px-3"
                >
                  <Image
                    src="/images/experience/arrow-left.svg"
                    alt=""
                    width={14}
                    height={14}
                  />
                  <span>Voltar</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
