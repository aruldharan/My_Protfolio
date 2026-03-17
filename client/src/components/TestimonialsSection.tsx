import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState, useEffect } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Senior Tech Lead",
    content: "An exceptional developer who combines technical mastery with an incredible eye for detail. The user experience delivered was beyond expectation.",
    avatar: "https://i.pravatar.cc/150?u=alex",
  },
  {
    name: "Sarah Chen",
    role: "Product Manager",
    content: "Working with them was a seamless experience. They understood the complex requirements immediately and provided elegant solutions.",
    avatar: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    name: "James Wilson",
    role: "CEO, InnovateDaily",
    content: "The most professional integration of AI and modern web technologies I've seen in a portfolio project. Highly recommended.",
    avatar: "https://i.pravatar.cc/150?u=james",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

const TestimonialsSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section-padding bg-card/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] -z-10" />
      
      <div className="max-w-4xl mx-auto relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Quote className="text-primary/40 mx-auto mb-6" size={48} />
          <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-4">
            Kind Words From <span className="text-gradient-gold">Collaborators</span>
          </h2>
        </motion.div>

        <div className="relative min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="glass p-8 md:p-12 rounded-[40px] border-white/5 relative text-center max-w-2xl"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <div className="w-16 h-16 rounded-full border-4 border-background overflow-hidden gold-glow">
                  <img src={testimonials[index].avatar} alt={testimonials[index].name} className="w-full h-full object-cover" />
                </div>
              </div>
              
              <p className="text-lg md:text-xl text-foreground font-medium italic mb-8 leading-relaxed">
                "{testimonials[index].content}"
              </p>
              
              <div className="space-y-1">
                <h4 className="font-display font-bold text-xl text-primary">{testimonials[index].name}</h4>
                <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest">{testimonials[index].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === index ? "bg-primary w-8 gold-glow" : "bg-white/10 hover:bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
