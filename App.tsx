
import React, { useState } from 'react';
import { PERSONAL_INFO, EXPERIENCES, PROJECTS, CASE_STUDIES, SKILLS, CERTIFICATIONS, EDUCATION } from './data';
import { CaseStudy } from './types';
import AIChatAssistant from './components/AIChatAssistant';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('experience');
  const [selectedPRD, setSelectedPRD] = useState<CaseStudy | null>(null);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-200 selection:bg-blue-500/30 font-sans">
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600 rounded-full blur-[120px]"></div>
      </div>

      {/* AI Chat Assistant Component */}
      <AIChatAssistant />

      {/* PRD Detailed Modal */}
      {selectedPRD && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 animate-in fade-in zoom-in duration-200">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setSelectedPRD(null)}></div>
          <div className="relative w-full max-w-6xl max-h-[92vh] bg-[#111418] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col">
            
            <div className={`${selectedPRD.color} px-8 py-5 text-white flex justify-between items-center shrink-0`}>
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.4em] opacity-80 mb-0.5">{selectedPRD.company}</p>
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">{selectedPRD.title}</h2>
              </div>
              <button onClick={() => setSelectedPRD(null)} className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 md:p-14 space-y-20 no-scrollbar bg-white/[0.01]">
              
              <section className="space-y-6">
                <h3 className="text-lg font-black text-white border-b border-white/5 pb-3 uppercase tracking-widest italic text-blue-500">Why? (Objective)</h3>
                <div className="grid md:grid-cols-2 gap-8">
                   <div className="p-5 bg-white/5 rounded-xl border border-white/5">
                      <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-3">1. For business.</p>
                      <p className="text-sm text-slate-300 leading-relaxed">{selectedPRD.fullPRD.why.business}</p>
                   </div>
                   <div className="p-5 bg-white/5 rounded-xl border border-white/5">
                      <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-3">2. For users.</p>
                      <p className="text-sm text-slate-300 leading-relaxed">{selectedPRD.fullPRD.why.users}</p>
                   </div>
                </div>
              </section>

              <section className="space-y-6">
                <h3 className="text-lg font-black text-white border-b border-white/5 pb-3 uppercase tracking-widest italic text-blue-500">How do we measure success?</h3>
                <div className="space-y-4">
                   <div className="p-5 bg-white/5 rounded-xl border border-white/5">
                      <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-2">1. Associated OKR/Goal</p>
                      <p className="text-sm text-white font-bold">{selectedPRD.fullPRD.measurement.okr}</p>
                   </div>
                   <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <p className="text-[9px] font-black text-green-500 uppercase tracking-widest mb-2">2. Success Metrics</p>
                        <ul className="space-y-1.5">
                           {selectedPRD.fullPRD.measurement.success.map((m, i) => (
                             <li key={i} className="text-xs text-slate-400 flex gap-2"><span className="text-green-500 font-bold">✓</span> {m}</li>
                           ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-red-500 uppercase tracking-widest mb-2">3. Guardrail Metrics</p>
                        <ul className="space-y-1.5">
                           {selectedPRD.fullPRD.measurement.guardrail.map((m, i) => (
                             <li key={i} className="text-xs text-slate-400 flex gap-2"><span className="text-red-500 font-bold">!</span> {m}</li>
                           ))}
                        </ul>
                      </div>
                   </div>
                </div>
              </section>

              <section className="space-y-6">
                <h3 className="text-lg font-black text-white border-b border-white/5 pb-3 uppercase tracking-widest italic text-blue-500">Who are the users:</h3>
                <div className="grid md:grid-cols-2 gap-8">
                   <div className="space-y-6">
                      <div>
                        <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-2">1. Persona</p>
                        <p className="text-sm text-white font-medium">{selectedPRD.fullPRD.users.persona}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-2">3. Research Insights</p>
                        <p className="text-sm text-slate-400 italic">"{selectedPRD.fullPRD.users.research}"</p>
                      </div>
                   </div>
                   <div>
                      <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-2">2. Problems Solved</p>
                      <ul className="space-y-2">
                         {selectedPRD.fullPRD.users.problems.map((p, i) => (
                           <li key={i} className="text-xs p-3 bg-white/5 border border-white/5 rounded-lg text-slate-300">{p}</li>
                         ))}
                      </ul>
                   </div>
                </div>
              </section>

              <section className="space-y-6">
                <h3 className="text-lg font-black text-white border-b border-white/5 pb-3 uppercase tracking-widest italic text-blue-500">Solution:</h3>
                <div className="space-y-6">
                   <div className="p-6 bg-blue-600/5 border border-blue-500/10 rounded-2xl">
                      <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-3">1. Solution Brief</p>
                      <p className="text-sm text-white leading-relaxed">{selectedPRD.fullPRD.solution.brief}</p>
                   </div>
                   <div>
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">2. Alternatives Considered</p>
                      <p className="text-xs text-slate-400 italic">{selectedPRD.fullPRD.solution.alternatives}</p>
                   </div>
                </div>
              </section>

              <section className="space-y-6">
                <h3 className="text-lg font-black text-white border-b border-white/5 pb-3 uppercase tracking-widest italic text-blue-500">Product flow:</h3>
                <div className="space-y-8">
                   <div className="grid md:grid-cols-2 gap-8">
                      <div className="p-5 bg-white/5 rounded-xl border border-white/5">
                        <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-3">1. Customer Journey</p>
                        <p className="text-xs text-slate-300">{selectedPRD.fullPRD.productFlow.journey}</p>
                      </div>
                      <div className="p-5 bg-white/5 rounded-xl border border-white/5">
                        <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-3">2. Wireframes & Flow</p>
                        <p className="text-xs text-slate-300">{selectedPRD.fullPRD.productFlow.wireframes}</p>
                      </div>
                   </div>
                   
                   <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-3">3. User Stories</p>
                        <ul className="space-y-1.5">
                           {selectedPRD.fullPRD.productFlow.stories.map((s, i) => (
                             <li key={i} className="text-xs text-slate-400 flex gap-2"><span className="text-blue-500 font-bold">»</span> {s}</li>
                           ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-3">4. Acceptance Criteria</p>
                        <ul className="space-y-1.5">
                           {selectedPRD.fullPRD.productFlow.criteria.map((c, i) => (
                             <li key={i} className="text-xs text-slate-400 flex gap-2"><span className="text-green-500 font-bold">✓</span> {c}</li>
                           ))}
                        </ul>
                      </div>
                   </div>

                   <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-3">5. Edge Cases</p>
                        <ul className="space-y-1.5">
                           {selectedPRD.fullPRD.productFlow.edgeCases.map((ec, i) => (
                             <li key={i} className="text-xs text-slate-400 flex gap-2"><span className="text-orange-500 font-bold">!</span> {ec}</li>
                           ))}
                        </ul>
                      </div>
                      <div className="p-5 bg-white/5 rounded-xl border border-white/5">
                        <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-3">6. Analytics Tracking</p>
                        <p className="text-xs text-slate-300 italic">{selectedPRD.fullPRD.productFlow.tracking}</p>
                      </div>
                   </div>
                </div>
              </section>

              <section className="space-y-6">
                <h3 className="text-lg font-black text-white border-b border-white/5 pb-3 uppercase tracking-widest italic text-blue-500">Dependencies:</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                   <div className="p-5 bg-white/5 rounded-xl border border-white/5">
                      <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-3">Infrastructure</p>
                      <p className="text-[11px] text-slate-400">{selectedPRD.fullPRD.dependencies.infra}</p>
                   </div>
                   <div className="p-5 bg-white/5 rounded-xl border border-white/5">
                      <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-3">Internal</p>
                      <p className="text-[11px] text-slate-400">{selectedPRD.fullPRD.dependencies.internal}</p>
                   </div>
                   <div className="p-5 bg-white/5 rounded-xl border border-white/5">
                      <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-3">Partner Support</p>
                      <p className="text-[11px] text-slate-400">{selectedPRD.fullPRD.dependencies.partner}</p>
                   </div>
                </div>
              </section>

              <div className="flex justify-center pt-8 border-t border-white/5">
                 <button onClick={() => setSelectedPRD(null)} className="px-10 py-4 bg-white text-black font-black uppercase text-[10px] tracking-[0.3em] rounded-full hover:bg-slate-200 transition shadow-xl">Close Specification</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <nav className="sticky top-0 z-50 bg-[#0a0c10]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-lg font-black tracking-tighter text-white">
            SAMWAD PATIL
          </span>
          <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <button onClick={(e) => scrollToSection(e, 'about')} className="hover:text-white transition">About</button>
            <button onClick={(e) => scrollToSection(e, 'work')} className="hover:text-white transition">Experience</button>
            <button onClick={(e) => scrollToSection(e, 'cases')} className="hover:text-white transition">PRDs</button>
            <button onClick={(e) => scrollToSection(e, 'skills')} className="hover:text-white transition">Skills</button>
          </div>
          <button onClick={(e) => scrollToSection(e, 'contact')} className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold rounded-full transition shadow-lg shadow-blue-600/20">
            HIRE ME
          </button>
        </div>
      </nav>

      {/* Hero Section - Centered Layout */}
      <section id="about-hero" className="relative pt-16 pb-16 md:pt-24 md:pb-24 px-6 border-b border-white/5">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          
          <div className="relative aspect-square w-full max-w-[200px] mb-10 group">
            <div className="absolute inset-0 bg-blue-600/15 blur-[60px] animate-pulse"></div>
            <div className="relative h-full w-full bg-[#111418] rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl transition duration-500">
              <img 
                src={PERSONAL_INFO.profileImage} 
                alt={PERSONAL_INFO.name} 
                className="w-full h-full object-cover transition duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10]/40 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-blue-400 text-[9px] font-black uppercase tracking-widest mb-6">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
            </span>
            Actively seeking PM Internships
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 leading-[1.1]">
            BUILDING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 uppercase italic tracking-tighter">Products</span> <br />
            FROM 0 TO 1
          </h1>
          
          <p className="text-sm md:text-lg text-slate-400 max-w-2xl leading-relaxed mb-10">
            {PERSONAL_INFO.summary}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={(e) => scrollToSection(e, 'work')} className="px-8 py-3.5 bg-white text-black font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-slate-200 transition shadow-xl shadow-white/5">
              Experience
            </button>
            <button onClick={(e) => scrollToSection(e, 'cases')} className="px-8 py-3.5 border border-white/10 text-white font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-white/5 transition">
              Explore PRDs
            </button>
          </div>
        </div>
      </section>

      <section id="work" className="py-20 px-6 bg-[#0a0c10] scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-8 mb-12 border-b border-white/5 overflow-x-auto no-scrollbar">
            {['experience', 'projects'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-3 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'text-blue-500 border-b-2 border-blue-500' : 'text-slate-500 hover:text-slate-300'}`}>
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'experience' ? (
            <div className="space-y-8">
              {EXPERIENCES.map((exp, i) => (
                <div key={i} className="group relative">
                  <div className="absolute -left-12 top-0 bottom-0 w-px bg-white/10 hidden md:block"></div>
                  <div className="absolute -left-[51px] top-2 w-2 h-2 rounded-full bg-blue-500 hidden md:block"></div>
                  
                  <div className="p-8 bg-[#111418] border border-white/5 rounded-3xl hover:bg-white/[0.02] transition duration-500">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
                       <div>
                          <h3 className="text-xl font-black text-white uppercase tracking-tight mb-1">{exp.role}</h3>
                          <div className="flex items-center gap-3">
                            <p className="text-blue-500 font-bold text-sm tracking-widest uppercase">{exp.company}</p>
                            {exp.website && (
                              <a href={exp.website.startsWith('http') ? exp.website : `https://${exp.website}`} target="_blank" rel="noopener noreferrer" className="text-[9px] font-black text-slate-500 hover:text-blue-400 transition flex items-center gap-1 uppercase tracking-widest">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                Link
                              </a>
                            )}
                          </div>
                       </div>
                       <span className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-black text-slate-500 uppercase tracking-widest">{exp.period}</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                       <div className="space-y-3">
                          {exp.description.map((item, idx) => (
                            <p key={idx} className="text-sm text-slate-400 leading-relaxed flex gap-3"><span className="text-blue-500 font-bold">/</span> {item}</p>
                          ))}
                       </div>
                       <div className="grid grid-cols-2 gap-3 h-fit">
                          {exp.metrics.map((m, idx) => (
                            <div key={idx} className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/10 text-center flex flex-col justify-center">
                              <p className="text-blue-400 font-black text-base tracking-tight">{m.split(' ')[0]}</p>
                              <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{m.split(' ').slice(1).join(' ')}</p>
                            </div>
                          ))}
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-12">
              {PROJECTS.map((proj, i) => (
                <div key={i} className="p-10 bg-blue-600 rounded-[3rem] text-white shadow-xl shadow-blue-600/10">
                  <p className="text-[9px] font-black uppercase tracking-widest text-blue-200 mb-2 italic">Product Highlight</p>
                  <h3 className="text-2xl font-black mb-6 uppercase tracking-tight">{proj.title}</h3>
                  <div className="bg-black/10 p-6 rounded-2xl mb-6 border border-white/10">
                     <p className="text-lg italic font-medium leading-relaxed">"{proj.impact}"</p>
                  </div>
                  <div className="space-y-3">
                    {proj.description.map((d, idx) => (
                      <p key={idx} className="text-sm text-blue-50 leading-relaxed opacity-90">{d}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="cases" className="py-20 px-6 bg-[#0c0e12] scroll-mt-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center md:text-left">
             <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter italic">Strategic PRDs</h2>
             <p className="text-slate-600 uppercase text-[9px] font-black tracking-[0.3em]">Mental Models & Decision Frameworks</p>
          </div>

          <div className="space-y-16">
            {CASE_STUDIES.map((study, idx) => (
              <div key={idx} className="group relative bg-[#111418] border border-white/5 rounded-3xl overflow-hidden shadow-xl hover:border-white/10 transition duration-500">
                <div className={`${study.color} px-8 py-3 text-white flex justify-between items-center`}>
                   <span className="text-[9px] font-black uppercase tracking-[0.4em]">{study.company}</span>
                   <span className="text-[9px] font-black uppercase tracking-[0.4em] opacity-80">PRD</span>
                </div>

                <div className="grid md:grid-cols-12">
                   <div className="md:col-span-3 border-r border-white/5 p-8 bg-black/10">
                      <div className="mb-8">
                         <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest mb-2 italic">North Star</p>
                         <p className="text-2xl font-black text-white tracking-tight">{study.northStarMetric.value}</p>
                         <p className="text-[8px] font-bold text-slate-600 uppercase mt-0.5 leading-tight">{study.northStarMetric.label}</p>
                      </div>
                      <div>
                         <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest mb-2 italic">Methodology</p>
                         <span className="inline-block text-[8px] font-black px-2 py-1 bg-blue-500/10 text-blue-400 rounded-md border border-blue-500/20 tracking-widest">{study.framework}</span>
                      </div>
                   </div>

                   <div className="md:col-span-9 p-8 md:p-10 bg-white/[0.01]">
                      <h3 className="text-2xl font-black text-white mb-3 leading-none uppercase tracking-tight">{study.title}</h3>
                      <p className="text-slate-400 mb-8 font-medium italic border-l-2 border-blue-500 pl-4 text-base leading-relaxed">{study.tagline}</p>
                      <button onClick={() => setSelectedPRD(study)} className="px-8 py-4 bg-white text-black font-black uppercase text-[9px] tracking-[0.3em] rounded-xl hover:bg-slate-200 transition shadow-lg flex items-center gap-3 group/btn">
                         Full Detailed PRD
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                         </svg>
                      </button>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="py-20 px-6 bg-[#0a0c10] border-t border-white/5 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center md:text-left">
             <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter italic">Technical Skills</h2>
             <p className="text-slate-600 uppercase text-[9px] font-black tracking-[0.3em]">Core competencies & PM Toolstack</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {SKILLS.map((cat, i) => (
              <div key={i} className="p-8 bg-[#111418] border border-white/5 rounded-3xl hover:border-blue-500/20 transition group">
                <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest mb-6 italic">{cat.category}</p>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-xl text-[11px] font-bold text-slate-400 group-hover:text-white group-hover:bg-white/10 transition duration-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" className="py-20 border-t border-white/5 bg-[#0a0c10] text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-10 italic uppercase tracking-tighter">Ready for the <span className="text-blue-600">next</span> MVP</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href={`mailto:${PERSONAL_INFO.email}`} className="px-8 py-4 bg-blue-600 text-white font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-blue-500 transition shadow-lg shadow-blue-600/20">Shoot an Email</a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-white/10 transition">LinkedIn Profile</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
