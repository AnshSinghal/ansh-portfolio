import { motion } from "motion/react";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";

const HeroText = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Ansh Singhal
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-200">
          AI/ML Engineer & Open Source Contributor
        </h2>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Building intelligent solutions and contributing to the open-source community
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row gap-4 justify-center"
        >
          <a
            href="#projects"
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
          >
            Contact Me
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroText;
