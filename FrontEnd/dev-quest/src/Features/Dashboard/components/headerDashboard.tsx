import Image from "next/image";
import { Sun } from 'lucide-react';
export function HeaderDashboard(){
    return(
        <nav className="w-full flex justify-end items-center p-5 px-10 gap-4">
            <div className="bg-[#181e3d] border border-[#1a275e] rounded-full p-3">
                <Sun size={18}/>
            </div>
            <div className="bg-[#181e3d] border border-[#1a275e] rounded-full p-1.5">
                <Image src="/images/roboIconPerfil.png" alt="" width={7} height={7} className="w-8" />
            </div>
        </nav>
    )
}