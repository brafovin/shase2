"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, ArrowRight, Tag } from "lucide-react";

const articles = [
  {
    category: "LAUNCH",
    tag: "New Model",
    title: "BMW Neue Klasse: The Electric Revolution Begins in 2025",
    excerpt:
      "BMW&apos;s groundbreaking next-generation electric architecture promises 30% greater range, 40% faster charging, and a completely reimagined digital experience.",
    date: "Nov 28, 2025",
    readTime: "4 min read",
    color: "#4a9eff",
    gradient: "from-[#0a1a3a] to-[#080810]",
  },
  {
    category: "MOTORSPORT",
    tag: "Racing",
    title: "BMW M Hybrid V8 Claims Victory at 24 Hours of Le Mans",
    excerpt:
      "The BMW M Team clinched a historic win at Le Mans with their V8-powered hybrid prototype, demonstrating the performance potential of BMW M hybrid technology.",
    date: "Nov 14, 2025",
    readTime: "3 min read",
    color: "#ff6b35",
    gradient: "from-[#2a0a00] to-[#080810]",
  },
  {
    category: "TECHNOLOGY",
    tag: "Innovation",
    title: "BMW Personal Copilot: AI-Powered Autonomous Driving Preview",
    excerpt:
      "BMW unveils its most advanced Level 3 autonomy system yet, featuring AI that learns driver preferences and adapts to individual driving styles over time.",
    date: "Oct 30, 2025",
    readTime: "5 min read",
    color: "#00d4ff",
    gradient: "from-[#001a2a] to-[#080810]",
  },
];

const events = [
  { date: "DEC 12", title: "BMW Art Car Exhibition", location: "New York, USA", type: "Exhibition" },
  { date: "JAN 7", title: "CES 2026 — BMW Keynote", location: "Las Vegas, USA", type: "Technology" },
  { date: "MAR 4", title: "Geneva Motor Show Debut", location: "Geneva, Switzerland", type: "Launch" },
  { date: "MAY 15", title: "BMW M Festival 2026", location: "Nürburgring, Germany", type: "Event" },
];

export default function NewsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 lg:py-32 bg-[#080810] overflow-hidden" id="news">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1c6ed4]/20 to-transparent" />
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <motion.div
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
            >
              <div className="w-8 h-[1px] bg-[#4a9eff]/50" />
              <span className="text-[#4a9eff] text-xs font-medium tracking-[0.4em] uppercase">
                News & Events
              </span>
            </motion.div>
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 }}
            >
              <span className="text-white">Latest </span>
              <span className="gradient-text">Updates</span>
            </motion.h2>
          </div>
          <motion.button
            className="flex-shrink-0 flex items-center gap-2 text-white/50 text-sm hover:text-white transition-colors"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            whileHover={{ x: 3 }}
          >
            View All News <ArrowRight size={14} />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-12">
          {articles.map((article, i) => (
            <motion.article
              key={article.title}
              className={`group relative rounded-2xl border border-white/5 hover:border-white/10 overflow-hidden cursor-pointer transition-all duration-500 bg-gradient-to-br ${article.gradient}`}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 * i + 0.3, duration: 0.7 }}
              whileHover={{ y: -4, boxShadow: `0 20px 60px ${article.color}10` }}
            >
              {/* Color accent top bar */}
              <div
                className="h-[2px] w-0 group-hover:w-full transition-all duration-500"
                style={{ background: `linear-gradient(90deg, ${article.color}, transparent)` }}
              />

              <div className="p-6">
                {/* Category + tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Tag size={11} style={{ color: article.color }} />
                    <span
                      className="text-[10px] font-semibold tracking-[0.25em] uppercase"
                      style={{ color: article.color }}
                    >
                      {article.category}
                    </span>
                  </div>
                  <span
                    className="text-[9px] px-2 py-1 rounded-full"
                    style={{
                      background: `${article.color}10`,
                      color: article.color,
                      border: `1px solid ${article.color}20`,
                    }}
                  >
                    {article.tag}
                  </span>
                </div>

                <h3 className="text-white font-bold text-base leading-snug mb-3 line-clamp-2 group-hover:text-white/90 transition-colors">
                  {article.title}
                </h3>

                <p className="text-white/35 text-xs leading-relaxed line-clamp-3 mb-5"
                  dangerouslySetInnerHTML={{ __html: article.excerpt }}
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-white/25 text-[10px]">
                    <div className="flex items-center gap-1">
                      <Calendar size={10} />
                      {article.date}
                    </div>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>
                  <motion.div
                    className="flex items-center gap-1 text-xs font-medium"
                    style={{ color: article.color }}
                    whileHover={{ x: 3 }}
                  >
                    Read <ArrowRight size={11} />
                  </motion.div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Events calendar */}
        <motion.div
          className="p-6 lg:p-8 rounded-2xl border border-white/5 glass"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h3 className="text-white font-bold text-lg mb-6">Upcoming Events</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {events.map((event, i) => (
              <motion.div
                key={event.title}
                className="group flex gap-4 p-4 rounded-xl border border-white/5 hover:border-[#4a9eff]/20 transition-all duration-200 cursor-pointer hover:bg-[#4a9eff]/3"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.7 + i * 0.08 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#1c6ed4]/10 border border-[#1c6ed4]/20 flex flex-col items-center justify-center">
                  <span className="text-[#4a9eff] font-black text-sm leading-none">
                    {event.date.split(" ")[0]}
                  </span>
                  <span className="text-[#4a9eff]/60 text-[9px] leading-none mt-0.5">
                    {event.date.split(" ")[1]}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-white text-sm font-medium leading-tight truncate mb-1">
                    {event.title}
                  </p>
                  <p className="text-white/30 text-[10px] truncate">{event.location}</p>
                  <span className="inline-block mt-1.5 text-[9px] px-2 py-0.5 rounded-full bg-[#4a9eff]/8 text-[#4a9eff]/60 border border-[#4a9eff]/12">
                    {event.type}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
