import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { AccentSwitcher } from "./AccentSwitcher";

const navItems = ["About", "Skills", "Projects", "Experience", "Certifications", "Contact"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (navRef.current && !navRef.current.contains(target)) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside, { capture: true });

    // Precise section tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id === "home") {
              setActiveSection("");
            } else {
              setActiveSection(id);
            }
          }
        });
      },
      { 
        threshold: 0, 
        rootMargin: "-45% 0px -45% 0px" // Very focused trigger zone at the middle of the screen
      }
    );

    ["home", ...navItems.map(item => item.toLowerCase())].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside, { capture: true });
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
      // Force active state for immediate feedback
      setActiveSection(id.toLowerCase());
    }
    setMobileOpen(false);
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-[9999] flex justify-center px-4 pointer-events-none">
      <motion.nav
        ref={navRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full border border-black/5 dark:border-white/5 transition-all duration-700 shadow-xl ${
          scrolled 
            ? "bg-white/80 dark:bg-black/60 shadow-black/10 dark:shadow-black/50 scale-95" 
            : "bg-white/40 dark:bg-black/20"
        }`}
      >
        {/* Logo/Home Button */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
          className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center transition-all duration-500 hover:border-primary hover:scale-110 relative overflow-hidden shrink-0 group bg-white/10 dark:bg-transparent"
        >
          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="text-gradient-gold font-black text-sm relative z-10">AD</span>
        </button>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.toLowerCase();
            return (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className={`text-[10px] font-extrabold uppercase tracking-widest px-4 py-2 rounded-full transition-all duration-500 relative group overflow-visible ${
                  isActive 
                    ? "text-primary" 
                    : "text-black/40 dark:text-white/30 hover:text-black dark:hover:text-white"
                }`}
              >
                <span 
                  className={`relative z-10 transition-all duration-500 uppercase ${
                    isActive ? "drop-shadow-[0_0_12px_hsl(var(--primary)/0.6)]" : ""
                  }`}
                >
                  {item}
                </span>
                
                {/* Subtle Hover Underline */}
                {!isActive && (
                  <span className="absolute bottom-1 left-4 right-4 h-[2px] bg-primary/0 group-hover:bg-primary/30 rounded-full transition-all duration-300" />
                )}
              </button>
            );
          })}
        </div>

        {/* Separator */}
        <div className="hidden md:block w-px h-6 bg-black/5 dark:bg-white/10 mx-2" />

        {/* Controls */}
        <div className="flex items-center gap-2">
          <div className="scale-90 opacity-80 hover:opacity-100 transition-opacity">
            <AccentSwitcher />
          </div>
          <div className="scale-90 opacity-80 hover:opacity-100 transition-opacity">
            <ThemeToggle />
          </div>
          
          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-black dark:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="fixed top-24 left-4 right-4 z-[9998] md:hidden bg-white dark:bg-[#0A0A0A] rounded-[32px] p-6 flex flex-col gap-3 border border-black/5 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] pointer-events-auto"
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.toLowerCase();
                return (
                  <button
                    key={item}
                    onClick={() => scrollTo(item)}
                    className={`w-full text-left py-4 px-6 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] transition-all relative ${
                      isActive 
                        ? "text-primary bg-primary/5 dark:bg-primary/10 border border-primary/20" 
                        : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default Navbar;
