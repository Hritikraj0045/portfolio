import Footer from "@/components/layout/Footer";
import PageNavigation from "@/components/layout/PageNavigation";
import ChatInterface from "@/components/ask/ChatInterface";

export default function AskPage() {
  return (
    <>
      <PageNavigation />
      <main className="min-h-screen bg-bg">
        <div className="px-6 md:px-10 py-7 border-b border-line flex justify-between">
          <span className="font-mono text-xs tracking-[0.2em] text-ink-dim">01 / ASK</span>
          <span className="font-mono text-xs text-ink-dim">POWERED BY ARYA</span>
        </div>

        <div className="px-6 md:px-10 py-10 md:py-14">
          <h1 className="font-display uppercase text-[clamp(36px,6vw,90px)] leading-[0.95] max-w-3xl">
            Ask About My Work.
          </h1>
        </div>

        <div className="px-6 md:px-10 pb-20">
          <ChatInterface />
        </div>
      </main>
      <Footer />
    </>
  );
}