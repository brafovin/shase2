"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const models = [
  { name: "BMW iX M60",  range: "288",  power: "610 hp", accent: "#00d4ff" },
  { name: "BMW i7",      range: "318",  power: "536 hp", accent: "#4a9eff" },
  { name: "BMW i5 M60",  range: "271",  power: "593 hp", accent: "#1c6ed4" },
];

export default function ElectricSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="electric" className="bg-[#050505] pt-28 pb-32 lg:pt-36 lg:pb-44 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 sm:px-12 lg:px-20">

        {/* Header */}
        <div ref={ref} className="mb-16 lg:mb-20">
          <motion.p className="text-white/30 text-[11px] tracking-[0.55em] uppercase font-medium mb-4"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
            Electric Mobility
          </motion.p>
          <motion.h2
            className="text-5xl lg:text-7xl xl:text-8xl font-black tracking-[-0.02em] leading-[0.9]"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <span className="text-white">Born Electric. </span>
            <span style={{ background: "linear-gradient(100deg, #00d4ff, #4a9eff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Born BMW.
            </span>
          </motion.h2>
        </div>

        {/* Three models — clean horizontal rows on desktop, stacked on mobile */}
        <div className="space-y-4">
          {models.map((m, i) => (
            <motion.div
              key={m.name}
              className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 p-7 lg:p-8 rounded-lg border border-white/5 hover:border-white/10 cursor-pointer transition-all duration-400"
              style={{ background: "rgba(255,255,255,0.018)" }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ x: 4, backgroundColor: "rgba(255,255,255,0.03)" }}
            >
              {/* Name + tag */}
              <div className="flex items-center gap-5 min-w-0">
                <div className="w-1 h-10 rounded-full flex-shrink-0"
                  style={{ background: m.accent }} />
                <div>
                  <h3 className="text-white font-bold text-xl lg:text-2xl tracking-tight">{m.name}</h3>
                  <p className="text-white/30 text-sm mt-0.5">{m.power}</p>
                </div>
              </div>

              {/* Range — the hero number */}
              <div className="text-center sm:text-right flex sm:block gap-3 items-baseline sm:items-end">
                <p className="font-black text-5xl lg:text-6xl leading-none tracking-tight"
                  style={{ color: m.accent }}>
                  {m.range}
                </p>
                <p className="text-white/30 text-sm font-medium sm:mt-1">mi range</p>
              </div>

              {/* CTA */}
              <motion.span
                className="hidden sm:block text-sm font-semibold tracking-wide flex-shrink-0"
                style={{ color: m.accent }}
                variants={{ hover: { x: 5 } }}
                transition={{ duration: 0.25 }}
              >
                Discover →
              </motion.span>
            </motion.div>
          ))}
        </div>

        {/* Bottom stats bar */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-px mt-6 rounded-lg overflow-hidden border border-white/5"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.6 }}
        >
          {[
            { v: "0g",     l: "CO₂ Emissions" },
            { v: "350kW",  l: "Fast Charge" },
            { v: "100%",   l: "Green Production" },
            { v: "15 min", l: "100-Mile Top-Up" },
          ].map((s) => (
            <div key={s.l} className="py-7 px-6 text-center"
              style={{ background: "rgba(255,255,255,0.018)" }}>
              <p className="text-white font-black text-2xl lg:text-3xl mb-1">{s.v}</p>
              <p className="text-white/30 text-xs tracking-wide">{s.l}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
