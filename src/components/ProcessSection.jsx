import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { Search, PenTool, Code, Rocket, Repeat } from "lucide-react";

const steps = [
  {
    title: "Discovery",
    icon: <Search size={22} />,
    desc: "Understanding core business logic and user needs before writing a single line of code.",
  },
  {
    title: "Architecture",
    icon: <PenTool size={22} />,
    desc: "Designing scalable MongoDB schemas and planning the React component hierarchy.",
  },
  {
    title: "Development",
    icon: <Code size={22} />,
    desc: "Writing clean, reusable TypeScript code and implementing secure, tested APIs.",
  },
  {
    title: "Deployment",
    icon: <Rocket size={22} />,
    desc: "CI/CD pipelines, Vercel optimisation, and post-launch monitoring.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 12 },
  },
};

const ProcessSection = () => (
  <div className="py-24 border-t border-slate-900">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-center gap-3 mb-14"
    >
      <Repeat size={20} className="text-teal-500" />
      <h3 className="text-2xl md:text-3xl font-bold text-white">
        The Engineering Process
      </h3>
    </motion.div>

    <div className="relative">
      {/* Connecting line — desktop only, aligned to icon centres (top padding 24px + half icon 40px = 64px) */}
      <div className="hidden md:block absolute top-[40px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent z-0" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10"
      >
        {steps.map((step, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="flex flex-col items-center text-center p-6 bg-slate-900/20 border border-slate-800 rounded-2xl hover:bg-slate-900/40 hover:border-teal-500/30 transition-all group"
          >
            {/* Circular icon with step badge */}
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center text-teal-400 group-hover:border-teal-500/50 group-hover:bg-slate-700 group-hover:scale-110 transition-all duration-300">
                {step.icon}
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center text-[9px] font-bold text-slate-900 shadow-lg">
                {i + 1}
              </div>
            </div>

            <h4 className="text-base font-bold text-slate-200 mb-2">
              {step.title}
            </h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </div>
);

export default ProcessSection;
