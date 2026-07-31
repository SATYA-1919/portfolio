"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
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
  Bot,
  Github,
  GraduationCap,
  LineChart,
  PlaneTakeoff,
  ShoppingCart,
  ListChecks,
  Play,
  Satellite,
  type LucideIcon,
} from "lucide-react";
import { projects, type Project, type ProjectIcon } from "@/lib/data";
import { Reveal } from "@/components/Reveal";
import { VideoLightbox } from "@/components/VideoLightbox";

const ICONS: Record<ProjectIcon, LucideIcon> = {
  graduation: GraduationCap,
  concierge: PlaneTakeoff,
  assistant: Bot,
  leads: LineChart,
  grocery: ShoppingCart,
  tasks: ListChecks,
  satellite: Satellite,
};

/** Cards pack into a six-column grid: a featured card takes a whole row, the
 *  rest take half. So the half-width cards between two featured ones pair off,
 *  and a run with an odd length strands its last card beside an empty gap.
 *  Those stragglers get widened to fill the row. */
function orphanedSlugs(list: Project[]) {
  const wide = new Set<string>();
  let run: Project[] = [];
  const close = () => {
    if (run.length % 2) wide.add(run[run.length - 1].slug);
    run = [];
  };
  for (const p of list) {
    if (p.featured) close();
    else run.push(p);
  }
  close();
  return wide;
}

function ProjectCard({
  p,
  index,
  wide,
  onPlay,
  frozen,
}: {
  p: Project;
  index: number;
  wide: boolean;
  onPlay: (p: Project) => void;
  frozen: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  // Separate, repeating observer: the preview only downloads and runs while
  // the card is near the viewport, and pauses again the moment it leaves.
  const near = useInView(ref, { margin: "200px" });
  const video = useRef<HTMLVideoElement>(null);
  const [broken, setBroken] = useState(false);
  const [videoBroken, setVideoBroken] = useState(false);

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

  // The silent card loop runs only while the card is near the viewport, and
  // stands down entirely while the lightbox has the floor.
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    if (!near || frozen) {
      el.pause();
      return;
    }
    if (!el.getAttribute("src")) el.setAttribute("src", p.video!);
    void el.play().catch(() => {});
  }, [near, frozen, p.video]);

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
  // A card with a preview spends its click on opening the player instead of
  // navigating, so the link moves into the pill and the card stops being an
  // anchor. The silent loop on the card is only ever a trailer for it.
  const playable = Boolean(showImage && p.video && !videoBroken);
  // Reduced motion silences the unprompted loop, but not the player itself —
  // asking to watch something is a deliberate act, not motion inflicted on you.
  const showVideo = playable && !reduce;
  const featured = Boolean(p.featured);
  const phone = p.frame === "phone";

  const linkLabel = p.live ? (
    <>
      Live <ArrowUpRight size={13} strokeWidth={2.2} />
    </>
  ) : (
    <>
      <Github size={13} strokeWidth={2} /> Source
    </>
  );

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
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={`${p.title} screenshot`} loading="lazy" onError={() => setBroken(true)} />
              {showVideo && (
                <video
                  ref={video}
                  className="pvid"
                  muted
                  loop
                  playsInline
                  preload="none"
                  poster={p.image}
                  aria-hidden
                  onError={() => setVideoBroken(true)}
                />
              )}
              {playable && (
                <span className="pplay" aria-hidden>
                  <Play size={20} strokeWidth={2} fill="currentColor" />
                </span>
              )}
            </>
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

          <div className="pacts">
            {playable && (
              <button
                type="button"
                className="pwatch"
                onClick={(e) => {
                  e.stopPropagation();
                  onPlay(p);
                }}
                aria-label={`Watch the ${p.title} walkthrough with sound`}
              >
                <Play size={12} strokeWidth={2} fill="currentColor" /> Watch
              </button>
            )}

            {href &&
              (playable ? (
                <a
                  className="plink"
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  {linkLabel}
                </a>
              ) : (
                <span className="plink">{linkLabel}</span>
              ))}
          </div>
        </div>
      </div>
    </>
  );

  const cls = `pcard${featured ? " feat" : ""}${wide ? " wide" : ""}${phone ? " phoneCard" : ""}`;
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

  // Anywhere on a playable card opens the player. That is mouse convenience on
  // top of the Watch pill, which is the real control — so no role or tabindex
  // here, and keyboard users reach the same thing through the button.
  if (playable) {
    return (
      <motion.div
        ref={ref}
        className={`${cls} playable`}
        style={style}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        onClick={() => onPlay(p)}
        {...reveal}
      >
        {body}
      </motion.div>
    );
  }

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

const WIDE = orphanedSlugs(projects);

export function ProjectShowcase() {
  const [playing, setPlaying] = useState<Project | null>(null);

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
              Seven builds, all shipped — from a full university placement platform to an
              autonomous travel concierge and a local-first AI assistant.
            </p>
          </div>
        </Reveal>

        <div className="workGrid">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.slug}
              p={p}
              index={i}
              wide={WIDE.has(p.slug)}
              onPlay={setPlaying}
              frozen={playing !== null}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {playing && (
          <VideoLightbox key={playing.slug} project={playing} onClose={() => setPlaying(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
