import { marqueeSkills } from "@/lib/data";

// Infinite horizontal marquee of the tech stack. The track holds two copies of
// the list so the -50% translate loops seamlessly. Pauses on hover; the CSS
// disables the animation entirely under prefers-reduced-motion.
export function Marquee() {
  const items = [...marqueeSkills, ...marqueeSkills];
  return (
    <div className="marquee" aria-hidden>
      <div className="marqueeTrack">
        {items.map((s, i) => (
          <span className="marqueeItem" key={i}>
            {s}
            <span className="star">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
