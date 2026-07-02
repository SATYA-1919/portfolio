import { ArrowUp, FileText, Mail } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { Extracurricular } from "@/components/Extracurricular";
import { Magnetic } from "@/components/Magnetic";
import { profile } from "@/lib/data";

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <>
      <a href="#main" className="skipLink">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        {/* ===== Hero (text left · 3D robot right) ===== */}
        <Hero />

        {/* ===== Tech marquee ===== */}
        <Marquee />

        {/* ===== 01 · Selected Work ===== */}
        <ProjectShowcase />

        {/* ===== 02 · Extracurricular ===== */}
        <Extracurricular />

        {/* ===== 03 · Contact ===== */}
        <section id="contact" className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <Reveal>
              <div className="contact card">
                <span className="eyebrow" style={{ justifyContent: "center" }}>
                  <span className="dotc" /> <span className="no">03</span> — Contact
                </span>
                <p className="contactBig">
                  Let&apos;s <span className="serif iri">build</span>.
                </p>
                <p className="contactSub">
                  Open to internships and freelance work. If you have an idea or a role in
                  mind, my inbox is always open — I reply fast.
                </p>
                <div className="contactActions">
                  <Magnetic>
                    <a href={`mailto:${profile.email}`} className="btn btn-primary">
                      <Mail size={16} /> {profile.email}
                    </a>
                  </Magnetic>
                  <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">
                    <FileText size={16} strokeWidth={1.8} /> Résumé
                  </a>
                </div>
                <div className="contactLinks">
                  <a href={profile.socials.github} target="_blank" rel="noreferrer" className="ul">
                    GitHub
                  </a>
                  <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="ul">
                    LinkedIn
                  </a>
                  <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="ul">
                    {profile.phone}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <footer className="wrap footer">
          <span>
            © {year} {profile.name}
          </span>
          <a href="#top" className="toTop">
            Back to top <ArrowUp size={14} />
          </a>
        </footer>
      </main>
    </>
  );
}
