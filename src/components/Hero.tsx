import React from "react";
import { motion } from "motion/react";
import { Scale, ChevronRight, MessageSquare, Calendar, Phone } from "lucide-react";

interface HeroProps {
  onOpenAssistant: () => void;
  onScrollToBooking: () => void;
  onScrollToContact: () => void;
}

export default function Hero({ onOpenAssistant, onScrollToBooking, onScrollToContact }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-radial from-navy-900 via-onyx-950 to-onyx-950 pt-20 px-4">
      {/* Editorial Luxury Pattern background overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C5A059" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Radial soft golden glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-400/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto text-center relative z-10 py-12 md:py-20 flex flex-col items-center">
        {/* Elite Court Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-8 flex items-center gap-3 px-5 py-2.5 rounded-full border border-gold-400/20 bg-navy-950/80 backdrop-blur-sm shadow-xl"
        >
          <Scale className="w-5 h-5 text-gold-400 animate-pulse" />
          <span className="font-sans text-xs tracking-[0.25em] text-gold-200 uppercase font-semibold">
            MADHYA PRADESH & ALL INDIA REPRESENTATION
          </span>
        </motion.div>

        {/* Hero Title: Where Law Meets Trust */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-8xl font-serif text-white tracking-tight leading-[1.1] mb-6 select-none"
        >
          Where Law <br className="hidden md:block" />
          <span className="gold-metallic-text italic font-medium">Meets Trust</span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="max-w-3xl text-lg md:text-xl font-display text-gray-300 italic tracking-wide leading-relaxed mb-12 text-center"
        >
          Three decades of legal excellence, strategic advocacy, and trusted representation across India’s highest courts and tribunals. Headquartered in Indore.
        </motion.p>

        {/* Interactive Luxury Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full max-w-lg px-4"
        >
          <button
            onClick={onScrollToBooking}
            id="hero-book-btn"
            className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-500 text-onyx-950 font-semibold tracking-wide rounded-md cursor-pointer transition-all duration-300 transform hover:scale-[1.02] shadow-[0_4px_20px_rgba(212,175,55,0.25)] select-none"
          >
            <Calendar className="w-4 h-4 mr-1 text-onyx-950" />
            Book Consultation
          </button>
          
          <button
            onClick={onScrollToContact}
            id="hero-contact-btn"
            className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 border border-gold-400/30 hover:border-gold-400 hover:bg-gold-400/5 text-gold-200 hover:text-white font-medium tracking-wide rounded-md cursor-pointer transition-all duration-300 select-none"
          >
            <Phone className="w-4 h-4 mr-1" />
            Contact Us
          </button>
        </motion.div>

        {/* Floating AI Assistant Trigger */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-12"
        >
          <button
            onClick={onOpenAssistant}
            id="hero-ai-assistant-btn"
            className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full border border-teal-500/30 bg-teal-950/20 hover:bg-teal-950/40 text-teal-300 font-sans text-sm tracking-wide font-medium cursor-pointer transition-all duration-300 hover:border-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.1)] active:scale-95 group"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping" />
            <MessageSquare className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
            Talk to Patne Legal Assistant
            <ChevronRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Elegant visual floor */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-onyx-950 to-transparent pointer-events-none" />
    </section>
  );
}
