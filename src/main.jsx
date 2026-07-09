import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const RABBIT_LINE_PATH =
  "M132 154 C126 132 110 118 92 116 C75 115 69 128 75 145 C81 163 98 177 112 184 C74 136 58 91 79 78 C96 69 144 111 208 136 C288 168 365 165 381 128 C390 107 386 74 421 62 C441 55 482 61 505 73 C527 85 551 119 550 150 C549 170 536 181 514 181 C486 181 459 160 453 140 C448 122 459 110 475 111 C493 112 508 137 511 168 C516 219 481 252 420 274 C376 289 348 311 318 345 C362 354 395 371 400 390 C403 399 397 402 387 398 C346 383 310 375 277 384 C259 389 239 404 220 406 C205 408 195 402 197 393 C200 380 225 373 247 371 C231 340 198 307 159 286 C128 270 110 257 96 235 C85 218 77 198 65 185 C52 169 31 163 21 148 C12 135 12 119 22 116 C35 112 51 127 65 145 M245 244 C224 233 205 212 210 198 C216 181 250 180 282 188 C320 198 339 219 327 249 C318 274 296 293 285 323 M427 70 C391 67 302 58 275 45 C254 35 258 19 282 16 C323 11 416 35 500 69 M333 339 C350 304 379 268 405 257 C421 251 424 260 411 273 C390 290 368 306 347 331";

const projects = [
  {
    title: "Product Design",
    image: "/frame-2.png",
    href: "/e-o",
    alt: "Product Design project preview",
    kicker: ["Observe", "Connect", "Protect"],
    headline: ["Guardians", "Above"],
    accent: "#e9ddd4",
  },
  {
    title: "Peloton Living",
    image: "/ar-3.png",
    href: "/peloton-living",
    alt: "Peloton Living project preview",
    kicker: ["Life", "Care", "Flow"],
    headline: ["Healthy", "Expansion"],
    accent: "#e5e0da",
  },
  {
    title: "Kulimax",
    image: "/festival-branding.png",
    href: "/kulimax",
    alt: "Service Design project preview",
    kicker: ["Map", "Flow", "Touchpoint"],
    headline: ["Service", "System"],
    accent: "#dfe8e4",
  },
  {
    title: "Interaction Design",
    image: "/ar-3.png",
    alt: "Interaction Design project preview",
    kicker: ["Motion", "Prototype", "Interface"],
    headline: ["Soft", "Control"],
    accent: "#eee6da",
  },
];

const detailImages = [
  { src: "/e-o/hero.png", alt: "e.o floating product hero scene" },
  { src: "/e-o/detail-strip.png", alt: "e.o product hardware detail views" },
  { src: "/e-o/overview.png", alt: "e.o product lineup above a city skyline" },
  { src: "/e-o/night-scene.png", alt: "e.o safety robots lighting a park walkway at night" },
  { src: "/e-o/interface.png", alt: "e.o patrol interface concept in a crosswalk scene" },
  { src: "/e-o/product-shot.png", alt: "e.o product design closing render" },
];

const pelotonPngImages = {
  hero: { src: "/peloton-png/hero.png", alt: "Peloton Living hero image with product copy" },
  scenes: [
    { src: "/peloton-png/scene-1.png", alt: "Peloton Living kitchen scene" },
    { src: "/peloton-png/scene-2.png", alt: "Peloton Living wellness appliance scene" },
    { src: "/peloton-png/scene-3.png", alt: "Peloton Living entry scene" },
    { src: "/peloton-png/scene-4.png", alt: "Peloton Living bedroom scene" },
  ],
  frames: [
    { src: "/peloton-png/standard.png", alt: "Peloton Living Standard product explanation frame" },
    { src: "/peloton-png/alive.png", alt: "Peloton Living Alive product explanation frame" },
    { src: "/peloton-png/fruto-press.png", alt: "Peloton Living Fruto Press product explanation frame" },
    { src: "/peloton-png/breeze.png", alt: "Peloton Living Breeze product explanation frame" },
    { src: "/peloton-png/lineup.png", alt: "Peloton Living product lineup frame" },
  ],
};

