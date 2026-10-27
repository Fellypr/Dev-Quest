"use client";
import { Suspense, useState } from "react";
import { SideBar } from "./Components/SideBar";
import { HeaderDashboard } from "./Components/HeaderDashboard";
import { HomeDashboardView } from "./Views/HomeDashboardView";
import { CriarRoadmapView } from "./Views/CreateRoadmapView";

type DashboardView = "home" | "criar-roadmap";

export function DashboardMain() {
  const [activeView, setActiveView] = useState<DashboardView>("home");

  return (
    <main className="flex">
      <SideBar />
      <section className="w-full pl-5 pr-5">
        <HeaderDashboard />

        {activeView === "home" && (
          <Suspense fallback={<div className="p-8 text-[#a3adc7]">Carregando trilhas...</div>}>
            <HomeDashboardView
              onCreateRoadmap={() => setActiveView("criar-roadmap")}
            />
          </Suspense>
        )}


        {activeView === "criar-roadmap" && (
          <CriarRoadmapView onBack={() => setActiveView("home")} />
        )}
      </section>
    </main>
  );
}
