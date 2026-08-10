import { SideBar } from "./components/sideBar";
import { HeaderDashboard } from "./components/hearderDashboard";
import {CartaDeBoasVindasDashboard} from "./components/cartaDeboasVindas" 
export function DashboardMain() {
  return (
    <main className="flex">
      <nav>
        <SideBar />
      </nav>
      <section className="w-full pl-5 pr-5">
        <header>
            <HeaderDashboard/>
        </header>
        <CartaDeBoasVindasDashboard/>
      </section>
    </main>
  );
}
