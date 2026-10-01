"use client";

import Image from "next/image";
import { useRef } from "react";

export function PreviewZoom({ src, alt }: { src: string; alt: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  return <>
    <button className="preview-open" type="button" aria-label={`Enlarge screenshot: ${alt}`} onClick={() => dialog.current?.showModal()}>
      <Image src={src} width={1280} height={850} sizes="(max-width: 760px) 100vw, 50vw" alt={alt} />
      <span>VIEW SCREENSHOT ↗</span>
    </button>
    <dialog ref={dialog} className="preview-dialog" aria-label="Project screenshot" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="preview-dialog-bar"><span>PROJECT VIEW</span><button type="button" autoFocus onClick={() => dialog.current?.close()}>CLOSE ×</button></div>
      <div className="preview-image-scroll"><Image src={src} width={1280} height={850} sizes="1280px" alt={alt} /></div>
      <p>{alt}</p>
    </dialog>
  </>;
}
