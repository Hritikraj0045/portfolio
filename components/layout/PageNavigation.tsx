import Navbar from "@/components/layout/Navbar";
import Marquee from "@/components/hero/Marquee";

export default function PageNavigation() {
  return (
    <>
      <Navbar />

      {/* Reserve the navbar's fixed height */}
      <div className="relative z-40 pt-[70px]">
        <Marquee showTicker={false} />
      </div>
    </>
  );
}