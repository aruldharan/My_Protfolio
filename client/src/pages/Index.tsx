import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import CertificationSection from "../components/CertificationSection";
import ContactSection from "../components/ContactSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import MeshBackground from "@/components/MeshBackground";
import AIChatBot from "@/components/AIChatBot";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <MeshBackground />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <CertificationSection />
      <ContactSection />
      <Footer />
      <ScrollToTop />
      <AIChatBot />
    </div>
  );
};

export default Index;
