"use client";

interface CartaRoadmapProps {
  technology?: string;
  level?: string;
  area?: string;
  progress?: number;
  nextStepTitle?: string;
  nextStepDescription?: string;
  onContinue?: () => void;
}

const LEVEL_LABELS: Record<string, string> = {
  estagiario: "Estagiário",
  junior: "Júnior",
  pleno: "Pleno",
  senior: "Sênior",
};

const DEFAULT_NEXT_STEPS: Record<
  string,
  { title: string; description: string }
> = {
  estagiario: {
    title: "Fundamentos & Sintaxe",
    description: "Aprenda variáveis, operadores e comandos básicos de controle.",
  },
  junior: {
    title: "Estrutura & Funções",
    description: "Crie lógicas reutilizáveis, coleções e manipulação de dados.",
  },
  pleno: {
    title: "Arquitetura & Padrões",
    description: "Estruture componentes com baixo acoplamento e testes.",
  },
  senior: {
    title: "Performance & Resiliência",
    description: "Otimize concorrência, arquiteturas distribuídas e escalabilidade.",
  },
};

export function CartaRoadmap({
  technology = "JavaScript",
  level = "junior",
  area,
  progress = 15,
  nextStepTitle,
  nextStepDescription,
  onContinue,
}: CartaRoadmapProps) {
  const levelKey = level.toLowerCase();
  const displayLevel = LEVEL_LABELS[levelKey] || level;
  const defaultStep = DEFAULT_NEXT_STEPS[levelKey] || DEFAULT_NEXT_STEPS.junior;

  const currentStepTitle = nextStepTitle || defaultStep.title;
  const currentStepDesc = nextStepDescription || defaultStep.description;

  return (
    <section className="flex w-full flex-col gap-6 overflow-hidden rounded-[13px] border border-[#161f3b] bg-[#040711] px-[18px] py-[18px] md:flex-row md:items-center md:pr-[22px] transition-all hover:border-[#2a3b70]">
      <div className="flex min-h-[112px] w-full items-center gap-[18px] md:w-[390px] md:shrink-0">
        <div className="flex size-16 shrink-0 items-center justify-center rounded-xl border border-[#481673] bg-[#13061f]">
          <span className="text-xl font-bold text-[#a130ff] max-w-[56px] truncate text-center px-1">
            {technology.slice(0, 4)}
          </span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-start gap-[7px]">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold leading-normal text-[#f2f5ff]">
              {technology}
            </h2>
            {area && (
              <span className="text-[10px] text-[#7885a5] border border-[#232b45] px-1.5 py-0.5 rounded">
                {area}
              </span>
            )}
          </div>

          <p className="text-[11px] font-semibold leading-normal text-[#99a3bd] uppercase tracking-wider">
            Nível: {displayLevel}
          </p>

          <div className="flex w-full items-center gap-3">
            <div
              aria-label={`Progresso do roadmap: ${progress}%`}
              aria-valuemax={100}
              aria-valuemin={0}
              aria-valuenow={progress}
              className="h-[7px] w-full max-w-[210px] overflow-hidden rounded bg-[#111426]"
              role="progressbar"
            >
              <div
                className="h-full rounded bg-gradient-to-r from-[#8c1fff] to-[#294dff] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <span className="shrink-0 text-[13px] font-semibold text-[#9c3dff]">
              {progress}%
            </span>
          </div>

          <p className="text-[10px] font-normal leading-normal text-[#8f99b2]">
            Trilha personalizada ativa
          </p>
        </div>
      </div>

      <div className="hidden h-[104px] w-px shrink-0 bg-[#161c33] md:block" />

      <div className="flex min-w-0 flex-1 flex-col items-start gap-[7px]">
        <p className="text-[11px] font-medium leading-normal text-[#9c33ff]">
          Próxima etapa para seu nível
        </p>

        <h3 className="text-sm md:text-[18px] font-semibold leading-normal text-[#f5f5ff]">
          {currentStepTitle}
        </h3>

        <p className="text-[11px] md:text-[14px] font-normal leading-[17px] text-[#a3adc7]">
          {currentStepDesc}
        </p>
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="flex h-10 w-32 shrink-0 items-center justify-between rounded-lg border border-[#4a2bad] pl-4 pr-[14px] text-[#7d5cff] transition-colors hover:border-[#7d5cff] hover:bg-[#120b2b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7d5cff] cursor-pointer"
      >
        <span className="text-xs font-semibold">Continuar</span>
        <span aria-hidden="true" className="text-[25px] font-bold pb-2">
          →
        </span>
      </button>
    </section>
  );
}