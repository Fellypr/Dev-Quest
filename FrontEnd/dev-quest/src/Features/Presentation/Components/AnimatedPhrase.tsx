"use client";

import { useEffect, useState } from "react";
import { PracticeAreaCarousel } from "@/components/PracticeAreaCarousel";
import { AreaCardItem, DEFAULT_PRACTICE_CARDS } from "../Types/Presentation.types";

interface AnimatedPhraseProps {
  onSelectCard?: (card: AreaCardItem, cardElement: HTMLElement) => void;
  isZoomingIn?: boolean;
  skipIntro?: boolean;
}

const PHRASES = [
  "Olá Fellype, bem-vindo ao Dev-Quest",
  "Em qual área você deseja focar seus estudos?",
];

const DISPLAY_DURATION = 2000; // ms visível
const FADE_DURATION = 1500;    // ms do fade
const FLOAT_DELAY = 300;       // ms após ficar visível antes de subir
const FLOAT_DURATION = 1000;    // ms da animação de subir

type Phase = "fadeIn" | "visible" | "fadeOut";

export function AnimatedPhrase({
  onSelectCard,
  isZoomingIn = false,
  skipIntro = false,
}: AnimatedPhraseProps) {
  const [index, setIndex] = useState(skipIntro ? PHRASES.length - 1 : 0);
  const [phase, setPhase] = useState<Phase>(skipIntro ? "visible" : "fadeOut");
  const [text, setText] = useState(skipIntro ? PHRASES[PHRASES.length - 1] : PHRASES[0]);
  const [floatedUp, setFloatedUp] = useState(skipIntro);
  const [carouselVisible, setCarouselVisible] = useState(skipIntro);

  const isLastPhrase = index === PHRASES.length - 1;


  // Inicia o fade-in após pintar o estado invisível
  useEffect(() => {
    if (skipIntro) return;
    const init = setTimeout(() => setPhase("fadeIn"), 80);
    return () => clearTimeout(init);
  }, [skipIntro]);

  useEffect(() => {
    if (skipIntro) return;
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
        setIndex((prevIndex) => {
          const next = (prevIndex + 1) % PHRASES.length;
          setText(PHRASES[next]);
          return next;
        });
        setPhase("fadeIn");
      }, FADE_DURATION);
    }

    return () => clearTimeout(timeout);
  }, [phase, isLastPhrase, skipIntro]);

  // Quando o float termina, exibe o carousel
  useEffect(() => {
    if (skipIntro) return;
    if (!floatedUp) return;
    const t = setTimeout(() => setCarouselVisible(true), FLOAT_DURATION);
    return () => clearTimeout(t);
  }, [floatedUp, skipIntro]);

  const getStyles = (): React.CSSProperties => {
    if (isZoomingIn) {
      return {
        opacity: 0,
        transform: "translateY(-14rem) scale(0.96)",
        transition: "opacity 400ms cubic-bezier(0.4, 0, 0.2, 1), transform 400ms cubic-bezier(0.4, 0, 0.2, 1)",
        willChange: "opacity, transform",
      };
    }
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
          opacity: isZoomingIn ? 0 : carouselVisible ? 1 : 0,
          transform: isZoomingIn
            ? "translateY(24px) scale(0.96)"
            : carouselVisible
              ? "translateY(0px)"
              : "translateY(12px)",
          transition:
            "opacity 450ms cubic-bezier(0.4, 0, 0.2, 1), transform 450ms cubic-bezier(0.4, 0, 0.2, 1)",
          pointerEvents: carouselVisible && !isZoomingIn ? "auto" : "none",
        }}
      >
        <PracticeAreaCarousel
          cards={DEFAULT_PRACTICE_CARDS}
          disabled={isZoomingIn}
          onSelectCard={(card, _index, element) => {
            onSelectCard?.(card, element);
          }}
        />
      </div>
    </div>
  );
}
