"use client";
import { useEffect, useRef } from "react";

// Animated aurora behind the 2026 hero. A small WebGL fragment shader: domain-warped noise in the
// logo's lime with violet and teal, nudged by the cursor. It only runs while the 2026 edition is
// selected and the hero is on screen; reduced-motion visitors get a single still frame.
// The aurora is soft, so it renders at a small, capped resolution and about 30 frames a second.
// On slow graphics (common on Windows laptops with integrated GPUs) it settles on a still frame
// instead of making the page stutter, and if WebGL is missing or lost the CSS gradient shows.
const RENDER_SCALE = .5;
const PIXEL_BUDGET = 360_000;
const FRAME_MS = 1000 / 30;
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

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mouse = { x: .62, y: .55, tx: .62, ty: .55 };
    let frame = 0, visible = false;
    const start = performance.now();
    const isActive = () => document.documentElement.dataset.era === "2026" && visible && !document.hidden;

    // The WebGL context and the shader are set up only once the 2026 edition is on screen. Visitors
    // on the 1986 or 2000 editions never pay for the compile, which is the slowest thing this page
    // does on a phone, and the hero still shows its CSS gradient in the meantime.
    let gl: WebGLRenderingContext | null = null;
    let uRes: WebGLUniformLocation | null = null, uTime: WebGLUniformLocation | null = null, uMouse: WebGLUniformLocation | null = null;
    let lastDraw = 0, slowFrames = 0, settled = false, lost = false, tried = false;
    // Also drop the glass blur effects, which are expensive without a GPU.
    const calmDown = () => { settled = true; canvas.dataset.settled = "true"; document.documentElement.dataset.lowGpu = "true"; };
    const resize = () => {
      if (!gl) return;
      const { width, height } = canvas.getBoundingClientRect();
      let w = width * RENDER_SCALE, h = height * RENDER_SCALE;
      const shrink = Math.min(1, Math.sqrt(PIXEL_BUDGET / Math.max(1, w * h)));
      w *= shrink; h *= shrink;
      canvas.width = Math.max(1, Math.round(w));
      canvas.height = Math.max(1, Math.round(h));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const onLost = (event: Event) => { event.preventDefault(); lost = true; cancelAnimationFrame(frame); frame = 0; canvas.dataset.fallback = "true"; };
    const init = (): boolean => {
      if (tried) return Boolean(gl) && !lost;
      tried = true;
      const context = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
      if (!context) { canvas.dataset.fallback = "true"; return false; }
      const compile = (type: number, source: string) => { const s = context.createShader(type)!; context.shaderSource(s, source); context.compileShader(s); return s; };
      const program = context.createProgram()!;
      context.attachShader(program, compile(context.VERTEX_SHADER, vertex));
      context.attachShader(program, compile(context.FRAGMENT_SHADER, fragment));
      context.linkProgram(program);
      if (!context.getProgramParameter(program, context.LINK_STATUS)) { canvas.dataset.fallback = "true"; return false; }
      context.useProgram(program);
      const buffer = context.createBuffer();
      context.bindBuffer(context.ARRAY_BUFFER, buffer);
      context.bufferData(context.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), context.STATIC_DRAW);
      const loc = context.getAttribLocation(program, "p");
      context.enableVertexAttribArray(loc);
      context.vertexAttribPointer(loc, 2, context.FLOAT, false, 0, 0);
      uRes = context.getUniformLocation(program, "r"); uTime = context.getUniformLocation(program, "t"); uMouse = context.getUniformLocation(program, "m");
      // Software rendering (no usable GPU, remote desktops, blocked drivers) gets a single still frame.
      const info = context.getExtension("WEBGL_debug_renderer_info");
      const renderer = String(info ? context.getParameter(info.UNMASKED_RENDERER_WEBGL) : context.getParameter(context.RENDERER));
      if (/swiftshader|llvmpipe|softpipe|software|basic render/i.test(renderer)) calmDown();
      canvas.addEventListener("webglcontextlost", onLost);
      gl = context;
      resize();
      canvas.dataset.ready = "true";
      return true;
    };
    const draw = (now: number) => {
      if (!gl) return;
      mouse.x += (mouse.tx - mouse.x) * .04; mouse.y += (mouse.ty - mouse.y) * .04;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, reduce.matches ? 18 : (now - start) / 1000 + 18);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = (now: number) => {
      frame = 0;
      if (lost || !isActive()) return;
      const still = reduce.matches || settled;
      if (still || now - lastDraw >= FRAME_MS) {
        // A frame that arrives far later than planned means the device is struggling.
        if (lastDraw && !still) slowFrames = now - lastDraw > FRAME_MS * 2.2 ? slowFrames + 1 : Math.max(0, slowFrames - 1);
        if (slowFrames > 12) calmDown();
        lastDraw = now;
        draw(now);
      }
      if (!reduce.matches && !settled) frame = requestAnimationFrame(loop);
    };
    const kick = () => { if (!frame && isActive() && init()) { lastDraw = 0; frame = requestAnimationFrame(loop); } };
    const onPointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = (event.clientX - rect.left) / rect.width;
      mouse.ty = 1 - (event.clientY - rect.top) / rect.height;
    };

    const sizeObserver = new ResizeObserver(() => { resize(); if (reduce.matches || settled) kick(); });
    sizeObserver.observe(canvas);
    const viewObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; kick(); });
    viewObserver.observe(canvas);
    const eraObserver = new MutationObserver(kick);
    eraObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-era"] });
    document.addEventListener("visibilitychange", kick);
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      canvas.removeEventListener("webglcontextlost", onLost);
      sizeObserver.disconnect(); viewObserver.disconnect(); eraObserver.disconnect();
      document.removeEventListener("visibilitychange", kick);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);
  return <canvas ref={canvasRef} className="studio-shader" aria-hidden="true" />;
}
