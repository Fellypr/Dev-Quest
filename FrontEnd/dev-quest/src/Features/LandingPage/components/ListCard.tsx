import {
  ArrowRight,
  Bell,
  Settings,
  Search,
  Cpu,
  Users,
  Link2,
  Mic,
  TrendingUp,
} from "lucide-react";


export function ListCard(){

    const logos = ["Logoipsum", "Logoipsum", "IPSUM", "logo ipsum", "LOOO", "Logoip"];
    const bars = [40, 55, 48, 62, 100, 58, 70, 52];
    const features = [
  {
    title: "Soluções de IA DevQuest",
    description:
      "Gestão de tarefas com IA para fluxos de trabalho simplificados e eficazes.",
    icon: Cpu,
  },
  {
    title: "Suporte Personalizado",
    description:
      "Muitas tarefas agora são automatizadas, permitindo que seu time trabalhe melhor.",
    icon: Users,
  },
  {
    title: "Integração de Dados Fácil",
    description:
      "Conecte facilmente cartões, empréstimos, investimentos e contas bancárias.",
    icon: Link2,
  },
];

const wideFeatures = [
  {
    title: "Automação Inteligente",
    description:
      "Usando IA para criar fluxos que simplificam tarefas e aumentam a produtividade.",
    icon: Mic,
  },
  {
    title: "Visualização de Dados",
    description:
      "Visualize e organize conjuntos de dados complexos para decisões mais rápidas.",
    icon: TrendingUp,
  },
];

    return(
        <>
        <section className="mx-auto max-w-6xl px-6 py-20 text-center">

          <p className="text-sm text-muted-foreground">
            Usado por mais de 10.000 times no mundo
          </p>
        
        
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-xl font-semibold text-muted-foreground/60">
            {logos.map((l, i) => (
              <span key={i}>{l}</span>
            ))}
          </div>
        
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="text-center">
          
            <span className="inline-flex items-center gap-3 text-sm font-medium text-brand-blue">
              <span className="h-px w-8 bg-brand-violet" />
              Recursos
              <span className="h-px w-8 bg-brand-violet" />
            </span>
          
          
            <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-bold leading-tight md:text-5xl">
              Acelere sua operação com processos low-code
            </h2>
          
          
            <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
              Todas as ferramentas necessárias para otimizar operações, aumentar a
              produtividade e crescer com confiança.
            </p>
          
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {features.map(({ title, description, icon: Icon }) => (

              <article key={title} className="group h-full rounded-2xl border border-brand-violet/25 bg-gradient-to-b from-brand-violet/15 to-transparent p-6 transition-colors hover:border-brand-violet/60">
                <div className="flex h-36 items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-violet to-brand-blue shadow-glow">
                    <Icon className="h-7 w-7 text-primary-foreground" aria-hidden />
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{description}</p>
              </article>

          ))}
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {wideFeatures.map(({ title, description, icon: Icon }) => (

              <article key={title} className="h-full rounded-2xl border border-brand-violet/25 bg-gradient-to-b from-brand-violet/15 to-transparent p-6 transition-colors hover:border-brand-violet/60">
                <div className="relative flex h-44 items-center justify-center gap-2">
                  {Icon === Mic ? (
                    <>
                      {Array.from({ length: 18 }).map((_, i) => (
                        <span
                          key={i}
                          style={{ height: `${20 + Math.abs(9 - i) * -6 + 60}px` }}
                          className="w-1 rounded-full bg-brand-violet/50"
                        />
                      ))}
                      <span className="absolute flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-violet to-brand-blue shadow-glow">
                        <Mic className="h-6 w-6 text-primary-foreground" aria-hidden />
                      </span>
                    </>
                  ) : (
                    bars.map((h, i) => (
                      <div
                        key={i}
                        style={{ height: `${h}%` }}
                        className={
                          i === 4
                            ? "w-6 rounded-md bg-gradient-to-t from-brand-blue to-brand-fuchsia"
                            : "w-6 rounded-md bg-brand-violet/25"
                        }
                      />
                    ))
                  )}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{description}</p>
              </article>
            
          ))}
        </div>

        
          <div className="mt-12 flex justify-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-violet to-brand-blue px-7 py-3.5 text-sm font-semibold text-[#f2f2f2] shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:scale-105"
            >
              Explorar recursos <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        
      </section>
        </>
    )
}