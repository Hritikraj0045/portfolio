"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";
import { useMenu } from "@/components/ui/MenuContext";

export default function LenisMenuSync() {
  const { open } = useMenu();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    if (open) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [open, lenis]);

  return null;
}