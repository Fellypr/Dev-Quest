import { Suspense } from "react";
import { DashboardMain } from "@/Features/Dashboard";

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center bg-[#020308] text-white">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#5B4FCF] border-t-transparent" />
            <p className="text-sm text-[#A9A9A9]">Carregando Dashboard...</p>
          </div>
        </div>
      }
    >
      <DashboardMain />
    </Suspense>
  );
}