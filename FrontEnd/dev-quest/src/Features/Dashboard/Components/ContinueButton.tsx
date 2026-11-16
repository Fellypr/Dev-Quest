"use client";

import React from "react";

export interface ContinueButtonProps {
  onClick?: () => void;
  label: string;
  disabled?: boolean;
  className?: string;
}

export function ContinueButton({
  onClick,
  label,
  disabled = false,
  className = "",
}: ContinueButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#7d5cff] px-6 py-3 text-sm font-semibold text-white shadow-[0px_0px_16px_0px_rgba(125,92,255,0.4)] transition-all hover:bg-[#6c48ff] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${className}`}
    >
      <span>{label}</span>
      <span className="font-bold">→</span>
    </button>
  );
}
