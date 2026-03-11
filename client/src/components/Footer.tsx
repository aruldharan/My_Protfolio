import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground flex items-center gap-1">
          Built with <Heart size={14} className="text-primary" /> by Arul Dharan S © {new Date().getFullYear()}
        </p>
        <div className="flex items-center gap-4">
          {[
            { Icon: Github, href: "https://github.com/aruldharan" },
            { Icon: Linkedin, href: "https://linkedin.com/in/aruldharan" },
            { Icon: Mail, href: "mailto:aruldharan94@gmail.com" }
          ].map(({ Icon, href }, i) => (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
