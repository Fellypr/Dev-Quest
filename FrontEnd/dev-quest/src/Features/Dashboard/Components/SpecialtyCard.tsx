"use client";

import React from "react";

export interface SpecialtyCardProps {
  title: string;
  badgeText: string;
  badgeVariant?: "cyan" | "purple";
  description: string;
  icon: React.ReactNode;
  pillars: string[];
  isActive?: boolean;
  activeColor?: "cyan" | "purple";
  onClick?: () => void;
  className?: string;
}

export function SpecialtyCard({
  title,
  badgeText,
  badgeVariant = "cyan",
  description,
  icon,
  pillars,
  isActive = false,
  activeColor = "cyan",
  onClick,
  className = "",
}: SpecialtyCardProps) {
  const isCyan = activeColor === "cyan";

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
      className={`group relative flex w-full max-w-108 flex-col justify-between gap-3.5 rounded-2xl p-6 transition-all duration-200 select-none cursor-pointer overflow-hidden ${
        isActive
          ? isCyan
            ? "border-2 border-[#14dbff] bg-[#10173d] shadow-[0px_0px_24px_-4px_rgba(20,219,255,0.22)]"
            : "border-2 border-[#9c3dff] bg-[#10173d] shadow-[0px_0px_24px_-4px_rgba(156,61,255,0.22)]"
          : "border border-[#1e2756] bg-[#090e24] hover:border-[#2a3875]"
      } ${className}`}
    >
      {/* Top Row: Icon Box & Radio Button */}
      <div className="flex w-full items-center justify-between">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-[10px] border border-[#1e2756] bg-[#090e24] p-2.5">
          <span
            className={`text-lg leading-none ${
              badgeVariant === "cyan" ? "text-[#14dbff]" : "text-[#9c3dff]"
            }`}
          >
            {icon}
          </span>
        </div>

        <div
          className={`flex size-6 shrink-0 items-center justify-center rounded-full transition-colors ${
            isActive
              ? isCyan
                ? "bg-[#14dbff] text-[#020618]"
                : "bg-[#9c3dff] text-[#020618]"
              : "border border-[#1e2756] bg-[#090e24]"
          }`}
        >
          {isActive && (
            <span className="text-[13px] font-bold leading-none">✓</span>
          )}
        </div>
      </div>

      {/* Body Info */}
      <div className="flex w-full flex-col gap-1.5 items-start">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-lg font-bold text-[#f8fafc] whitespace-nowrap">
            {title}
          </h3>

          <span
            className={`rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase border ${
              badgeVariant === "cyan"
                ? "border-[rgba(20,219,255,0.4)] bg-[rgba(20,219,255,0.15)] text-[#14dbff]"
                : "border-[rgba(156,61,255,0.4)] bg-[rgba(156,61,255,0.15)] text-[#9c3dff]"
            }`}
          >
            {badgeText}
          </span>
        </div>

        <p className="max-w-96 text-xs leading-relaxed text-[#a3adc7]">
          {description}
        </p>
      </div>

      {/* Divider */}
      <div className="h-px w-full shrink-0 bg-[#161f3b]" />

      {/* Stacks / Pillars Block */}
      <div className="flex w-full flex-col gap-2 items-start">
        <p className="text-[10px] font-semibold tracking-wider text-[#808cad] uppercase">
          PILARES DO ROADMAP:
        </p>

        <div className="flex flex-wrap gap-1.5 items-start">
          {pillars.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-[#1e2756] bg-[#090e24] px-2 py-1 text-[11px] font-medium text-[#f8fafc] whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export interface SpecialtyCardSimpleProps {
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export function CardDesenvolvimentoWeb({
  isActive = false,
  onClick,
  className,
}: SpecialtyCardSimpleProps) {
  return (
    <SpecialtyCard
      title="Desenvolvimento Web"
      badgeText="POPULAR"
      badgeVariant="cyan"
      activeColor="cyan"
      description="Aplicações modernas, ecossistemas SPA/SSR, APIs distribuídas e interfaces com foco em web standards e performance."
      icon="🌐"
      pillars={["React / Next.js", "TypeScript", "Node.js", "APIs REST/GraphQL"]}
      isActive={isActive}
      onClick={onClick}
      className={className}
    />
  );
}

export function CardDesenvolvimentoMobile({
  isActive = false,
  onClick,
  className,
}: SpecialtyCardSimpleProps) {
  return (
    <SpecialtyCard
      title="Desenvolvimento Mobile"
      badgeText="EM ALTA"
      badgeVariant="purple"
      activeColor="purple"
      description="Aplicações nativas e híbridas de alta fluidez para iOS e Android, aproveitando sensores, arquitetura local e modo offline."
      icon="📱"
      pillars={["React Native", "Flutter", "Swift / Kotlin", "Offline-First"]}
      isActive={isActive}
      onClick={onClick}
      className={className}
    />
  );
}
