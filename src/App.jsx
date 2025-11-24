import React, { useState, useEffect, useRef } from 'react';
import ContactModal from './components/ContactModal';
import { Github, Linkedin, Mail, ExternalLink, ArrowUpRight, Database, Download, Terminal, Cpu, Globe, Server, Code, MapPin, Clock, Zap, X, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

// --- 1. 3D TILT CARD COMPONENT ---
const TiltCard = ({ children, className = "" }) => {
  const ref = useRef(null);

  // Motion values for 3D effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animation
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      className={`relative transition-all duration-200 ease-out ${className}`}
    >
      {/* Reflection Glare */}
      <div 
        style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
        className="absolute inset-4 bg-teal-500/5 blur-2xl rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
      />
      {children}
    </motion.div>
  );
};

// --- 2. SHIMMER BADGE ---
const ShimmerBadge = ({ text }) => (
  <div className="relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 mb-6">
    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2E8F0_0%,#506175_50%,#E2E8F0_100%)]" />
    <span className="inline-flex h-full w-full cursor-default items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-xs font-medium text-slate-300 backdrop-blur-3xl">
      <div className="w-2 h-2 rounded-full bg-teal-500 mr-2 animate-pulse"></div>
      {text}
    </span>
  </div>
);

// --- 3. BENTO CARD ---
const BentoCard = ({ children, className = "" }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className={`bg-slate-900/40 border border-slate-800 backdrop-blur-md rounded-3xl p-6 overflow-hidden relative group hover:border-slate-600 transition-colors ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10 h-full">{children}</div>
  </motion.div>
);

const TechBadge = ({ text }) => (
  <span className="px-3 py-1 bg-slate-800/50 border border-slate-700 rounded-full text-xs font-mono text-slate-300 flex items-center gap-1.5 hover:bg-teal-900/20 hover:text-teal-400 hover:border-teal-500/30 transition-all cursor-default">
    {text}
  </span>
);

// --- MAIN PORTFOLIO COMPONENT ---
const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(new Date());
  const [isContactOpen, setIsContactOpen] = useState(false); // State moved here correctly

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  // --- ANIMATION VARIANTS ---
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Delays each line by 0.15s
        delayChildren: 0.2,    // Waits 0.2s before starting
      }
    }
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 100, damping: 10 } 
    }
  };

  const photoVariants = {
    hidden: { opacity: 0, x: 40, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      x: 0, 
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 100, damping: 12, delay: 0.4 } 
    }
  };

  // --- YOUR SPECIFIC PROJECTS ---
  const projects = [
    {
      title: "Organic Snack E-Commerce",
      description: "High-performance B2C platform. Features a custom cart engine, seasonal pricing logic, and Paystack integration.",
      stack: ["React", "Express", "Node.js", "MongoDb", "Paystack"],
      link: "https://github.com/Hugogrant15/amazon-food-landing-page.git",
      highlight: "Dynamic Pricing Engine",
      image: "/project-shop.png"
    },
    {
      title: "Logistics Command Center",
      description: "Dual-dashboard system. Middleware intercepts orders and routes them to distributors based on City IDs (Geo-Routing).",
      stack: ["MERN", "Geo-Logic", "RBAC", "Socket.io"],
      link: "#",
      highlight: "Automated Order Routing",
      image: "/project-admin.png"
    }
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 font-sans selection:bg-teal-500/30 selection:text-teal-200 relative overflow-x-hidden">
      
      {/* --- GLOBAL EFFECTS --- */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-soft-light z-50"></div>
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      
      <div 
        className="hidden md:block pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.1), transparent 80%)`
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-20">
        
        {/* --- HERO SECTION --- */}
        <motion.div 
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row items-center justify-between gap-12 mb-24"
        >
          <div className="text-center md:text-left flex-1">
            
            {/* Shimmer Badge (Animated) */}
            <motion.div variants={heroItemVariants}>
               <ShimmerBadge text="AVAILABLE FOR HIRE" />
            </motion.div>
            
            <motion.h1 variants={heroItemVariants} className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500">
                Ugochukwu O.
              </span>
            </motion.h1>
            
            <motion.p variants={heroItemVariants} className="text-slate-400 leading-relaxed max-w-lg text-lg mb-8 md:mx-0 mx-auto">
              Full Stack Engineer specialized in <span className="text-slate-200">robust MERN architectures</span>. 
              I build pixel-perfect interfaces backed by secure, scalable logic.
            </motion.p>

            <motion.div variants={heroItemVariants} className="flex flex-wrap gap-4 justify-center md:justify-start">
               {/* Contact Button (Triggers the Modal) */}
               <button 
                  onClick={() => setIsContactOpen(true)}
                  className="px-6 py-3 bg-white text-slate-900 hover:bg-slate-200 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-white/5 hover:scale-105 active:scale-95"
               >
                  <Mail size={18} /> Contact Me
               </button>
              {/* Resume Button */}
<a 
  href="/cv.pdf" 
  download="Ugochukwu_CV.pdf"  // <--- THIS IS THE MAGIC FIX
  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-xl font-medium transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
>
  <Download size={18} /> Resume
</a>
            </motion.div>
          </div>

          {/* 3D Tilt Photo Visual (Animated Slide-in) */}
          <motion.div variants={photoVariants} className="w-full max-w-[280px] md:max-w-sm">
            <TiltCard className="w-full aspect-square bg-slate-900 rounded-[2rem] border border-slate-700 p-2 shadow-2xl relative overflow-hidden group">
              
              {/* 1. THE IMAGE (Grayscale to Color on Hover) */}
              <img 
                src="/me.jpg" 
                alt="Ugochukwu Omenogor" 
                className="w-full h-full object-cover rounded-[1.5rem] filter grayscale hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
              />

              {/* 2. DARK GRADIENT OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent rounded-[2rem] pointer-events-none transition-opacity duration-500 group-hover:opacity-60"></div>

              {/* 3. FLOATING IDENTITY BADGE */}
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-lg transform translate-y-4 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex items-center gap-2 text-teal-400 font-mono text-[10px] font-bold mb-1 uppercase tracking-wider">
                    <Cpu size={14} />
                    Core Competency
                  </div>
                  <div className="text-white text-lg font-bold tracking-tight">
                    System Architecture
                  </div>
                  <div className="text-slate-400 text-sm font-medium">
                    React • Node.js • Express.js • MongoDB • Typescript • API
                  </div>
              </div>

            </TiltCard>
          </motion.div>
        </motion.div>

        {/* --- NAVIGATION --- */}
        <div className="flex justify-center md:justify-start gap-8 border-b border-slate-800 mb-12">
          {['projects', 'about'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-medium tracking-wide transition-all relative ${
                activeTab === tab ? 'text-teal-400' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab.toUpperCase()}
              {activeTab === tab && (
                <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-teal-400" />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode='wait'>
          
          {/* --- PROJECTS TAB --- */}
          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {projects.map((project, i) => (
                <TiltCard key={i} className="group relative bg-slate-900/40 border border-slate-800 rounded-3xl hover:border-teal-500/30 transition-all overflow-hidden flex flex-col h-full backdrop-blur-sm p-0">
                  
                  {/* BROWSER MOCKUP HEADER */}
                  <div className="h-40 overflow-hidden relative border-b border-slate-800">
                      <img 
                         src={project.image} 
                         alt={project.title} 
                         className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                      <div className="absolute top-3 left-3 flex gap-1.5 p-2 bg-slate-900/50 backdrop-blur-md rounded-full border border-white/5">
                         <div className="w-2 h-2 rounded-full bg-red-500/80"></div>
                         <div className="w-2 h-2 rounded-full bg-yellow-500/80"></div>
                         <div className="w-2 h-2 rounded-full bg-green-500/80"></div>
                      </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-8 flex flex-col flex-grow transform group-hover:translate-z-20 transition-transform duration-500">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-100 mb-2">{project.title}</h3>
                        <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                           <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                           {project.highlight}
                        </div>
                      </div>
                      <a href={project.link} className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-all shadow-lg border border-slate-700">
                        <ArrowUpRight size={18} />
                      </a>
                    </div>
                    
                    <p className="text-slate-400 leading-relaxed mb-6 flex-grow text-sm">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.stack.map(tech => <TechBadge key={tech} text={tech} />)}
                    </div>
                  </div>
                </TiltCard>
              ))}
            </motion.div>
          )}

          {/* --- ABOUT TAB --- */}
          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-auto md:h-[500px]"
            >
              {/* Card 1: The Bio */}
              <BentoCard className="md:col-span-2 md:row-span-2 flex flex-col justify-center">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-4">
                  <Terminal size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">The Engineer</h3>
                <p className="text-slate-400 leading-relaxed mb-6">
                  I don't just write code; I engineer solutions. My journey started with simple HTML pages and evolved into complex, data-intensive distributed systems. 
                  <br /><br />
                  I thrive in the MERN stack because it allows me to control the entire lifecycle of data—from the database schema to the pixel on the user's screen.
                </p>
                <div className="flex gap-2">
                   <TechBadge text="Problem Solver" />
                   <TechBadge text="System Architecture" />
                </div>
              </BentoCard>

              {/* Card 2: Location & Time */}
              <BentoCard className="flex flex-col justify-between">
                <div className="flex justify-between items-start">
                   <MapPin className="text-teal-400" />
                   <span className="text-xs font-bold text-slate-500 bg-slate-800 px-2 py-1 rounded">LAGOS</span>
                </div>
                <div>
                  <div className="text-3xl font-mono text-white font-bold tracking-tighter">
                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="text-xs text-slate-500 font-mono mt-1">West Africa Time (WAT)</div>
                </div>
              </BentoCard>

              {/* Card 3: Stack Scroller */}
              <TiltCard className="h-full w-full bg-slate-900 rounded-3xl border border-slate-700 p-6 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light rounded-3xl"></div>
                  
                  <div className="relative h-full flex flex-col justify-between">
                    <div>
                      {/* Traffic Lights */}
                      <div className="flex gap-2 mb-6">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                      </div>
                      
                      {/* The Code Snippet */}
                      <div className="space-y-1 font-mono text-xs md:text-sm text-slate-500 transform group-hover:translate-z-10 transition-transform duration-500">
                        <div className="flex gap-2"><span className="text-blue-400">const</span> <span className="text-yellow-200">Ugochukwu</span> = <span className="text-purple-400">{'{'}</span></div>
                        <div className="pl-4">dedicated: <span className="text-green-400">'true'</span>,</div>
                        <div className="pl-4">hardWorker: <span className="text-blue-400">true</span>,</div>
                        <div className="pl-4">stack: [<span className="text-green-400">'React', 'Node', 'Express', 'MongoDb', 'TS'</span>],</div>
                        <div className="pl-4">loc: <span className="text-green-400">'Lagos'</span></div>
                        <div className="text-purple-400">{'}'}</div>
                      </div>
                    </div>
                    
                    {/* Footer Status */}
                    <div className="pt-4 text-slate-600 flex items-center gap-2 text-xs font-mono">
                      <Zap size={14} className="text-yellow-500" /> 
                      <span>Compiling...</span>
                    </div>
                  </div>
              </TiltCard>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
};

export default Portfolio;