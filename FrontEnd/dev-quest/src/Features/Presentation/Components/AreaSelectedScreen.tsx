"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  AreaCardItem,
  StackOptionId,
  UserOnboardingPreferences,
} from "../Types/Presentation.types";
import { CardStacks } from "./CardStacks";
import { StackSelection } from "./StackSelection";
import { DynamicBackground } from "./DynamicBackground";
import {
  TechGrid,
  getTechListByArea,
  type TechItem,
} from "@/components/TechGrid";

interface AreaSelectedScreenProps {
  card: AreaCardItem;
  onBack?: () => void;
  onComplete?: (data: UserOnboardingPreferences) => void;
  initialLevel?: string;
  initialLanguage?: string;
}

const DEFAULT_VIDEOS: Record<string, string> = {
  "Desenvolvimento Web": "/Video/Software_developer_web.mp4",
  "Desenvolvimento Mobile": "/Video/Woman_coding_at_desk_mobile1080p.mp4",
};

export function AreaSelectedScreen({
  card,
  onBack,
  onComplete,
  initialLevel = "estagiario",
  initialLanguage,
}: AreaSelectedScreenProps) {
  const [mounted, setMounted] = useState(false);
  const isWebTrack = card.label.toLowerCase().includes("web");

  // Passos: "experience" -> "stack" (apenas se web) -> "language"
  const [currentStep, setCurrentStep] = useState<"experience" | "stack" | "language">(
    "experience"
  );
  const [selectedLevel, setSelectedLevel] = useState<string>(initialLevel);
  const [selectedStack, setSelectedStack] = useState<StackOptionId | undefined>(
    isWebTrack ? "fullstack" : undefined
  );

  // Para o fluxo Full-Stack (apenas em Web): 1º FrontEnd -> 2º BackEnd
  const [fullstackPhase, setFullstackPhase] = useState<"frontend" | "backend">(
    "frontend"
  );

  const [frontendLang, setFrontendLang] = useState<string>(
    initialLanguage || "React"
  );
  const [backendLang, setBackendLang] = useState<string>("Node.js");
  const [generalLang, setGeneralLang] = useState<string>(() => {
    if (initialLanguage) return initialLanguage;
    const items = getTechListByArea(card.label);
    return items[0]?.name || "Flutter";
  });

  const isFullstack = isWebTrack && selectedStack === "fullstack";

  // Filtra as tecnologias apropriadas para a etapa atual
  const currentTechItems = useMemo(() => {
    return getTechListByArea(card.label, isWebTrack ? selectedStack : undefined, fullstackPhase);
  }, [card.label, isWebTrack, selectedStack, fullstackPhase]);

  // Tecnologia ativa selecionada
  const currentActiveTech = useMemo(() => {
    if (!isWebTrack) return generalLang;
    if (selectedStack === "frontend") return frontendLang;
    if (selectedStack === "backend") return backendLang;
    return fullstackPhase === "frontend" ? frontendLang : backendLang;
  }, [isWebTrack, selectedStack, fullstackPhase, generalLang, frontendLang, backendLang]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(timer);
  }, []);

  const videoUrl =
    card.videoUrl ||
    DEFAULT_VIDEOS[card.label] ||
    (isWebTrack
      ? "/Video/Software_developer_web.mp4"
      : card.label.toLowerCase().includes("mobile")
        ? "/Video/Woman_coding_at_desk_mobile1080p.mp4"
        : undefined);

  // Manipuladores de Navegação
  const handleContinueExperience = (level: string) => {
    setSelectedLevel(level);
    if (isWebTrack) {
      setCurrentStep("stack");
    } else {
      setCurrentStep("language");
    }
  };

  const handleContinueStack = (stack: StackOptionId) => {
    setSelectedStack(stack);
    setFullstackPhase("frontend");
    setCurrentStep("language");
  };

  const handleTechSelect = (item: TechItem) => {
    if (!isWebTrack) {
      setGeneralLang(item.name);
      return;
    }
    if (selectedStack === "frontend") {
      setFrontendLang(item.name);
    } else if (selectedStack === "backend") {
      setBackendLang(item.name);
    } else {
      // Fullstack
      if (fullstackPhase === "frontend") {
        setFrontendLang(item.name);
      } else {
        setBackendLang(item.name);
      }
    }
  };

  const handleContinueLanguage = () => {
    // Se for Fullstack na Web e estiver na fase 1 (frontend), transiciona com animação para o backend
    if (isFullstack && fullstackPhase === "frontend") {
      setFullstackPhase("backend");
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    const primaryLanguage = isWebTrack
      ? (selectedStack === "backend" ? backendLang : frontendLang)
      : generalLang;
    const secondaryLanguage = isFullstack ? backendLang : undefined;

    onComplete?.({
      area: card,
      level: selectedLevel,
      stack: isWebTrack ? selectedStack : undefined,
      language: primaryLanguage,
      secondaryLanguage,
      completedAt: new Date().toISOString(),
    });
  };

  const handleBackFromLanguage = () => {
    if (isFullstack && fullstackPhase === "backend") {
      setFullstackPhase("frontend");
      return;
    }

    if (isWebTrack) {
      setCurrentStep("stack");
    } else {
      setCurrentStep("experience");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 text-white overflow-y-auto overflow-x-hidden select-none bg-[#020308]">
      {/* Background Dinâmico Temático para Web ou Vídeo Padrão */}
      {isWebTrack ? (
        <DynamicBackground activeStack={selectedStack} cardColor={card.color} />
      ) : videoUrl ? (
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

      {/* Conteúdo com transição suave entre os passos */}
      <div
        className={`relative z-20 w-full flex flex-col items-center transition-opacity duration-500 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <AnimatePresence mode="wait">
          {currentStep === "experience" && (
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
          )}

          {currentStep === "stack" && (
            <motion.div
              key="stack-step"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-full flex flex-col items-center"
            >
              <StackSelection
                initialStack={selectedStack}
                onContinue={handleContinueStack}
                onBack={() => setCurrentStep("experience")}
                onSelectStack={(stack) => setSelectedStack(stack)}
              />
            </motion.div>
          )}

          {currentStep === "language" && (
            <motion.div
              key="language-step"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-full flex flex-col items-center justify-center py-4 relative"
            >
              {/* Botão Superior Voltar (Glassmorphism no canto superior esquerdo) */}
              <button
                onClick={handleBackFromLanguage}
                disabled={isSubmitting}
                className="fixed top-6 left-6 sm:top-8 sm:left-10 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/70 hover:text-white hover:bg-white/10 active:scale-95 transition-all text-xs sm:text-sm font-medium cursor-pointer shadow-lg disabled:opacity-40 select-none"
              >
                <Image
                  src="/images/experience/arrow-left.svg"
                  alt=""
                  width={14}
                  height={14}
                />
                <span>Voltar</span>
              </button>

              {/* Título e Subtítulo */}
              <div className="max-w-[750px] w-full text-center flex flex-col items-center mb-4 sm:mb-6">
                <span className="text-xs uppercase tracking-widest text-[#7c75ff] font-semibold mb-1">
                  {isFullstack
                    ? `Trilha: ${card.label} (Full-Stack • ${fullstackPhase === "frontend" ? "Front-End" : "Back-End"})`
                    : `Trilha: ${card.label}`}
                </span>
                <h2 className="text-3xl sm:text-[40px] leading-tight sm:leading-[44px] font-bold text-white tracking-tight">
                  {isFullstack
                    ? fullstackPhase === "frontend"
                      ? "Qual tecnologia Front-End você quer praticar?"
                      : "Qual tecnologia Back-End você quer praticar?"
                    : "Qual tecnologia você quer praticar?"}
                </h2>
                <p className="mt-3.5 max-w-[580px] text-sm sm:text-base leading-5 font-medium text-[#A9A9A9]">
                  {isFullstack
                    ? fullstackPhase === "frontend"
                      ? "Escolha a tecnologia Front-End principal para calibrar seus desafios."
                      : "Agora escolha a tecnologia Back-End principal para a sua jornada Full-Stack."
                    : `Escolha a tecnologia principal de ${card.label} para calibrar seus desafios e sua jornada personalizada.`}
                </p>
              </div>

              {/* Grid de Tecnologias */}
              <div className="w-full max-w-[850px] flex items-center justify-center my-4 min-h-[220px]">
                <TechGrid
                  key={`techgrid-${card.label}-${selectedStack || "default"}-${fullstackPhase}`}
                  items={currentTechItems}
                  selectedId={currentActiveTech}
                  onSelect={handleTechSelect}
                />
              </div>

              {/* Ação Inferior: Continuar ou Iniciar Jornada */}
              <div className="flex flex-col mb-10 items-center w-full max-w-[370px] mt-6">
                <button
                  onClick={handleContinueLanguage}
                  disabled={isSubmitting}
                  className="w-full h-[51px] rounded-[26px] bg-[#5B4FCF] hover:bg-[#6C60E0] active:scale-[0.98] transition-all flex items-center justify-center gap-3.5 text-white font-semibold text-[15px] cursor-pointer shadow-lg shadow-[#5B4FCF]/30 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                      Criando sua jornada...
                    </span>
                  ) : isFullstack && fullstackPhase === "frontend" ? (
                    <>
                      <span>Continuar</span>
                      <Image
                        src="/images/experience/arrow-right.svg"
                        alt=""
                        width={16}
                        height={16}
                      />
                    </>
                  ) : (
                    <>
                      <span>Iniciar Jornada</span>
                      <Image
                        src="/images/experience/arrow-right.svg"
                        alt=""
                        width={16}
                        height={16}
                      />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default AreaSelectedScreen;
