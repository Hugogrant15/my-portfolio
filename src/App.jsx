import { useState, useEffect, useRef } from "react";
import ContactModal from "./components/ContactModal";
import TechMarquee from "./components/TechMarquee";
import ProcessSection from "./components/ProcessSection";
import {
  Mail,
  ExternalLink,
  Download,
  Terminal,
  Cpu,
  MapPin,
  Zap,
  ChevronUp,
  Menu,
  X,
  Server,
  Layers,
  Wrench,
} from "lucide-react";

// Inline SVGs for deprecated lucide brand icons
const GitHubIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.5 11.5 0 0 1 12 6.8c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.562 21.8 24 17.302 24 12 24 5.373 18.627 0 12 0z" />
  </svg>
);

const LinkedInIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
import {
  motion, // eslint-disable-line no-unused-vars
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useInView,
} from "framer-motion";

// ─── TILT CARD ────────────────────────────────────────────────────────────────
const TiltCard = ({ children, className = "" }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["17.5deg", "-17.5deg"]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-17.5deg", "17.5deg"]
  );

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      className={`relative transition-all duration-200 ease-out ${className}`}
    >
      {children}
    </motion.div>
  );
};

// ─── COUNT UP ─────────────────────────────────────────────────────────────────
const CountUp = ({ end, suffix = "", duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

// ─── SCROLL PROGRESS BAR ──────────────────────────────────────────────────────
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-teal-500 to-blue-500 z-[100] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
const Navbar = ({ onContactOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "About", href: "#about" },
    { label: "Process", href: "#process" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/60 shadow-xl shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="#home"
            className="text-white font-bold text-lg tracking-tight"
          >
            <span className="text-teal-400">U</span>go.dev
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-slate-400 hover:text-white text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={onContactOpen}
              className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold text-sm rounded-lg transition-all hover:scale-105 active:scale-95"
            >
              Hire Me
            </button>
          </div>

          <button
            className="md:hidden text-slate-400 hover:text-white p-2"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-slate-950/97 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-6 text-slate-400 hover:text-white p-2"
            >
              <X size={24} />
            </button>
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setMobileOpen(false)}
                className="text-3xl font-bold text-white hover:text-teal-400 transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: links.length * 0.08 }}
              onClick={() => {
                setMobileOpen(false);
                onContactOpen();
              }}
              className="px-8 py-3 bg-teal-500 text-slate-900 font-bold rounded-xl text-lg"
            >
              Hire Me
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ─── SECTION HEADER ───────────────────────────────────────────────────────────
const SectionHeader = ({ eyebrow, title }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="mb-12"
  >
    <p className="text-teal-400 font-mono text-sm font-bold tracking-widest uppercase mb-2">
      {eyebrow}
    </p>
    <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
  </motion.div>
);

// ─── MAIN PORTFOLIO ───────────────────────────────────────────────────────────
const Portfolio = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(new Date());
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  const words = [
    "Full Stack Engineer",
    "MERN Specialist",
    "System Architect",
    "Problem Solver",
  ];

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(
      () => setWordIndex((i) => (i + 1) % words.length),
      2800
    );
    return () => clearInterval(t);
  }, [words.length]);

  useEffect(() => {
    const update = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", update);
    return () => window.removeEventListener("mousemove", update);
  }, []);

  const projects = [
    {
      title: "EasyPass",
      description:
        "Easypass is a secure, digital visitor management system designed for residential estates. It replaces traditional paper logbooks with QR codes and verified entry, significantly improving security and speeding up the process at the gate.",
      stack: ["React", "Express", "Node.js", "MongoDB", "Paystack"],
      link: "https://easypass.ng",
      github: "#",
      highlight: "Custom CMS & Role-based Auth",
      image: "/project-easypass.png",
    },
    {
      title: "Kingstonz Gadgets",
      description:
        "Bespoke B2C platform handling end-to-end event lifecycles. Includes a custom CMS for portfolio management and role-based authentication.",
      stack: ["React", "Express", "Node.js", "MongoDB", "Paystack"],
      link: "https://client-psi-swart.vercel.app/",
      github: "#",
      highlight: "Custom CMS & Role-based Auth",
      image: "/kingstons-project.png",
    },
    {
      title: "Kiini Events",
      description:
        "Bespoke B2C platform handling end-to-end event lifecycles. Includes a custom CMS for portfolio management and role-based authentication.",
      stack: ["React", "Node.js", "Firebase Auth/Firestore", "Tailwind CSS"],
      link: "https://kiini-events.vercel.app/",
      github: "#",
      highlight: "Custom CMS & Role-based Auth",
      image: "/kiini-project.png",
    },

    {
      title: "Organic Snack E-Commerce",
      description:
        "High-performance B2C platform featuring a custom cart engine, seasonal pricing logic, and Paystack integration for seamless, secure checkout.",
      stack: ["React", "Express", "Node.js", "MongoDB", "Paystack"],
      link: "https://project-amazon-food-design.vercel.app/",
      github: "#",
      highlight: "Dynamic Pricing Engine",
      image: "/project-shop.png",
    },
    {
      title: "Logistics Command Center",
      description:
        "Dual-dashboard system with middleware that intercepts orders and routes them to distributors based on City IDs using intelligent geo-routing logic and real-time socket updates.",
      stack: ["MERN", "Geo-Logic", "RBAC", "Socket.io"],
      link: "#",
      github: "#",
      highlight: "Automated Order Routing",
      image: "/project-admin.png",
    },
  ];

  const stats = [
    { value: 2, suffix: "+", label: "Projects Shipped" },
    { value: 12, suffix: "+", label: "Technologies" },
    { value: 1, suffix: "yr+", label: "Experience" },
    { value: 100, suffix: "%", label: "Dedication" },
  ];

  const skillGroups = [
    {
      category: "Frontend",
      icon: <Layers size={18} />,
      colorIcon: "text-teal-400 bg-teal-500/10",
      colorHeading: "text-teal-400",
      colorBadge: "bg-teal-900/20 border-teal-500/30 text-teal-300",
      borderHover: "hover:border-teal-500/40",
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "Redux",
      ],
    },
    {
      category: "Backend",
      icon: <Server size={18} />,
      colorIcon: "text-blue-400 bg-blue-500/10",
      colorHeading: "text-blue-400",
      colorBadge: "bg-blue-900/20 border-blue-500/30 text-blue-300",
      borderHover: "hover:border-blue-500/40",
      skills: ["Node.js", "Express.js", "MongoDB", "REST APIs", "Socket.io"],
    },
    {
      category: "Tools",
      icon: <Wrench size={18} />,
      colorIcon: "text-purple-400 bg-purple-500/10",
      colorHeading: "text-purple-400",
      colorBadge: "bg-purple-900/20 border-purple-500/30 text-purple-300",
      borderHover: "hover:border-purple-500/40",
      skills: ["Git", "Vercel", "Postman", "VS Code", "Figma"],
    },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 font-sans selection:bg-teal-500/30 selection:text-teal-200 relative overflow-x-hidden">
      <ScrollProgress />
      <Navbar onContactOpen={() => setIsContactOpen(true)} />

      {/* Global FX */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-soft-light z-50" />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div
        className="hidden md:block pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(20,184,166,0.07), transparent 80%)`,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-20">
        {/* ── HERO ── */}
        <section
          id="home"
          className="flex flex-col md:flex-row items-center justify-between gap-12 mb-28"
        >
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center md:text-left flex-1"
          >
            {/* Shimmer badge */}
            <div className="relative inline-flex overflow-hidden rounded-full p-[1px] mb-6">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2E8F0_0%,#14b8a6_50%,#E2E8F0_100%)]" />
              <span className="inline-flex h-full w-full cursor-default items-center justify-center rounded-full bg-slate-950 px-4 py-1.5 text-xs font-semibold text-slate-300 backdrop-blur-3xl gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                AVAILABLE FOR HIRE
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500">
                Ugochukwu O.
              </span>
            </h1>

            {/* Cycling word */}
            <div className="h-9 mb-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={wordIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35 }}
                  className="text-xl md:text-2xl font-semibold text-teal-400"
                >
                  {words[wordIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-lg text-lg mb-8 md:mx-0 mx-auto">
              I build{" "}
              <span className="text-slate-200 font-medium">
                pixel-perfect interfaces
              </span>{" "}
              backed by{" "}
              <span className="text-slate-200 font-medium">
                secure, scalable MERN architectures
              </span>
              .
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-8">
              <button
                onClick={() => setIsContactOpen(true)}
                className="px-6 py-3 bg-white text-slate-900 hover:bg-slate-200 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-white/5 hover:scale-105 active:scale-95"
              >
                <Mail size={18} /> Contact Me
              </button>
              <a
                href="/cv.pdf"
                download="Ugochukwu_CV.pdf"
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-xl font-medium transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <Download size={18} /> Resume
              </a>
            </div>

            {/* Social links — update hrefs with your actual profiles */}
            <div className="flex gap-3 justify-center md:justify-start">
              {[
                {
                  icon: <GitHubIcon size={20} />,
                  href: "https://github.com",
                  label: "GitHub",
                },
                {
                  icon: <LinkedInIcon size={20} />,
                  href: "https://linkedin.com",
                  label: "LinkedIn",
                },
                {
                  icon: <Mail size={20} />,
                  href: "mailto:ugochukwu@email.com",
                  label: "Email",
                },
              ].map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  className="p-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-400 hover:text-white hover:border-slate-500 transition-all hover:scale-110 active:scale-95"
                >
                  {icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Photo card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full max-w-[280px] md:max-w-sm relative"
          >
            {/* Ambient orbs */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-500/15 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/15 rounded-full blur-3xl animate-pulse [animation-delay:1.2s]" />

            <TiltCard className="w-full aspect-square bg-slate-900 rounded-[2rem] border border-slate-700 p-2 shadow-2xl relative overflow-hidden group">
              <img
                src="/me.jpg"
                alt="Ugochukwu Omenogor"
                className="w-full h-full object-cover rounded-[1.5rem] filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent rounded-[2rem] pointer-events-none transition-opacity duration-500 group-hover:opacity-60" />
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-lg translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="flex items-center gap-2 text-teal-400 font-mono text-[10px] font-bold mb-1 uppercase tracking-wider">
                  <Cpu size={14} /> Core Competency
                </div>
                <div className="text-white text-base font-bold tracking-tight">
                  System Architecture
                </div>
                <div className="text-slate-400 text-xs mt-0.5">
                  React · Node.js · Express · MongoDB
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </section>

        {/* ── STATS ── */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-28"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 text-center group hover:border-teal-500/30 hover:bg-slate-900/60 transition-all"
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-1 font-mono">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* ── MARQUEE ── */}
        <div className="mb-28">
          <TechMarquee />
        </div>

        {/* ── PROJECTS ── */}
        <section id="projects" className="mb-28">
          <SectionHeader eyebrow="// Featured Work" title="Projects" />

          <div className="flex flex-col gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden hover:border-teal-500/30 transition-all duration-500 group"
              >
                {/* Image panel */}
                <div
                  className={`h-56 md:h-full relative overflow-hidden ${
                    i % 2 !== 0 ? "md:order-last" : ""
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-${
                      i % 2 === 0 ? "r" : "l"
                    } from-transparent to-slate-900/70`}
                  />
                  {/* Browser chrome dots */}
                  <div className="absolute top-4 left-4 flex gap-1.5 p-2 bg-slate-900/60 backdrop-blur-md rounded-full border border-white/5">
                    <div className="w-2 h-2 rounded-full bg-red-500/80" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                    <div className="w-2 h-2 rounded-full bg-green-500/80" />
                  </div>
                </div>

                {/* Content panel */}
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    {project.highlight}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-100 mb-3 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed mb-6 text-sm">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-7">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-slate-800/50 border border-slate-700 rounded-full text-xs font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 hover:bg-slate-200 rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95"
                    >
                      <ExternalLink size={14} /> Live Demo
                    </a>
                    <a
                      href={project.github}
                      className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-xl text-sm font-medium transition-all hover:scale-105"
                    >
                      <GitHubIcon size={14} /> Source
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills" className="mb-28">
          <SectionHeader eyebrow="// Tech Arsenal" title="Skills" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skillGroups.map((group, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`bg-slate-900/40 border border-slate-800 rounded-2xl p-6 transition-all duration-300 ${group.borderHover}`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${group.colorIcon} mb-4`}
                >
                  {group.icon}
                </div>
                <h3
                  className={`text-sm font-bold uppercase tracking-widest ${group.colorHeading} mb-4`}
                >
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1.5 border rounded-full text-xs font-mono font-medium transition-all ${group.colorBadge}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="mb-28">
          <SectionHeader eyebrow="// Who I Am" title="About" />

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[500px]"
          >
            {/* Bio */}
            <div className="md:col-span-2 md:row-span-2 bg-slate-900/40 border border-slate-800 rounded-3xl p-8 md:p-10 flex flex-col justify-center hover:border-slate-600 transition-colors">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-6">
                <Terminal size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                The Engineer
              </h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                I don't just write code; I engineer solutions. My journey
                started with simple HTML pages and evolved into complex,
                data-intensive distributed systems.
                <br />
                <br />I thrive in the MERN stack because it lets me control the
                entire lifecycle of data — from the database schema to the pixel
                on the user's screen.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-slate-800/50 border border-slate-700 rounded-full text-xs font-mono text-slate-300">
                  Problem Solver
                </span>
                <span className="px-3 py-1 bg-slate-800/50 border border-slate-700 rounded-full text-xs font-mono text-slate-300">
                  System Architecture
                </span>
                <span className="px-3 py-1 bg-slate-800/50 border border-slate-700 rounded-full text-xs font-mono text-slate-300">
                  Clean Code
                </span>
              </div>
            </div>

            {/* Location / Clock */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-slate-600 transition-colors">
              <div className="flex justify-between items-start">
                <MapPin className="text-teal-400" size={20} />
                <span className="text-xs font-bold text-slate-500 bg-slate-800 px-2 py-1 rounded-md">
                  LAGOS, NG
                </span>
              </div>
              <div>
                <div className="text-4xl font-mono text-white font-bold tracking-tighter">
                  {time.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div className="text-xs text-slate-500 font-mono mt-1">
                  West Africa Time (WAT)
                </div>
              </div>
            </div>

            {/* Code snippet card */}
            <TiltCard className="h-full w-full bg-slate-900 rounded-3xl border border-slate-700 p-6 relative overflow-hidden group min-h-[180px]">
              <div className="flex gap-2 mb-5">
                <div className="w-3 h-3 rounded-full bg-red-500/40 border border-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/40 border border-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/40 border border-green-500/50" />
              </div>
              <div className="space-y-1 font-mono text-xs text-slate-500">
                <div>
                  <span className="text-blue-400">const</span>{" "}
                  <span className="text-yellow-200">Ugochukwu</span> ={" "}
                  <span className="text-purple-400">{"{"}</span>
                </div>
                <div className="pl-4">
                  dedicated: <span className="text-green-400">'true'</span>,
                </div>
                <div className="pl-4">
                  hardWorker: <span className="text-blue-400">true</span>,
                </div>
                <div className="pl-4">
                  stack: [
                  <span className="text-green-400">
                    'React', 'Node', 'Mongo'
                  </span>
                  ],
                </div>
                <div className="pl-4">
                  loc: <span className="text-green-400">'Lagos'</span>
                </div>
                <div className="text-purple-400">{"}"}</div>
              </div>
              <div className="mt-4 text-slate-600 flex items-center gap-2 text-xs font-mono">
                <Zap size={12} className="text-yellow-500" /> Compiling...
              </div>
            </TiltCard>
          </motion.div>
        </section>

        {/* ── PROCESS ── */}
        <section id="process">
          <ProcessSection />
        </section>
      </div>

      {/* ── FOOTER ── */}
      <footer className="border-t border-slate-800/60">
        <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-white font-bold text-lg mb-1 text-center md:text-left">
              <span className="text-teal-400">U</span>go.dev
            </div>
            <div className="text-slate-500 text-sm text-center md:text-left">
              Designed &amp; Built by Ugochukwu O. — Lagos, Nigeria
            </div>
          </div>

          <div className="flex gap-3">
            {[
              {
                icon: <GitHubIcon size={18} />,
                href: "https://github.com",
                label: "GitHub",
              },
              {
                icon: <LinkedInIcon size={18} />,
                href: "https://linkedin.com",
                label: "LinkedIn",
              },
              {
                icon: <Mail size={18} />,
                href: "mailto:ugochukwu@email.com",
                label: "Email",
              },
            ].map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={label}
                className="p-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-400 hover:text-white hover:border-slate-500 transition-all hover:scale-110"
              >
                {icon}
              </a>
            ))}
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-400 hover:text-white hover:border-teal-500/50 transition-all group"
            title="Back to top"
          >
            <ChevronUp
              size={18}
              className="group-hover:-translate-y-0.5 transition-transform"
            />
          </button>
        </div>

        <div className="text-center pb-8 text-slate-600 text-xs">
          © {new Date().getFullYear()} Ugochukwu O. All rights reserved.
        </div>
      </footer>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
};

export default Portfolio;
