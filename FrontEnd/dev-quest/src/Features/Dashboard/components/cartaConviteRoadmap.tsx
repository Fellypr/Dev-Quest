
export function CartaDeConviteRoadmap(){
    return(
      <section className="flex w-full items-center justify-between gap-4 overflow-hidden rounded-[13px] border border-[#161f3b] bg-[#040711] px-[18px] py-[14px] sm:pr-[22px]">
        <div className="flex min-w-0 items-center gap-[14px]">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-dashed border-[#7533ff]">
            <span className="text-[26px] font-normal leading-none text-[#8c40ff]">
              +
            </span>
          </div>

          <div className="flex min-w-0 flex-col gap-1">
            <h2 className="text-[13px] font-semibold leading-normal text-[#ebedff]">
              Ainda não tem um roadmap?
            </h2>

            <p className="text-[11px] font-normal leading-normal text-[#96a1ba]">
              Crie agora seu roadmap personalizado com IA.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="flex h-10 w-[146px] shrink-0 items-center justify-center rounded-lg border border-[#5e1fb2] text-xs font-semibold text-[#9647ff] transition-colors hover:border-[#9647ff] hover:bg-[#140525] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9647ff]"
        >
          Criar roadmap
        </button>
      </section>
    )
}