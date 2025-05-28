import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";

const ParallaxBackground = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Preload images
    const images = [
      '/assets/sky.jpg',
      '/assets/mountain-3.png',
      '/assets/planets.png',
      '/assets/mountain-2.png',
      '/assets/mountain-1.png'
    ];

    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    };

    Promise.all(images.map(loadImage))
      .then(() => setIsLoaded(true))
      .catch((err) => {
        console.error('Error loading background images:', err);
        setError(true);
      });
  }, []);

  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { 
    damping: 50,
    stiffness: 100,
    mass: 0.5
  });
  
  // Simplified transforms for mobile
  const mountainY = useTransform(x, [0, 0.5], ["0%", isMobile ? "20%" : "50%"]);
  const planetsX = useTransform(x, [0, 0.5], ["0%", isMobile ? "-5%" : "-15%"]);

  if (error) {
    return (
      <section className="absolute inset-0 bg-black/40">
        <div className="relative h-screen overflow-y-hidden">
          <div
            className="absolute inset-0 w-full h-screen -z-50"
            style={{
              backgroundImage: "url(/assets/sky.jpg)",
              backgroundPosition: "bottom",
              backgroundSize: "cover",
            }}
          />
        </div>
      </section>
    );
  }

  if (!isLoaded) {
    return (
      <section className="absolute inset-0 bg-black/40">
        <div className="relative h-screen overflow-y-hidden" />
      </section>
    );
  }

  return (
    <section className="absolute inset-0 bg-black/40">
      <div className="relative h-screen overflow-y-hidden">
        {/* Background Sky */}
        <div
          className="absolute inset-0 w-full h-screen -z-50"
          style={{
            backgroundImage: "url(/assets/sky.jpg)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
          }}
        />
        {/* Mountains - Combined layers for mobile */}
        <motion.div
          className="absolute inset-0 -z-40"
          style={{
            backgroundImage: "url(/assets/mountain-3.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: mountainY,
          }}
        />
        {/* Planets */}
        <motion.div
          className="absolute inset-0 -z-30"
          style={{
            backgroundImage: "url(/assets/planets.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            x: planetsX,
          }}
        />
        {/* Additional mountain layers only for desktop */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute inset-0 -z-20"
              style={{
                backgroundImage: "url(/assets/mountain-2.png)",
                backgroundPosition: "bottom",
                backgroundSize: "cover",
                y: useTransform(x, [0, 0.5], ["0%", "20%"]),
              }}
            />
            <motion.div
              className="absolute inset-0 -z-10"
              style={{
                backgroundImage: "url(/assets/mountain-1.png)",
                backgroundPosition: "bottom",
                backgroundSize: "cover",
                y: useTransform(x, [0, 0.5], ["0%", "0%"]),
              }}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default ParallaxBackground;
