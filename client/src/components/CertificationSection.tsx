import { motion, Variants } from "framer-motion";
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
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

const CertificationSection = () => {
  return (
    <section id="certifications" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-3">Academic Excellence</p>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            My <span className="text-gradient-gold">Certifications</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg font-medium leading-relaxed">
            I continuously invest in learning to stay at the forefront of modern web technologies and best practices.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 will-change-transform"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.title}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="glass rounded-[32px] p-8 flex flex-col h-full border-white/5 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center gold-glow group-hover:scale-110 transition-transform duration-500">
                    <cert.icon className="text-primary" size={28} />
                  </div>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href={cert.link}
                    className="p-3 rounded-xl glass border-white/10 text-muted-foreground hover:text-primary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={20} />
                  </motion.a>
                </div>

                <div className="flex items-center gap-2 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
                  <Calendar size={14} />
                  {cert.date}
                </div>

                <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                  {cert.title}
                </h3>
                
                <p className="text-primary/70 text-sm font-bold mb-4 uppercase tracking-widest">{cert.issuer}</p>
                
                <p className="text-muted-foreground text-[15px] mb-8 flex-grow leading-relaxed font-medium">
                  {cert.description}
                </p>

                <div className="flex flex-wrap gap-2.5 pt-6 border-t border-white/5">
                  {cert.skills.map((skill) => (
                    <div key={skill} className="flex items-center gap-2 text-[10px] bg-white/5 border border-white/5 px-3 py-1.5 rounded-xl text-muted-foreground font-bold uppercase tracking-widest hover:border-primary/20 hover:text-primary transition-colors cursor-default">
                      <CheckCircle2 size={12} className="text-primary" />
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationSection;
