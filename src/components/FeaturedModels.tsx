"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const models = [
  {
    id: "sedan",
    category: "Sedan",
    name: "BMW 5 Series",
    price: "From $56,400",
    accent: "#4a9eff",
    bodyColor: "#1a2540",
    image: "https://images.unsplash.com/photo-1617531653332-bd46c16f4d68?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "suv",
    category: "SAV",
    name: "BMW X7",
    price: "From $77,900",
    accent: "#a8d4ff",
    bodyColor: "#111122",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "electric",
    category: "Electric",
    name: "BMW iX",
    price: "From $87,100",
    accent: "#00d4ff",
    bodyColor: "#0a1520",
    image: "https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "mseries",
    category: "M Series",
    name: "BMW M4",
    price: "From $74,700",
    accent: "#ff9a6c",
    bodyColor: "#1a0808",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80",
  },
];

/* Minimal SVG car silhouette — used as fallback / dark overlay */
function CarSilhouette({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 480 180" fill="none" className="w-full h-full drop-shadow-2xl">
      <ellipse cx="240" cy="160" rx="190" ry="10" fill={accent} opacity="0.07" />
      <path d="M38 128 L50 94 L76 72 L120 56 L172 44 L240 38 L312 44 L368 60 L408 86 L430 118 L432 134 L38 134Z"
        fill="#0f0f1a" stroke={accent} strokeWidth="0.4" strokeOpacity="0.25" />
      <path d="M172 44 L240 38 L312 44 L334 60 L172 60Z" fill="#1a1a2a" />
      <path d="M178 58 L234 42 L272 42 L272 58Z" fill={accent} opacity="0.35" />
      <path d="M278 42 L328 46 L328 58 L278 58Z" fill={accent} opacity="0.28" />
      <path d="M412 88 L430 112 L428 130" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.85" />
      <path d="M53 96 L40 120" stroke="#cc3333" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      {[360, 118].map((cx, wi) => (
        <g key={wi}>
          <circle cx={cx} cy={134} r={28} fill="#060610" stroke={accent} strokeWidth="0.4" strokeOpacity="0.25" />
          <circle cx={cx} cy={134} r={21} fill="#0c0c18" />
          {[0,60,120,180,240,300].map((a,i) => (
            <line key={i} x1={cx} y1={134}
              x2={cx + Math.cos(a*Math.PI/180)*19} y2={134 + Math.sin(a*Math.PI/180)*19}
              stroke={accent} strokeWidth="1.3" strokeOpacity="0.5" />
          ))}
          <circle cx={cx} cy={134} r={4.5} fill={accent} opacity={0.9} />
        </g>
      ))}
    </svg>
  );
}

export default function FeaturedModels() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="models" className="bg-[#050505] pt-28 pb-32 lg:pt-36 lg:pb-44 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 sm:px-12 lg:px-20">

        {/* Header */}
        <div ref={ref} className="mb-16 lg:mb-20">
          <motion.p
            className="text-white/30 text-[11px] tracking-[0.55em] uppercase font-medium mb-4"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          >
            Model Lineup
          </motion.p>
          <motion.h2
            className="text-5xl lg:text-7xl xl:text-8xl font-black tracking-[-0.02em] leading-[0.9]"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-white">Choose Your </span>
            <span className="text-blue-gradient">BMW</span>
          </motion.h2>
        </div>

        {/* 2 × 2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
          {models.map((m, i) => (
            <motion.div
              key={m.id}
              className="group relative overflow-hidden rounded-lg cursor-pointer"
              style={{ background: m.bodyColor, aspectRatio: "16/10" }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 + 0.15, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              whileHover="hover"
            >
              {/* Ambient tint */}
              <div className="absolute inset-0"
                style={{ background: `radial-gradient(ellipse at 50% 30%, ${m.accent}18, transparent 65%)` }} />

              {/* Car */}
              <div className="absolute inset-x-4 inset-y-8 flex items-center justify-center">
                <motion.div className="w-full h-full"
                  variants={{ hover: { scale: 1.04, y: -6 } }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                  <CarSilhouette accent={m.accent} />
                </motion.div>
              </div>

              {/* Gradient bottom */}
              <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Info overlay */}
              <div className="absolute bottom-0 inset-x-0 p-6 flex items-end justify-between">
                <div>
                  <p className="text-white/40 text-[10px] tracking-[0.4em] uppercase mb-1">{m.category}</p>
                  <h3 className="text-white font-bold text-xl tracking-tight">{m.name}</h3>
                  <p className="text-white/40 text-sm mt-0.5">{m.price}</p>
                </div>
                <motion.span
                  className="text-[13px] font-semibold tracking-wide"
                  style={{ color: m.accent }}
                  variants={{ hover: { x: 4 } }}
                  transition={{ duration: 0.3 }}
                >
                  Explore →
                </motion.span>
              </div>

              {/* Border on hover */}
              <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-white/10 transition-colors duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
