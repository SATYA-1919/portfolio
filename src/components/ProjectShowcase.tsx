"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionStyle,
} from "framer-motion";
import {
  ArrowUpRight,
  Github,
  GraduationCap,
  LineChart,
  ShoppingCart,
  ListChecks,
  Satellite,
  type LucideIcon,
} from "lucide-react";
import { projects, type Project, type ProjectIcon } from "@/lib/data";
import { Reveal } from "@/components/Reveal";

const ICONS: Record<ProjectIcon, LucideIcon> = {
  graduation: GraduationCap,
  leads: LineChart,
  grocery: ShoppingCart,
  tasks: ListChecks,
  satellite: Satellite,
};

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [broken, setBroken] = useState(false);

  // pointer-driven tilt
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 150, damping: 18 });

  useEffect(() => {
    return () => {
      if (frame.current) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  function onMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse" || !ref.current || frame.current) return;
    const { clientX, clientY } = e;

    frame.current = window.requestAnimationFrame(() => {
      frame.current = 0;
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      mx.set((clientX - r.left) / r.width);
      my.set((clientY - r.top) / r.height);
    });
  }

  function onLeave() {
    if (frame.current) {
      window.cancelAnimationFrame(frame.current);
      frame.current = 0;
    }
    mx.set(0.5);
    my.set(0.5);
  }

  const Icon = ICONS[p.icon];
  const href = p.live || p.github;
  const showImage = p.image && !broken;
  const featured = index === 0;

  const body = (
    <>
      {showImage ? (
        <div className={`pshot ${p.frame === "phone" ? "phone" : "screen"}`}>
          {p.frame === "phone" ? (
            <div className="frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={`${p.title} app screenshot`} loading="lazy" onError={() => setBroken(true)} />
            </div>
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={p.image} alt={`${p.title} screenshot`} loading="lazy" onError={() => setBroken(true)} />
          )}
        </div>
      ) : (
        <div className="pcover gen">
          <div className="mesh" />
        </div>
      )}

      <div className="frost" />

      <div className="pbody">
        <div className="ptop">
          <span className="pcat">
            <span className="ico">
              <Icon size={15} strokeWidth={1.9} />
            </span>
            {p.category}
          </span>
          <span className="pyear">{p.year}</span>
        </div>

        <h3 className="ptitle">{p.title}</h3>
        <p className="pblurb">{p.blurb}</p>

        <div className="pmeta">
          <div className="ptags">
            {p.tags.slice(0, featured ? 5 : 3).map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          {href && (
            <span className="plink">
              {p.live ? (
                <>
                  Live <ArrowUpRight size={13} strokeWidth={2.2} />
                </>
              ) : (
                <>
                  <Github size={13} strokeWidth={2} /> Source
                </>
              )}
            </span>
          )}
        </div>
      </div>
    </>
  );

  const cls = `pcard${featured ? " feat" : ""}`;
  const style = {
    "--pa": p.accent,
    rotateX: reduce ? 0 : rx,
    rotateY: reduce ? 0 : ry,
    transformPerspective: 1000,
  } as MotionStyle;

  // Drive the entrance via `animate` (not whileInView) so reduced motion
  // resolves the reused node straight to visible with an instant transition.
  const reveal = {
    initial: { opacity: 0, y: 26 },
    animate: reduce || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 },
    transition: reduce
      ? { duration: 0 }
      : {
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          delay: index * 0.05,
        },
  };

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={cls}
        style={style}
        href={href}
        target="_blank"
        rel="noreferrer"
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        aria-label={`${p.title} — ${p.blurb}`}
        {...reveal}
      >
        {body}
      </motion.a>
    );
  }
  return (
    <motion.div
      ref={ref}
      className={cls}
      style={style}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      {...reveal}
    >
      {body}
    </motion.div>
  );
}

export function ProjectShowcase() {
  return (
    <section id="work" className="section">
      <div className="wrap">
        <Reveal>
          <div className="sectionHead">
            <div>
              <span className="eyebrow">
                <span className="dotc" /> <span className="no">01</span> — Selected Work
              </span>
              <h2 className="sectionTitle">
                Things I&apos;ve <span className="serif iri">shipped</span>
              </h2>
            </div>
            <p className="sectionNote">
              Five builds, all shipped — from a full university placement platform to an
              autonomous satellite mission planner.
            </p>
          </div>
        </Reveal>

        <div className="workGrid">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
