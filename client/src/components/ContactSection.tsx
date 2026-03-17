import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { API_BASE_URL } from "@/lib/api-config";

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
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};


const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [file, setFile] = useState<File | null>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("message", form.message);
    if (file) {
      formData.append("attachment", file);
    }

    try {
      // 1. Save to local MongoDB via our backend
      await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        body: formData,
      });

      // 2. Send email via Formspree
      const response = await fetch("https://formspree.io/f/xovgrrql", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSent(true);
        setTimeout(() => setSent(false), 3000);
        setForm({ name: "", email: "", message: "" });
        setFile(null);
      } else {
        const errorData = await response.json();
        alert(errorData.errors?.[0]?.message || "Failed to send message via Formspree.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-3">Get in Touch</p>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Let's <span className="text-gradient-gold">Collaborate</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg font-medium leading-relaxed">
            Have an idea or a project? Drop me a message and let's turn it into a digital reality.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid lg:grid-cols-5 gap-16 items-start will-change-transform"
        >
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 space-y-12"
          >
            <div className="space-y-6">
              <h3 className="font-display text-3xl font-bold">Contact Information</h3>
              <p className="text-muted-foreground text-[16px] leading-relaxed font-medium">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: Mail, label: "aruldharan94@gmail.com", sub: "Send me an email" },
                { icon: Phone, label: "+91 8778243567", sub: "Call or WhatsApp" },
                { icon: MapPin, label: "Tamil Nadu, India", sub: "Available Worldwide" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-5 group">
                  <div className="w-16 h-16 rounded-[24px] glass border-white/5 flex items-center justify-center gold-glow group-hover:scale-110 transition-transform duration-500">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">{sub}</p>
                    <p className="text-foreground font-bold text-lg">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            variants={{
              hidden: { opacity: 0, x: 30 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
            }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 glass rounded-[40px] p-10 space-y-8 border-white/5 relative overflow-hidden gold-glow-strong"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            
            <div className="grid md:grid-cols-2 gap-8 relative z-10">
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-widest ml-4 text-muted-foreground">Full Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-6 py-4 rounded-[20px] bg-white/5 border border-white/5 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/40 focus:bg-white/10 transition-all font-medium text-[15px]"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-widest ml-4 text-muted-foreground">Email Address</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-6 py-4 rounded-[20px] bg-white/5 border border-white/5 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/40 focus:bg-white/10 transition-all font-medium text-[15px]"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div className="space-y-3 relative z-10">
              <label className="text-[10px] font-bold uppercase tracking-widest ml-4 text-muted-foreground">Your Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-6 py-4 rounded-[24px] bg-white/5 border border-white/5 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/40 focus:bg-white/10 transition-all font-medium text-[15px] resize-none"
                placeholder="Briefly describe your project or inquiry..."
              />
            </div>

            <div className="space-y-3 relative z-10">
              <label className="text-[10px] font-bold uppercase tracking-widest ml-4 text-muted-foreground">Attachment (Optional)</label>
              <div className="relative group">
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
                <div className="w-full px-6 py-4 rounded-[20px] bg-white/5 border border-white/5 text-muted-foreground text-sm flex items-center justify-between transition-all group-hover:bg-white/10 group-hover:border-primary/20">
                  <span className="truncate max-w-[200px] text-muted-foreground/60 font-medium italic">
                    {file ? file.name : "Choose a file..."}
                  </span>
                  <div className="px-5 py-2 rounded-xl bg-white/10 border border-white/5 text-[10px] font-black uppercase tracking-widest text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    Browse
                  </div>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-5 rounded-[24px] bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-primary/90 transition-all gold-glow disabled:opacity-50 relative z-10 shadow-2xl shadow-primary/20"
            >
              {loading ? "Transmitting..." : sent ? "Success! Message Received ✓" : <><Send size={18} /> Deploy Message</>}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
