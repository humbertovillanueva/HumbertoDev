"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";

const worldCupTracks = [
  { year: "1998", title: "The Cup of Life", artist: "Ricky Martin" },
  { year: "2002", title: "Boom", artist: "Anastacia" },
  { year: "2006", title: "The Time of Our Lives", artist: "Il Divo & Toni Braxton" },
  { year: "2010", title: "Waka Waka", artist: "Shakira ft. Freshlyground" },
  { year: "2010", title: "Wavin’ Flag", artist: "K’NAAN" },
  { year: "2014", title: "La La La", artist: "Shakira ft. Carlinhos Brown" },
  { year: "2018", title: "Live It Up", artist: "Nicky Jam, Will Smith & Era Istrefi" },
  { year: "2022", title: "Dreamers", artist: "Jung Kook & FIFA Sound" },
  { year: "2026", title: "Dai Dai", artist: "Shakira & Burna Boy" },
];

const supporterCountries = ["PER", "BRA", "JPN", "MAR", "FRA", "KOR", "NGA", "ARG", "MEX", "SEN", "CAN", "IND"];

const spectaHighlights = [
  { number: "01", title: "Multi-LLM architecture", text: "A provider-agnostic layer across Anthropic, OpenAI, and Gemini, powering an agentic assistant with real tool-calling." },
  { number: "02", title: "Semantic document search", text: "A custom embedding pipeline that turns messy building documents into structured, queryable intelligence." },
  { number: "03", title: "Failure-aware data engine", text: "Durable failure tracking and completeness-aware pipelines surface missing data instead of hiding it behind a confident number." },
  { number: "04", title: "Full-stack ownership", text: "Production features shipped end to end across a Fantom/JVM backend and Svelte 5 product experience." },
];

const spectaModules = [
  { icon: "▦", name: "Atlas", question: "Where am I? What do I have?", detail: "Portfolio, building, system, and equipment context in one path." },
  { icon: "▤", name: "Vault", question: "Where’s that spec?", detail: "AI-classified documents, linked equipment, and semantic search." },
  { icon: "↗", name: "Dispatch", question: "What needs fixing?", detail: "Issues move from open to resolved with every action traceable." },
  { icon: "✓", name: "Rounds", question: "What’s due?", detail: "Recurring inspections and field observations captured in context." },
  { icon: "◩", name: "Census", question: "What needs replacing?", detail: "Asset condition, remaining life, FCI, and capital planning." },
  { icon: "⌘", name: "Protocols", question: "Run the expert procedure.", detail: "Plain-English engineering workflows executed by AI at scale." },
  { icon: "✦", name: "Pulse", question: "Ask anything. Anywhere.", detail: "The agentic overlay that reasons and acts across every module." },
];

const experience = [
  { years: "2026—NOW", company: "kW Engineering", role: "Software Engineering Intern", detail: "Building Specta across AI architecture, document intelligence, data reliability, ontology tooling, and production product interfaces." },
  { years: "2024—NOW", company: "Ryder Last Mile", role: "IT & Customer Specialist", detail: "Technical support and troubleshooting for logistics systems in a fast-moving, customer-facing environment." },
  { years: "2023—2024", company: "Weber State University", role: "IT Support Specialist", detail: "Supported students, faculty, computer labs, and service operations while building a foundation in practical IT." },
];

const projects = [
  { title: "STEDI Mobile", type: "Cloud-connected mobile app", text: "React Native onboarding, UI workflows, BLE integration, input reliability, and EAS delivery pipelines.", stack: "REACT NATIVE · EXPO · JAVASCRIPT · BLE", href: "https://github.com/STEDI-Balance/stedi-web" },
  { title: "DispatchTrack Lite", type: "Full-stack delivery system", text: "A logistics application connecting a React interface, Java APIs, and an AWS serverless backend.", stack: "REACT · JAVA · LAMBDA · API GATEWAY", href: "https://github.com/humbertovillanueva" },
  { title: "Serverless API", type: "AWS cloud project", text: "A deployed REST API with infrastructure, endpoints, authentication, and troubleshooting handled end to end.", stack: "JAVA · AWS SAM · LAMBDA · API GATEWAY", href: "https://github.com/humbertovillanueva" },
];

const skills = ["Fantom", "Svelte 5", "TypeScript", "JavaScript", "Java", "Python", "SQL", "AWS", "Docker", "REST APIs", "LLM systems", "Semantic search"];

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>;
}

function GithubIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" d="M12 2.75a9.25 9.25 0 0 0-2.93 18.02c.46.09.63-.2.63-.45v-1.8c-2.56.56-3.1-1.09-3.1-1.09-.42-1.06-1.02-1.34-1.02-1.34-.83-.57.06-.56.06-.56.92.07 1.4.95 1.4.95.82 1.4 2.14 1 2.66.76.08-.59.32-1 .58-1.23-2.04-.23-4.19-1.02-4.19-4.57 0-1.01.36-1.83.95-2.48-.1-.23-.41-1.17.09-2.44 0 0 .77-.25 2.54.95A8.8 8.8 0 0 1 12 7.1a8.8 8.8 0 0 1 2.31.31c1.76-1.2 2.54-.95 2.54-.95.5 1.27.19 2.21.1 2.44.59.65.94 1.47.94 2.48 0 3.56-2.15 4.33-4.2 4.56.33.29.62.85.62 1.72v2.65c0 .25.17.54.64.45A9.25 9.25 0 0 0 12 2.75Z" /></svg>;
}

function MusicPlayer() {
  const [trackIndex, setTrackIndex] = useState(worldCupTracks.length - 1);
  const [preview, setPreview] = useState<{ index: number; previewUrl: string; appleUrl: string } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const track = worldCupTracks[trackIndex];
  const activePreview = preview?.index === trackIndex ? preview : null;

  const changeTrack = useCallback((direction: number) => {
    setIsPlaying(false);
    setTrackIndex((current) => (current + direction + worldCupTracks.length) % worldCupTracks.length);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const query = encodeURIComponent(`${track.title} ${track.artist}`);

    void fetch(`https://itunes.apple.com/search?term=${query}&country=US&media=music&entity=song&limit=5`, { signal: controller.signal })
      .then((response) => response.json())
      .then((data: { results?: Array<{ previewUrl?: string; trackViewUrl?: string }> }) => {
        const result = data.results?.find((item) => item.previewUrl);
        if (result?.previewUrl) {
          setPreview({ index: trackIndex, previewUrl: result.previewUrl, appleUrl: result.trackViewUrl ?? "https://music.apple.com/" });
        }
      })
      .catch(() => undefined);

    return () => controller.abort();
  }, [track.artist, track.title, trackIndex]);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio || !activePreview) return;

    if (isPlaying) {
      audio.pause();
    } else {
      void audio.play();
    }
  };

  return (
    <aside className="worldcup-player" aria-label="World Cup music player">
      <div className="player-buttons">
        <button type="button" onClick={() => changeTrack(-1)} aria-label="Previous World Cup song">◁</button>
        <button type="button" onClick={togglePlayback} disabled={!activePreview} aria-label={isPlaying ? "Pause song" : "Play song"}>{isPlaying ? "Ⅱ" : "▶"}</button>
        <button type="button" onClick={() => changeTrack(1)} aria-label="Next World Cup song">▷</button>
      </div>
      <div className="now-playing">
        <span>{track.year} WORLD CUP</span>
        <div><strong>{activePreview ? track.title : `LOADING ${track.title}...`}</strong><small>{track.artist}</small></div>
      </div>
      <a className="apple-link" href={activePreview?.appleUrl ?? "https://music.apple.com/"} target="_blank" rel="noreferrer">APPLE MUSIC ↗</a>
      {activePreview && <audio ref={audioRef} src={activePreview.previewUrl} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} preload="metadata" loop />}
    </aside>
  );
}

