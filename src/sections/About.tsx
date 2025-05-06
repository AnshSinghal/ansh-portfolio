'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaBrain, FaLaptopCode, FaChartLine, FaRobot } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { Canvas } from '@react-three/fiber';
import AiBrain from '@/components/3d/AiBrain';
import Button from '@/components/ui/Button';

interface AboutCardProps {
  icon: IconType;
  title: string;
  description: string;
}

const AboutCard = ({ icon, title, description }: AboutCardProps) => {
  const Icon = icon;
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  
  return (
    <motion.div
      ref={cardRef}
      className="bg-[#121212] p-6 rounded-xl border border-[var(--primary)]/20 hover:border-[var(--primary)]/50 transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4">
        <Icon className="text-[var(--primary)] text-xl" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-[var(--foreground)]/70">{description}</p>
    </motion.div>
  );
};

interface Skill {
  name: string;
  level: number;
}

// Skills list with proficiency
const skillsData: Skill[] = [
  { name: 'Machine Learning', level: 95 },
  { name: 'Deep Learning', level: 90 },
  { name: 'Python', level: 95 },
  { name: 'TensorFlow', level: 85 },
  { name: 'PyTorch', level: 80 },
  { name: 'Data Analysis', level: 90 },
  { name: 'Computer Vision', level: 85 },
  { name: 'NLP', level: 80 },
];

interface SkillBarProps {
  name: string;
  level: number;
}

const SkillBar = ({ name, level }: SkillBarProps) => {
  const skillRef = useRef(null);
  const isInView = useInView(skillRef, { once: true, amount: 0.3 });
  
  return (
    <div ref={skillRef} className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="font-medium">{name}</span>
        <span className="text-[var(--primary)]">{level}%</span>
      </div>
      <div className="w-full bg-[#1a1a1a] rounded-full h-2.5 overflow-hidden">
        <motion.div
          className="bg-gradient-to-r from-[var(--ai-green)] to-[var(--ml-blue)] h-2.5 rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </div>
    </div>
  );
};

const About = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section ref={sectionRef} id="about" className="section py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-20 h-1 bg-[var(--primary)] mx-auto mt-2 mb-6"></div>
          <p className="text-[var(--foreground)]/70 max-w-2xl mx-auto">
            A passionate AI/ML Engineer with expertise in building intelligent systems and solving complex problems
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h3 variants={itemVariants} className="text-2xl font-semibold mb-4">
              I'm <span className="text-[var(--ai-green)]">Ansh Singhal</span>, an AI/ML Engineer
            </motion.h3>

            <motion.p variants={itemVariants} className="mb-4 text-[var(--foreground)]/80">
              With a strong foundation in artificial intelligence and machine learning, I specialize in developing intelligent systems that solve real-world problems. My expertise spans across various domains of AI including deep learning, computer vision, and natural language processing.
            </motion.p>

            <motion.p variants={itemVariants} className="mb-6 text-[var(--foreground)]/80">
              I'm passionate about staying at the forefront of AI innovation and continuously expanding my knowledge to create cutting-edge solutions. My approach combines technical excellence with creative problem-solving to deliver exceptional results.
            </motion.p>

            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <strong className="text-[var(--primary)]">Name:</strong>
                <p>Ansh Singhal</p>
              </div>
              <div>
                <strong className="text-[var(--primary)]">Email:</strong>
                <p>ansh@example.com</p>
              </div>
              <div>
                <strong className="text-[var(--primary)]">From:</strong>
                <p>India</p>
              </div>
              <div>
                <strong className="text-[var(--primary)]">Available:</strong>
                <p>For projects</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                Download Resume
              </Button>
            </motion.div>
          </motion.div>

          {/* Right column - Skills */}
          <div>
            <div className="relative w-full h-64 mb-10">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full max-w-sm h-full">
                  <Canvas>
                    <ambientLight intensity={0.5} />
                    <AiBrain scale={4} />
                  </Canvas>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-6">My Skills</h3>
              <div className="grid grid-cols-1 gap-2">
                {skillsData.map((skill, index) => (
                  <SkillBar key={index} name={skill.name} level={skill.level} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Services section */}
        <div className="mt-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold">
              What <span className="text-gradient">I Do</span>
            </h2>
            <div className="w-20 h-1 bg-[var(--primary)] mx-auto mt-2 mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AboutCard
              icon={FaBrain}
              title="AI Research"
              description="Exploring cutting-edge techniques in artificial intelligence to develop innovative solutions."
            />
            <AboutCard
              icon={FaLaptopCode}
              title="ML Development"
              description="Building and deploying machine learning models for various applications and use cases."
            />
            <AboutCard
              icon={FaChartLine}
              title="Data Analysis"
              description="Extracting valuable insights from complex datasets through advanced analytics techniques."
            />
            <AboutCard
              icon={FaRobot}
              title="AI Systems"
              description="Designing intelligent automated systems that enhance efficiency and productivity."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 