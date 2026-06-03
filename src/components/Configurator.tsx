"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const colors = [
  { name: "Alpine White",   hex: "#f0f0eb" },
  { name: "Phytonic Blue",  hex: "#2a4a7a" },
  { name: "Aventurine Red", hex: "#7a1a1a" },
  { name: "Frozen Black",   hex: "#1a1a1a" },
  { name: "Brooklyn Grey",  hex: "#5a5a62" },
  { name: "San Remo Green", hex: "#2a4a30" },
];

export default function Configurator() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [colorIdx, setColorIdx] = useState(0);

  return (
    <section id="configure" className="bg-[#080808] pt-28 pb-32 lg:pt-36 lg:pb-44 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" style={{ position: "absolute" }} />

      <div ref={ref} className="max-w-[1440px] mx-auto px-8 sm:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — car preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Car visual */}
            <div
              className="relative rounded-lg overflow-hidden"
              style={{
                background: `radial-gradient(ellipse at 50% 35%, ${colors[colorIdx].hex}18, #0a0a0a 68%)`,
                aspectRatio: "4/3",
              }}
            >
              <div className="absolute inset-0 grid-bg opacity-20" />

              <motion.svg
                key={colorIdx}
                viewBox="0 0 600 280"
                className="absolute inset-0 w-full h-full p-10"
                fill="none"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
              >
                <defs>
                  <linearGradient id="cg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={colors[colorIdx].hex} stopOpacity="0.9" />
                    <stop offset="100%" stopColor={colors[colorIdx].hex} stopOpacity="0.4" />
                  </linearGradient>
                </defs>
                {/* Shadow */}
                <ellipse cx="300" cy="238" rx="230" ry="14" fill={colors[colorIdx].hex} opacity="0.05" />
                {/* Body */}
                <path d="M52 188 L64 144 L96 114 L150 92 L210 74 L300 64 L392 72 L452 92 L508 130 L535 170 L540 196 L52 196Z"
                  fill="url(#cg)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" />
                {/* Roof */}
                <path d="M210 74 L300 64 L392 72 L420 92 L210 92Z" fill={colors[colorIdx].hex} opacity="0.65" />
                {/* Highlight stripe */}
                <path d="M228 88 Q302 68 388 78" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                {/* Windows */}
                <path d="M218 90 L293 68 L336 68 L336 90Z" fill="rgba(120,180,255,0.38)" />
                <path d="M344 68 L414 74 L414 90 L344 90Z" fill="rgba(120,180,255,0.3)" />
                {/* Window divider */}
                <line x1="340" y1="68" x2="340" y2="90" stroke="rgba(0,0,0,0.6)" strokeWidth="2.5" />
                {/* DRL */}
                <path d="M518 132 L537 162 L535 190" stroke="#4a9eff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                {/* Taillight */}
                <path d="M68 146 L55 172" stroke="#cc3333" strokeWidth="2" fill="none" strokeLinecap="round" />
                {/* Front kidney grille */}
                {[468, 496].map((x, i) => (
                  <rect key={i} x={x} y={140} width={22} height={34} rx={3}
                    fill="rgba(10,10,20,0.9)" stroke="rgba(74,158,255,0.35)" strokeWidth={1} />
                ))}
                {/* Body crease */}
                <path d="M68 162 Q300 152 532 162" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" fill="none" />
                {/* Wheels */}
                {[448, 152].map((cx, wi) => (
                  <g key={wi}>
                    <circle cx={cx} cy={197} r={36} fill="#060610" stroke="rgba(255,255,255,0.06)" />
                    <circle cx={cx} cy={197} r={28} fill="#0d0d18" />
                    {[0,60,120,180,240,300].map((a, j) => (
                      <line key={j} x1={cx} y1={197}
                        x2={cx + Math.cos(a*Math.PI/180)*26} y2={197 + Math.sin(a*Math.PI/180)*26}
                        stroke="rgba(160,160,180,0.45)" strokeWidth="2" />
                    ))}
                    <circle cx={cx} cy={197} r={6} fill="#4a9eff" />
                  </g>
                ))}
              </motion.svg>
            </div>

            {/* Selected color label */}
            <p className="text-white/35 text-sm mt-4 text-center">
              {colors[colorIdx].name}
            </p>
          </motion.div>

          {/* Right — config panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-white/30 text-[11px] tracking-[0.55em] uppercase font-medium mb-5">
              Configure Yours
            </p>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black tracking-[-0.02em] leading-[0.9] mb-10">
              <span className="text-white">Build Your </span>
              <span className="text-blue-gradient">Dream BMW</span>
            </h2>

            {/* Colour swatches */}
            <div className="mb-10">
              <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-4">Exterior Colour</p>
              <div className="flex gap-3 flex-wrap">
                {colors.map((c, i) => (
                  <motion.button
                    key={c.name}
                    title={c.name}
                    className="relative w-10 h-10 rounded-full border-2 transition-all duration-200"
                    style={{
                      background: c.hex,
                      borderColor: colorIdx === i ? "#4a9eff" : "rgba(255,255,255,0.1)",
                      boxShadow: colorIdx === i ? `0 0 0 3px rgba(74,158,255,0.25)` : "none",
                    }}
                    onClick={() => setColorIdx(i)}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.93 }}
                  />
                ))}
              </div>
            </div>

            {/* Starting price */}
            <div className="mb-10 pb-10 border-b border-white/6">
              <p className="text-white/25 text-xs tracking-widest uppercase mb-1">Starting from</p>
              <p className="text-white font-black text-4xl tracking-tight">$56,400</p>
            </div>

            <div className="flex gap-3">
              <motion.button
                className="flex-1 py-3.5 bg-[#1c6ed4] hover:bg-[#4a9eff] text-white text-sm font-bold tracking-wide rounded-sm transition-colors"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              >
                Full Configurator
              </motion.button>
              <motion.button
                className="px-7 py-3.5 border border-white/12 hover:border-white/30 text-white/60 hover:text-white text-sm rounded-sm transition-all"
                whileTap={{ scale: 0.97 }}
              >
                Get a Quote
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
