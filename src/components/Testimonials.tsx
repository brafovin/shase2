"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Trophy, Award, Users } from "lucide-react";

const testimonials = [
  {
    quote: "The M5 Competition transforms every journey into an event. Nothing else comes close to this level of driver engagement.",
    author: "James Whitmore",
    model: "BMW M5 Competition",
    avatar: "JW",
    rating: 5,
  },
  {
    quote: "The iX whispers at 130 mph and handles like a sports car. BMW has completely reinvented what an electric vehicle can be.",
    author: "Sarah Chen",
    model: "BMW iX xDrive50",
    avatar: "SC",
    rating: 5,
  },
  {
    quote: "As a racing driver, the M4 Competition is the finest road car BMW has ever made. Track-ready from the factory, liveable every day.",
    author: "Élise Fontaine",
    model: "BMW M4 Competition",
    avatar: "EF",
    rating: 5,
  },
];

const awards = [
  { icon: <Trophy size={18} />, title: "Car of the Year", org: "Motor Trend 2024" },
  { icon: <Award size={18} />,  title: "World Luxury Car", org: "World Car Awards" },
  { icon: <Users size={18} />,  title: "#1 Satisfaction", org: "J.D. Power 2024" },
  { icon: <Trophy size={18} />, title: "Best EV", org: "EV Awards 2024" },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [cur, setCur] = useState(0);

  return (
    <section ref={ref} className="relative py-28 lg:py-36 bg-[#060810] overflow-hidden" id="experience">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute inset-0 dot-pattern opacity-15" />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-16">

        {/* Header */}
        <div className="mb-14">
          <motion.p className="text-[#4a9eff] text-xs tracking-[0.5em] uppercase font-medium mb-3"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
            — Owner Stories
          </motion.p>
          <motion.h2 className="text-5xl lg:text-7xl font-black tracking-tight"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <span className="text-white">Driven by </span>
            <span className="gradient-text">Passion</span>
          </motion.h2>
        </div>

        {/* Carousel */}
        <motion.div className="max-w-3xl mb-14"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.7 }}>

          <div className="relative p-8 lg:p-10 rounded-2xl border border-white/5 overflow-hidden"
            style={{ background: "rgba(255,255,255,0.02)" }}>
            <div className="absolute top-8 right-10 text-[100px] font-black text-[#1c6ed4]/6 leading-none pointer-events-none select-none">"</div>

            <AnimatePresence mode="wait">
              <motion.div key={cur}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>

                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: testimonials[cur].rating }).map((_, i) => (
                    <Star key={i} size={13} className="text-[#4a9eff] fill-[#4a9eff]" />
                  ))}
                </div>

                <blockquote className="text-white/75 text-lg lg:text-xl font-light leading-relaxed mb-7">
                  &ldquo;{testimonials[cur].quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1c6ed4] to-[#4a9eff] flex items-center justify-center font-bold text-xs text-white flex-shrink-0">
                    {testimonials[cur].avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{testimonials[cur].author}</p>
                    <p className="text-[#4a9eff]/60 text-xs">{testimonials[cur].model}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-5">
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button key={i}
                  className={`rounded-full transition-all duration-300 ${i === cur ? "w-7 h-2 bg-[#4a9eff]" : "w-2 h-2 bg-white/15 hover:bg-white/30"}`}
                  onClick={() => setCur(i)} />
              ))}
            </div>
            <div className="flex gap-2">
              {[
                { fn: () => setCur((c) => (c - 1 + testimonials.length) % testimonials.length), icon: <ChevronLeft size={15} /> },
                { fn: () => setCur((c) => (c + 1) % testimonials.length), icon: <ChevronRight size={15} /> },
              ].map((btn, i) => (
                <motion.button key={i} onClick={btn.fn}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-white/30 hover:text-white transition-all"
                  whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.9 }}>
                  {btn.icon}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Awards */}
        <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.65 }}>
          {awards.map((a, i) => (
            <motion.div key={a.title}
              className="p-5 rounded-2xl border border-white/5 hover:border-[#4a9eff]/20 glass text-center transition-all duration-300"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.55 + i * 0.07 }}
              whileHover={{ y: -3 }}>
              <div className="w-9 h-9 rounded-xl bg-[#4a9eff]/10 border border-[#4a9eff]/20 flex items-center justify-center mx-auto mb-3 text-[#4a9eff]">
                {a.icon}
              </div>
              <p className="text-white font-semibold text-sm">{a.title}</p>
              <p className="text-white/25 text-[10px] mt-1">{a.org}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
