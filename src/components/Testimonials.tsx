"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Trophy, Users, Award } from "lucide-react";

const testimonials = [
  {
    quote:
      "The M5 Competition transforms every journey into an event. The precision of the chassis, the thunder of the engine — nothing else comes close to this level of driver engagement.",
    author: "James Whitmore",
    role: "BMW M Owner since 2019",
    model: "M5 Competition",
    rating: 5,
    avatar: "JW",
    location: "Los Angeles, CA",
  },
  {
    quote:
      "The iX completely changed my understanding of what an electric vehicle can be. It whispers at 130mph, it handles like a sports car, and the range is genuinely liberating. BMW has reinvented everything.",
    author: "Sarah Chen",
    role: "BMW iX Owner",
    model: "BMW iX xDrive50",
    rating: 5,
    avatar: "SC",
    location: "San Francisco, CA",
  },
  {
    quote:
      "Owning a BMW 7 Series is unlike any other luxury experience. The attention to detail is extraordinary — from the hand-stitched leather to the theatre screen that unfolds from the headrests.",
    author: "Michael Okonkwo",
    role: "BMW 7 Series Owner",
    model: "BMW 740d xDrive",
    rating: 5,
    avatar: "MO",
    location: "New York, NY",
  },
  {
    quote:
      "As a former racing driver, I can say with confidence that the M4 Competition is the finest road car BMW has ever made. Track-ready from the factory, yet genuinely liveable every day.",
    author: "Élise Fontaine",
    role: "Professional Driver & BMW Partner",
    model: "BMW M4 Competition",
    rating: 5,
    avatar: "EF",
    location: "Monaco",
  },
];

const awards = [
  { icon: <Trophy size={20} />, title: "Car of the Year", year: "2024", org: "Motor Trend" },
  { icon: <Award size={20} />, title: "World Luxury Car", year: "2024", org: "World Car Awards" },
  { icon: <Users size={20} />, title: "#1 Customer Satisfaction", year: "2024", org: "J.D. Power" },
  { icon: <Trophy size={20} />, title: "Best Electric Vehicle", year: "2024", org: "EV Awards" },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section ref={ref} className="relative py-24 lg:py-32 bg-[#080810] overflow-hidden" id="experience">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1c6ed4]/20 to-transparent" />
      <div className="absolute inset-0 dot-pattern opacity-20" />

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
              Owner Stories
            </span>
            <div className="w-8 h-[1px] bg-[#4a9eff]/50" />
          </motion.div>
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
          >
            <span className="text-white">Driven by </span>
            <span className="gradient-text">Passion</span>
          </motion.h2>
        </div>

        {/* Testimonial carousel */}
        <motion.div
          className="max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="relative p-8 lg:p-12 rounded-2xl border border-white/5 overflow-hidden"
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            {/* Background quote mark */}
            <div className="absolute top-6 right-8 text-[120px] font-black text-[#1c6ed4]/8 leading-none pointer-events-none">
              "
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-[#4a9eff] fill-[#4a9eff]" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-white/80 text-lg lg:text-xl font-light leading-relaxed mb-8 relative">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1c6ed4] to-[#4a9eff] flex items-center justify-center font-bold text-sm text-white flex-shrink-0">
                    {testimonials[current].avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{testimonials[current].author}</p>
                    <p className="text-white/40 text-xs">{testimonials[current].role} · {testimonials[current].location}</p>
                  </div>
                  <div className="ml-auto hidden sm:block">
                    <span className="text-[10px] tracking-[0.25em] text-[#4a9eff]/60 uppercase border border-[#4a9eff]/20 px-3 py-1.5 rounded-full">
                      {testimonials[current].model}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? "w-8 h-2 bg-[#4a9eff]" : "w-2 h-2 bg-white/20 hover:bg-white/40"
                  }`}
                  onClick={() => setCurrent(i)}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <motion.button
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:border-white/30 hover:text-white transition-all"
                onClick={prev}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={16} />
              </motion.button>
              <motion.button
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:border-white/30 hover:text-white transition-all"
                onClick={next}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={16} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Awards */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          {awards.map((award, i) => (
            <motion.div
              key={award.title}
              className="group p-5 rounded-2xl border border-white/5 hover:border-[#4a9eff]/20 transition-all duration-300 text-center glass"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.7 + i * 0.08 }}
              whileHover={{ y: -3 }}
            >
              <div className="w-10 h-10 rounded-xl bg-[#4a9eff]/10 border border-[#4a9eff]/20 flex items-center justify-center mx-auto mb-3 text-[#4a9eff] group-hover:bg-[#4a9eff]/20 transition-colors">
                {award.icon}
              </div>
              <p className="text-white font-semibold text-sm mb-0.5">{award.title}</p>
              <p className="text-white/30 text-[10px]">{award.org}</p>
              <p className="text-[#4a9eff] text-xs font-semibold mt-1">{award.year}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
