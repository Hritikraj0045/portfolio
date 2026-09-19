import Footer from "@/components/layout/Footer";
import PageNavigation from "@/components/layout/PageNavigation";
import ConnectHero from "@/components/connect/ConnectHero";
import ConnectProcess from "@/components/connect/ConnectProcess";
import ConnectForm from "@/components/connect/ConnectForm";
import ConnectDetails from "@/components/connect/ConnectDetails";
import ConnectCollaborate from "@/components/connect/ConnectCollaborate";

export default function ConnectPage() {
  return (
    <>
      <PageNavigation />

      <main className="bg-bg text-ink overflow-hidden">
        <ConnectHero />
        <ConnectProcess />
        <ConnectForm />
        <ConnectDetails />
        <ConnectCollaborate />
      </main>

      <Footer />
    </>
  );
}
