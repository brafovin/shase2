"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Share2, AtSign, Play, Users2, Briefcase } from "lucide-react";

const footerLinks = {
  Models: ["BMW 1 Series", "BMW 3 Series", "BMW 5 Series", "BMW 7 Series", "BMW X5", "BMW iX", "BMW i7", "BMW M8"],
  Electric: ["BMW iX", "BMW i7", "BMW i5", "BMW i4", "BMW i3", "Charging Solutions", "BMW Wallbox", "Public Charging"],
  Company: ["About BMW Group", "History & Heritage", "Innovation Lab", "Sustainability", "Press Room", "Investor Relations", "Careers", "Contact"],
  Services: ["BMW Financial Services", "BMW ConnectedDrive", "BMW Assist", "Test Drive", "Configurator", "Value My Car", "Aftersales", "BMW App"],
};

const socialLinks = [
  { icon: <AtSign size={16} />, href: "#", label: "Twitter" },
  { icon: <Share2 size={16} />, href: "#", label: "Instagram" },
  { icon: <Play size={16} />, href: "#", label: "YouTube" },
  { icon: <Users2 size={16} />, href: "#", label: "Facebook" },
  { icon: <Briefcase size={16} />, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#060608] border-t border-white/5 overflow-hidden">
      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1c6ed4]/30 to-transparent" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Newsletter section */}
        <div className="py-14 border-b border-white/5">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-md">
              <h3 className="text-white font-black text-2xl mb-2">
                Stay in the <span className="gradient-text">Fast Lane</span>
              </h3>
              <p className="text-white/40 text-sm">
                Be the first to hear about new models, exclusive events, and BMW innovations.
              </p>
            </div>
            <div className="flex gap-2 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-72">
                <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full pl-10 pr-4 py-3 bg-white/4 border border-white/8 rounded-xl text-white text-sm placeholder-white/25 outline-none focus:border-[#4a9eff]/40 transition-colors"
                />
              </div>
              <motion.button
                className="flex-shrink-0 flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#1c6ed4] to-[#4a9eff] text-white text-sm font-semibold rounded-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                Subscribe <ArrowRight size={13} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Main footer links */}
        <div className="py-14 border-b border-white/5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand column */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1c6ed4] to-[#4a9eff]" />
                  <div className="absolute inset-[2px] rounded-full bg-[#060608] flex items-center justify-center">
                    <span className="text-white font-black text-[10px] tracking-wider">BMW</span>
                  </div>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm tracking-widest">BMW</p>
                  <p className="text-white/25 text-[9px] tracking-[0.3em] uppercase">Group</p>
                </div>
              </div>
              <p className="text-white/30 text-xs leading-relaxed mb-6">
                The BMW Group is the world&apos;s leading manufacturer of premium automobiles
                and motorcycles, and a provider of premium financial and mobility services.
              </p>
              {/* Social links */}
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#4a9eff]/15 border border-white/5 hover:border-[#4a9eff]/25 flex items-center justify-center text-white/40 hover:text-[#4a9eff] transition-all duration-200"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Links columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-white/60 text-[10px] font-semibold tracking-[0.3em] uppercase mb-5">
                  {category}
                </h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-white/35 hover:text-white text-xs transition-colors duration-150"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            © 2025 BMW Group. All Rights Reserved. Bayerische Motoren Werke AG.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["Legal Notice", "Privacy Policy", "Cookie Settings", "Accessibility", "Sitemap"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-white/20 hover:text-white/50 text-xs transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
