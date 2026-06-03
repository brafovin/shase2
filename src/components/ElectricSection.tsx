"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Leaf, Battery, Timer } from "lucide-react";

const evModels = [
  {
    name: "BMW iX M60",
    range: "288 mi",
    power: "610 hp",
    charge0to80: "35 min",
    tag: "Flagship Electric",
    color: "#00d4ff",
  },
  {
    name: "BMW i7",
    range: "318 mi",
    power: "536 hp",
    charge0to80: "34 min",
    tag: "Electric Luxury Sedan",
    color: "#4a9eff",
  },
  {
    name: "BMW i5 M60",
    range: "271 mi",
    power: "593 hp",
    charge0to80: "30 min",
    tag: "Electric Performance",
    color: "#1c6ed4",
  },
];

const sustainabilityStats = [
  { icon: <Leaf size={20} />, value: "0g", label: "CO₂ Emissions", sub: "While Driving" },
  { icon: <Battery size={20} />, value: "350kW", label: "Max Charging", sub: "DC Fast Charge" },
  { icon: <Zap size={20} />, value: "100%", label: "Renewable Energy", sub: "Production Plants" },
  { icon: <Timer size={20} />, value: "15min", label: "100 Mile Range", sub: "Fast Charge" },
];

function BatteryBar({ percentage, color }: { percentage: number; color: string }) {
  return (
    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}80)` }}
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
        viewport={{ once: true }}
      />
    </div>
  );
}

export default function ElectricSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 lg:py-32 bg-[#060810] overflow-hidden" id="electric">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/20 to-transparent" />

      {/* Electric arc background */}
      <div
        className="absolute top-1/4 right-[-10%] w-[50vw] h-[50vw] rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #00d4ff 0%, #1c6ed4 30%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <motion.div
            className="flex items-center gap-3 mb-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            <div className="w-8 h-[1px] bg-[#00d4ff]/50" />
            <span className="text-[#00d4ff] text-xs font-medium tracking-[0.4em] uppercase">
              Electric Mobility
            </span>
          </motion.div>
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
          >
            <span className="text-white">The Electric </span>
            <br />
            <span style={{ background: "linear-gradient(135deg, #00d4ff, #4a9eff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Revolution
            </span>
          </motion.h2>
          <motion.p
            className="text-white/40 text-sm leading-relaxed max-w-xl"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25 }}
          >
            BMW&apos;s electric vehicles represent the future of mobility — combining breathtaking
            performance with zero local emissions. The next chapter of driving begins now.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {evModels.map((model, i) => (
            <motion.div
              key={model.name}
              className="relative p-6 rounded-2xl border border-white/5 hover:border-white/10 overflow-hidden group cursor-pointer transition-all duration-500"
              style={{ background: "rgba(255,255,255,0.02)" }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i + 0.3, duration: 0.7 }}
              whileHover={{ y: -4, boxShadow: `0 0 40px ${model.color}15` }}
            >
              {/* Glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${model.color}08, transparent 60%)` }}
              />

              {/* Electric bolt icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${model.color}15`, border: `1px solid ${model.color}30` }}
              >
                <Zap size={18} style={{ color: model.color }} />
              </div>

              <span
                className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-2 block"
                style={{ color: model.color }}
              >
                {model.tag}
              </span>

              <h3 className="text-white font-bold text-xl mb-5">{model.name}</h3>

              {/* Stats */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-white/40">Range</span>
                    <span className="text-white font-semibold">{model.range}</span>
                  </div>
                  <BatteryBar percentage={88} color={model.color} />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-white/40">Power</span>
                    <span className="text-white font-semibold">{model.power}</span>
                  </div>
                  <BatteryBar percentage={i === 0 ? 98 : i === 1 ? 82 : 92} color={model.color} />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-white/40">0-80% Charge</span>
                    <span style={{ color: model.color }} className="font-semibold">{model.charge0to80}</span>
                  </div>
                </div>
              </div>

              <div className="h-px bg-white/5 my-5" />

              <motion.button
                className="w-full py-2.5 text-xs font-semibold rounded-xl transition-all"
                style={{
                  background: `${model.color}10`,
                  color: model.color,
                  border: `1px solid ${model.color}25`,
                }}
                whileHover={{ background: `${model.color}20` }}
              >
                Explore {model.name} →
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Sustainability stats */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          {sustainabilityStats.map((stat, i) => (
            <div
              key={stat.label}
              className="p-5 rounded-2xl border border-white/5 text-center glass"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-10 h-10 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center mx-auto mb-3 text-[#00d4ff]">
                {stat.icon}
              </div>
              <p className="text-white font-black text-2xl mb-0.5">{stat.value}</p>
              <p className="text-white/60 text-xs font-medium">{stat.label}</p>
              <p className="text-white/25 text-[10px] mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </motion.div>

        {/* Charging network CTA */}
        <motion.div
          className="mt-12 p-8 lg:p-10 rounded-2xl relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.06) 0%, rgba(28,110,212,0.04) 100%)", border: "1px solid rgba(0,212,255,0.1)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-bold text-xl mb-2">BMW Charging Network</h3>
              <p className="text-white/40 text-sm max-w-md">
                Access over 500,000 charging points worldwide. Charge seamlessly wherever you go with the BMW Charging app.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <motion.button
                className="px-6 py-3 text-sm font-semibold rounded-full text-white"
                style={{ background: "linear-gradient(135deg, #00d4ff, #1c6ed4)" }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Find Chargers
              </motion.button>
              <motion.button
                className="px-6 py-3 text-sm font-medium rounded-full border border-white/10 text-white/60 hover:text-white transition-colors"
                whileTap={{ scale: 0.97 }}
              >
                Learn More
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
