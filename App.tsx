import React, { useState, useEffect, useRef } from 'react';
import { PERSONAL_INFO, EXPERIENCES, PROJECTS, CASE_STUDIES, SKILLS, CERTIFICATIONS, EDUCATION } from './data';
import { CaseStudy } from './types';
import AIChatAssistant from './components/AIChatAssistant';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('experience');
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [selectedPRD, setSelectedPRD] = useState<CaseStudy | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedImg = localStorage.getItem('samwad_profile_identity_v2');
    if (savedImg) {
      setProfileImg(savedImg);
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImg(base64String);
        localStorage.setItem('samwad_profile_identity_v2', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-200 selection:bg-blue-500/30 font-sans">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImageUpload} 
        accept="image/*" 
        className="hidden" 
      />

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
          <div className="relative w-full max-w-6xl max-h-[92vh] bg-[#111418] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col">
            
            <div className={`${selectedPRD.color} px-8 py-6 text-white flex justify-between items-center shrink-0`}>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-80 mb-1">{selectedPRD.company}</p>
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">{selectedPRD.title}</h2>
              </div>
              <button onClick={() => setSelectedPRD(null)} className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 md:p-16 space-y-24 no-scrollbar bg-white/[0.01]">
              
              <section className="space-y-8">
                <h3 className="text-xl font-black text-white border-b border-white/5 pb-4 uppercase tracking-widest italic text-blue-500">Why? (Objective)</h3>
                <div className="grid md:grid-cols-2 gap-12">
                   <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">1. For business.</p>
                      <p className="text-sm text-slate-300 leading-relaxed">{selectedPRD.fullPRD.why.business}</p>
                   </div>
                   <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">2. For users.</p>
                      <p className="text-sm text-slate-300 leading-relaxed">{selectedPRD.fullPRD.why.users}</p>
                   </div>
                </div>
              </section>

              <section className="space-y-8">
                <h3 className="text-xl font-black text-white border-b border-white/5 pb-4 uppercase tracking-widest italic text-blue-500">How do we measure success?</h3>
                <div className="space-y-6">
                   <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3">1. Associated OKR/Goal</p>
                      <p className="text-white font-bold">{selectedPRD.fullPRD.measurement.okr}</p>
                   </div>
                   <div className="grid md:grid-cols-2 gap-12">
                      <div>
                        <p className="text-[10px] font-black text-green-500 uppercase tracking-widest mb-3">2. Success Metrics</p>
                        <ul className="space-y-2">
                           {selectedPRD.fullPRD.measurement.success.map((m, i) => (
                             <li key={i} className="text-sm text-slate-400 flex gap-3"><span className="text-green-500 font-bold">✓</span> {m}</li>
                           ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-3">3. Guardrail/Do not disturb metrics</p>
                        <ul className="space-y-2">
                           {selectedPRD.fullPRD.measurement.guardrail.map((m, i) => (
                             <li key={i} className="text-sm text-slate-400 flex gap-3"><span className="text-red-500 font-bold">!</span> {m}</li>
                           ))}
                        </ul>
                      </div>
                   </div>
                </div>
              </section>

              <section className="space-y-8">
                <h3 className="text-xl font-black text-white border-b border-white/5 pb-4 uppercase tracking-widest italic text-blue-500">Who are the users:</h3>
                <div className="grid md:grid-cols-2 gap-12">
                   <div className="space-y-6">
                      <div>
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3">1. Persona</p>
                        <p className="text-sm text-white font-medium">{selectedPRD.fullPRD.users.persona}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3">3. How do we know these problems exist (research)</p>
                        <p className="text-sm text-slate-400 italic">"{selectedPRD.fullPRD.users.research}"</p>
                      </div>
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3">2. Problems we are solving</p>
                      <ul className="space-y-3">
                         {selectedPRD.fullPRD.users.problems.map((p, i) => (
                           <li key={i} className="text-sm p-4 bg-white/5 border border-white/5 rounded-xl text-slate-300">{p}</li>
                         ))}
                      </ul>
                   </div>
                </div>
              </section>

              <section className="space-y-8">
                <h3 className="text-xl font-black text-white border-b border-white/5 pb-4 uppercase tracking-widest italic text-blue-500">Solution:</h3>
                <div className="space-y-8">
                   <div className="p-8 bg-blue-600/5 border border-blue-500/10 rounded-[2rem]">
                      <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">1. Brief of the solution.</p>
                      <p className="text-base text-white leading-relaxed">{selectedPRD.fullPRD.solution.brief}</p>
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">2. Other alternatives are considered with prioritization metrics.</p>
                      <p className="text-sm text-slate-400 italic">{selectedPRD.fullPRD.solution.alternatives}</p>
                   </div>
                </div>
              </section>

              <section className="space-y-8">
                <h3 className="text-xl font-black text-white border-b border-white/5 pb-4 uppercase tracking-widest italic text-blue-500">Product flow (Details of the feature/product):</h3>
                <div className="space-y-10">
                   <div className="grid md:grid-cols-2 gap-12">
                      <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">1. Customer Journey</p>
                        <p className="text-sm text-slate-300">{selectedPRD.fullPRD.productFlow.journey}</p>
                      </div>
                      <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">2. Wireframes and Flow diagrams</p>
                        <p className="text-sm text-slate-300">{selectedPRD.fullPRD.productFlow.wireframes}</p>
                      </div>
                   </div>
                   
                   <div className="grid md:grid-cols-2 gap-12">
                      <div>
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">3. User Stories</p>
                        <ul className="space-y-2">
                           {selectedPRD.fullPRD.productFlow.stories.map((s, i) => (
                             <li key={i} className="text-sm text-slate-400 flex gap-3"><span className="text-blue-500 font-bold">»</span> {s}</li>
                           ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">4. User acceptance criteria</p>
                        <ul className="space-y-2">
                           {selectedPRD.fullPRD.productFlow.criteria.map((c, i) => (
                             <li key={i} className="text-sm text-slate-400 flex gap-3"><span className="text-green-500 font-bold">✓</span> {c}</li>
                           ))}
                        </ul>
                      </div>
                   </div>

                   <div className="grid md:grid-cols-2 gap-12">
                      <div>
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">5. Edge cases</p>
                        <ul className="space-y-2">
                           {selectedPRD.fullPRD.edgeCases.map((ec, i) => (
                             <li key={i} className="text-sm text-slate-400 flex gap-3"><span className="text-orange-500 font-bold">!</span> {ec}</li>
                           ))}
                        </ul>
                      </div>
                      <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">6. Event tracking sheet</p>
                        <p className="text-sm text-slate-300 italic">{selectedPRD.fullPRD.productFlow.tracking}</p>
                      </div>
                   </div>
                </div>
              </section>

              <section className="space-y-8">
                <h3 className="text-xl font-black text-white border-b border-white/5 pb-4 uppercase tracking-widest italic text-blue-500">Dependencies:</h3>
                <div className="grid md:grid-cols-3 gap-8">
                   <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">1. Open Questions</p>
                      <p className="text-xs text-slate-400">{selectedPRD.fullPRD.dependencies.questions}</p>
                   </div>
                   <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">2. Infrastructure requirements</p>
                      <p className="text-xs text-slate-400">{selectedPRD.fullPRD.dependencies.infra}</p>
                   </div>
                   <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">3. Budget approvals</p>
                      <p className="text-xs text-slate-400">{selectedPRD.fullPRD.dependencies.budget}</p>
                   </div>
                   <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">4. Partner Support</p>
                      <p className="text-xs text-slate-400">{selectedPRD.fullPRD.dependencies.partner}</p>
                   </div>
                   <div className="p-6 bg-white/5 rounded-2xl border border-white/5 md:col-span-2">
                      <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">5. Internal Dependencies</p>
                      <p className="text-xs text-slate-400">{selectedPRD.fullPRD.dependencies.internal}</p>
                   </div>
                </div>
              </section>

              <div className="flex justify-center pt-12 border-t border-white/5">
                 <button onClick={() => setSelectedPRD(null)} className="px-12 py-5 bg-white text-black font-black uppercase text-xs tracking-[0.3em] rounded-full hover:bg-slate-200 transition shadow-xl">Close Specification</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <nav className="sticky top-0 z-50 bg-[#0a0c10]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-black tracking-tighter text-white">
            SAMWAD<span className="text-blue-500">.</span>PATIL
          </span>
          <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-slate-400">
            <button onClick={(e) => scrollToSection(e, 'about')} className="hover:text-white transition">About</button>
            <button onClick={(e) => scrollToSection(e, 'work')} className="hover:text-white transition">Experience</button>
            <button onClick={(e) => scrollToSection(e, 'cases')} className="hover:text-white transition">PRDs</button>
            <button onClick={(e) => scrollToSection(e, 'skills')} className="hover:text-white transition">Skills</button>
            <button onClick={(e) => scrollToSection(e, 'contact')} className="hover:text-white transition">Contact</button>
          </div>
          <button onClick={(e) => scrollToSection(e, 'contact')} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-full transition shadow-lg shadow-blue-600/20">
            Hire Me
          </button>
        </div>
      </nav>

      <section id="about-hero" className="relative pt-24 pb-20 md:pt-40 md:pb-32 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-16 items-center">
          <div className="md:col-span-7 order-2 md:order-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Actively seeking PM Internships
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tight text-white mb-8 leading-[0.9]">
              BUILDING <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 uppercase italic tracking-tighter">Products</span> <br />
              FROM 0 TO 1
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-10 mx-auto md:mx-0">
              {PERSONAL_INFO.summary}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <button onClick={(e) => scrollToSection(e, 'work')} className="px-8 py-4 bg-white text-black font-black uppercase text-xs tracking-widest rounded-xl hover:bg-slate-200 transition">
                View My Experience
              </button>
              <button onClick={(e) => scrollToSection(e, 'cases')} className="px-8 py-4 border border-white/10 text-white font-black uppercase text-xs tracking-widest rounded-xl hover:bg-white/5 transition">
                Explore PRDs
              </button>
            </div>
          </div>

          <div className="md:col-span-5 order-1 md:order-2">
            <div onClick={triggerUpload} className="relative aspect-square w-full max-w-[380px] mx-auto md:ml-auto cursor-pointer group">
              <div className="absolute inset-0 bg-blue-600/20 blur-[100px] animate-pulse group-hover:bg-blue-600/30 transition duration-700"></div>
              <div className="relative h-full w-full bg-[#111418] rounded-[4rem] border-2 border-white/10 overflow-hidden shadow-2xl transition duration-500 group-hover:border-blue-500/50">
                {profileImg ? (
                  <img src={profileImg} alt={PERSONAL_INFO.name} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-600/10 to-indigo-600/10">
                    <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Click to set photo</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
                   <p className="text-xs font-black text-white uppercase tracking-widest mb-1">{PERSONAL_INFO.name}</p>
                   <p className="text-[9px] font-bold text-blue-400 uppercase tracking-widest opacity-80">{PERSONAL_INFO.title}</p>
                </div>
                <div className="absolute inset-0 bg-blue-600/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                   <div className="bg-white px-4 py-2 rounded-full text-[10px] font-black uppercase text-black tracking-widest">Change Photo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="py-24 px-6 bg-[#0a0c10] scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-8 mb-16 border-b border-white/5 overflow-x-auto no-scrollbar">
            {['experience', 'projects'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-4 text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'text-blue-500 border-b-2 border-blue-500' : 'text-slate-500 hover:text-slate-300'}`}>
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'experience' ? (
            <div className="space-y-12">
              {EXPERIENCES.map((exp, i) => (
                <div key={i} className="group relative">
                  <div className="absolute -left-12 top-0 bottom-0 w-px bg-white/10 hidden md:block"></div>
                  <div className="absolute -left-[51px] top-2 w-2 h-2 rounded-full bg-blue-500 hidden md:block"></div>
                  
                  <div className="p-10 bg-[#111418] border border-white/5 rounded-[3rem] hover:bg-white/[0.02] transition duration-500">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-10">
                       <div>
                          <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-2">{exp.role}</h3>
                          <div className="flex items-center gap-3">
                            <p className="text-blue-500 font-bold text-base tracking-widest uppercase">{exp.company}</p>
                            {exp.website && (
                              <a href={exp.website.startsWith('http') ? exp.website : `https://${exp.website}`} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black text-slate-500 hover:text-blue-400 transition flex items-center gap-1 uppercase tracking-widest">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                Visit Site
                              </a>
                            )}
                          </div>
                       </div>
                       <span className="px-4 py-2 bg-white/5 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest">{exp.period}</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12">
                       <div className="space-y-4">
                          {exp.description.map((item, idx) => (
                            <p key={idx} className="text-[15px] text-slate-400 leading-relaxed flex gap-4"><span className="text-blue-500 font-bold">/</span> {item}</p>
                          ))}
                       </div>
                       <div className="grid grid-cols-2 gap-4 h-fit">
                          {exp.metrics.map((m, idx) => (
                            <div key={idx} className="p-6 bg-blue-500/5 rounded-2xl border border-blue-500/10 text-center flex flex-col justify-center">
                              <p className="text-blue-400 font-black text-lg tracking-tight mb-1">{m.split(' ')[0]}</p>
                              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{m.split(' ').slice(1).join(' ')}</p>
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
                <div key={i} className="p-12 bg-blue-600 rounded-[3.5rem] text-white shadow-2xl shadow-blue-600/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-4 italic">Product Highlight</p>
                  <h3 className="text-4xl font-black mb-8 uppercase tracking-tight">{proj.title}</h3>
                  <div className="bg-black/20 p-8 rounded-3xl mb-8 border border-white/10">
                     <p className="text-2xl italic font-medium leading-relaxed">"{proj.impact}"</p>
                  </div>
                  <div className="space-y-4">
                    {proj.description.map((d, idx) => (
                      <p key={idx} className="text-base text-blue-50 leading-relaxed opacity-90">{d}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="cases" className="py-24 px-6 bg-[#0c0e12] scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20 text-center md:text-left">
             <h2 className="text-5xl font-black text-white mb-4 uppercase tracking-tighter italic">Strategic PRDs</h2>
             <p className="text-slate-500 uppercase text-[10px] font-black tracking-[0.3em]">Mental Models & Decision Frameworks</p>
          </div>

          <div className="space-y-24">
            {CASE_STUDIES.map((study, idx) => (
              <div key={idx} className="group relative bg-[#111418] border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl hover:border-white/10 transition duration-500">
                <div className={`${study.color} px-10 py-5 text-white flex justify-between items-center`}>
                   <span className="text-[10px] font-black uppercase tracking-[0.4em]">{study.company}</span>
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-80">PRD</span>
                </div>

                <div className="grid md:grid-cols-12">
                   <div className="md:col-span-3 border-r border-white/5 p-10 bg-black/10">
                      <div className="mb-10">
                         <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-4 italic">North Star</p>
                         <p className="text-3xl font-black text-white tracking-tight">{study.northStarMetric.value}</p>
                         <p className="text-[10px] font-bold text-slate-500 uppercase mt-1 leading-tight">{study.northStarMetric.label}</p>
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-4 italic">Methodology</p>
                         <span className="inline-block text-[10px] font-black px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20 tracking-widest">{study.framework}</span>
                      </div>
                   </div>

                   <div className="md:col-span-9 p-10 md:p-14 bg-white/[0.01]">
                      <h3 className="text-4xl font-black text-white mb-4 leading-none uppercase tracking-tight">{study.title}</h3>
                      <p className="text-slate-400 mb-10 font-medium italic border-l-2 border-blue-500 pl-6 text-lg">{study.tagline}</p>
                      <div className="flex flex-col md:flex-row gap-12 items-center justify-between">
                         <div className="flex-1">
                            <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                               <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                               Problem Context
                            </h4>
                            <p className="text-sm text-slate-400 leading-relaxed max-w-lg">{study.sections[0].content}</p>
                         </div>
                         <div className="shrink-0">
                            <button onClick={() => setSelectedPRD(study)} className="px-10 py-5 bg-white text-black font-black uppercase text-[10px] tracking-[0.3em] rounded-2xl hover:bg-slate-200 transition shadow-2xl flex items-center gap-4 group/btn">
                               Full Detailed PRD
                               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover/btn:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                               </svg>
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="py-24 px-6 bg-[#0a0c10] border-y border-white/5 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20 text-center md:text-left">
             <h2 className="text-5xl font-black text-white mb-4 uppercase tracking-tighter italic">Technical Skills</h2>
             <p className="text-slate-500 uppercase text-[10px] font-black tracking-[0.3em]">Core competencies & PM Toolstack</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {SKILLS.map((cat, i) => (
              <div key={i} className="p-10 bg-[#111418] border border-white/5 rounded-[3rem] hover:border-blue-500/20 transition group">
                <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-8 italic">{cat.category}</p>
                <div className="flex flex-wrap gap-3">
                  {cat.items.map((skill, idx) => (
                    <span key={idx} className="px-5 py-2.5 bg-white/5 border border-white/5 rounded-2xl text-[13px] font-bold text-slate-400 group-hover:text-white group-hover:bg-white/10 transition duration-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="p-10 bg-[#111418] rounded-[3rem] border border-white/5">
             <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-6">Key Certifications</p>
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               {CERTIFICATIONS.map((cert, idx) => (
                 <div key={idx} className="flex justify-between items-center group">
                    <p className="text-sm font-bold text-white uppercase group-hover:text-blue-400 transition">{cert.name}</p>
                    <span className="text-[10px] font-black text-slate-500">{cert.year}</span>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-24 px-6 bg-[#0a0c10] scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
             <h2 className="text-5xl font-black text-white mb-4 uppercase tracking-tighter italic">About Me</h2>
             <p className="text-slate-500 uppercase text-[10px] font-black tracking-[0.3em]">The Story behind the product manager</p>
          </div>
          
          <div className="space-y-12">
            <div className="p-10 bg-[#111418] border border-white/5 rounded-[3rem] relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl rounded-full"></div>
               <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-medium">
                I am a Final Year Electrical Engineering student at <span className="text-blue-500 font-bold">MIT</span> who found his true calling at the intersection of user psychology and business logic. 
                What started as a curiosity about how people interact with technology turned into a passion for building products that solve real-world problems.
               </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
               <div className="p-10 bg-white/[0.02] border border-white/5 rounded-[3rem]">
                  <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-6">Why Product Management?</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    In engineering, I learned to solve technical problems. In entrepreneurship, I learned to solve market problems. 
                    Product Management allows me to do both—crafting technical solutions that actually move business metrics and delight users. 
                    I thrive in the ambiguity of the "0-to-1" phase.
                  </p>
               </div>
               <div className="p-10 bg-white/[0.02] border border-white/5 rounded-[3rem]">
                  <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-6">Beyond the PRD</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    When I'm not drafting roadmaps or analyzing user heatmaps, I’m deep-diving into the fashion industry—specifically anime-inspired streetwear. 
                    I believe the discipline of running a brand teaches you more about customer retention and brand loyalty than any textbook ever could.
                  </p>
               </div>
            </div>

            <div className="p-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
               <div className="flex gap-4">
                  <div className="p-4 bg-white/5 rounded-2xl text-center">
                    <p className="text-xs font-black text-blue-500 uppercase mb-1">Status</p>
                    <p className="text-sm font-bold text-white">Open for Internships</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl text-center">
                    <p className="text-xs font-black text-blue-500 uppercase mb-1">Base</p>
                    <p className="text-sm font-bold text-white">Maharashtra, India</p>
                  </div>
               </div>
               <button onClick={(e) => scrollToSection(e, 'contact')} className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition underline underline-offset-8 decoration-blue-500/50">
                Let's talk about building something new
               </button>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="py-24 border-t border-white/5 bg-[#0a0c10] text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl md:text-8xl font-black text-white mb-10 italic uppercase tracking-tighter">Ready for the <span className="text-blue-600">next</span> MVP</h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href={`mailto:${PERSONAL_INFO.email}`} className="px-12 py-6 bg-blue-600 text-white font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-blue-500 transition shadow-2xl shadow-blue-600/20">Shoot an Email</a>
            <a href={`tel:${PERSONAL_INFO.phone}`} className="px-12 py-6 bg-white/5 border border-white/10 text-white font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-white/10 transition">Call: {PERSONAL_INFO.phone}</a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="px-12 py-6 bg-white/5 border border-white/10 text-white font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-white/10 transition">LinkedIn Profile</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;