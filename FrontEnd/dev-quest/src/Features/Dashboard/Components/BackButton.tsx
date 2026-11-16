"use client";

import React from "react";

export interface BackButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
}

export function BackButton({
  onClick,
  label = "Voltar",
  className = "",
}: BackButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-10 items-center justify-center rounded-lg border border-[#263057] px-4 text-xs font-semibold text-[#aeb8d6] transition-colors hover:border-[#6559ff] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6559ff] cursor-pointer ${className}`}
    >
      {label}
    </button>
  );
}
