import React from "react";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Projects from "../sections/Projects";
import Experiences from "../sections/Experiences";
import Contact from "../sections/Contact";
import Footer from '../sections/Footer';

const HomePage = () => {
  return (
    <>
      <section id="hero">
        <Hero />
      </section>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <section id="about">
          <About />
        </section>
        
        <section id="projects">
          <Projects />
        </section>
        
        <section id="experiences">
          <Experiences />
        </section>
        
        <section id="contact">
          <Contact />
        </section>
        
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
