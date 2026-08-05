
import Link from "next/link";

export function NavbarLandingPage(){
    return(
        <header className="relative z-10 mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-6 py-6">
        <Link href="/" className="flex items-center gap-0.5">
          <img
            src="/icon/LogoSemFundo.png"
            alt="Logo DevQuest"
            className="h-16 w-16 object-contain"
          />

          <span className="text-2xl font-bold text-white">
            Dev<span className="text-brand-blue">Quest</span>
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-3">
          <Link
            href="#"
            className="rounded-lg px-5 py-2.5 text-sm font-semibold text-[#f2f2f2] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:text-white"
          >
            Entrar
          </Link>
          <Link
            href="#"
            className="rounded-lg bg-gradient-to-r from-brand-violet to-brand-blue px-5 py-2.5 text-sm font-semibold text-[#f2f2f2] shadow-glow transition-all duration-300 hover:-translate-y-0.5"
          >
            Testar Gratuitamente
          </Link>
        </div>
      </header>
    )
}