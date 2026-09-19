"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";

export default function ScrollToTopOnLoad() {
  const lenis = useLenis();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    lenis?.scrollTo(0, { immediate: true });
  }, [lenis]);

  return null;
}