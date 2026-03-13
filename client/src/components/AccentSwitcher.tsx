import React from 'react';
import { useTheme } from './ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check } from 'lucide-react';

export const AccentSwitcher = () => {
  const { accentColor, setAccentColor, colors } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 rounded-2xl glass border-white/10 text-primary gold-glow flex items-center justify-center transition-all bg-white/5"
      >
        <Palette size={20} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute top-16 right-0 glass border-white/10 rounded-2xl p-4 min-w-[200px] shadow-2xl z-[150] gold-glow"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-muted-foreground ml-1">Select Accent</p>
            <div className="grid grid-cols-5 gap-2">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => {
                    setAccentColor(color);
                    setIsOpen(false);
                  }}
                  className="relative w-10 h-10 rounded-xl transition-all hover:scale-110 flex items-center justify-center overflow-hidden group"
                  style={{ backgroundColor: `hsl(${color.h} ${color.s} ${color.l})` }}
                  title={color.name}
                >
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {accentColor.name === color.name && (
                    <Check size={16} className="text-white z-10" />
                  )}
                </button>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
                    <span>Theme</span>
                    <span className="text-primary">{accentColor.name}</span>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for closing when clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[140]" 
          onClick={() => setIsOpen(false)} 
        />
      )}
    </div>
  );
};
