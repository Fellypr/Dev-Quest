"use client";

import React, { useEffect, useState } from "react";
import { AlertCircle, X } from "lucide-react";

export interface CardErrorProps {
  title?: string;
  message?: string;
  errorMessage?: string;
  onClose?: () => void;
  autoCloseDuration?: number; 
  showProgressBar?: boolean;
  className?: string;
}

export function CardError({
  title = "Falha na autenticação",
  message,
  errorMessage,
  onClose,
  autoCloseDuration = 4000,
  showProgressBar = true,
  className = "",
}: CardErrorProps) {
  const displayMessage =
    errorMessage || message || "Email ou senha incorretos. Tente novamente.";
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
      aria-live="assertive"
      className={`relative flex w-full max-w-[380px] min-w-[300px] min-h-[110px] max-h-[160px] flex-col justify-between overflow-hidden rounded-2xl border border-rose-500/30 bg-[#0b1024]/90 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl transition-all duration-300 animate-in fade-in zoom-in-95 ${className}`}
    >
      <div className="pointer-events-none absolute -top-10 -right-8 h-28 w-28 rounded-full bg-rose-500/20 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-8 h-28 w-28 rounded-full bg-[#654cff]/20 blur-2xl" />

      <div className="relative z-10 flex items-start gap-3.5">
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-rose-600 to-red-400 text-white shadow-[0_0_18px_rgba(244,63,94,0.45)] ring-4 ring-rose-500/15">
          <AlertCircle className="h-5 w-5 stroke-[2.6]" />
        </div>

        <div className="flex-1 min-w-0 pr-1">
          <h4 className="text-sm font-bold text-white tracking-tight sm:text-[0.95rem]">
            {title}
          </h4>
          <p className="mt-1 text-xs leading-relaxed text-[#b8bdd2] break-words">
            {displayMessage}
          </p>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar notificação de erro"
            className="-mr-1.5 -mt-1.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[#81879c] transition duration-200 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-1 focus:ring-white/20"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {showProgressBar && autoCloseDuration > 0 && (
        <div className="relative z-10 mt-3 h-1 w-full overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-rose-500 via-red-500 to-[#654cff] shadow-[0_0_8px_rgba(244,63,94,0.6)] transition-[width] duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

export default CardError;
