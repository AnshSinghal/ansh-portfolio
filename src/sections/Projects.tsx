'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Scene from '@/components/3d/Scene';

interface ProjectProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: 'ai' | 'ml' | 'data' | 'web';
}

// Use a function to generate a colored background for projects
const getProjectBackground = (index: number, category: string): string => {
  const colors = {
    ai: ['#00ff9d20', '#7928ca20'],
    ml: ['#7928ca20', '#0088ff20'],
    data: ['#0088ff20', '#00ff9d20'],
    web: ['#ff4d4d20', '#7928ca20']
  };
  
  const categoryColors = colors[category as keyof typeof colors] || colors.ai;
  return `linear-gradient(45deg, ${categoryColors[0]}, ${categoryColors[1]})`;
};

const projects: ProjectProps[] = [
  {
    title: 'Neural Style Transfer',
    description: 'An AI system that applies the style of one image to the content of another using convolutional neural networks.',
    image: 'project1',
    technologies: ['TensorFlow', 'CNN', 'Python', 'OpenCV'],
    githubUrl: 'https://github.com/anshsinghal/neural-style-transfer',
    category: 'ai'
  },
  {
    title: 'Predictive Analytics Dashboard',
    description: 'A machine learning-powered dashboard that predicts future trends based on historical data.',
    image: 'project2',
    technologies: ['PyTorch', 'Scikit-learn', 'React', 'D3.js'],
    githubUrl: 'https://github.com/anshsinghal/predictive-analytics',
    liveUrl: 'https://predictive-analytics-demo.com',
    category: 'ml'
  },
  {
    title: 'Natural Language Processor',
    description: 'A sophisticated NLP system capable of understanding and generating human language with transformer architecture.',
    image: 'project3',
    technologies: ['BERT', 'Transformers', 'Python', 'HuggingFace'],
    githubUrl: 'https://github.com/anshsinghal/nlp-processor',
    category: 'ai'
  },
  {
    title: 'Computer Vision Object Detection',
    description: 'Real-time object detection system using YOLOv5 architecture for identifying and tracking objects in video streams.',
    image: 'project4',
    technologies: ['YOLOv5', 'PyTorch', 'OpenCV', 'Python'],
    githubUrl: 'https://github.com/anshsinghal/object-detection',
    category: 'ml'
  },
  {
    title: 'Data Visualization Platform',
    description: 'Interactive data visualization platform that transforms complex datasets into meaningful visual representations.',
    image: 'project5',
    technologies: ['D3.js', 'React', 'Node.js', 'MongoDB'],
    githubUrl: 'https://github.com/anshsinghal/data-viz',
    liveUrl: 'https://data-viz-platform.com',
    category: 'data'
  },
  {
    title: 'Reinforcement Learning Agent',
    description: 'An RL agent that learns to navigate complex environments and make decisions through trial and error.',
    image: 'project6',
    technologies: ['PyTorch', 'OpenAI Gym', 'Python', 'TensorBoard'],
    githubUrl: 'https://github.com/anshsinghal/rl-agent',
    category: 'ai'
  }
];

const ProjectCard = ({ project, index }: { project: ProjectProps; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });
  
  return (
    <motion.div
      ref={cardRef}
      className="group bg-[#121212] rounded-xl overflow-hidden relative h-[400px]"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Project Image */}
      <div className="h-[220px] overflow-hidden relative">
        <div className="absolute inset-0 bg-black/40 z-10" />
        
        {/* Using a colored div as a fallback for actual project images */}
        <div 
          className="w-full h-full flex items-center justify-center"
          style={{ background: getProjectBackground(index, project.category) }}
        >
          <div className="text-6xl opacity-20">
            {project.category === 'ai' ? '🧠' : 
             project.category === 'ml' ? '🤖' : 
             project.category === 'data' ? '📊' : '💻'}
          </div>
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4 z-20">
          <span className={`text-xs font-medium py-1 px-2 rounded ${
            project.category === 'ai' 
              ? 'bg-[var(--ai-green)]/20 text-[var(--ai-green)]' 
              : project.category === 'ml' 
                ? 'bg-[var(--primary)]/20 text-[var(--primary)]' 
                : project.category === 'data' 
                  ? 'bg-[var(--ml-blue)]/20 text-[var(--ml-blue)]'
                  : 'bg-[var(--secondary)]/20 text-[var(--secondary)]'
          }`}>
            {project.category.toUpperCase()}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-[var(--foreground)]">{project.title}</h3>
        <p className="text-[var(--foreground)]/70 text-sm mb-4 line-clamp-2">{project.description}</p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span 
              key={index} 
              className="text-xs font-medium py-1 px-2 bg-[var(--background)] text-[var(--foreground)]/80 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      {/* Links */}
      <div className="absolute bottom-0 left-0 w-full p-6 flex justify-end gap-4">
        {project.githubUrl && (
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--foreground)] hover:text-[var(--ai-green)] transition-colors"
            whileHover={{ scale: 1.1 }}
          >
            <FaGithub size={20} />
          </motion.a>
        )}
        
        {project.liveUrl && (
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--foreground)] hover:text-[var(--ml-blue)] transition-colors"
            whileHover={{ scale: 1.1 }}
          >
            <FaExternalLinkAlt size={18} />
          </motion.a>
        )}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState<'all' | 'ai' | 'ml' | 'data' | 'web'>('all');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="projects" className="section py-20 relative">
      {/* 3D Background - Only visible at certain screen sizes for performance */}
      <div className="absolute inset-0 -z-10 opacity-30 hidden lg:block">
        <Scene showBrain={false} showNetwork={true} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            My <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-[var(--primary)] mx-auto mt-2 mb-6"></div>
          <p className="text-[var(--foreground)]/70 max-w-2xl mx-auto">
            Explore my most recent AI and Machine Learning projects
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-10">
          <motion.div 
            className="inline-flex bg-[#121212] p-1 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === 'all' ? 'bg-[var(--primary)] text-white' : 'text-[var(--foreground)]'
              }`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === 'ai' ? 'bg-[var(--ai-green)] text-black' : 'text-[var(--foreground)]'
              }`}
              onClick={() => setFilter('ai')}
            >
              AI
            </button>
            <button
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === 'ml' ? 'bg-[var(--primary)] text-white' : 'text-[var(--foreground)]'
              }`}
              onClick={() => setFilter('ml')}
            >
              ML
            </button>
            <button
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === 'data' ? 'bg-[var(--ml-blue)] text-white' : 'text-[var(--foreground)]'
              }`}
              onClick={() => setFilter('data')}
            >
              Data
            </button>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 