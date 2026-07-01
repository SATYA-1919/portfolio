"use client";

import { useEffect, useState } from "react";
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

        <div className="heroVisual">
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
