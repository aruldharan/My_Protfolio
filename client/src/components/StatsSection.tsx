import { motion, useInView, Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Download, Users, Briefcase, Award } from "lucide-react";

interface CounterProps {
  from: number;
  to: number;
  duration?: number;
}

const Counter = ({ from, to, duration = 2 }: CounterProps) => {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * (to - from) + from));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count}</span>;
};

const stats = [
  { label: "Projects Completed", value: 50, icon: Briefcase, suffix: "+" },
  { label: "Happy Clients", value: 30, icon: Users, suffix: "+" },
  { label: "Certifications", value: 12, icon: Award, suffix: "" },
  { label: "Coffee Cups", value: 999, icon: Download, suffix: "+" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", damping: 15, stiffness: 100 }
  },
};

const StatsSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/2 blur-[120px] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="glass p-6 sm:p-8 rounded-[32px] border-white/5 flex flex-col items-center text-center group transition-all duration-500 hover:border-primary/20"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 sm:mb-6 gold-glow transition-transform duration-500 group-hover:scale-110">
                <stat.icon size={28} className="sm:size-[32px]" />
              </div>
              <div className="text-3xl sm:text-5xl font-display font-black text-gradient-gold mb-2">
                <Counter from={0} to={stat.value} />
                {stat.suffix}
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm font-bold uppercase tracking-[0.1em]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
