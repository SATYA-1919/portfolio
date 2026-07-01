"use client";

import { useEffect, useRef, useState } from "react";
import type { Application } from "@splinetool/runtime";
import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail, MoveRight, FileText } from "lucide-react";
import { SplineScene } from "@/components/ui/splite";
import { FloatingPaths } from "@/components/ui/background-paths";
import { Magnetic } from "@/components/Magnetic";
import { profile } from "@/lib/data";
import { ROBOT_SCENE_URL } from "@/lib/robot";

function AnimatedWord({
  word,
  base,
  reduce,
}: {
  word: string;
  base: number;
  reduce: boolean | null;
}) {
  return (
    <span className="heroWord">
      {word.split("").map((letter, i) => (
        <motion.span
          key={i}
          className="heroLetter"
          initial={reduce ? { opacity: 0 } : { y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={
            reduce
              ? { duration: 0.3, delay: base }
              : { delay: base + i * 0.035, type: "spring", stiffness: 150, damping: 24 }
          }
        >
          {letter}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const visualRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<Application | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1025px)");
    let timer = 0;
    let hasLoaded = false;

    const loadRobot = () => {
      window.clearTimeout(timer);

      if (!media.matches) {
        setReady(false);
        setMounted(false);
        return;
      }

      if (hasLoaded) {
        setMounted(true);
        return;
      }

      // Start fetching the React wrapper chunk just after first paint so the
      // scene begins loading quickly without blocking the first text render.
      timer = window.setTimeout(() => {
        hasLoaded = true;
        void import("@splinetool/react-spline");
        setMounted(true);
      }, 80);
    };

    loadRobot();
    media.addEventListener("change", loadRobot);

    return () => {
      media.removeEventListener("change", loadRobot);
      window.clearTimeout(timer);
    };
  }, []);

  const revealRobot = (spline: Application) => {
    splineRef.current = spline;
    // Pull the camera back so the robot's arms/hands stay inside the frame when
    // it sways to the side (default framing clips the hands).
    const zoomOut = () => {
      try {
        spline.setZoom(0.5);
      } catch {
        /* older runtimes may not expose setZoom */
      }
    };
    zoomOut();
    window.requestAnimationFrame(() => {
      zoomOut();
      setReady(true);
    });
  };

  useEffect(() => {
    if (!mounted) return;
    const t = window.setTimeout(() => setReady(true), 2500);
    return () => window.clearTimeout(t);
  }, [mounted]);

  // Forward window pointer moves to the Spline <canvas> so the robot's head
  // tracks the cursor across the whole tab. Spline binds its listener to the
  // canvas (not the document) and reads pageX/pageY, so we re-dispatch there.
  useEffect(() => {
    if (!mounted || reduce) return;
    let raf = 0;
    let cx = 0, cy = 0, px = 0, py = 0;
    const flush = () => {
      raf = 0;
      const canvas = visualRef.current?.querySelector("canvas");
      if (!canvas) return;
      const ev = new PointerEvent("pointermove", {
        clientX: cx, clientY: cy, bubbles: false, cancelable: true,
        pointerType: "mouse", pointerId: 1,
      });
      Object.defineProperty(ev, "pageX", { value: px });
      Object.defineProperty(ev, "pageY", { value: py });
      canvas.dispatchEvent(ev);
    };
    const onMove = (e: PointerEvent) => {
      cx = e.clientX; cy = e.clientY; px = e.pageX; py = e.pageY;
      if (!raf) raf = window.requestAnimationFrame(flush);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [mounted, reduce]);

  // Pause the WebGL render loop while the hero is scrolled off-screen so it
  // stops competing with the rest of the page for GPU (keeps scrolling smooth).
  useEffect(() => {
    if (!mounted) return;
    const el = visualRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const sp = splineRef.current;
        if (!sp) return;
        try {
          if (entry.isIntersecting) sp.play();
          else sp.stop();
        } catch {
          /* no-op */
        }
      },
      { rootMargin: "150px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mounted]);

  return (
    <section className="hero" id="top">
      <div className="heroPaths" aria-hidden>
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="wrap heroGrid">
        <div className="heroText">
          <motion.span
            className="avail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            <span className="pulse">
              <span />
              <span />
            </span>
            Available for internships &amp; freelance
          </motion.span>

          <h1 className="heroName">
            <AnimatedWord word="Satyaki" base={0.15} reduce={reduce} />
            <br />
            <span className="heroSerif">
              <AnimatedWord word="Tirumal" base={0.4} reduce={reduce} />
            </span>
          </h1>

          <motion.div
            className="heroMetaRow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <span className="heroRole">Full-Stack · Mobile · AI</span>
            <span className="rule" />
            <span className="loc">{profile.location}</span>
          </motion.div>

          <motion.p
            className="heroLede"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            I build full-stack web platforms, native mobile apps, and AI-powered tools —
            from placement portals to autonomous satellite planners.
          </motion.p>

          <motion.div
            className="heroActions"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <Magnetic>
              <a href="#work" className="btn btn-primary">
                View work <MoveRight size={16} />
              </a>
            </Magnetic>
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">
              <FileText size={16} strokeWidth={1.8} /> Résumé
            </a>
            <div className="socials">
              <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <Github size={19} strokeWidth={1.7} />
              </a>
              <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Linkedin size={19} strokeWidth={1.7} />
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Email">
                <Mail size={19} strokeWidth={1.7} />
              </a>
            </div>
          </motion.div>
        </div>

        <div className="heroVisual" ref={visualRef}>
          <div className="heroGlow2" aria-hidden />
          {mounted && (
            <div className={`heroStage${ready ? " is-ready" : ""}`}>
              <SplineScene
                scene={ROBOT_SCENE_URL}
                className="heroRobot"
                onLoad={revealRobot}
              />
            </div>
          )}
          {mounted && !ready && <span className="loader heroLoader" aria-hidden />}
        </div>
      </div>
    </section>
  );
}
