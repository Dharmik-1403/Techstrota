"use client";
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  MapPin, 
  Send,
  MessageCircle,
  Tag // Added for visual subject icon
} from 'lucide-react';
import * as THREE from 'three';
import GLOBE from 'vanta/dist/vanta.globe.min';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SupportPage() {
  const vantaRef = useRef(null);
  
  // UPDATED: State now includes phone and subject [cite: 46]
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    subject: '', 
    message: '' 
  });

  useEffect(() => {
    const vantaEffect = GLOBE({
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
    return () => { if (vantaEffect) vantaEffect.destroy(); };
  }, []);

  // UPDATED: Logic now passes the new fields to the server via URL concepts [cite: 13, 25]
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const subject = `[${formData.subject}] Inquiry from ${formData.name}`;
    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0APhone: ${formData.phone}%0D%0APurpose: ${formData.subject}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
    
    // The GET method appends these data pairs to the URL [cite: 25, 153, 161]
    window.location.href = `mailto:info@techstrota.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  return (
    <div className="relative min-h-screen bg-[#05070a] text-white antialiased overflow-x-hidden">
      <div ref={vantaRef} className="fixed inset-0 z-0 opacity-40 pointer-events-none" />
      
      <Header />

      <main className="relative z-10 pt-48 md:pt-64 px-6 md:px-12 lg:px-24 pb-20 max-w-[1400px] mx-auto flex flex-col gap-24">
        
        {/* HEADER SECTION */}
        <section className="text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-bold mb-1 leading-[2.2] tracking-tight uppercase italic">
              Connect <span className="text-blue-500">With Us</span>
            </h1>
            <p className="text-slate-200 text-lg md:text-xl font-light italic max-w-2xl mx-auto leading-relaxed">
              Have a vision? Let’s architect it together. Reach out via our smart support portal.
            </p>
          </motion.div>
        </section>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT SIDE: CONTACT DETAILS */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Address Card */}
            <a 
              href="https://www.google.com/maps/search/?api=1&query=156,+1st+Floor,+C+tower,+K10+Atlantis,+Near+Genda+Circle,+opp.+Honest+Restaurant,+Vadodara,+Gujarat+390007" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl hover:border-blue-500/50 transition-all"
            >
              <MapPin className="text-blue-500 mb-6 group-hover:scale-110 transition-transform" size={32} />
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-blue-300 mb-3">address</h4>
              <p className="text-lg font-medium leading-relaxed italic text-slate-200">
                156, 1st Floor, C tower, K10 Atlantis, Near Genda Circle, opp. Honest Restaurant, Vadodara, Gujarat 390007
              </p>
            </a>

            {/* Direct Connect Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <a href="tel:+919033476660" className="p-6 rounded-3xl bg-white/8 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all">
                <Phone className="text-blue-500 mb-4" size={24} />
                <h5 className="text-[10px] font-bold tracking-widest text-slate-500 mb-1 uppercase">Call Us</h5>
                <p className="text-sm font-white tracking-tighter">+91 90334 76660</p>
              </a>
              <a href="https://wa.me/918128840055" target="_blank" className="p-6 rounded-3xl bg-green-500/5 border border-green-500/20 backdrop-blur-md hover:bg-green-500/10 transition-all">
                <MessageCircle className="text-green-500 mb-4" size={24} />
                <h5 className="text-[10px] font-bold tracking-widest text-slate-500 mb-1 uppercase">WhatsApp</h5>
                <p className="text-sm font-white tracking-tighter">+91 81288 40055</p>
              </a>
            </div>

            <div className="p-8 rounded-[2rem] bg-blue-600 text-white shadow-2xl shadow-blue-600/20">
              <Mail className="mb-4" size={32} />
              <h4 className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Official Email</h4>
              <p className="text-xl font-black">info@techstrota.com</p>
            </div>
          </motion.div>

          {/* RIGHT SIDE: MESSAGE BOX */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7"
          >
            <div className="p-8 md:p-12 rounded-[3.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <MessageSquare size={40} />
              </div>

              <h3 className="text-3xl font-black uppercase italic mb-8">Send a <span className="text-blue-500">Message</span></h3>
              
              <form onSubmit={handleEmailSubmit} className="flex flex-col gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Full Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Name"
                      className="bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 transition-colors text-sm font-bold"
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Email Address</label>
                    <input 
                      required
                      type="email" 
                      placeholder="Email"
                      className="bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 transition-colors text-sm font-bold"
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                {/* NEW ROW: PHONE AND SUBJECT FIELDS [cite: 43, 88] */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Phone Number</label>
                    <input 
                      required
                      type="tel" 
                      placeholder="+91 00000 00000"
                      className="bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 transition-colors text-sm font-bold"
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Subject / Purpose</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Project Inquiry"
                      className="bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 transition-colors text-sm font-bold"
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">How can we help?</label>
                  <textarea 
                    required
                    rows="5"
                    placeholder="Tell us about your project..."
                    className="bg-white/5 border border-white/10 p-4 rounded-3xl outline-none focus:border-blue-500 transition-colors text-sm font-bold resize-none"
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-blue-600 hover:text-white transition-all duration-500 shadow-xl"
                >
                  send message <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}