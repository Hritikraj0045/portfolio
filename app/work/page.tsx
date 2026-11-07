import Footer from "@/components/layout/Footer";
import PageNavigation from "@/components/layout/PageNavigation";
import WorkHero from "@/components/work/WorkHero";
import WorkProjectDetail from "@/components/work/WorkProjectDetail";
import WorkCTA from "@/components/work/WorkCTA";
import EverythingBuilt from "@/components/work/EverythingBuilt";
import { projects } from "@/lib/data";

export default function WorkPage() {
  const remaining = projects.slice(1);

  return (
    <>
      <PageNavigation />
      <main className="min-h-screen bg-bg">
        <WorkHero />
        {remaining.map((project, i) => (
          <WorkProjectDetail key={project.id} project={project} nextId={remaining[i + 1]?.id} />
        ))}
        <EverythingBuilt />
        <WorkCTA />
        
      </main>
      <Footer />
    </>
  );
}