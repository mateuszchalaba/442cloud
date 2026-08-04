"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const PenaltyGame = dynamic(() => import("./PenaltyGame"), {
  ssr: false,
  loading: () => <Placeholder label="Warming up…" />,
});

function Placeholder({ label }: { label: string }) {
  return (
    <div className="mx-auto flex aspect-[36/47] w-full max-w-[420px] items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-b from-[#0b3a23] to-[#07271a]">
      <span className="font-display text-sm uppercase tracking-[0.25em] text-white/60">
        {label}
      </span>
    </div>
  );
}

/** Defers loading the canvas game until the user scrolls near it. */
export default function GameLauncher() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>{show ? <PenaltyGame /> : <Placeholder label="Tap to warm up…" />}</div>
  );
}
