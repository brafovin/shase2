"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const tech = [
  { stat: "0.22", sub: "Drag Coefficient", title: "M Aerodynamics" },
  { stat: "5G",   sub: "Connectivity",     title: "ConnectedDrive" },
  { stat: "L2+",  sub: "Autonomy Level",   title: "Highway Assistant" },
  { stat: "0.2s", sub: "Reaction Time",    title: "Emergency Brake" },
  { stat: "30%",  sub: "Faster Response",  title: "BMW iDrive 9" },
  { stat: "360°", sub: "Sensor Coverage",  title: "Active Guard Plus" },
];

const milestones = [
  { year: "1916", event: "Founded" },
  { year: "1972", event: "BMW M" },
  { year: "2000", event: "iDrive" },
  { year: "2011", event: "BMW i" },
  { year: "2022", event: "Circular" },
  { year: "2025", event: "Neue Klasse" },
];

export default function PerformanceSection() {
  const ref = useRef(null);
  const tlRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const tlIn = useInView(tlRef, { once: true, margin: "-60px" });

  return (
    <section id="innovation" className="bg-[#080808] pt-28 pb-32 lg:pt-36 lg:pb-44 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 sm:px-12 lg:px-20">

        {/* Header */}
        <div ref={ref} className="mb-16 lg:mb-20">
          <motion.p className="text-white/30 text-[11px] tracking-[0.55em] uppercase font-medium mb-4"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
            Innovation
          </motion.p>
          <motion.h2
            className="text-5xl lg:text-7xl xl:text-8xl font-black tracking-[-0.02em] leading-[0.9]"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <span className="text-white">Technology </span>
            <span className="text-blue-gradient">First.</span>
          </motion.h2>
        </div>

        {/* 3 × 2 grid — just the big number + name */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-24">
          {tech.map((t, i) => (
            <motion.div
              key={t.title}
              className="group p-7 lg:p-8 rounded-lg border border-white/5 hover:border-white/10 cursor-pointer transition-all duration-300"
              style={{ background: "rgba(255,255,255,0.018)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07 + 0.2, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3 }}
            >
              <p className="text-[#4a9eff] font-black text-4xl lg:text-5xl leading-none tracking-tight mb-3">
                {t.stat}
              </p>
              <p className="text-white/25 text-xs tracking-widest uppercase mb-1">{t.sub}</p>
              <p className="text-white/60 text-sm font-medium">{t.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div ref={tlRef}>
          <motion.p
            className="text-white/20 text-[11px] tracking-[0.55em] uppercase font-medium mb-8 text-center"
            initial={{ opacity: 0 }} animate={tlIn ? { opacity: 1 } : {}}>
            A Century of Innovation
          </motion.p>

          <div className="relative">
            {/* Line */}
            <motion.div
              className="absolute top-[9px] left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(28,110,212,0.35), transparent)" }}
              initial={{ scaleX: 0 }}
              animate={tlIn ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
              {milestones.map((m, i) => (
                <motion.div key={m.year} className="relative pt-7 text-center"
                  initial={{ opacity: 0, y: 14 }}
                  animate={tlIn ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.09 + 0.3 }}>
                  <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-[#1c6ed4] bg-[#080808]" />
                  <p className="text-[#4a9eff] font-bold text-base leading-none mb-1.5">{m.year}</p>
                  <p className="text-white/35 text-[11px]">{m.event}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
