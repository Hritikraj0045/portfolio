import Footer from "@/components/layout/Footer";
import PageNavigation from "@/components/layout/PageNavigation";
import ProjectsSection from "@/components/projects/ProjectsSection";

export default function WorkPage() {
  return (
    <>
      <PageNavigation />

      <main className="min-h-screen bg-bg">
        <ProjectsSection />
      </main>

      <Footer />
    </>
  );
}