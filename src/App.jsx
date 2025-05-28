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

const App = () => {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen overflow-x-hidden">
        <style jsx global>{`
          html {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          html::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* Custom Scrollbar */}
        <CustomScrollbar />

        {/* Particles Background */}
        <div className="fixed inset-0 -z-10">
          <Particles
            className="absolute inset-0"
            quantity={100}
            staticity={30}
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
