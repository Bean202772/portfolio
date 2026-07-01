import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const RABBIT_LINE_PATH =
  "M132 154 C126 132 110 118 92 116 C75 115 69 128 75 145 C81 163 98 177 112 184 C74 136 58 91 79 78 C96 69 144 111 208 136 C288 168 365 165 381 128 C390 107 386 74 421 62 C441 55 482 61 505 73 C527 85 551 119 550 150 C549 170 536 181 514 181 C486 181 459 160 453 140 C448 122 459 110 475 111 C493 112 508 137 511 168 C516 219 481 252 420 274 C376 289 348 311 318 345 C362 354 395 371 400 390 C403 399 397 402 387 398 C346 383 310 375 277 384 C259 389 239 404 220 406 C205 408 195 402 197 393 C200 380 225 373 247 371 C231 340 198 307 159 286 C128 270 110 257 96 235 C85 218 77 198 65 185 C52 169 31 163 21 148 C12 135 12 119 22 116 C35 112 51 127 65 145 M245 244 C224 233 205 212 210 198 C216 181 250 180 282 188 C320 198 339 219 327 249 C318 274 296 293 285 323 M427 70 C391 67 302 58 275 45 C254 35 258 19 282 16 C323 11 416 35 500 69 M333 339 C350 304 379 268 405 257 C421 251 424 260 411 273 C390 290 368 306 347 331";

const projects = [
  {
    title: "Product Design",
    image: "/frame-2.png",
    alt: "Product Design project preview",
    kicker: ["Observe", "Connect", "Protect"],
    headline: ["Guardians", "Above"],
    accent: "#e9ddd4",
  },
  {
    title: "Product UIUX",
    image: "/ar-3.png",
    alt: "Product UIUX project preview",
    kicker: ["Life", "Care", "Flow"],
    headline: ["Healthy", "Expansion"],
    accent: "#e5e0da",
  },
  {
    title: "festival-Brand",
    image: "festival-branding.png",
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
  return (
    <article
      className="projectFace"
      aria-label={`${project.title} project face`}
      style={{ "--face-index": index }}
    >
      <div className="projectContent">
        <div className="projectMedia">
          <img src={project.image} alt={project.alt} />
          <div className="projectOverlay" aria-hidden="true">
            <p>{project.kicker.map((line) => <span key={line}>{line}</span>)}</p>
            <h2>{project.headline.map((line) => <span key={line}>{line}</span>)}</h2>
          </div>
        </div>
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

function App() {
  const [introSkipped, setIntroSkipped] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  const showWork = (event) => {
    event.preventDefault();
    setIntroSkipped(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header className="topBar">
        <a className="brand" href="#home" aria-label="Lee Gabin home">
          LEE GABIN
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work" onClick={showWork}>WORK</a>
          <a href="#about">ABOUT</a>
          <a href="#contact">CONTACT</a>
        </nav>
      </header>

      <main>
        <ContinuousHero skipped={introSkipped} />
        <ProjectShowcase skipped={introSkipped} />
      </main>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
