import Footer from "@/components/layout/Footer";
import PageNavigation from "@/components/layout/PageNavigation";
import AboutHero from "@/components/about/AboutHero";
import AboutStatement from "@/components/about/AboutStatement";
import AboutCreate from "@/components/about/AboutCreate";
import AboutTechnology from "@/components/about/AboutTechnology";
import AboutProcess from "@/components/about/AboutProcess";
import AboutFAQ from "@/components/about/AboutFAQ";
import AboutCTA from "@/components/about/AboutCTA";

export default function AboutPage() {
  return (
    <>
      <PageNavigation />
      <main className="bg-bg text-ink">
        <AboutHero />
        <AboutStatement />
        <AboutCreate />
        <AboutTechnology />
        <AboutProcess />
        <AboutFAQ />
        <AboutCTA />
      </main>
      <Footer />
    </>
  );
}