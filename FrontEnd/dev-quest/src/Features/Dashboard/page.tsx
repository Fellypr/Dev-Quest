"use client";

import { useState } from "react";
import { SideBar } from "./components/sideBar";
import { HeaderDashboard } from "./components/headerDashboard";
import { HomeDashboardView } from "./views/HomeDashboardView";
import { CriarRoadmapView } from "./views/CriarRoadmapView";

type DashboardView = "home" | "criar-roadmap";

export function DashboardMain() {
  const [activeView, setActiveView] = useState<DashboardView>("home");

  return (
    <main className="flex">
      <SideBar />
      <section className="w-full pl-5 pr-5">
        <HeaderDashboard />

        {activeView === "home" && (
          <HomeDashboardView
            onCreateRoadmap={() => setActiveView("criar-roadmap")}
          />
        )}

        {activeView === "criar-roadmap" && (
          <CriarRoadmapView onBack={() => setActiveView("home")} />
        )}
      </section>
    </main>
  );
}
