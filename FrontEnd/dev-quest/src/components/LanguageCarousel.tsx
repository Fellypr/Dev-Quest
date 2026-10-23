"use client";

import {
  WheelCarousel,
  type WheelCarouselItem,
  type WheelCarouselProps,
} from "@/components/ui/wheel-carousel";

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1200&q=80&auto=format&fit=crop`;

const languageItems: WheelCarouselItem[] = [
  {
    label: "JavaScript",
    image: unsplash("1627398242454-45a1465c2479"),
    imageAlt: "JavaScript code on screen",
  },
  {
    label: "TypeScript",
    image: unsplash("1555066931-4365d14bab8c"),
    imageAlt: "TypeScript development",
  },
  {
    label: "Python",
    image: unsplash("1526379095098-d400fd0bf935"),
    imageAlt: "Python programming",
  },
  {
    label: "Java",
    image: unsplash("1517694712202-14dd9538aa97"),
    imageAlt: "Java code on laptop",
  },
  {
    label: "C#",
    image: unsplash("1542831371-29b0f74f9713"),
    imageAlt: "C Sharp development",
  },
  {
    label: "Go",
    image: unsplash("1607799279861-4dd421887fc8"),
    imageAlt: "Go programming language",
  },
  {
    label: "Rust",
    image: unsplash("1504639725590-34d0984f1a00"),
    imageAlt: "Rust language code",
  },
  {
    label: "C++",
    image: unsplash("1515879218367-8c267d8c4ee4"),
    imageAlt: "C++ development setup",
  },
  {
    label: "Ruby",
    image: unsplash("1461749280684-dccba630e2f6"),
    imageAlt: "Ruby on Rails development",
  },
  {
    label: "Swift",
    image: unsplash("1537432376149-e36472f57d16"),
    imageAlt: "Swift iOS development",
  },
  {
    label: "Kotlin",
    image: unsplash("1504868584819-f8e8b4b6d7e3"),
    imageAlt: "Kotlin Android development",
  },
  {
    label: "PHP",
    image: unsplash("1484417894086-9429432eae24"),
    imageAlt: "PHP web development",
  },
  {
    label: "Dart",
    image: unsplash("1519389950473-47ba0277781c"),
    imageAlt: "Dart Flutter development",
  },
  {
    label: "Scala",
    image: unsplash("1550439062-609e1833e76a"),
    imageAlt: "Scala functional programming",
  },
  {
    label: "R",
    image: unsplash("1551288049-bebda4e38f71"),
    imageAlt: "R data science",
  },
  {
    label: "Elixir",
    image: unsplash("1558494949-ef010cbdcc31"),
    imageAlt: "Elixir functional programming",
  },
];

export interface LanguageCarouselProps
  extends Omit<WheelCarouselProps, "items"> {
  items?: WheelCarouselItem[];
}

export function LanguageCarousel({
  items = languageItems,
  mode = "custom",
  background = "transparent",
  panelColor = "rgba(255, 255, 255, 0.08)",
  textColor = "rgba(255, 255, 255, 0.45)",
  selectedColor = "#ffffff",
  markerColor = "#6C63FF",
  photoAspect = "3/4",
  photoRadius = 16,
  photoWidth = 28,
  contentWidth = 960,
  ...rest
}: LanguageCarouselProps) {
  return (
    <WheelCarousel
      items={items}
      mode={mode}
      background={background}
      panelColor={panelColor}
      textColor={textColor}
      selectedColor={selectedColor}
      markerColor={markerColor}
      photoAspect={photoAspect}
      photoRadius={photoRadius}
      photoWidth={photoWidth}
      contentWidth={contentWidth}
      {...rest}
    />
  );
}

export default LanguageCarousel;
