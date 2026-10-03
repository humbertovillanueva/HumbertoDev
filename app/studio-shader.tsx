"use client";
import { useEffect, useRef } from "react";

// Animated aurora behind the 2026 hero. A small WebGL fragment shader: domain-warped noise in the
// logo's lime with violet and teal, nudged by the cursor. It only runs while the 2026 edition is
// selected and the hero is on screen; reduced-motion visitors get a single still frame.
const vertex = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;
const fragment = `precision mediump float;
uniform vec2 r;uniform float t;uniform vec2 m;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}
void main(){
  vec2 uv=gl_FragCoord.xy/r;vec2 p=(gl_FragCoord.xy-.5*r)/r.y;
  vec2 mm=(m-.5)*vec2(r.x/r.y,1.);
  float tt=t*.045;
  vec2 q=vec2(fbm(p*1.6+tt),fbm(p*1.6-tt+3.1));
  vec2 w=vec2(fbm(p*1.3+2.2*q+vec2(1.7,9.2)+tt*1.3),fbm(p*1.3+2.2*q+vec2(8.3,2.8)-tt));
  float f=fbm(p*1.2+2.6*w+(mm-p)*.12);
  vec3 bg=vec3(.035,.035,.043);
  vec3 lime=vec3(.85,1.,.34),violet=vec3(.48,.36,1.),teal=vec3(.18,.88,.77);
  vec3 c=mix(bg,violet*.55,smoothstep(.35,.85,f));
  c=mix(c,teal*.5,smoothstep(.55,.95,w.x)*.55);
  c=mix(c,lime*.75,smoothstep(.62,1.,f*q.y*1.6)*.75);
  float glow=exp(-3.5*length(p-mm));c+=lime*.06*glow;
  float v=smoothstep(1.25,.25,length((uv-vec2(.62,.42))*vec2(1.2,1.)));
  c=mix(bg,c,v*.92);
  gl_FragColor=vec4(c,1.);
}`;

export function StudioShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) { canvas.dataset.fallback = "true"; return; }
    const compile = (type: number, source: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, source); gl.compileShader(s); return s; };
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertex));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { canvas.dataset.fallback = "true"; return; }
    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(program, "r"), uTime = gl.getUniformLocation(program, "t"), uMouse = gl.getUniformLocation(program, "m");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mouse = { x: .62, y: .55, tx: .62, ty: .55 };
    let frame = 0, visible = false, start = performance.now();
    const isActive = () => document.documentElement.dataset.era === "2026" && visible && !document.hidden;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5) * (window.innerWidth < 760 ? .75 : 1);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const draw = (now: number) => {
      mouse.x += (mouse.tx - mouse.x) * .04; mouse.y += (mouse.ty - mouse.y) * .04;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, reduce.matches ? 18 : (now - start) / 1000 + 18);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = (now: number) => {
      frame = 0;
      if (!isActive()) return;
      draw(now);
      if (!reduce.matches) frame = requestAnimationFrame(loop);
    };
    const kick = () => { if (!frame && isActive()) frame = requestAnimationFrame(loop); };
    const onPointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = (event.clientX - rect.left) / rect.width;
      mouse.ty = 1 - (event.clientY - rect.top) / rect.height;
    };

    const sizeObserver = new ResizeObserver(() => { resize(); if (reduce.matches) { start = performance.now(); kick(); } });
    sizeObserver.observe(canvas);
    const viewObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; kick(); });
    viewObserver.observe(canvas);
    const eraObserver = new MutationObserver(kick);
    eraObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-era"] });
    document.addEventListener("visibilitychange", kick);
    window.addEventListener("pointermove", onPointer, { passive: true });
    resize();
    canvas.dataset.ready = "true";
    return () => {
      cancelAnimationFrame(frame);
      sizeObserver.disconnect(); viewObserver.disconnect(); eraObserver.disconnect();
      document.removeEventListener("visibilitychange", kick);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);
  return <canvas ref={canvasRef} className="studio-shader" aria-hidden="true" />;
}
