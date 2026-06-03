"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const models = [
  {
    id: "sedan",
    category: "SEDAN",
    name: "5 Series",
    power: "375 hp",
    accel: "4.1s",
    price: "From $56,400",
    accent: "#4a9eff",
    bodyColor: "#1a2540",
  },
  {
    id: "suv",
    category: "SAV",
    name: "X7",
    power: "523 hp",
    accel: "4.7s",
    price: "From $77,900",
    accent: "#a8d4ff",
    bodyColor: "#111122",
  },
  {
    id: "electric",
    category: "ELECTRIC",
    name: "iX M60",
    power: "610 hp",
    accel: "3.8s",
    price: "From $87,100",
    accent: "#00d4ff",
    bodyColor: "#0d1520",
  },
  {
    id: "mseries",
    category: "M SERIES",
    name: "M8 Comp.",
    power: "617 hp",
    accel: "3.0s",
    price: "From $130,500",
    accent: "#ff9a6c",
    bodyColor: "#1a0808",
  },
];

function MiniCar({ color, accent }: { color: string; accent: string }) {
  return (
    <svg viewBox="0 0 320 140" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id={`g-${accent}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#04040a" />
        </linearGradient>
      </defs>
      {/* Ground shadow */}
      <ellipse cx="160" cy="120" rx="130" ry="8" fill={accent} opacity="0.07" />
      {/* Body */}
      <path d="M 28 98 L 36 72 L 58 55 L 92 46 L 126 36 L 195 32 L 248 38 L 282 55 L 298 80 L 304 98 L 304 108 L 28 108 Z"
        fill={`url(#g-${accent})`} stroke={accent} strokeWidth="0.4" strokeOpacity="0.3" />
      {/* Roof */}
      <path d="M 126 36 L 195 32 L 248 38 L 265 55 L 126 55 Z" fill={color} opacity="0.6" />
      {/* Windows */}
      <path d="M 132 53 L 190 35 L 218 35 L 218 53 Z" fill={accent} opacity="0.4" />
      <path d="M 224 35 L 260 40 L 260 53 L 224 53 Z" fill={accent} opacity="0.35" />
      {/* DRL */}
      <path d="M 292 58 L 303 78 L 302 100" stroke={accent} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.9" />
      {/* Taillight */}
      <path d="M 39 72 L 30 88" stroke="#cc3333" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
      {/* Front wheel */}
      <circle cx="232" cy="109" r="24" fill="#080810" stroke={accent} strokeWidth="0.5" strokeOpacity="0.3" />
      <circle cx="232" cy="109" r="17" fill="#111118" />
      {[0, 60, 120, 180, 240, 300].map((a, i) => (
        <line key={i} x1={232} y1={109}
          x2={232 + Math.cos(a * Math.PI / 180) * 15}
          y2={109 + Math.sin(a * Math.PI / 180) * 15}
          stroke={accent} strokeWidth="1.2" strokeOpacity="0.55" />
      ))}
      <circle cx="232" cy="109" r="4" fill={accent} opacity="0.9" />
      {/* Rear wheel */}
      <circle cx="90" cy="109" r="24" fill="#080810" stroke={accent} strokeWidth="0.5" strokeOpacity="0.3" />
      <circle cx="90" cy="109" r="17" fill="#111118" />
      {[0, 60, 120, 180, 240, 300].map((a, i) => (
        <line key={i} x1={90} y1={109}
          x2={90 + Math.cos(a * Math.PI / 180) * 15}
          y2={109 + Math.sin(a * Math.PI / 180) * 15}
          stroke={accent} strokeWidth="1.2" strokeOpacity="0.55" />
      ))}
      <circle cx="90" cy="109" r="4" fill={accent} opacity="0.9" />
      {/* Body crease */}
      <path d="M 36 84 Q 160 76 300 84" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
    </svg>
  );
}

export default function FeaturedModels() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="relative py-28 lg:py-36 bg-[#0a0a0a] overflow-hidden" id="models">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-16">
        {/* Header */}
        <div ref={ref} className="mb-14">
          <motion.p
            className="text-[#4a9eff] text-xs tracking-[0.5em] uppercase font-medium mb-3"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          >
            — Model Lineup
          </motion.p>
          <motion.h2
            className="text-5xl lg:text-7xl font-black tracking-tight"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-white">Choose Your </span>
            <span className="gradient-text">Perfection</span>
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {models.map((m, i) => (
            <motion.div
              key={m.id}
              className="relative rounded-2xl border overflow-hidden cursor-pointer"
              style={{
                borderColor: hovered === m.id ? `${m.accent}30` : "rgba(255,255,255,0.05)",
                background: "rgba(255,255,255,0.02)",
                boxShadow: hovered === m.id ? `0 20px 50px ${m.accent}12` : "none",
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHovered(m.id)}
              onMouseLeave={() => setHovered(null)}
              whileHover={{ y: -5 }}
            >
              {/* Accent top strip */}
              <div
                className="h-px transition-all duration-500"
                style={{ background: hovered === m.id ? `linear-gradient(90deg, ${m.accent}, transparent)` : "transparent" }}
              />

              {/* Car visual */}
              <div
                className="relative h-44 flex items-end justify-center px-4 pb-2 pt-6 overflow-hidden transition-all duration-500"
                style={{
                  background: hovered === m.id
                    ? `radial-gradient(ellipse at 50% 20%, ${m.accent}0d, transparent 65%)`
                    : "transparent",
                }}
              >
                <motion.div
                  className="w-full h-full"
                  animate={{ scale: hovered === m.id ? 1.04 : 1, y: hovered === m.id ? -4 : 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <MiniCar color={m.bodyColor} accent={m.accent} />
                </motion.div>

                {/* Category badge */}
                <div className="absolute top-4 right-4">
                  <span className="text-[9px] font-bold tracking-[0.3em] uppercase"
                    style={{ color: `${m.accent}80` }}>
                    {m.category}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="px-5 pb-5 pt-2">
                <div className="border-t border-white/5 pt-4 mb-4">
                  <h3 className="text-white font-black text-2xl tracking-tight">
                    BMW {m.name}
                  </h3>
                </div>

                {/* Two key specs */}
                <div className="flex gap-3 mb-5">
                  <div className="flex-1 py-2.5 rounded-xl text-center"
                    style={{ background: `${m.accent}08` }}>
                    <p className="text-white font-bold text-sm">{m.power}</p>
                    <p className="text-white/30 text-[10px] mt-0.5">Power</p>
                  </div>
                  <div className="flex-1 py-2.5 rounded-xl text-center"
                    style={{ background: `${m.accent}08` }}>
                    <p className="text-white font-bold text-sm">{m.accel}</p>
                    <p className="text-white/30 text-[10px] mt-0.5">0 – 60</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-white/50 text-sm font-medium">{m.price}</p>
                  <motion.button
                    className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full"
                    style={{
                      background: `${m.accent}12`,
                      color: m.accent,
                      border: `1px solid ${m.accent}22`,
                    }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore <ArrowRight size={11} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
