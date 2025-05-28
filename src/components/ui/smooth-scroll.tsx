"use client";
import React, { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { useMediaQuery } from "react-responsive";

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isMobile) return;

    try {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        infinite: false,
      });

      let rafId: number;

      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);

      return () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
      };
    } catch (error) {
      console.error("Smooth scroll initialization failed:", error);
      setIsError(true);
    }
  }, [isMobile]);

  // If there's an error or we're on mobile, render without smooth scroll
  if (isError || isMobile) {
    return <>{children}</>;
  }

  return <>{children}</>;
}; 