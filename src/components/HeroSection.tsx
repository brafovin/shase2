"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden bg-black">

      {/* BMW M4 photo */}
      <Image
        src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1920&q=85"
        alt="BMW M4 Competition"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Left-to-right dark fade so headline is legible */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      {/* Bottom fade — blends into next section */}
      <div className="absolute bottom-0 inset-x-0 h-56 bg-gradient-to-t from-[#050505] to-transparent" />

      {/* Content — anchored to bottom so it scrolls away cleanly */}
      <motion.div
        className="absolute inset-x-0 bottom-0 pb-24 lg:pb-32 px-8 sm:px-12 lg:px-20 max-w-[1440px] mx-auto"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-white/40 text-[11px] tracking-[0.55em] uppercase mb-5 font-medium">
          BMW M4 Competition · 2025
        </p>

        <h1 className="text-[15vw] sm:text-[11vw] lg:text-[90px] xl:text-[100px] font-black leading-[0.86] tracking-[-0.02em] mb-9">
          <span className="block text-white">The Ultimate</span>
          <span
            className="block"
            style={{
              background: "linear-gradient(100deg, #fff 0%, #b8d8ff 50%, #4a9eff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Driving Machine.
          </span>
        </h1>

        <div className="flex items-center gap-4">
          <motion.button
            className="px-9 py-3.5 bg-white text-black text-sm font-bold tracking-wide rounded-sm hover:bg-white/90 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Discover
          </motion.button>
          <motion.button
            className="px-9 py-3.5 border border-white/30 text-white text-sm font-medium tracking-wide rounded-sm hover:border-white/60 hover:bg-white/5 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Configure
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
