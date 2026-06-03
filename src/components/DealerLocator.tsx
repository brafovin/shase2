"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Clock, ChevronRight, Search } from "lucide-react";

const dealers = [
  {
    name: "BMW of Beverly Hills",
    address: "8832 Wilshire Blvd, Beverly Hills, CA",
    phone: "(310) 659-2900",
    hours: "Mon–Sat: 9am–7pm",
    distance: "2.3 mi",
    rating: 4.9,
    certifications: ["M Certified", "EV Certified"],
    x: 15,
    y: 40,
  },
  {
    name: "BMW of Santa Monica",
    address: "1127 Santa Monica Blvd, Santa Monica, CA",
    phone: "(310) 829-3395",
    hours: "Mon–Sat: 8:30am–8pm",
    distance: "4.1 mi",
    rating: 4.8,
    certifications: ["M Certified"],
    x: 30,
    y: 55,
  },
  {
    name: "BMW of Los Angeles",
    address: "4311 Central Ave, Los Angeles, CA",
    phone: "(213) 748-5200",
    hours: "Mon–Sat: 9am–8pm",
    distance: "5.7 mi",
    rating: 4.7,
    certifications: ["EV Certified", "M Certified"],
    x: 60,
    y: 50,
  },
  {
    name: "Pacific BMW",
    address: "600 W Broadway, Glendale, CA",
    phone: "(818) 247-7878",
    hours: "Mon–Fri: 8am–8pm",
    distance: "8.2 mi",
    rating: 4.8,
    certifications: ["M Certified"],
    x: 75,
    y: 25,
  },
];

export default function DealerLocator() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = dealers.filter(
    (d) =>
      !searchQuery ||
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section ref={ref} className="relative py-24 lg:py-32 bg-[#0a0a0a] overflow-hidden" id="dealers">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1c6ed4]/20 to-transparent" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

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
              Find Us
            </span>
            <div className="w-8 h-[1px] bg-[#4a9eff]/50" />
          </motion.div>
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
          >
            <span className="text-white">Dealer </span>
            <span className="gradient-text">Locator</span>
          </motion.h2>
          <motion.p
            className="text-white/40 text-sm max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25 }}
          >
            Visit a BMW Center near you for a personalized experience with our luxury specialists.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left panel */}
          <motion.div
            className="lg:col-span-2 space-y-4"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            {/* Search */}
            <div className="relative">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                placeholder="City, state, or zip code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/4 border border-white/8 rounded-xl text-white text-sm placeholder-white/25 outline-none focus:border-[#4a9eff]/40 transition-colors"
              />
            </div>

            {/* Dealer list */}
            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {(filtered.length > 0 ? filtered : dealers).map((dealer, i) => (
                <motion.button
                  key={dealer.name}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                    selected === i
                      ? "border-[#4a9eff]/40 bg-[#4a9eff]/5"
                      : "border-white/5 hover:border-white/10 bg-white/2"
                  }`}
                  onClick={() => setSelected(i)}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-start gap-2 min-w-0">
                      <div
                        className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${
                          selected === i ? "bg-[#4a9eff]" : "bg-white/20"
                        }`}
                      />
                      <h4 className={`text-sm font-semibold leading-tight truncate ${
                        selected === i ? "text-white" : "text-white/70"
                      }`}>
                        {dealer.name}
                      </h4>
                    </div>
                    <span className="text-[#4a9eff] text-xs font-medium flex-shrink-0">{dealer.distance}</span>
                  </div>

                  <p className="text-white/35 text-xs ml-4 mb-2 leading-relaxed">{dealer.address}</p>

                  <div className="flex items-center gap-3 ml-4">
                    {dealer.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="text-[9px] px-2 py-0.5 rounded-full bg-[#4a9eff]/10 text-[#4a9eff]/70 border border-[#4a9eff]/15"
                      >
                        {cert}
                      </span>
                    ))}
                    <span className="text-yellow-400/70 text-[10px] ml-auto">★ {dealer.rating}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Map placeholder */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <div className="relative h-full min-h-[480px] rounded-2xl overflow-hidden border border-white/5"
              style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(28,110,212,0.06), rgba(8,8,16,0.95))" }}
            >
              {/* Grid map effect */}
              <div className="absolute inset-0 grid-pattern opacity-40" />

              {/* Map pins */}
              {dealers.map((d, i) => (
                <motion.button
                  key={d.name}
                  className={`absolute flex flex-col items-center group`}
                  style={{ left: `${d.x}%`, top: `${d.y}%`, transform: "translate(-50%, -100%)" }}
                  onClick={() => setSelected(i)}
                  whileHover={{ scale: 1.1 }}
                >
                  <div
                    className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                      selected === i
                        ? "bg-[#4a9eff] shadow-lg shadow-[#4a9eff]/40"
                        : "bg-[#1c6ed4]/60 hover:bg-[#4a9eff]/80"
                    }`}
                  >
                    {selected === i && (
                      <div className="absolute inset-0 rounded-full bg-[#4a9eff]/30 pulse-ring" />
                    )}
                    <MapPin size={14} className="text-white" />
                  </div>
                  {/* Tooltip */}
                  <div className={`absolute bottom-full mb-1 whitespace-nowrap glass rounded-lg px-2.5 py-1.5 transition-all duration-200 pointer-events-none ${
                    selected === i ? "opacity-100 scale-100" : "opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100"
                  }`}>
                    <p className="text-white text-[10px] font-medium">{d.name}</p>
                    <p className="text-[#4a9eff] text-[9px]">{d.distance} away</p>
                  </div>
                </motion.button>
              ))}

              {/* Selected dealer detail */}
              <motion.div
                className="absolute bottom-4 left-4 right-4 glass rounded-xl p-4"
                key={selected}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="text-white font-semibold text-sm mb-1">{dealers[selected].name}</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex items-start gap-1.5">
                    <MapPin size={11} className="text-[#4a9eff] mt-0.5 flex-shrink-0" />
                    <p className="text-white/40 text-[10px] leading-relaxed">{dealers[selected].address}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone size={11} className="text-[#4a9eff] flex-shrink-0" />
                    <p className="text-white/40 text-[10px]">{dealers[selected].phone}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={11} className="text-[#4a9eff] flex-shrink-0" />
                    <p className="text-white/40 text-[10px]">{dealers[selected].hours}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <motion.button
                    className="flex-1 py-2 bg-gradient-to-r from-[#1c6ed4] to-[#4a9eff] rounded-lg text-white text-xs font-semibold"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Book Test Drive
                  </motion.button>
                  <motion.button
                    className="flex items-center gap-1.5 px-4 py-2 border border-white/10 rounded-lg text-white/60 text-xs hover:border-white/25 hover:text-white transition-all"
                    whileTap={{ scale: 0.97 }}
                  >
                    Directions <ChevronRight size={10} />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
