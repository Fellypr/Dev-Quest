"use client";

import { useState, useCallback } from "react";
import { StackOptionId, StackCardData } from "../Types/SelectStack.Type";

export const STACKS_DATA: StackCardData[] = [
  {
    id: "frontend",
    title: "FrontEnd",
    badgeText: "CLIENT-SIDE",
    color: "cyan",
    icon: "💻",
    description:
      "Criação de interfaces ricas, responsivas e intuitivas. Foco em componentização, arquitetura de UI, gerenciamento de estado e performance web.",
    pillars: ["React / Next.js", "TypeScript", "Tailwind", "State & UX"],
  },
  {
    id: "backend",
    title: "BackEnd",
    badgeText: "SERVER-SIDE",
    color: "green",
    icon: "⚙️",
    description:
      "Lógica de negócios, arquiteturas escaláveis e microsserviços. Foco em APIs REST/gRPC, modelagem de dados, mensageria, segurança e auth.",
    pillars: ["Node.js / C#", "PostgreSQL", "APIs & REST", "Docker & Auth"],
  },
  {
    id: "fullstack",
    title: "FullStack",
    badgeText: "PONTA A PONTA",
    color: "purple",
    icon: "🔮",
    description:
      "Visão holística do ciclo completo de desenvolvimento. Integração perfeita entre front-end interativo, infraestrutura, banco de dados e deploy.",
    pillars: ["Front + Back", "Bancos & Cache", "DevOps", "Arquitetura"],
  },
];

export function useSelectStack(
  initialStack: StackOptionId = "frontend",
  onContinueCallback?: (stack: StackOptionId) => void
) {
  const [selectedStack, setSelectedStack] = useState<StackOptionId>(initialStack);

  const selectStack = useCallback((stack: StackOptionId) => {
    setSelectedStack(stack);
  }, []);

  const handleContinue = useCallback(() => {
    onContinueCallback?.(selectedStack);
  }, [selectedStack, onContinueCallback]);

  return {
    selectedStack,
    selectStack,
    handleContinue,
    stacks: STACKS_DATA,
  };
}
