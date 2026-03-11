import { motion } from "framer-motion";
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
  {
    type: "work",
    title: "Freelance Developer / Open Source Contributor",
    org: "Global Tech Community",
    period: "2023 - Present",
    desc: "Collaborating with clients and contributing to open-source projects, focusing on building performant UI/UX and scalable backend solutions.",
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="section-padding bg-card/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3">Journey</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-12">
            My <span className="text-gradient-gold">Experience</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border md:left-1/2" />

          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative mb-10 md:w-1/2 pl-16 md:pl-0 ${
                i % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
              }`}
            >
              <div className="absolute left-4 md:left-auto md:right-auto top-1 w-5 h-5 rounded-full border-2 border-primary bg-background z-10"
                style={i % 2 === 0 ? { right: "-10px", left: "auto" } : { left: "-10px" }}
              />

              <div className="glass rounded-xl p-5 hover-lift">
                <div className={`flex items-center gap-2 mb-2 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                  {exp.type === "work" ? (
                    <Briefcase size={16} className="text-primary" />
                  ) : exp.type === "achievement" ? (
                    <Award size={16} className="text-primary" />
                  ) : (
                    <GraduationCap size={16} className="text-primary" />
                  )}
                  <span className="text-xs text-primary font-medium">{exp.period}</span>
                </div>
                <h3 className="font-display font-semibold text-lg">{exp.title}</h3>
                <p className="text-sm text-primary/80 mb-2">{exp.org}</p>
                <p className="text-sm text-muted-foreground">{exp.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
