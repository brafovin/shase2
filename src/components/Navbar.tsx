"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

const navItems = [
  {
    label: "Models",
    submenu: ["Sedan", "SUV", "Electric", "M Series", "Concept"],
  },
  {
    label: "Electric",
    submenu: ["BMW iX", "BMW i7", "BMW i5", "BMW i4", "Charging"],
  },
  {
    label: "Innovation",
    submenu: ["BMW iDrive", "ConnectedDrive", "Autonomous", "Safety"],
  },
  {
    label: "Experience",
    submenu: ["Test Drive", "Configurator", "BMW World", "Events"],
  },
  { label: "Dealers", submenu: [] },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5 py-3"
            : "bg-transparent py-5"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1c6ed4] to-[#4a9eff] opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-[2px] rounded-full bg-[#0a0a0a] flex items-center justify-center">
                <span className="text-white font-black text-[10px] tracking-wider">BMW</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-semibold text-sm tracking-[0.15em] leading-none">BMW</p>
              <p className="text-white/30 text-[9px] tracking-[0.3em] uppercase leading-none mt-0.5">Group</p>
            </div>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.submenu.length && setActiveMenu(item.label)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <motion.button
                  className="flex items-center gap-1 px-4 py-2 text-white/70 hover:text-white text-sm font-medium tracking-wide transition-colors duration-200 rounded-lg hover:bg-white/5"
                  whileTap={{ scale: 0.97 }}
                >
                  {item.label}
                  {item.submenu.length > 0 && (
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${activeMenu === item.label ? "rotate-180" : ""}`}
                    />
                  )}
                </motion.button>

                <AnimatePresence>
                  {activeMenu === item.label && item.submenu.length > 0 && (
                    <motion.div
                      className="absolute top-full left-0 mt-1 glass rounded-xl py-2 min-w-[180px] shadow-2xl"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                    >
                      {item.submenu.map((sub) => (
                        <a
                          key={sub}
                          href="#"
                          className="block px-4 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          {sub}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3">
            <motion.button
              className="px-5 py-2 text-sm font-medium text-white/70 hover:text-white border border-white/10 hover:border-white/30 rounded-full transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Configure
            </motion.button>
            <motion.button
              className="relative px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#1c6ed4] to-[#4a9eff] rounded-full overflow-hidden shimmer-btn"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Test Drive
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <motion.button
            className="lg:hidden p-2 text-white/70 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-xl pt-20 px-6 lg:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex flex-col gap-1 mt-4">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href="#"
                  className="flex items-center justify-between py-4 border-b border-white/5 text-white/70 hover:text-white text-lg font-medium"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                  {item.submenu.length > 0 && <ChevronDown size={16} />}
                </motion.a>
              ))}
              <div className="flex flex-col gap-3 mt-8">
                <button className="w-full py-3 text-sm font-medium border border-white/10 rounded-full text-white/70">
                  Configure Your BMW
                </button>
                <button className="w-full py-3 text-sm font-medium bg-gradient-to-r from-[#1c6ed4] to-[#4a9eff] rounded-full text-white">
                  Book a Test Drive
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
