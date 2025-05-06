'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, useGLTF, OrbitControls } from '@react-three/drei';
import { useTheme } from '@/contexts/ThemeContext';

// Create 3D models for common AI/ML technologies
const TensorflowLogo = ({ isHovered, ...props }: { isHovered: boolean, position: [number, number, number], scale: number }) => {
  return (
    <group {...props}>
      <Float speed={5} rotationIntensity={isHovered ? 2 : 0.5} floatIntensity={isHovered ? 2 : 0.5}>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#FF6F00" emissive="#FF6F00" emissiveIntensity={isHovered ? 0.5 : 0.2} />
        </mesh>
        <mesh position={[0, 0, 0.51]}>
          <planeGeometry args={[0.6, 0.6]} />
          <meshBasicMaterial color="white" />
        </mesh>
      </Float>
    </group>
  );
};

const PytorchLogo = ({ isHovered, ...props }: { isHovered: boolean, position: [number, number, number], scale: number }) => {
  return (
    <group {...props}>
      <Float speed={5} rotationIntensity={isHovered ? 2 : 0.5} floatIntensity={isHovered ? 2 : 0.5}>
        <mesh>
          <torusGeometry args={[0.5, 0.2, 16, 32]} />
          <meshStandardMaterial color="#EE4C2C" emissive="#EE4C2C" emissiveIntensity={isHovered ? 0.5 : 0.2} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#EE4C2C" emissive="#EE4C2C" emissiveIntensity={isHovered ? 0.5 : 0.2} />
        </mesh>
      </Float>
    </group>
  );
};

const PythonLogo = ({ isHovered, ...props }: { isHovered: boolean, position: [number, number, number], scale: number }) => {
  return (
    <group {...props}>
      <Float speed={5} rotationIntensity={isHovered ? 2 : 0.5} floatIntensity={isHovered ? 2 : 0.5}>
        <mesh>
          <cylinderGeometry args={[0.4, 0.4, 0.8, 32]} />
          <meshStandardMaterial color="#3776AB" emissive="#3776AB" emissiveIntensity={isHovered ? 0.5 : 0.2} />
        </mesh>
        <mesh position={[0, 0.6, 0]} rotation={[Math.PI/2, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.8, 32]} />
          <meshStandardMaterial color="#FFD43B" emissive="#FFD43B" emissiveIntensity={isHovered ? 0.5 : 0.2} />
        </mesh>
      </Float>
    </group>
  );
};

const ScikitLearnLogo = ({ isHovered, ...props }: { isHovered: boolean, position: [number, number, number], scale: number }) => {
  return (
    <group {...props}>
      <Float speed={5} rotationIntensity={isHovered ? 2 : 0.5} floatIntensity={isHovered ? 2 : 0.5}>
        <mesh>
          <octahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial color="#F89939" emissive="#F89939" emissiveIntensity={isHovered ? 0.5 : 0.2} wireframe={true} />
        </mesh>
      </Float>
    </group>
  );
};

const KerasLogo = ({ isHovered, ...props }: { isHovered: boolean, position: [number, number, number], scale: number }) => {
  return (
    <group {...props}>
      <Float speed={5} rotationIntensity={isHovered ? 2 : 0.5} floatIntensity={isHovered ? 2 : 0.5}>
        <mesh>
          <dodecahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial color="#D00000" emissive="#D00000" emissiveIntensity={isHovered ? 0.5 : 0.2} />
        </mesh>
      </Float>
    </group>
  );
};

const MLLogo = ({ isHovered, ...props }: { isHovered: boolean, position: [number, number, number], scale: number }) => {
  return (
    <group {...props}>
      <Float speed={5} rotationIntensity={isHovered ? 2 : 0.5} floatIntensity={isHovered ? 2 : 0.5}>
        <mesh>
          <icosahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial color="#00A7D0" emissive="#00A7D0" emissiveIntensity={isHovered ? 0.5 : 0.2} />
        </mesh>
      </Float>
    </group>
  );
};

// 3D skill scene component
interface SkillSceneProps {
  activeSkill: number;
}

