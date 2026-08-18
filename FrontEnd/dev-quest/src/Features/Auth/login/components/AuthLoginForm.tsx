"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Eye, EyeOff, Lock, LogIn, Mail } from "lucide-react";
import Image from "next/image";
export function AuthLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="flex min-h-screen w-full items-center justify-center px-5 py-8 sm:px-8 lg:px-10 xl:px-14">
      <section className="relative w-full max-w-[27.5rem] overflow-hidden rounded-2xl border border-white/10 bg-[#0b1024]/82 px-6 py-7 shadow-[0_28px_90px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl sm:px-8 sm:py-8">
        <div className="pointer-events-none absolute -right-28 -top-24 h-72 w-72 rounded-full bg-[#0077ff]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-[#8f3cff]/18 blur-3xl" />

        <div className="relative z-10">
          <h2 className="text-[1.75rem] font-black leading-tight text-white sm:text-[2rem]">
            Bem-vindo de volta
          </h2>
        
          <p className="mt-3 text-sm leading-6 text-[#b8bdd2] sm:text-base">
            Entre na sua conta para continuar sua jornada.
          </p>

          <form className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-bold text-white">
                E-mail
              </label>
              <div className="group flex h-12 items-center gap-3 rounded-lg border border-white/10 bg-[#080c1f]/80 px-4 text-[#aeb4c8] transition duration-200 focus-within:border-[#7657ff] focus-within:bg-[#0d1230] focus-within:shadow-[0_0_0_3px_rgba(118,87,255,0.18)]">
                <Mail className="h-5 w-5 shrink-0" strokeWidth={1.8} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="h-full min-w-0 flex-1 bg-transparent text-sm font-medium text-white outline-none placeholder:text-[#81879c]"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-bold text-white">
                Senha
              </label>
              <div className="group flex h-12 items-center gap-3 rounded-lg border border-white/10 bg-[#080c1f]/80 px-4 text-[#aeb4c8] transition duration-200 focus-within:border-[#7657ff] focus-within:bg-[#0d1230] focus-within:shadow-[0_0_0_3px_rgba(118,87,255,0.18)]">
                <Lock className="h-5 w-5 shrink-0" strokeWidth={1.8} />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  className="h-full min-w-0 flex-1 bg-transparent text-sm font-medium text-white outline-none placeholder:text-[#81879c]"
                  required
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  onClick={() => setShowPassword((current) => !current)}
                  className="-mr-1 grid h-8 w-8 shrink-0 place-items-center rounded-md text-[#b2b6c8] transition hover:bg-white/5 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" strokeWidth={1.8} />
                  ) : (
                    <Eye className="h-5 w-5" strokeWidth={1.8} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <label htmlFor="remember" className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-[#b9bbc9]">
                <span className="relative grid h-5 w-5 place-items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="peer sr-only"
                  />
                  <span className="h-5 w-5 rounded-md border border-white/15 bg-[#10142b] transition peer-checked:border-[#6b4cff] peer-checked:bg-[#654cff]" />
                  <Check className="pointer-events-none absolute h-3.5 w-3.5 text-white opacity-0 transition peer-checked:opacity-100" strokeWidth={3} />
                </span>
                Lembrar de mim
              </label>

              <Link
                href="#"
                className="shrink-0 text-sm font-bold text-[#9b85ff] transition hover:text-[#c2b6ff]"
              >
                Esqueci a senha
              </Link>
            </div>

            <button
              type="submit"
              className="mt-1 flex h-[3.25rem] w-full items-center justify-center gap-2 rounded-lg bg-[linear-gradient(100deg,#9d38ff_0%,#654cff_48%,#0077ff_100%)] text-base font-black text-white shadow-[0_18px_44px_rgba(0,82,255,0.28)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_58px_rgba(100,60,255,0.38)] focus:outline-none focus:ring-2 focus:ring-[#835cff]/60"
            >
              <LogIn className="h-5 w-5" strokeWidth={2.2} />
              Entrar
            </button>
          </form>

          <p className="mt-7 text-center text-sm font-medium text-[#aeb1c1]">
            Ainda não tem uma conta?{" "}
            <Link href="Cadastro_De_Usuario" className="font-bold text-[#9b85ff] transition hover:text-[#c2b6ff]">
              Criar conta
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
