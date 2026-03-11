import { motion } from "framer-motion";
import { Code2, Palette, Server, Zap, BookOpen, Rocket } from "lucide-react";

const highlights = [
  { icon: Code2, label: "Clean Code", desc: "Writing maintainable, readable code" },
  { icon: Palette, label: "UI/UX Design", desc: "Pixel-perfect, user-centered design" },
  { icon: Server, label: "Full-Stack", desc: "End-to-end application development" },
  { icon: Zap, label: "Fast Learner", desc: "Quickly adapting to new technologies" },
  { icon: BookOpen, label: "Self-Taught", desc: "Continuous learning from docs & courses" },
  { icon: Rocket, label: "Passionate", desc: "Driven to build impactful products" },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3">About Me</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-8">
            Turning Ideas Into <span className="text-gradient-gold">Reality</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
          >
            <p className="text-muted-foreground leading-relaxed text-lg">
              A dedicated and highly motivated Full-Stack Developer with expertise in the MERN stack 
              and TypeScript. Passionate about building scalable web applications with clean, 
              efficient code and intuitive user interfaces.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Recently graduated and eager to apply my technical skills in a professional environment. 
              Committed to continuous learning and staying updated with the latest industry trends 
              to deliver high-quality, impactful software solutions.
            </p>
            <div className="flex gap-8 pt-4">
              {[
                { num: "10+", label: "Projects Built" },
                { num: "2025", label: "Graduate" },
                { num: "∞", label: "Curiosity" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-display font-bold text-gradient-gold">{stat.num}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {highlights.map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                className="glass rounded-2xl p-6 hover-lift group border-primary/5 hover:border-primary/20 bg-primary/5 active:scale-[0.98]"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                  <Icon size={24} className="text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2 group-hover:text-primary transition-colors">{label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
