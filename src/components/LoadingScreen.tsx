"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(t); setTimeout(() => setShow(false), 300); return 100; }
        return Math.min(p + Math.random() * 20 + 6, 100);
      });
    }, 80);
    return () => clearInterval(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* BMW mark */}
          <motion.div
            className="relative w-16 h-16 mb-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1c6ed4] to-[#4a9eff]" />
            <div className="absolute inset-[3px] rounded-full bg-[#050505] flex items-center justify-center">
              <span className="text-white font-black text-sm tracking-widest">BMW</span>
            </div>
          </motion.div>

          {/* Label */}
          <p className="text-white/20 text-[11px] tracking-[0.6em] uppercase mb-8">Loading Experience</p>

          {/* Progress bar */}
          <div className="w-36 h-px bg-white/8 overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-[#1c6ed4] to-[#4a9eff]"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.08 }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
