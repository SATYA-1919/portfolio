"use client";

import { useEffect, useRef, useState } from "react";
import type { Application } from "@splinetool/runtime";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail, MoveRight, FileText } from "lucide-react";
import { SplineScene } from "@/components/ui/splite";
import { FloatingPaths } from "@/components/ui/background-paths";
import { Magnetic } from "@/components/Magnetic";
import { profile } from "@/lib/data";

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
  // Mount the 3D scene once it's first on screen, then KEEP it mounted so it
  // never reloads / flickers when you scroll away and back.
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { once: true, margin: "300px" });
  const [mounted, setMounted] = useState(false);
  // Keep the robot hidden until its intro camera move has settled, so it
  // appears already zoomed-out instead of visibly zooming on every reload.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (inView) setMounted(true);
  }, [inView]);

  const splineRef = useRef<Application | null>(null);
  const revealRobot = (spline: Application) => {
    splineRef.current = spline;
    (window as unknown as { __spline?: Application }).__spline = spline; // debug
    // Pull the camera back so the robot's arms/hands stay inside the frame when
    // it sways to the side (default framing clips the hands).
    const zoomOut = () => {
      try {
        spline.setZoom(0.62);
      } catch {
        /* older runtimes may not expose setZoom */
      }
    };
    zoomOut();
    // Scene has loaded; let its intro settle, then fade in at the final frame.
    window.setTimeout(() => {
      zoomOut();
      setReady(true);
    }, 1100);
  };
  useEffect(() => {
    if (!mounted) return;
    // Safety net: never leave the robot hidden if onLoad is slow / doesn't fire.
    const t = window.setTimeout(() => setReady(true), 4500);
    return () => window.clearTimeout(t);
  }, [mounted]);

  // Spline's head-follow only listens on its own <canvas>, so the robot ignores
  // the cursor unless it's directly over it. Forward every window pointer move
  // to the canvas (throttled to a frame) so it tracks the cursor across the
  // whole tab. Spline's raycaster reads pageX/pageY, so we carry those through.
  useEffect(() => {
    if (!mounted) return;
    let raf = 0;
    let cx = 0, cy = 0, px = 0, py = 0;
    const flush = () => {
      raf = 0;
      const canvas = document.querySelector<HTMLElement>(".heroRobot");
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
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) window.cancelAnimationFrame(raf);
    };
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

        <div className="heroVisual" ref={stageRef}>
          <div className="heroGlow2" aria-hidden />
          {mounted && (
            <div className={`heroStage${ready ? " is-ready" : ""}`}>
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
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
