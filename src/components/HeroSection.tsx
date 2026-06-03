"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen min-h-[680px] overflow-hidden bg-black">

      {/* BMW M4 Photo */}
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <Image
          src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1920&q=85"
          alt="BMW M4"
          fill
          priority
          className="object-cover object-center scale-105"
          sizes="100vw"
        />
        {/* Gradient overlay — left heavy for text, dark at bottom */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 h-full max-w-[1440px] mx-auto px-6 lg:px-16 flex flex-col justify-center"
        style={{ y: textY, opacity }}
      >
        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-3 mb-5"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <div className="w-6 h-px bg-[#4a9eff]" />
          <span className="text-[#4a9eff] text-xs tracking-[0.5em] uppercase font-medium">
            BMW M4 Competition
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-[13vw] sm:text-[10vw] lg:text-[8vw] font-black leading-[0.88] tracking-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="block text-white">The Ultimate</span>
          <span
            className="block"
            style={{
              background: "linear-gradient(90deg, #ffffff 0%, #a8d4ff 60%, #4a9eff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Driving Machine.
          </span>
        </motion.h1>

        {/* CTAs */}
        <motion.div
          className="flex gap-3 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <motion.button
            className="relative px-7 py-3.5 bg-gradient-to-r from-[#1c6ed4] to-[#4a9eff] text-white text-sm font-semibold rounded-full overflow-hidden shimmer-btn"
            whileHover={{ scale: 1.04, boxShadow: "0 0 28px rgba(74,158,255,0.45)" }}
            whileTap={{ scale: 0.97 }}
          >
            Explore Models
          </motion.button>
          <motion.button
            className="px-7 py-3.5 border border-white/20 hover:border-white/50 text-white text-sm font-medium rounded-full backdrop-blur-sm transition-all duration-300"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Book a Test Drive
          </motion.button>
        </motion.div>

        {/* Key specs — minimal chips */}
        <motion.div
          className="flex gap-4 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          {[
            { val: "503", unit: "HP" },
            { val: "3.9s", unit: "0-60" },
            { val: "155", unit: "MPH" },
          ].map((s) => (
            <div key={s.unit} className="flex items-baseline gap-1.5 border-l border-white/15 pl-4">
              <span className="text-white font-black text-xl leading-none">{s.val}</span>
              <span className="text-[#4a9eff] text-[10px] font-semibold tracking-widest uppercase">{s.unit}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{ opacity }}
      >
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
          <ChevronDown size={20} className="text-white/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}
