"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Play } from "lucide-react";

const stats = [
  { value: "0-60", unit: "mph", label: "3.5 Seconds", sub: "M Performance" },
  { value: "636", unit: "hp", label: "Max Power", sub: "M8 Competition" },
  { value: "100+", unit: "yrs", label: "Of Innovation", sub: "Since 1916" },
  { value: "33", unit: "mi", label: "Electric Range", sub: "PHEV Models" },
];

function AnimatedCounter({ target, duration = 2000 }: { target: string; duration?: number }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const numericTarget = parseInt(target.replace(/\D/g, ""));
    if (isNaN(numericTarget)) {
      setDisplay(target);
      return;
    }
    const prefix = target.replace(/[\d.]+/, "");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = Date.now();
          const step = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * numericTarget);
            setDisplay(prefix ? `${current}${prefix}` : `${current}`);
            if (progress < 1) requestAnimationFrame(step);
            else setDisplay(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{display}</span>;
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background: cinematic gradient + abstract shapes */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        {/* Deep space gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0d1a2e] to-[#0a0a0a]" />

        {/* Blue planet / light source */}
        <div
          className="absolute top-[-10%] right-[-5%] w-[70vw] h-[70vw] rounded-full opacity-25"
          style={{
            background: "radial-gradient(circle at 40% 40%, #4a9eff 0%, #1c6ed4 30%, #0a3d7a 60%, transparent 80%)",
            filter: "blur(80px)",
          }}
        />

        {/* Ground glow */}
        <div
          className="absolute bottom-[-20%] left-[10%] w-[80vw] h-[50vh] rounded-full opacity-20"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, #1c6ed4 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* Grid */}
        <div className="absolute inset-0 grid-pattern opacity-30" />

        {/* Cinematic car silhouette using CSS art */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative w-[85vw] max-w-[1100px] h-[55vh] max-h-[500px]"
            style={{ y }}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Car body SVG art */}
            <svg viewBox="0 0 1100 420" className="w-full h-full" fill="none">
              <defs>
                <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#2a2a3e" />
                  <stop offset="40%" stopColor="#1a1a2e" />
                  <stop offset="100%" stopColor="#0a0a1a" />
                </linearGradient>
                <linearGradient id="roofGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3a3a5a" />
                  <stop offset="100%" stopColor="#1a1a2e" />
                </linearGradient>
                <linearGradient id="windowGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#1c6ed4" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#0a3d7a" stopOpacity="0.3" />
                </linearGradient>
                <radialGradient id="wheelGrad" cx="50%" cy="50%" r="50%" fx="30%" fy="30%" gradientUnits="objectBoundingBox">
                  <stop offset="0%" stopColor="#3a3a3a" />
                  <stop offset="100%" stopColor="#111111" />
                </radialGradient>
                <radialGradient id="rimGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#555555" />
                  <stop offset="60%" stopColor="#222222" />
                  <stop offset="100%" stopColor="#111111" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="carGlow">
                  <feGaussianBlur stdDeviation="12" result="blur" />
                  <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.11  0 0 0 0 0.43  0 0 0 0 0.83  0 0 0 0.3 0" result="glow" />
                  <feComposite in="SourceGraphic" in2="glow" operator="over" />
                </filter>
                <clipPath id="windowClip1">
                  <polygon points="340,175 440,130 540,128 540,175" />
                </clipPath>
                <clipPath id="windowClip2">
                  <polygon points="550,128 700,130 700,175 550,175" />
                </clipPath>
              </defs>

              {/* Ground reflection / shadow */}
              <ellipse cx="550" cy="390" rx="420" ry="18" fill="rgba(28,110,212,0.12)" />
              <ellipse cx="550" cy="390" rx="350" ry="10" fill="rgba(0,0,0,0.5)" />

              {/* Car body main */}
              <path
                d="M 120 305 L 130 260 L 165 220 L 230 200 L 280 185 L 340 178 L 420 130 L 560 120 L 720 128 L 810 145 L 870 185 L 920 195 L 955 215 L 975 260 L 985 305 L 985 320 L 120 320 Z"
                fill="url(#bodyGrad)"
                stroke="rgba(74,158,255,0.2)"
                strokeWidth="1"
              />

              {/* Roof */}
              <path
                d="M 340 178 L 420 130 L 560 120 L 720 128 L 810 145 L 810 178 Z"
                fill="url(#roofGrad)"
              />

              {/* Front window */}
              <path
                d="M 720 128 L 810 145 L 810 178 L 720 178 Z"
                fill="url(#windowGrad)"
                opacity="0.8"
              />

              {/* Middle window split */}
              <path
                d="M 550 122 L 720 128 L 720 178 L 550 178 Z"
                fill="url(#windowGrad)"
                opacity="0.7"
              />

              {/* Rear window */}
              <path
                d="M 420 130 L 550 122 L 550 178 L 420 178 Z"
                fill="url(#windowGrad)"
                opacity="0.6"
              />

              {/* Window pillars */}
              <line x1="550" y1="122" x2="550" y2="178" stroke="rgba(0,0,0,0.8)" strokeWidth="3" />
              <line x1="720" y1="128" x2="720" y2="178" stroke="rgba(0,0,0,0.8)" strokeWidth="3" />

              {/* Hood line detail */}
              <path d="M 870 185 L 960 245 L 980 295" stroke="rgba(74,158,255,0.25)" strokeWidth="1.5" fill="none" />
              <path d="M 280 185 L 200 225 L 155 270 L 130 300" stroke="rgba(74,158,255,0.2)" strokeWidth="1.5" fill="none" />

              {/* Door lines */}
              <path d="M 490 178 L 490 305" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
              <path d="M 640 178 L 640 305" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />

              {/* Body side crease */}
              <path d="M 130 265 Q 400 248 980 260" stroke="rgba(74,158,255,0.15)" strokeWidth="1.5" fill="none" />

              {/* Front kidney grille */}
              <rect x="895" y="215" width="30" height="45" rx="4" fill="rgba(15,15,15,0.9)" stroke="rgba(74,158,255,0.4)" strokeWidth="1" />
              <rect x="855" y="215" width="30" height="45" rx="4" fill="rgba(15,15,15,0.9)" stroke="rgba(74,158,255,0.4)" strokeWidth="1" />
              {/* Grille slats */}
              {[220, 228, 236, 244, 252].map((y, i) => (
                <line key={i} x1="856" y1={y} x2="884" y2={y} stroke="rgba(74,158,255,0.3)" strokeWidth="0.8" />
              ))}
              {[220, 228, 236, 244, 252].map((y, i) => (
                <line key={`r-${i}`} x1="896" y1={y} x2="924" y2={y} stroke="rgba(74,158,255,0.3)" strokeWidth="0.8" />
              ))}

              {/* Front headlight DRL */}
              <path d="M 930 200 L 960 215 L 975 235" stroke="rgba(74,158,255,0.9)" strokeWidth="2.5" fill="none" strokeLinecap="round" filter="url(#glow)" />
              <path d="M 928 205 L 958 220 L 973 240" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" strokeLinecap="round" />

              {/* Rear taillight */}
              <path d="M 138 210 L 155 248 L 162 285" stroke="rgba(220,30,30,0.7)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M 145 215 L 162 252 L 168 288" stroke="rgba(255,80,80,0.3)" strokeWidth="1" fill="none" strokeLinecap="round" />

              {/* Front wheel */}
              <circle cx="830" cy="320" r="68" fill="rgba(8,8,15,0.95)" stroke="rgba(74,158,255,0.2)" strokeWidth="1.5" />
              <circle cx="830" cy="320" r="58" fill="url(#rimGrad)" />
              <circle cx="830" cy="320" r="42" fill="rgba(8,8,15,0.9)" />
              {/* Rim spokes */}
              {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                return (
                  <line
                    key={i}
                    x1={830}
                    y1={320}
                    x2={830 + Math.cos(rad) * 55}
                    y2={320 + Math.sin(rad) * 55}
                    stroke="rgba(100,100,120,0.6)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                );
              })}
              <circle cx="830" cy="320" r="12" fill="rgba(74,158,255,0.8)" />
              <circle cx="830" cy="320" r="7" fill="white" />

              {/* Rear wheel */}
              <circle cx="270" cy="320" r="68" fill="rgba(8,8,15,0.95)" stroke="rgba(74,158,255,0.2)" strokeWidth="1.5" />
              <circle cx="270" cy="320" r="58" fill="url(#rimGrad)" />
              <circle cx="270" cy="320" r="42" fill="rgba(8,8,15,0.9)" />
              {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                return (
                  <line
                    key={i}
                    x1={270}
                    y1={320}
                    x2={270 + Math.cos(rad) * 55}
                    y2={320 + Math.sin(rad) * 55}
                    stroke="rgba(100,100,120,0.6)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                );
              })}
              <circle cx="270" cy="320" r="12" fill="rgba(74,158,255,0.8)" />
              <circle cx="270" cy="320" r="7" fill="white" />

              {/* Exhaust tip */}
              <ellipse cx="200" cy="312" rx="10" ry="6" fill="#111" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <ellipse cx="218" cy="312" rx="10" ry="6" fill="#111" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

              {/* Ambient light under car */}
              <path d="M 200 335 Q 550 345 900 335" stroke="rgba(28,110,212,0.4)" strokeWidth="1" fill="none" filter="url(#glow)" />
            </svg>

            {/* Floating glow under the car */}
            <div
              className="absolute bottom-[8%] left-[10%] right-[10%] h-12 opacity-30"
              style={{
                background: "radial-gradient(ellipse at 50% 100%, #1c6ed4 0%, transparent 70%)",
                filter: "blur(15px)",
              }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Content overlay */}
      <motion.div
        className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col justify-center h-full"
        style={{ opacity }}
      >
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="w-8 h-[1px] bg-[#4a9eff]" />
            <span className="text-[#4a9eff] text-xs font-medium tracking-[0.4em] uppercase">
              2025 Collection
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.92] tracking-tight mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <span className="block text-white">The Ultimate</span>
            <span className="block gradient-text">Driving</span>
            <span className="block text-white/90">Experience.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-white/50 text-base lg:text-lg font-light max-w-lg leading-relaxed mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
          >
            Precision engineering meets pure artistry. Every BMW is crafted to deliver an
            unrivaled connection between driver, machine, and road.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
          >
            <motion.button
              className="relative group px-8 py-3.5 bg-gradient-to-r from-[#1c6ed4] to-[#4a9eff] text-white text-sm font-semibold tracking-wide rounded-full overflow-hidden shimmer-btn"
              whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(74,158,255,0.4)" }}
              whileTap={{ scale: 0.97 }}
            >
              Explore Models
            </motion.button>
            <motion.button
              className="group flex items-center gap-2.5 px-8 py-3.5 border border-white/15 hover:border-white/40 text-white/80 hover:text-white text-sm font-semibold tracking-wide rounded-full transition-all duration-300 backdrop-blur-sm"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#4a9eff]/60 transition-colors">
                <Play size={10} className="ml-0.5" fill="currentColor" />
              </div>
              Watch Film
            </motion.button>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          className="absolute bottom-16 left-6 right-6 lg:left-12 lg:right-12 max-w-[1440px]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <div className="flex gap-6 lg:gap-12 overflow-x-auto pb-2 scrollbar-hide">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex-shrink-0 border-l border-white/10 pl-4 lg:pl-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 + i * 0.1 }}
              >
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl lg:text-3xl font-black text-white">
                    <AnimatedCounter target={stat.value} />
                  </span>
                  <span className="text-[#4a9eff] text-xs font-semibold uppercase tracking-wider">
                    {stat.unit}
                  </span>
                </div>
                <p className="text-white/70 text-xs font-medium mt-0.5">{stat.label}</p>
                <p className="text-white/30 text-[10px] tracking-wide">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} className="text-white/25" />
        </motion.div>
      </motion.div>
    </section>
  );
}
