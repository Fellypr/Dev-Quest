type CriarRoadmapViewProps = {
  onBack: () => void;
};

const tecnologiasSugeridas = ["C#", "JavaScript", "React", "Node.js"];
const niveis = ["Iniciante", "Junior", "Intermediario"];

export function CriarRoadmapView({ onBack }: CriarRoadmapViewProps) {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-[#9c33ff]">Novo roadmap</p>
          <h1 className="text-[24px] font-bold text-[#f5f5ff]">
            Criar roadmap com IA
          </h1>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="flex h-10 items-center justify-center rounded-lg border border-[#263057] px-4 text-xs font-semibold text-[#aeb8d6] transition-colors hover:border-[#6559ff] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6559ff]"
        >
          Voltar
        </button>
      </div>

      
      

      
    </section>
  );
}
