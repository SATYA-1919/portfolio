"use client";

import { useEffect, useRef, useState } from "react";
import type { Application } from "@splinetool/runtime";
import { useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail, MoveRight, FileText } from "lucide-react";
import { SplineScene } from "@/components/ui/splite";
import { FloatingPaths } from "@/components/ui/background-paths";
import { Magnetic } from "@/components/Magnetic";
import { profile } from "@/lib/data";
import { ROBOT_SCENE_URL } from "@/lib/robot";

// CSS-driven word reveal (not Framer, not per-letter) so the name paints and
// animates smoothly on first paint — one composited element per word, so the
// font swap and JS parse can't stutter it.
function AnimatedWord({ word, base }: { word: string; base: number }) {
  return (
    <span className="heroWord" style={{ animationDelay: `${base}s` }}>
      {word}
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

      // Kick off the wrapper chunk on the next tick so the robot starts
      // downloading ASAP. The hero text is CSS-driven, so this no longer
      // competes with the name showing up.
      timer = window.setTimeout(() => {
        hasLoaded = true;
        void import("@splinetool/react-spline");
        setMounted(true);
      }, 0);
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
    // The scene plays a ~2s intro camera dolly that starts zoomed-in. Keep the
    // zoomed-out poster up while it plays; once it's done, pull the camera back a
    // single time (it holds after the intro) and cross-fade to the live robot.
    // Result: the robot stays at the poster's zoom — no zoom-in on reload.
    window.setTimeout(() => {
      try {
        spline.setZoom(0.5);
      } catch {
        /* older runtimes may not expose setZoom */
      }
      window.requestAnimationFrame(() => setReady(true));
    }, 2800);
  };

  useEffect(() => {
    if (!mounted) return;
    // Fallback: if the scene never fires onLoad, still reveal it eventually.
    const t = window.setTimeout(() => setReady(true), 6000);
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
          <span className="avail heroFade" style={{ animationDelay: "0.05s" }}>
            <span className="pulse">
              <span />
              <span />
            </span>
            Available for internships &amp; freelance
          </span>

          <h1 className="heroName">
            <AnimatedWord word="Satyaki" base={0.04} />
            <br />
            <span className="heroSerif">
              <AnimatedWord word="Tirumal" base={0.13} />
            </span>
          </h1>

          {/* Everything below the name reveals as a single smooth block. */}
          <div className="heroSub heroFade" style={{ animationDelay: "0.32s" }}>
          <div className="heroMetaRow">
            <span className="heroRole">Full-Stack · Mobile · AI</span>
            <span className="rule" />
            <span className="loc">{profile.location}</span>
          </div>

          <p className="heroLede">
            I build full-stack web platforms, native mobile apps, and AI-powered tools —
            from placement portals to autonomous satellite planners.
          </p>

          <div className="heroActions">
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
          </div>
          </div>
        </div>

        <div className="heroVisual" ref={visualRef}>
          <div className="heroGlow2" aria-hidden />
          {/* Static robot render shown instantly (no spinner); the live scene
              cross-fades in over it once loaded, so the robot is never "late". */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={`heroPoster${ready ? " is-hidden" : ""}`}
            src="/robot-poster.webp"
            alt=""
            aria-hidden
            decoding="sync"
            fetchPriority="high"
          />
          {mounted && (
            <div className={`heroStage${ready ? " is-ready" : ""}`}>
              <SplineScene
                scene={ROBOT_SCENE_URL}
                className="heroRobot"
                onLoad={revealRobot}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
