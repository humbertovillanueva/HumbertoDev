"use client";

import Image from "next/image";
import { ProjectPreview, ProjectEvidence } from "./project-evidence";
import { ContactForm } from "./contact-form";
import { SocialProfileLinks } from "./social-profile-links";

import projects from "./projects.json";
import { ProjectLinks } from "./project-links";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";

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
  { years: "2026 to present", company: "kW Engineering", role: "Software Engineer", detail: "Contributing to kW Engineering’s Specta product across AI architecture, document intelligence, data reliability, ontology tooling, and production interfaces." },
  { years: "2024 to May 2026", company: "Ryder Last Mile", role: "IT & Customer Specialist", detail: "Troubleshot logistics systems and helped customers resolve technical issues." },
  { years: "2023 to 2024", company: "Weber State University", role: "IT Support Specialist", detail: "Helped students and faculty with technical issues and supported campus computer labs." },
];



const skills = [
  { name: "Fantom", context: "PRODUCTION" }, { name: "Svelte 5", context: "PRODUCTION" },
  { name: "TypeScript", context: "PRODUCT" }, { name: "JavaScript", context: "PRODUCT" },
  { name: "Java", context: "FULL STACK" }, { name: "Python", context: "WORKING" },
  { name: "SQL", context: "WORKING" }, { name: "AWS", context: "DEPLOYED" },
  { name: "Docker", context: "FOUNDATION" }, { name: "REST APIs", context: "DEPLOYED" },
  { name: "LLM systems", context: "PRODUCTION" }, { name: "Semantic search", context: "PRODUCTION" },
];



function SpectaMark() {
  return <svg className="specta-mark" viewBox="0 0 320 320" aria-hidden="true"><path d="M96 82 262 18l-14 43-166 64 14-43Z" /><path d="m66 144 152-58-14 43-152 58 14-43Z" /><path d="m138 151 136-52-14 43-136 52 14-43Z" /><path d="m82 219 166-64-14 43-166 64 14-43Z" /></svg>;
}

function MusicPlayer() {
  const [trackIndex, setTrackIndex] = useState(0);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [preview, setPreview] = useState<{ index: number; previewUrl: string; appleUrl: string } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [failedIndex, setFailedIndex] = useState<number | null>(null);
  const [retry, setRetry] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const continuePlaybackRef = useRef(false);
  const track = worldCupTracks[trackIndex];
  const activePreview = preview?.index === trackIndex ? preview : null;

  const changeTrack = useCallback((direction: number) => {
    if (isPlaying) continuePlaybackRef.current = true;
    audioRef.current?.pause();
    setIsPlaying(false);
    setTrackIndex((current) => (current + direction + worldCupTracks.length) % worldCupTracks.length);
  }, [isPlaying]);

  useEffect(() => {
    if (!musicEnabled) return;
    const controller = new AbortController();
    let active = true;
    const timeout = window.setTimeout(() => { controller.abort(); }, 10000);
    const query = encodeURIComponent(`${track.title} ${track.artist}`);
    void fetch(`https://itunes.apple.com/search?term=${query}&country=US&media=music&entity=song&limit=5`, { signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error("Preview unavailable"); return response.json(); })
      .then((data: { results?: Array<{ previewUrl?: string; trackViewUrl?: string }> }) => {
        if (!active) return;
        const result = data.results?.find((item) => item.previewUrl);
        if (!result?.previewUrl) { setFailedIndex(trackIndex); return; }
        setFailedIndex(null);
        if (result?.previewUrl) setPreview({ index: trackIndex, previewUrl: result.previewUrl, appleUrl: result.trackViewUrl ?? "https://music.apple.com/" });
      })
      .catch(() => { if (active) setFailedIndex(trackIndex); })
      .finally(() => window.clearTimeout(timeout));
    return () => { active = false; window.clearTimeout(timeout); controller.abort(); };
  }, [track.artist, track.title, trackIndex, retry, musicEnabled]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !activePreview || !continuePlaybackRef.current) return;
    void audio.play().catch(() => { continuePlaybackRef.current = false; setIsPlaying(false); });
  }, [activePreview]);

  const togglePlayback = () => {
    if (!musicEnabled) { setMusicEnabled(true); return; }
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
    <div className="player-buttons"><button type="button" onClick={() => changeTrack(-1)} aria-label="Previous World Cup song">◀</button><button type="button" onClick={togglePlayback} disabled={musicEnabled && (!activePreview || failedIndex === trackIndex)} aria-label={!musicEnabled ? "Load music previews" : isPlaying ? "Pause song" : "Play song"}>{isPlaying ? "Ⅱ" : "▶"}</button><button type="button" onClick={() => changeTrack(1)} aria-label="Next World Cup song">▶</button></div>
    <div className="now-playing"><span>{track.year}</span><strong>{!musicEnabled ? "OPTIONAL SOUNDTRACK · PRESS PLAY TO LOAD" : failedIndex === trackIndex ? `PREVIEW UNAVAILABLE · ${track.title}` : activePreview ? track.title : `LOADING ${track.title}...`}</strong><small>{track.artist}</small></div>
    {failedIndex === trackIndex ? <button className="apple-link" type="button" aria-label="Retry song preview" onClick={() => { setFailedIndex(null); setPreview(null); setRetry(value => value + 1); }}>↻</button> : <a className="apple-link" href={activePreview?.appleUrl ?? "https://music.apple.com/"} target="_blank" rel="noreferrer" aria-label="Open this song in Apple Music">↗</a>}
    {activePreview && <audio ref={audioRef} src={activePreview.previewUrl} onError={() => { setFailedIndex(trackIndex); setIsPlaying(false); continuePlaybackRef.current = false; }} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} preload="metadata" loop />}
  </aside>;
}

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  return <article className="game-cartridge"><span className="cartridge-number">0{index + 2}</span><div className="cartridge-title"><small>{project.type}</small><h3>{project.title}</h3></div><ProjectPreview repo={project.repo} /><p>{project.text}</p><ProjectEvidence repo={project.repo} /><span className="cartridge-stack">{project.stack}</span><ProjectLinks repo={project.repo} /><i>{project.status}</i></article>;
}