const kulimaxVideo = {
  src: "/kulimax/main.mp4",
  title: "Kulimax main festival branding video",
  autoPlay: true,
  controls: false,
  loop: true,
  muted: true,
};

const kulimaxImages = {
  titleStrip: { src: "/kulimax/title-strip.jpg", alt: "Our Brightest Moment Kulimax title strip" },
  poster: { src: "/kulimax/poster.png", alt: "Kulimax festival main poster" },
  closing: [
    { src: "/kulimax/guide.png", alt: "Kulimax festival key information poster" },
    { src: "/kulimax/recruit.png", alt: "Kulimax festival participant recruitment poster" },
  ],
};

const kulimaxGoods = [
  { src: "/kulimax/good-legalpad.png", alt: "Kulimax legal pad merchandise" },
  { src: "/kulimax/good-magnet.png", alt: "Kulimax round magnet merchandise" },
  { src: "/kulimax/good-blue-clock.png", alt: "Kulimax blue clock merchandise" },
  { src: "/kulimax/good-wipes.png", alt: "Kulimax wet wipes merchandise" },
  { src: "/kulimax/good-bookmark.png", alt: "Kulimax bookmark merchandise" },
];

const kulimaxSocialImages = [
  {
    src: "/kulimax/social-showcase.png",
    alt: "Kulimax Instagram phone mockup showcase",
  },
];

const kulimaxBoothCards = [
  "Red Zone",
  "Fire",
  "Rest",
  "Life Game",
  "KU-LUCK",
  "Apple",
  "Red Thread",
  "Heartbeat",
  "Red Letter",
  "Story",
  "Vamos",
  "Strawberry",
].map((name, index) => ({
  src: `/kulimax/booth-cards/booth-${String(index + 1).padStart(2, "0")}.png`,
  alt: `Kulimax ${name} booth card news`,
}));

const blurPadPresets = [
  { color: "rgb(255, 255, 255)", width: "calc(100% + 160px)", height: "90%", blur: "40px", opacity: 0.32 },
  { color: "#ffffff", width: "calc(100% + 160px)", height: "90%", blur: "40px", opacity: 0.32 },
  { color: "rgba(255, 255, 255, 0.74)", width: "calc(100% + 160px)", height: "90%", blur: "40px", opacity: 0.32 },
];

const padTrackItems = Array.from(
  { length: 40 },
  (_, index) => blurPadPresets[index % blurPadPresets.length],
);
const padTrackBaseIndex = 16;
const padStartPercent = 2;
const padPitchPercent = 120;

function ContinuousHero({ skipped }) {
  return (
    <section className={`hero ${skipped ? "is-skipped" : ""}`} id="home" aria-label="Portfolio opening">
      <svg className="rabbitDrawing" viewBox="0 0 570 420" aria-hidden="true">
        <path d={RABBIT_LINE_PATH} pathLength="1000" />
      </svg>

      <div className="finalType" aria-label="Lee Gabin, Product UIUX Designer">
        <strong>LEE&nbsp;&nbsp;GABIN</strong>
        <span>PRODUCT UIUX DESIGNER</span>
      </div>
    </section>
  );
}

function ProjectFace({ project, index }) {
  const media = (
    <div className="projectMedia">
      <img src={project.image} alt={project.alt} />
      <div className="projectOverlay" aria-hidden="true">
        <p>{project.kicker.map((line) => <span key={line}>{line}</span>)}</p>
        <h2>{project.headline.map((line) => <span key={line}>{line}</span>)}</h2>
      </div>
    </div>
  );

  return (
    <article
      className={`projectFace ${project.href ? "hasLink" : ""}`}
      aria-label={`${project.title} project face`}
      style={{ "--face-index": index }}
    >
      <div className="projectContent">
        {project.href ? (
          <a className="projectLink" href={project.href} aria-label={`${project.title} project detail`}>
            {media}
          </a>
        ) : media}
        <h1>{project.title}</h1>
      </div>
    </article>
  );
}

