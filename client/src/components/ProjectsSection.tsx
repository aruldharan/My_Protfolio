import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Star } from "lucide-react";

const categories = ["All", "Full-Stack", "Frontend", "Backend"];

const projects = [
  {
    title: "E-ShopX",
    desc: "A modern MERN stack e-commerce platform with real-time analytics, secure payments, and an premium shopping experience.",
    tags: ["React", "Node.js", "MongoDB", "Redux", "Stripe"],
    category: "Full-Stack",
    stars: 128,
    image: "/E_ShopX.png",
    demo: "https://e-shopx.onrender.com/",
    github: "https://github.com/aruldharan/E-ShopX",
  },
  {
    title: "React_PageBuilderX",
    desc: "An advanced high-performance visual page builder for React. Drag, drop, and customize components with real-time preview.",
    tags: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    category: "Frontend",
    stars: 234,
    image: "/React_PageBuilderX.png",
    demo: "https://react-page-builder-x.vercel.app/",
    github: "https://github.com/aruldharan/React_PageBuilderX",
  },
  {
    title: "Task Flow",
    desc: "A powerful task management application built with the MERN stack for efficient workflow organization and real-time tracking.",
    tags: ["React", "Express", "Node.js", "MongoDB", "Redux"],
    category: "Full-Stack",
    stars: 145,
    image: "/TaskFlow.png",
    demo: "https://taskflow-frontend-k1o1.onrender.com/",
    github: "https://github.com/aruldharan/Task_Flow",
  },
  {
    title: "AI Chat Interface",
    desc: "Beautiful conversational AI interface with streaming responses, code highlighting, and chat history.",
    tags: ["React", "Tailwind", "OpenAI", "Framer Motion"],
    category: "Frontend",
    stars: 112,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    demo: "#",
    github: "#",
  },
  {
    title: "REST API Boilerplate",
    desc: "Production-ready API starter with auth, rate limiting, logging, testing, and Docker deployment.",
    tags: ["Express", "TypeScript", "JWT", "Docker"],
    category: "Backend",
    stars: 312,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
    demo: "#",
    github: "#",
  },
  {
    title: "Social Media API",
    desc: "Scalable social platform backend with GraphQL, real-time messaging, and media upload pipeline.",
    tags: ["Node.js", "GraphQL", "Redis", "AWS S3"],
    category: "Backend",
    stars: 156,
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&h=400&fit=crop",
    demo: "#",
    github: "#",
  },
];

const ProjectsSection = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-3">Portfolio</p>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold mb-8 tracking-tight">
            Featured <span className="text-gradient-gold">Projects</span>
          </h2>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-8 py-3 rounded-2xl text-sm font-bold tracking-wide transition-all duration-500 border overflow-hidden relative group ${
                active === cat
                  ? "bg-primary text-primary-foreground border-primary gold-glow"
                  : "glass text-muted-foreground border-white/5 hover:border-primary/20 hover:text-foreground"
              }`}
            >
              <div className="relative z-10">{cat}</div>
              {active === cat && (
                <motion.div 
                  layoutId="filter-active"
                  className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"
                />
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "circOut" }}
                  className="glass rounded-[32px] overflow-hidden group border-white/5 flex flex-col h-full relative"
                >
                  <div className="relative overflow-hidden aspect-video bg-white/5">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-6">
                      <motion.a 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-4 rounded-2xl bg-primary text-primary-foreground gold-glow shadow-xl shadow-primary/20"
                      >
                        <ExternalLink size={22} />
                      </motion.a>
                      <motion.a 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-4 rounded-2xl glass border-white/20 text-white"
                      >
                        <Github size={22} />
                      </motion.a>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-display font-bold text-2xl group-hover:text-primary transition-colors">{project.title}</h3>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl glass border-white/5 text-primary text-xs font-bold gold-glow">
                        <Star size={14} fill="currentColor" />
                        <span>{project.stars}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-8 line-clamp-2 leading-relaxed text-[15px] font-medium">{project.desc}</p>
                    <div className="flex flex-wrap gap-2.5 mt-auto pt-6 border-t border-white/5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-4 py-1.5 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest hover:border-primary/20 hover:text-primary transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
