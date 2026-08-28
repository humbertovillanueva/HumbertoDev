"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";

const worldCupTracks = [
  { year: "2010", title: "Waka Waka (This Time for Africa)", artist: "Shakira ft. Freshlyground" },
  { year: "2010", title: "Wavin’ Flag", artist: "K’NAAN" },
  { year: "2014", title: "La La La (Brazil 2014)", artist: "Shakira ft. Carlinhos Brown" },
  { year: "2014", title: "Magic in the Air", artist: "Magic System ft. Chawki" },
  { year: "2022", title: "Dreamers", artist: "Jung Kook & FIFA Sound" },
  { year: "2026", title: "Dai Dai", artist: "Shakira & Burna Boy" },
  { year: "ANTHEM", title: "We Are the Champions", artist: "Queen" },
];

const experience = [
  { years: "2026—NOW", company: "kW Engineering", role: "Software Engineer", detail: "Contributing to kW Engineering’s Specta product across AI architecture, document intelligence, data reliability, ontology tooling, and production interfaces." },
  { years: "2024—MAY 2026", company: "Ryder Last Mile", role: "IT & Customer Specialist", detail: "Provided technical support and troubleshooting for logistics systems in a fast-moving, customer-facing environment." },
  { years: "2023—2024", company: "Weber State University", role: "IT Support Specialist", detail: "Supported students, faculty, computer labs, and service operations while building a foundation in practical IT." },
];

const projects = [
  { title: "STEDI Mobile", type: "Cloud-connected mobile app", text: "React Native onboarding, UI workflows, BLE integration, input reliability, and EAS delivery pipelines.", stack: "REACT NATIVE · EXPO · JAVASCRIPT · BLE" },
  { title: "DispatchTrack Lite", type: "Full-stack delivery system", text: "A logistics application connecting a React interface, Java APIs, and an AWS serverless backend.", stack: "REACT · JAVA · LAMBDA · API GATEWAY" },
  { title: "Serverless API", type: "AWS cloud project", text: "A deployed REST API with infrastructure, endpoints, authentication, and troubleshooting handled end to end.", stack: "JAVA · AWS SAM · LAMBDA · API GATEWAY" },
];

const skills = [
  { name: "Fantom", context: "PRODUCTION" }, { name: "Svelte 5", context: "PRODUCTION" },
  { name: "TypeScript", context: "PRODUCT" }, { name: "JavaScript", context: "PRODUCT" },
  { name: "Java", context: "FULL STACK" }, { name: "Python", context: "WORKING" },
  { name: "SQL", context: "WORKING" }, { name: "AWS", context: "DEPLOYED" },
  { name: "Docker", context: "FOUNDATION" }, { name: "REST APIs", context: "DEPLOYED" },
  { name: "LLM systems", context: "PRODUCTION" }, { name: "Semantic search", context: "PRODUCTION" },
];

const flags = ["PER", "ARG", "BRA", "ESP", "FRA", "JPN", "MAR", "KOR"];

function ArrowIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>; }
function GithubIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" d="M12 2.75a9.25 9.25 0 0 0-2.93 18.02c.46.09.63-.2.63-.45v-1.8c-2.56.56-3.1-1.09-3.1-1.09-.42-1.06-1.02-1.34-1.02-1.34-.83-.57.06-.56.06-.56.92.07 1.4.95 1.4.95.82 1.4 2.14 1 2.66.76.08-.59.32-1 .58-1.23-2.04-.23-4.19-1.02-4.19-4.57 0-1.01.36-1.83.95-2.48-.1-.23-.41-1.17.09-2.44 0 0 .77-.25 2.54.95A8.8 8.8 0 0 1 12 7.1a8.8 8.8 0 0 1 2.31.31c1.76-1.2 2.54-.95 2.54-.95.5 1.27.19 2.21.1 2.44.59.65.94 1.47.94 2.48 0 3.56-2.15 4.33-4.2 4.56.33.29.62.85.62 1.72v2.65c0 .25.17.54.64.45A9.25 9.25 0 0 0 12 2.75Z" /></svg>; }

