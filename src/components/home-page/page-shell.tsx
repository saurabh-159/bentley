"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, useReducedMotion } from "motion/react";
import { PageLoader } from "./page-loader";

const HOLD_MS = 2600;
const EXIT_MS = 550;

export function PageShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const skipIntro = pathname !== "/";
  const [showLoader, setShowLoader] = useState(!skipIntro);
  const [showPage, setShowPage] = useState(skipIntro);

  useEffect(() => {
    if (reduceMotion || skipIntro) {
      setShowLoader(false);
      setShowPage(true);
      return;
    }

    const hideLoader = window.setTimeout(() => {
      setShowLoader(false);
    }, HOLD_MS);

    const revealPage = window.setTimeout(() => {
      setShowPage(true);
    }, HOLD_MS + EXIT_MS);

    return () => {
      window.clearTimeout(hideLoader);
      window.clearTimeout(revealPage);
    };
  }, [reduceMotion, skipIntro]);

  useEffect(() => {
    if (showPage) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previous;
    };
  }, [showPage]);

  return (
    <>
      <AnimatePresence onExitComplete={() => setShowPage(true)}>
        {showLoader ? <PageLoader key="page-loader" /> : null}
      </AnimatePresence>
      {showPage ? children : (
        <div className="min-h-svh bg-[#0c0c0c]" aria-hidden />
      )}
    </>
  );
}