export default function Home() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const [playerPosition, setPlayerPosition] = useState({ x: 16, y: 24 });
  const [gameState, setGameState] = useState<"ready" | "too-far" | "kicking" | "goal" | "miss">("ready");
  const [goals, setGoals] = useState(0);

  const movePlayer = useCallback((xChange: number, yChange: number) => {
    if (gameState !== "ready") return;
    setPlayerPosition((current) => ({
      x: Math.min(78, Math.max(4, current.x + xChange)),
      y: Math.min(62, Math.max(8, current.y + yChange)),
    }));
  }, [gameState]);

  const kickBall = useCallback(() => {
    if (gameState !== "ready") return;
    if (playerPosition.x < 46) {
      setGameState("too-far");
    } else if (playerPosition.y > 44) {
      setGameState("miss");
    } else {
      setGameState("kicking");
    }
  }, [gameState, playerPosition.x, playerPosition.y]);

  const handleGameKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(event.code)) event.preventDefault();
    if (event.code === "ArrowUp") movePlayer(0, 4);
    if (event.code === "ArrowDown") movePlayer(0, -4);
    if (event.code === "ArrowLeft") movePlayer(-3, 0);
    if (event.code === "ArrowRight") movePlayer(3, 0);
    if (event.code === "Space") kickBall();
  };

  useEffect(() => {
    const handleGlobalGameKeys = (event: globalThis.KeyboardEvent) => {
      if (event.defaultPrevented || !["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(event.code)) return;
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, select, [contenteditable='true']")) return;

      const openingMatch = document.getElementById("top");
      const bounds = openingMatch?.getBoundingClientRect();
      if (!bounds || bounds.bottom <= 0 || bounds.top >= window.innerHeight) return;

      event.preventDefault();
      if (event.code === "ArrowUp") movePlayer(0, 4);
      if (event.code === "ArrowDown") movePlayer(0, -4);
      if (event.code === "ArrowLeft") movePlayer(-3, 0);
      if (event.code === "ArrowRight") movePlayer(3, 0);
      if (event.code === "Space") kickBall();
    };

    window.addEventListener("keydown", handleGlobalGameKeys);
    return () => window.removeEventListener("keydown", handleGlobalGameKeys);
  }, [kickBall, movePlayer]);

  useEffect(() => {
    if (gameState === "kicking") {
      const goalTimer = window.setTimeout(() => {
        setGoals((current) => current + 1);
        setGameState("goal");
      }, 650);
      return () => window.clearTimeout(goalTimer);
    }

    if (gameState === "goal") {
      const resetTimer = window.setTimeout(() => {
        setPlayerPosition({ x: 16, y: 24 });
        setGameState("ready");
      }, 1800);
      return () => window.clearTimeout(resetTimer);
    }

    if (gameState === "too-far" || gameState === "miss") {
      const retryTimer = window.setTimeout(() => setGameState("ready"), 1100);
      return () => window.clearTimeout(retryTimer);
    }
  }, [gameState]);

  const ballIsMoving = gameState === "kicking" || gameState === "goal" || gameState === "miss";
  const gameMessage = gameState === "goal" ? "GOOOOOL!" : gameState === "too-far" ? "GET CLOSER" : gameState === "miss" ? "OVER THE BAR!" : gameState === "kicking" ? "SHOT!" : "ARROWS MOVE · SPACE SHOOTS";

  return (
    <main className="pixel-site">
      <section className={`opening-match game-${gameState}`} id="top">
        <div className="pixel-sky" /><div className="pixel-crowd crowd-back" /><div className="pixel-crowd crowd-front" />
        <div className="fan-stands" aria-hidden="true">
          {Array.from({ length: 42 }, (_, index) => (
            <div className={`pixel-fan tone-${(index % 5) + 1} shirt-${(index % 8) + 1}`} key={`${supporterCountries[index % supporterCountries.length]}-${index}`}>
              <i className={`fan-flag flag-${(index % 6) + 1}`} /><i className="fan-head" /><i className="fan-body" /><i className="fan-arm fan-arm-left" /><i className="fan-arm fan-arm-right" />
            </div>
          ))}
        </div>
        <div className="match-score"><span>PER</span><b>4</b><i>:</i><b>1</b><span>FRA</span></div>
        <div className="opening-copy">
          <p className="pixel-kicker">PLAYER ONE · SOFTWARE ENGINEER</p>
          <h1>HUMBERTO<span>VILLANUEVA</span></h1>
          <p className="opening-lede">I build software for the messy real world—AI systems, reliable data, and products people can actually trust.</p>
        </div>
        <div className={`pixel-field game-${gameState}`} ref={fieldRef} role="application" aria-label="Playable soccer pitch. Use the arrow keys to move number 7 and press space to shoot." tabIndex={0} onKeyDown={handleGameKeyDown} onClick={() => fieldRef.current?.focus()}>
          <div className="field-stripe" /><div className="field-center-line" /><div className="field-circle" /><div className="pixel-goal" />
          <div className="pixel-keeper"><i className="keeper-head" /><i className="keeper-body" /><i className="keeper-arm keeper-arm-left" /><i className="keeper-arm keeper-arm-right" /><i className="keeper-leg keeper-leg-left" /><i className="keeper-leg keeper-leg-right" /></div>
          <div className="controlled-player" style={{ left: `${playerPosition.x}%`, bottom: `${playerPosition.y}%` }} aria-hidden="true">
            <div className="pixel-runner">
              <i className="runner-hair" /><i className="runner-head" /><i className="runner-shirt" />
              <i className="runner-arm runner-arm-one" /><i className="runner-arm runner-arm-two" />
              <i className="runner-shorts" /><i className="runner-leg runner-leg-one" /><i className="runner-leg runner-leg-two" />
            </div>
          </div>
          <div className={`pixel-ball game-ball ${ballIsMoving ? "ball-shot" : ""}`} style={{ left: ballIsMoving ? "91%" : `calc(${playerPosition.x}% + 56px)`, bottom: gameState === "miss" ? "72%" : ballIsMoving ? "27%" : `calc(${playerPosition.y}% + 7px)` }} aria-hidden="true"><span /></div>
          <div className="game-hud"><span>{gameMessage}</span><strong>YOUR GOALS {String(goals).padStart(2, "0")}</strong></div>
          <div className="game-controls" aria-label="On-screen soccer controls">
            <button type="button" onClick={() => movePlayer(0, 4)} aria-label="Move up">↑</button>
            <button type="button" onClick={() => movePlayer(-3, 0)} aria-label="Move left">←</button>
            <button type="button" onClick={() => movePlayer(0, -4)} aria-label="Move down">↓</button>
            <button type="button" onClick={() => movePlayer(3, 0)} aria-label="Move right">→</button>
            <button className="kick-button" type="button" onClick={kickBall}>SPACE · SHOOT</button>
          </div>
          <div className="goal-call">GOOOOOL!</div>
          <div className="goal-confetti">{Array.from({ length: 24 }, (_, index) => <i key={index} />)}</div>
        </div>
        <a className="scroll-cue" href="#specta"><span>SCROLL TO KICK OFF</span><i>↓</i></a>
      </section>

      <div className="match-ticker" aria-hidden="true"><div>
        <span>FULL-STACK ENGINEERING</span><i>✦</i><span>AI SYSTEMS</span><i>✦</i><span>BUILDING INTELLIGENCE</span><i>✦</i><span>PRODUCT DESIGN</span><i>✦</i>
        <span>FULL-STACK ENGINEERING</span><i>✦</i><span>AI SYSTEMS</span><i>✦</i><span>BUILDING INTELLIGENCE</span><i>✦</i><span>PRODUCT DESIGN</span><i>✦</i>
      </div></div>

      <section className="specta-section page-section" id="specta">
        <div className="section-intro"><span className="section-tag">FEATURED BUILD / 01</span><p>THE BIGGEST THING I&apos;M BUILDING RIGHT NOW</p></div>
        <div className="specta-title-row">
          <div><span className="live-badge"><i /> LIVE PLATFORM</span><h2>SPECTA<span>®</span></h2></div>
          <p>One building. Every data source. One truth—organized into a platform operators can actually use and trust.</p>
        </div>
        <div className="specta-console">
          <div className="console-topbar"><span>SPECTA // BUILDING INTELLIGENCE</span><span>TRUST LAYER: ACTIVE</span></div>
          <div className="console-grid">
            <div className="building-map" aria-hidden="true">
              <div className="building-core"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
              <span className="map-node node-one">ATLAS</span><span className="map-node node-two">VAULT</span><span className="map-node node-three">DISPATCH</span><span className="map-node node-four">PULSE</span>
            </div>
            <div className="console-copy"><span>MISSION BRIEF</span><h3>Make the hidden systems inside a building understandable.</h3><p>Specta brings BAS data, documents, meters, work orders, analytics, and human input into one model. Its agent can read across that whole picture, run engineering protocols, answer questions, and take action—not just chat.</p><div className="specta-stack">FANTOM · SVELTE 5 · TAILWIND V4 · SHADCN · ANTHROPIC · OPENAI · GEMINI</div></div>
          </div>
        </div>
        <div className="specta-module-heading"><span>THE PRODUCT ROSTER</span><p>OPERATIONS + INTELLIGENCE · LIVE ACROSS ONE INTERFACE</p></div>
        <div className="specta-module-grid">
          {spectaModules.map((module, index) => <article className="specta-module" key={module.name}><div className="specta-module-icon" aria-hidden="true">{module.icon}</div><span>0{index + 1}</span><h3>{module.name}</h3><strong>{module.question}</strong><p>{module.detail}</p></article>)}
        </div>
        <div className="specta-trust-strip"><span>RUNS ON YOUR INFRASTRUCTURE</span><i>✦</i><span>BRING YOUR OWN AI</span><i>✦</i><span>OPEN DATA MODEL</span><i>✦</i><span>NO SILENT FAILURES</span></div>
        <div className="highlight-grid">{spectaHighlights.map((item) => <article className="highlight-card" key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      </section>

      <section className="experience-section page-section" id="experience">
        <div className="section-heading"><span className="section-tag">CAREER MODE / 02</span><h2>THE ROAD<br />SO FAR</h2><p>From supporting real people and systems to owning production AI features end to end.</p></div>
        <div className="career-table">
          <div className="career-table-head"><span>SEASON</span><span>CLUB</span><span>POSITION</span><span>IMPACT</span></div>
          {experience.map((item) => <article className="career-row" key={item.company}><span className="career-years">{item.years}</span><strong>{item.company}</strong><h3>{item.role}</h3><p>{item.detail}</p></article>)}
        </div>
        <div className="education-strip"><span>EDUCATION</span><div><strong>B.S. SOFTWARE ENGINEERING</strong><small>Ensign College · 2026 · GPA 3.5</small></div><div><strong>COMPUTER SCIENCE CERTIFICATE</strong><small>Weber State University · 2024</small></div></div>
      </section>

      <section className="work-section page-section" id="work">
        <div className="section-heading compact-heading"><span className="section-tag">SIDE QUESTS / 03</span><h2>MORE BUILDS</h2><p>Specta is the main match. These projects helped build the player.</p></div>
        <div className="project-list">{projects.map((project, index) => <a className="pixel-project" href={project.href} target="_blank" rel="noreferrer" key={project.title}><span className="project-index">0{index + 1}</span><div><small>{project.type}</small><h3>{project.title}</h3></div><p>{project.text}</p><span className="project-stack">{project.stack}</span><ArrowIcon /></a>)}</div>
      </section>

      <section className="skills-section page-section">
        <div className="skills-copy"><span className="section-tag">PLAYER ATTRIBUTES / 04</span><h2>THE<br />ROSTER</h2><p>I care less about collecting tools and more about knowing how to connect them into dependable systems.</p></div>
        <div className="skill-board">{skills.map((skill, index) => <div className="skill-slot" key={skill}><span>{String(index + 1).padStart(2, "0")}</span><strong>{skill}</strong><i>{index < 6 ? "88" : "84"}</i></div>)}</div>
      </section>

      <section className="about-section page-section" id="about">
        <div className="passport-card"><span className="passport-top">PLAYER PROFILE // HV07</span><div className="pixel-avatar" aria-hidden="true"><i className="avatar-hair" /><i className="avatar-face" /><i className="avatar-shirt" /></div><div className="passport-stats"><span><small>FROM</small>LIMA, PERU</span><span><small>BASED</small>UTAH, USA</span><span><small>CLUB</small>REAL MADRID</span><span><small>MINDSET</small>LOCKED IN</span></div></div>
        <div className="about-copy-new"><span className="section-tag">OFF THE PITCH / 05</span><h2>THE PERSON<br />BEHIND THE WORK.</h2><p>I came from Peru to the United States to build a future through software. Family and faith keep me grounded. Football keeps me competitive. Curiosity keeps me building.</p><p>I&apos;m happiest when I&apos;m solving a hard problem with good people—then watching Real Madrid and arguing about the match afterward.</p></div>
      </section>

      <section className="contact-section" id="contact"><span className="section-tag">FINAL WHISTLE / 06</span><h2>LET&apos;S BUILD<br /><span>THE NEXT ONE.</span></h2><p>I&apos;m interested in ambitious teams, useful AI, strong product thinking, and problems that matter in the real world.</p><div className="contact-links"><a href="https://www.linkedin.com/in/humberto-villanueva-753084347" target="_blank" rel="noreferrer">LINKEDIN <ArrowIcon /></a><a href="https://github.com/humbertovillanueva" target="_blank" rel="noreferrer">GITHUB <GithubIcon /></a></div></section>
      <footer className="pixel-footer"><span>© 2026 HUMBERTO VILLANUEVA</span><span>BUILT FROM PERU TO UTAH</span><a href="#top">PLAY AGAIN ↑</a></footer>
      <MusicPlayer />
    </main>
  );
}
