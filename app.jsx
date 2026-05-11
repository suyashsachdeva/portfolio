/* global React, ReactDOM, DATA */
const { useState, useEffect, useRef, useMemo } = React;

/* ── icons ───────────────────────────────────────────────────────────── */
const Icon = ({ name, size = 16 }) => {
  const props = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor", strokeWidth: 1.5,
    strokeLinecap: "round", strokeLinejoin: "round",
  };
  const paths = {
    arrow:   <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    download:<><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></>,
    mail:    <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    github:  <path d="M9 19c-4 1.5-4-2-6-2.5M15 22v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 5.77 5.07 5.07 0 0 0 18.91 2S17.73 1.65 15 3.48a13.38 13.38 0 0 0-7 0C5.27 1.65 4.09 2 4.09 2A5.07 5.07 0 0 0 4 5.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 8 19.13V22"/>,
    linkedin:<><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></>,
    scholar: <><path d="M2 8 12 3l10 5-10 5L2 8z"/><path d="M6 11v5c0 2 3 3 6 3s6-1 6-3v-5"/></>,
    phone:   <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>,
    location:<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
    eye:     <><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></>,
    shield:  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
    book:    <><path d="M4 19.5V5a2 2 0 0 1 2-2h13v18H6.5a2.5 2.5 0 0 1 0-5H19"/></>,
    external:<><path d="M7 17 17 7"/><path d="M7 7h10v10"/></>,
  };
  return <svg {...props}>{paths[name]}</svg>;
};

/* ── nav ─────────────────────────────────────────────────────────────── */
const SECTIONS = [
  { id: "about",       label: "About" },
  { id: "experience",  label: "Experience" },
  { id: "research",    label: "Research" },
  { id: "projects",    label: "Projects" },
  { id: "skills",      label: "Skills" },
  { id: "contact",     label: "Contact" },
];

const Nav = () => {
  const [active, setActive] = useState("about");
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: "-40% 0px -55% 0px" });
    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <a className="brand" href="#top"><span className="dot"></span>{DATA.shortName}</a>
        <div className="nav-links">
          {SECTIONS.map(s => (
            <a key={s.id} href={"#" + s.id} className={active === s.id ? "active" : ""}>
              {s.label}
            </a>
          ))}
        </div>
        <a className="nav-cta" href="#contact">Get in touch</a>
      </div>
    </nav>
  );
};

/* ── hero ────────────────────────────────────────────────────────────── */
/* hero neural-net diagram: input → 2 hidden layers → output */
const NeuralNet = () => {
  // layer config: x position and node count
  const layers = useMemo(() => ([
    { x: -75, n: 5, cls: "in" },
    { x: -25, n: 7, cls: "hidden" },
    { x:  25, n: 7, cls: "hidden" },
    { x:  75, n: 3, cls: "out" },
  ]), []);
  const nodeY = (i, n) => {
    const span = 130;
    if (n === 1) return 0;
    return -span/2 + (span/(n-1)) * i;
  };
  // edges between adjacent layers
  const edges = [];
  for (let l = 0; l < layers.length - 1; l++) {
    const A = layers[l], B = layers[l+1];
    for (let i = 0; i < A.n; i++) {
      for (let j = 0; j < B.n; j++) {
        const hot = (i*7 + j*3 + l) % 9 === 0;
        edges.push({
          x1: A.x, y1: nodeY(i, A.n),
          x2: B.x, y2: nodeY(j, B.n),
          hot,
          key: `${l}-${i}-${j}`,
        });
      }
    }
  }
  // pick a handful of full forward paths to animate as "signals"
  const signals = useMemo(() => {
    const paths = [
      [1, 3, 2, 0],
      [3, 0, 5, 2],
      [0, 6, 1, 1],
      [4, 2, 4, 0],
      [2, 5, 0, 2],
    ];
    return paths.map((picks) => {
      let d = "";
      picks.forEach((idx, l) => {
        const L = layers[l];
        const y = nodeY(idx, L.n);
        d += (l === 0 ? "M" : "L") + L.x + " " + y + " ";
      });
      return d.trim();
    });
  }, [layers]);
  const labels = ["INPUT", "h₁", "h₂", "OUTPUT"];
  return (
    <div className="orbit-wrap" aria-hidden="true">
      <svg className="nn-svg" viewBox="-110 -100 220 200">
        {/* edges */}
        <g>
          {edges.map(e => (
            <line key={e.key} className={"edge" + (e.hot ? " hot" : "")}
              x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} />
          ))}
        </g>
        {/* animated signals */}
        <g>
          {signals.map((d, i) => (
            <path key={i} className={"signal s" + (i+1)} d={d} />
          ))}
        </g>
        {/* nodes */}
        <g>
          {layers.map((L, li) => (
            <g key={li}>
              {Array.from({ length: L.n }).map((_, i) => {
                const r = L.cls === "out" ? 3.2 : 2.6;
                const live = (i + li) % 3 === 0;
                const delay = ["", "d1", "d2", "d3", "d4"][(i+li) % 5];
                return (
                  <circle
                    key={i}
                    className={"node " + L.cls + (live ? " live " + delay : "")}
                    cx={L.x} cy={nodeY(i, L.n)} r={r}
                  />
                );
              })}
            </g>
          ))}
        </g>
        {/* layer labels */}
        <g>
          {layers.map((L, i) => (
            <text key={i} className="layer-label" x={L.x} y={85} textAnchor="middle">
              {labels[i]}
            </text>
          ))}
        </g>
        {/* tiny axis frame */}
        <g stroke="var(--line-soft)" strokeWidth="0.4" fill="none">
          <line x1="-100" y1="75" x2="100" y2="75" />
        </g>
      </svg>
    </div>
  );
};

