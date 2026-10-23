"use client";

import { useState } from "react";

function HomeIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4.5 shrink-0"
      fill="none"
      viewBox="0 0 18 18"
    >
      <path
        d="M3.75 7.5 9 3l5.25 4.5v6.75H3.75V7.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}



function DevQuestLogo({ isOpen }: { isOpen: boolean }) {
  return (
    <div aria-label="DevQuest" className="flex h-10.25 items-center gap-2 overflow-hidden">
      <span className="relative block size-[35px] shrink-0 bg-[#6559ff] [clip-path:polygon(28%_0,100%_0,100%_100%,28%_100%,0_72%,0_28%)]">
        <span className="absolute inset-[7px] bg-[#02040b] [clip-path:polygon(35%_0,100%_0,65%_55%,100%_55%,100%_100%,0_100%,0_35%)]" />
      </span>
      <span
        className={`flex items-baseline text-[24px] font-semibold tracking-[-1.2px] whitespace-nowrap transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
      >
        <span className="text-[#f2f5ff]">Dev</span>
        <span className="text-[#6559ff]">Quest</span>
      </span>
    </div>
  );
}

function LogoutIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4.5 shrink-0"
      fill="none"
      viewBox="0 0 18 18"
    >
      <path
        d="M7.5 3.75H4.25a1 1 0 0 0-1 1v8.5a1 1 0 0 0 1 1H7.5M10.5 6l3 3-3 3M13.5 9H7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside
      aria-label="Navegação principal"
      className={`flex min-h-screen flex-col gap-[18px] border-r border-[#1a1f40] bg-[#02040b] px-[14px] pb-5 pt-7 transition-all duration-300 ease-in-out ${
        isOpen ? "w-60" : "w-16"
      }`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="overflow-hidden">
        <DevQuestLogo isOpen={isOpen} />
      </div>

      <nav className="w-full overflow-hidden">
        <a
          aria-current="page"
          className="flex h-[46px] w-full items-center gap-[13px] rounded-[10px] px-3 text-[#a6b0cc] transition-colors hover:bg-[#080c19] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6559ff]"
          href="#inicio"
        >
          <HomeIcon />
          <span
            className={`text-sm font-normal text-[#b2bad1] whitespace-nowrap transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            Início
          </span>
        </a>
      </nav>

      <div className="min-h-px flex-1" />

      <section
        aria-label="Perfil do jogador"
        className={`${isOpen ? "flex w-full shrink-0 flex-col gap-3 overflow-hidden rounded-xl border border-[#1a2442] bg-[#050914] p-[10px]" : "flex flex-col align-items justify-center -mr-1 gap-3"}`}
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-[#3d47ff] bg-[#0f0d2e]">
            <span className="text-[24px] font-bold leading-none text-[#14dbff]">
              L
            </span>
          </div>
          <span
            className={`text-sm font-semibold text-[#f2f5ff] whitespace-nowrap transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            Luiz
          </span>
        </div>

        {isOpen && (
          <button
            className="flex h-9 w-full shrink-0 items-center gap-2.5 rounded-[10px] border border-[rgba(242,61,82,0.42)] bg-[rgba(56,6,14,0.34)] px-3 text-[#fa7d87] shadow-[0_4px_10px_rgba(140,5,20,0.16)] transition-colors hover:bg-[rgba(86,8,20,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fa7d87]"
            type="button"
          >
            <span className="relative size-4.5 shrink-0 overflow-hidden">
              <LogoutIcon />
            </span>
            <span className="text-xs font-semibold">Sair</span>
          </button>
        )}

        {!isOpen && (
          <button
            aria-label="Sair"
            className="flex size-9 shrink-0 items-center justify-center rounded-[10px] border border-[rgba(242,61,82,0.42)] bg-[rgba(56,6,14,0.34)] text-[#fa7d87] shadow-[0_4px_10px_rgba(140,5,20,0.16)] transition-colors hover:bg-[rgba(86,8,20,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fa7d87]"
            type="button"
          >
            <LogoutIcon />
          </button>
        )}
      </section>
    </aside>
  );
}