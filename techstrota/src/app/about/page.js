"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Rocket,
  Eye,
  Code2,
  ShieldCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import * as THREE from "three";

/* 🔥 VANTA GLOBE ENGINE */
import GLOBE from "vanta/dist/vanta.globe.min";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  /* ---------------- GLOBE BACKGROUND LIFECYCLE ---------------- */
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    // 1. Destroy any existing instance before creating a new one
    if (vantaEffect) {
      vantaEffect.destroy();
    }

    // 2. Initialize with THREE injection to fix the "Background Not Showing" bug
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
      } catch (e) {
        console.warn("[VANTA GLOBE] Initialization error:", e);
      }
    }

    // 3. Cleanup on unmount (Essential for Next.js navigation)
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]); // Dependency on the effect state handles the re-draw correctly

  return (
    <div className="relative min-h-screen bg-[#05070a] text-white overflow-x-hidden antialiased selection:bg-blue-600/30">
      
      {/* 🔥 BACKGROUND LAYER: Managed via ref and state */}
      <div
        ref={vantaRef}
        className="fixed inset-0 z-0 opacity-40 pointer-events-none"
        style={{ width: '100%', height: '100vh' }}
      />

      {/* CONTENT LAYER */}
      <div className="relative z-10">
        <Header />

        <main className="pt-32 md:pt-48 px-6 md:px-12 lg:px-24 pb-24 max-w-[1600px] mx-auto flex flex-col gap-32">
          
          {/* HERO */}
          <section className="text-center">
            

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold mb-1 leading-[1.3] tracking-tight italic">
              ABOUT <span className="text-orange-300">TECH</span><span className="text-blue-600">STROTA</span>
            </h1>

            <p className="text-slate-200 mt-8 max-w-3xl mx-auto text-lg md:text-xl font-light italic leading-relaxed">
              At TechStrota, we transform complex conceptualizations into scalable enterprise reality. 
              We are architecting the future of digital agility.
            </p>
          </section>

          {/* WHO WE ARE */}
          <section className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-8"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">
                Institutional Profile
              </span>

              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-bold mb-6 leading-[1.1] tracking-tight uppercase italic">
                Built to <span className="text-blue-500">Innovate</span>
              </h2>

              <p className="text-slate-200 text-lg leading-relaxed font-light italic">
                Founded with the passion to innovate and simplify, TechStrota is a
                dynamic technology firm based in Vadodara, Gujarat. We bridge the 
                gap between business challenges and smart engineering.
              </p>

              <ul className="grid sm:grid-cols-2 gap-4 text-[10px] font-bold tracking-[0.2em] uppercase">
                <li className="flex items-center gap-3">
                  <ShieldCheck className="text-blue-500" size={18} /> Established in 2021
                </li>
                <li className="flex items-center gap-3">
                  <Rocket className="text-blue-500" size={18} /> Global Digital Solutions
                </li>
                <li className="flex items-center gap-3">
                  <Code2 className="text-blue-500" size={18} /> Full-stack Architecture
                </li>
                <li className="flex items-center gap-3">
                  <Users className="text-blue-500" size={18} /> Client-First Strategy
                </li>
              </ul>
            </motion.div>

            <div className="relative hidden lg:flex justify-center">
               <div className="absolute w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full animate-pulse" />
               <div className="relative p-12 rounded-full border border-white/10 backdrop-blur-3xl bg-white/5">
                  <Rocket size={80} className="text-blue-500 opacity-80" />
               </div>
            </div>
          </section>

          {/* MISSION & VISION */}
          <section className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl hover:border-blue-500/30 transition-colors"
            >
              <Rocket className="text-blue-500 mb-6" size={32} />
              <h3 className="text-2xl md:text-3xl font-black uppercase italic mb-4">Our Mission</h3>
              <p className="text-slate-200 italic text-lg leading-relaxed">
                “To bridge ideas and technology through innovative, ethical, and user-centric engineering.”
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl hover:border-blue-500/30 transition-colors"
            >
              <Eye className="text-blue-500 mb-6" size={32} />
              <h3 className="text-2xl md:text-3xl font-black uppercase italic mb-4">Our Vision</h3>
              <p className="text-slate-200 italic text-lg leading-relaxed">
                “To become a global leader in providing smart, impactful, and sustainable enterprise tech services.”
              </p>
            </motion.div>
          </section>

          {/* CALL TO ACTION */}
          <section className="text-center py-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-bold mb-6 leading-[1.1] tracking-tight uppercase italic">
              Let's <span className="text-blue-500">Build</span> The Future
            </h2>
            <Link
              href="/support"
              className="inline-flex items-center gap-4 bg-blue-600 px-10 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all shadow-xl shadow-blue-500/20"
            >
              contact us<ArrowRight size={16} />
            </Link>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}