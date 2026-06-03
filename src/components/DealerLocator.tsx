"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Search } from "lucide-react";

const dealers = [
  { name: "BMW Beverly Hills",  addr: "8832 Wilshire Blvd",     dist: "2.3 mi", rating: 4.9, x: 15, y: 36 },
  { name: "BMW Santa Monica",   addr: "1127 Santa Monica Blvd", dist: "4.1 mi", rating: 4.8, x: 32, y: 54 },
  { name: "BMW Los Angeles",    addr: "4311 Central Ave",        dist: "5.7 mi", rating: 4.7, x: 60, y: 48 },
  { name: "Pacific BMW Glendale", addr: "600 W Broadway",       dist: "8.2 mi", rating: 4.8, x: 76, y: 24 },
];

export default function DealerLocator() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [sel, setSel] = useState(0);
  const [q, setQ] = useState("");

  const list = dealers.filter(d => !q || d.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <section id="dealers" className="bg-[#080808] pt-28 pb-32 lg:pt-36 lg:pb-44 overflow-hidden">
      <div ref={ref} className="max-w-[1440px] mx-auto px-8 sm:px-12 lg:px-20">

        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <motion.p className="text-white/30 text-[11px] tracking-[0.55em] uppercase font-medium mb-4"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
            Find a Dealer
          </motion.p>
          <motion.h2 className="text-5xl lg:text-7xl xl:text-8xl font-black tracking-[-0.02em] leading-[0.9]"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <span className="text-white">Near </span>
            <span className="text-blue-gradient">You</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* List */}
          <motion.div className="lg:col-span-2 space-y-2.5"
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}>
            <div className="relative mb-5">
              <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20" />
              <input type="text" placeholder="City or zip…" value={q} onChange={e => setQ(e.target.value)}
                className="w-full pl-9 pr-4 py-3 bg-white/3 border border-white/6 rounded-sm text-white/70 text-sm placeholder-white/20 outline-none focus:border-[#4a9eff]/35 transition-colors" />
            </div>

            {(list.length ? list : dealers).map((d, i) => (
              <motion.button key={d.name}
                className={`w-full text-left p-5 rounded-lg border transition-all duration-200 ${sel === i ? "border-[#4a9eff]/30 bg-[#4a9eff]/4" : "border-white/5 hover:border-white/10 bg-white/[0.018]"}`}
                onClick={() => setSel(i)} whileTap={{ scale: 0.99 }}>
                <div className="flex items-center justify-between mb-1">
                  <p className={`text-sm font-semibold ${sel === i ? "text-white" : "text-white/55"}`}>{d.name}</p>
                  <span className="text-[#4a9eff] text-xs">{d.dist}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-white/25 text-xs">{d.addr}</p>
                  <span className="text-yellow-400/50 text-[10px]">★ {d.rating}</span>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Map */}
          <motion.div className="lg:col-span-3"
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}>
            <div className="relative min-h-[400px] h-full rounded-lg overflow-hidden border border-white/5"
              style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(28,110,212,0.04), #070710)" }}>
              <div className="absolute inset-0 grid-bg opacity-30" />

              {dealers.map((d, i) => (
                <button key={d.name}
                  className="absolute flex flex-col items-center group"
                  style={{ left: `${d.x}%`, top: `${d.y}%`, transform: "translate(-50%, -100%)" }}
                  onClick={() => setSel(i)}>
                  {sel === i && <div className="absolute inset-0 rounded-full bg-[#4a9eff]/25 pulse-ring" />}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${sel === i ? "bg-[#4a9eff] shadow-lg shadow-[#4a9eff]/40" : "bg-[#1c6ed4]/50 hover:bg-[#4a9eff]/70"}`}>
                    <MapPin size={13} className="text-white" />
                  </div>
                  <div className={`absolute bottom-full mb-2 whitespace-nowrap glass rounded-md px-2.5 py-1.5 pointer-events-none transition-all ${sel === i ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                    <p className="text-white text-[10px] font-medium">{d.name}</p>
                  </div>
                </button>
              ))}

              {/* Selected info */}
              <motion.div className="absolute bottom-4 left-4 right-4 glass rounded-lg p-4"
                key={sel}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-white font-semibold text-sm">{dealers[sel].name}</p>
                  <span className="text-white/30 text-xs">{dealers[sel].addr}</span>
                </div>
                <motion.button
                  className="w-full py-2.5 bg-[#1c6ed4] hover:bg-[#4a9eff] rounded-sm text-white text-xs font-semibold tracking-wide transition-colors"
                  whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }}>
                  Book a Test Drive
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
