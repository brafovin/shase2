"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap } from "lucide-react";

const evModels = [
  { name: "BMW iX M60", range: "288 mi", power: "610 hp", accent: "#00d4ff", tag: "Flagship" },
  { name: "BMW i7",     range: "318 mi", power: "536 hp", accent: "#4a9eff", tag: "Luxury Sedan" },
  { name: "BMW i5 M60", range: "271 mi", power: "593 hp", accent: "#1c6ed4", tag: "Performance" },
];

const stats = [
  { value: "0g",    label: "CO₂ Emissions" },
  { value: "350kW", label: "Max Fast Charge" },
  { value: "100%",  label: "Green Production" },
  { value: "15 min",label: "100-Mile Top-Up" },
];

export default function ElectricSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-28 lg:py-36 bg-[#060810] overflow-hidden" id="electric">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/15 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-16">

        {/* Header */}
        <div className="mb-14">
          <motion.p className="text-[#00d4ff] text-xs tracking-[0.5em] uppercase font-medium mb-3"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
            — Electric Mobility
          </motion.p>
          <motion.h2 className="text-5xl lg:text-7xl font-black tracking-tight"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <span className="text-white">The Electric </span>
            <span style={{ background: "linear-gradient(90deg, #00d4ff, #4a9eff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Revolution
            </span>
          </motion.h2>
        </div>

        {/* EV Model cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {evModels.map((m, i) => (
            <motion.div
              key={m.name}
              className="group relative p-6 rounded-2xl border border-white/5 hover:border-white/10 overflow-hidden cursor-pointer"
              style={{ background: "rgba(255,255,255,0.02)" }}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, boxShadow: `0 20px 50px ${m.accent}12` }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${m.accent}08, transparent 60%)` }} />

              {/* Icon + tag */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${m.accent}12`, border: `1px solid ${m.accent}25`, color: m.accent }}>
                  <Zap size={18} />
                </div>
                <span className="text-[10px] font-semibold tracking-[0.25em] uppercase"
                  style={{ color: m.accent }}>
                  {m.tag}
                </span>
              </div>

              {/* Name */}
              <h3 className="text-white font-black text-2xl mb-6">{m.name}</h3>

              {/* Two stats */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 rounded-xl" style={{ background: `${m.accent}08` }}>
                  <p className="text-white font-bold text-xl">{m.range}</p>
                  <p className="text-white/35 text-[11px] mt-0.5">Range</p>
                </div>
                <div className="p-3 rounded-xl" style={{ background: `${m.accent}08` }}>
                  <p className="text-white font-bold text-xl">{m.power}</p>
                  <p className="text-white/35 text-[11px] mt-0.5">Power</p>
                </div>
              </div>

              <button className="w-full py-2.5 rounded-xl text-xs font-semibold transition-all duration-200"
                style={{ background: `${m.accent}10`, color: m.accent, border: `1px solid ${m.accent}20` }}>
                Discover {m.name} →
              </button>
            </motion.div>
          ))}
        </div>

        {/* Sustainability stats — big and clean */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.65 }}
        >
          {stats.map((s) => (
            <div key={s.label}
              className="py-8 px-5 rounded-2xl border border-white/5 text-center glass">
              <p className="text-white font-black text-3xl mb-1">{s.value}</p>
              <p className="text-white/35 text-xs tracking-wide">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
