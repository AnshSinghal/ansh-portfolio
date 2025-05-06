'use client';

import { useRef, useState, ChangeEvent, FormEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import { IconType } from 'react-icons';
import Button from '@/components/ui/Button';

interface ContactInfoCardProps {
  icon: IconType;
  title: string;
  content: string;
}

// Contact info card component
const ContactInfoCard = ({ icon, title, content }: ContactInfoCardProps) => {
  const Icon = icon;
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg bg-[#121212] hover:bg-[#181818] transition-colors">
      <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0">
        <Icon className="text-[var(--primary)] text-xl" />
      </div>
      <div>
        <h3 className="text-lg font-medium mb-1">{title}</h3>
        <p className="text-[var(--foreground)]/70">{content}</p>
      </div>
    </div>
  );
};

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear validation error when typing
    if (validationErrors[name as keyof ValidationErrors]) {
      setValidationErrors({
        ...validationErrors,
        [name]: undefined
      });
    }
  };
  
  const validateForm = () => {
    const errors: ValidationErrors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset submission status after some time
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };
  
  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
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
    <section ref={sectionRef} id="contact" className="section py-20 relative">
      {/* Decorative elements */}
      <div className="absolute left-0 top-0 w-64 h-64 bg-[var(--primary)]/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute right-0 bottom-0 w-64 h-64 bg-[var(--ai-green)]/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-[var(--primary)] mx-auto mt-2 mb-6"></div>
          <p className="text-[var(--foreground)]/70 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out to me.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Information - 2 columns */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-semibold mb-6">
                Contact Information
              </h3>
              <p className="text-[var(--foreground)]/70 mb-8">
                I'm open for freelance projects, full-time positions, and collaborations. Let's connect and discuss how we can work together.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <ContactInfoCard 
                icon={FaEnvelope} 
                title="Email" 
                content="ansh@example.com" 
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <ContactInfoCard 
                icon={FaPhone} 
                title="Phone" 
                content="+91 98765 43210" 
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <ContactInfoCard 
                icon={FaMapMarkerAlt} 
                title="Location" 
                content="India" 
              />
            </motion.div>
          </motion.div>

          {/* Contact Form - 3 columns */}
          <motion.div 
            className="lg:col-span-3 bg-[#0f0f0f] rounded-xl p-6 sm:p-8"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6 }}
          >
            {isSubmitted ? (
              <motion.div 
                className="flex flex-col items-center justify-center h-full py-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <FaCheckCircle className="text-[var(--ai-green)] text-5xl mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Thank You!</h3>
                <p className="text-center text-[var(--foreground)]/70 mb-6">
                  Your message has been sent successfully. I'll get back to you as soon as possible.
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                >
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full p-3 bg-[#1a1a1a] rounded-lg border ${
                        validationErrors.name 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-[var(--primary)]/20 focus:border-[var(--primary)]'
                      } outline-none transition-colors`}
                      placeholder="John Doe"
                    />
                    {validationErrors.name && (
                      <p className="mt-1 text-sm text-red-500">{validationErrors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full p-3 bg-[#1a1a1a] rounded-lg border ${
                        validationErrors.email 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-[var(--primary)]/20 focus:border-[var(--primary)]'
                      } outline-none transition-colors`}
                      placeholder="john@example.com"
                    />
                    {validationErrors.email && (
                      <p className="mt-1 text-sm text-red-500">{validationErrors.email}</p>
                    )}
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="subject" className="block mb-2 text-sm font-medium">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full p-3 bg-[#1a1a1a] rounded-lg border ${
                      validationErrors.subject 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-[var(--primary)]/20 focus:border-[var(--primary)]'
                    } outline-none transition-colors`}
                    placeholder="How can I help you?"
                  />
                  {validationErrors.subject && (
                    <p className="mt-1 text-sm text-red-500">{validationErrors.subject}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block mb-2 text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className={`w-full p-3 bg-[#1a1a1a] rounded-lg border ${
                      validationErrors.message 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-[var(--primary)]/20 focus:border-[var(--primary)]'
                    } outline-none transition-colors`}
                    placeholder="Your message..."
                  />
                  {validationErrors.message && (
                    <p className="mt-1 text-sm text-red-500">{validationErrors.message}</p>
                  )}
                </div>
                
                <div className="text-right">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 