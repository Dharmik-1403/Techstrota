"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useScroll } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Cpu, ChevronRight, Globe } from 'lucide-react';
import Link from 'next/link';
import * as THREE from 'three';
import GLOBE from 'vanta/dist/vanta.globe.min';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const techStack = [
  { id: 'laravel', name: 'Laravel', briefing: 'Enterprise PHP framework for high-availability systems.', usage: '92%', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
  { id: 'react', name: 'React.js', briefing: 'Modern UI library for high-performance client interfaces.', usage: '98%', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { id: 'Ai', name: 'AI/ML', briefing: 'Advanced neural network integration and data processing.', usage: '70%', icon: 'https://www.svgrepo.com/show/306500/openai.svg' },
  { id: 'php', name: 'PHP 8.x', briefing: 'Optimized server-side execution for heavy workloads.', usage: '90%', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  { id: 'js', name: 'JavaScript', briefing: 'Standardized ES6+ logic for seamless interactivity.', usage: '100%', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { id: 'node', name: 'Node.js', briefing: 'Event-driven backend environments for real-time data.', usage: '85%', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { id: 'tailwind', name: 'Tailwind', briefing: 'Utility-first architecture for rapid, scalable styling.', usage: '95%', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { id: 'python', name: 'Python', briefing: 'Robust scripting for automation and data science.', usage: '80%', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { id: 'mysql', name: 'MySQL', briefing: 'Reliable relational storage with optimized indexing.', usage: '88%', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { id: 'mongodb', name: 'MongoDB', briefing: 'NoSQL database architecture for scalable data storage.', usage: '82%', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { id: 'html5', name: 'HTML5', briefing: 'Standardized semantic markup for modern web structures.', usage: '100%', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { id: 'dotnet', name: '.NET', briefing: 'Robust cross-platform framework for enterprise apps.', usage: '78%', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg' },
];

export default function HomePage() {
  const [selectedTech, setSelectedTech] = useState(techStack[0]);
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  const detailRef = useRef(null);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      try {
        const effect = GLOBE({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: true,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 0.5,
          color: 0x3b82f6,
          color2: 0xffa03f,
          backgroundColor: 0x05070a,
          size: 0.8,
        });
        setVantaEffect(effect);
      } catch (err) { console.error("Vanta initialization failed:", err); }
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const handleTechSelect = (tech) => {
    setSelectedTech(tech);
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#05070a] text-white antialiased overflow-x-hidden selection:bg-blue-600/30">
      <div ref={vantaRef} className="fixed inset-0 z-0 opacity-40 pointer-events-none" />
      
      <Header />
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-blue-500 z-[1100] origin-left shadow-[0_0_15px_#3b82f6]" style={{ scaleX }} />

      <main className="relative z-10 pt-24 md:pt-48 lg:pt-56 px-6 md:px-12 lg:px-24 pb-20 max-w-[1600px] mx-auto flex flex-col gap-24 md:gap-48">
        
        <section className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full lg:w-3/5 text-center lg:text-left order-2 lg:order-1">
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight uppercase italic">
              <span className="text-orange-300">TECH</span><span className="text-blue-500">STROTA</span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base lg:text-lg mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed tracking-wide font-medium">
              Enterprise-grade digital architecture. We transform complex concepts into scalable reality.
            </p>
            <div className="flex justify-center lg:justify-start">
              <Link 
                  href="/portfolio" 
                  className="group bg-white text-black px-6 py-3.5 rounded-xl font-bold text-[11px] uppercase tracking-widest flex items-center gap-3 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg"
                >
                  Visit portfolio <ArrowRight size={16} />
                </Link>
            </div>
          </motion.div>
        </section>

        <section className="relative z-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative hidden lg:flex justify-center">
              <div className="absolute w-48 h-48 bg-blue-600/20 blur-[80px] rounded-full" />
              <div className="relative p-10 rounded-full border border-white/10 backdrop-blur-3xl bg-white/5">
                <Cpu size={56} className="text-blue-500 opacity-80" />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col gap-6 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400">Institutional Profile</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-bold mb-6 leading-[1.1] tracking-tight uppercase italic">
                Innovative <span className="text-blue-500">Architects</span>
              </h2>
              <p className="text-slate-200 text-sm md:text-base leading-relaxed font-normal border-l-0 lg:border-l-2 border-white/10 lg:pl-6 italic">
                Based in Vadodara, TechStrota specializes in enterprise cloud transformation and 
                intelligent digital products. We bridge the technical gap between business challenges 
                and smart engineering solutions.
              </p>
              <Link href="/about" className="group flex items-center justify-center lg:justify-start gap-2 text-blue-500 font-bold uppercase text-[10px] tracking-widest hover:text-white transition-all">
                Read-More About Us <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="relative z-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col gap-6 text-center lg:text-left order-2 lg:order-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400">Service Capabilities</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-bold mb-6 leading-[1.1] tracking-tight uppercase italic">
                Core <span className="text-blue-500">Specialties</span>
              </h2>
              <p className="text-slate-200 text-sm md:text-base leading-relaxed font-normal border-r-0 lg:border-r-2 border-white/10 lg:pr-6 italic">
                From high-availability web architecture to custom SaaS logic, our engineering team delivers 
                scalable, user-centric solutions that drive measurable business growth.
              </p>
              <Link href="/services" className="flex items-center justify-center lg:justify-start gap-2 text-blue-500 font-black uppercase text-[10px] tracking-widest hover:gap-4 transition-all duration-300 group">
                Read-More Services <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative hidden lg:flex justify-center order-1 lg:order-2">
              <div className="absolute w-48 h-48 bg-orange-600/10 blur-[80px] rounded-full" />
              <div className="relative p-10 rounded-full border border-white/10 backdrop-blur-3xl bg-white/5">
                <Globe size={56} className="text-blue-500 opacity-80" />
              </div>
            </motion.div>
          </div>
        </section>

        <section id="tech" className="relative z-20">
          <div className="mb-12 text-center lg:text-left">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-xl font-bold mb-6 leading-[1.1] tracking-tight uppercase italic">
              Our <span className="text-blue-500">Ecosystem</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
              {techStack.map((tech) => (
                <button
                  key={tech.id}
                  // ADDED: Hover effect to change selection instantly
                  onMouseEnter={() => handleTechSelect(tech)}
                  onClick={() => handleTechSelect(tech)}
                  className={`p-5 md:p-8 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center gap-3 ${
                    selectedTech.id === tech.id 
                    ? "bg-white border-white text-black shadow-xl scale-[1.02]" 
                    : "bg-white/5 border-white/5 hover:border-white/20 backdrop-blur-md"
                  }`}
                >
                  <img src={tech.icon} className={`w-8 h-8 md:w-10 md:h-10 object-contain ${selectedTech.id === tech.id ? "" : "grayscale brightness-75 opacity-70"}`} alt={tech.name} />
                  <span className="text-[9px] font-bold uppercase tracking-wider">{tech.name}</span>
                </button>
              ))}
            </div>

            <div ref={detailRef} className="lg:col-span-4 h-full lg:sticky lg:top-32">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={selectedTech.id} 
                  initial={{ opacity: 0, y: 15 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -15 }}
                  className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-3xl flex flex-col justify-between h-full min-h-[320px] shadow-2xl"
                >
                  <div>
                    <Zap className="text-blue-500 mb-4" size={24} />
                    <h3 className="text-2xl md:text-3xl font-bold uppercase italic mb-4 leading-none tracking-tighter">{selectedTech.name}</h3>
                    <p className="text-slate-400 text-sm md:text-base font-normal leading-relaxed italic mb-4">"{selectedTech.briefing}"</p>
                    <Link href="/services" className="group flex items-center gap-2 text-blue-400 font-bold uppercase text-[9px] tracking-widest hover:text-white transition-all">
                      Read-More Services <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                  <div className="mt-8">
                    <div className="flex justify-between items-end mb-3 font-bold">
                      <div className="flex flex-col">
                        <span className="text-[9px] text-blue-500 uppercase tracking-widest">Efficiency Index</span>
                        <span className="text-[8px] text-slate-400 italic">Optimization Score</span>
                      </div>
                      <span className="text-2xl md:text-3xl tracking-tighter">{selectedTech.usage}</span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: selectedTech.usage }} className="h-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 