"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Zap, Gauge, Cpu } from "lucide-react";

const models = [
  {
    id: "sedan",
    category: "SEDAN",
    name: "BMW 5 Series",
    tagline: "Intelligent Luxury Redefined",
    horsepower: "375 hp",
    acceleration: "4.1s",
    topSpeed: "155 mph",
    price: "From $56,400",
    gradient: "from-[#1c6ed4] to-[#0a3d7a]",
    accentColor: "#4a9eff",
    badge: "Most Popular",
    carColor: "#1a2540",
    specs: ["xDrive AWD", "Twin-scroll Turbo", "Sport Suspension"],
  },
  {
    id: "suv",
    category: "SAV",
    name: "BMW X7",
    tagline: "Commanding Presence. Boundless Luxury.",
    horsepower: "523 hp",
    acceleration: "4.7s",
    topSpeed: "155 mph",
    price: "From $77,900",
    gradient: "from-[#1a1a2e] to-[#0a0a18]",
    accentColor: "#a8d4ff",
    badge: "Flagship SAV",
    carColor: "#111122",
    specs: ["6-Seat Configuration", "Air Suspension", "22\" Wheels"],
  },
  {
    id: "electric",
    category: "ELECTRIC",
    name: "BMW iX",
    tagline: "The Future Moves With You",
    horsepower: "610 hp",
    acceleration: "3.8s",
    topSpeed: "130 mph",
    price: "From $87,100",
    gradient: "from-[#0d1a3a] to-[#1c6ed4]/30",
    accentColor: "#00d4ff",
    badge: "Zero Emissions",
    carColor: "#0d1520",
    specs: ["324 mi Range", "350kW Charging", "iDrive 8"],
  },
  {
    id: "mseries",
    category: "M SERIES",
    name: "BMW M8 Competition",
    tagline: "Born on the Track. Built for the Road.",
    horsepower: "617 hp",
    acceleration: "3.0s",
    topSpeed: "190 mph",
    price: "From $130,500",
    gradient: "from-[#2a0000] to-[#1a0a0a]",
    accentColor: "#ff6b35",
    badge: "Track Ready",
    carColor: "#1a0808",
    specs: ["M xDrive AWD", "8-speed M DCT", "Carbon Fiber Roof"],
  },
];

