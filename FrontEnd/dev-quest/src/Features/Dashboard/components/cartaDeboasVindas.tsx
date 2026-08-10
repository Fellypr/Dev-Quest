const mascotImage =
  "https://www.figma.com/api/mcp/asset/f2d472b5-7cd2-4b2a-b172-e150cf031702.png";

export function CartaDeBoasVindasDashboard() {
  return (
    <section className="relative flex min-h-54 w-full items-center overflow-hidden rounded-xl border border-[rgba(48,14,105,0.9)] bg-[linear-gradient(90deg,#08041f_0%,#02030f_42%,#02020b_64%,#0e021d_60%)] pl-10 sm:pl-11.5">
      <div className="relative z-20 flex flex-col items-start gap-3.5">
        <h1 className="text-[28px] font-bold leading-normal text-[#f5f5ff]">
          Olá, Luiz! 👋
        </h1>

        <p className="max-w-75 text-[15px] font-normal leading-5.75 text-[#d9def0]">
          Crie seu roadmap personalizado com IA
          <br />
          e comece sua jornada de aprendizado.
        </p>

        <button
          type="button"
          className="flex h-12 w-57 items-center justify-between rounded-[10px] bg-linear-to-r from-[#6114ff] to-[#2b38ff] pl-5.5 pr-4.5 text-white transition duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8d6cff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08041f] cursor-pointer"
        >
          <span className="text-sm font-semibold">Criar novo roadmap</span>
          <span aria-hidden="true" className="text-xl font-normal text-[#e0e0ff]">
            +
          </span>
        </button>
      </div>
      <div className="bg-[linear-gradient(90deg,#08041f_0%,#02030f_42%,#02020b_100%,#0e021d_100%)] blur-3xl w-20 h-full absolute left-200 z-10"></div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -right-3 hidden w-108 bg-cover bg-center bg-no-repeat sm:block"
        style={{ backgroundImage: `url(${mascotImage})` }}
      />

      <div className="pointer-events-none absolute inset-y-0 right-62.5 z-10 hidden w-62.5 bg-linear-to-r from-[#02030c] via-[rgba(2,3,12,0.62)] to-transparent sm:block" />
    </section>
  );
}
