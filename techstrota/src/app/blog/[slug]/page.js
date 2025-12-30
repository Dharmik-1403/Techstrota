"use client";
import { useEffect, useRef, useState, use } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  Calendar, User, ArrowLeft, Clock, Share2, 
  Terminal, CheckCircle2, MessageSquareText, Link2 
} from 'lucide-react';
import Link from 'next/link';
import * as THREE from 'three';
import GLOBE from 'vanta/dist/vanta.globe.min';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BlogPost({ params: paramsPromise }) {
  const params = use(paramsPromise); 
  const slug = params.slug;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (!vantaEffect.current && vantaRef.current) {
      vantaEffect.current = GLOBE({
        el: vantaRef.current, THREE, mouseControls: true, touchControls: true, gyroControls: true,
        color: 0x3b82f6, color2: 0xffa03f, backgroundColor: 0x05070a, size: 0.8,
      });
    }
    return () => { if (vantaEffect.current) vantaEffect.current.destroy(); };
  }, []);

  useEffect(() => {
    if (slug) {
      fetch(`https://happy.techstrota.com/api/blogs/${slug}`)
        .then((res) => res.json()).then((data) => { setBlog(data); setLoading(false); })
        .catch(() => setLoading(false));
    }
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-[#05070a] flex items-center justify-center">
      <div className="animate-pulse text-blue-500 font-black tracking-[0.4em] uppercase text-xs">Decrypting Neural Data...</div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-[#05070a] text-white antialiased overflow-x-hidden">
      <div ref={vantaRef} className="fixed inset-0 z-0 opacity-40 pointer-events-none" />
      <Header />
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-blue-500 z-[1100] origin-left shadow-[0_0_15px_#3b82f6]" style={{ scaleX }} />

      <main className="relative z-10 pt-22 md:pt-48 px-4 md:px-12 lg:px-24 pb-20 max-w-[1000px] mx-auto">
        <Link href="/blog" className="group inline-flex items-center gap-2 text-blue-500 font-black uppercase text-[10px] tracking-widest mb-12 hover:text-white transition-all">
          <ArrowLeft size={14} className="group-hover:-translate-x-2 transition-transform" /> Back to repository index
        </Link>

        {/* 💎 GLASSMORPHISM CARD */}
        <article className="relative p-8 md:p-16 rounded-[4rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl shadow-2xl overflow-hidden">
          
          <div className="flex items-center gap-3 text-blue-500 mb-8">
            <Terminal size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Neural Data Analysis</span>
          </div>

        <h2 className="text-2xl md:text-3xl font-black capitalize italic mb-6 leading-tight tracking-tight group-hover:text-blue-400 transition-colors">
                    {blog.title.toLowerCase()}
                  </h2>

          {/* META DATA SETTINGS */}
          <div className="flex flex-wrap items-center gap-8 py-8 border-y border-white/5 mb-16 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
            <span className="flex items-center gap-2 text-blue-400"><Calendar size={14}/> {new Date(blog.created_at).toLocaleDateString()}</span>
            <span className="flex items-center gap-2 text-orange-400"><User size={14}/> TechStrota Engineering</span>
            <span className="flex items-center gap-2 text-blue-400"><Clock size={14}/> 5 Min Technical Read</span>
          </div>

          <div className="relative w-full h-[350px] md:h-[550px] rounded-[3rem] overflow-hidden mb-20 shadow-2xl border border-white/5">
            <img src={blog.image} className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" alt={blog.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] to-transparent opacity-60" />
          </div>

          {/* 🔥 ENHANCED TEXT SETTINGS: Fixes for "Wall of Text" and Readability */}
          <div className="prose prose-invert prose-blue max-w-none 
            prose-headings:uppercase prose-headings:italic prose-headings:font-black prose-headings:tracking-tighter 
            prose-h2:text-4xl prose-h2:mt-24 prose-h2:mb-10 prose-h2:text-blue-500 prose-h2:leading-tight
            prose-h3:text-2xl prose-h3:mt-16 prose-h3:mb-6 prose-h3:text-orange-400 prose-h3:leading-snug
            prose-p:text-slate-200 prose-p:text-xl prose-p:leading-[2.0] prose-p:font-light prose-p:italic prose-p:mb-12 prose-p:tracking-wide
            prose-li:text-slate-300 prose-li:text-lg prose-li:font-medium prose-li:mb-4 prose-li:marker:text-blue-500 prose-li:leading-relaxed
            prose-strong:text-white prose-strong:font-black prose-strong:uppercase">
            
            {/* Short Introduction Setting */}
            <p className="text-2xl md:text-3xl text-blue-400 font-black uppercase italic mb-16 leading-tight border-l-4 border-blue-600 pl-8 tracking-tighter">
              {blog.description}
            </p>

            <div 
              className="blog-main-content tracking-normal font-normal"
              dangerouslySetInnerHTML={{ __html: blog.content }} 
            />
          </div>

          {/* CONVERSION HOOK */}
          <div className="mt-32 pt-16 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-10">
             <div className="flex flex-col gap-2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 text-blue-500">
                  <CheckCircle2 size={24} />
                  <span className="text-2xl font-black uppercase italic tracking-tighter">Ready to implement?</span>
                </div>
                <p className="text-slate-400 text-sm font-medium">Engineer your technical vision with our core specialties.</p>
             </div>
             
             <Link href="/services" className="group relative px-12 py-6 bg-blue-600 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all hover:scale-105 active:scale-95">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center gap-4 font-black uppercase text-[12px] tracking-widest text-white">
                  DISCUSS YOUR PROJECT <MessageSquareText size={20} />
                </span>
             </Link>
          </div>

          <div className="mt-16 flex justify-center border-t border-white/5 pt-12">
             <button 
                onClick={handleShare}
                className="flex items-center gap-3 text-slate-500 text-[11px] font-bold uppercase tracking-[0.4em] hover:text-blue-400 transition-colors group"
             >
                <Share2 size={16} className="group-hover:rotate-12 transition-transform" /> 
                {copied ? "IDENTIFICATION COPIED" : "SHARE TRANSMISSION VIA LINK"}
                <Link2 size={14} className="ml-1 opacity-50" />
             </button>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}