import { SideBar } from "./components/sideBar";
import Image from "next/image";
import { Sun } from 'lucide-react';

export function DashboardMain() {
  return (
    <main className="flex">
      <nav>
        <SideBar />
      </nav>
      <section className="w-full">
        <header className="w-full flex justify-end items-center p-5 px-10 gap-4">
            <div className="bg-[#181e3d] border border-[#1a275e] rounded-full p-3">
                <Sun size={20}/>
            </div>
            <div className="bg-[#181e3d] border border-[#1a275e] rounded-full p-1.5">
                <Image src="/images/roboIconPerfil.png" alt="" width={12} height={12} className="w-8" />
            </div>
        </header>
      </section>
    </main>
  );
}
