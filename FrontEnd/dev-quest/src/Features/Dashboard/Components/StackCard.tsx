"use client";

import React from "react";
import { StackCardData } from "../Types/SelectStack.Type";

export interface StackCardProps {
  card: StackCardData;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

const COLOR_STYLES = {
  cyan: {
    activeBorder: "border-2 border-[#14dbff]",
    activeBg: "bg-[#10173d]",
    activeShadow: "shadow-[0px_4px_20px_-2px_rgba(20,219,255,0.25)]",
    radioActive: "bg-[#14dbff] text-[#020618]",
    iconColor: "text-[#14dbff]",
    badge:
      "border-[rgba(20,219,255,0.4)] bg-[rgba(20,219,255,0.15)] text-[#14dbff]",
  },
  green: {
    activeBorder: "border-2 border-[#10b981]",
    activeBg: "bg-[#0a1828]",
    activeShadow: "shadow-[0px_4px_20px_-2px_rgba(16,185,129,0.25)]",
    radioActive: "bg-[#10b981] text-[#020618]",
    iconColor: "text-[#10b981]",
    badge:
      "border-[rgba(16,185,129,0.4)] bg-[rgba(16,185,129,0.15)] text-[#10b981]",
  },
  purple: {
    activeBorder: "border-2 border-[#9c3dff]",
    activeBg: "bg-[#130d2e]",
    activeShadow: "shadow-[0px_4px_20px_-2px_rgba(156,61,255,0.25)]",
    radioActive: "bg-[#9c3dff] text-[#020618]",
    iconColor: "text-[#9c3dff]",
    badge:
      "border-[rgba(156,61,255,0.4)] bg-[rgba(156,61,255,0.15)] text-[#9c3dff]",
  },
};

export function StackCard({
  card,
  isActive = false,
  onClick,
  className = "",
}: StackCardProps) {
  const styles = COLOR_STYLES[card.color];

  return (
    <article
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={`group relative flex w-full max-w-92 min-h-81 flex-col justify-between gap-3.5 rounded-2xl p-5.5 transition-all duration-200 select-none cursor-pointer overflow-hidden ${
        isActive
          ? `${styles.activeBorder} ${styles.activeBg} ${styles.activeShadow}`
          : "border border-[#1e2756] bg-[#090e24] hover:border-[#2a3875]"
      } ${className}`}
    >
      {/* Top Row: Icon Box & Radio Indicator */}
      <div className="flex w-full items-center justify-between">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-[10px] border border-[#1e2756] bg-[#090e24] p-2.25">
          <span className={`text-lg leading-none ${styles.iconColor}`}>
            {card.icon}
          </span>
        </div>

        <div
          className={`flex size-5.5 shrink-0 items-center justify-center rounded-full transition-colors ${
            isActive
              ? styles.radioActive
              : "border border-[#1e2756] bg-[#090e24]"
          }`}
        >
          {isActive && (
            <span className="text-[12px] font-bold leading-none">✓</span>
          )}
        </div>
      </div>

      {/* Body Info */}
      <div className="flex w-full flex-col gap-1.5 items-start">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-lg font-bold text-[#f8fafc] whitespace-nowrap">
            {card.title}
          </h3>

          <span
            className={`rounded px-1.5 py-0.5 text-[9.5px] font-bold tracking-wider uppercase border ${styles.badge}`}
          >
            {card.badgeText}
          </span>
        </div>

        <p className="max-w-78 text-[11.5px] leading-relaxed text-[#a3adc7]">
          {card.description}
        </p>
      </div>

      {/* Divider */}
      <div className="h-px w-full shrink-0 bg-[#161f3b]" />

      {/* Pilares Block */}
      <div className="flex w-full flex-col gap-2 items-start">
        <p className="text-[9.5px] font-semibold tracking-wider text-[#808cad] uppercase">
          PILARES DO ROADMAP:
        </p>

        <div className="flex flex-wrap gap-1.5 items-start">
          {card.pillars.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-[#1e2756] bg-[#090e24] px-2 py-1 text-[10.5px] font-medium text-[#f8fafc] whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
