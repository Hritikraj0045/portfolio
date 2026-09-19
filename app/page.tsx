import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/hero/Hero";
import ProjectsSection from "@/components/projects/ProjectsSection";
import ToolkitSection from "@/components/toolkit/ToolkitSection";
import GithubSection from "@/components/github/GithubSection";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <ProjectsSection />
        <ToolkitSection />
        <GithubSection />
      </main>
      <Footer />
    </>
  );
}