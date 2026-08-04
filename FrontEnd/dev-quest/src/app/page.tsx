import {Hero,NavbarLandingPage} from "@/Features/LandingPage" 

export default function LandingPage() {
  return (
    <main className="bg-background">
      <header className="w-screen absolute">
        <NavbarLandingPage/>
      </header>
      <section className=" w-screen h-screen">
          <Hero/>
      </section>
      <section className="min-h-100">
          <img src="images/TelaDoDashboard.png" alt="" />
      </section>
    </main>
  );
}
