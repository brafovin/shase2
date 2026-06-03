"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";

const articles = [
  {
    category: "LAUNCH",
    title: "BMW Neue Klasse Arrives in 2025",
    date: "Nov 28, 2025",
    color: "#4a9eff",
    gradient: "from-[#0a1a3a]/60 to-transparent",
  },
  {
    category: "MOTORSPORT",
    title: "BMW M Wins 24 Hours of Le Mans",
    date: "Nov 14, 2025",
    color: "#ff9a6c",
    gradient: "from-[#2a0a00]/60 to-transparent",
  },
  {
    category: "TECHNOLOGY",
    title: "BMW Personal Copilot: Level 3 Preview",
    date: "Oct 30, 2025",
    color: "#00d4ff",
    gradient: "from-[#001a2a]/60 to-transparent",
  },
];

const events = [
  { date: "DEC\n12", title: "BMW Art Car Exhibition", location: "New York", type: "Exhibition" },
  { date: "JAN\n 7", title: "CES 2026 — BMW Keynote", location: "Las Vegas", type: "Tech" },
  { date: "MAR\n 4", title: "Geneva Motor Show Debut", location: "Geneva", type: "Launch" },
  { date: "MAY\n15", title: "BMW M Festival 2026", location: "Nürburgring", type: "Racing" },
];

export default function NewsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-28 lg:py-36 bg-[#0a0a0a] overflow-hidden" id="news">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute inset-0 dot-pattern opacity-15" />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-16">

        {/* Header */}
        <div className="flex items-end justify-between gap-6 mb-14">
          <div>
            <motion.p className="text-[#4a9eff] text-xs tracking-[0.5em] uppercase font-medium mb-3"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
              — News & Events
            </motion.p>
            <motion.h2 className="text-5xl lg:text-7xl font-black tracking-tight"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              <span className="text-white">Latest </span>
              <span className="gradient-text">Updates</span>
            </motion.h2>
          </div>
          <motion.button
            className="hidden sm:flex items-center gap-2 text-white/35 hover:text-white text-xs transition-colors mb-1"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            whileHover={{ x: 3 }}>
            All News <ArrowRight size={13} />
          </motion.button>
        </div>

        {/* Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {articles.map((a, i) => (
            <motion.article
              key={a.title}
              className={`group relative rounded-2xl border border-white/5 hover:border-white/10 overflow-hidden cursor-pointer bg-gradient-to-b ${a.gradient}`}
              style={{ background: "rgba(255,255,255,0.02)" }}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, boxShadow: `0 20px 50px ${a.color}10` }}
            >
              {/* Color bar on hover */}
              <div className="h-[2px] w-0 group-hover:w-full transition-all duration-500"
                style={{ background: `linear-gradient(90deg, ${a.color}, transparent)` }} />

              <div className="p-6">
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase mb-4 block"
                  style={{ color: a.color }}>
                  {a.category}
                </span>

                <h3 className="text-white font-bold text-base leading-snug mb-5 group-hover:text-white/90">
                  {a.title}
                </h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-white/25 text-[10px]">
                    <Calendar size={10} />
                    {a.date}
                  </div>
                  <motion.span className="flex items-center gap-1 text-xs font-medium"
                    style={{ color: a.color }} whileHover={{ x: 3 }}>
                    Read <ArrowRight size={11} />
                  </motion.span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Events */}
        <motion.div
          className="p-6 lg:p-8 rounded-2xl border border-white/5 glass"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.65 }}>
          <p className="text-white/40 text-xs tracking-[0.35em] uppercase font-medium mb-5">Upcoming Events</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {events.map((e, i) => (
              <motion.div
                key={e.title}
                className="flex gap-3 p-4 rounded-xl border border-white/5 hover:border-[#4a9eff]/20 hover:bg-[#4a9eff]/3 transition-all duration-200 cursor-pointer"
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.65 + i * 0.07 }}
                whileTap={{ scale: 0.98 }}>
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#1c6ed4]/10 border border-[#1c6ed4]/20 flex flex-col items-center justify-center">
                  {e.date.split("\n").map((line, j) => (
                    <span key={j} className={j === 0 ? "text-[#4a9eff] font-black text-xs leading-none" : "text-[#4a9eff]/60 text-[9px] leading-none"}>
                      {line.trim()}
                    </span>
                  ))}
                </div>
                <div className="min-w-0">
                  <p className="text-white/80 text-xs font-medium leading-tight truncate mb-1">{e.title}</p>
                  <p className="text-white/25 text-[10px] truncate">{e.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
