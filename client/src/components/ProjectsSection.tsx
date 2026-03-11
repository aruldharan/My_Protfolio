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
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    demo: "https://e-shopx.onrender.com/",
    github: "https://github.com/aruldharan/E-ShopX",
  },
  {
    title: "React_PageBuilderX",
    desc: "An advanced high-performance visual page builder for React. Drag, drop, and customize components with real-time preview.",
    tags: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    category: "Frontend",
    stars: 234,
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=600&fit=crop",
    demo: "https://react-page-builder-x.vercel.app/",
    github: "https://github.com/aruldharan/React_PageBuilderX",
  },
  {
    title: "Task Management Suite",
    desc: "Kanban-style project management tool with real-time collaboration, drag & drop, and team analytics.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "WebSocket"],
    category: "Full-Stack",
    stars: 89,
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
    demo: "#",
    github: "#",
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
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3">Portfolio</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-8">
            Featured <span className="text-gradient-gold">Projects</span>
          </h2>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                active === cat
                  ? "bg-primary text-primary-foreground"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
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
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="glass rounded-xl overflow-hidden group hover-lift"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-primary text-primary-foreground hover:opacity-80 transition-opacity"
                    >
                      <ExternalLink size={18} />
                    </a>
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-secondary text-foreground hover:opacity-80 transition-opacity"
                    >
                      <Github size={18} />
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display font-bold text-xl group-hover:text-primary transition-colors">{project.title}</h3>
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-primary/10 text-primary">
                      <Star size={12} fill="currentColor" />
                      <span className="text-xs font-bold">{project.stars}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-2 leading-relaxed">{project.desc}</p>
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-lg bg-secondary/50 text-[10px] font-bold text-secondary-foreground uppercase tracking-tight">
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
