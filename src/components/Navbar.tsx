"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = ["Models", "Electric", "Innovation", "Experience", "Dealers"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-[#050505]/90 backdrop-blur-xl border-b border-white/[0.06]" : ""
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1c6ed4] to-[#4a9eff] opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-[2px] rounded-full bg-[#050505] flex items-center justify-center">
                <span className="text-white font-black text-[9px] tracking-widest">BMW</span>
              </div>
            </div>
          </a>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`}
                className="text-white/50 hover:text-white text-[13px] font-medium tracking-wide transition-colors duration-200">
                {l}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="#configure"
              className="text-white/50 hover:text-white text-[13px] font-medium tracking-wide transition-colors">
              Configure
            </a>
            <a href="#"
              className="ml-2 px-5 py-2 bg-[#1c6ed4] hover:bg-[#4a9eff] text-white text-[13px] font-semibold rounded-sm transition-colors duration-200">
              Test Drive
            </a>
          </div>

          {/* Mobile toggle */}
          <button className="lg:hidden text-white/60 hover:text-white" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#050505]/96 backdrop-blur-xl flex flex-col justify-center px-8 lg:hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {links.map((l, i) => (
              <motion.a key={l} href={`#${l.toLowerCase()}`}
                className="py-5 text-3xl font-black text-white/70 hover:text-white border-b border-white/5 transition-colors"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setOpen(false)}>
                {l}
              </motion.a>
            ))}
            <motion.div className="mt-10 flex flex-col gap-3"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
              <a href="#" className="py-3.5 text-center bg-[#1c6ed4] text-white font-semibold rounded-sm text-sm">
                Book a Test Drive
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
