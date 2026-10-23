import { CartaDeBoasVindasDashboard } from "../components/cartaDeboasVindas";
import { CartaDeConviteRoadmap } from "../components/cartaConviteRoadmap";

type HomeDashboardViewProps = {
  onCreateRoadmap: () => void;
};

export function HomeDashboardView({ onCreateRoadmap }: HomeDashboardViewProps) {
  return (
    <div className="flex flex-col gap-3">
      <CartaDeBoasVindasDashboard onCreateRoadmap={onCreateRoadmap} />

      <h2 className="text-[15px] text-[#F0F2FF] md:text-[23px]">
        Seus Roadmaps
      </h2>

      <CartaDeConviteRoadmap onCreateRoadmap={onCreateRoadmap} />
    </div>
  );
}
