import { navLinks, socials } from "@/lib/data";

export default function Footer() {
  return (
    <footer id="contact" className="px-10 pt-16">
      <div className="flex flex-wrap items-center justify-between gap-6 pb-8">
        <ul className="flex flex-wrap items-center gap-8 font-mono text-sm text-ink-dim">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-ink transition-colors">
                {link.label}
              </a>
            </li>
          ))}
          <li className="w-px h-4 bg-line" />
          {socials.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" className="hover:text-ink transition-colors">
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-6 font-mono text-sm">
          <div className="text-right">
            <div className="font-bold text-ink">MAHARASHTRA</div>
            <div className="text-ink-dim text-xs">INDIA</div>
          </div>
          <span className="text-ink-dim">EN</span>
        </div>
      </div>

      <div className="border-t border-line" />

      <h2 className="font-display uppercase text-[clamp(44px,10vw,140px)] leading-[0.9] py-6">
        Hritik Raj Arya
      </h2>

      <div className="border-t border-line" />

      <div className="flex justify-between items-center py-6 flex-wrap gap-4 font-mono text-xs text-ink-dim">
        <span>Hritik Raj Arya © {new Date().getFullYear()}. All rights reserved.</span>
        <span>Designed &amp; Developed by Hritik Raj Arya</span>
      </div>
    </footer>
  );
}