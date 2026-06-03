"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Cpu, Eye, Wifi, Navigation, Wind } from "lucide-react";

const tech = [
  { icon: <Cpu size={20} />,        title: "BMW iDrive 9",          stat: "30%",   sub: "Faster Response",     color: "#4a9eff" },
  { icon: <Eye size={20} />,        title: "Active Guard Plus",     stat: "360°",  sub: "Sensor Awareness",    color: "#00d4ff" },
  { icon: <Wind size={20} />,       title: "M Aerodynamics",        stat: "0.22",  sub: "Drag Coefficient",    color: "#a8d4ff" },
  { icon: <Wifi size={20} />,       title: "ConnectedDrive",        stat: "5G",    sub: "Always On",           color: "#4a9eff" },
  { icon: <Navigation size={20} />, title: "Highway Assistant",     stat: "L2+",   sub: "Autonomy",            color: "#00d4ff" },
  { icon: <Shield size={20} />,     title: "Emergency Brake",       stat: "0.2s",  sub: "Reaction Time",       color: "#a8d4ff" },
];

const timeline = [
  { year: "1916", event: "BMW Founded" },
  { year: "1972", event: "BMW M GmbH" },
  { year: "2000", event: "iDrive Born" },
  { year: "2011", event: "BMW i Launch" },
  { year: "2022", event: "Circular Concept" },
  { year: "2025", event: "Neue Klasse" },
];

export default function PerformanceSection() {
  const ref = useRef(null);
  const tlRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const tlInView = useInView(tlRef, { once: true, margin: "-60px" });

  return (
    <section className="relative py-28 lg:py-36 bg-[#0a0a0a] overflow-hidden" id="innovation">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute inset-0 grid-pattern opacity-25" />

      <div className="absolute left-[-15%] top-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(28,110,212,0.05) 0%, transparent 70%)", filter: "blur(80px)" }} />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-16">

        {/* Header */}
        <div ref={ref} className="mb-14">
          <motion.p className="text-[#4a9eff] text-xs tracking-[0.5em] uppercase font-medium mb-3"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
            — Innovation
          </motion.p>
          <motion.h2 className="text-5xl lg:text-7xl font-black tracking-tight"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <span className="text-white">Technology </span>
            <span className="gradient-text">Ahead</span>
          </motion.h2>
        </div>

        {/* Tech cards — icon + title + big stat only */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-24">
          {tech.map((t, i) => (
            <motion.div
              key={t.title}
              className="group p-6 rounded-2xl border border-white/5 hover:border-white/10 relative overflow-hidden cursor-pointer"
              style={{ background: "rgba(255,255,255,0.02)" }}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 + 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, boxShadow: `0 16px 40px ${t.color}10` }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse at 30% 20%, ${t.color}06, transparent 60%)` }} />

              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: `${t.color}12`, border: `1px solid ${t.color}22`, color: t.color }}>
                  {t.icon}
                </div>
                <div className="text-right">
                  <p className="font-black text-2xl leading-none" style={{ color: t.color }}>{t.stat}</p>
                  <p className="text-white/25 text-[10px] mt-0.5">{t.sub}</p>
                </div>
              </div>
              <h3 className="text-white font-semibold text-sm">{t.title}</h3>
            </motion.div>
          ))}
        </div>

        {/* Timeline — year + event only */}
        <div ref={tlRef}>
          <motion.div className="text-center mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={tlInView ? { opacity: 1, y: 0 } : {}}>
            <h3 className="text-white font-black text-3xl lg:text-4xl">
              A Century of <span className="gradient-text">Innovation</span>
            </h3>
          </motion.div>

          <div className="relative">
            {/* Line */}
            <motion.div className="absolute top-4 left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(28,110,212,0.4), transparent)" }}
              initial={{ scaleX: 0 }}
              animate={tlInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }} />

            <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
              {timeline.map((item, i) => (
                <motion.div key={item.year} className="relative pt-10 text-center"
                  initial={{ opacity: 0, y: 16 }}
                  animate={tlInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 + 0.3 }}>
                  {/* Dot */}
                  <div className="absolute top-[9px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-[#1c6ed4] bg-[#0a0a0a]" />
                  <p className="text-[#4a9eff] font-black text-lg mb-1">{item.year}</p>
                  <p className="text-white/50 text-[11px] font-medium">{item.event}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
