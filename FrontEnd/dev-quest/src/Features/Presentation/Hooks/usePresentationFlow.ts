"use client";

import { useState, useCallback, useRef } from "react";
import gsap from "gsap";
import { AreaCardItem, PresentationStep } from "../Types/Presentation.types";

interface ZoomBox {
  top: number;
  left: number;
  width: number;
  height: number;
  color: string;
  image?: string;
  videoUrl?: string;
}

export function usePresentationFlow() {
  const [step, setStep] = useState<PresentationStep>("intro");
  const [selectedCard, setSelectedCard] = useState<AreaCardItem | null>(null);
  const [zoomBox, setZoomBox] = useState<ZoomBox | null>(null);

  const activeCardElementRef = useRef<HTMLElement | null>(null);
  const zoomOverlayRef = useRef<HTMLDivElement>(null);
  const savedBoxRef = useRef<ZoomBox | null>(null);

  const startZoomTransition = useCallback(
    (card: AreaCardItem, cardElement: HTMLElement) => {
      setSelectedCard(card);
      activeCardElementRef.current = cardElement;
      setStep("zooming_in");

      const rect = cardElement.getBoundingClientRect();
      const initialBox: ZoomBox = {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        color: card.color,
        image: card.image,
        videoUrl: card.videoUrl,
      };

      savedBoxRef.current = initialBox;
      setZoomBox(initialBox);

      requestAnimationFrame(() => {
        const overlay = zoomOverlayRef.current;
        if (!overlay) {
          setStep("selected");
          return;
        }

        gsap.set(overlay, {
          top: initialBox.top,
          left: initialBox.left,
          width: initialBox.width,
          height: initialBox.height,
          borderRadius: "1rem",
          opacity: 1,
          scale: 1,
        });

        gsap.to(overlay, {
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          borderRadius: 0,
          duration: 0.85,
          ease: "power3.inOut",
          onComplete: () => {
            setStep("selected");
            setZoomBox(null);
          },
        });
      });
    },
    [],
  );

  const startZoomOutTransition = useCallback(() => {
    if (!selectedCard) {
      setStep("selecting");
      return;
    }

    setStep("zooming_out");

    // Recalcula o alvo do card caso a janela tenha mudado levemente ou usa o gravado
    let targetBox = savedBoxRef.current;
    if (activeCardElementRef.current) {
      const rect = activeCardElementRef.current.getBoundingClientRect();
      targetBox = {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        color: selectedCard.color,
        image: selectedCard.image,
        videoUrl: selectedCard.videoUrl,
      };
      savedBoxRef.current = targetBox;
    }

    if (!targetBox) {
      setStep("selecting");
      setSelectedCard(null);
      setZoomBox(null);
      return;
    }

    setZoomBox(targetBox);

    requestAnimationFrame(() => {
      const overlay = zoomOverlayRef.current;
      if (!overlay) {
        setStep("selecting");
        setSelectedCard(null);
        setZoomBox(null);
        return;
      }

      // Inicia da tela cheia
      gsap.set(overlay, {
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
        opacity: 1,
      });

      // Animação inversa (zoom out) encolhendo de volta para a posição do card
      gsap.to(overlay, {
        top: targetBox.top,
        left: targetBox.left,
        width: targetBox.width,
        height: targetBox.height,
        borderRadius: "1rem",
        duration: 0.85,
        ease: "power3.inOut",
        onComplete: () => {
          setStep("selecting");
          setSelectedCard(null);
          setZoomBox(null);
          activeCardElementRef.current = null;
        },
      });
    });
  }, [selectedCard]);

  const resetFlow = useCallback(() => {
    setSelectedCard(null);
    setZoomBox(null);
    activeCardElementRef.current = null;
    setStep("selecting");
  }, []);

  return {
    step,
    setStep,
    selectedCard,
    zoomBox,
    zoomOverlayRef,
    startZoomTransition,
    startZoomOutTransition,
    resetFlow,
  };
}
