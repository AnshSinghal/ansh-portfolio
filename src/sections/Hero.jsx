import { motion } from "motion/react";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import { FlipWords } from "../components/FlipWords";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const handleHireMe = () => {
    window.location.href = "mailto:anshsinghal3107@gmail.com";
  };


  const skills = [
    { name: "Machine Learning", highlight: false },
    { name: "Deep Learning", highlight: true },
    { name: "MLOps", highlight: false },
    { name: "Data Science", highlight: false },
    { name: "Open Source", highlight: false },
  ];

  // Photo sizes - mobile larger and positioned higher
  const photoSize = isMobile ? "75vh" : isTablet ? "75vh" : "80vh";

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Main Container */}
      <div className="relative w-full h-full">

        {/* LARGE NAME - Positioned in UPPER portion */}
        <motion.div
          className="absolute left-0 right-0 flex justify-center select-none overflow-hidden cursor-default"
          style={{
            top: isMobile ? "5%" : "8%",
            zIndex: 1,
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="font-black text-center leading-none tracking-tighter cursor-default"
            style={{
              fontSize: isMobile ? "18vw" : isTablet ? "13vw" : "11vw",
              fontFamily: "'Funnel Display', sans-serif",
              whiteSpace: isMobile ? "normal" : "nowrap",
              letterSpacing: "-0.02em",
            }}
            animate={{
              color: ["rgba(255, 255, 255, 0.6)", "rgba(255, 255, 255, 0.95)", "rgba(255, 255, 255, 0.6)"],
              textShadow: [
                "0 0 30px rgba(122, 87, 219, 0.2), 0 0 60px rgba(122, 87, 219, 0.1)",
                "0 0 60px rgba(122, 87, 219, 0.6), 0 0 120px rgba(122, 87, 219, 0.4)",
                "0 0 30px rgba(122, 87, 219, 0.2), 0 0 60px rgba(122, 87, 219, 0.1)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {isMobile ? (
              <>ANSH<br />SINGHAL</>
            ) : (
              "ANSH SINGHAL"
            )}
          </motion.h1>
        </motion.div>

        {/* PHOTO - Desktop at bottom, Mobile positioned higher for blend effect */}
        <motion.div
          className={`absolute left-1/2 -translate-x-1/2 flex justify-center ${isMobile ? "top-[23%]" : "bottom-0 items-end"}`}
          style={{ zIndex: 10 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 80 }}
        >


          <img
            src="/Ansh-Singhal-Hero.png"
            alt="Ansh Singhal"
            style={{
              height: isMobile ? "auto" : photoSize,
              width: isMobile ? "100vw" : "auto",
              maxWidth: isMobile ? "540px" : "none",
              objectFit: "contain",
              filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.5))",
            }}
          />
        </motion.div>

        {/* LEFT CONTENT - HeroText with FlipWords */}
        {!isMobile && (
          <motion.div
            className="absolute left-4 lg:left-8 xl:left-16"
            style={{
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 20,
              maxWidth: isTablet ? "320px" : "480px",
            }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="backdrop-blur-xl bg-black/40 p-6 lg:p-8 rounded-2xl border border-white/10 shadow-2xl hover:bg-black/50 transition-all duration-300">
              <motion.h2
                className="text-xl lg:text-2xl font-medium text-white mb-2"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
              </motion.h2>
              <motion.p
                className="text-lg lg:text-xl font-medium text-neutral-300 mb-1"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
              >
                AI/ML Engineer
              </motion.p>
              <motion.p
                className="text-base lg:text-lg text-neutral-400 mb-2"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 }}
              >
                Dedicated to Crafting
              </motion.p>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 }}
              >
                <FlipWords
                  words={["Intelligent", "Scalable", "Data-Driven", "Robust"]}
                  className="font-black text-white text-2xl lg:text-3xl xl:text-4xl"
                />
              </motion.div>
              <motion.p
                className="text-base lg:text-lg text-neutral-300 mt-1"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 }}
              >
                ML Solutions
              </motion.p>

              {/* Buttons Container */}
              <motion.div
                className="mt-6 flex flex-wrap gap-3"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.7 }}
              >
                <button
                  onClick={handleHireMe}
                  className="group/btn flex items-center gap-2 text-white font-bold text-sm lg:text-base tracking-wide hover:text-[#7a57db] transition-all duration-300 bg-white/5 hover:bg-white/10 px-4 py-3 rounded-xl border border-white/10"
                >
                  <span className="text-[#7a57db] font-bold">//</span>
                  HIRE ME
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="transform group-hover/btn:translate-x-1 transition-transform duration-300"
                  >
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <a
                  href="/Ansh_singhal_Resume.pdf"
                  download="Ansh_singhal_Resume.pdf"
                  className="group/dl flex items-center gap-2 text-white font-bold text-sm lg:text-base tracking-wide hover:text-[#7a57db] transition-all duration-300 bg-gradient-to-r from-[#5c33cc]/20 to-[#7a57db]/20 hover:from-[#5c33cc]/30 hover:to-[#7a57db]/30 px-4 py-3 rounded-xl border border-[#7a57db]/30"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="transform group-hover/dl:translate-y-1 transition-transform duration-300"
                  >
                    <path d="M12 4V16M12 16L7 11M12 16L17 11M4 20H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  RESUME
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* RIGHT CONTENT - Larger and more interactive */}
        {!isMobile && (
          <motion.div
            className="absolute right-4 lg:right-8 xl:right-16 text-right"
            style={{
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 20,
            }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="backdrop-blur-xl bg-black/40 p-6 lg:p-8 rounded-2xl border border-white/10 shadow-2xl hover:bg-black/50 transition-all duration-300">
              <ul className="space-y-3 lg:space-y-4">
                {skills.map((skill, index) => (
                  <li
                    key={skill.name}
                    className={`
                      text-base lg:text-lg xl:text-xl font-medium cursor-pointer
                      transition-all duration-300 py-1 px-3 rounded-lg -mr-3
                      ${skill.highlight
                        ? "text-white font-bold text-lg lg:text-xl xl:text-2xl bg-gradient-to-l from-[#7a57db]/20 to-transparent"
                        : hoveredSkill === index
                          ? "text-white bg-white/5"
                          : "text-neutral-400 hover:text-white"
                      }
                    `}
                    onMouseEnter={() => setHoveredSkill(index)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {/* MOBILE - Bottom content with HeroText and buttons - above navbar */}
        {isMobile && (
          <motion.div
            className="absolute bottom-15 left-0 right-0 text-center px-4"
            style={{ zIndex: 20 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="backdrop-blur-xl bg-black/50 p-3 rounded-xl border border-white/10">
              {/* HeroText Content */}
              <motion.p
                className="text-sm font-medium text-neutral-300 mb-0.5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                AI/ML Engineer
              </motion.p>
              <motion.p
                className="text-xs text-neutral-400 mb-0.5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                Dedicated to Crafting
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="mb-0.5"
              >
                <FlipWords
                  words={["Intelligent", "Scalable", "Data-Driven", "Robust"]}
                  className="font-black text-white text-base"
                />
              </motion.div>
              <motion.p
                className="text-xs text-neutral-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                ML Solutions
              </motion.p>

              {/* Buttons */}
              <motion.div
                className="mt-2 flex justify-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
              >
                <button
                  onClick={handleHireMe}
                  className="group flex items-center gap-1.5 text-white font-bold text-xs bg-white/10 px-3 py-2 rounded-lg border border-white/10"
                >
                  <span className="text-[#7a57db] font-bold">//</span>
                  HIRE ME
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="transform group-hover:translate-x-1 transition-transform duration-300"
                  >
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <a
                  href="/Ansh_singhal_Resume.pdf"
                  download="Ansh_singhal_Resume.pdf"
                  className="group flex items-center gap-1.5 text-white font-bold text-xs bg-gradient-to-r from-[#5c33cc]/30 to-[#7a57db]/30 px-3 py-2 rounded-lg border border-[#7a57db]/30"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="transform group-hover:translate-y-1 transition-transform duration-300"
                  >
                    <path d="M12 4V16M12 16L7 11M12 16L17 11M4 20H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  RESUME
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default Hero;
