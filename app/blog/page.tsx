import Footer from "@/components/layout/Footer";
import PageNavigation from "@/components/layout/PageNavigation";
import BlogHero from "@/components/blog/BlogHero";
import BlogStatement from "@/components/blog/BlogStatement";
import BlogList from "@/components/blog/BlogList";
import BlogCTA from "@/components/blog/BlogCTA";

export default function BlogPage() {
  return (
    <>
      <PageNavigation />
      <main className="min-h-screen bg-bg">
        <BlogHero />
        <BlogStatement />
        <BlogList />
        <BlogCTA />
      </main>
      <Footer />
    </>
  );
}