const SkillScene = ({ activeSkill }: SkillSceneProps) => {
  const { theme } = useTheme();
  
  return (
    <Canvas style={{ height: '300px' }}>
      <OrbitControls enableZoom={false} enablePan={false} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      
      <TensorflowLogo 
        position={[0, 0, 0]} 
        scale={activeSkill === 0 ? 1.2 : 0.8} 
        isHovered={activeSkill === 0} 
      />
      <PytorchLogo 
        position={[2, 0, 0]} 
        scale={activeSkill === 1 ? 1.2 : 0.8} 
        isHovered={activeSkill === 1} 
      />
      <PythonLogo 
        position={[-2, 0, 0]} 
        scale={activeSkill === 2 ? 1.2 : 0.8} 
        isHovered={activeSkill === 2} 
      />
      <ScikitLearnLogo 
        position={[1, -1.5, 0]} 
        scale={activeSkill === 3 ? 1.2 : 0.8} 
        isHovered={activeSkill === 3} 
      />
      <KerasLogo 
        position={[-1, -1.5, 0]} 
        scale={activeSkill === 4 ? 1.2 : 0.8} 
        isHovered={activeSkill === 4} 
      />
      <MLLogo 
        position={[0, 1.5, 0]} 
        scale={activeSkill === 5 ? 1.2 : 0.8} 
        isHovered={activeSkill === 5} 
      />
      
      <Environment preset={theme === 'dark' ? 'night' : 'sunset'} />
    </Canvas>
  );
};

// Skill card component
interface SkillCardProps {
  icon: string;
  title: string;
  description: string;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

const SkillCard = ({ icon, title, description, index, isActive, onClick }: SkillCardProps) => {
  const { theme } = useTheme();
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  
  return (
    <motion.div
      ref={cardRef}
      className={`rounded-xl p-4 cursor-pointer transition-all ${
        isActive 
          ? `bg-[var(--primary)]/10 border-2 border-[var(--primary)]` 
          : `${theme === 'dark' ? 'bg-[var(--card-bg)]' : 'bg-white'} hover:bg-[var(--primary)]/5`
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          isActive ? 'bg-[var(--primary)] text-white' : 'bg-[var(--primary)]/10 text-[var(--primary)]'
        }`}>
          <span className="text-xl">{icon}</span>
        </div>
        <h3 className={`ml-3 font-bold text-lg ${
          isActive ? 'text-[var(--primary)]' : 'text-[var(--foreground)]'
        }`}>
          {title}
        </h3>
      </div>
      <p className="text-[var(--foreground)]/60 text-sm">{description}</p>
    </motion.div>
  );
};

// Main Skills section
const Skills = () => {
  const [activeSkill, setActiveSkill] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  // Skill data
  const skills = [
    {
      icon: '🔥',
      title: 'TensorFlow',
      description: 'Experience building and deploying deep learning models for computer vision and NLP tasks.'
    },
    {
      icon: '🔦',
      title: 'PyTorch',
      description: 'Implemented custom neural network architectures and loss functions for research projects.'
    },
    {
      icon: '🐍',
      title: 'Python',
      description: 'Expert-level Python programming for data processing, analysis, and ML applications.'
    },
    {
      icon: '📊',
      title: 'Scikit-Learn',
      description: 'Applied various ML algorithms for classification, regression, and clustering problems.'
    },
    {
      icon: '⚙️',
      title: 'Keras',
      description: 'Rapidly prototyped and trained deep learning models for quick validation of concepts.'
    },
    {
      icon: '🤖',
      title: 'Machine Learning',
      description: 'Developed end-to-end ML pipelines from data collection to deployment in production.'
    }
  ];
  
  return (
    <section ref={sectionRef} id="skills" className="section py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-[var(--primary)] mx-auto mt-2 mb-6"></div>
          <p className="text-[var(--foreground)]/70 max-w-2xl mx-auto">
            Specialized in AI, machine learning, and data science technologies
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {/* 3D Visualization */}
          <motion.div
            className="lg:col-span-1 order-2 lg:order-1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-[var(--primary)]/5 to-[var(--ml-blue)]/5 rounded-2xl p-4 h-[350px] flex items-center justify-center">
              <SkillScene activeSkill={activeSkill} />
            </div>
          </motion.div>
          
          {/* Skills List */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <SkillCard
                  key={index}
                  icon={skill.icon}
                  title={skill.title}
                  description={skill.description}
                  index={index}
                  isActive={activeSkill === index}
                  onClick={() => setActiveSkill(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills; 