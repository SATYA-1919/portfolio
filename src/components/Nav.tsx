"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FileText } from "lucide-react";
import { profile } from "@/lib/data";

export function Nav() {
  const [hidden, setHidden] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 260);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.div className="progress" style={{ scaleX }} />
      <header
        className="nav"
        style={{ transform: hidden ? "translateY(-160%)" : "translateY(0)" }}
      >
        <a href="#top" className="brand" aria-label={`${profile.name} — home`}>
          {profile.name.split(" ")[0]}
          <span className="dot">.</span>
        </a>
        <div className="navRight">
          <nav className="navPill" aria-label="Primary">
            <a href="#work">Work</a>
            <a href="#extracurricular">Life</a>
            <a href="#contact">Contact</a>
          </nav>
          <a
            className="navResume"
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
          >
            <FileText size={13} strokeWidth={1.8} /> Résumé
          </a>
        </div>
      </header>
    </>
  );
}
