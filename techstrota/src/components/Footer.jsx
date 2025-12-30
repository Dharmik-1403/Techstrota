"use client";
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Linkedin, 
  Facebook, 
  Instagram, 
  Youtube, 
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [subscriberEmail, setSubscriberEmail] = useState('');

  const footerLinks = [
    {
      title: "System Navigation",
      links: [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Vault", href: "/portfolio" },
        { name: "Support", href: "/support" }
      ]
    },
    {
      title: "Social Ecosystem",
      links: [
        { name: "LinkedIn", href: "https://www.linkedin.com/company/techstrota/" },
        { name: "Facebook", href: "https://www.facebook.com/people/Tech-Strota/61550062532070/" },
        { name: "Instagram", href: "https://www.instagram.com/techstrota/" },
        { name: "YouTube", href: "https://www.youtube.com/@techstrota" }
      ]
    }
  ];

  const socialIcons = [
    { Icon: Linkedin, href: "https://www.linkedin.com/company/techstrota/" },
    { Icon: Facebook, href: "https://www.facebook.com/people/Tech-Strota/61550062532070/" },
    { Icon: Instagram, href: "https://www.instagram.com/techstrota/" },
    { Icon: Youtube, href: "https://www.youtube.com/@techstrota" }
  ];

  // Logic to connect with info@techstrota.com via GET concept
  const handleJoinEcosystem = (e) => {
    e.preventDefault();
    if (!subscriberEmail) return;
    
    const subject = encodeURIComponent("Ecosystem Join Request");
    const body = encodeURIComponent(`System Request: Please add ${subscriberEmail} to the TechStrota ecosystem updates.`);
    
    // Redirecting the target to the email server [cite: 38, 40]
    window.location.href = `mailto:info@techstrota.com?subject=${subject}&body=${body}`;
  };

  return (
    <footer className="relative z-20 mt-20 border-t border-white/5 bg-[#05070a] pt-20 pb-12 px-6 lg:px-24 overflow-hidden selection:bg-blue-600/30">
      
      {/* Background Decorative Element */}
      <div className="absolute bottom-0 right-0 opacity-[0.03] pointer-events-none select-none translate-y-1/4 translate-x-1/4">
        <h2 className="text-[25rem] font-black italic uppercase text-white leading-none tracking-tighter">TS</h2>
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">
        
        {/* Brand Architecture */}
        <div className="lg:col-span-2">
          <Link href="/" className="inline-block mb-8">
            <img src="/logo-main.png" alt="TechStrota" className="h-12 w-auto" />
          </Link>
          <p className="text-slate-400 text-base max-w-md leading-relaxed italic mb-10">
            "Architecting high-availability digital frameworks. We bridge the gap between complex engineering and business scalability."
          </p>
          
          <div className="flex gap-5">
            {socialIcons.map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:text-blue-500 hover:border-blue-500/50 transition-all shadow-xl"
              >
                <social.Icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Dynamic Link Mapping */}
        {footerLinks.map((section) => (
          <div key={section.title}>
            <h4 className="text-blue-500 font-black uppercase tracking-[0.4em] text-[10px] mb-8 flex items-center gap-2">
              <Zap size={10} /> {section.title}
            </h4>
            <ul className="flex flex-col gap-4">
              {section.links.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    target={link.href.startsWith('http') ? "_blank" : "_self"}
                    className="text-slate-300 hover:text-white transition-all text-[11px] font-bold flex items-center group uppercase tracking-[0.2em]"
                  >
                    {link.name}
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all ml-2 text-blue-500" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Newsletter Integration with Email Server Handshake */}
      <div className="max-w-[1400px] mx-auto mt-24 p-8 md:p-12 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl flex flex-col lg:flex-row justify-between items-center gap-10">
        <div className="text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-3 text-blue-500 mb-3">
             <Globe size={18} />
             <h5 className="text-white font-black uppercase tracking-[0.3em] text-xs">Sync with the ecosystem</h5>
          </div>
          <p className="text-slate-500 text-[11px] font-medium italic uppercase tracking-widest leading-relaxed">
            Initialize connection for technical briefings and release updates.
          </p>
        </div>

        <form onSubmit={handleJoinEcosystem} className="flex w-full lg:w-auto group shadow-2xl">
          <input 
            type="email" 
            required
            value={subscriberEmail}
            onChange={(e) => setSubscriberEmail(e.target.value)}
            placeholder="Discuss with us" 
            className="bg-white/5 border border-white/10 px-6 py-5 rounded-l-2xl text-[10px] font-black tracking-widest focus:outline-none focus:border-blue-600 transition-all w-full md:w-80 text-white placeholder:text-slate-700"
          />
          <button type="submit" className="bg-blue-600 hover:bg-white hover:text-black text-white px-10 py-5 rounded-r-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all duration-500 shadow-xl shadow-blue-600/20">
            JOIN
          </button>
        </form>
      </div>

      {/* Institutional Metadata Bar */}
      <div className="max-w-[1400px] mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6 text-[9px] font-black tracking-[0.4em] text-slate-700 uppercase italic">
        <div className="flex items-center gap-4">
          <p>© {currentYear} TechStrota Systems</p>
          <span className="hidden sm:inline opacity-20">|</span>
          <p>Vadodara_Core_Hub</p>
        </div>
        <div className="flex items-center gap-2 text-blue-900/40">
           <ShieldCheck size={12} />
           <p>TechStrota always here avaliable for you </p>
        </div>
      </div>
    </footer>
  );
} 