"use client";

import { useSearchParams } from "next/navigation";
import { CartaDeBoasVindasDashboard } from "../Components/WelcomeCard";
import { CartaDeConviteRoadmap } from "../Components/RoadmapInviteCard";
import { CartaRoadmap } from "../Components/RoadmapCard";
import { useUserPreferences } from "@/Features/Presentation";

type HomeDashboardViewProps = {
  onCreateRoadmap: () => void;
};

export function HomeDashboardView({ onCreateRoadmap }: HomeDashboardViewProps) {
  const searchParams = useSearchParams();
  const { preferences } = useUserPreferences();

  // Prioriza o searchParams da URL ou as preferências persistidas
  const activeArea = searchParams.get("area") || preferences?.area?.label;
  const activeLevel = searchParams.get("level") || preferences?.level;
  const activeLanguage = searchParams.get("lang") || preferences?.language;

  const hasCustomTrajectory = Boolean(activeLanguage);

  return (
    <div className="flex flex-col gap-4">
      <CartaDeBoasVindasDashboard
        onCreateRoadmap={onCreateRoadmap}
        areaLabel={activeArea || undefined}
        levelLabel={activeLevel || undefined}
        language={activeLanguage || undefined}
      />

      <div className="flex items-center justify-between">
        <h2 className="text-[15px] font-semibold text-[#F0F2FF] md:text-[23px]">
          Seus Roadmaps
        </h2>
        {hasCustomTrajectory && (
          <span className="text-xs text-[#a3adc7]">
            Trilha ativa baseada nas suas escolhas
          </span>
        )}
      </div>

      {hasCustomTrajectory ? (
        <div className="flex flex-col gap-3">
          <CartaRoadmap
            technology={activeLanguage || "TypeScript"}
            level={activeLevel || "junior"}
            area={activeArea || "Desenvolvimento Web"}
            progress={20}
            onContinue={onCreateRoadmap}
          />
          <CartaDeConviteRoadmap onCreateRoadmap={onCreateRoadmap} />
        </div>
      ) : (
        <CartaDeConviteRoadmap onCreateRoadmap={onCreateRoadmap} />
      )}
    </div>
  );
}
