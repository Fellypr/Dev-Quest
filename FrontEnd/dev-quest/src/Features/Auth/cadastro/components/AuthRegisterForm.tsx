"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Check, Eye, EyeOff, Lock, LogIn, Mail, User } from "lucide-react";

import { RegisterAuth } from "../../types/Auth.Type";

export function AuthRegisterForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterAuth>();
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const inputWrapperClass = (hasError?: boolean) =>
    `group flex h-12 items-center gap-3 rounded-lg border bg-[#080c1f]/80 px-4 text-[#aeb4c8] transition duration-200 focus-within:bg-[#0d1230] ${
      hasError
        ? "border-red-500/70 focus-within:border-red-400 focus-within:shadow-[0_0_0_3px_rgba(248,113,113,0.16)]"
        : "border-white/10 focus-within:border-[#7657ff] focus-within:shadow-[0_0_0_3px_rgba(118,87,255,0.18)]"
    }`;

  const errorMessageClass = "mt-2 text-xs font-semibold text-red-400";

  const submit = (dados: RegisterAuth) => {
    if (dados.Email == "fellype29kennedemil@gmail.com") {
      setError("Email", { message: "Este Email ja esta sendo utilizado" });
      return;
    }
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center px-5 py-8 sm:px-8 lg:px-10 xl:px-14">
      <section className="relative w-full max-w-90 md:max-w-130 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1024]/82 px-6 py-7 shadow-[0_28px_90px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl sm:px-8 sm:py-8">
        <div className="pointer-events-none absolute -right-28 -top-24 h-72 w-72 rounded-full bg-[#0077ff]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-[#8f3cff]/18 blur-3xl" />

        <div className="relative z-10">
          <h2 className="text-[1.75rem] font-black leading-tight text-white sm:text-[2rem]">
            Criar sua conta
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#b8bdd2] sm:text-base">
            Comece sua jornada de aprendizado agora mesmo.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit(submit)}>
            <div className="flex w-full flex-col gap-4 md:flex-row">
              <div className="flex min-w-0 flex-1 basis-1/2 flex-col">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold text-white"
                >
                  E-mail
                </label>
                <div className={inputWrapperClass(!!errors.Email)}>
                  <Mail className="h-5 w-5 shrink-0" strokeWidth={1.8} />

                  <input
                    id="email"
                    type="email"
                    aria-invalid={!!errors.Email}
                    aria-describedby={errors.Email ? "email-error" : undefined}
                    placeholder="seu@email.com"
                    className="h-full min-w-0 flex-1 bg-transparent text-sm font-medium text-white outline-none placeholder:text-[#81879c]"
                    {...register("Email", {
                      required: "O e-mail é obrigatório.",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Digite um e-mail válido.",
                      },
                    })}
                  />
                </div>
                {errors.Email && (
                  <p id="email-error" className={errorMessageClass}>
                    {errors.Email.message}
                  </p>
                )}
              </div>

              <div className="flex min-w-0 flex-1 basis-1/2 flex-col">
                <label
                  htmlFor="email-confirmation"
                  className="mb-2 block text-sm font-bold text-white"
                >
                  Nome de Usuario
                </label>
                <div className={inputWrapperClass(!!errors.FirtName)}>
                  <User className="h-5 w-5 shrink-0" strokeWidth={1.8} />
                  <input
                    id="email-confirmation"
                    aria-invalid={!!errors.FirtName}
                    aria-describedby={
                      errors.FirtName ? "username-error" : undefined
                    }
                    placeholder="Usuario123"
                    className="h-full min-w-0 flex-1 bg-transparent text-sm font-medium text-white outline-none placeholder:text-[#81879c]"
                    {...register("FirtName", {
                      required: "O nome de usuário é obrigatório.",
                      minLength: {
                        value: 3,
                        message:
                          "O nome de usuário deve conter pelo menos 3 caracteres.",
                      },
                    })}
                  />
                </div>
                {errors.FirtName && (
                  <p id="username-error" className={errorMessageClass}>
                    {errors.FirtName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-bold text-white"
              >
                Senha
              </label>
              <div className={inputWrapperClass(!!errors.Password)}>
                <Lock className="h-5 w-5 shrink-0" strokeWidth={1.8} />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  aria-invalid={!!errors.Password}
                  aria-describedby={
                    errors.Password ? "password-error" : undefined
                  }
                  placeholder="Digite sua senha"
                  className="h-full min-w-0 flex-1 bg-transparent text-sm font-medium text-white outline-none placeholder:text-[#81879c]"
                  {...register("Password", {
                    required: "A senha é obrigatória.",
                    minLength: {
                      value: 3,
                      message: "A senha deve conter pelo menos 3 caracteres.",
                    },
                  })}
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
              {errors.Password && (
                <p id="password-error" className={errorMessageClass}>
                  {errors.Password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between gap-3">
              <label
                htmlFor="remember"
                className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-[#b9bbc9]"
              >
                <span className="relative grid h-5 w-5 place-items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="peer sr-only"
                  />
                  <span className="h-5 w-5 rounded-md border border-white/15 bg-[#10142b] transition peer-checked:border-[#6b4cff] peer-checked:bg-[#654cff]" />
                  <Check
                    className="pointer-events-none absolute h-3.5 w-3.5 text-white opacity-0 transition peer-checked:opacity-100"
                    strokeWidth={3}
                  />
                </span>
                Lembrar de mim
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-1 flex h-13 w-full items-center justify-center gap-2 rounded-lg bg-[linear-gradient(100deg,#9d38ff_0%,#654cff_48%,#0077ff_100%)] text-base font-black text-white shadow-[0_18px_44px_rgba(0,82,255,0.28)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_58px_rgba(100,60,255,0.38)] focus:outline-none focus:ring-2 focus:ring-[#835cff]/60 hover:cursor-pointer"
            >
              <LogIn className="h-5 w-5" strokeWidth={2.2} />
              {isSubmitting ? "Cadastrando..." : "Cadastrar"}
            </button>
          </form>

          <p className="mt-7 text-center text-sm font-medium text-[#aeb1c1]">
            Já tem uma conta?{" "}
            <Link
              href="/Login"
              className="font-bold text-[#9b85ff] transition hover:text-[#c2b6ff]"
            >
              Login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
