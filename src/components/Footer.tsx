"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, AtSign, Share2, Play, Users2, Briefcase } from "lucide-react";

const cols = {
  Models:   ["3 Series", "5 Series", "7 Series", "X5", "X7", "iX", "i7", "M4"],
  Electric: ["BMW iX", "BMW i7", "BMW i5", "BMW i4", "Charging", "BMW Wallbox"],
  Company:  ["About BMW", "Heritage", "Sustainability", "Press", "Careers", "Contact"],
  Services: ["Financial Services", "Test Drive", "Configurator", "ConnectedDrive"],
};

const socials = [
  { icon: <AtSign size={14} />,    label: "Twitter" },
  { icon: <Share2 size={14} />,    label: "Instagram" },
  { icon: <Play size={14} />,      label: "YouTube" },
  { icon: <Users2 size={14} />,    label: "Facebook" },
  { icon: <Briefcase size={14} />, label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="bg-[#030303] border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-8 sm:px-12 lg:px-20">

        {/* Newsletter */}
        <div className="py-14 border-b border-white/5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-7">
          <div>
            <p className="text-white font-bold text-xl mb-1">Stay Informed</p>
            <p className="text-white/30 text-sm">New models, events, and innovations — first to know.</p>
          </div>
          <div className="flex gap-2 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-64">
              <Mail size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20" />
              <input type="email" placeholder="Email address"
                className="w-full pl-9 pr-4 py-3 bg-white/3 border border-white/6 rounded-sm text-white/70 text-sm placeholder-white/20 outline-none focus:border-[#4a9eff]/35 transition-colors" />
            </div>
            <motion.button
              className="px-5 py-3 bg-[#1c6ed4] hover:bg-[#4a9eff] text-white text-sm font-semibold rounded-sm transition-colors flex items-center gap-2 flex-shrink-0"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              Subscribe <ArrowRight size={13} />
            </motion.button>
          </div>
        </div>

        {/* Links */}
        <div className="py-14 border-b border-white/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="relative w-9 h-9 flex-shrink-0">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1c6ed4] to-[#4a9eff]" />
                <div className="absolute inset-[2px] rounded-full bg-[#030303] flex items-center justify-center">
                  <span className="text-white font-black text-[9px] tracking-widest">BMW</span>
                </div>
              </div>
              <span className="text-white/60 text-xs tracking-[0.3em] uppercase font-medium">Group</span>
            </div>
            <p className="text-white/20 text-xs leading-relaxed mb-6">
              The world&apos;s leading premium automotive manufacturer.
            </p>
            <div className="flex gap-2">
              {socials.map((s) => (
                <motion.a key={s.label} href="#" aria-label={s.label}
                  className="w-8 h-8 rounded-sm bg-white/4 hover:bg-[#4a9eff]/15 border border-white/5 hover:border-[#4a9eff]/20 flex items-center justify-center text-white/30 hover:text-[#4a9eff] transition-all duration-200"
                  whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.9 }}>
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(cols).map(([title, links]) => (
            <div key={title}>
              <p className="text-white/30 text-[10px] tracking-[0.35em] uppercase font-medium mb-5">{title}</p>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-white/30 hover:text-white/70 text-xs transition-colors duration-150">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/15 text-xs">© 2025 BMW Group. Bayerische Motoren Werke AG.</p>
          <div className="flex gap-5">
            {["Legal", "Privacy", "Cookies", "Accessibility"].map((l) => (
              <a key={l} href="#" className="text-white/15 hover:text-white/40 text-xs transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
