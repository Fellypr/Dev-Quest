"use client";

import { useState } from "react";
import Image from "next/image";

export interface ExperienceLevel {
  id: string;
  title: string;
  description: string;
  image: string;
}

const EXPERIENCE_LEVELS: ExperienceLevel[] = [
  {
    id: "estagiario",
    title: "Estagiário",
    description:
      "Estou aprendendo os fundamentos da programação e dando meus primeiros passos na área.",
    image: "/images/experience/estagiario-3cc02b.png",
  },
  {
    id: "junior",
    title: "Júnior",
    description:
      "Já desenvolvo funcionalidades e conheço os fundamentos da minha stack.",
    image: "/images/experience/junior-262101.png",
  },
  {
    id: "pleno",
    title: "Pleno",
    description:
      "Tenho autonomia para resolver problemas e estruturar soluções mais complexas.",
    image: "/images/experience/pleno-524f62.png",
  },
  {
    id: "senior",
    title: "Sênior",
    description:
      "Domino decisões técnicas, arquitetura e liderança em projetos desafiadores.",
    image: "/images/experience/senior-732759.png",
  },
];

interface CardStacksProps {
  onContinue?: (selectedLevel: string) => void;
  onBack?: () => void;
  initialLevel?: string;
}

export function CardStacks({
  onContinue,
  onBack,
  initialLevel = "estagiario",
}: CardStacksProps) {
  const [selectedId, setSelectedId] = useState<string>(initialLevel);

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  const handleContinue = () => {
    onContinue?.(selectedId);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center px-4 py-8 select-none">
      {/* Título e Subtítulo - Exatos do Figma */}
      <div className="max-w-[750px] w-full text-center flex flex-col items-center mb-8">
        <h2 className="text-3xl sm:text-[40px] leading-tight sm:leading-[44px] font-bold text-white tracking-tight">
          Qual é o seu nível atual de <br className="hidden sm:inline" />
          experiência?
        </h2>
        <p className="mt-3.5 max-w-[580px] text-sm sm:text-base leading-5 font-medium text-[#A9A9A9]">
          Escolha a opção que melhor representa sua experiência <br className="hidden sm:inline" />
          e vamos personalizar sua jornada de aprendizado.
        </p>
      </div>

      {/* Grid de 4 Cards de Experiência - Layout e Dimensões 882px x 288px do Figma */}
      <div className="w-full max-w-[882px] grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-[18px]">
        {EXPERIENCE_LEVELS.map((level) => {
          const isSelected = selectedId === level.id;

          return (
            <div
              key={level.id}
              onClick={() => handleSelect(level.id)}
              className={`relative h-[137px] rounded-[12px] p-4 flex items-center cursor-pointer transition-all duration-200 overflow-hidden ${
                isSelected
                  ? "border-2 border-[#6C63FF] shadow-[0_0_24px_rgba(108,99,255,0.25)]"
                  : "border border-[#515151] hover:border-[#727272]"
              }`}
              style={{
                backgroundColor: "rgba(61, 61, 61, 0.53)",
              }}
            >
              {/* Imagem Circular 82x82px */}
              <div className="relative w-[82px] h-[82px] rounded-full overflow-hidden shrink-0 ml-1">
                <Image
                  src={level.image}
                  alt={level.title}
                  width={82}
                  height={82}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Informações: Título e Descrição */}
              <div className="flex flex-col ml-5 pr-8 max-w-[252px]">
                <h3 className="text-base font-bold text-white leading-tight">
                  {level.title}
                </h3>
                <p className="mt-2 text-[13px] leading-[19.5px] font-normal text-[#ADADAD]">
                  {level.description}
                </p>
              </div>

              {/* Indicador de Seleção / Check */}
              <div className="absolute top-[23px] right-[22px] flex items-center justify-center">
                {isSelected ? (
                  <div className="w-6 h-6 rounded-full bg-[#5B4FCF] flex items-center justify-center shadow-md">
                    <Image
                      src="/images/experience/check.svg"
                      alt="Selecionado"
                      width={10}
                      height={10}
                    />
                  </div>
                ) : (
                  <div className="w-[22px] h-[22px] rounded-full border-2 border-[#515151]" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Ações Inferiores: Continuar e Voltar - 370px de largura */}
      <div className="mt-9 flex flex-col items-center w-full max-w-[370px]">
        {/* Botão Continuar */}
        <button
          onClick={handleContinue}
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

        {/* Botão Voltar */}
        {onBack && (
          <button
            onClick={onBack}
            className="mt-4 flex items-center justify-center gap-1.5 text-[#521750c8] hover:text-white transition-colors text-[13px] font-medium cursor-pointer py-1 px-3"
          >
            <Image
              src="/images/experience/arrow-left.svg"
              alt=""
              width={14}
              height={14}
            />
            <span>Voltar</span>
          </button>
        )}
      </div>
    </div>
  );
}
