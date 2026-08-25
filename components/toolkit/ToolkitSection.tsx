"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillGroups } from "@/lib/data";
import StackCard from "./StackCard";
import SectionHeading from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

export default function ToolkitSection() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".stack-card", wrapRef.current);

    const triggers = cards.slice(0, -1).map((card, i) => {
      const nextCard = cards[i + 1];
      return ScrollTrigger.create({
        trigger: nextCard,
        start: "top bottom",
        end: "top top",
        scrub: true,
        onUpdate: (self) => {
          gsap.set(card, {
            scale: 1 - self.progress * 0.06,
            filter: `brightness(${1 - self.progress * 0.45})`,
            transformOrigin: "center top",
          });
        },
      });
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="toolkit">
      <SectionHeading
        eyebrow="Skills In Practice"
        title={
          <>
          MY ENGINEERING STACK
          </>
        }
        description="A practical engineering stack across AI, frontend, backend, databases, and deployment — focused on building production-ready products."
      />

      <div ref={wrapRef} className="relative">
        {skillGroups.map((group) => (
          <StackCard key={group.number} group={group} />
        ))}
      </div>
    </section>
  );
}