import { SideBar } from "./components/sideBar";
import { HeaderDashboard } from "./components/hearderDashboard";
import { CartaDeBoasVindasDashboard } from "./components/cartaDeboasVindas";
import {CartaDeConviteRoadmap} from "./components/cartaConviteRoadmap"
export function DashboardMain() {
  return (
    <main className="flex">
      
        <SideBar />
      <section className="w-full pl-5 pr-5">
          <HeaderDashboard />
        <div className="flex flex-col gap-3">
          <CartaDeBoasVindasDashboard />
          <h2 className="text-[15px] md:text-[23px]  text-[#F0F2FF]">Seus Roadmaps</h2>
          <CartaDeConviteRoadmap/>
        </div>
      </section>
    </main>
  );
}
