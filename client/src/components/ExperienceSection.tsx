import { motion, Variants } from "framer-motion";
import { Briefcase, GraduationCap, Award } from "lucide-react";

const experiences = [
    {
    type: "education",
    title: "Higher Secondary",
    org: "Cathedral Hr.Sec.School",
    period: "2020 - 2022",
    desc: "Architected and deployed complex applications like E-ShopX (MERN stack) and PageBuilderX, implementing microservices, payment gateways, and real-time state management.",
  },
  {
    type: "education",
    title: "Bachelor Computer Science",
    org: "MS University (St.John's College)",
    period: "2022 - 2025",
    desc: "Specilized in Software Engineering, Web Technologies, and Data Structures. Currently maintaining a strong academic record with a focus on modern web development.",
  },
  {
    type: "achievement",
    title: "Node Js Developer Intern",
    org: "Portfolio Excellence",
    period: "2025 Jul - 2026 Jan",
    desc: "Successfully built and deployed multiple production-ready applications, mastering React, Node.js, MongoDB, and Redux with advanced TypeScript patterns.",
  },
  // {
  //   type: "work",
  //   title: "Freelance Developer / Open Source Contributor",
  //   org: "Global Tech Community",
  //   period: "2023 - Present",
  //   desc: "Collaborating with clients and contributing to open-source projects, focusing on building performant UI/UX and scalable backend solutions.",
  // },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};


const ExperienceSection = () => {
  return (
    <section id="experience" className="section-padding bg-card/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-3">Professional Path</p>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold mb-16 tracking-tight text-center">
            My <span className="text-gradient-gold">Experience</span>
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative will-change-transform"
        >
          {/* Vertical line with gradient */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/50 via-primary/20 to-transparent md:-translate-x-1/2" />

          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
              }}
              className={`relative mb-16 md:w-1/2 pl-16 md:pl-0 ${
                i % 2 === 0 ? "md:pr-20 md:text-right ml-0 mr-auto" : "md:ml-auto md:pl-20"
              }`}
            >
              {/* Timeline Marker */}
              <div className={`absolute left-4 md:left-auto top-10 w-4 h-4 rounded-full border-[3px] border-primary bg-background z-20 gold-glow ${
                i % 2 === 0 ? "md:-right-2" : "md:-left-2"
              }`} />

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="glass rounded-[32px] p-8 border-white/5 relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className={`flex items-center gap-3 mb-4 relative z-10 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                    {exp.type === "work" ? (
                      <Briefcase size={20} />
                    ) : exp.type === "achievement" ? (
                      <Award size={20} />
                    ) : (
                      <GraduationCap size={20} />
                    )}
                  </div>
                  <span className="text-primary font-bold uppercase tracking-[0.2em]">{exp.period}</span>
                </div>
                
                <h3 className="font-display font-bold text-2xl mb-2 relative z-10 group-hover:text-primary transition-colors">{exp.title}</h3>
                <p className="text-primary/70 text-sm font-bold uppercase tracking-widest mb-4 relative z-10">{exp.org}</p>
                <p className="text-muted-foreground leading-relaxed text-[15px] font-medium relative z-10">{exp.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
