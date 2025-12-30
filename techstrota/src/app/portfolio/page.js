"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useScroll } from 'framer-motion';
import { Sparkles, Terminal, ArrowRight, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import * as THREE from 'three';
import GLOBE from 'vanta/dist/vanta.globe.min';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  /* ---------------- GLOBE BACKGROUND ENGINE ---------------- */
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // FIXED: Background Lifecycle to prevent "Not Showing" bug on navigation
  useEffect(() => {
    // 1. Destroy any ghost instance before creating a new one
    if (vantaEffect) {
      vantaEffect.destroy();
    }

    // 2. Initialize with THREE injection for consistent rendering
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
          color: 0x3b82f6,      // TechStrota Blue
          color2: 0xffa03f,     // TechStrota Orange
          backgroundColor: 0x05070a,
          size: 0.8,
        });
        setVantaEffect(effect);
      } catch (err) {
        console.warn("[VANTA] Portfolio background sync failed:", err);
      }
    }

    // 3. Cleanup ensures the canvas is destroyed before moving to another page
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  useEffect(() => {
    const fetchProtocols = async () => {
      try {
        const res = await fetch("https://happy.techstrota.com/api/portfolios", {
          headers: { 'Accept': 'application/json' },
          cache: 'no-store'
        });
        if (!res.ok) throw new Error("API_ACCESS_DENIED");
        const data = await res.json();
        // Unwrap data to handle potential object wrappers
        setProjects(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProtocols();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#05070a] text-white antialiased selection:bg-blue-600/30">
      
      {/* 🛠️ FIXED BACKGROUND LAYER: Managed via state to ensure refresh */}
      <div 
        ref={vantaRef} 
        className="fixed inset-0 z-0 opacity-40 pointer-events-none" 
        style={{ width: '100%', height: '100vh' }}
      />

      <Header />
      
      {/* SCROLL PROGRESS BAR */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-blue-500 z-[1100] origin-left shadow-[0_0_15px_#3b82f6]" 
        style={{ scaleX }} 
      />

      <main className="relative z-10 pt-32 md:pt-48 px-6 md:px-12 lg:px-24 pb-20 max-w-[1600px] mx-auto flex flex-col gap-16">
        
        {/* HEADER SECTION IMPROVED */}
        <section className="text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            
            <h1  className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-bold mb-6 leading-[1.1] tracking-tight uppercase italic">
              Port<span className="text-blue-500">folios</span>
            </h1>
            <p className="max-w-2xl mx-auto text-slate-300 text-sm md:text-lg font-light italic leading-relaxed px-4">
              "We build high-performance websites, mobile ecosystems, and digital solutions to scale your enterprise architecture."
            </p>
          </motion.div>
        </section>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <div className="w-12 h-12 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.5em] italic">Syncing Protocols...</span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-3xl">
            <AlertCircle className="text-orange-500 mb-6" size={48} />
            <h2 className="text-2xl font-black uppercase italic mb-4">Connection Desynchronized</h2>
            <p className="text-slate-400 text-sm mb-8 italic">Error: {error}</p>
            <button onClick={() => window.location.reload()} className="px-8 py-3 bg-blue-600 rounded-full font-black text-[10px] tracking-widest uppercase">Retry Handshake</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project, i) => (
              <motion.div 
                key={project.id} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative flex flex-col rounded-[3rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl overflow-hidden hover:border-blue-500/40 transition-all duration-500 shadow-2xl"
              >
                <div className="relative h-64 overflow-hidden bg-slate-900 shadow-inner">
                  {/* Image Reconstruction for Backend Sync */}
                  <img src={`https://happy.techstrota.com/storage/${project.image}`} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt={project.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] to-transparent opacity-60" />
                </div>
                <div className="p-8 flex flex-grow flex-col">
                  <div className="flex items-center gap-2 mb-4 text-blue-500">
                    <Terminal size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Protocol #{project.id}</span>
                  </div>
                  <h3 className="text-2xl font-black uppercase italic mb-5 leading-none tracking-tight group-hover:text-blue-400 transition-colors">{project.title}</h3>
                  <p className="text-slate-300 text-sm font-light italic leading-relaxed mb-8 line-clamp-3">"{project.description}"</p>
                  
                  <Link href={`/portfolio/${project.id}`} className="mt-auto flex items-center gap-3 text-blue-500 font-black uppercase text-[10px] tracking-widest hover:text-white transition-all group/btn">
                    View Technical Details <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}