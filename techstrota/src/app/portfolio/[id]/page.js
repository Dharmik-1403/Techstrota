"use client";
import { useEffect, useState, use } from 'react';
import { ArrowLeft, ExternalLink, Box, Server, Terminal, Cpu } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProjectDetail({ params: paramsPromise }) {
  const params = use(paramsPromise); 
  const id = params.id; 
  
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const scanAllProtocols = async () => {
      try {
        const res = await fetch("https://happy.techstrota.com/api/portfolios", {
          headers: { 'Accept': 'application/json' },
          cache: 'no-store'
        });

        if (!res.ok) throw new Error("VAULT_ACCESS_DENIED");

        const data = await res.json();
        const allProjects = Array.isArray(data) ? data : data.data || [];
        const foundProject = allProjects.find(p => p.id.toString() === id.toString());

        if (!foundProject) {
          throw new Error(`PROTOCOL #${id} NOT FOUND`);
        }

        setProject(foundProject);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    scanAllProtocols();
  }, [id]);

  if (loading) return (
    <div className="bg-[#05070a] min-h-screen flex items-center justify-center text-blue-500 font-bold uppercase text-[10px] animate-pulse">
      Syncing Protocol #{id}...
    </div>
  );

  if (error) return (
    <div className="bg-[#05070a] min-h-screen flex flex-col items-center justify-center text-white px-6 text-center">
      <h1 className="text-6xl md:text-9xl font-black opacity-10 mb-2">404</h1>
      <p className="text-blue-500 text-xs font-bold uppercase tracking-widest mb-6 italic">{error}</p>
      <Link href="/portfolio" className="px-6 py-3 border border-blue-500 text-blue-500 rounded-full text-[10px] font-black uppercase tracking-widest">
        Return to Vault
      </Link>
    </div>
  );

  return (
    <div className="bg-[#05070a] min-h-screen text-white antialiased selection:bg-blue-500/30">
      <Header />
      
      {/* 📱💻 ADAPTIVE PADDING: pt-24 for mobile, pt-48 for PC */}
      <main className="pt-24 md:pt-48 px-5 md:px-12 max-w-7xl mx-auto pb-16 md:pb-32">
        
        <Link href="/portfolio" className="inline-flex items-center gap-2 text-blue-500 text-[9px] md:text-[11px] font-black uppercase tracking-widest mb-6 opacity-70 hover:opacity-100 transition-opacity">
          <ArrowLeft size={14} /> Back to Repository
        </Link>

        {/* 📉 RESPONSIVE TITLE: Smaller on mobile (text-3xl), massive on PC (text-8xl) */}
        <h1 className="text-1xl md:text-7xl lg:text-5xl font-black uppercase italic mb-8 md:mb-12 leading-[1.0] tracking-tighter">
          {project.title}
        </h1>
        
        {/* DYNAMIC SYSTEM STATS - 2 columns on mobile, 4 columns on PC */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-12 md:mb-20">
          {[
            { icon: <Box />, label: "Architecture", val: "Institutional" },
            { icon: <Cpu />, label: "Engine", val: "Verified Core" },
            { icon: <Server />, label: "Status", val: "Stable 1.0" },
            { icon: <Terminal />, label: "Deployment", val: new Date(project.created_at).toLocaleDateString() }
          ].map((stat, i) => (
            <div key={i} className="p-4 md:p-8 rounded-2xl md:rounded-[2rem] bg-white/5 border border-white/10 hover:border-blue-500/30 transition-colors">
              <div className="text-blue-500 mb-2 md:mb-4">{stat.icon}</div>
              <div className="text-[7px] md:text-[9px] uppercase tracking-widest text-slate-500 mb-1">{stat.label}</div>
              <div className="text-[10px] md:text-sm font-bold uppercase italic text-white truncate">{stat.val}</div>
            </div>
          ))}
        </div>
        
        {/* RESPONSIVE HERO IMAGE */}
        <div className="rounded-[2rem] md:rounded-[4rem] overflow-hidden border border-white/10 mb-12 md:mb-24 shadow-2xl bg-slate-900">
          <img 
            src={`https://happy.techstrota.com/storage/${project.image}`} 
            className="w-full h-auto object-cover min-h-[300px] md:min-h-[600px] grayscale-[0.2] hover:grayscale-0 transition-all duration-1000" 
            alt={project.title} 
          />
        </div>

        {/* 📉 ADAPTIVE CONTENT TYPOGRAPHY */}
        <div className="prose prose-invert max-w-none 
          prose-p:text-slate-300 prose-p:text-base md:prose-p:text-xl prose-p:leading-[1.7] md:prose-p:leading-[2.0] prose-p:italic prose-p:mb-10
          prose-strong:text-blue-500 prose-strong:font-black prose-strong:uppercase">
          <div dangerouslySetInnerHTML={{ __html: project.description }} />
        </div>

        {/* RESPONSIVE GALLERY MODULES */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mt-20 md:mt-32 pt-16 border-t border-white/5">
            <h2 className="text-xl md:text-4xl font-black uppercase italic text-blue-500 mb-12 md:mb-20 tracking-tighter flex items-center gap-4">
               <Terminal className="text-blue-500" /> Build Modules
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              {project.gallery.map((item, index) => (
                <div key={index} className="group flex flex-col gap-4 md:gap-8">
                  <div className="rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 aspect-video bg-slate-900 shadow-xl">
                    <img 
                      src={`https://happy.techstrota.com/storage/${item.url}`} 
                      className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700" 
                      alt="Gallery Module" 
                    />
                  </div>
                  {item.desc && (
                    <p className="text-slate-400 text-[11px] md:text-sm leading-relaxed italic px-4 md:px-8 border-l-2 border-blue-500/20">
                      "{item.desc}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADAPTIVE ACTION BUTTON: Full-width on mobile, auto on PC */}
        {project.url && (
          <div className="mt-20 md:mt-32 pt-10 md:pt-20 border-t border-white/10">
            <a href={project.url} target="_blank" className="w-full md:w-auto md:inline-flex text-center bg-blue-600 px-10 md:px-16 py-5 md:py-8 rounded-xl md:rounded-3xl font-black uppercase text-[10px] md:text-xs tracking-[0.3em] flex items-center justify-center gap-4 hover:scale-105 transition-all shadow-[0_0_50px_rgba(37,99,235,0.3)]">
              LAUNCH PLATFORM <ExternalLink size={18} />
            </a>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}