import React from 'react';
import { motion } from 'framer-motion';
import { Search, PenTool, Code, Rocket, Repeat } from 'lucide-react';

const ProcessSection = () => {
  const steps = [
    { title: "Discovery", icon: <Search size={24} />, desc: "Understanding the core business logic and user needs before writing a single line of code." },
    { title: "Architecture", icon: <PenTool size={24} />, desc: "Designing scalable schemas in MongoDB and planning component hierarchy in React." },
    { title: "Development", icon: <Code size={24} />, desc: "Writing clean, reusable code with TypeScript and implementing secure APIs." },
    { title: "Deployment", icon: <Rocket size={24} />, desc: "CI/CD pipelines, Vercel optimization, and post-launch monitoring." }
  ];

  // --- ANIMATION VARIANTS ---
  
  // The Parent (Conductor)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5, // This creates the sequential delay (0.2s between each card)
      }
    }
  };

  // The Children (Performers)
  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 100, damping: 12 } 
    }
  };

  return (
    <div className="py-24 border-t border-slate-900">
      {/* Header Animation */}
      <motion.h3 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-2xl font-bold text-white mb-12 text-center flex items-center justify-center gap-2"
      >
        <Repeat size={20} className="text-teal-500" /> 
        The Engineering Process
      </motion.h3>
      
      {/* The Grid Container acts as the "Conductor" */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }} // Animation starts when 100px of the grid is visible
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        {steps.map((step, i) => (
          // Each card inherits the "visible" state from the parent, but respects its own delay
          <motion.div 
            key={i}
            variants={itemVariants} 
            className="p-6 bg-slate-900/20 border border-slate-800 rounded-2xl hover:bg-slate-900/40 hover:border-teal-500/30 transition-all group"
          >
            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-teal-400 mb-4 group-hover:scale-110 transition-transform duration-300">
              {step.icon}
            </div>
            <h4 className="text-lg font-bold text-slate-200 mb-2">{step.title}</h4>
            <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProcessSection;