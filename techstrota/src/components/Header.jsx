"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    // Immediate check to prevent header size "popping" on page load
    handleScroll(); 

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Services', href: '/services' },
    { name: 'Support', href: '/support' },
    { name: 'Portfolio', href: '/portfolio' }, 
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-[9999] flex justify-between items-center transition-all duration-200 px-6 lg:px-24 ${
        scrolled 
          ? "py-3 bg-[#05070a]/90 backdrop-blur-xl border-b border-white/10" 
          : "py-8 bg-transparent"
      }`}
    >
      {/* LOGO: Standard HTML tag with CSS transition only */}
      <Link href="/" className="relative flex items-center shrink-0">
        <img 
          src="/logo-main.png" 
          alt="Techstrota" 
          style={{ 
            height: scrolled ? '32px' : '40px',
            transition: 'height 0.2s ease-in-out'
          }}
          className="w-auto object-contain origin-left" 
        />
      </Link>

      {/* DESKTOP NAV */}
      <div className="hidden lg:flex gap-8 items-center">
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            href={link.href} 
            className="group relative font-bold text-[10px] tracking-[0.2em] text-slate-300 hover:text-white transition-colors uppercase"
          >
            {link.name}
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-500 transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}
      </div>

      {/* MOBILE MENU */}
      <div className="lg:hidden flex items-center relative" ref={menuRef}>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="text-white p-2 focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              // ANIMATION REMOVED: Only using opacity for a clean fade, no sliding
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute top-full right-0 mt-2 w-48 bg-[#0a0c10] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
            >
              <div className="flex flex-col py-2">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsOpen(false)} 
                    className="px-6 py-3 text-xs font-bold text-slate-200 hover:bg-blue-600 hover:text-white transition-all uppercase tracking-widest"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* PROGRESS BAR: Kept scroll sync but removed entrance animation */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-blue-500/50" 
        style={{ scaleX }} 
      />
    </nav>
  );
}