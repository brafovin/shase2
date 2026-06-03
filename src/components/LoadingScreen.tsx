"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 400);
          return 100;
        }
        return prev + Math.random() * 18 + 5;
      });
    }, 80);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Animated rings */}
          <div className="relative flex items-center justify-center mb-12">
            <motion.div
              className="absolute w-32 h-32 rounded-full border border-[#1c6ed4]/20"
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.1, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute w-20 h-20 rounded-full border border-[#4a9eff]/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ borderTopColor: "#4a9eff", borderRightColor: "transparent", borderBottomColor: "transparent", borderLeftColor: "transparent" }}
            />
            <motion.div
              className="absolute w-14 h-14 rounded-full border border-[#1c6ed4]/60"
              animate={{ rotate: -360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ borderTopColor: "transparent", borderRightColor: "#1c6ed4", borderBottomColor: "transparent", borderLeftColor: "transparent" }}
            />
            {/* BMW Logo placeholder */}
            <motion.div
              className="relative z-10 w-10 h-10 rounded-full bg-gradient-to-br from-[#1c6ed4] to-[#4a9eff] flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-white font-bold text-sm tracking-wider">BMW</span>
            </motion.div>
          </div>

          {/* Brand name */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-[#ffffff]/40 text-xs tracking-[0.4em] uppercase mb-2">
              Bayerische Motoren Werke
            </p>
            <p className="text-[#4a9eff]/60 text-xs tracking-[0.3em] uppercase">
              Loading Experience
            </p>
          </motion.div>

          {/* Progress bar */}
          <div className="w-48 h-[1px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#1c6ed4] to-[#4a9eff] rounded-full"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          <motion.p
            className="text-white/20 text-xs tracking-widest mt-4 font-mono"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {Math.round(Math.min(progress, 100))}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
