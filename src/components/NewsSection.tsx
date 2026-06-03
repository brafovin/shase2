"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const articles = [
  { cat: "Launch",     title: "BMW Neue Klasse Arrives in 2025",            date: "Nov 28", accent: "#4a9eff" },
  { cat: "Motorsport", title: "BMW M Wins 24 Hours of Le Mans",             date: "Nov 14", accent: "#ff9a6c" },
  { cat: "Technology", title: "BMW Personal Copilot — Level 3 Driving",     date: "Oct 30", accent: "#00d4ff" },
];

const events = [
  { date: "Dec 12", title: "BMW Art Car Exhibition",   loc: "New York" },
  { date: "Jan 7",  title: "CES 2026 BMW Keynote",     loc: "Las Vegas" },
  { date: "Mar 4",  title: "Geneva Motor Show",         loc: "Geneva" },
  { date: "May 15", title: "BMW M Festival 2026",       loc: "Nürburgring" },
];

export default function NewsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="news" className="bg-[#050505] pt-28 pb-32 lg:pt-36 lg:pb-44 overflow-hidden">
      <div ref={ref} className="max-w-[1440px] mx-auto px-8 sm:px-12 lg:px-20">

        {/* Header */}
        <div className="flex items-end justify-between mb-16 lg:mb-20">
          <div>
            <motion.p className="text-white/30 text-[11px] tracking-[0.55em] uppercase font-medium mb-4"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
              News
            </motion.p>
            <motion.h2 className="text-5xl lg:text-7xl xl:text-8xl font-black tracking-[-0.02em] leading-[0.9]"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              <span className="text-white">Latest </span>
              <span className="text-blue-gradient">Stories</span>
            </motion.h2>
          </div>
          <motion.button className="hidden sm:flex items-center gap-2 text-white/30 hover:text-white text-xs tracking-widest uppercase transition-colors mb-1"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.25 }}
            whileHover={{ x: 3 }}>
            All News <ArrowRight size={11} />
          </motion.button>
        </div>

        {/* Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          {articles.map((a, i) => (
            <motion.article
              key={a.title}
              className="group p-7 lg:p-8 rounded-lg border border-white/5 hover:border-white/10 cursor-pointer transition-all duration-300"
              style={{ background: "rgba(255,255,255,0.018)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3 }}
            >
              {/* Top accent line on hover */}
              <div className="h-[2px] w-0 group-hover:w-full transition-all duration-400 mb-6 rounded-full"
                style={{ background: a.accent }} />

              <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-4"
                style={{ color: a.accent }}>
                {a.cat}
              </p>
              <h3 className="text-white font-bold text-lg leading-snug clamp-2 mb-6">
                {a.title}
              </h3>
              <div className="flex items-center justify-between">
                <p className="text-white/25 text-xs">{a.date}</p>
                <motion.span className="flex items-center gap-1 text-xs font-medium"
                  style={{ color: a.accent }} whileHover={{ x: 4 }}>
                  Read <ArrowRight size={11} />
                </motion.span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Events — minimal list */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}>
          {events.map((e, i) => (
            <div key={e.title}
              className="p-5 rounded-lg border border-white/5 hover:border-white/10 cursor-pointer transition-all duration-200"
              style={{ background: "rgba(255,255,255,0.018)" }}>
              <p className="text-[#4a9eff] font-bold text-xs mb-3">{e.date}</p>
              <p className="text-white/70 text-sm font-medium leading-snug mb-1.5">{e.title}</p>
              <p className="text-white/25 text-xs">{e.loc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
