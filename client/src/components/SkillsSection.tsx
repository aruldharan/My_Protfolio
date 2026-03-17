import { motion, Variants } from "framer-motion";
import {
  Code2, Globe, Server, Database, Layout, GitBranch,
  Smartphone, Palette, Terminal, Cloud, Layers, Cpu,
  RefreshCw, Package, Boxes, Binary, Zap, FileCode2,
} from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    icon: Layout,
    skills: ["React", "Next.js", "TypeScript", "Redux", "Tailwind CSS", "Framer Motion", "JavaScript", "HTML/CSS"],
    color: "from-primary/20 to-primary/5",
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Node.js", "NestJS", "Express", "Python", "REST APIs", "Fast API", "MongoDB", "PostgreSQL"],
    color: "from-primary/15 to-primary/5",
  },
  {
    title: "Tools & DevOps",
    icon: Terminal,
    skills: ["Git", "GitHub", "VS Code", "Postman", "Vercel", "Render"],
    color: "from-primary/20 to-primary/5",
  },
  {
    title: "Learning",
    icon: Cpu,
    skills: ["AWS", "System Design", "Redis", "Prisma", "Jest", "Microservices"],
    color: "from-primary/15 to-primary/5",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  },
};


const techIcons = [
  { name: "HTML5", slug: "html5", color: "E34F26" },
  { name: "CSS3", slug: "css3", color: "1572B6", icon: "/CSS.png" },
  // { name: "Material UI", slug: "mui", color: "0081CB" },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" },
  { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
  { name: "React", slug: "react", color: "61DAFB" },
  { name: "TypeScript", slug: "typescript", color: "3178C6" },
  // { name: "Vue.js", slug: "vuedotjs", color: "4FC08D" },
  { name: "Redux", slug: "redux", color: "764ABC" },
  { name: "Node.js", slug: "nodedotjs", color: "339933" },
  { name: "Express", slug: "express", color: "000000", invertInDark: true },
  { name: "MongoDB", slug: "mongodb", color: "47A248" },
  { name: "Python", slug: "python", color: "3776AB" },
  { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
  { name: "SQL", slug: "mysql", color: "4479A1" },
  { name: "Git", slug: "git", color: "F05032" },
  { name: "GitHub", slug: "github", color: "000000", invertInDark: true },
  { name: "Postman", slug: "postman", color: "FF6C37" },
  // { name: "Figma", slug: "figma", color: "F24E1E" },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding bg-card/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-3">Expertise</p>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            My <span className="text-gradient-gold">Tech Stack</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-12 text-lg font-medium leading-relaxed">
            I leverage a modern suite of technologies to build scalable, high-performance applications with exceptional user experiences.
          </p>
        </motion.div>

        {/* Skill Category Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid sm:grid-cols-2 gap-8 mb-20 will-change-transform"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="glass rounded-[32px] p-8 group border-white/5 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center gold-glow group-hover:scale-110 transition-transform duration-500`}>
                    <category.icon size={28} className="text-primary" />
                  </div>
                  <h3 className="font-display text-2xl font-bold">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-sm font-semibold text-muted-foreground hover:text-primary hover:border-primary/20 transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative will-change-transform"
        >
          <div className="absolute inset-0 bg-primary/5 blur-[100px] -z-10" />
          <h3 className="font-display text-2xl font-bold mb-12 text-center">Core Technologies</h3>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {techIcons.map((tech: any) => (
              <motion.div
                key={tech.name}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  y: -3,
                }}
                className="flex flex-col items-center justify-center gap-3 glass bg-white/[0.03] rounded-2xl p-3 sm:p-4 w-[90px] sm:w-[100px] cursor-default transition-all duration-500 border-white/5 hover:border-primary/20 group"
              >
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <img
                    src={tech.icon || `https://cdn.simpleicons.org/${tech.slug}/${tech.color.toLowerCase()}`}
                    alt={tech.name}
                    className={`w-6 h-6 object-contain transition-all duration-500 group-hover:scale-110 ${tech.invertInDark ? 'dark:invert' : ''}`}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (!target.dataset.fallbackCount) {
                        target.dataset.fallbackCount = "1";
                        if (tech.slug === "css3") {
                          target.src = "https://cdn.simpleicons.org/css3/1572B6"; // Explicit try
                        } else {
                          target.src = `https://cdn.simpleicons.org/${tech.slug}`;
                        }
                      } else if (target.dataset.fallbackCount === "1") {
                        target.dataset.fallbackCount = "2";
                        target.src = `https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/${tech.slug}.svg`;
                      } else if (target.dataset.fallbackCount === "2") {
                        target.dataset.fallbackCount = "3";
                        target.src = `https://img.icons8.com/color/48/${tech.slug}.png`;
                      }
                    }}
                  />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors text-center shrink-0 leading-tight">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
