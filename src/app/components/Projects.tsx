'use client';
import { useState, useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, AnimatePresence } from 'framer-motion';
import { ArrowRight, Github, X, ExternalLink } from 'lucide-react';
import Image from 'next/image';

// here we store the projects in ids of project 1 and project 2 put here as much project you can make here not changes just copy and paste the from the {} and just change the project id and details 
const projects = [
  {
    id: 'project1',
    title: 'Reddit Sentiment Analytics Pro',
    description: 'Real-time sentiment classification of social media posts',
    image: '/images/Project1 Reddit.png', 
    tech: ['Python', 'NLTK', 'Streamlit'],
    github: "https://github.com/SachinMallah/reddit-sentiment-analysis",
    details: {
      description: `A real-time sentiment analysis engine that processes social media posts and classifies them 
      into positive, negative, or neutral sentiments. The system uses NLP techniques and machine 
      learning to provide accurate sentiment classification with context awareness.`,
      features: [
        'Real-time processing of streaming social media data',
        'Context-aware sentiment classification',
        'Custom-trained model for domain-specific terminology',
        'Dashboard for sentiment trend visualization'
      ],
      techUsed: ['Python', 'NLTK', 'Streamlit', 'Huggingface'],
      verified: true
    }
  },
  {
    id: 'project2',
    title: 'Personal Portfolio Website',
    description: 'A modern, responsive portfolio to showcase my work and skills.',
    image: '/images/personal portfolio.png', 
    tech: ['Next.js', 'React', 'Tailwind CSS'],
    github: "https://github.com/SachinMallah/sachin-mallah-portfolio",
    details: {
      description: `A sleek, interactive portfolio website built to professionally present my projects, technical skills, 
    and personal journey in the world of full stack development and machine learning. Designed with a strong focus 
    on responsiveness, smooth animations, and minimalistic black-and-white aesthetics. Deployed on Vercel with 
    custom domain integration for a real-world production setup.`,
      features: [
        'Fully responsive design for all screen sizes',
        'Animated neural network background using canvas API',
        'Custom project cards with interactive hover effects',
        'Dark-themed, minimalistic UI with smooth scroll and hover animations',
        'SEO-friendly structure and accessibility compliance',
        'Optimized Lighthouse scores for performance and UX',
        'Clean folder structure and reusable components for scalability',
        'Deployed with Vercel and connected to a custom domain'
      ],
      techUsed: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel', 'Github Actions'],
      verified: false
    }
  },
  {
    id: 'project3',
    title: 'Image Compressor Free',
    description: 'A free, intelligent image compression tool using advanced AI algorithms.',
    image: '/images/imagefree.png', 
    tech: ['Next.js', 'React', 'TypeScript','Tailwind CSS'],
    liveUrl: "https://imagecompressorfree.online",
    details: {
      description: `An AI-powered image compression platform that leverages intelligent algorithms and Web Workers 
to compress images with 97% efficiency while maintaining near-lossless quality. Built entirely on the client-side 
with zero server uploads, ensuring complete privacy. The tool analyzes image characteristics and automatically 
selects optimal compression algorithms (WebP, AVIF, JPEG) for different image types. Supports batch processing 
of 100+ images simultaneously, handles 100MB+ files, and delivers results in under 1 second per image. 
Deployed on Vercel. Visit https://imagecompressorfree.online for live, this project demonstrates
advanced image processing, machine learning optimization, and performance engineering at scale.`,
      features: [
      '97% average compression ratio (2x better than industry competitors)',
      'Intelligent codec selection using image analysis algorithms',
      'Sub-second processing (<1-2 second per image)',
      '100% client-side processing with Web Workers',
      'Supports 100MB+ files (vs competitors\' 5-20MB limit)',
      'Batch processing for 100+ images simultaneously',
      'Zero uploads = Complete privacy & security',
      'Fully responsive drag-and-drop interface',
      'Zero server dependencies = unlimited free usage'
      ],
      techUsed: [  
      'Next.js (App Router)',
      'React',
      'TypeScript', 
      'Web Workers API',
      'Advanced Image Codecs (WebP, AVIF, JPEG)',
      'DCT (Discrete Cosine Transform)',
      'Tailwind CSS',
      'Vercel Edge Network',
      'Custom Domain (Vercel DNS)',
      'GitHub & CI/CD Pipeline',],
      verified: false
    }
  }
  
];

type Project = typeof projects[0];

