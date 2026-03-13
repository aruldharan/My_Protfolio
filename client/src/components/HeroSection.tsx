import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, ChevronRight, Terminal, Sparkles, Download, ArrowDown } from "lucide-react";

const roles = ["Full-Stack Developer", "MERN Stack Specialist", "React Developer", "Python Enthusiast","Frontend Devloper" ];

const techOrbit = [
  { slug: "mongodb", color: "#47A248" },
  { slug: "express", color: "#000000" },
  { slug: "react", color: "#61DAFB" },
  { slug: "nodedotjs", color: "#339933" },
  { slug: "typescript", color: "#3178C6" },
  { slug: "python", color: "#3776AB" },
];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const speed = deleting ? 40 : 80;

    if (!deleting && text === currentRole) {
      setTimeout(() => setDeleting(true), 2000);
      return;
    }
    if (deleting && text === "") {
      setDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setText(deleting ? currentRole.slice(0, text.length - 1) : currentRole.slice(0, text.length + 1));
    }, speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex]);

  return (
    <section className="relative min-h-[110vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Dynamic Mouse-Following Background */}
      <motion.div 
        animate={{ x: mousePos.x, y: mousePos.y }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh] -z-20 opacity-30"
        style={{
          background: "radial-gradient(circle at 50% 50%, hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.15) 0%, transparent 50%)"
        }}
      />
      
      <div className="section-padding w-full max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
        
        {/* Profile "Satellite" Hub - Smaller & Refined */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "circOut" }}
          className="relative mb-32"
        >
          {/* Orbiting Tech Solar System - Refined Radius to avoid text overlap */}
          {techOrbit.map((tech, i) => (
            <motion.div
              key={tech.slug}
              animate={{ 
                rotate: 360,
                x: Math.cos((i * 60 * Math.PI) / 180) * 190,
                y: Math.sin((i * 60 * Math.PI) / 180) * 70,
              }}
              transition={{ 
                rotate: { duration: 50, repeat: Infinity, ease: "linear" },
                x: { duration: 0 }, 
                y: { duration: 0 } 
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 glass rounded-xl border-white/10 flex items-center justify-center p-2 gold-glow transition-all hover:scale-125 hover:z-50 cursor-pointer"
            >
              <img 
                src={`https://cdn.simpleicons.org/${tech.slug}/${tech.color.replace("#", "")}`} 
                alt={tech.slug}
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.dataset.fallback) {
                    target.dataset.fallback = "true";
                    target.src = `https://cdn.simpleicons.org/${tech.slug}`;
                  } else if (target.dataset.fallback === "true") {
                    target.dataset.fallback = "tried-all";
                    target.src = `https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/${tech.slug}.svg`;
                  }
                }}
              />
            </motion.div>
          ))}

          {/* Central Profile Image - Smaller (w-28) Squircle */}
          <div className="relative w-28 h-28 group cursor-pointer">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-3 border border-primary/30 rounded-[32px] border-dashed"
            />
            <div className="absolute inset-0 rounded-[32px] glass border border-primary/20 overflow-hidden gold-glow-strong z-10 transition-transform duration-500 group-hover:scale-105">
              <img 
                src="/ARUL-PIC.jpg" 
                alt="Arul Dharan S" 
                className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
              />
            </div>
          </div>
        </motion.div>

        {/* Hero Content - Refined Sizes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="space-y-3">
            <motion.p 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-primary font-black tracking-[0.4em] uppercase text-[10px] mb-2"
            >
              A Fullstack Developer
            </motion.p>
            <h1 className="text-3xl md:text-5xl font-black font-display leading-[1.1] tracking-tighter">
              Hi  I'am <span className="text-gradient-gold drop-shadow-lg">Arul Dharan.S</span>
            </h1>
          </div>

          <div className="flex flex-col items-center gap-5">
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl glass shadow-inner group transition-all hover:bg-white/10 hover:border-primary/30">
              <Terminal size={18} className="text-primary" />
              <span className="text-primary font-display text-lg md:text-xl font-black tracking-tight">{text}</span>
              <span className="w-1.5 h-6 bg-primary animate-pulse rounded-full" />
            </div>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed font-medium">
              Driven by <span className="text-foreground font-semibold">innovation</span>, I transform complex ideas into <span className="text-primary underline decoration-primary/20 decoration-2 underline-offset-4 italic">flawless digital realities.</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-black text-xs uppercase tracking-[0.2em] gold-glow-strong hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
            >
              My Work <ChevronRight size={18} />
            </motion.button>
            
            <motion.a 
              href="/ArulDharan_Resume.pdf"
              download
              whileHover={{ scale: 1.05, y: -2, backgroundColor: "hsla(var(--primary), 0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-primary/20 text-foreground font-bold text-xs uppercase tracking-[0.2em] transition-all hover:border-primary/50 flex items-center justify-center gap-2"
            >
              Resume <Download size={18} />
            </motion.a>
          </div>
            <div className="flex items-center gap-10 border-l border-white/10 pl-10 h-10 hidden sm:flex">
               {[
                 { Icon: Github, href: "https://github.com/aruldharan", label: "Github" },
                 { Icon: Linkedin, href: "https://linkedin.com/in/aruldharan", label: "LinkedIn" },
                 { Icon: Mail, href: "mailto:aruldharan94@gmail.com", label: "Email" },
               ].map(({ Icon, href, label }) => (
                 <motion.a
                   key={label}
                   href={href}
                   target="_blank"
                   rel="noopener noreferrer"
                   whileHover={{ y: -6, scale: 1.25 }}
                   className="text-muted-foreground hover:text-primary transition-all duration-300"
                 >
                   <Icon size={28} />
                 </motion.a>
               ))}
            </div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Adjusted Position */}
      <motion.div
        animate={{ y: [0, 8, 0] }} 
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-20 hover:opacity-100 transition-opacity cursor-pointer z-20"
        onClick={() => {
          const el = document.getElementById("about");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <ArrowDown size={24} className="text-primary" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
