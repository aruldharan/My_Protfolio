import { motion } from "framer-motion";
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
    skills: ["Node.js", "NestJS", "Express", "Python", "REST APIs", "GraphQL", "MongoDB", "PostgreSQL"],
    color: "from-primary/15 to-primary/5",
  },
  {
    title: "Tools & DevOps",
    icon: Terminal,
    skills: ["Git", "GitHub", "Docker", "VS Code", "Postman", "Vercel", "CI/CD"],
    color: "from-primary/20 to-primary/5",
  },
  {
    title: "Learning",
    icon: Cpu,
    skills: ["AWS", "System Design", "Redis", "Prisma", "Jest", "Microservices"],
    color: "from-primary/15 to-primary/5",
  },
];

const techIcons = [
  { name: "HTML5", color: "#E34F26", icon: "https://cdn.simpleicons.org/html5" },
  { name: "CSS3", color: "#1572B6", icon: "https://cdn.simpleicons.org/css3" },
  { name: "Material UI", color: "#0081CB", icon: "https://cdn.simpleicons.org/mui" },
  { name: "Tailwind CSS", color: "#06B6D4", icon: "https://cdn.simpleicons.org/tailwindcss" },
  { name: "JavaScript", color: "#F7DF1E", icon: "https://cdn.simpleicons.org/javascript" },
  { name: "React", color: "#61DAFB", icon: "https://cdn.simpleicons.org/react" },
  { name: "TypeScript", color: "#3178C6", icon: "https://cdn.simpleicons.org/typescript" },
  { name: "Vue.js", color: "#4FC08D", icon: "https://cdn.simpleicons.org/vuedotjs" },
  { name: "Redux", color: "#764ABC", icon: "https://cdn.simpleicons.org/redux" },
  { name: "Node.js", color: "#339933", icon: "https://cdn.simpleicons.org/nodedotjs" },
  { name: "Express", color: "#000000", icon: "https://cdn.simpleicons.org/express" },
  { name: "MongoDB", color: "#47A248", icon: "https://cdn.simpleicons.org/mongodb" },
  { name: "Python", color: "#3776AB", icon: "https://cdn.simpleicons.org/python" },
  { name: "Figma", color: "#F24E1E", icon: "https://cdn.simpleicons.org/figma" },
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
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3">Skills</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-gradient-gold">Tech Stack</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-12">
            Technologies I've been working with and continuously learning as a fresher developer.
          </p>
        </motion.div>

        {/* Skill Category Cards */}
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 hover-lift group"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg bg-secondary text-sm font-medium text-secondary-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech grid with reference-inspired design */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-display text-xl font-semibold mb-10 text-center">Core Technologies</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {techIcons.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow: `0 20px 25px -5px ${tech.color}20`
                }}
                className="flex flex-col items-center justify-center gap-3 glass bg-white/50 dark:bg-white/5 rounded-2xl p-5 cursor-default transition-all duration-300 border border-transparent group"
              >
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <motion.img
                    src={tech.icon}
                    alt={tech.name}
                    className="w-7 h-7 object-contain transition-all duration-300 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100"
                    whileHover={{ scale: 1.1 }}
                  />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors text-center">
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
