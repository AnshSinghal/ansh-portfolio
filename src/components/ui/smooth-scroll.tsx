"use client";
import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { useMediaQuery } from "react-responsive";

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery({ maxWidth: 853 });

  useEffect(() => {
    if (isMobile) return; // Disable smooth scroll on mobile

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isMobile]);

  return <>{children}</>;
}; 