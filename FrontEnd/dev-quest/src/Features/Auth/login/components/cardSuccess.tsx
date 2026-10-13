"use client";

import React, { useEffect, useState } from "react";
import { Check, X } from "lucide-react";

export interface CardSuccessProps {
  title?: string;
  message?: string;
  onClose?: () => void;
  autoCloseDuration?: number; // em milissegundos (ex: 3500)
  showProgressBar?: boolean;
  className?: string;
}

export function CardSuccess({
  title = "Login realizado com sucesso!",
  message = "Redirecionando para o seu dashboard...",
  onClose,
  autoCloseDuration = 3500,
  showProgressBar = true,
  className = "",
}: CardSuccessProps) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!autoCloseDuration || autoCloseDuration <= 0) return;

    const intervalTime = 40;
    const totalSteps = autoCloseDuration / intervalTime;
    const decrement = 100 / totalSteps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= decrement) {
          clearInterval(timer);
          onClose?.();
          return 0;
        }
        return prev - decrement;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [autoCloseDuration, onClose]);

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`relative flex w-full max-w-[380px] min-w-[300px] min-h-[110px] max-h-[160px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0b1024]/90 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl transition-all duration-300 animate-in fade-in zoom-in-95 ${className}`}
    >
      {/* Iluminação de fundo (Radial Glows) */}
      <div className="pointer-events-none absolute -top-10 -right-8 h-28 w-28 rounded-full bg-emerald-500/15 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-8 h-28 w-28 rounded-full bg-[#654cff]/20 blur-2xl" />

      {/* Conteúdo Principal */}
      <div className="relative z-10 flex items-start gap-3.5">
        {/* Ícone de Sucesso estilizado com gradiente e anel pulsante */}
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-[0_0_18px_rgba(16,185,129,0.45)] ring-4 ring-emerald-500/15">
          <Check className="h-5 w-5 stroke-[2.8]" />
        </div>

        {/* Textos */}
        <div className="flex-1 min-w-0 pr-1">
          <h4 className="text-sm font-bold text-white tracking-tight sm:text-[0.95rem]">
            {title}
          </h4>
          <p className="mt-1 text-xs leading-relaxed text-[#b8bdd2] break-words">
            {message}
          </p>
        </div>

        {/* Botão de Fechar */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar notificação"
            className="-mr-1.5 -mt-1.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[#81879c] transition duration-200 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-1 focus:ring-white/20"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Barra de Progresso Fluida */}
      {showProgressBar && autoCloseDuration > 0 && (
        <div className="relative z-10 mt-3 h-1 w-full overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-[#654cff] to-[#0077ff] shadow-[0_0_8px_rgba(16,185,129,0.6)] transition-[width] duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

export default CardSuccess;