function ProjectShowcase({ skipped }) {
  const [rotationStep, setRotationStep] = useState(0);
  const [hintDismissed, setHintDismissed] = useState(false);
  const lockedRef = useRef(false);
  const touchStartRef = useRef(null);
  const padTrackTop = padStartPercent - (padTrackBaseIndex + rotationStep) * padPitchPercent;

  useEffect(() => {
    const rotate = (direction) => {
      if (lockedRef.current) return;
      lockedRef.current = true;
      setHintDismissed(true);
      setRotationStep((current) => current + direction);
      window.setTimeout(() => {
        lockedRef.current = false;
      }, 1040);
    };

    const onWheel = (event) => {
      if (Math.abs(event.deltaY) < 18 && Math.abs(event.deltaX) < 18) return;
      event.preventDefault();
      rotate(event.deltaY + event.deltaX > 0 ? 1 : -1);
    };

    const onTouchStart = (event) => {
      touchStartRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchEnd = (event) => {
      if (touchStartRef.current == null) return;
      const endY = event.changedTouches[0]?.clientY ?? touchStartRef.current;
      const distance = touchStartRef.current - endY;
      touchStartRef.current = null;
      if (Math.abs(distance) < 36) return;
      rotate(distance > 0 ? 1 : -1);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <section className={`projectShowcase ${skipped ? "is-skipped" : ""}`} id="work" aria-label="Rotating project showcase">
      <div className="projectScene">
        <div className="projectPadTrack" style={{ "--pad-track-top": `${padTrackTop}%` }} aria-hidden="true">
          {padTrackItems.map((pad, index) => (
            <div
              className="projectPad"
              key={`${pad.color}-${index}`}
              style={{
                "--project-accent": pad.color,
                "--pad-top": `${index * padPitchPercent}%`,
                "--pad-width": pad.width,
                "--pad-height": pad.height,
                "--pad-blur": pad.blur,
                "--pad-opacity": pad.opacity,
              }}
            />
          ))}
        </div>
        <div className="imageCube" style={{ "--rotation-step": rotationStep }}>
          {projects.map((project, index) => (
            <ProjectFace key={project.title} project={project} index={index} />
          ))}
        </div>
        <p className={`scrollHint ${hintDismissed ? "is-hidden" : ""}`}>Scroll for Next Project</p>
      </div>
    </section>
  );
}

function TopBar({ onWorkClick, isProjectDetail }) {
  return (
    <header className="topBar">
      <a className="brand" href={isProjectDetail ? "/" : "#home"} aria-label="Lee Gabin home">
        LEE GABIN
      </a>
      <nav aria-label="Primary navigation">
        <a href={isProjectDetail ? "/#work" : "#work"} onClick={onWorkClick}>WORK</a>
        <a href={isProjectDetail ? "/#about" : "#about"}>ABOUT</a>
        <a href={isProjectDetail ? "/#contact" : "#contact"}>CONTACT</a>
      </nav>
    </header>
  );
}

function DetailFigure({ image, index, className = "", children }) {
  const figureRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const figure = figureRef.current;
    if (!figure) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "0px 0px -14%",
        threshold: 0.16,
      },
    );

    observer.observe(figure);

    return () => observer.disconnect();
  }, []);

  return (
    <figure
      className={`detailFigure ${className} ${isVisible ? "is-visible" : ""}`}
      ref={figureRef}
      style={{ "--detail-index": index }}
    >
      <img src={image.src} alt={image.alt} />
      {children}
    </figure>
  );
}

function DetailVideo({ video, index, className = "" }) {
  const figureRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const figure = figureRef.current;
    if (!figure) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "0px 0px -14%",
        threshold: 0.16,
      },
    );

    observer.observe(figure);

    return () => observer.disconnect();
  }, []);

  return (
    <figure
      className={`detailFigure detailVideo ${className} ${isVisible ? "is-visible" : ""}`}
      ref={figureRef}
      style={{ "--detail-index": index }}
    >
      <video
        aria-label={video.title}
        autoPlay={video.autoPlay}
        controls={video.controls}
        loop={video.loop}
        muted={video.muted}
        playsInline
        preload="metadata"
        src={video.src}
      />
    </figure>
  );
}

function KulimaxGoodsMarquee() {
  const trackItems = [...kulimaxGoods, ...kulimaxGoods];

  return (
    <figure className="kulimaxGoodsMarquee" aria-label="Kulimax festival branded goods">
      <div className="kulimaxGoodsTrack">
        {trackItems.map((item, index) => (
          <img src={item.src} alt={index < kulimaxGoods.length ? item.alt : ""} aria-hidden={index >= kulimaxGoods.length} key={`${item.src}-${index}`} />
        ))}
      </div>
    </figure>
  );
}

