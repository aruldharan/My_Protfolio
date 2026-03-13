import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { AccentSwitcher } from "./AccentSwitcher";

const navItems = ["About", "Skills", "Projects", "Certifications", "Experience", "Contact"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    // Active section tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5, rootMargin: "-10% 0px -40% 0px" }
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.toLowerCase());
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 100,
        behavior: "smooth",
      });
    }
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${
        scrolled 
          ? "glass py-4 border-b border-white/5 shadow-2xl shadow-black/40" 
          : "py-8 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
          className="font-display text-3xl font-black tracking-tighter hover:scale-105 transition-transform relative z-[110]"
        >
          <span className="text-gradient-gold">AD</span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl glass border-white/5">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-xl transition-all duration-300 relative group ${
                  activeSection === item.toLowerCase() 
                    ? "text-primary bg-white/5" 
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {item}
                {activeSection === item.toLowerCase() && (
                  <motion.span 
                    layoutId="nav-active"
                    className="absolute -bottom-1 left-4 right-4 h-[2px] bg-primary rounded-full"
                  />
                )}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <AccentSwitcher />
            <ThemeToggle />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo("Contact")}
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-[0.2em] gold-glow hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
            >
              Hire Me
            </motion.button>
          </div>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center gap-4 relative z-[110]">
          <AccentSwitcher />
          <ThemeToggle />
          <button 
            className="p-3 rounded-2xl glass border-white/10 text-foreground" 
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu - Fixed Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[105] md:hidden bg-background/95 backdrop-blur-2xl flex flex-col p-12 pt-32 gap-6"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            
            {navItems.map((item) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                onClick={() => scrollTo(item)}
                className={`w-full text-left py-4 px-6 rounded-2xl text-xl font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-between group ${
                  activeSection === item.toLowerCase() 
                    ? "text-primary bg-white/5 border border-primary/20" 
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {item}
                <ChevronRight size={20} className={`transition-transform ${activeSection === item.toLowerCase() ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`} />
              </motion.button>
            ))}
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-auto flex flex-col gap-4"
            >
              <button
                onClick={() => scrollTo("Contact")}
                className="w-full py-6 rounded-3xl bg-primary text-primary-foreground font-black uppercase tracking-[0.3em] text-xs shadow-2xl shadow-primary/30 gold-glow-strong"
              >
                Hire Me Now
              </button>
              <p className="text-center text-[10px] uppercase font-bold tracking-widest text-muted-foreground/40">Available WorldWide</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
