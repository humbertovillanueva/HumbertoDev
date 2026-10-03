"use client";
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
type Result = { title: string; href: string; category: string; description: string };
export function PortfolioSearch() {
  const dialog = useRef<HTMLDialogElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const [open,setOpen] = useState(false);
  const [query,setQuery] = useState('');
  const [results,setResults] = useState<Result[]>([]);
  const [status,setStatus] = useState('');
  const [retry,setRetry] = useState(0);
  useEffect(()=>{
    if(!open) return;
    const controller=new AbortController();
    const timer=setTimeout(()=>{
      setStatus('Searching…');
      void fetch(`/api/search?q=${encodeURIComponent(query)}`,{signal:AbortSignal.any([controller.signal, AbortSignal.timeout(8000)])})
        .then(async response=>{if(!response.ok) throw new Error();return response.json();})
        .then(data=>{if(controller.signal.aborted) return;setResults(data.results);setStatus(data.results.length ? `${data.results.length} ${data.results.length === 1 ? "result" : "results"}` : 'No matches. Try a project name, skill, or topic.');})
        .catch(()=>{if(!controller.signal.aborted){setResults([]);setStatus('Search is unavailable. Please try again.');}});
    },200);
    return ()=>{clearTimeout(timer);controller.abort();};
  },[open,query,retry]);
  return <div className="portfolio-search">
    <button ref={launcher} className="search-launcher" type="button" aria-label="Find in portfolio" onClick={()=>{dialog.current?.showModal();setOpen(true);}}>Find in portfolio <span aria-hidden="true">⌕</span></button>
    <dialog ref={dialog} className="search-dialog" onKeyDown={event=>{if(event.key === "Escape"){event.preventDefault();dialog.current?.close();}}} aria-labelledby="search-title" onClose={()=>{setOpen(false);launcher.current?.focus();}}>
      <header><h2 id="search-title">Portfolio directory</h2><button type="button" onClick={()=>dialog.current?.close()} aria-label="Close search">×</button></header>
      <div className="search-body"><label htmlFor="portfolio-query">Find a project, skill, or topic</label><input id="portfolio-query" autoFocus type="search" maxLength={100} value={query} onChange={event=>{setQuery(event.target.value);setResults([]);setStatus('Searching…');}} placeholder="Try React, cloud, or experience" />
      <p role="status">{status}</p>{status.includes('unavailable') && <button type="button" onClick={()=>setRetry(value=>value+1)}>Retry search</button>}
      <ul>{results.map(result=><li key={result.title}><Link href={result.href} onClick={()=>dialog.current?.close()}><small>{result.category}</small><strong>{result.title}</strong><span>{result.description}</span></Link></li>)}</ul></div>
    </dialog>
  </div>;
}
