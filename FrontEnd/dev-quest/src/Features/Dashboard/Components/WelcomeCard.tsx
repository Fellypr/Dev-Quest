"use client";

const mascotImage = "/images/Roadmaps_mascot_art.png";

type CartaDeBoasVindasDashboardProps = {
  onCreateRoadmap: () => void;
  areaLabel?: string;
  levelLabel?: string;
  language?: string;
};

const LEVEL_NAMES: Record<string, string> = {
  estagiario: "Estagiário",
  junior: "Júnior",
  pleno: "Pleno",
  senior: "Sênior",
};

export function CartaDeBoasVindasDashboard({
  onCreateRoadmap,
  areaLabel,
  levelLabel,
  language,
}: CartaDeBoasVindasDashboardProps) {
  const formattedLevel = levelLabel
    ? LEVEL_NAMES[levelLabel.toLowerCase()] || levelLabel
    : null;

  return (
    <section className="relative flex min-h-54 w-[100%] items-center overflow-hidden rounded-xl border border-[rgba(48,14,105,0.9)] bg-[#02030D] pl-10 sm:pl-11.5">
      <div className="relative z-20 flex flex-col items-start gap-3.5 py-6">
        {areaLabel && language && (
          <div className="inline-flex items-center gap-2 rounded-full border border-[#6b21a8] bg-[#220745]/70 px-3 py-1 text-xs text-[#c084fc]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#a855f7] animate-pulse" />
            <span>
              {areaLabel} • {formattedLevel} • {language}
            </span>
          </div>
        )}

        <h1 className="text-[28px] font-bold leading-normal text-[#f5f5ff]">
          Olá, Dev! 👋
        </h1>

        <p className="max-w-md text-[15px] font-normal leading-5.75 text-[#d9def0]">
          {language ? (
            <>
              Sua jornada em <strong className="text-white">{language}</strong>{" "}
              foi calibrada para o nível{" "}
              <strong className="text-white">{formattedLevel}</strong>.
            </>
          ) : (
            <>
              Crie seu roadmap personalizado com IA
              <br />
              e comece sua jornada de aprendizado.
            </>
          )}
        </p>

        <button
          type="button"
          onClick={onCreateRoadmap}
          className="flex h-12 items-center justify-between gap-4 rounded-[10px] bg-linear-to-r from-[#6114ff] to-[#2b38ff] px-5 text-white transition duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8d6cff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08041f] cursor-pointer shadow-lg shadow-[#6114ff]/25"
        >
          <span className="text-sm font-semibold">
            {language ? `Novo roadmap para ${language}` : "Criar novo roadmap"}
          </span>
          <span aria-hidden="true" className="text-xl font-normal text-[#e0e0ff]">
            +
          </span>
        </button>
      </div>
      <div className="bg-[linear-gradient(90deg,#08041f_0%,#02030f_42%,#02020b_100%,#0e021d_100%)] blur-3xl w-20 h-full absolute left-200 z-10" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -right-3 hidden w-108 bg-cover bg-center bg-no-repeat sm:block"
        style={{ backgroundImage: `url(${mascotImage})` }}
      />

      <div className="pointer-events-none absolute inset-y-0 right-62.5 z-10 hidden w-62.5 bg-linear-to-r from-[#02030c] via-[rgba(2,3,12,0.62)] to-transparent sm:block" />
    </section>
  );
}
