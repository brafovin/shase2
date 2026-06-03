"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";

const colors = [
  { name: "Alpine White",     hex: "#f0f0eb", price: 0 },
  { name: "Phytonic Blue",    hex: "#2a4a7a", price: 550 },
  { name: "Aventurine Red",   hex: "#7a1a1a", price: 550 },
  { name: "Frozen Black",     hex: "#1a1a1a", price: 2700 },
  { name: "Manhattan Grey",   hex: "#8a7a6a", price: 550 },
  { name: "Brooklyn Grey",    hex: "#5a5a5a", price: 550 },
];

const wheels = [
  { name: '20" M Double Spoke', spokes: 10 },
  { name: '21" M Aerodynamic',  spokes: 5 },
  { name: '22" V-Spoke',        spokes: 8 },
  { name: '19" Star Spoke',     spokes: 6 },
];

const packages = [
  { name: "M Sport Package",     price: 3450 },
  { name: "Executive Package",   price: 4750 },
  { name: "Driving Assist Pro",  price: 1900 },
  { name: "Harman Kardon Audio", price: 875 },
];

export default function Configurator() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [colorIdx, setColorIdx] = useState(0);
  const [wheelIdx, setWheelIdx] = useState(0);
  const [pkgs, setPkgs] = useState([false, false, false, false]);
  const [tab, setTab] = useState<"color" | "wheels" | "packages">("color");

  const togglePkg = (i: number) => { const n = [...pkgs]; n[i] = !n[i]; setPkgs(n); };

  const total = 56400 + colors[colorIdx].price
    + packages.reduce((s, p, i) => s + (pkgs[i] ? p.price : 0), 0);

  return (
    <section ref={ref} className="relative py-28 lg:py-36 bg-[#080810] overflow-hidden" id="configure">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-16">

        {/* Header */}
        <div className="mb-14">
          <motion.p className="text-[#4a9eff] text-xs tracking-[0.5em] uppercase font-medium mb-3"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
            — Configure Yours
          </motion.p>
          <motion.h2 className="text-5xl lg:text-7xl font-black tracking-tight"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <span className="text-white">Build Your </span>
            <span className="gradient-text">Dream BMW</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Left: car preview */}
          <motion.div className="lg:sticky lg:top-28"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>

            <div className="rounded-2xl overflow-hidden p-8 border border-white/5"
              style={{ background: `radial-gradient(ellipse at 50% 25%, ${colors[colorIdx].hex}10, rgba(8,8,16,0.95) 65%)` }}>
              <div className="absolute inset-0 grid-pattern opacity-15" style={{ position: "absolute" }} />

              {/* Car SVG */}
              <motion.svg key={colorIdx} viewBox="0 0 480 210" className="w-full"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}>
                <defs>
                  <linearGradient id="cBg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={colors[colorIdx].hex} stopOpacity="0.85" />
                    <stop offset="100%" stopColor={colors[colorIdx].hex} stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <ellipse cx="240" cy="180" rx="195" ry="12" fill={colors[colorIdx].hex} opacity="0.06" />
                <path d="M 45 148 L 55 110 L 82 88 L 125 73 L 168 58 L 240 50 L 318 57 L 368 75 L 408 105 L 430 138 L 435 158 L 45 158 Z"
                  fill="url(#cBg)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                <path d="M 168 58 L 240 50 L 318 57 L 342 74 L 168 74 Z" fill={colors[colorIdx].hex} opacity="0.6" />
                <path d="M 174 72 L 232 54 L 268 54 L 268 72 Z" fill="rgba(100,160,255,0.4)" />
                <path d="M 274 54 L 336 58 L 336 72 L 274 72 Z" fill="rgba(100,160,255,0.35)" />
                <path d="M 415 108 L 432 130 L 430 152" stroke="#4a9eff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M 59 112 L 48 138" stroke="#cc3333" strokeWidth="2" fill="none" strokeLinecap="round" />
                {/* Wheels */}
                {[356, 122].map((cx, wi) => {
                  const spokes = wheels[wheelIdx].spokes;
                  return (
                    <g key={wi}>
                      <circle cx={cx} cy={160} r={30} fill="#0a0a12" stroke="rgba(255,255,255,0.06)" />
                      <circle cx={cx} cy={160} r={23} fill="#111118" />
                      {Array.from({ length: spokes }).map((_, j) => {
                        const a = (j / spokes) * Math.PI * 2;
                        return <line key={j} x1={cx} y1={160}
                          x2={cx + Math.cos(a) * 21} y2={160 + Math.sin(a) * 21}
                          stroke="rgba(150,150,170,0.5)" strokeWidth="1.5" />;
                      })}
                      <circle cx={cx} cy={160} r={5} fill="#4a9eff" />
                    </g>
                  );
                })}
              </motion.svg>

              <div className="text-center mt-3">
                <p className="text-white/40 text-xs">{colors[colorIdx].name}</p>
              </div>
            </div>

            {/* Price card */}
            <div className="mt-4 p-5 rounded-2xl glass border border-white/5">
              <div className="flex justify-between items-center">
                <span className="text-white/40 text-sm">Estimated Total</span>
                <motion.span className="text-white font-black text-2xl" key={total}
                  initial={{ scale: 1.15, color: "#4a9eff" }}
                  animate={{ scale: 1, color: "#ffffff" }}
                  transition={{ duration: 0.35 }}>
                  ${total.toLocaleString()}
                </motion.span>
              </div>
            </div>
          </motion.div>

          {/* Right: options */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>

            {/* Tabs */}
            <div className="flex gap-1 mb-7 p-1 rounded-xl bg-white/3 border border-white/5">
              {(["color", "wheels", "packages"] as const).map((t) => (
                <button key={t}
                  className={`flex-1 py-2.5 text-xs font-semibold uppercase tracking-widest rounded-lg transition-all duration-200 ${tab === t ? "bg-[#1c6ed4] text-white" : "text-white/35 hover:text-white/60"}`}
                  onClick={() => setTab(t)}>
                  {t}
                </button>
              ))}
            </div>

            {/* Color */}
            {tab === "color" && (
              <motion.div className="space-y-2.5"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                {colors.map((c, i) => (
                  <motion.button key={c.name}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${colorIdx === i ? "border-[#4a9eff]/40 bg-[#4a9eff]/4" : "border-white/5 hover:border-white/10 bg-white/2"}`}
                    onClick={() => setColorIdx(i)} whileTap={{ scale: 0.99 }}>
                    <div className="relative w-9 h-9 rounded-full flex-shrink-0 border-2 transition-all"
                      style={{ background: c.hex, borderColor: colorIdx === i ? "#4a9eff" : "rgba(255,255,255,0.1)" }}>
                      {colorIdx === i && <div className="absolute inset-0 rounded-full flex items-center justify-center"><Check size={11} className="text-white drop-shadow" /></div>}
                    </div>
                    <span className={`text-sm flex-1 text-left ${colorIdx === i ? "text-white" : "text-white/55"}`}>{c.name}</span>
                    <span className="text-white/25 text-xs">{c.price === 0 ? "Standard" : `+$${c.price.toLocaleString()}`}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* Wheels */}
            {tab === "wheels" && (
              <motion.div className="grid grid-cols-2 gap-3"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                {wheels.map((w, i) => (
                  <motion.button key={w.name}
                    className={`p-4 rounded-xl border transition-all duration-200 text-center ${wheelIdx === i ? "border-[#4a9eff]/40 bg-[#4a9eff]/4" : "border-white/5 hover:border-white/10 bg-white/2"}`}
                    onClick={() => setWheelIdx(i)} whileTap={{ scale: 0.97 }}>
                    <svg viewBox="0 0 80 80" className="w-14 h-14 mx-auto mb-3">
                      <circle cx="40" cy="40" r="36" fill="#111" stroke="rgba(255,255,255,0.06)" />
                      <circle cx="40" cy="40" r="27" fill="#0a0a0a" />
                      {Array.from({ length: w.spokes }).map((_, j) => {
                        const a = (j / w.spokes) * Math.PI * 2;
                        return <line key={j} x1="40" y1="40" x2={40 + Math.cos(a) * 25} y2={40 + Math.sin(a) * 25}
                          stroke={wheelIdx === i ? "#4a9eff" : "rgba(150,150,170,0.35)"} strokeWidth="1.5" />;
                      })}
                      <circle cx="40" cy="40" r="5" fill={wheelIdx === i ? "#4a9eff" : "#333"} />
                    </svg>
                    <p className={`text-xs font-medium ${wheelIdx === i ? "text-white" : "text-white/40"}`}>{w.name}</p>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* Packages */}
            {tab === "packages" && (
              <motion.div className="space-y-2.5"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                {packages.map((p, i) => (
                  <motion.button key={p.name}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${pkgs[i] ? "border-[#4a9eff]/40 bg-[#4a9eff]/4" : "border-white/5 hover:border-white/10 bg-white/2"}`}
                    onClick={() => togglePkg(i)} whileTap={{ scale: 0.99 }}>
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${pkgs[i] ? "bg-[#1c6ed4] border-[#4a9eff]" : "border-white/20"}`}>
                      {pkgs[i] && <Check size={11} className="text-white" />}
                    </div>
                    <span className={`flex-1 text-left text-sm ${pkgs[i] ? "text-white" : "text-white/60"}`}>{p.name}</span>
                    <span className={`text-sm font-semibold ${pkgs[i] ? "text-[#4a9eff]" : "text-white/25"}`}>+${p.price.toLocaleString()}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}

            <div className="flex gap-3 mt-8">
              <motion.button className="flex-1 py-3.5 bg-gradient-to-r from-[#1c6ed4] to-[#4a9eff] text-white text-sm font-semibold rounded-full"
                whileHover={{ scale: 1.02, boxShadow: "0 0 28px rgba(74,158,255,0.3)" }}
                whileTap={{ scale: 0.97 }}>
                Save Configuration
              </motion.button>
              <motion.button className="px-6 py-3.5 border border-white/10 text-white/50 text-sm rounded-full hover:border-white/25 hover:text-white transition-all"
                whileTap={{ scale: 0.97 }}>
                Get Quote
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
