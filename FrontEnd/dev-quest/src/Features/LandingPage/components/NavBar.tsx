
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export function NavbarLandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`relative z-10 w-full h-20 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-background/85 shadow-lg backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-6 py-6">
        <Link href="/" className="flex items-center gap-0.5">
          <Image
            src="/icon/LogoSemFundo.png"
            alt="Logo DevQuest"
            width={64}
            height={64}
            className="h-10 w-10 object-contain"
          />

          <span className="text-2xl font-bold text-white">
            Dev<span className="text-brand-blue">Quest</span>
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-3">
          <Link
            href="/Login"
            className="rounded-lg px-5 py-2.5 text-sm font-semibold text-[#f2f2f2] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:text-white"
          >
            Entrar
          </Link>
          <Link
            href="Cadastro_De_Usuario"
            className="rounded-lg bg-gradient-to-r from-brand-violet to-brand-blue px-5 py-2.5 text-sm font-semibold text-[#f2f2f2] shadow-glow transition-all duration-300 hover:-translate-y-0.5"
          >
            Testar Gratuitamente
          </Link>
        </div>
      </div>
    </header>
  );
}