function SpectaMark() {
  return <svg className="specta-mark" viewBox="0 0 320 320" aria-hidden="true"><path d="M96 82 262 18l-14 43-166 64 14-43Z" /><path d="m66 144 152-58-14 43-152 58 14-43Z" /><path d="m138 151 136-52-14 43-136 52 14-43Z" /><path d="m82 219 166-64-14 43-166 64 14-43Z" /></svg>;
}

function MusicPlayer() {
  const [trackIndex, setTrackIndex] = useState(0);
  const [preview, setPreview] = useState<{ index: number; previewUrl: string; appleUrl: string } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const continuePlaybackRef = useRef(false);
  const track = worldCupTracks[trackIndex];
  const activePreview = preview?.index === trackIndex ? preview : null;

  const changeTrack = useCallback((direction: number) => {
    if (isPlaying) continuePlaybackRef.current = true;
    setIsPlaying(false);
    setTrackIndex((current) => (current + direction + worldCupTracks.length) % worldCupTracks.length);
  }, [isPlaying]);

  useEffect(() => {
    const controller = new AbortController();
    const query = encodeURIComponent(`${track.title} ${track.artist}`);
    void fetch(`https://itunes.apple.com/search?term=${query}&country=US&media=music&entity=song&limit=5`, { signal: controller.signal })
      .then((response) => response.json())
      .then((data: { results?: Array<{ previewUrl?: string; trackViewUrl?: string }> }) => {
        const result = data.results?.find((item) => item.previewUrl);
        if (result?.previewUrl) setPreview({ index: trackIndex, previewUrl: result.previewUrl, appleUrl: result.trackViewUrl ?? "https://music.apple.com/" });
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, [track.artist, track.title, trackIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !activePreview || !continuePlaybackRef.current) return;
    void audio.play().catch(() => { continuePlaybackRef.current = false; setIsPlaying(false); });
  }, [activePreview]);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio || !activePreview) return;
    if (isPlaying) { continuePlaybackRef.current = false; audio.pause(); }
    else {
      continuePlaybackRef.current = true;
      void audio.play().catch(() => { continuePlaybackRef.current = false; setIsPlaying(false); });
    }
  };

  return <aside className="worldcup-player" aria-label="World Cup music player">
    <span className="music-label">SOUND</span>
    <div className="player-buttons"><button type="button" onClick={() => changeTrack(-1)} aria-label="Previous World Cup song">◀</button><button type="button" onClick={togglePlayback} disabled={!activePreview} aria-label={isPlaying ? "Pause song" : "Play song"}>{isPlaying ? "Ⅱ" : "▶"}</button><button type="button" onClick={() => changeTrack(1)} aria-label="Next World Cup song">▶</button></div>
    <div className="now-playing"><span>{track.year}</span><strong>{activePreview ? track.title : `LOADING ${track.title}...`}</strong><small>{track.artist}</small></div>
    <a className="apple-link" href={activePreview?.appleUrl ?? "https://music.apple.com/"} target="_blank" rel="noreferrer">↗</a>
    {activePreview && <audio ref={audioRef} src={activePreview.previewUrl} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} preload="metadata" loop />}
  </aside>;
}

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  return <article className="game-cartridge"><span className="cartridge-number">0{index + 2}</span><div className="cartridge-title"><small>{project.type}</small><h3>{project.title}</h3></div><p>{project.text}</p><span className="cartridge-stack">{project.stack}</span><i>READY</i></article>;
}

