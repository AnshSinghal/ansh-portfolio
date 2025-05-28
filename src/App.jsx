import React from "react";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experiences from "./sections/Experiences";
import Contact from "./sections/Contact";
import Footer from './sections/Footer';
import FloatingDockDemo from "./components/floating-dock-demo";
import { Particles } from "./components/Particles";
import { CustomScrollbar } from "./components/ui/custom-scrollbar";
import { SmoothScroll } from "./components/ui/smooth-scroll";
import { useMediaQuery } from "react-responsive";

const App = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });

  return (
    <SmoothScroll>
      <div className="relative min-h-screen overflow-x-hidden">
        <style jsx global>{`
          html {
            scrollbar-width: none;
            -ms-overflow-style: none;
            ${isMobile ? 'overflow-x: hidden;' : ''}
          }
          html::-webkit-scrollbar {
            display: none;
          }
          body {
            ${isMobile ? 'overflow-x: hidden; position: relative;' : ''}
          }
        `}</style>

        {/* Custom Scrollbar - Only show on desktop */}
        {!isMobile && <CustomScrollbar />}

        {/* Particles Background */}
        <div className="fixed inset-0 -z-10">
          <Particles
            className="absolute inset-0"
            quantity={isMobile ? 50 : 100}
            staticity={isMobile ? 20 : 30}
            color="#ffffff"
          />
        </div>
        
        {/* Floating Dock */}
        <div className="fixed top-0 left-0 w-full z-50">
          <FloatingDockDemo />
        </div>

        {/* Hero Section - Full Width */}
        <Hero />

        {/* Main Content Container */}
        <div className="container mx-auto max-w-7xl relative z-10">
          <About />
          <Projects />
          <Experiences />
          <Contact />
          <Footer/>
        </div>
      </div>
    </SmoothScroll>
  );
};

export default App;
