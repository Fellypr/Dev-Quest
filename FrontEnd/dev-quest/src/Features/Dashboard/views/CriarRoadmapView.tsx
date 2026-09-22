import {PracticeAreaCarousel} from "../components/PracticeAreaCarousel";


type CriarRoadmapViewProps = {
  onBack: () => void;
};

const tecnologiasSugeridas = ["C#", "JavaScript", "React", "Node.js"];
const niveis = ["Iniciante", "Junior", "Intermediario"];
const CARDS = [
  { color: "#6559ff", label: "JavaScript" },
  { color: "#14dbff", label: "Python" },
  { color: "#ff3d52", label: "React" },
  { color: "#00c853", label: "Node.js" },
  { color: "#ff9100", label: "TypeScript" },
  { color: "#e040fb", label: "CSS" },
  { color: "#ffd600", label: "HTML" },
];


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

      <section className="flex flex-col gap-3 rounded-xl border border-[#1a2442] bg-[#050914] p-5">
        <h2 className="text-lg font-semibold text-[#f5f5ff]">
          Escolha a area de atuação que deseja aprender
        </h2>
        <p className="text-base font-normal text-[#aeb8d6]">
          Selecione uma das areas sugeridas.
        </p>
        <PracticeAreaCarousel cards={CARDS} />
      </section>
      
      
    </section>
  );
}
