"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowRight, Terminal, Rocket, Database, Clock } from "lucide-react";
import Link from "next/link";
import * as THREE from "three";
import GLOBE from "vanta/dist/vanta.globe.min";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  /* ---------------- GLOBE BACKGROUND ENGINE ---------------- */
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // FIXED: Background Lifecycle to prevent "Not Showing" bug on navigation
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
          color: 0x3b82f6,      // TechStrota Blue
          color2: 0xffa03f,     // TechStrota Orange
          backgroundColor: 0x05070a,
          size: 0.8,
        });
        setVantaEffect(effect);
      } catch (err) {
        console.warn("[VANTA] Background sync failed:", err);
      }
    }
    // Cleanup ensures the canvas is destroyed before moving to another page
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // This will use the variable from Netlify, or fallback to the local URL for testing
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://happy.techstrota.com/api";

        const res = await fetch(`${API_URL}/blogs`);
        const data = await res.json();
        // Unwrap data to handle potential object wrappers
        setBlogs(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#05070a] text-white antialiased selection:bg-blue-600/30">
      {/* 🛠️ FIXED BACKGROUND LAYER: High performance z-index management */}
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

      <main className="relative z-10 pt-32 md:pt-48 px-5 md:px-12 lg:px-24 pb-20 max-w-[1500px] mx-auto">
        
        {/* HEADER SECTION IMPROVED */}
        <section className="text-center mb-24 md:mb-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
    
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-bold mb-6 leading-[1.1] tracking-tight uppercase italic">
              Latest <span className="text-blue-500">Protocols</span>
            </h1>
            <p className="max-w-2xl mx-auto text-slate-300 text-sm md:text-lg font-light italic leading-relaxed px-4">
              "Explore engineering whitepapers covering tech architecture, tutorials, and system updates to optimize your enterprise journey."
            </p>
          </motion.div>
        </section>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <div className="w-12 h-12 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.5em] italic">Decrypting Repository...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {blogs.map((blog, i) => (
              <Link key={blog.id} href={`/blog/${blog.slug}`}>
                <motion.div 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative h-xl flex flex-col rounded-[4rem] bg-white/[0.03] border border-white/20 backdrop-blur-3xl overflow-hidden hover:border-blue-500/40 transition-all duration-500 shadow-2xl"
                >
                  <div className="relative h-64 overflow-hidden bg-slate-900">
                     <img 
                       src={blog.image} 
                       alt={blog.title} 
                       className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" 
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] to-transparent opacity-60" />
                     <div className="absolute top-6 left-6 px-4 py-1.5 bg-blue-600 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                        Deep Protocol
                     </div>
                  </div>

                  <div className="p-8 md:p-10 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-6 text-blue-500">
                      <Terminal size={14} />
                      <span className="text-[9px] font-black uppercase tracking-widest">Build Analyse #{blog.id}</span>
                    </div>

                   <h2 className="text-2xl md:text-3xl font-black capitalize italic mb-6 leading-tight tracking-tight group-hover:text-blue-400 transition-colors">
                    {blog.title.toLowerCase()}
                  </h2>
                    
                    <p className="text-slate-300 text-sm font-light leading-relaxed italic line-clamp-3 mb-10 opacity-80 border-l border-white/10 pl-4">
                      "{blog.description}"
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-3 text-blue-500 font-black text-[10px] uppercase tracking-widest group-hover:text-white transition-all">
                        Read Analytics <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                      </div>
                      <div className="flex items-center gap-2 text-slate-500">
                         <Clock size={12} />
                         <span className="text-[8px] font-bold uppercase tracking-widest">Verified 1.0</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}