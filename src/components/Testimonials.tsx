"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const quotes = [
  {
    text: "The M5 Competition transforms every journey into an event. Nothing else comes close to this level of driver engagement.",
    name: "James Whitmore",
    model: "BMW M5 Competition",
    avatar: "JW",
  },
  {
    text: "The iX whispers at 130 mph and handles like a sports car. BMW has completely reinvented what electric means.",
    name: "Sarah Chen",
    model: "BMW iX xDrive50",
    avatar: "SC",
  },
  {
    text: "As a racing driver, the M4 is the finest road car BMW has ever made. Track-ready from the factory, liveable every day.",
    name: "Élise Fontaine",
    model: "BMW M4 Competition",
    avatar: "EF",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [cur, setCur] = useState(0);

  return (
    <section id="experience" className="bg-[#050505] pt-28 pb-32 lg:pt-36 lg:pb-44 overflow-hidden">
      <div ref={ref} className="max-w-[1440px] mx-auto px-8 sm:px-12 lg:px-20">

        <motion.p className="text-white/30 text-[11px] tracking-[0.55em] uppercase font-medium mb-16 lg:mb-20"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
          Owner Stories
        </motion.p>

        <motion.div className="max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>

          <AnimatePresence mode="wait">
            <motion.div key={cur}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>

              {/* Stars */}
              <div className="flex gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className="text-[#4a9eff] fill-[#4a9eff]" />
                ))}
              </div>

              <blockquote className="text-white/70 text-2xl lg:text-3xl xl:text-4xl font-light leading-[1.3] tracking-tight mb-10">
                &ldquo;{quotes[cur].text}&rdquo;
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#1c6ed4] to-[#4a9eff] flex items-center justify-center font-bold text-sm text-white flex-shrink-0">
                  {quotes[cur].avatar}
                </div>
                <div>
                  <p className="text-white font-semibold">{quotes[cur].name}</p>
                  <p className="text-white/30 text-sm">{quotes[cur].model}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center gap-4 mt-10">
            {[
              { fn: () => setCur((c) => (c - 1 + quotes.length) % quotes.length), icon: <ChevronLeft size={14} /> },
              { fn: () => setCur((c) => (c + 1) % quotes.length), icon: <ChevronRight size={14} /> },
            ].map((btn, i) => (
              <motion.button key={i} onClick={btn.fn}
                className="w-9 h-9 rounded-sm border border-white/10 flex items-center justify-center text-white/40 hover:border-white/30 hover:text-white transition-all"
                whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.9 }}>
                {btn.icon}
              </motion.button>
            ))}
            <div className="flex gap-1.5 ml-2">
              {quotes.map((_, i) => (
                <button key={i} onClick={() => setCur(i)}
                  className={`rounded-full transition-all duration-300 ${i === cur ? "w-6 h-1.5 bg-[#4a9eff]" : "w-1.5 h-1.5 bg-white/15 hover:bg-white/30"}`} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
