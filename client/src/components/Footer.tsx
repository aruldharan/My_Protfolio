import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative py-12 px-6 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="font-display text-2xl font-black tracking-tighter">
            <span className="text-gradient-gold">AD</span>
          </div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.4em] flex items-center gap-2">
            Built with <Heart size={12} className="text-primary animate-pulse" /> by Arul Dharan S
          </p>
        </div>

        <div className="flex items-center gap-6">
          {[
            { Icon: Github, href: "https://github.com/aruldharan" },
            { Icon: Linkedin, href: "https://linkedin.com/in/aruldharan" },
            { Icon: Mail, href: "mailto:aruldharan94@gmail.com" }
          ].map(({ Icon, href }, i) => (
            <motion.a 
              key={i} 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer" 
              whileHover={{ y: -5, scale: 1.1 }}
              className="w-12 h-12 rounded-xl glass border-white/5 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300 gold-glow"
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </div>

        <div className="text-right flex flex-col items-center md:items-end gap-2">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            © {new Date().getFullYear()} All Rights Reserved
          </p>
          <div className="flex items-center gap-4 text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
            <span>Pixel Perfect</span>
            <span className="w-1 h-1 rounded-full bg-primary/20" />
            <span>Premium UI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
