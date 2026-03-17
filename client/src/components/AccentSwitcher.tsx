import React, { useRef, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check } from 'lucide-react';

export const AccentSwitcher = () => {
  const { accentColor, setAccentColor, colors } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Close if click is outside switcherRef AND isn't the toggle button itself
      if (switcherRef.current && !switcherRef.current.contains(target) && !target.closest('.accent-toggle-btn')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside, { capture: true });
    }
    return () => {
      document.removeEventListener("click", handleClickOutside, { capture: true });
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="accent-toggle-btn p-3 rounded-2xl border border-black/5 dark:border-white/10 text-primary flex items-center justify-center transition-all bg-black/[0.02] dark:bg-white/5 hover:bg-black/[0.05] dark:hover:bg-white/10"
      >
        <Palette size={20} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={switcherRef}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute top-16 right-0 bg-white dark:bg-[#0A0A0A] border border-black/5 dark:border-white/10 rounded-[24px] p-5 min-w-[240px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-[150]"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-5 text-black/40 dark:text-white/40 ml-1">Select Accent</p>
            <div className="grid grid-cols-4 gap-3">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => {
                    setAccentColor(color);
                    setIsOpen(false);
                  }}
                  className="relative w-11 h-11 rounded-xl transition-all hover:scale-110 flex items-center justify-center overflow-hidden group shadow-lg"
                  style={{ backgroundColor: `hsl(${color.h} ${color.s} ${color.l})` }}
                  title={color.name}
                >
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {accentColor.name === color.name && (
                    <Check size={18} className="text-white z-10" />
                  )}
                </button>
              ))}
            </div>
            
            <div className="mt-5 pt-4 border-t border-black/5 dark:border-white/5">
                <div className="flex items-center justify-between text-[11px] font-black text-black/40 dark:text-white/40 uppercase tracking-[0.15em] px-1">
                    <span>Active Color</span>
                    <span className="text-primary font-black">{accentColor.name}</span>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
