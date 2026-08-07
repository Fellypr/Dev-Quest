const mascotImage =
  "https://www.figma.com/api/mcp/asset/f2d472b5-7cd2-4b2a-b172-e150cf031702.png";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#02030f] p-6 font-['Manrope',sans-serif]">
      <section className="relative flex min-h-[216px] w-full items-center overflow-hidden rounded-[14px] border border-[rgba(48,14,105,0.9)] bg-[linear-gradient(90deg,#08041f_0%,#02030f_42%,#02020b_64%,#0e021d_100%)] pl-10 sm:pl-[46px]">
        <div className="relative z-20 flex flex-col items-start gap-[14px]">
          <h1 className="text-[28px] font-bold leading-normal text-[#f5f5ff]">
            Olá, Luiz! 👋
          </h1>

          <p className="max-w-[300px] text-[15px] font-normal leading-[23px] text-[#d9def0]">
            Crie seu roadmap personalizado com IA
            <br />
            e comece sua jornada de aprendizado.
          </p>

          <button
            type="button"
            className="flex h-12 w-[228px] items-center justify-between rounded-[9px] bg-gradient-to-r from-[#6114ff] to-[#2b38ff] pl-[22px] pr-[18px] text-white transition duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8d6cff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08041f]"
          >
            <span className="text-sm font-semibold">Criar novo roadmap</span>
            <span aria-hidden="true" className="text-xl font-normal text-[#e0e0ff]">
              +
            </span>
          </button>
        </div>

        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[432px] sm:block">
          <img
            src={mascotImage}
            alt=""
            className="size-full object-cover object-center"
          />
        </div>

        <div className="pointer-events-none absolute inset-y-0 right-[250px] z-10 hidden w-[250px] bg-gradient-to-r from-[#02030c] via-[rgba(2,3,12,0.62)] to-transparent sm:block" />
      </section>
    </main>
  );
}