const Hero = () => (
  <section className="hero" id="top">
    <div className="wrap hero-grid">
      <div>
        <div className="hero-meta">
          <span className="pulse"></span>
          <span>Open to research roles · 2026</span>
        </div>
        <h1>
          Deep learning,<br/>
          built for the <em>edges</em><br/>
          of the signal.
        </h1>
        <p className="hero-tag">
          {DATA.tagline}
        </p>
        <div className="hero-cta-row">
          <a className="btn primary" href="#research">
            View research <span className="arrow"><Icon name="arrow" /></span>
          </a>
          <a className="btn" href="uploads/resume.pdf" target="_blank" rel="noreferrer">
            <Icon name="download" /> Resume
          </a>
        </div>
      </div>
      <NeuralNet />
    </div>
  </section>
);

/* ── about ───────────────────────────────────────────────────────────── */
const About = () => (
  <section id="about">
    <div className="wrap">
      <div className="sec-head">
        <span className="eyebrow">01 · About</span>
      </div>
      <div className="about-grid">
        <div>
          <h2 className="sec-title">A researcher,<br/>at the bench.</h2>
          <p className="sec-sub" style={{ marginTop: 24 }}>
            {DATA.education.deg}, {DATA.education.school}. {DATA.education.minor}.
          </p>
          <div className="stats">
            {DATA.stats.map(s => (
              <div className="stat" key={s.l}>
                <span className="n">{s.n}</span>
                <span className="l">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="about-body">
          {DATA.about.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </div>
    </div>
  </section>
);

/* ── experience ──────────────────────────────────────────────────────── */
const Experience = () => (
  <section id="experience">
    <div className="wrap">
      <div className="sec-head">
        <span className="eyebrow">02 · Experience</span>
        <h2 className="sec-title">Where the work lived.</h2>
      </div>
      <div className="exp-list">
        {DATA.experience.map((e, i) => (
          <article className="exp-item" key={i}>
            <div className="exp-date">{e.date}</div>
            <div>
              <h3 className="exp-role">{e.role}</h3>
              <div className="exp-co">{e.co}<span>{e.loc}</span></div>
              <ul className="exp-bullets">
                {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
            <div className="exp-tags">
              {e.tags.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

/* ── research / publications ─────────────────────────────────────────── */
const Research = () => {
  const [tab, setTab] = useState("journals");
  const items = tab === "journals" ? DATA.journals : DATA.conferences;
  return (
    <section id="research">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">03 · Research</span>
          <h2 className="sec-title">Published &amp; in review.</h2>
          <p className="sec-sub">
            Nine peer-reviewed papers across IEEE and Elsevier venues. Focus areas:
            steganography, signal-integrity in 3D integration, adversarial robustness,
            and graph neural networks for healthcare.
          </p>
        </div>
        <div className="tabs" role="tablist">
          <button
            className={"tab" + (tab === "journals" ? " active" : "")}
            onClick={() => setTab("journals")}
            role="tab" aria-selected={tab === "journals"}
          >Journals · {DATA.journals.length}</button>
          <button
            className={"tab" + (tab === "conferences" ? " active" : "")}
            onClick={() => setTab("conferences")}
            role="tab" aria-selected={tab === "conferences"}
          >Conferences · {DATA.conferences.length}</button>
        </div>
        <div className="pub-list">
          {items.map((p, i) => (
            <article className="pub" key={p.title}>
              <div className="pub-num">{String(i + 1).padStart(2, "0")}</div>
              <div>
                <h3 className="pub-title">{p.title}</h3>
                <div className="pub-venue">{p.venue} · {p.authors}</div>
              </div>
              <div className={"pub-status " + p.kind}>{p.status}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── projects ────────────────────────────────────────────────────────── */
const Projects = () => (
  <section id="projects">
    <div className="wrap">
      <div className="sec-head">
        <span className="eyebrow">04 · Projects</span>
        <h2 className="sec-title">Selected work, outside of papers.</h2>
      </div>
      <div className="proj-grid">
        {DATA.projects.map(p => (
          <article className="proj" key={p.title}>
            <div className="proj-head">
              <span className="proj-mark">{p.mark}</span>
              <span className="proj-icon"><Icon name={p.icon} size={14} /></span>
            </div>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
            <div className="proj-date">{p.date}</div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

/* ── skills ──────────────────────────────────────────────────────────── */
const Skills = () => (
  <section id="skills">
    <div className="wrap">
      <div className="sec-head">
        <span className="eyebrow">05 · Toolkit</span>
        <h2 className="sec-title">What I reach for.</h2>
      </div>
      <div className="skills-grid">
        {DATA.skills.map(g => (
          <div className="skill-group" key={g.group}>
            <h4>{g.group}</h4>
            <ul className="skill-list">
              {g.items.map(s => <li key={s}>{s}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ── achievements ────────────────────────────────────────────────────── */
const Achievements = () => (
  <section id="achievements">
    <div className="wrap">
      <div className="sec-head">
        <span className="eyebrow">06 · Beyond the code</span>
        <h2 className="sec-title">Talks, wins, and teams led.</h2>
      </div>
      <div className="ach-list">
        {DATA.achievements.map((a, i) => (
          <div className="ach" key={i}>
            <div className="ach-num">{String(i + 1).padStart(2, "0")}</div>
            <div className="ach-body" dangerouslySetInnerHTML={{ __html: a }} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ── contact ─────────────────────────────────────────────────────────── */
const Contact = () => (
  <section id="contact" className="contact">
    <div className="wrap">
      <span className="eyebrow" style={{ justifyContent: "center" }}>07 · Contact</span>
      <h2>Let's talk about <em>research</em>.</h2>
      <p>
        Open to research positions, collaborations, and conversations with anyone
        building careful systems on top of deep learning.
      </p>
      <div className="contact-grid">
        <a className="contact-row" href={"mailto:" + DATA.email}>
          <span className="k">Email</span>
          <span className="v">{DATA.email}</span>
        </a>
        <a className="contact-row" href={"tel:" + DATA.phone.replace(/\s/g,"")}>
          <span className="k">Phone</span>
          <span className="v">{DATA.phone}</span>
        </a>
        <div className="contact-row">
          <span className="k">Based in</span>
          <span className="v">{DATA.location}</span>
        </div>
      </div>
      <div className="socials">
        <a className="social" href={DATA.scholar}  aria-label="Google Scholar"><Icon name="scholar" size={18} /></a>
        <a className="social" href={DATA.linkedin} aria-label="LinkedIn"><Icon name="linkedin" size={18} /></a>
        <a className="social" href={DATA.github}   aria-label="GitHub"><Icon name="github" size={18} /></a>
        <a className="social" href={"mailto:" + DATA.email} aria-label="Email"><Icon name="mail" size={18} /></a>
      </div>
      <div className="foot">
        <span>© 2026 {DATA.name} · All rights reserved</span>
        <span>Built with care, not noise.</span>
      </div>
    </div>
  </section>
);

/* ── app ─────────────────────────────────────────────────────────────── */
const App = () => (
  <React.Fragment>
    <Nav />
    <Hero />
    <About />
    <Experience />
    <Research />
    <Projects />
    <Skills />
    <Achievements />
    <Contact />
  </React.Fragment>
);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

/* reveal on scroll */
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.12 });
    document.querySelectorAll("section").forEach(s => {
      s.classList.add("reveal");
      io.observe(s);
    });
  }, 200);
});
