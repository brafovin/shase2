"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Clock, Search } from "lucide-react";

const dealers = [
  { name: "BMW of Beverly Hills",  address: "8832 Wilshire Blvd",    phone: "(310) 659-2900", hours: "Mon–Sat 9–7",   dist: "2.3 mi", rating: 4.9, certs: ["M Certified", "EV"], x: 15, y: 38 },
  { name: "BMW of Santa Monica",   address: "1127 Santa Monica Blvd", phone: "(310) 829-3395", hours: "Mon–Sat 8:30–8", dist: "4.1 mi", rating: 4.8, certs: ["M Certified"],      x: 32, y: 54 },
  { name: "BMW of Los Angeles",    address: "4311 Central Ave",       phone: "(213) 748-5200", hours: "Mon–Sat 9–8",   dist: "5.7 mi", rating: 4.7, certs: ["EV", "M Certified"], x: 60, y: 48 },
  { name: "Pacific BMW",           address: "600 W Broadway, Glendale",phone: "(818) 247-7878", hours: "Mon–Fri 8–8",  dist: "8.2 mi", rating: 4.8, certs: ["M Certified"],      x: 76, y: 24 },
];

export default function DealerLocator() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [sel, setSel] = useState(0);
  const [query, setQuery] = useState("");

  const filtered = dealers.filter(d =>
    !query || d.name.toLowerCase().includes(query.toLowerCase()) || d.address.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section ref={ref} className="relative py-28 lg:py-36 bg-[#080810] overflow-hidden" id="dealers">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute inset-0 grid-pattern opacity-25" />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-16">

        {/* Header */}
        <div className="mb-14">
          <motion.p className="text-[#4a9eff] text-xs tracking-[0.5em] uppercase font-medium mb-3"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
            — Find Us
          </motion.p>
          <motion.h2 className="text-5xl lg:text-7xl font-black tracking-tight"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <span className="text-white">Dealer </span>
            <span className="gradient-text">Locator</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* List */}
          <motion.div className="lg:col-span-2 space-y-3"
            initial={{ opacity: 0, x: -36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>

            {/* Search */}
            <div className="relative mb-4">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
              <input type="text" placeholder="City or zip code…" value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/4 border border-white/8 rounded-xl text-white text-sm placeholder-white/20 outline-none focus:border-[#4a9eff]/40 transition-colors" />
            </div>

            {(filtered.length > 0 ? filtered : dealers).map((d, i) => (
              <motion.button key={d.name}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${sel === i ? "border-[#4a9eff]/35 bg-[#4a9eff]/4" : "border-white/5 hover:border-white/10 bg-white/2"}`}
                onClick={() => setSel(i)} whileTap={{ scale: 0.99 }}>
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className={`text-sm font-semibold truncate ${sel === i ? "text-white" : "text-white/60"}`}>{d.name}</h4>
                  <span className="text-[#4a9eff] text-xs ml-2 flex-shrink-0">{d.dist}</span>
                </div>
                <p className="text-white/30 text-xs mb-2 truncate">{d.address}</p>
                <div className="flex items-center gap-2">
                  {d.certs.map(c => (
                    <span key={c} className="text-[9px] px-1.5 py-0.5 rounded bg-[#4a9eff]/8 text-[#4a9eff]/60 border border-[#4a9eff]/12">{c}</span>
                  ))}
                  <span className="ml-auto text-yellow-400/60 text-[10px]">★ {d.rating}</span>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Map */}
          <motion.div className="lg:col-span-3"
            initial={{ opacity: 0, x: 36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>

            <div className="relative min-h-[460px] h-full rounded-2xl overflow-hidden border border-white/5"
              style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(28,110,212,0.05), rgba(6,8,16,0.98))" }}>
              <div className="absolute inset-0 grid-pattern opacity-35" />

              {/* Pins */}
              {dealers.map((d, i) => (
                <motion.button key={d.name}
                  className="absolute flex flex-col items-center group"
                  style={{ left: `${d.x}%`, top: `${d.y}%`, transform: "translate(-50%, -100%)" }}
                  onClick={() => setSel(i)} whileHover={{ scale: 1.15 }}>
                  {sel === i && (
                    <div className="absolute inset-0 rounded-full bg-[#4a9eff]/30 pulse-ring" />
                  )}
                  <div className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${sel === i ? "bg-[#4a9eff] shadow-lg shadow-[#4a9eff]/40" : "bg-[#1c6ed4]/60 hover:bg-[#4a9eff]/80"}`}>
                    <MapPin size={14} className="text-white" />
                  </div>
                  {/* Tooltip */}
                  <div className={`absolute bottom-full mb-1.5 whitespace-nowrap glass rounded-lg px-2.5 py-1.5 pointer-events-none transition-all duration-200 ${sel === i ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                    <p className="text-white text-[10px] font-medium">{d.name}</p>
                    <p className="text-[#4a9eff] text-[9px]">{d.dist}</p>
                  </div>
                </motion.button>
              ))}

              {/* Selected dealer detail */}
              <motion.div className="absolute bottom-4 left-4 right-4 glass rounded-xl p-4"
                key={sel}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
                <p className="text-white font-semibold text-sm mb-3">{dealers[sel].name}</p>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[
                    { icon: <MapPin size={10} />, text: dealers[sel].address },
                    { icon: <Phone size={10} />, text: dealers[sel].phone },
                    { icon: <Clock size={10} />, text: dealers[sel].hours },
                  ].map((row, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className="text-[#4a9eff] mt-0.5 flex-shrink-0">{row.icon}</span>
                      <p className="text-white/35 text-[10px] leading-relaxed">{row.text}</p>
                    </div>
                  ))}
                </div>
                <motion.button className="w-full py-2.5 bg-gradient-to-r from-[#1c6ed4] to-[#4a9eff] rounded-lg text-white text-xs font-semibold"
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
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
