'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { FaArrowRight, FaCalendarAlt, FaTag } from 'react-icons/fa';
import { useTheme } from '@/contexts/ThemeContext';

// Sample blog post data
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: 'AI' | 'ML' | 'Data Science' | 'Research';
  slug: string;
  imageColor: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 'post-1',
    title: 'The Future of Generative AI: Beyond Text and Images',
    excerpt: 'Exploring the next frontiers in generative AI, including 3D content creation, music composition, and multimodal learning.',
    date: 'June 15, 2023',
    readTime: '5 min read',
    category: 'AI',
    slug: 'future-of-generative-ai',
    imageColor: '#7928ca20'
  },
  {
    id: 'post-2',
    title: 'Implementing Attention Mechanisms in Deep Learning Models',
    excerpt: 'A practical guide to implementing various attention mechanisms to improve the performance of your neural networks.',
    date: 'May 28, 2023',
    readTime: '8 min read',
    category: 'ML',
    slug: 'attention-mechanisms-deep-learning',
    imageColor: '#00ff9d20'
  },
  {
    id: 'post-3',
    title: 'Ethics in AI: Addressing Bias in Machine Learning Algorithms',
    excerpt: 'How to identify, measure, and mitigate bias in machine learning models to build more fair and equitable AI systems.',
    date: 'April 10, 2023',
    readTime: '6 min read',
    category: 'AI',
    slug: 'ethics-in-ai-addressing-bias',
    imageColor: '#0088ff20'
  },
  {
    id: 'post-4',
    title: 'Optimizing Neural Networks for Edge Devices',
    excerpt: 'Techniques for model compression and optimization to deploy deep learning models on resource-constrained edge devices.',
    date: 'March 22, 2023',
    readTime: '7 min read',
    category: 'ML',
    slug: 'neural-networks-edge-devices',
    imageColor: '#ff4d4d20'
  },
  {
    id: 'post-5',
    title: 'Building Robust ML Pipelines for Production',
    excerpt: 'Best practices for creating scalable, maintainable machine learning pipelines that can reliably serve in production environments.',
    date: 'February 14, 2023',
    readTime: '9 min read',
    category: 'Data Science',
    slug: 'ml-pipelines-production',
    imageColor: '#00c6ff20'
  },
  {
    id: 'post-6',
    title: 'The Rise of Self-Supervised Learning in Computer Vision',
    excerpt: 'How self-supervised learning approaches are revolutionizing computer vision tasks with less labeled data.',
    date: 'January 5, 2023',
    readTime: '6 min read',
    category: 'Research',
    slug: 'self-supervised-learning-cv',
    imageColor: '#7928ca20'
  }
];

// Category colors
const categoryColors = {
  'AI': 'bg-[var(--ai-green)]/80 text-black',
  'ML': 'bg-[var(--primary)]/80 text-white',
  'Data Science': 'bg-[var(--ml-blue)]/80 text-white',
  'Research': 'bg-[var(--accent)]/80 text-white'
};

// Blog card component
const BlogCard = ({ post }: { post: BlogPost }) => {
  const { theme } = useTheme();
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  
  return (
    <motion.div
      ref={cardRef}
      className={`group relative overflow-hidden rounded-xl transition-all ${
        theme === 'dark' ? 'bg-[var(--card-bg)]' : 'bg-[var(--card-bg)] shadow-md'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      {/* Colored banner */}
      <div 
        className="h-40 w-full flex items-center justify-center"
        style={{ background: post.imageColor }}
      >
        <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
          {post.category === 'AI' && <span className="text-2xl">🧠</span>}
          {post.category === 'ML' && <span className="text-2xl">🤖</span>}
          {post.category === 'Data Science' && <span className="text-2xl">📊</span>}
          {post.category === 'Research' && <span className="text-2xl">🔬</span>}
        </div>
      </div>
      
      {/* Category tag */}
      <div className="absolute top-4 right-4">
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryColors[post.category]}`}>
          {post.category}
        </span>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="flex items-center text-sm text-[var(--foreground)]/60 mb-3">
          <FaCalendarAlt className="mr-2" />
          <span>{post.date}</span>
          <span className="mx-2">•</span>
          <span>{post.readTime}</span>
        </div>
        
        <h3 className="text-xl font-bold mb-3 text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
          {post.title}
        </h3>
        
        <p className="text-[var(--foreground)]/70 text-sm mb-5 line-clamp-3">
          {post.excerpt}
        </p>
        
        <Link 
          href={`/blog/${post.slug}`} 
          className="inline-flex items-center font-medium text-[var(--primary)] hover:text-[var(--primary-light)] transition-colors"
        >
          Read More <FaArrowRight className="ml-2 text-sm" />
        </Link>
      </div>
    </motion.div>
  );
};

// Blog section component
const Blog = () => {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  // Filter posts by category
  const filteredPosts = activeCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category.toLowerCase() === activeCategory.toLowerCase());
  
  return (
    <section ref={sectionRef} id="blog" className="section py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            AI/ML <span className="text-gradient">Insights</span>
          </h2>
          <div className="w-20 h-1 bg-[var(--primary)] mx-auto mt-2 mb-6"></div>
          <p className="text-[var(--foreground)]/70 max-w-2xl mx-auto">
            Exploring the latest trends, techniques, and research in artificial intelligence and machine learning
          </p>
        </motion.div>
        
        {/* Category filter */}
        <motion.div
          className="flex justify-center mb-10 overflow-x-auto flex-wrap gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === 'all' 
                ? 'bg-[var(--primary)] text-white' 
                : `${theme === 'dark' ? 'bg-[var(--card-bg)]' : 'bg-white'} text-[var(--foreground)]`
            }`}
            onClick={() => setActiveCategory('all')}
          >
            All Posts
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === 'ai' 
                ? 'bg-[var(--ai-green)] text-black' 
                : `${theme === 'dark' ? 'bg-[var(--card-bg)]' : 'bg-white'} text-[var(--foreground)]`
            }`}
            onClick={() => setActiveCategory('ai')}
          >
            AI
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === 'ml' 
                ? 'bg-[var(--primary)] text-white' 
                : `${theme === 'dark' ? 'bg-[var(--card-bg)]' : 'bg-white'} text-[var(--foreground)]`
            }`}
            onClick={() => setActiveCategory('ml')}
          >
            ML
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === 'data science' 
                ? 'bg-[var(--ml-blue)] text-white' 
                : `${theme === 'dark' ? 'bg-[var(--card-bg)]' : 'bg-white'} text-[var(--foreground)]`
            }`}
            onClick={() => setActiveCategory('data science')}
          >
            Data Science
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === 'research' 
                ? 'bg-[var(--accent)] text-white' 
                : `${theme === 'dark' ? 'bg-[var(--card-bg)]' : 'bg-white'} text-[var(--foreground)]`
            }`}
            onClick={() => setActiveCategory('research')}
          >
            Research
          </button>
        </motion.div>
        
        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        
        {/* View all posts button */}
        <div className="text-center mt-12">
          <Link 
            href="/blog"
            className={`inline-flex items-center px-6 py-3 rounded-full font-medium transition-all ${
              theme === 'dark' 
                ? 'bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)]/20' 
                : 'bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)]/20'
            }`}
          >
            View All Posts <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog; 