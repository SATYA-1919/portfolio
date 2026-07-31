"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Github, X } from "lucide-react";
import type { Project } from "@/lib/data";

/** Full-bleed player for a project's walkthrough. Rendered into <body> rather
 *  than inside the card, because the cards carry a 3D tilt transform and a
 *  transformed ancestor would trap a fixed-position overlay inside it. */
export function VideoLightbox({ project, onClose }: { project: Project; onClose: () => void }) {
  const reduce = useReducedMotion();
  const video = useRef<HTMLVideoElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const shell = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    opener.current = document.activeElement as HTMLElement | null;
    setMounted(true);
  }, []);

  // Only reachable once the portal exists, so this waits for the mount rather
  // than firing against a ref that is still null on the first pass.
  useEffect(() => {
    if (mounted) close.current?.focus();
  }, [mounted]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !shell.current) return;
      // Keep Tab inside the dialog — behind the scrim there is nothing the
      // user can act on anyway.
      const stops = shell.current.querySelectorAll<HTMLElement>(
        'button, a[href], video[controls], [tabindex]:not([tabindex="-1"])',
      );
      if (!stops.length) return;
      const first = stops[0];
      const last = stops[stops.length - 1];
      const on = document.activeElement;
      if (e.shiftKey && (on === first || !shell.current.contains(on))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && on === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    // Hold the page still underneath, keeping the gutter the scrollbar had so
    // the layout behind the scrim doesn't jump sideways as it locks.
    const { overflow, paddingRight } = document.body.style;
    const gutter = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (gutter > 0) document.body.style.paddingRight = `${gutter}px`;

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      opener.current?.focus?.();
    };
  }, [onClose]);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    el.currentTime = 0;
    el.muted = false;
    // Opening is a user gesture, so sound is normally allowed — but a browser
    // that still refuses gets the video muted rather than not at all, and the
    // controls are right there to turn it up.
    void el.play().catch(() => {
      el.muted = true;
      void el.play().catch(() => {});
    });
  }, [project.slug]);

  if (!mounted) return null;

  const anim = reduce ? { duration: 0 } : { duration: 0.28, ease: [0.16, 1, 0.3, 1] as const };

  return createPortal(
    <motion.div
      className="lbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={anim}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} walkthrough`}
    >
      <motion.div
        ref={shell}
        className="lboxInner"
        initial={reduce ? false : { scale: 0.965, y: 14 }}
        animate={{ scale: 1, y: 0 }}
        exit={reduce ? undefined : { scale: 0.975, y: 8, opacity: 0 }}
        transition={anim}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="lboxBar">
          <div className="lboxWho">
            <span className="lboxCat">{project.category}</span>
            <h3>{project.title}</h3>
          </div>
          <div className="lboxActs">
            {project.github && (
              <a className="lboxSrc" href={project.github} target="_blank" rel="noreferrer">
                <Github size={14} strokeWidth={2} /> Source
              </a>
            )}
            <button ref={close} type="button" className="lboxX" onClick={onClose} aria-label="Close">
              <X size={18} strokeWidth={2.2} />
            </button>
          </div>
        </div>

        <video
          ref={video}
          className="lboxVid"
          src={project.videoFull ?? project.video}
          poster={project.image}
          controls
          autoPlay
          loop
          playsInline
        />
      </motion.div>
    </motion.div>,
    document.body,
  );
}
