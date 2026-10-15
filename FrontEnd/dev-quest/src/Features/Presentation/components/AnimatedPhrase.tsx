"use client";

import { useEffect, useState } from "react";
import { PracticeAreaCarousel } from "@/components/PracticeAreaCarousel";

const PHRASES = [
  "Olá Fellype, bem-vindo ao Dev-Quest",
  "Em qual área você deseja focar seus estudos?",
];
const CARDS = [
  { color: "#6559ff", label: "Desenvolvimento Web" },
  { color: "#14dbff", label: "Desenvolvimento Mobile" },
  { color: "#ff3d52", label: "Data Science" },
];

const DISPLAY_DURATION = 2000; // ms visível
const FADE_DURATION = 1500;    // ms do fade
const FLOAT_DELAY = 300;       // ms após ficar visível antes de subir
const FLOAT_DURATION = 1000;    // ms da animação de subir

type Phase = "fadeIn" | "visible" | "fadeOut";

export function AnimatedPhrase() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("fadeOut");
  const [text, setText] = useState(PHRASES[0]);
  const [floatedUp, setFloatedUp] = useState(false);
  const [carouselVisible, setCarouselVisible] = useState(false);

  const isLastPhrase = index === PHRASES.length - 1;

  // Inicia o fade-in após pintar o estado invisível
  useEffect(() => {
    const init = setTimeout(() => setPhase("fadeIn"), 80);
    return () => clearTimeout(init);
  }, []);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "fadeIn") {
      timeout = setTimeout(() => setPhase("visible"), FADE_DURATION);
    } else if (phase === "visible") {
      if (isLastPhrase) {
        // Para no loop e dispara o float após o delay
        timeout = setTimeout(() => setFloatedUp(true), DISPLAY_DURATION + FLOAT_DELAY);
      } else {
        timeout = setTimeout(() => setPhase("fadeOut"), DISPLAY_DURATION);
      }
    } else if (phase === "fadeOut") {
      timeout = setTimeout(() => {
        const next = (index + 1) % PHRASES.length;
        setText(PHRASES[next]);
        setIndex(next);
        setPhase("fadeIn");
      }, FADE_DURATION);
    }

    return () => clearTimeout(timeout);
  }, [phase, isLastPhrase]);

  // Quando o float termina, exibe o carousel
  useEffect(() => {
    if (!floatedUp) return;
    const t = setTimeout(() => setCarouselVisible(true), FLOAT_DURATION);
    return () => clearTimeout(t);
  }, [floatedUp]);

  const getStyles = (): React.CSSProperties => {
    if (phase === "fadeIn") {
      return {
        opacity: 1,
        transform: "translateY(0px)",
        transition: `opacity ${FADE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${FADE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        willChange: "opacity, transform",
      };
    }
    if (phase === "visible") {
      return {
        opacity: 1,
        transform: floatedUp ? "translateY(-12rem)" : "translateY(0px)",
        transition: floatedUp
          ? `transform ${FLOAT_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`
          : "none",
        willChange: "transform",
      };
    }
    // fadeOut
    return {
      opacity: 0,
      transform: "translateY(0px)",
      transition: `opacity ${FADE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${FADE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      willChange: "opacity, transform",
    };
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <h1
        style={getStyles()}
        className="text-5xl font-bold text-center px-7 max-w-6xl"
      >
        {text}
      </h1>

      <div
        className="absolute bottom-20"
        style={{
          opacity: carouselVisible ? 1 : 0,
          transform: carouselVisible ? "translateY(0px)" : "translateY(12px)",
          transition: "opacity 900ms cubic-bezier(0.4, 0, 0.2, 1), transform 900ms cubic-bezier(0.4, 0, 0.2, 1)",
          pointerEvents: carouselVisible ? "auto" : "none",
        }}
      >
        <PracticeAreaCarousel cards={CARDS} />
      </div>
    </div>
  );
}