function CarSVG({ color, accent, index }: { color: string; accent: string; index: number }) {
  const angles = [0, 15, -10, 5];
  const angle = angles[index] || 0;
  return (
    <svg viewBox="0 0 400 180" className="w-full h-full" style={{ transform: `rotate(${angle}deg)` }}>
      <defs>
        <linearGradient id={`cg${index}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#060608" />
        </linearGradient>
        <radialGradient id={`rg${index}`} cx="40%" cy="30%" r="60%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.5" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      {/* Glow */}
      <ellipse cx="200" cy="155" rx="160" ry="10" fill={accent} opacity="0.08" />
      {/* Car body */}
      <path d="M 40 120 L 50 90 L 70 72 L 100 65 L 140 52 L 200 45 L 270 50 L 315 65 L 345 85 L 360 120 L 360 130 L 40 130 Z"
        fill={`url(#cg${index})`} stroke={accent} strokeWidth="0.5" strokeOpacity="0.3" />
      {/* Roof */}
      <path d="M 140 52 L 200 45 L 270 50 L 290 65 L 140 65 Z"
        fill={color} opacity="0.6" />
      {/* Windows */}
      <path d="M 145 64 L 195 48 L 230 48 L 230 64 Z" fill={accent} opacity="0.4" />
      <path d="M 236 48 L 285 52 L 285 64 L 236 64 Z" fill={accent} opacity="0.35" />
      {/* DRL */}
      <path d="M 348 86 L 360 100 L 358 115" stroke={accent} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.9" />
      {/* Taillight */}
      <path d="M 53 88 L 43 105" stroke="#cc3333" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
      {/* Front wheel */}
      <circle cx="300" cy="130" r="28" fill="#080810" stroke={accent} strokeWidth="0.5" strokeOpacity="0.3" />
      <circle cx="300" cy="130" r="22" fill="#111120" />
      {[0, 72, 144, 216, 288].map((a, i) => (
        <line key={i} x1={300} y1={130}
          x2={300 + Math.cos(a * Math.PI / 180) * 20}
          y2={130 + Math.sin(a * Math.PI / 180) * 20}
          stroke={accent} strokeWidth="1.5" strokeOpacity="0.5" />
      ))}
      <circle cx="300" cy="130" r="5" fill={accent} opacity="0.8" />
      {/* Rear wheel */}
      <circle cx="105" cy="130" r="28" fill="#080810" stroke={accent} strokeWidth="0.5" strokeOpacity="0.3" />
      <circle cx="105" cy="130" r="22" fill="#111120" />
      {[0, 72, 144, 216, 288].map((a, i) => (
        <line key={i} x1={105} y1={130}
          x2={105 + Math.cos(a * Math.PI / 180) * 20}
          y2={130 + Math.sin(a * Math.PI / 180) * 20}
          stroke={accent} strokeWidth="1.5" strokeOpacity="0.5" />
      ))}
      <circle cx="105" cy="130" r="5" fill={accent} opacity="0.8" />
      {/* Roof highlight */}
      <path d="M 155 62 Q 215 50 272 56" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />
    </svg>
  );
}

function ModelCard({ model, index }: { model: typeof models[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className="relative group cursor-pointer rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-500"
      style={{
        background: "rgba(255,255,255,0.02)",
        boxShadow: hovered ? `0 0 40px ${model.accentColor}20, 0 20px 60px rgba(0,0,0,0.5)` : "none",
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6 }}
    >
      {/* Card gradient bg */}
      <div
        className="absolute inset-0 opacity-30 transition-opacity duration-500 group-hover:opacity-50"
        style={{ background: `linear-gradient(135deg, ${model.accentColor}10, transparent 60%)` }}
      />

      {/* Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span
          className="text-[10px] font-semibold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full"
          style={{
            background: `${model.accentColor}20`,
            color: model.accentColor,
            border: `1px solid ${model.accentColor}30`,
          }}
        >
          {model.badge}
        </span>
      </div>

      {/* Category */}
      <div className="absolute top-4 right-4 z-10">
        <span className="text-[10px] font-medium tracking-[0.3em] text-white/30 uppercase">
          {model.category}
        </span>
      </div>

      {/* Car visualization */}
      <div className="relative h-44 sm:h-48 flex items-center justify-center px-4 pt-10 overflow-hidden">
        <motion.div
          className="w-full h-full"
          animate={hovered ? { scale: 1.05, y: -4 } : { scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          <CarSVG color={model.carColor} accent={model.accentColor} index={index} />
        </motion.div>
        {/* Ambient glow */}
        <motion.div
          className="absolute bottom-2 left-[20%] right-[20%] h-8 rounded-full blur-xl"
          style={{ background: model.accentColor }}
          animate={{ opacity: hovered ? 0.15 : 0.06 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Content */}
      <div className="p-5 pt-0">
        <div className="border-t border-white/5 pt-4 mb-4">
          <h3 className="text-white font-bold text-xl mb-1">{model.name}</h3>
          <p className="text-white/40 text-xs leading-relaxed">{model.tagline}</p>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { icon: <Zap size={11} />, label: model.horsepower, sub: "Power" },
            { icon: <Gauge size={11} />, label: model.acceleration, sub: "0-60" },
            { icon: <Cpu size={11} />, label: model.topSpeed, sub: "Top Speed" },
          ].map((spec) => (
            <div
              key={spec.sub}
              className="text-center py-2 rounded-lg"
              style={{ background: `${model.accentColor}08` }}
            >
              <div style={{ color: model.accentColor }} className="flex justify-center mb-0.5 opacity-70">
                {spec.icon}
              </div>
              <p className="text-white text-xs font-semibold">{spec.label}</p>
              <p className="text-white/30 text-[10px]">{spec.sub}</p>
            </div>
          ))}
        </div>

        {/* Feature tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {model.specs.map((s) => (
            <span
              key={s}
              className="text-[9px] px-2 py-1 rounded-full border tracking-wide"
              style={{ borderColor: `${model.accentColor}20`, color: `${model.accentColor}80` }}
            >
              {s}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/30 text-[10px] uppercase tracking-wider">Starting</p>
            <p className="text-white font-semibold text-sm">{model.price}</p>
          </div>
          <motion.button
            className="flex items-center gap-1.5 text-xs font-semibold tracking-wide px-4 py-2 rounded-full"
            style={{
              background: `${model.accentColor}15`,
              color: model.accentColor,
              border: `1px solid ${model.accentColor}25`,
            }}
            whileHover={{ scale: 1.05, background: `${model.accentColor}25` }}
            whileTap={{ scale: 0.97 }}
          >
            Explore
            <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedModels() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 lg:py-32 bg-[#0a0a0a] overflow-hidden" id="models">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1c6ed4]/20 to-transparent" />
      <div className="absolute inset-0 grid-pattern opacity-40" />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="w-8 h-[1px] bg-[#4a9eff]/50" />
            <span className="text-[#4a9eff] text-xs font-medium tracking-[0.4em] uppercase">
              Model Lineup
            </span>
            <div className="w-8 h-[1px] bg-[#4a9eff]/50" />
          </motion.div>
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            <span className="text-white">Choose Your </span>
            <span className="gradient-text">Perfection</span>
          </motion.h2>
          <motion.p
            className="text-white/40 max-w-xl mx-auto text-sm leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            From exhilarating sport coupes to pioneering electric vehicles, every BMW
            represents the pinnacle of automotive craftsmanship.
          </motion.p>
        </div>

        {/* Model cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5">
          {models.map((model, i) => (
            <ModelCard key={model.id} model={model} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <motion.button
            className="px-8 py-3.5 border border-white/10 hover:border-[#4a9eff]/40 text-white/60 hover:text-white text-sm font-medium rounded-full transition-all duration-300 tracking-wide"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            View Complete Lineup →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
