"use client";

import { useState } from "react";
import Image from "next/image";
import {
  STACK_OPTIONS,
  StackOptionId,
} from "../Types/Presentation.types";

interface StackSelectionProps {
  initialStack?: StackOptionId;
  onContinue?: (selectedStack: StackOptionId) => void;
  onBack?: () => void;
  onSelectStack?: (stackId: StackOptionId) => void;
}

export function StackSelection({
  initialStack = "fullstack",
  onContinue,
  onBack,
  onSelectStack,
}: StackSelectionProps) {
  const [selectedId, setSelectedId] = useState<StackOptionId>(initialStack);

  const handleSelect = (id: StackOptionId) => {
    setSelectedId(id);
    onSelectStack?.(id);
  };

  const handleContinue = () => {
    onContinue?.(selectedId);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center px-4 py-6 select-none">
      {/* Top Brand Logo - Idêntico ao da imagem */}
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-8 h-8 rounded-[10px] bg-gradient-to-tr from-[#5243d8] to-[#7f71ff] flex items-center justify-center shadow-md shadow-[#5243d8]/40">
          <svg
            className="w-4 h-4 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m16 18 6-6-6-6" />
            <path d="m8 6-6 6 6 6" />
          </svg>
        </div>
        <span className="text-xl font-bold tracking-tight text-white flex items-center">
          Dev<span className="text-[#a49bff]">Quest</span>
        </span>
      </div>

      {/* Título e Subtítulo */}
      <div className="max-w-[750px] w-full text-center flex flex-col items-center mb-6">
        <h2 className="text-3xl sm:text-[40px] leading-tight sm:leading-[44px] font-bold text-white tracking-tight">
          Qual é a sua stack de interesse?
        </h2>
        <p className="mt-3.5 max-w-[580px] text-sm sm:text-base leading-5 font-medium text-[#A9A9A9]">
          Escolha a área que deseja focar para personalizarmos os seus desafios de programação.
        </p>
      </div>

      {/* Grid com 3 Cards em Glassmorphism - Front-End, Back-End, Full-Stack */}
      <div className="w-full max-w-[960px] grid grid-cols-1 md:grid-cols-3 gap-5 my-4 items-stretch">
        {STACK_OPTIONS.map((stack) => {
          const isSelected = selectedId === stack.id;

          return (
            <div
              key={stack.id}
              onClick={() => handleSelect(stack.id)}
              className={`relative rounded-[20px] p-7 flex flex-col items-center text-center cursor-pointer transition-all duration-300 overflow-hidden ${
                isSelected
                  ? "border-2 border-[#6C63FF] shadow-[0_0_28px_rgba(108,99,255,0.3)] bg-[#181a35]/80"
                  : "border border-white/10 hover:border-white/25 bg-[#131528]/55 hover:bg-[#181a33]/65"
              } backdrop-blur-md`}
            >
              {/* Checkmark no canto superior direito para o card selecionado */}
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#5B4FCF] flex items-center justify-center shadow-md animate-in fade-in zoom-in-75 duration-200">
                  <Image
                    src="/images/experience/check.svg"
                    alt="Selecionado"
                    width={11}
                    height={11}
                  />
                </div>
              )}

              {/* Box de Ícone Estilizado */}
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 ${
                  isSelected ? "scale-105" : "scale-100"
                }`}
                style={{
                  backgroundColor:
                    stack.id === "frontend"
                      ? "rgba(108, 99, 255, 0.15)"
                      : stack.id === "backend"
                        ? "rgba(0, 210, 223, 0.15)"
                        : "rgba(139, 92, 246, 0.15)",
                  border: `1px solid ${
                    stack.id === "frontend"
                      ? "rgba(108, 99, 255, 0.4)"
                      : stack.id === "backend"
                        ? "rgba(0, 210, 223, 0.4)"
                        : "rgba(139, 92, 246, 0.4)"
                  }`,
                }}
              >
                {stack.id === "frontend" && (
                  <svg
                    className="w-7 h-7 text-[#7c75ff]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                )}

                {stack.id === "backend" && (
                  <svg
                    className="w-7 h-7 text-[#00d2df]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <ellipse cx="12" cy="5" rx="9" ry="3" />
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                  </svg>
                )}

                {stack.id === "fullstack" && (
                  <svg
                    className="w-7 h-7 text-[#a78bfa]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                )}
              </div>

              {/* Título da Stack */}
              <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                {stack.title}
              </h3>

              {/* Descrição */}
              <p className="text-xs sm:text-[13px] leading-[20px] font-normal text-[#ADADAD]">
                {stack.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Ações Inferiores: Continuar e Voltar - 370px */}
      <div className="mt-8 flex flex-col items-center w-full max-w-[370px]">
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
        )}
      </div>
    </div>
  );
}

export default StackSelection;
