"use client";

import { useEffect, useState } from "react";
import { DestinationCard } from "@/components/ui/card-21";
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
const FLOAT_DURATION = 1000;   // ms da animação de subir

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
  const [cardsVisible, setCardsVisible] = useState(skipIntro);

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

  // Quando o float termina, exibe os cards
  useEffect(() => {
    if (skipIntro) return;
    if (!floatedUp) return;
    const t = setTimeout(() => setCardsVisible(true), FLOAT_DURATION);
    return () => clearTimeout(t);
  }, [floatedUp, skipIntro]);

  const getStyles = (): React.CSSProperties => {
    if (isZoomingIn) {
      return {
        opacity: 0,
        transform: "translateY(-15rem) scale(0.96)",
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
        transform: floatedUp ? "translateY(-13rem)" : "translateY(0px)",
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
    <div className="w-full h-screen flex items-center justify-center relative overflow-hidden">
      <h1
        style={getStyles()}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center px-7 max-w-5xl z-10"
      >
        {text}
      </h1>

      <div
        className="absolute top-[88%] -translate-y-1/2 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-12 w-full max-w-5xl px-6 z-20"
        style={{
          opacity: isZoomingIn ? 0 : cardsVisible ? 1 : 0,
          transform: isZoomingIn
            ? "translateY(calc(-50% + 24px)) scale(0.96)"
            : cardsVisible
              ? "translateY(-50%)"
              : "translateY(calc(-50% + 16px))",
          transition:
            "opacity 450ms cubic-bezier(0.4, 0, 0.2, 1), transform 450ms cubic-bezier(0.4, 0, 0.2, 1)",
          pointerEvents: cardsVisible && !isZoomingIn ? "auto" : "none",
        }}
      >
        {DEFAULT_PRACTICE_CARDS.map((card) => (
          <div
            key={card.label}
            className="w-full max-w-[200px] sm:max-w-[320px] md:max-w-[300px] h-[400px] sm:h-[400px] md:h-[380px]"
          >
            <DestinationCard
              imageUrl={card.image || ""}
              location={card.label}
              flag={card.flag || "⚡"}
              stats={card.stats || ""}
              themeColor={card.themeColor || "245 75% 60%"}
              onClick={(e) => {
                if (!isZoomingIn) {
                  onSelectCard?.(card, e.currentTarget);
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
