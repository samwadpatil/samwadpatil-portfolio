
import React, { useState } from 'react';
import { PERSONAL_INFO, EXPERIENCES, PROJECTS, CASE_STUDIES, SKILLS, CERTIFICATIONS, EDUCATION } from './data';
import { CaseStudy } from './types';

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
      {/* Dynamic Background Accents */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[50%] bg-blue-600/10 rounded-full blur-[160px] animate-pulse"></div>
        <div className="absolute bottom-[0%] right-[-5%] w-[60%] h-[50%] bg-indigo-600/10 rounded-full blur-[160px]"></div>
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>

      {/* PRD Detailed Modal */}
      {selectedPRD && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 animate-in fade-in zoom-in duration-200">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={() => setSelectedPRD(null)}></div>
          <div className="relative w-full max-w-6xl max-h-[92vh] bg-[#111418] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col">
            
            <div className={`${selectedPRD.color} px-8 py-6 text-white flex justify-between items-center shrink-0`}>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-80 mb-1">{selectedPRD.company}</p>
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">{selectedPRD.title}</h2>
              </div>
              <button onClick={() => setSelectedPRD(null)} className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 md:p-14 space-y-20 no-scrollbar">
              <section className="space-y-8">
                <h3 className="text-lg font-black text-white border-b border-white/5 pb-4 uppercase tracking-widest italic text-blue-500">Why? (Objective)</h3>
                <div className="grid md:grid-cols-2 gap-8">
                   <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/5 shadow-inner">
                      <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3">1. Business Objective</p>
                      <p className="text-sm text-slate-300 leading-relaxed">{selectedPRD.fullPRD.why.business}</p>
                   </div>
                   <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/5 shadow-inner">
                      <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3">2. User Value</p>
                      <p className="text-sm text-slate-300 leading-relaxed">{selectedPRD.fullPRD.why.users}</p>
                   </div>
                </div>
              </section>

              <section className="space-y-8">
                <h3 className="text-lg font-black text-white border-b border-white/5 pb-4 uppercase tracking-widest italic text-blue-500">How do we measure success?</h3>
                <div className="space-y-6">
                   <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/5 shadow-inner">
                      <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">1. Associated OKR/Goal</p>
                      <p className="text-base text-white font-bold">{selectedPRD.fullPRD.measurement.okr}</p>
                   </div>
                   <div className="grid md:grid-cols-2 gap-8">
                      <div className="p-6 bg-green-500/[0.02] border border-green-500/10 rounded-2xl">
                        <p className="text-[10px] font-black text-green-500 uppercase tracking-widest mb-4">2. Success Metrics</p>
                        <ul className="space-y-3">
                           {selectedPRD.fullPRD.measurement.success.map((m, i) => (
                             <li key={i} className="text-sm text-slate-300 flex gap-3"><span className="text-green-500 font-bold">✓</span> {m}</li>
                           ))}
                        </ul>
                      </div>
                      <div className="p-6 bg-red-500/[0.02] border border-red-500/10 rounded-2xl">
                        <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-4">3. Guardrail Metrics</p>
                        <ul className="space-y-3">
                           {selectedPRD.fullPRD.measurement.guardrail.map((m, i) => (
                             <li key={i} className="text-sm text-slate-300 flex gap-3"><span className="text-red-500 font-bold">!</span> {m}</li>
                           ))}
                        </ul>
                      </div>
                   </div>
                </div>
              </section>

              <section className="space-y-8">
                <h3 className="text-lg font-black text-white border-b border-white/5 pb-4 uppercase tracking-widest italic text-blue-500">Who are the users:</h3>
                <div className="grid md:grid-cols-2 gap-8">
                   <div className="space-y-8">
                      <div>
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3">1. Persona</p>
                        <p className="text-sm text-white font-medium bg-white/5 p-4 rounded-xl border border-white/5">{selectedPRD.fullPRD.users.persona}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3">3. Research Insights</p>
                        <p className="text-sm text-slate-400 italic bg-white/5 p-4 rounded-xl border border-white/5 leading-relaxed">"{selectedPRD.fullPRD.users.research}"</p>
                      </div>
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3">2. Problems Solved</p>
                      <ul className="space-y-3">
                         {selectedPRD.fullPRD.users.problems.map((p, i) => (
                           <li key={i} className="text-sm p-4 bg-white/[0.03] border border-white/5 rounded-xl text-slate-300 shadow-sm leading-relaxed">{p}</li>
                         ))}
                      </ul>
                   </div>
                </div>
              </section>

              <section className="space-y-8">
                <h3 className="text-lg font-black text-white border-b border-white/5 pb-4 uppercase tracking-widest italic text-blue-500">Solution:</h3>
                <div className="space-y-8">
                   <div className="p-8 bg-blue-600/[0.03] border border-blue-500/10 rounded-[2rem] shadow-inner">
                      <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">1. Solution Brief</p>
                      <p className="text-sm md:text-base text-white leading-relaxed">{selectedPRD.fullPRD.solution.brief}</p>
                   </div>
                   <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">2. Alternatives Considered</p>
                      <p className="text-sm text-slate-400 italic leading-relaxed">{selectedPRD.fullPRD.solution.alternatives}</p>
                   </div>
                </div>
              </section>

              <section className="space-y-8">
                <h3 className="text-lg font-black text-white border-b border-white/5 pb-4 uppercase tracking-widest italic text-blue-500">Product flow:</h3>
                <div className="space-y-8">
                   <div className="grid md:grid-cols-2 gap-8">
                      <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/5">
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3">1. Customer Journey</p>
                        <p className="text-sm text-slate-300 leading-relaxed">{selectedPRD.fullPRD.productFlow.journey}</p>
                      </div>
                      <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/5">
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3">2. Wireframes & Flow</p>
                        <p className="text-sm text-slate-300 leading-relaxed">{selectedPRD.fullPRD.productFlow.wireframes}</p>
                      </div>
                   </div>
                   
                   <div className="grid md:grid-cols-2 gap-8">
                      <div className="p-6 bg-white/[0.01] rounded-2xl border border-white/5">
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">3. User Stories</p>
                        <ul className="space-y-3">
                           {selectedPRD.fullPRD.productFlow.stories.map((s, i) => (
                             <li key={i} className="text-sm text-slate-400 flex gap-3 leading-relaxed"><span className="text-blue-500 font-bold">»</span> {s}</li>
                           ))}
                        </ul>
                      </div>
                      <div className="p-6 bg-white/[0.01] rounded-2xl border border-white/5">
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">4. Acceptance Criteria</p>
                        <ul className="space-y-3">
                           {selectedPRD.fullPRD.productFlow.criteria.map((c, i) => (
                             <li key={i} className="text-sm text-slate-400 flex gap-3 leading-relaxed"><span className="text-green-500 font-bold">✓</span> {c}</li>
                           ))}
                        </ul>
                      </div>
                   </div>

                   <div className="grid md:grid-cols-2 gap-8">
                      <div className="p-6 bg-white/[0.01] rounded-2xl border border-white/5">
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">5. Edge Cases</p>
                        <ul className="space-y-3">
                           {selectedPRD.fullPRD.productFlow.edgeCases.map((ec, i) => (
                             <li key={i} className="text-sm text-slate-400 flex gap-3 leading-relaxed"><span className="text-orange-500 font-bold">!</span> {ec}</li>
                           ))}
                        </ul>
                      </div>
                      <div className="p-6 bg-white/[0.01] rounded-2xl border border-white/5 flex flex-col justify-center">
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3">6. Analytics Tracking</p>
                        <p className="text-sm text-slate-300 italic leading-relaxed">{selectedPRD.fullPRD.productFlow.tracking}</p>
                      </div>
                   </div>
                </div>
              </section>

              <section className="space-y-8">
                <h3 className="text-lg font-black text-white border-b border-white/5 pb-4 uppercase tracking-widest italic text-blue-500">Dependencies:</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                   <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/5 shadow-sm">
                      <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3">Infrastructure</p>
                      <p className="text-[13px] text-slate-400 leading-relaxed">{selectedPRD.fullPRD.dependencies.infra}</p>
                   </div>
                   <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/5 shadow-sm">
                      <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3">Internal Teams</p>
                      <p className="text-[13px] text-slate-400 leading-relaxed">{selectedPRD.fullPRD.dependencies.internal}</p>
                   </div>
                   <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/5 shadow-sm">
                      <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3">Partner Support</p>
                      <p className="text-[13px] text-slate-400 leading-relaxed">{selectedPRD.fullPRD.dependencies.partner}</p>
                   </div>
                </div>
              </section>

              <div className="flex justify-center pt-8 border-t border-white/5">
                 <button onClick={() => setSelectedPRD(null)} className="px-12 py-5 bg-white text-black font-black uppercase text-[11px] tracking-[0.4em] rounded-full hover:bg-slate-200 transition shadow-2xl">Close Specification</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="sticky top-0 z-[80] bg-[#0a0c10]/70 backdrop-blur-2xl border-b border-white/5 transition-all">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-black tracking-tighter text-white uppercase group cursor-pointer">
            SAMWAD <span className="text-blue-500">PATIL</span>
          </span>
          <div className="hidden md:flex items-center gap-10 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <button onClick={(e) => scrollToSection(e, 'about')} className="hover:text-white transition-colors py-2">About</button>
            <button onClick={(e) => scrollToSection(e, 'work')} className="hover:text-white transition-colors py-2">Experience</button>
            <button onClick={(e) => scrollToSection(e, 'cases')} className="hover:text-white transition-colors py-2">PRDs</button>
            <button onClick={(e) => scrollToSection(e, 'skills')} className="hover:text-white transition-colors py-2">Skills</button>
          </div>
          <button onClick={(e) => scrollToSection(e, 'contact')} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black rounded-full transition-all shadow-xl shadow-blue-600/20 active:scale-95">
            HIRE ME
          </button>
        </div>
      </nav>

      {/* Premium Hero Section */}
      <section id="about" className="relative pt-12 pb-24 md:pt-28 md:pb-36 px-6 z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          
          {/* Centered Profile Picture with High-End Framing */}
          <div className="relative mb-14 group">
            {/* Multi-layered glow */}
            <div className="absolute inset-0 bg-blue-600/20 blur-[80px] rounded-full opacity-60 transition-opacity group-hover:opacity-100"></div>
            <div className="absolute inset-[-15px] border border-blue-500/10 rounded-full animate-[spin_10s_linear_infinite] opacity-50"></div>
            
            <div className="relative aspect-square w-48 h-48 md:w-56 md:h-56 p-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 shadow-2xl overflow-hidden group">
              <div className="w-full h-full rounded-full overflow-hidden border border-white/10">
                <img 
                  src={PERSONAL_INFO.profileImage} 
                  alt={PERSONAL_INFO.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
              </div>
              {/* Refined lighting overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-white/5 pointer-events-none"></div>
            </div>
          </div>

          {/* Availability Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-10 backdrop-blur-sm shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Actively seeking PM Internships
          </div>
          
          {/* Main Headline */}
          <h1 className="text-5xl md:text-8xl font-black tracking-tight text-white mb-8 leading-[1] uppercase">
            BUILDING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 italic tracking-tighter">Products</span> <br />
            <span className="opacity-90">FROM 0 TO 1</span>
          </h1>
          
          {/* Professional Summary */}
          <p className="text-base md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-14 font-medium px-4">
            {PERSONAL_INFO.summary}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-6">
            <button onClick={(e) => scrollToSection(e, 'work')} className="px-10 py-5 bg-white text-black font-black uppercase text-[11px] tracking-[0.4em] rounded-2xl hover:bg-blue-50 transition-all shadow-2xl shadow-white/5 hover:translate-y-[-2px] active:translate-y-[1px]">
              The Journey
            </button>
            <button onClick={(e) => scrollToSection(e, 'cases')} className="px-10 py-5 border border-white/10 text-white font-black uppercase text-[11px] tracking-[0.4em] rounded-2xl hover:bg-white/5 transition-all hover:border-white/20 hover:translate-y-[-2px] active:translate-y-[1px]">
              Explore PRDs
            </button>
          </div>
        </div>
      </section>

      {/* Experience & Impact Sections - Keeping existing functionality but tightening UI */}
      <section id="work" className="py-24 px-6 bg-[#0a0c10]/50 backdrop-blur-sm scroll-mt-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center md:justify-start gap-12 mb-16 border-b border-white/5">
            {['experience', 'projects'].map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)} 
                className={`pb-4 text-[11px] font-black uppercase tracking-[0.3em] transition-all relative ${activeTab === tab ? 'text-blue-500' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {tab}
                {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500"></div>}
              </button>
            ))}
          </div>

          {activeTab === 'experience' ? (
            <div className="space-y-12">
              {EXPERIENCES.map((exp, i) => (
                <div key={i} className="group relative p-10 bg-[#111418]/60 border border-white/5 rounded-[2.5rem] hover:bg-white/[0.03] transition-all duration-500 shadow-xl">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
                     <div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-blue-400 transition-colors">{exp.role}</h3>
                        <div className="flex items-center gap-4">
                          <p className="text-blue-500 font-bold text-sm tracking-widest uppercase">{exp.company}</p>
                          {exp.website && (
                            <a href={exp.website} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black text-slate-500 hover:text-white transition flex items-center gap-1 uppercase tracking-widest">
                              Visit
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}
                        </div>
                     </div>
                     <span className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest">{exp.period}</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-12">
                     <div className="space-y-4">
                        {exp.description.map((item, idx) => (
                          <p key={idx} className="text-[15px] text-slate-400 leading-relaxed flex gap-4"><span className="text-blue-500 font-black">/</span> {item}</p>
                        ))}
                     </div>
                     <div className="grid grid-cols-2 gap-4 h-fit">
                        {exp.metrics.map((m, idx) => (
                          <div key={idx} className="p-6 bg-blue-500/[0.03] rounded-2xl border border-blue-500/10 text-center flex flex-col justify-center transition-transform hover:scale-105">
                            <p className="text-blue-400 font-black text-xl tracking-tight leading-none mb-1">{m.split(' ')[0]}</p>
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.15em]">{m.split(' ').slice(1).join(' ')}</p>
                          </div>
                        ))}
                     </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-12">
              {PROJECTS.map((proj, i) => (
                <div key={i} className="p-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
                    </svg>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-200 mb-4 italic">Product Showcase</p>
                  <h3 className="text-3xl font-black mb-8 uppercase tracking-tight">{proj.title}</h3>
                  <div className="bg-black/10 backdrop-blur-md p-8 rounded-3xl mb-8 border border-white/10">
                     <p className="text-xl italic font-medium leading-relaxed">"{proj.impact}"</p>
                  </div>
                  <div className="space-y-4">
                    {proj.description.map((d, idx) => (
                      <p key={idx} className="text-[15px] text-blue-50 leading-relaxed opacity-90 flex gap-3"><span className="text-white/50">→</span> {d}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Artifacts/PRDs Section */}
      <section id="cases" className="py-24 px-6 bg-[#0c0e12] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20 text-center md:text-left">
             <h2 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter italic">Strategic PRDs</h2>
             <p className="text-slate-500 uppercase text-[10px] font-black tracking-[0.5em] ml-1">Evidence-Based Product Decisions</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {CASE_STUDIES.map((study, idx) => (
              <div key={idx} className="group relative bg-[#111418] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-white/10">
                <div className={`${study.color} px-10 py-5 text-white flex justify-between items-center`}>
                   <span className="text-[10px] font-black uppercase tracking-[0.4em]">{study.company}</span>
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-80">Full Spec</span>
                </div>

                <div className="p-10 space-y-8">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight uppercase tracking-tight">{study.title}</h3>
                    <p className="text-slate-400 font-medium italic border-l-2 border-blue-500 pl-6 text-base leading-relaxed">{study.tagline}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/5">
                    <div>
                      <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-3 italic">North Star</p>
                      <p className="text-2xl font-black text-white tracking-tight leading-none">{study.northStarMetric.value}</p>
                      <p className="text-[9px] font-bold text-slate-600 uppercase mt-2 leading-tight">{study.northStarMetric.label}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-3 italic">Strategy</p>
                      <span className="inline-block text-[9px] font-black px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20 tracking-widest uppercase">{study.framework}</span>
                    </div>
                  </div>

                  <button onClick={() => setSelectedPRD(study)} className="w-full py-5 bg-white text-black font-black uppercase text-[10px] tracking-[0.4em] rounded-2xl hover:bg-slate-100 transition shadow-xl flex items-center justify-center gap-3">
                     View Specification
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                     </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Matrix */}
      <section id="skills" className="py-24 px-6 bg-[#0a0c10] border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20 text-center md:text-left">
             <h2 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter italic">Skillset Matrix</h2>
             <p className="text-slate-500 uppercase text-[10px] font-black tracking-[0.5em] ml-1">Toolstack & Core Competencies</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {SKILLS.map((cat, i) => (
              <div key={i} className="p-10 bg-[#111418]/60 border border-white/5 rounded-[2.5rem] hover:border-blue-500/30 transition-all group">
                <p className="text-[11px] font-black text-blue-500 uppercase tracking-[0.3em] mb-8 italic">{cat.category}</p>
                <div className="flex flex-wrap gap-3">
                  {cat.items.map((skill, idx) => (
                    <span key={idx} className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-[12px] font-bold text-slate-400 group-hover:text-white group-hover:bg-white/10 transition duration-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Education Mini Card */}
          <div className="mt-10 p-10 bg-white/[0.02] border border-white/5 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2">Education</p>
              <h4 className="text-xl font-black text-white">{EDUCATION.institution}</h4>
              <p className="text-slate-400 font-medium">{EDUCATION.degree}</p>
            </div>
            <div className="px-8 py-3 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-full text-[11px] font-black uppercase tracking-[0.3em]">
              Expected {EDUCATION.expected}
            </div>
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <footer id="contact" className="py-24 md:py-36 border-t border-white/5 bg-[#0a0c10] text-center overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-5xl md:text-8xl font-black text-white mb-14 italic uppercase tracking-tighter leading-none">
            Scale the <span className="text-blue-600">Vision</span>
          </h2>
          <div className="flex flex-wrap gap-6 justify-center items-center">
            <div className="flex flex-col items-center gap-3">
              <a href={`mailto:${PERSONAL_INFO.email}`} className="px-14 py-6 bg-blue-600 text-white font-black uppercase text-[11px] tracking-[0.4em] rounded-2xl hover:bg-blue-500 transition-all shadow-2xl shadow-blue-600/20 hover:scale-105 active:scale-95">
                Shoot an Email
              </a>
              <span className="text-[12px] font-bold text-slate-400 lowercase tracking-widest select-all">
                {PERSONAL_INFO.email}
              </span>
            </div>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="px-14 py-6 bg-white/5 border border-white/10 text-white font-black uppercase text-[11px] tracking-[0.4em] rounded-2xl hover:bg-white/10 transition-all hover:scale-105 active:scale-95">
              LinkedIn Profile
            </a>
          </div>
          <p className="mt-20 text-[10px] font-black text-slate-600 uppercase tracking-[0.5em]">
            © SAMWAD PATIL • PRODUCT MANAGEMENT
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
