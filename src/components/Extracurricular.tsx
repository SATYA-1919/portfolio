import { Reveal } from "@/components/Reveal";

const items = [
  {
    label: "Sports",
    title: "Football",
    caption:
      "Competitive matches and college league nights under the floodlights — I turn out at #19.",
    image: "/extracurricular/football.webp",
    objectPosition: "center",
    alt: "Playing football at a night match, wearing the number 19 jersey",
  },
  {
    label: "Volunteered",
    title: "Blue Cross of Hyderabad",
    caption:
      "Volunteered at the Animal Birth Control Center — rescue, care, and awareness drives for street animals.",
    image: "/extracurricular/bluecross.webp",
    objectPosition: "center",
    alt: "Entrance sign of the Blue Cross of Hyderabad Animal Birth Control Center",
  },
];

export function Extracurricular() {
  return (
    <section id="extracurricular" className="section" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Reveal>
          <div className="sectionHead">
            <div>
              <span className="eyebrow">
                <span className="dotc" /> <span className="no">02</span> — Extracurricular
              </span>
              <h2 className="sectionTitle">
                Off the <span className="serif iri">clock</span>
              </h2>
            </div>
            <p className="sectionNote">
              I&apos;m happiest on a football pitch — and I&apos;ve volunteered with an animal-welfare shelter.
            </p>
          </div>
        </Reveal>

        <div className="exGrid">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.08}>
              <article className="exCard">
                <div className="exShot">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={it.image}
                    alt={it.alt}
                    loading="lazy"
                    style={{ objectPosition: it.objectPosition }}
                  />
                </div>
                <div className="frost" />
                <div className="exBody">
                  <span className="exLabel">{it.label}</span>
                  <h3 className="exTitle">{it.title}</h3>
                  <p className="exCaption">{it.caption}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