interface ProjectCardProps {
  project: Project;
  setSelectedProject: (id: string) => void;
}

interface ModalProps {
  project: Project; 
  onClose: () => void;
}

function Modal({ project, onClose }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden'; // this prevent background scrolling while opening the model section (handle excape)

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-gray-900/95 backdrop-blur-xl rounded-3xl border-2 border-gray-700/50 shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* close button header */}
          <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-gray-900/90 backdrop-blur-xl border-b border-gray-700/30">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <h2 className="text-2xl font-bold text-white ml-4">{project.title}</h2>
              {project.details.verified && (
                <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded-full border border-blue-500/30">
                  Verified Technical Credentials
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 group"
              aria-label="Close modal"
            >
              <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-200" />
            </button>
          </div>

           
          <div className="overflow-y-auto max-h-[calc(90vh-100px)] custom-scrollbar">
            <div className="p-6 space-y-6">
              {/* Project Image are stored and display from just set the width and the height of the project image */}
              <div className="relative h-80 bg-gray-800 rounded-2xl overflow-hidden border border-gray-700/30">
                <Image 
                  src={project.image} 
                  alt={`${project.title} screenshot`}
                  fill
                  sizes="(max-width: 768px) 100vw, 80vw"
                  className="object-cover"
                  priority
                />
              </div>

              
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Description</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {project.details.description}
                </p>
              </div>

              
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Key Features</h3>
                <div className="grid gap-3">
                  {project.details.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700/30"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Technologies Used</h3>
                <div className="flex flex-wrap gap-3">
                  {project.details.techUsed.map((tech, index) => (
                    <motion.span 
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="px-4 py-2 bg-gradient-to-r from-gray-700/50 to-gray-800/50 text-gray-200 rounded-full text-sm font-medium border border-gray-600/30 hover:border-gray-500/50 transition-colors"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              
              <div className="flex gap-4 pt-6 border-t border-gray-700/30">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-all duration-200 font-medium group"
                  >
                    <Github className="w-5 h-5" />
                    View on GitHub
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-xl transition-all duration-200 font-medium border border-gray-600/30"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ProjectCard({ project, setSelectedProject }: ProjectCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const transform = useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
    rotateX.set((e.clientY - (top + height/2)) / 10);
    rotateY.set(-(e.clientX - (left + width/2)) / 10);
  };

  return (
    <motion.div
      key={project.id}
      className="relative group"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
    >
      <div className="absolute -inset-2 bg-gradient-to-r from-gray-500/30 to-gray-700/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
      
      <motion.div
        style={{ transform }}
        className="bg-black/80 backdrop-blur-xl rounded-3xl border-2 border-gray-500/30 shadow-2xl overflow-hidden relative transition-all duration-300 hover:border-gray-400/50"
      >
        <div className="relative h-60 bg-gray-900/50 overflow-hidden">
          <Image 
            src={project.image} 
            alt={`${project.title} project screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={project.id === 'project1'} 
          />
        </div>
        
        <div className="p-6 space-y-4">
          <h3 className="text-xl font-bold text-gray-100 group-hover:text-white transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-300 leading-relaxed">{project.description}</p>
          
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, index) => (
              <span 
                key={`${tech}-${index}`}
                className="text-xs font-medium bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full hover:bg-gray-600/50 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => setSelectedProject(project.id)}
              className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors group/btn px-4 py-2 rounded-lg hover:bg-gray-800/50"
              aria-label={`View details for ${project.title}`}
            >
              View Details 
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-gray-800/50"
                aria-label={`View ${project.title} on GitHub`}
              >
                GitHub <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  return (
    <section id="projects" className="relative py-20 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2 
          className="text-5xl font-bold text-center mb-16 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Projects
          <p className="text-xl text-gray-300 mt-4">Explore My Technical Endeavors</p>
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.2 }
            }
          }}
        >
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project}
              setSelectedProject={setSelectedProject}
            />
          ))}
        </motion.div>

        <p className="block mt-14 text-center text-gray-300">
          🚀 More projects coming soon. Stay tuned!
        </p>

        {selectedProject && (
          <Modal 
            project={projects.find(p => p.id === selectedProject)!} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </div>

      {/* custom css not mentioned in the layout css this is just for the project section */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(55, 65, 81, 0.3);
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(107, 114, 128, 0.7);
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(107, 114, 128, 0.9);
        }
      `}</style>
    </section>
  );
}
