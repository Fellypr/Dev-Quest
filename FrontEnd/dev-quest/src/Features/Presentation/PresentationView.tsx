"use client";

import Image from "next/image";
import { AnimatedPhrase } from "./components/AnimatedPhrase";
import { AreaSelectedScreen } from "./components/AreaSelectedScreen";
import { usePresentationFlow } from "./Hook/usePresentationFlow";

export function PresentationPage() {
  const {
    step,
    selectedCard,
    zoomBox,
    zoomOverlayRef,
    startZoomTransition,
    startZoomOutTransition,
  } = usePresentationFlow();

  const isSelected = step === "selected";
  const isZoomingIn = step === "zooming_in";
  const hasSelectedOnce = step !== "intro";

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#020308] text-white">
      {/* Top Navbar / Logo com transição suave */}
      <nav
        className="w-full h-32 flex items-center justify-center z-50 absolute transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: isZoomingIn || isSelected ? 0 : 1,
        }}
      >
        <Image
          src="/icon/LogoComNomeSemFundo.png"
          alt="Dev-Quest Logo"
          width={280}
          height={80}
          priority
        />
      </nav>

      {/* Glows de fundo com transição suave */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[140px] right-1/3 -translate-x-[51%] h-[420px] w-[680px] max-w-[90vw] select-none transition-opacity duration-700"
        style={{ opacity: isZoomingIn || isSelected ? 0 : 1 }}
      >
        <div
          className="h-full w-full rounded-full opacity-50 blur-[105px]"
          style={{
            background:
              "linear-gradient(98deg, #1d4ed8 0%, #3b82f6 18%, #60a5fa 28%, #6366f1 42%, #7c3aed 58%, #6826ac 78%, #4c1d95 100%)",
          }}
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[360px] -right-[180px] h-[640px] w-[680px] max-w-[85vw] select-none transition-opacity duration-700"
        style={{ opacity: isZoomingIn || isSelected ? 0 : 1 }}
      >
        <div
          className="h-full w-full rounded-full opacity-85 blur-[120px]"
          style={{
            background:
              "linear-gradient(135deg, #1e40af 0%, #2563eb 20%, #38bdf8 32%, #4f46e5 48%, #7c3aed 68%, #6825a9 85%, #4c1d95 100%)",
          }}
        />
      </div>

      {/* Frases e Carrossel: mantidos montados para não reiniciar o fluxo do zero */}
      <AnimatedPhrase
        onSelectCard={startZoomTransition}
        isZoomingIn={isZoomingIn}
        skipIntro={hasSelectedOnce}
      />

      {/* Tela final após o zoom in */}
      {isSelected && selectedCard && (
        <div className="fixed inset-0 z-40">
          <AreaSelectedScreen
            card={selectedCard}
            onBack={startZoomOutTransition}
          />
        </div>
      )}

      {/* Overlay de Zoom imersivo com GSAP (Apenas durante as transições de zoom) */}
      {!isSelected && zoomBox && (
        <div
          ref={zoomOverlayRef}
          className="fixed pointer-events-none z-[9999] shadow-2xl overflow-hidden"
          style={{
            backgroundColor: zoomBox.color,
          }}
        >
          {zoomBox.image && (
            <img
              src={zoomBox.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}
    </div>
  );
}
