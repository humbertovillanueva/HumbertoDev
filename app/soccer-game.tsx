"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function SoccerGame() {
  const gameDialogRef = useRef<HTMLDialogElement>(null);
  const gameLauncherRef = useRef<HTMLButtonElement>(null);
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
    else if (playerPosition.y < 35 || playerPosition.y > 65) setGameState("miss");
    else setGameState("kicking");
  }, [gameState, playerPosition.x, playerPosition.y]);

  useEffect(() => {
    const handleGlobalGameKeys = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if ((event.target as HTMLElement | null)?.closest("a, button, input, textarea, select, summary, [contenteditable='true']")) return;
      const field = fieldRef.current;
      if (!field || document.activeElement !== field) return;
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
  const gameMessage = gameState === "goal" ? "GOOOOOL!" : gameState === "too-far" ? "GET CLOSER" : gameState === "miss" ? "OVER THE BAR!" : gameState === "kicking" ? "SHOT!" : "FOCUS PITCH · ARROWS MOVE · SPACE SHOOTS";

  return <>
      <button className="soccer-launcher" ref={gameLauncherRef} type="button" aria-haspopup="dialog" onClick={() => { gameDialogRef.current?.showModal(); fieldRef.current?.focus(); }}><span aria-hidden="true">⚽</span><span>PLAY A QUICK MATCH</span></button>
      <dialog className="soccer-dialog" ref={gameDialogRef} aria-labelledby="soccer-title" onClose={() => { setGameState("ready"); gameLauncherRef.current?.focus(); }}>
      <div className="soccer-dialog-heading"><h2 id="soccer-title">QUICK MATCH</h2><button type="button" onClick={() => gameDialogRef.current?.close()}>CLOSE GAME ×</button></div>
      <div className={`pixel-field game-${gameState}`} id="pitch" ref={fieldRef} tabIndex={0} role="group" aria-label="Soccer game. Focus this pitch to use arrow keys to move and space to shoot. Tab moves to the on-screen controls.">
        <div className="field-perspective" /><div className="field-center-line" /><div className="field-circle" /><div className="field-penalty-area"><div className="field-six-yard-box" /><i className="penalty-spot" /></div><div className="pixel-goal" />
        <div className="corner-flags" aria-hidden="true"><i className="corner-flag corner-flag-tl" /><i className="corner-flag corner-flag-tr" /><i className="corner-flag corner-flag-bl" /><i className="corner-flag corner-flag-br" /></div>
        <div className="pixel-keeper"><i className="keeper-head" /><i className="keeper-body" /><i className="keeper-arm keeper-arm-left" /><i className="keeper-arm keeper-arm-right" /><i className="keeper-leg keeper-leg-left" /><i className="keeper-leg keeper-leg-right" /></div>
        <div className="controlled-player" style={{ left: `${playerPosition.x}%`, bottom: `${playerPosition.y}%` }} aria-hidden="true"><div className="pixel-runner"><i className="runner-hair" /><i className="runner-head" /><i className="runner-shirt" /><i className="runner-arm runner-arm-one" /><i className="runner-arm runner-arm-two" /><i className="runner-shorts" /><i className="runner-leg runner-leg-one" /><i className="runner-leg runner-leg-two" /></div></div>
        <div className={`pixel-ball game-ball ${ballIsMoving ? "ball-shot" : ""}`} style={{ left: ballIsMoving ? "91%" : `calc(${playerPosition.x}% + 56px)`, bottom: gameState === "miss" ? "82%" : ballIsMoving ? "50%" : `calc(${playerPosition.y}% + 7px)` }} aria-hidden="true"><span /></div>
        <div className="game-hud"><span>P1 · {gameMessage}</span><strong>GOALS {String(goals).padStart(2, "0")}</strong></div>
        <div className="game-controls" aria-label="On-screen soccer controls"><button type="button" onClick={() => movePlayer(0, 4)} aria-label="Move up">↑</button><button type="button" onClick={() => movePlayer(-3, 0)} aria-label="Move left">←</button><button type="button" onClick={() => movePlayer(0, -4)} aria-label="Move down">↓</button><button type="button" onClick={() => movePlayer(3, 0)} aria-label="Move right">→</button><button className="kick-button" type="button" onClick={kickBall}>A · SHOOT</button></div><div className="goal-call">GOAL!</div><div className="goal-confetti">{Array.from({ length: 24 }, (_, index) => <i key={index} />)}</div>
      </div>
      </dialog>
  </>;
}
