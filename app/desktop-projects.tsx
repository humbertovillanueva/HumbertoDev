"use client";
import { useState } from 'react';
import Link from 'next/link';
import projects from './projects.json';
import { ProjectLinks } from './project-links';
export function DesktopProjects() {
 const [sort,setSort]=useState('featured');
 const [compact,setCompact]=useState(false);
 const items=projects.filter(project=>project.repo);
 if(sort==='name') items.sort((a,b)=>a.title.localeCompare(b.title));
 return <section className={`desktop-files ${compact?'files-compact':''}`}><div className="desktop-titlebar"><h2>My Projects</h2><Link href="/projects">Open all →</Link></div>
 <div className="desktop-file-toolbar"><label>Sort <select value={sort} onChange={event=>setSort(event.target.value)}><option value="featured">Featured</option><option value="name">Name A–Z</option></select></label><button type="button" aria-pressed={compact} onClick={()=>setCompact(value=>!value)}>Compact view</button><span>{items.length} items</span></div>
 <div className="desktop-file-head"><span>Name / description</span><span>Open</span></div>{items.map((project,index)=><article className="desktop-file" key={project.repo}><span className="desktop-file-icon" aria-hidden="true">{String(index+1).padStart(2,'0')}</span><div><h3>{project.title}</h3><p>{project.text}</p><small>{project.status}</small></div><ProjectLinks repo={project.repo}/></article>)}</section>;
}
