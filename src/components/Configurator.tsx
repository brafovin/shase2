"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";

const colors = [
  { name: "Alpine White", hex: "#f5f5f0", price: "Standard" },
  { name: "Phytonic Blue", hex: "#2a4a7a", price: "+$550" },
  { name: "Aventurine Red", hex: "#6a1a1a", price: "+$550" },
  { name: "Frozen Black", hex: "#1a1a1a", price: "+$2,700" },
  { name: "Manhattan Metallic", hex: "#8a7a6a", price: "+$550" },
  { name: "Brooklyn Grey", hex: "#5a5a5a", price: "+$550" },
];

const wheels = [
  { name: '20" M Double Spoke', style: "M Sport" },
  { name: '21" M Aerodynamic', style: "Performance" },
  { name: '22" V-Spoke', style: "Luxury" },
  { name: '19" Star Spoke', style: "Standard" },
];

const packages = [
  { name: "M Sport Package", price: "$3,450", active: false },
  { name: "Executive Package", price: "$4,750", active: false },
  { name: "Driving Assist Pro", price: "$1,900", active: false },
  { name: "Harman Kardon Audio", price: "$875", active: false },
];

export default function Configurator() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedWheel, setSelectedWheel] = useState(0);
  const [activePackages, setActivePackages] = useState<boolean[]>([false, false, false, false]);
  const [activeTab, setActiveTab] = useState<"color" | "wheels" | "packages">("color");

  const togglePackage = (i: number) => {
    const next = [...activePackages];
    next[i] = !next[i];
    setActivePackages(next);
  };

  const basePrice = 56400;
  const colorExtra = colors[selectedColor].price === "Standard" ? 0 : parseInt(colors[selectedColor].price.replace(/\D/g, "")) || 0;
  const packageExtras = packages.reduce((sum, pkg, i) => sum + (activePackages[i] ? parseInt(pkg.price.replace(/\D/g, "")) : 0), 0);
  const totalPrice = basePrice + colorExtra + packageExtras;

  return (
    <section ref={ref} className="relative py-24 lg:py-32 bg-[#080810] overflow-hidden" id="configure">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1c6ed4]/20 to-transparent" />
      <div className="absolute inset-0 dot-pattern opacity-30" />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(28,110,212,0.05) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            <div className="w-8 h-[1px] bg-[#4a9eff]/50" />
            <span className="text-[#4a9eff] text-xs font-medium tracking-[0.4em] uppercase">
              Configure Yours
            </span>
            <div className="w-8 h-[1px] bg-[#4a9eff]/50" />
          </motion.div>
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
          >
            <span className="text-white">Build Your </span>
            <span className="gradient-text">Dream BMW</span>
          </motion.h2>
          <motion.p
            className="text-white/40 text-sm max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25 }}
          >
            Personalize every detail to match your vision.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Car preview */}
          <motion.div
            className="sticky top-28"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div
              className="relative rounded-2xl overflow-hidden p-8"
              style={{ background: `radial-gradient(ellipse at 50% 30%, ${colors[selectedColor].hex}10, rgba(8,8,16,0.95) 70%)` }}
            >
              {/* Background grid */}
              <div className="absolute inset-0 grid-pattern opacity-20" />

              {/* Car preview */}
              <div className="relative h-64 flex items-center justify-center">
                <motion.svg
                  viewBox="0 0 500 220"
                  className="w-full h-full"
                  key={selectedColor}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <defs>
                    <linearGradient id="confBodyGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor={colors[selectedColor].hex} stopOpacity="0.9" />
                      <stop offset="100%" stopColor={colors[selectedColor].hex} stopOpacity="0.4" />
                    </linearGradient>
                    <radialGradient id="confHl">
                      <stop offset="0%" stopColor="white" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                  </defs>

                  {/* Shadow */}
                  <ellipse cx="250" cy="190" rx="200" ry="12" fill="rgba(0,0,0,0.4)" />

                  {/* Body */}
                  <path d="M 50 155 L 60 120 L 90 95 L 130 82 L 175 68 L 250 58 L 330 63 L 380 82 L 420 108 L 445 140 L 450 160 L 50 160 Z"
                    fill="url(#confBodyGrad)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />

                  {/* Roof */}
                  <path d="M 175 68 L 250 58 L 330 63 L 360 82 L 175 82 Z"
                    fill={colors[selectedColor].hex} opacity="0.7" />

                  {/* Highlight on roof */}
                  <path d="M 190 78 Q 252 62 328 70" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none" />

                  {/* Windows */}
                  <path d="M 180 80 L 244 62 L 280 62 L 280 80 Z" fill="rgba(100,160,255,0.4)" />
                  <path d="M 286 62 L 355 66 L 355 80 L 286 80 Z" fill="rgba(100,160,255,0.35)" />

                  {/* DRL */}
                  <path d="M 428 108 L 446 130 L 445 152" stroke="#4a9eff" strokeWidth="2.5" fill="none" strokeLinecap="round" />

                  {/* Taillight */}
                  <path d="M 63 118 L 54 140" stroke="#cc3333" strokeWidth="2.5" fill="none" strokeLinecap="round" />

                  {/* Front wheel */}
                  <circle cx="370" cy="162" r="32" fill="#0a0a12" stroke="rgba(255,255,255,0.08)" />
                  <circle cx="370" cy="162" r="26" fill="#111118" />
                  {[0, 60, 120, 180, 240, 300].map((a, i) => (
                    <line key={i} x1={370} y1={162}
                      x2={370 + Math.cos(a * Math.PI / 180) * 24}
                      y2={162 + Math.sin(a * Math.PI / 180) * 24}
                      stroke="rgba(150,150,170,0.5)" strokeWidth="2" />
                  ))}
                  <circle cx="370" cy="162" r="6" fill="#4a9eff" />

                  {/* Rear wheel */}
                  <circle cx="130" cy="162" r="32" fill="#0a0a12" stroke="rgba(255,255,255,0.08)" />
                  <circle cx="130" cy="162" r="26" fill="#111118" />
                  {[0, 60, 120, 180, 240, 300].map((a, i) => (
                    <line key={i} x1={130} y1={162}
                      x2={130 + Math.cos(a * Math.PI / 180) * 24}
                      y2={162 + Math.sin(a * Math.PI / 180) * 24}
                      stroke="rgba(150,150,170,0.5)" strokeWidth="2" />
                  ))}
                  <circle cx="130" cy="162" r="6" fill="#4a9eff" />

                  {/* Body crease line */}
                  <path d="M 60 128 Q 250 118 440 128" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
                </motion.svg>

                {/* Ambient glow */}
                <div
                  className="absolute bottom-4 left-[20%] right-[20%] h-6 rounded-full blur-xl opacity-20"
                  style={{ background: colors[selectedColor].hex }}
                />
              </div>

              {/* Selected color name */}
              <div className="text-center mt-2">
                <p className="text-white/60 text-xs font-medium">{colors[selectedColor].name}</p>
                <p className="text-[#4a9eff] text-xs">{colors[selectedColor].price}</p>
              </div>
            </div>

            {/* Price display */}
            <div className="mt-6 p-6 rounded-2xl glass">
              <div className="flex justify-between items-center mb-3">
                <span className="text-white/40 text-sm">Base Price</span>
                <span className="text-white/70 text-sm">${basePrice.toLocaleString()}</span>
              </div>
              {activePackages.map((active, i) =>
                active ? (
                  <div key={i} className="flex justify-between items-center mb-2">
                    <span className="text-white/40 text-xs">{packages[i].name}</span>
                    <span className="text-[#4a9eff] text-xs">{packages[i].price}</span>
                  </div>
                ) : null
              )}
              <div className="h-px bg-white/5 my-3" />
              <div className="flex justify-between items-center">
                <span className="text-white font-semibold">Estimated Total</span>
                <motion.span
                  className="text-white font-black text-xl"
                  key={totalPrice}
                  initial={{ scale: 1.2, color: "#4a9eff" }}
                  animate={{ scale: 1, color: "#ffffff" }}
                  transition={{ duration: 0.4 }}
                >
                  ${totalPrice.toLocaleString()}
                </motion.span>
              </div>
            </div>
          </motion.div>

          {/* Right: Config options */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {/* Tabs */}
            <div className="flex gap-1 mb-8 p-1 rounded-xl bg-white/3 border border-white/5">
              {(["color", "wheels", "packages"] as const).map((tab) => (
                <button
                  key={tab}
                  className={`flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-[#1c6ed4] text-white"
                      : "text-white/40 hover:text-white/70"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Color picker */}
            {activeTab === "color" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                {colors.map((color, i) => (
                  <motion.button
                    key={color.name}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
                      selectedColor === i
                        ? "border-[#4a9eff]/50 bg-[#4a9eff]/5"
                        : "border-white/5 hover:border-white/10 bg-white/2"
                    }`}
                    onClick={() => setSelectedColor(i)}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="relative flex-shrink-0">
                      <div
                        className="w-10 h-10 rounded-full border-2 transition-colors"
                        style={{
                          background: color.hex,
                          borderColor: selectedColor === i ? "#4a9eff" : "rgba(255,255,255,0.1)",
                        }}
                      />
                      {selectedColor === i && (
                        <div className="absolute inset-0 rounded-full flex items-center justify-center">
                          <Check size={12} className="text-white drop-shadow-lg" />
                        </div>
                      )}
                    </div>
                    <div className="text-left flex-1">
                      <p className={`text-sm font-medium ${selectedColor === i ? "text-white" : "text-white/70"}`}>
                        {color.name}
                      </p>
                    </div>
                    <span className="text-xs text-white/30">{color.price}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* Wheels */}
            {activeTab === "wheels" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 gap-3"
              >
                {wheels.map((wheel, i) => (
                  <motion.button
                    key={wheel.name}
                    className={`p-4 rounded-xl border transition-all duration-200 text-left ${
                      selectedWheel === i
                        ? "border-[#4a9eff]/50 bg-[#4a9eff]/5"
                        : "border-white/5 hover:border-white/10 bg-white/2"
                    }`}
                    onClick={() => setSelectedWheel(i)}
                    whileTap={{ scale: 0.97 }}
                  >
                    {/* Wheel graphic */}
                    <svg viewBox="0 0 80 80" className="w-16 h-16 mx-auto mb-3">
                      <circle cx="40" cy="40" r="36" fill="#111" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                      <circle cx="40" cy="40" r="28" fill="#0a0a0a" />
                      {Array.from({ length: 5 + i }).map((_, j) => {
                        const a = (j / (5 + i)) * Math.PI * 2;
                        return (
                          <line key={j} x1="40" y1="40"
                            x2={40 + Math.cos(a) * 26} y2={40 + Math.sin(a) * 26}
                            stroke={selectedWheel === i ? "#4a9eff" : "rgba(150,150,170,0.4)"}
                            strokeWidth="2" />
                        );
                      })}
                      <circle cx="40" cy="40" r="6" fill={selectedWheel === i ? "#4a9eff" : "#333"} />
                    </svg>
                    <p className={`text-xs font-medium text-center ${selectedWheel === i ? "text-white" : "text-white/50"}`}>
                      {wheel.name}
                    </p>
                    <p className="text-[10px] text-center text-white/30 mt-0.5">{wheel.style}</p>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* Packages */}
            {activeTab === "packages" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                {packages.map((pkg, i) => (
                  <motion.button
                    key={pkg.name}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
                      activePackages[i]
                        ? "border-[#4a9eff]/50 bg-[#4a9eff]/5"
                        : "border-white/5 hover:border-white/10 bg-white/2"
                    }`}
                    onClick={() => togglePackage(i)}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                        activePackages[i]
                          ? "bg-[#1c6ed4] border-[#4a9eff]"
                          : "border-white/20"
                      }`}
                    >
                      {activePackages[i] && <Check size={11} className="text-white" />}
                    </div>
                    <div className="flex-1 text-left">
                      <p className={`text-sm font-medium ${activePackages[i] ? "text-white" : "text-white/70"}`}>
                        {pkg.name}
                      </p>
                    </div>
                    <span className={`text-sm font-semibold ${activePackages[i] ? "text-[#4a9eff]" : "text-white/30"}`}>
                      {pkg.price}
                    </span>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* CTA */}
            <div className="flex gap-3 mt-10">
              <motion.button
                className="flex-1 py-3.5 bg-gradient-to-r from-[#1c6ed4] to-[#4a9eff] text-white text-sm font-semibold rounded-full"
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(74,158,255,0.3)" }}
                whileTap={{ scale: 0.97 }}
              >
                Save Configuration
              </motion.button>
              <motion.button
                className="px-6 py-3.5 border border-white/10 text-white/60 text-sm font-medium rounded-full hover:border-white/30 hover:text-white transition-all"
                whileTap={{ scale: 0.97 }}
              >
                Request Quote
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
