import { motion } from "framer-motion";
import { Award, ExternalLink, Calendar, CheckCircle2 } from "lucide-react";

const certifications = [
  {
    title: "MERN Stack Specialist",
    issuer: "Udemy / Guvi / Professional Certification",
    date: "Dec 2023",
    description: "In-depth specialization in MongoDB, Express, React, and Node.js. Mastered building scalable full-stack applications.",
    skills: ["MongoDB", "Express", "React", "Node.js"],
    icon: Award,
    link: "https://github.com/aruldharan",
  },
  {
    title: "Mastering React & Redux",
    issuer: "Coursera / Meta / Professional Courses",
    date: "Feb 2024",
    description: "Advanced concepts in React, state management with Redux Toolkit, and performance optimization.",
    skills: ["React", "Redux Toolkit", "RTK Query"],
    icon: Award,
    link: "https://react-page-builder-x.vercel.app/",
  },
  {
    title: "Python for Data Science & Backend",
    issuer: "Google / Sololearn / Professional Training",
    date: "Jan 2024",
    description: "Comprehensive training in Python programming, focusing on automation, data processing, and backend development.",
    skills: ["Python", "Automation", "Backend"],
    icon: Award,
    link: "https://github.com/aruldharan",
  },
];

const CertificationSection = () => {
  return (
    <section id="certifications" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3">Professional Growth</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-gradient-gold">Certifications</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            A selection of professional certifications and courses I've completed to sharpen my technical skills.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="glass rounded-2xl p-6 flex flex-col h-full hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <cert.icon className="text-primary" size={24} />
                </div>
                <a
                  href={cert.link}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={18} />
                </a>
              </div>

              <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
                <Calendar size={12} />
                {cert.date}
              </div>

              <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {cert.title}
              </h3>
              
              <p className="text-primary/80 text-sm font-medium mb-3">{cert.issuer}</p>
              
              <p className="text-muted-foreground text-sm mb-5 flex-grow">
                {cert.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                {cert.skills.map((skill) => (
                  <div key={skill} className="flex items-center gap-1 text-[10px] bg-secondary px-2 py-1 rounded-md text-secondary-foreground font-medium">
                    <CheckCircle2 size={10} className="text-primary" />
                    {skill}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationSection;
