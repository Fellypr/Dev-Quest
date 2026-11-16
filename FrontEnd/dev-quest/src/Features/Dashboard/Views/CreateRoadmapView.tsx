"use client";

import { useState } from "react";
import { CriarRoadmapViewProps } from "../Types/CreateRoadmap.Type";
import {
  CardDesenvolvimentoWeb,
  CardDesenvolvimentoMobile,
} from "../Components/SpecialtyCard";
import { BackButton } from "../Components/BackButton";
import { ContinueButton } from "../Components/ContinueButton";

export function CriarRoadmapView({ onBack, onContinue }: CriarRoadmapViewProps) {
  const [selectedTrack, setSelectedTrack] = useState<"web" | "mobile">("web");

  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-[#9c33ff]">Novo roadmap</p>
          <h1 className="text-[24px] font-bold text-[#f5f5ff]">
            Criar roadmap com IA
          </h1>
        </div>

        <BackButton onClick={onBack} />
      </div>

      <section className="flex flex-col items-center justify-between gap-8 rounded-xl border border-[#1a2442] bg-[#050914] p-5 sm:px-8 sm:py-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-2 rounded-full border border-[#1e2756] bg-[#131b3d] px-3 py-1">
            <span className="size-2 rounded-full bg-[#14dbff]" />
            <span className="text-[11px] font-semibold tracking-wider text-[#a3adc7] uppercase">
              ETAPA 01 DE 03 • DIRETRIZ DA TRILHA
            </span>
          </div>

          <h2 className="text-xl font-bold text-[#f8fafc] sm:text-2xl">
            Em qual área você deseja focar seus estudos?
          </h2>

          <p className="max-w-160 text-xs text-[#a3adc7] sm:text-sm">
            Seu roadmap será calibrado com desafios práticos, projetos do mundo
            real e árvores de habilidades sob medida.
          </p>
        </div>

        <div className="grid w-full max-w-224 grid-cols-1 justify-items-center gap-8 lg:grid-cols-2">
          <CardDesenvolvimentoWeb
            isActive={selectedTrack === "web"}
            onClick={() => setSelectedTrack("web")}
          />
          <CardDesenvolvimentoMobile
            isActive={selectedTrack === "mobile"}
            onClick={() => setSelectedTrack("mobile")}
          />
        </div>

        <div className="flex w-full max-w-224 flex-col items-center justify-between gap-4 border-t border-[#161f3b] pt-4 sm:flex-row">
          <div className="flex items-center gap-2 text-xs text-[#808cad]">
            <span className="text-sm font-semibold text-[#7d5cff]">ℹ</span>
            <p>
              Você poderá alternar ou adicionar novos roadmaps a qualquer
              momento no seu perfil.
            </p>
          </div>

          <ContinueButton
            onClick={onContinue}
            label="Continuar para calibração de nível"
          />
        </div>
      </section>
    </section>
  );
}

export const CreateRoadmapView = CriarRoadmapView;