export default function Home() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const [playerPosition, setPlayerPosition] = useState({ x: 16, y: 24 });
  const [gameState, setGameState] = useState<"ready" | "too-far" | "kicking" | "goal" | "miss">("ready");
  const [goals, setGoals] = useState(0);

  const movePlayer = useCallback((xChange: number, yChange: number) => {
    if (gameState !== "ready") return;
    setPlayerPosition((current) => ({ x: Math.min(78, Math.max(4, current.x + xChange)), y: Math.min(62, Math.max(8, current.y + yChange)) }));
  }, [gameState]);

  const kickBall = useCallback(() => {
    if (gameState !== "ready") return;
    if (playerPosition.x < 46) setGameState("too-far");
    else if (playerPosition.y > 44) setGameState("miss");
    else setGameState("kicking");
  }, [gameState, playerPosition.x, playerPosition.y]);

  useEffect(() => {
    const handleGlobalGameKeys = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if ((event.target as HTMLElement | null)?.closest("a, button, input, textarea, select, summary, [contenteditable='true']")) return;
      const field = fieldRef.current;
      if (!field) return;
      const bounds = field.getBoundingClientRect();
      if (bounds.bottom <= 0 || bounds.top >= window.innerHeight) return;
      if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(event.code)) return;
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
    if (gameState === "kicking") { const timer = window.setTimeout(() => { setGoals((current) => current + 1); setGameState("goal"); }, 650); return () => window.clearTimeout(timer); }
    if (gameState === "goal") { const timer = window.setTimeout(() => { setPlayerPosition({ x: 16, y: 24 }); setGameState("ready"); }, 1800); return () => window.clearTimeout(timer); }
    if (gameState === "too-far" || gameState === "miss") { const timer = window.setTimeout(() => setGameState("ready"), 1100); return () => window.clearTimeout(timer); }
  }, [gameState]);

  const ballIsMoving = gameState === "kicking" || gameState === "goal" || gameState === "miss";
  const gameMessage = gameState === "goal" ? "GOOOOOL!" : gameState === "too-far" ? "GET CLOSER" : gameState === "miss" ? "OVER THE BAR!" : gameState === "kicking" ? "SHOT!" : "ARROWS MOVE · SPACE SHOOTS";

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nCompany: ${company || "Not provided"}\n\nMessage:\n${message}`);
    window.location.href = `mailto:hachevillanueva99@gmail.com?subject=${subject}&body=${body}`;
  };

  return <main className="retro-site">
    <MusicPlayer />
    <header className="game-header"><nav className="game-nav" aria-label="Primary navigation"><a href="#work">PROJECTS</a><a href="#experience">CAREER</a><a href="#skills">SKILLS</a><a href="#about">PROFILE</a></nav><details className="mobile-nav"><summary>MENU</summary><nav aria-label="Mobile navigation"><a href="#work">Projects</a><a href="#experience">Career</a><a href="#skills">Skills</a><a href="#about">Profile</a><a href="#contact">Contact</a></nav></details><a className="header-cta" href="#contact">CONTACT</a></header>

    <section className={`title-screen game-${gameState}`} id="top">
      <div className="stadium-crowd crowd-upper" aria-hidden="true" /><div className="flag-rail" aria-hidden="true">{flags.concat(flags).map((flag, index) => <span className={`rail-${(index % 6) + 1}`} key={`${flag}-${index}`}>{flag}</span>)}</div><div className="stadium-crowd crowd-lower" aria-hidden="true" />
      <div className="title-lockup"><h1 aria-label="Humberto Villanueva"><span aria-hidden="true">HUMBERTO</span><strong aria-hidden="true">VILLANUEVA</strong></h1></div>
      <div className="hero-console"><div className="role-ribbon">SOFTWARE ENGINEER · AI + FULL STACK</div><p className="hero-blurb">I turn complicated systems into dependable software that works in the real world.</p><div className="title-actions"><a href="#work">▶ VIEW PROJECTS</a><a href="#contact">CONTACT</a></div><span className="press-start">● PRESS START</span></div>
      <div className="fan-stands" aria-hidden="true">{Array.from({ length: 44 }, (_, index) => <div className={`pixel-fan tone-${(index % 5) + 1} shirt-${(index % 8) + 1}`} key={index}><i className={`fan-flag flag-${(index % 6) + 1}`} /><i className="fan-head" /><i className="fan-body" /><i className="fan-arm fan-arm-left" /><i className="fan-arm fan-arm-right" /></div>)}</div>
      <div className={`pixel-field game-${gameState}`} id="pitch" ref={fieldRef} role="application" aria-label="Playable soccer pitch. While the pitch is visible, use arrow keys to move number 7 and press space to shoot.">
        <div className="field-perspective" /><div className="field-center-line" /><div className="field-circle" /><div className="pixel-goal" />
        <div className="pixel-keeper"><i className="keeper-head" /><i className="keeper-body" /><i className="keeper-arm keeper-arm-left" /><i className="keeper-arm keeper-arm-right" /><i className="keeper-leg keeper-leg-left" /><i className="keeper-leg keeper-leg-right" /></div>
        <div className="controlled-player" style={{ left: `${playerPosition.x}%`, bottom: `${playerPosition.y}%` }} aria-hidden="true"><div className="pixel-runner"><i className="runner-hair" /><i className="runner-head" /><i className="runner-shirt" /><i className="runner-arm runner-arm-one" /><i className="runner-arm runner-arm-two" /><i className="runner-shorts" /><i className="runner-leg runner-leg-one" /><i className="runner-leg runner-leg-two" /></div></div>
        <div className={`pixel-ball game-ball ${ballIsMoving ? "ball-shot" : ""}`} style={{ left: ballIsMoving ? "91%" : `calc(${playerPosition.x}% + 56px)`, bottom: gameState === "miss" ? "72%" : ballIsMoving ? "27%" : `calc(${playerPosition.y}% + 7px)` }} aria-hidden="true"><span /></div>
        <div className="game-hud"><span>P1 · {gameMessage}</span><strong>GOALS {String(goals).padStart(2, "0")}</strong></div>
        <div className="game-controls" aria-label="On-screen soccer controls"><button type="button" onClick={() => movePlayer(0, 4)} aria-label="Move up">↑</button><button type="button" onClick={() => movePlayer(-3, 0)} aria-label="Move left">←</button><button type="button" onClick={() => movePlayer(0, -4)} aria-label="Move down">↓</button><button type="button" onClick={() => movePlayer(3, 0)} aria-label="Move right">→</button><button className="kick-button" type="button" onClick={kickBall}>A · SHOOT</button></div><div className="goal-call">GOAL!</div><div className="goal-confetti">{Array.from({ length: 24 }, (_, index) => <i key={index} />)}</div>
      </div>
    </section>

    <div className="game-ticker" aria-hidden="true"><div><span>FULL-STACK ENGINEERING</span><i>★</i><span>AI SYSTEMS</span><i>★</i><span>BUILDING INTELLIGENCE</span><i>★</i><span>PRODUCT DESIGN</span><i>★</i><span>FULL-STACK ENGINEERING</span><i>★</i><span>AI SYSTEMS</span><i>★</i><span>BUILDING INTELLIGENCE</span><i>★</i><span>PRODUCT DESIGN</span><i>★</i></div></div>

    <section className="game-screen projects-screen" id="work"><div className="screen-heading"><span>STAGE 01</span><h2>PROJECT SELECT</h2><p>Current product work and selected independent builds.</p></div><article className="active-mission"><div className="window-bar"><span>ACTIVE CLUB MISSION</span><b>01</b></div><div className="mission-body"><div className="mission-logo"><SpectaMark /><span>SPECTA</span></div><div className="mission-copy"><span className="mission-status"><i /> ONGOING AT kW ENGINEERING</span><h3>SPECTA</h3><p className="ownership-note"><strong>IMPORTANT:</strong> Specta is a kW Engineering product. It is not my personal software.</p><p>At my current job as a Software Engineer at kW Engineering, I contribute across AI integration, document intelligence, data reliability, and production product experiences for building operators.</p><div className="mission-skills"><span>AI SYSTEMS</span><span>DOCUMENT INTELLIGENCE</span><span>FULL-STACK PRODUCT</span></div></div></div></article><div className="select-label"><span>SELECT A BUILD</span><b>02—04</b></div><div className="cartridge-grid">{projects.map((project, index) => <ProjectCard project={project} index={index} key={project.title} />)}</div></section>

    <section className="game-screen career-screen" id="experience"><div className="screen-heading light-heading"><span>STAGE 02</span><h2>CAREER SAVE DATA</h2><p>From practical IT support to production software engineering.</p></div><div className="save-window"><div className="window-bar"><span>SAVE FILE // HUMBERTO_07</span><b>ACTIVE</b></div><div className="career-head"><span>SEASON</span><span>TEAM</span><span>POSITION</span><span>MATCH NOTES</span></div>{experience.map((item, index) => <article className="career-row" key={item.company}><span className="save-slot">0{index + 1}</span><span className="career-years">{item.years}</span><strong>{item.company}</strong><h3>{item.role}</h3><p>{item.detail}</p></article>)}</div><div className="education-window"><span>TRAINING CAMP</span><div><strong>B.S. SOFTWARE ENGINEERING</strong><small>Ensign College · 2026 · GPA 3.5</small></div><div><strong>COMPUTER SCIENCE CERTIFICATE</strong><small>Weber State University · 2024</small></div></div></section>

    <section className="game-screen skills-screen" id="skills"><div className="screen-heading"><span>STAGE 03</span><h2>PLAYER ATTRIBUTES</h2><p>Tools connected into dependable systems—not trophies collected for display.</p></div><div className="stats-console"><aside className="player-card"><div className="card-top"><span>PLAYER 1</span><b>07</b></div><div className="pixel-avatar" aria-hidden="true"><i className="avatar-hair" /><i className="avatar-face" /><i className="avatar-shirt" /></div><strong>H. VILLANUEVA</strong><small>SOFTWARE ENGINEER</small><div className="card-flags"><span>PER</span><i>→</i><span>USA</span></div></aside><div className="skill-board">{skills.map((skill, index) => <div className="skill-slot" key={skill.name}><span>{String(index + 1).padStart(2, "0")}</span><strong>{skill.name}</strong><i>{skill.context}</i></div>)}</div></div></section>

    <section className="game-screen profile-screen" id="about"><div className="screen-heading light-heading"><span>STAGE 04</span><h2>PLAYER PROFILE</h2><p>The person behind the work.</p></div><div className="profile-window"><div className="profile-facts"><span><small>HOME</small>LIMA, PERU</span><span><small>BASE</small>UTAH, USA</span><span><small>CLUB</small>REAL MADRID</span><span><small>NUMBER</small>07</span></div><div className="profile-story"><p>I came from Peru to the United States to build a future through software. Family and faith keep me grounded. Football keeps me competitive. Curiosity keeps me building.</p><p>I&apos;m happiest when I&apos;m solving a hard problem with good people—then watching Real Madrid and arguing about the match afterward.</p><span>● READY FOR THE NEXT CHALLENGE</span></div></div></section>

    <section className="continue-screen" id="contact"><span>FINAL STAGE</span><h2>CONTINUE?</h2><div className="contact-terminal"><div className="window-bar"><span>MESSAGE TERMINAL // NEW TRANSMISSION</span><b>ONLINE</b></div><div className="contact-terminal-body"><form className="message-form" onSubmit={handleContactSubmit}><label><span>YOUR NAME *</span><input type="text" name="name" autoComplete="name" required /></label><label><span>YOUR EMAIL *</span><input type="email" name="email" autoComplete="email" required /></label><label><span>COMPANY / TEAM</span><input type="text" name="company" autoComplete="organization" /></label><label className="message-field"><span>MESSAGE *</span><textarea name="message" rows={6} required /></label><button type="submit">▶ SEND MESSAGE</button></form><aside className="contact-channel"><span>CHANNEL 07</span><h3>LET&apos;S BUILD THE NEXT ONE.</h3><p>Tell me who you are, what you&apos;re building, and where I can help.</p><small>Submitting opens your email app with the transmission ready to send.</small><a href="mailto:hachevillanueva99@gmail.com">HACHEVILLANUEVA99@GMAIL.COM</a><div className="continue-options"><a href="https://www.linkedin.com/in/humberto-villanueva-753084347" target="_blank" rel="noreferrer"><i>▶</i> LINKEDIN <ArrowIcon /></a><a href="https://github.com/humbertovillanueva" target="_blank" rel="noreferrer"><i>▶</i> GITHUB <GithubIcon /></a></div></aside></div></div></section>
    <footer className="game-footer"><span>© 2026 HUMBERTO VILLANUEVA</span><span>MADE IN PERU · BUILT IN UTAH</span><a href="#top">RESTART ↑</a></footer>
  </main>;
}
