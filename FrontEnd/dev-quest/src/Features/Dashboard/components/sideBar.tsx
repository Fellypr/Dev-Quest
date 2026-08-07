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

function DevQuestLogo() {
  return (
    <div aria-label="DevQuest" className="flex h-10.25 items-center gap-2">
      <span className="relative block size-[35px] shrink-0 bg-[#6559ff] [clip-path:polygon(28%_0,100%_0,100%_100%,28%_100%,0_72%,0_28%)]">
        <span className="absolute inset-[7px] bg-[#02040b] [clip-path:polygon(35%_0,100%_0,65%_55%,100%_55%,100%_100%,0_100%,0_35%)]" />
      </span>
      <span className="flex items-baseline text-[24px] font-semibold tracking-[-1.2px]">
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
      className="size-4.5"
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
  return (
    <main className="min-h-screen bg-[#02040b]">
      <aside
        aria-label="Navegação principal"
        className="flex min-h-screen w-[226px] flex-col gap-[18px] border-r border-[#1a1f40] bg-[#02040b] px-[18px] pb-5 pt-7"
      >
        <div className="h-[41px] w-[166px] shrink-0 overflow-hidden">
          <DevQuestLogo />
        </div>

        <nav className="w-full overflow-hidden">
          <a
            aria-current="page"
            className="flex h-[46px] w-[190px] items-center gap-[13px] rounded-[10px] pl-4 pr-[14px] text-[#a6b0cc] transition-colors hover:bg-[#080c19] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6559ff]"
            href="#inicio"
          >
            <HomeIcon />
            <span className="text-sm font-normal text-[#b2bad1]">Início</span>
          </a>
        </nav>

        <div className="min-h-px flex-1" />

        <section
          aria-label="Perfil do jogador"
          className="flex h-[180px] w-[190px] shrink-0 flex-col gap-[66px] overflow-hidden rounded-xl border border-[#1a2442] bg-[#050914] p-[14px]"
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-[14px] border border-[#3d47ff] bg-[#0f0d2e]">
              <span className="text-[32px] font-bold leading-none text-[#14dbff]">
                L
              </span>
            </div>
            <span className="text-sm font-semibold text-[#f2f5ff]">Luiz</span>
          </div>

          <button
            className="flex h-10.5 w-40.5 shrink-0 items-center gap-2.5 rounded-[10px] border border-[rgba(242,61,82,0.42)] bg-[rgba(56,6,14,0.34)] px-3.5 text-[#fa7d87] shadow-[0_4px_10px_rgba(140,5,20,0.16)] transition-colors hover:bg-[rgba(86,8,20,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fa7d87]"
            type="button"
          >
            <span className="relative size-4.5 shrink-0 overflow-hidden">
              <LogoutIcon />
            </span>
            <span className="text-xs font-semibold">Sair</span>
          </button>
        </section>
      </aside>
    </main>
  );
}