function KulimaxBoothMarquee() {
  const trackItems = [...kulimaxBoothCards, ...kulimaxBoothCards];

  return (
    <figure className="kulimaxBoothMarquee" aria-label="Kulimax booth card news">
      <div className="kulimaxBoothTrack">
        {trackItems.map((item, index) => (
          <img src={item.src} alt={index < kulimaxBoothCards.length ? item.alt : ""} aria-hidden={index >= kulimaxBoothCards.length} key={`${item.src}-${index}`} />
        ))}
      </div>
    </figure>
  );
}

function KulimaxSocialShowcase() {
  const trackItems = [...kulimaxSocialImages, ...kulimaxSocialImages];

  return (
    <figure className="kulimaxSocialShowcase" aria-label="Kulimax Instagram phone mockups">
      <div className="kulimaxSocialTrack">
        {trackItems.map((item, index) => (
          <img src={item.src} alt={index < kulimaxSocialImages.length ? item.alt : ""} aria-hidden={index >= kulimaxSocialImages.length} key={`${item.src}-${index}`} />
        ))}
      </div>
    </figure>
  );
}

function ProjectDetail() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="detailPage" aria-label="e.o product design detail">
      <section className="detailIntro" aria-label="e.o project overview">
        <p className="detailLead">
          Cities are already equipped with advanced safety technologies,<br />
          and autonomous patrol robots have begun to appear. Yet we<br />
          still feel uneasy walking alone at night<br />
          and uncertain in unfamiliar places.
          <br />
          <br />
          That is where we began our question.<br />
          Closer. Gentler. Yet more reliable.<br />
          Filling the gaps left by conventional security systems and enabling<br />
          real-time response, e.o stands by your side-today and every day.
        </p>

        <dl className="detailMeta">
          <div>
            <dt>Nation</dt>
            <dd>Korea</dd>
          </div>
          <div>
            <dt>Discipline</dt>
            <dd>Product Design</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd>2026</dd>
          </div>
        </dl>
      </section>

      <section className="detailImageStream" aria-label="e.o project images">
        {detailImages.map((image, index) => (
          <DetailFigure image={image} index={index} key={image.src} />
        ))}
      </section>

      <footer className="detailOutro" aria-label="Portfolio footer">
        <a className="nextProject" href="/peloton-living" aria-label="Go to Peloton Living project">
          <span>Next project</span>
          <strong>Next project</strong>
        </a>

        <div className="footerLinks" aria-label="Social links">
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">Linkedin</a>
          <a href="https://www.behance.net/" target="_blank" rel="noreferrer">Behance</a>
        </div>

        <address className="footerContact">
          <a href="mailto:gabin7555@gmail.com">gabin7555@gmail.com</a>
          <a href="tel:+8210086815102">(+82) 010-8681-5102</a>
        </address>
      </footer>
    </main>
  );
}

function PelotonLivingDetail() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pelotonDetailPage" aria-label="Peloton Living project detail">
      <section className="pelotonIntro" aria-label="Peloton Living project overview">
        <p className="detailLead">
          PELOTON Living is a smart home ecosystem designed to promote healthier<br />
          lifestyles through connected indoor farming and wellness appliances.<br />
          The system integrates a smart planter, air purifier, juicer, and mobile<br />
          application to support the entire process from growing fresh produce<br />
          to consuming it. By combining IoT technology with thoughtful product<br />
          design, PELOTON Living encourages sustainable habits while making healthy<br />
          living simple, interactive, and accessible in everyday life.
        </p>

        <dl className="detailMeta">
          <div>
            <dt>Nation</dt>
            <dd>Korea</dd>
          </div>
          <div>
            <dt>Discipline</dt>
            <dd>Product UIUX</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd>2026</dd>
          </div>
        </dl>
      </section>

      <section className="pelotonImageStream" aria-label="Peloton Living project images">
        <DetailFigure image={pelotonPngImages.hero} index={0} className="pelotonHero" />

        <div className="pelotonSceneGrid">
          {pelotonPngImages.scenes.map((image, index) => (
            <DetailFigure image={image} index={index + 1} key={image.src} />
          ))}
        </div>

        {pelotonPngImages.frames.map((image, index) => (
          <DetailFigure
            image={image}
            index={index + 5}
            className={`pelotonFrame ${index === pelotonPngImages.frames.length - 1 ? "pelotonLineupFrame" : ""}`}
            key={image.src}
          />
        ))}
      </section>

      <footer className="detailOutro" aria-label="Portfolio footer">
        <a className="nextProject" href="/kulimax" aria-label="Go to Kulimax project">
          <span>Next project</span>
          <strong>Next project</strong>
        </a>

        <div className="footerLinks" aria-label="Social links">
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">Linkedin</a>
          <a href="https://www.behance.net/" target="_blank" rel="noreferrer">Behance</a>
        </div>

        <address className="footerContact">
          <a href="mailto:gabin7555@gmail.com">gabin7555@gmail.com</a>
          <a href="tel:+8210086815102">(+82) 010-8681-5102</a>
        </address>
      </footer>
    </main>
  );
}

