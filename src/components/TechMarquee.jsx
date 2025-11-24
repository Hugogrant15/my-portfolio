import { motion } from 'framer-motion';

const TechMarquee = () => {
  const techStack = [
    "React", "Node.js", "MongoDB", "Express", "TypeScript", "Next.js", 
    "Tailwind", "Framer Motion", "Redux", "Git", "Postman", "Vercel",
    "React", "Node.js", "MongoDB", "Express", "TypeScript", "Next.js" // Duplicated for seamless loop
  ];

  return (
    <div className="w-full py-10 overflow-hidden relative">
      {/* Fade edges to look premium */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#030712] to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#030712] to-transparent z-10"></div>
      
      <motion.div 
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
      >
        {techStack.map((tech, i) => (
          <div key={i} className="flex items-center gap-2 text-slate-500 font-mono text-sm font-bold uppercase tracking-widest px-4 border-r border-slate-800 last:border-0">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-900"></span>
            {tech}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TechMarquee;