export default function Home() {
  return <main className="retro-site">
    <div className="skip-links"><a href="#work">Skip to projects</a><a href="#contact">Skip to contact</a></div>
    <MusicPlayer />
    <header className="game-header"><nav className="game-nav" aria-label="Primary navigation"><a href="#work">PROJECTS</a><a href="#experience">CAREER</a><a href="#skills">SKILLS</a><a href="#about">PROFILE</a><a href="/writing">WRITING</a></nav><details className="mobile-nav" onClick={(event: MouseEvent<HTMLDetailsElement>) => {
      if ((event.target as HTMLElement).closest("a")) event.currentTarget.open = false;
    }} onKeyDown={(event) => {
      if (event.key === "Escape") {
        event.currentTarget.open = false;
        event.currentTarget.querySelector("summary")?.focus();
      }
    }}><summary>MENU</summary><nav aria-label="Mobile navigation"><a href="#work">Projects</a><a href="#experience">Career</a><a href="#skills">Skills</a><a href="#about">Profile</a><a href="/writing">Writing</a><a href="#contact">Contact</a></nav></details><a className="header-cta" href="#contact">CONTACT</a></header>

    <section className="title-screen" id="top">
      <div className="title-lockup"><h1 aria-label="Humberto Villanueva"><span aria-hidden="true">HUMBERTO</span><strong aria-hidden="true">VILLANUEVA</strong></h1></div>
      <div className="hero-console"><div className="role-ribbon">SOFTWARE ENGINEER · AI + FULL STACK</div><p className="hero-blurb">I build web applications, connect AI tools, and help people make sense of building data.</p><div className="title-actions"><a href="#work">▶ EXPLORE MY WORK</a><a href="#contact">CONTACT</a></div><span className="press-start">UTAH · SOFTWARE ENGINEER AT kW ENGINEERING</span></div>

    </section>

    <div className="game-ticker" aria-hidden="true"><div><span>FULL-STACK ENGINEERING</span><i>★</i><span>AI SYSTEMS</span><i>★</i><span>BUILDING INTELLIGENCE</span><i>★</i><span>PRODUCT DESIGN</span><i>★</i><span>FULL-STACK ENGINEERING</span><i>★</i><span>AI SYSTEMS</span><i>★</i><span>BUILDING INTELLIGENCE</span><i>★</i><span>PRODUCT DESIGN</span><i>★</i></div></div>

    <section className="game-screen projects-screen" id="work" tabIndex={-1}><div className="screen-heading"><span>STAGE 01</span><h2>SELECTED WORK</h2><p>Projects you can try, with notes on how they work and what still needs work.</p></div><article className="active-mission"><div className="window-bar"><span>ACTIVE CLUB MISSION</span><b>01</b></div><div className="mission-body"><div className="mission-logo"><SpectaMark /><span>SPECTA</span></div><div className="mission-copy"><span className="mission-status"><i /> ONGOING AT kW ENGINEERING</span><h3>SPECTA</h3><p className="ownership-note"><strong>IMPORTANT:</strong> Specta is a kW Engineering product. It is not my personal software.</p><p>At kW Engineering, I work on Specta’s AI integrations, document processing, data reliability, and interfaces for building operators.</p><div className="mission-skills"><span>AI SYSTEMS</span><span>DOCUMENT INTELLIGENCE</span><span>FULL-STACK PRODUCT</span></div></div></div></article><div className="select-label"><span>SELECT A BUILD</span><b>02 to {String(projects.length + 1).padStart(2, "0")}</b></div><div className="cartridge-grid">{projects.map((project, index) => <ProjectCard project={project} index={index} key={project.title} />)}</div></section>

    <section className="game-screen career-screen" id="experience"><div className="screen-heading light-heading"><span>STAGE 02</span><h2>EXPERIENCE</h2><p>From practical IT support to production software engineering.</p></div><div className="save-window"><div className="window-bar"><span>SAVE FILE // HUMBERTO_07</span><b>ACTIVE</b></div><div className="career-head"><span>SEASON</span><span>TEAM</span><span>POSITION</span><span>MATCH NOTES</span></div>{experience.map((item, index) => <article className="career-row" key={item.company}><span className="save-slot">0{index + 1}</span><span className="career-years">{item.years}</span><strong>{item.company}</strong><h3>{item.role}</h3><p>{item.detail}</p></article>)}</div><div className="education-window"><span>TRAINING CAMP</span><div><strong>B.S. SOFTWARE ENGINEERING</strong><small>Ensign College · 2026 · GPA 3.5</small></div><div><strong>COMPUTER SCIENCE CERTIFICATE</strong><small>Weber State University · 2024</small></div></div></section>

    <section className="game-screen skills-screen" id="skills"><div className="screen-heading"><span>STAGE 03</span><h2>ENGINEERING TOOLKIT</h2><p>The languages and tools I use at work and in my own projects.</p></div><div className="stats-console"><aside className="player-card"><div className="card-top"><span>PLAYER 1</span><b>07</b></div><div className="pixel-avatar" aria-hidden="true"><i className="avatar-hair" /><i className="avatar-face" /><i className="avatar-shirt" /></div><strong>H. VILLANUEVA</strong><small>SOFTWARE ENGINEER</small><div className="card-flags"><span>UTAH</span><i>·</i><span>USA</span></div></aside><div className="skill-board">{skills.map((skill, index) => <div className="skill-slot" key={skill.name}><span>{String(index + 1).padStart(2, "0")}</span><strong>{skill.name}</strong><i>{skill.context}</i></div>)}</div></div></section>

    <section className="game-screen profile-screen" id="about"><div className="screen-heading light-heading"><span>STAGE 04</span><h2>PLAYER PROFILE</h2><p>The person behind the work.</p></div><div className="profile-window"><div className="profile-facts"><span><small>FOCUS</small>SOFTWARE ENGINEERING</span><span><small>BASE</small>UTAH, USA</span><span><small>CLUB</small>REAL MADRID</span><span><small>NUMBER</small>07</span></div><div className="profile-story"><Image className="profile-portrait" src="/humbertopic.jpeg" alt="Humberto Villanueva, software engineer" width={160} height={160} sizes="160px" /><a className="profile-about-link" href="/about">Meet Humberto →</a><p>I like figuring out why something is broken and working through a fix. Away from the screen, I spend time with my family and follow football.</p><p>I enjoy solving hard problems with good people. I also enjoy watching Real Madrid and arguing about the match afterward.</p><span>● READY FOR THE NEXT CHALLENGE</span></div></div></section>

    <section className="continue-screen" id="contact" tabIndex={-1}><span>FINAL STAGE</span><h2>LET’S TALK</h2><div className="contact-terminal"><div className="window-bar"><span>MESSAGE TERMINAL // NEW TRANSMISSION</span><b>ONLINE</b></div><div className="contact-terminal-body"><ContactForm /><aside className="contact-channel"><span>CHANNEL 07</span><h3>LET&apos;S BUILD THE NEXT ONE.</h3><p>Tell me who you are, what you&apos;re building, and where I can help.</p><small>Use the form to reach me, or email me directly.</small><a href="mailto:hachevillanueva99@gmail.com">HACHEVILLANUEVA99@GMAIL.COM</a><SocialProfileLinks /></aside></div></div></section>
    <footer className="game-footer"><span>© 2026 HUMBERTO VILLANUEVA</span><nav aria-label="Portfolio pages"><a href="/about">ABOUT</a><a href="/projects">PROJECTS</a><a href="/experience">EXPERIENCE</a><a href="/writing">WRITING</a></nav><a href="#top">RESTART ↑</a></footer>
  </main>;
}
