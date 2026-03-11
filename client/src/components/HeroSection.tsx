import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Twitter, Download, Mail } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const roles = ["Full-Stack Developer", "MERN Stack Enthusiast", "React Developer", "Python Developer"];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40 dark:opacity-40 light:opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[100px] animate-float opacity-50" />
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full bg-primary/5 blur-[80px] animate-float opacity-30 delay-1000" />
      
      {/* Animated geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[1px] h-[300px] bg-gradient-to-b from-transparent via-primary/20 to-transparent"
            style={{
              left: `${15 + i * 15}%`,
              top: '-10%',
            }}
            animate={{
              y: ['0vh', '120vh'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-6 h-6">
            {text}<span className="animate-pulse">|</span>
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
            Hi, I'm{" "}
            <span className="text-gradient-gold">Arul Dharan S</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            A passionate fresher developer eager to build beautiful web experiences.
            I love clean code, modern UI, and learning new technologies every day.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold overflow-hidden transition-all gold-glow hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3.5 rounded-xl border border-border bg-background/50 backdrop-blur-sm text-foreground font-bold hover:border-primary hover:text-primary transition-all hover:bg-primary/5 active:scale-95"
          >
            Get In Touch
          </button>
          <a
            href="/ArulDharan_Resume.pdf.pdf"
            download="ArulDharan_Resume.pdf"
            className="px-8 py-3.5 rounded-xl border border-primary/20 text-primary font-bold hover:bg-primary/10 transition-all flex items-center gap-2 active:scale-95"
          >
            <Download size={18} className="group-hover:animate-bounce" /> Resume
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-5"
        >
          {[
            { Icon: Github, href: "https://github.com/aruldharan" },
            { Icon: Linkedin, href: "https://linkedin.com/in/aruldharan" },
            { Icon: Mail, href: "mailto:aruldharan94@gmail.com" },
          ].map(({ Icon, href }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
            >
              <Icon size={20} />
            </a>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ArrowDown className="text-muted-foreground" size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
