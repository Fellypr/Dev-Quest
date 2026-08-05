import Image from "next/image";
import { Bot, Code2, Map } from "lucide-react";

const features = [
  {
    icon: Map,
    title: "Roadmaps",
    description: "Personalizados",
  },
  {
    icon: Bot,
    title: "Tutoria com IA",
    description: "Inteligente",
  },
  {
    icon: Code2,
    title: "Prática em IDE",
    description: "Integrada",
  },
];

export function AuthFormSide() {
  return (
    <aside className="relative hidden min-h-screen overflow-hidden px-10 py-9 lg:flex xl:px-14">
      <div className="absolute left-[-20%] top-[18%] h-[56rem] w-[56rem] rounded-full border border-[#3755ff]/20 bg-[radial-gradient(circle_at_38%_36%,rgba(101,76,255,0.24),rgba(7,9,34,0.7)_43%,rgba(0,0,0,0)_70%)] shadow-[0_0_90px_rgba(58,78,255,0.16)]" />
      <div className="absolute bottom-[18%] left-[-8%] h-32 w-[58%] rounded-full bg-[#0757ff]/22 blur-3xl" />
      <div className="absolute bottom-[22%] left-[24%] h-24 w-80 rounded-full bg-[#9b2cff]/24 blur-3xl" />

      <div className="relative z-10 flex min-h-full w-full max-w-[45rem] flex-col justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/icon/LogoSemFundo.png"
            alt="DevQuest"
            width={48}
            height={48}
            className="h-12 w-12 rounded-xl object-contain"
          />
          <span className="text-[1.75rem] font-black leading-none text-white">
            Dev<span className="text-[#6847ff]">Quest</span>
          </span>
        </div>

        <div className="relative py-10">
          <h1 className="max-w-[34rem] text-[clamp(3.2rem,5vw,4.75rem)] font-black leading-[0.96] text-white drop-shadow-[0_8px_22px_rgba(0,0,0,0.45)]">
            Sua jornada
            <br />
            começa <span className="text-[#6847ff]">aqui.</span>
          </h1>

          <p className="mt-5 max-w-[36rem] text-[1.08rem] font-normal leading-7 text-[#c5c8d8]">
            Aprenda, pratique e evolua com tutores de IA e desafios reais em um
            ambiente feito para devs.
          </p>

          <div className="mt-9 grid max-w-[40rem] grid-cols-3 gap-4 xl:gap-5">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="min-w-0 rounded-xl border border-white/10 bg-white/[0.035] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur"
              >
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-lg border border-[#743cff]/50 bg-[#6b39ff]/14">
                  <Icon className="h-5 w-5 text-[#8b72ff]" strokeWidth={2.3} />
                </div>
                <p className="text-sm font-black leading-5 text-white">{title}</p>
                <p className="mt-1 text-xs font-medium leading-5 text-[#aeb4ca]">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="max-w-[33rem] text-sm leading-6 text-[#858ba3]">
          Evolua com trilhas guiadas, desafios práticos e feedback inteligente no
          seu ritmo.
        </p>
      </div>
    </aside>
  );
}
