"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Cpu, Eye, Wifi, Navigation, Wind } from "lucide-react";

const technologies = [
  {
    icon: <Cpu size={22} />,
    title: "BMW iDrive 9",
    description:
      "Next-generation operating system with AI-powered assistance, curved display, and intuitive gesture control.",
    color: "#4a9eff",
    stat: "30%",
    statLabel: "Faster Response",
  },
  {
    icon: <Eye size={22} />,
    title: "Active Guard Plus",
    description:
      "360-degree awareness with 12 ultrasonic sensors, 4 cameras, and radar — detecting threats before you can see them.",
    color: "#00d4ff",
    stat: "180°",
    statLabel: "Blind Spot Detection",
  },
  {
    icon: <Wind size={22} />,
    title: "M Sport Aerodynamics",
    description:
      "Precision-engineered downforce management with active air flaps, adaptive suspension, and carbon fiber aero kit.",
    color: "#a8d4ff",
    stat: "0.22",
    statLabel: "Drag Coefficient",
  },
  {
    icon: <Wifi size={22} />,
    title: "ConnectedDrive",
    description:
      "Always-on connectivity with OTA updates, real-time traffic, remote services, and intelligent route optimization.",
    color: "#4a9eff",
    stat: "5G",
    statLabel: "Connectivity",
  },
  {
    icon: <Navigation size={22} />,
    title: "Highway Assistant",
    description:
      "Hands-off Level 2+ automated driving on approved highways with predictive lane changes and adaptive cruise.",
    color: "#00d4ff",
    stat: "L2+",
    statLabel: "Autonomy Level",
  },
  {
    icon: <Shield size={22} />,
    title: "Automatic Emergency",
    description:
      "Collision mitigation system that responds faster than human reflexes, automatically braking to prevent impacts.",
    color: "#a8d4ff",
    stat: "0.2s",
    statLabel: "Reaction Time",
  },
];

const timeline = [
  { year: "1916", event: "BMW Founded", desc: "Bayerische Motoren Werke AG established in Munich, Bavaria" },
  { year: "1972", event: "BMW M GmbH", desc: "Motorsport division founded — the birth of M power" },
  { year: "2000", event: "iDrive System", desc: "Revolutionary in-car operating system pioneers the industry" },
  { year: "2011", event: "BMW i Sub-brand", desc: "Dedicated electric and hybrid mobility brand launched" },
  { year: "2022", event: "BMW i Vision Circular", desc: "Concept car made from 100% recycled materials unveiled" },
  { year: "2025", event: "Neue Klasse Platform", desc: "Next-gen EV architecture — the digital-first BMW era begins" },
];

export default function PerformanceSection() {
  const ref = useRef(null);
  const timelineRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const timelineInView = useInView(timelineRef, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 lg:py-32 bg-[#0a0a0a] overflow-hidden" id="innovation">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1c6ed4]/20 to-transparent" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Glow */}
      <div
        className="absolute top-1/3 left-[-10%] w-[50vw] h-[50vw] rounded-full opacity-8 pointer-events-none"
        style={{ background: "radial-gradient(circle, #1c6ed4 0%, transparent 70%)", filter: "blur(100px)" }}
      />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            <div className="w-8 h-[1px] bg-[#4a9eff]/50" />
            <span className="text-[#4a9eff] text-xs font-medium tracking-[0.4em] uppercase">
              Innovation
            </span>
            <div className="w-8 h-[1px] bg-[#4a9eff]/50" />
          </motion.div>
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
          >
            <span className="text-white">Technology </span>
            <span className="gradient-text">Ahead</span>
          </motion.h2>
          <motion.p
            className="text-white/40 text-sm max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25 }}
          >
            BMW invests over 6 billion euros annually in research and development,
            pushing the boundaries of what&apos;s possible in automotive technology.
          </motion.p>
        </div>

        {/* Technology cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-24">
          {technologies.map((tech, i) => (
            <motion.div
              key={tech.title}
              className="group p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-500 relative overflow-hidden cursor-pointer"
              style={{ background: "rgba(255,255,255,0.02)" }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i + 0.3, duration: 0.6 }}
              whileHover={{ y: -4, boxShadow: `0 10px 40px ${tech.color}10` }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse at 30% 20%, ${tech.color}06, transparent 60%)` }}
              />

              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${tech.color}12`, border: `1px solid ${tech.color}25`, color: tech.color }}
                >
                  {tech.icon}
                </div>
                <div className="text-right">
                  <p className="text-white font-black text-xl" style={{ color: tech.color }}>{tech.stat}</p>
                  <p className="text-white/25 text-[10px] tracking-wide">{tech.statLabel}</p>
                </div>
              </div>

              <h3 className="text-white font-bold text-base mb-2">{tech.title}</h3>
              <p className="text-white/40 text-xs leading-relaxed line-clamp-3">{tech.description}</p>

              <div className="mt-4 pt-4 border-t border-white/5">
                <span
                  className="text-[10px] font-semibold tracking-wider uppercase"
                  style={{ color: tech.color }}
                >
                  Learn More →
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : {}}
          >
            <h3 className="text-white text-3xl font-black mb-2">
              A Century of <span className="gradient-text">Innovation</span>
            </h3>
            <p className="text-white/30 text-sm">Milestones that shaped the automotive world</p>
          </motion.div>

          {/* Timeline line */}
          <div className="relative">
            <motion.div
              className="absolute top-5 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1c6ed4]/40 to-transparent"
              initial={{ scaleX: 0 }}
              animate={timelineInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
            />

            <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-4">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  className="relative pt-10 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 * i + 0.3 }}
                >
                  {/* Dot */}
                  <motion.div
                    className="absolute top-3 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 border-[#1c6ed4] bg-[#0a0a0a]"
                    whileInView={{ scale: [1, 1.5, 1] }}
                    transition={{ delay: i * 0.2 + 0.5, duration: 0.5 }}
                    viewport={{ once: true }}
                  />

                  <span className="text-[#4a9eff] font-black text-lg block mb-1">{item.year}</span>
                  <p className="text-white text-xs font-semibold mb-1">{item.event}</p>
                  <p className="text-white/30 text-[10px] leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
