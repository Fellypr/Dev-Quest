import {Hero,NavbarLandingPage,ListCard} from "@/Features/LandingPage" 
import {Footer} from "../components/Footer"
import Image from "next/image";
export default function LandingPage() {
  return (
    <main className="bg-background">
      <header className="fixed left-0 top-0 z-50 w-full">
        <NavbarLandingPage/>
      </header>
      <section className=" w-screen h-screen">
          <Hero/>
      </section>
      <section className="min-h-100 pt-5 pb-5 flex items-center justify-center flex-col">
          <div
        aria-hidden
        className="pointer-events-none absolute inset-x-10 -bottom-90 h-80 rounded-full bg-brand-violet/50 blur-[120px]"
      />
          <Image 
            src={"/images/TelaDoDashboard.png"}
            alt=""
            width={900}
            height={100}
            className="z-10 rounded-2xl"
           />
           <ListCard/>

      </section>
      <footer>
          <Footer/>
      </footer>
    </main>
  );
}
