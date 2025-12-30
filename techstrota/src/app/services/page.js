"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { 
  ArrowRight, Sparkles, Zap, Code2, Globe, 
  ShieldCheck, BrainCircuit, BookOpen, LayoutDashboard 
} from "lucide-react";
import Link from "next/link";
import * as THREE from "three";
import GLOBE from "vanta/dist/vanta.globe.min";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const services = [
  {
    id: "website-development",
    title: "Website Development",
    boxDescription: "Our development lifecycle focuses on neural-responsive interfaces and server-side optimization.",
    mediumDescription: "We deploy scalable architectures using Next.js for frontend agility and Laravel for robust API management, ensuring your platform handles enterprise-level traffic with sub-second latency and absolute SEO dominance.",
    usage: "98%",
    icon: <Globe size={32} />,
    blogLink: "/blog" 
  },
  {
    id: "cyber-security",
    title: "Cyber Security",
    boxDescription: "Protecting institutional assets through advanced encryption protocols and real-time vulnerability orchestration.",
    mediumDescription: "We specialize in zero-trust architecture, multi-factor authentication (MFA) integration, and the deployment of AI-powered threat detection systems that proactively mitigate breaches before they impact business continuity.",
    usage: "95%",
    icon: <ShieldCheck size={32} />,
    blogLink: "/blog" 
  },
  {
    id: "ai-ml",
    title: "AI / ML Systems",
    boxDescription: "Leveraging proprietary AI logic to transform raw data into actionable intelligence and predictive models.",
    mediumDescription: "Our models focus on predictive analytics, automated decision frameworks, and deep learning integration. We build self-correcting code environments that evolve with your dataset to provide a sustainable competitive edge.",
    usage: "92%",
    icon: <BrainCircuit size={32} />,
    blogLink: "/blog" 
  },
  {
    id: "mobile-systems",
    title: "Mobile Systems",
    boxDescription: "Developing ultra-low latency mobile frameworks that provide seamless cross-platform native experiences.",
    mediumDescription: "Engineered for high-performance edge computing and user retention. We emphasize native performance metrics, fluid UI-UX transitions, and robust API integration for high-speed reliability in complex environments.",
    usage: "90%",
    icon: <Code2 size={32} />,
    blogLink: "/blog"
  },
];

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState(services[0]);
  
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

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    // Accessibility: Scroll to details on mobile when a service is picked
    if (window.innerWidth < 1024) {
      document.getElementById('analysis-box')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

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

      <main className="relative z-10 pt-32 md:pt-48 lg:pt-56 px-6 md:px-12 lg:px-24 pb-24 max-w-[1600px] mx-auto flex flex-col gap-24">
        
        {/* HEADER SECTION */}
        <section className="text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
           
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-bold mb-6 leading-[1.1] tracking-tight uppercase italic">
              CORE <span className="text-blue-500">SPECIALTIES</span>
            </h1>
          </motion.div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-20">
          {/* Left: Interactive Grid of Services */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => handleServiceSelect(service)}
                className={`group p-8 md:p-10 rounded-[2.5rem] border-2 text-left transition-all duration-500 flex flex-col items-start gap-5 ${
                  selectedService.id === service.id
                    ? "bg-white text-black border-white scale-[1.02] shadow-2xl"
                    : "bg-white/[0.03] border-white/10 backdrop-blur-md hover:border-blue-500/50"
                }`}
              >
                <div className={`${selectedService.id === service.id ? "text-blue-600" : "text-blue-500 group-hover:scale-110 transition-transform duration-300"}`}>
                  {service.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tight leading-none">{service.title}</h3>
                
                <p className={`text-sm md:text-base font-medium leading-relaxed opacity-80 ${selectedService.id === service.id ? "text-slate-800" : "text-slate-400"}`}>
                  {service.boxDescription}
                </p>
              </button>
            ))}
          </div>

          {/* Right: Detailed Analysis Box */}
          <div id="analysis-box" className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <AnimatePresence mode="wait">
              <motion.div 
                key={selectedService.id} 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }}
                className="p-10 rounded-[3.5rem] bg-white/[0.05] border border-white/10 backdrop-blur-3xl min-h-[550px] flex flex-col justify-between shadow-2xl overflow-hidden"
              >
                <div>
                  <Zap className="text-blue-500 mb-6" size={32} />
                  <h3 className="text-3xl md:text-4xl font-black uppercase italic mb-4 leading-none tracking-tighter">{selectedService.title}</h3>
                  
                  <div className="flex flex-col gap-4 py-6 border-y border-white/10">
                     <div className="flex items-center gap-2 text-blue-500 text-[9px] font-black uppercase tracking-widest">
                        <LayoutDashboard size={14} /> Strategic Analysis
                     </div>
                     <p className="text-slate-200 text-base md:text-lg leading-relaxed font-light italic">
                        {selectedService.mediumDescription}
                     </p>
                  </div>
                  
                  <Link href={selectedService.blogLink} className="mt-8 flex items-center gap-3 text-blue-400 font-bold uppercase text-[10px] tracking-widest hover:text-white transition-all group">
                    <BookOpen size={16} /> Research Repository <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                <div className="mt-12">
                   <div className="flex justify-between items-end mb-4 font-black">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-blue-500 uppercase tracking-widest">Stability Index</span>
                        <span className="text-[8px] text-slate-400 italic font-medium tracking-wider">Institutional Performance</span>
                      </div>
                      <span className="text-4xl tracking-tighter">{selectedService.usage}</span>
                   </div>
                   <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: selectedService.usage }} className="h-full bg-blue-500 shadow-[0_0_15px_#3b82f6]" />
                   </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}