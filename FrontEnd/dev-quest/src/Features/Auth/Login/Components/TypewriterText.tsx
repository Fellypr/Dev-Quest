"use client";

import { Children, createElement, isValidElement, useMemo, type ReactNode } from "react";

type TypewriterMode = "char" | "word";

interface TypewriterTextProps {
  children: ReactNode;
  /** Whether to animate character-by-character or word-by-word. @default "char" */
  mode?: TypewriterMode;
  /** Delay (ms) between each animated unit. @default 35 */
  delayPerUnit?: number;
  /** Delay (ms) before the first unit starts animating. @default 0 */
  startDelay?: number;
  /** Duration of each unit's animation (ms). @default 420 */
  duration?: number;
  /** Optional className applied to the wrapper element. */
  className?: string;
  /** The element type to render as (e.g. "h1", "p", "span"). @default "span" */
  as?: keyof React.JSX.IntrinsicElements;
  /** Show a blinking cursor at the end after animation completes. @default false */
  showCursor?: boolean;
}

/** Splits a string into characters, preserving grapheme boundaries. */
function splitChars(text: string): string[] {
  return Array.from(text);
}

/** Splits a string into words, keeping whitespace tokens separate so spacing is preserved. */
function splitWords(text: string): string[] {
  return text.split(/(\s+)/);
}

/** Returns true when a token is only whitespace. */
function isWhitespace(token: string): boolean {
  return /^\s+$/.test(token);
}

/**
 * Builds a flat list of animated ReactNodes from a text string.
 * Each character/word is wrapped in a span with the appropriate animation class.
 */
function animateText(
  text: string,
  mode: TypewriterMode,
  unitClass: string,
  startDelay: number,
  delayPerUnit: number,
  duration: number,
  indexRef: { current: number },
): ReactNode[] {
  const nodes: ReactNode[] = [];
  const units = mode === "char" ? splitChars(text) : splitWords(text);

  units.forEach((unit) => {
    if (isWhitespace(unit)) {
      nodes.push(unit);
      return;
    }
    const delay = startDelay + indexRef.current * delayPerUnit;
    nodes.push(
      <span
        key={`u-${indexRef.current}-${unit}`}
        className={unitClass}
        style={{
          animationDelay: `${delay}ms`,
          animationDuration: `${duration}ms`,
        }}
      >
        {unit === " " ? " " : unit}
      </span>,
    );
    indexRef.current += 1;
  });

  return nodes;
}

/**
 * Recursively walks the ReactNode tree and returns a flat array of animated nodes.
 * Text strings get split into animated spans.
 * Nested elements (e.g. <span className="text-[#6847ff]">) are preserved as wrappers,
 * with their text children animated inside them.
 */
function walkAndAnimate(
  children: ReactNode,
  mode: TypewriterMode,
  unitClass: string,
  startDelay: number,
  delayPerUnit: number,
  duration: number,
  indexRef: { current: number },
  keyPrefix: string,
): ReactNode[] {
  const out: ReactNode[] = [];

  Children.forEach(children, (child, idx) => {
    if (typeof child === "string") {
      out.push(...animateText(child, mode, unitClass, startDelay, delayPerUnit, duration, indexRef));
    } else if (isValidElement(child)) {
      const el = child as React.ReactElement<{ children?: ReactNode }>;
      const inner = el.props.children;

      if (inner == null) {
        out.push(child);
      } else if (typeof inner === "string") {
        // Simple text child — animate it inside the wrapper element
        const animated = animateText(inner, mode, unitClass, startDelay, delayPerUnit, duration, indexRef);
        out.push(createElement(el.type, { ...el.props, key: `el-${keyPrefix}-${idx}` }, ...animated));
      } else {
        // Recursively handle children with children
        const animated = walkAndAnimate(inner, mode, unitClass, startDelay, delayPerUnit, duration, indexRef, `${keyPrefix}-${idx}`);
        out.push(createElement(el.type, { ...el.props, key: `el-${keyPrefix}-${idx}` }, ...animated));
      }
    } else if (child == null || typeof child === "boolean") {
      // Skip null, undefined, boolean
    }
  });

  return out;
}

/**
 * Counts how many animated units are in a text string.
 */
function countUnits(text: string, mode: TypewriterMode): number {
  const units = mode === "char" ? splitChars(text) : splitWords(text);
  return units.filter((u) => !isWhitespace(u)).length;
}

/**
 * Walks children to calculate the total number of animated units.
 */
function countAllUnits(children: ReactNode, mode: TypewriterMode): number {
  let count = 0;

  const walk = (node: ReactNode) => {
    Children.forEach(node, (c) => {
      if (typeof c === "string") {
        count += countUnits(c, mode);
      } else if (isValidElement(c)) {
        walk((c as React.ReactElement<{ children?: ReactNode }>).props.children);
      }
    });
  };

  walk(children);
  return count;
}

export function TypewriterText({
  children,
  mode = "char",
  delayPerUnit = 35,
  startDelay = 0,
  duration = 420,
  className,
  as = "span",
  showCursor = false,
}: TypewriterTextProps) {
  const unitClass = mode === "char" ? "animate-typewriter-char" : "animate-typewriter-word";

  const rendered = useMemo(() => {
    const indexRef = { current: 0 };
    return walkAndAnimate(children, mode, unitClass, startDelay, delayPerUnit, duration, indexRef, "rt");
  }, [children, mode, unitClass, startDelay, delayPerUnit, duration]);

  const totalUnits = useMemo(() => countAllUnits(children, mode), [children, mode]);

  return createElement(
    as,
    { className },
    ...rendered,
    showCursor
      ? createElement("span", {
          className: "typewriter-cursor",
          style: { animationDelay: `${startDelay + totalUnits * delayPerUnit + duration}ms` },
          "aria-hidden": "true",
          key: `cursor`,
        })
      : null,
  );
}