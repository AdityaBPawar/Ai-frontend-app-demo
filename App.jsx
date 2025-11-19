/*
AI-Generated Frontend Portfolio App (single-file React component)
How to use
1) This is a single-file React component (JSX). Save as src/App.jsx in a Vite or Create React App project.
2) Tailwind CSS must be installed and configured. framer-motion, lucide-react, and shadcn/ui can be installed via npm/yarn.
   npm install framer-motion lucide-react @radix-ui/react-icons
   (shadcn/ui components are referenced as examples; you can replace with any component library)
3) Replace the SAMPLE_DATA and profile/resume links with your own info and project links.
4) Run the app: npm run dev (Vite) or npm start (CRA).

Notes on features included
- Hero section with a call-to-action to download resume and view projects
- Filterable, searchable projects grid with tags
- Interactive project cards with hover/animation and live/demo links
- Skills section with progress bars
- Contact form (mailto fallback) and social links
- Minimal, modern, mobile-responsive UI using Tailwind utilities

Customize freely. This file is intentionally self-contained for quick iteration and demo.
*/

import React, {useState, useMemo} from 'react'
import {motion} from 'framer-motion'
import {Mail, ExternalLink, Download, Github} from 'lucide-react'

export default function PortfolioApp(){
  const PROFILE = {
    name: 'Aditya Pawar',
    title: 'Frontend Developer',
    location: 'City, Country',
    intro: `I build accessible, performant, and delightful web interfaces. I focus on React, TypeScript, and modern frontend tooling. I love translating product requirements into pixel-perfect experiences that scale.`,
    resume: '#', // link to PDF
    email: 'you@example.com',
    github: 'https://github.com/yourusername',
    linkedin: 'https://www.linkedin.com/in/yourprofile'
  }

  // SAMPLE PROJECTS - replace with your projects
  const SAMPLE_PROJECTS = [
    {
      id: 'p1',
      title: 'Realtime Chat App',
      desc: 'React + WebSockets, optimistic UI, presence and typing indicators, responsive design.',
      tags: ['React','Realtime','WebSockets'],
      demo: '#',
      repo: '#'
    },
    {
      id: 'p2',
      title: 'Design System',
      desc: 'Reusable component library with tokens, dark mode, and visual tests.',
      tags: ['Design System','Accessibility','Storybook'],
      demo: '#',
      repo: '#'
    },
    {
      id: 'p3',
      title: 'Data Dashboard',
      desc: 'Interactive charts, CSV export, filters, and server-side pagination.',
      tags: ['React','Charts','Performance'],
      demo: '#',
      repo: '#'
    }
  ]

  // ======== UI STATE ========
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState('All')
  const [visibleCount, setVisibleCount] = useState(6)

  const allTags = useMemo(()=>{
    const s = new Set(['All'])
    SAMPLE_PROJECTS.forEach(p=>p.tags.forEach(t=>s.add(t)))
    return Array.from(s)
  },[])

  const filtered = SAMPLE_PROJECTS.filter(p=>{
    const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase()) || p.desc.toLowerCase().includes(query.toLowerCase())
    const matchesTag = activeTag === 'All' ? true : p.tags.includes(activeTag)
    return matchesQuery && matchesTag
  }).slice(0, visibleCount)

  return (
    <div className="min-h-screen bg-neutral-50 text-slate-900 antialiased">
      <header className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{PROFILE.name}</h1>
          <p className="text-sm text-slate-600">{PROFILE.title} — {PROFILE.location}</p>
        </div>
        <nav className="mt-4 md:mt-0 flex gap-3">
          <a className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 hover:bg-white shadow-sm" href={PROFILE.resume} target="_blank" rel="noreferrer"><Download size={16}/> Resume</a>
          <a className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white hover:opacity-90" href="#projects">Projects</a>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-6 pb-20">
        {/* HERO */}
        <section className="grid md:grid-cols-2 gap-8 items-center py-8">
          <div>
            <motion.h2 className="text-4xl font-bold leading-tight" initial={{y:10,opacity:0}} animate={{y:0,opacity:1}}>Hi, I'm {PROFILE.name}. I build beautiful web apps.</motion.h2>
            <motion.p className="mt-4 text-slate-700" initial={{y:6,opacity:0}} animate={{y:0,opacity:1}}>{PROFILE.intro}</motion.p>

            <div className="mt-6 flex gap-3">
              <a href={PROFILE.resume} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-md border"> <Download size={16}/> Download Resume</a>
              <a href={`mailto:${PROFILE.email}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-slate-900 text-white"> <Mail size={16}/> Email Me</a>
            </div>

            <div className="mt-6 flex gap-3 text-sm text-slate-600">
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2"><Github size={16}/> GitHub</a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2"><ExternalLink size={16}/> LinkedIn</a>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-semibold">Key skills</h3>
            <ul className="mt-4 space-y-3">
              {['React','TypeScript','Tailwind CSS','Accessibility','Performance'].map(skill=> (
                <li key={skill} className="">
                  <div className="flex justify-between text-sm text-slate-600"><span>{skill}</span><span>80%</span></div>
                  <div className="bg-slate-100 rounded-full h-2 mt-2 overflow-hidden"><div className="h-2 rounded-full" style={{width:'80%'}}></div></div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="mt-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h3 className="text-2xl font-semibold">Projects</h3>
            <div className="flex gap-2 items-center">
              <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search projects" className="px-3 py-2 border rounded-md" />
              <div className="flex gap-2 overflow-x-auto">
                {allTags.map(t=> (
                  <button key={t} onClick={()=>{setActiveTag(t); setVisibleCount(6)}} className={`px-3 py-1 rounded-full border ${activeTag===t? 'bg-slate-900 text-white' : 'bg-white'}`}>{t}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(p=> (
              <motion.article key={p.id} whileHover={{y:-6,boxShadow:'0px 8px 30px rgba(2,6,23,0.08)'}} className="bg-white rounded-2xl p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-lg">{p.title}</h4>
                    <p className="mt-2 text-sm text-slate-600">{p.desc}</p>
                  </div>
                  <div className="ml-3 flex flex-col gap-2 text-slate-500">
                    <a href={p.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs">Demo <ExternalLink size={12} /></a>
                    <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs">Code <Github size={12} /></a>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map(tag=> <span key={tag} className="text-xs px-2 py-1 rounded-full border">{tag}</span>)}
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <button onClick={()=>setVisibleCount(c=>c+6)} className="px-4 py-2 rounded-md border">Load more</button>
          </div>
        </section>

        {/* About + Contact */}
        <section className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold">About me</h3>
            <p className="mt-4 text-slate-700">I care about shipping impactful features with maintainable code. I write tests where it matters, prioritize accessibility, and collaborate closely with designers and backend engineers. I'm looking for a role where I can own frontend features end-to-end and mentor others.</p>

            <h4 className="mt-6 font-semibold">Experience highlights</h4>
            <ul className="mt-3 space-y-2 text-slate-600">
              <li>Built a component library adopted across multiple products</li>
              <li>Improved first-load performance by 45% for a key funnel</li>
              <li>Led A/B test that increased conversion by 9%</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Contact</h3>
            <p className="mt-2 text-sm text-slate-600">Prefer email? <a href={`mailto:${PROFILE.email}`} className="underline">Send a message</a></p>
            <form className="mt-4 flex flex-col gap-3" onSubmit={(e)=>{e.preventDefault(); window.location.href = `mailto:${PROFILE.email}?subject=Hiring%20Inquiry&body=Hi%20${encodeURIComponent(PROFILE.name)}%2C%0A%0AI%20saw%20your%20portfolio...`}}>
              <input required placeholder="Your name" className="px-3 py-2 border rounded-md" />
              <input required type="email" placeholder="Your email" className="px-3 py-2 border rounded-md" />
              <textarea required placeholder="A short message" className="px-3 py-2 border rounded-md" rows={4}></textarea>
              <button type="submit" className="px-4 py-2 bg-slate-900 text-white rounded-md">Send</button>
            </form>

            <div className="mt-6 text-sm text-slate-600">
              <p>Or find me on</p>
              <div className="mt-2 flex gap-3">
                <a href={PROFILE.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2"><Github size={16}/> GitHub</a>
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2"><ExternalLink size={16}/> LinkedIn</a>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-16 text-center text-sm text-slate-500">Made with ❤️ — replace this with your own tagline</footer>
      </main>
    </div>
  )
}
