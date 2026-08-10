export function CartaRoadmap() {
  return (
      <section className="flex w-full flex-col gap-6 overflow-hidden rounded-[13px] border border-[#161f3b] bg-[#040711] px-[18px] py-[18px] md:flex-row md:items-center md:pr-[22px]">
        <div className="flex min-h-[112px] w-full items-center gap-[18px] md:w-[390px] md:shrink-0">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-xl border border-[#481673] bg-[#13061f]">
            <span className="text-2xl font-bold text-[#a130ff]">C#</span>
          </div>

          <div className="flex min-w-0 flex-1 flex-col items-start gap-[7px]">
            <h2 className="text-lg font-semibold leading-normal text-[#f2f5ff]">
              C#
            </h2>

            <p className="text-[11px] font-normal leading-normal text-[#99a3bd]">
              Junior
            </p>

            <div className="flex w-full items-center gap-3">
              <div
                aria-label="Progresso do roadmap: 25%"
                aria-valuemax={100}
                aria-valuemin={0}
                aria-valuenow={25}
                className="h-[7px] w-full max-w-[210px] overflow-hidden rounded bg-[#111426]"
                role="progressbar"
              >
                <div className="h-full w-1/4 rounded bg-gradient-to-r from-[#8c1fff] to-[#294dff]" />
              </div>

              <span className="shrink-0 text-[13px] font-semibold text-[#9c3dff]">
                25%
              </span>
            </div>

            <p className="text-[10px] font-normal leading-normal text-[#8f99b2]">
              Última atividade: 1 dia atrás
            </p>
          </div>
        </div>

        <div className="hidden h-[104px] w-px shrink-0 bg-[#161c33] md:block" />

        <div className="flex min-w-0 flex-1 flex-col items-start gap-[7px]">
          <p className="text-[11px] font-medium leading-normal text-[#9c33ff]">
            Próxima etapa
          </p>

          <h3 className="text-sm  md:text-[18px] font-semibold leading-normal text-[#f5f5ff]">
            Condicionais
          </h3>

          <p className="text-[11px] md:text-[14px] font-normal leading-[17px] text-[#a3adc7]">
            Aprenda a tomar decisões
            <br />
            no seu código.
          </p>
        </div>

        <button
          type="button"
          className="flex h-10 w-32 shrink-0 items-center justify-between rounded-lg border border-[#4a2bad] pl-4 pr-[14px] text-[#7d5cff] transition-colors hover:border-[#7d5cff] hover:bg-[#120b2b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7d5cff]"
        >
          <span className="text-xs font-semibold">Continuar</span>
          <span aria-hidden="true" className="text-[25px] font-bold pb-2">
            →
          </span>
        </button>
      </section>

  );
}