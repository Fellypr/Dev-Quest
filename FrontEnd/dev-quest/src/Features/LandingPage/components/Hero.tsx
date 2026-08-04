'use client';

import { useState , useRef} from "react";


export function Hero(){
    const [showCta, setShowCta] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const urlVideo = "/Video/AnimacaoHero2.mp4";

    const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;
    setShowCta(video.duration - video.currentTime <= 2.5);
  };

  return (
    <main>
      <header>
      </header>
      <section className="relative w-screen h-screen overflow-hidden">
        <main className="relative h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src={urlVideo}
          autoPlay
          muted
          playsInline
          controls={false}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setShowCta(true)}
          className="absolute inset-0 h-full w-full object-cover"
          aria-label="Animação de abertura da DevQuest"
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />

        <div
          className={`absolute inset-x-0 bottom-14 flex flex-wrap items-center justify-center gap-4 px-6 transition-all duration-700 ease-out ${
            showCta
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-6 opacity-0"
          }`}
        >
          <a
            href="#"
            className="rounded-lg bg-gradient-to-r from-brand-violet to-brand-blue px-7 py-3 text-sm font-semibold text-[#f2f2f2] shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:scale-105"
          >
            Ver Desafios
          </a>
          <a
            href="#"
            className="rounded-lg border border-border bg-card/60 px-7 py-3 text-sm font-semibold text-[#f2f2f2] backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-card"
          >
            Começar Gratuitamente
          </a>
        </div>
      </main>
      </section>
    </main>
  );
}