function KulimaxDetail() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="detailPage" aria-label="Kulimax festival branding detail">
      <section className="detailIntro" aria-label="Kulimax project overview">
        <p className="detailLead">
          As a member of the Festival Promotion and Media Team, I<br />
          designed promotional content and contributed to the visual<br />
          branding of KULIMAX, helping create a vibrant festival<br />
          experience for thousands of students.<br />
          <br />
          My responsibilities included designing the main festival poster,<br />
          event posters, social media card news, the official festival booklet,<br />
          and promotional merchandise, ensuring a consistent visual identity<br />
          across both online and offline platforms.
        </p>

        <dl className="detailMeta">
          <div>
            <dt>Nation</dt>
            <dd>Korea</dd>
          </div>
          <div>
            <dt>Discipline</dt>
            <dd>Branding</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd>2026</dd>
          </div>
        </dl>
      </section>

      <section className="kulimaxImageStream" aria-label="Kulimax project images">
        <DetailVideo video={kulimaxVideo} index={0} className="kulimaxMainVideo" />
        <DetailFigure image={kulimaxImages.titleStrip} index={1} className="kulimaxTitleStrip" />

        <KulimaxGoodsMarquee />

        <KulimaxSocialShowcase />
        <KulimaxBoothMarquee />
      </section>

      <footer className="detailOutro" aria-label="Portfolio footer">
        <a className="nextProject" href="/peloton-living" aria-label="Go to previous project">
          <span>Previous project</span>
          <strong>Previous project</strong>
        </a>

        <div className="footerLinks" aria-label="Social links">
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">Linkedin</a>
          <a href="https://www.behance.net/" target="_blank" rel="noreferrer">Behance</a>
        </div>

        <address className="footerContact">
          <a href="mailto:gabin7555@gmail.com">gabin7555@gmail.com</a>
          <a href="tel:+8210086815102">(+82) 010-8681-5102</a>
        </address>
      </footer>
    </main>
  );
}

function App() {
  const [introSkipped, setIntroSkipped] = useState(() => window.location.hash === "#work");
  const isProjectDetail = window.location.pathname === "/e-o";
  const isPelotonLiving = window.location.pathname === "/peloton-living";
  const isKulimax = window.location.pathname === "/kulimax";

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (window.location.hash === "#work") {
      setIntroSkipped(true);
      window.scrollTo({ top: 0, behavior: "auto" });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  const showWork = (event) => {
    event.preventDefault();
    setIntroSkipped(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isProjectDetail) {
    return (
      <>
        <TopBar isProjectDetail />
        <ProjectDetail />
      </>
    );
  }

  if (isPelotonLiving) {
    return (
      <>
        <TopBar isProjectDetail />
        <PelotonLivingDetail />
      </>
    );
  }

  if (isKulimax) {
    return (
      <>
        <TopBar isProjectDetail />
        <KulimaxDetail />
      </>
    );
  }

  return (
    <>
      <TopBar onWorkClick={showWork} />

      <main>
        <ContinuousHero skipped={introSkipped} />
        <ProjectShowcase skipped={introSkipped} />
      </main>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
