import React, { useState } from "react";
import { motion } from "motion/react";
import { Scale, Award, ShieldCheck, Mail, Phone, Clock, Bookmark, ChevronUp, MessageSquare, ExternalLink, Moon } from "lucide-react";

import Hero from "./components/Hero";
import PracticeAreas from "./components/PracticeAreas";
import FounderSpotlight from "./components/FounderSpotlight";
import NationalPresence from "./components/NationalPresence";
import Testimonials from "./components/Testimonials";
import LegalInsights from "./components/LegalInsights";
import BookingSection from "./components/BookingSection";
import ContactSection from "./components/ContactSection";
import LegalAssistant from "./components/LegalAssistant";

export default function App() {
  const [assistantOpen, setAssistantOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div id="pla-master-root" className="min-h-screen bg-onyx-950 font-sans text-gray-200 selection:bg-gold-400 selection:text-onyx-950">
      
      {/* Editorial Corporate Header Navigation */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-navy-950/85 backdrop-blur-md border-b border-gold-400/10 z-30 px-6">
        <div className="max-w-6xl mx-auto h-full flex items-center justify-between">
          
          {/* Logo / Crest */}
          <div
            onClick={scrollToTop}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-9 h-9 rounded bg-gold-400/10 border border-gold-400/30 flex items-center justify-center text-gold-400 group-hover:border-gold-400 transition-colors">
              <Scale className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold tracking-widest text-white leading-none">
                PATNE LAW
              </span>
              <span className="text-[9px] uppercase font-sans tracking-[0.25em] text-gold-400 font-semibold mt-0.5">
                ASSOCIATES
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-widest font-semibold text-gray-300">
            <button
              onClick={() => scrollToSection("leadership")}
              className="hover:text-gold-400 transition-colors cursor-pointer"
            >
              Leadership
            </button>
            <button
              onClick={() => scrollToSection("practice-areas")}
              className="hover:text-gold-400 transition-colors cursor-pointer"
            >
              Practice
            </button>
            <button
              onClick={() => scrollToSection("national-presence")}
              className="hover:text-gold-400 transition-colors cursor-pointer"
            >
              Venues
            </button>
            <button
              onClick={() => scrollToSection("insights")}
              className="hover:text-gold-400 transition-colors cursor-pointer"
            >
              Insights
            </button>
            <button
              onClick={() => scrollToSection("booking")}
              className="hover:text-gold-400 transition-colors cursor-pointer"
            >
              Scheduler
            </button>
          </nav>

          {/* Assistant Action Trigger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setAssistantOpen(true)}
              id="header-chat-trigger"
              className="relative inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded bg-amber-500/10 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 hover:text-white font-sans text-xs tracking-wider uppercase font-bold cursor-pointer transition-all duration-300 select-none shadow-[0_0_10px_rgba(245,158,11,0.1)] active:scale-95"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
              Chat Assistant
            </button>

            <button
              onClick={() => scrollToSection("booking")}
              id="header-book-trigger"
              className="hidden lg:inline-flex items-center gap-1.5 px-5 py-2.5 rounded bg-gradient-to-r from-gold-500 to-gold-400 text-onyx-950 hover:from-gold-400 hover:to-gold-500 font-sans text-[11px] tracking-widest uppercase font-bold cursor-pointer transition-all duration-300 select-none"
            >
              Book Consultation
            </button>
          </div>
        </div>
      </header>

      {/* Main Sections flow */}
      <main className="relative pt-20">
        
        {/* Cinematic Hero */}
        <Hero
          onOpenAssistant={() => setAssistantOpen(true)}
          onScrollToBooking={() => scrollToSection("booking")}
          onScrollToContact={() => scrollToSection("contact")}
        />

        {/* Global Firm Credibility Metrics Block */}
        <section className="bg-navy-950 border-y border-gold-400/10 py-12 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-serif text-gold-400 font-bold tracking-tight">30+</span>
              <span className="text-[10px] uppercase tracking-widest text-gray-450 font-sans font-bold mt-2">
                Years of Excellence
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-serif text-gold-400 font-bold tracking-tight">Supreme</span>
              <span className="text-[10px] uppercase tracking-widest text-gray-450 font-sans font-bold mt-2">
                Court & Tribunal representation
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-serif text-gold-400 font-bold tracking-tight">5+</span>
              <span className="text-[10px] uppercase tracking-widest text-gray-450 font-sans font-bold mt-2">
                National court venues
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-serif text-gold-400 font-bold tracking-tight">100%</span>
              <span className="text-[10px] uppercase tracking-widest text-gray-450 font-sans font-bold mt-2">
                Advocacy Integrity
              </span>
            </div>
          </div>
        </section>

        {/* Founders Spotlight Block */}
        <FounderSpotlight />

        {/* Practice Areas filtering section */}
        <PracticeAreas />

        {/* National Presence Interactive Nodes Map */}
        <NationalPresence />

        {/* Litigations Case Testimonials */}
        <Testimonials />

        {/* Educational Legal Insights Articles */}
        <LegalInsights />

        {/* Dynamic Appointment schedulers and Printable Receipt cards */}
        <BookingSection />

        {/* Chamber coordinates and enquiry desk */}
        <ContactSection />

      </main>

      {/* Corporate Editorial footer */}
      <footer className="bg-navy-950 border-t border-gold-400/10 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 pb-12 border-b border-gold-400/10">
            
            {/* Column 1: Trademark */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded bg-gold-400/15 flex items-center justify-center text-gold-400">
                  <Scale className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-base font-bold tracking-widest text-white leading-none">
                    PATNE LAW
                  </span>
                  <span className="text-[9px] uppercase font-sans tracking-[0.25em] text-gold-400 font-semibold mt-0.5">
                    ASSOCIATES
                  </span>
                </div>
              </div>
              <p className="text-gray-400 text-xs italic font-display leading-relaxed max-w-sm mb-4">
                "Where Law Meets Trust" — Providing senior litigation briefing, procedural reviews, and supreme appellate protection with three decades of trial court pedigree.
              </p>
              <span className="text-[10px] font-mono text-gray-500">
                Est. 1993 • Indore, MP
              </span>
            </div>

            {/* Column 2: Navigation map directory */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-sans tracking-widest text-gold-400 font-bold">
                Appellate Practice Map
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-350">
                <button onClick={() => scrollToSection("leadership")} className="hover:text-gold-400 text-left cursor-pointer font-sans">
                  Partners Spotlight
                </button>
                <button onClick={() => scrollToSection("practice-areas")} className="hover:text-gold-400 text-left cursor-pointer font-sans">
                  Practice Realms
                </button>
                <button onClick={() => scrollToSection("national-presence")} className="hover:text-gold-400 text-left cursor-pointer font-sans">
                  Court Benches
                </button>
                <button onClick={() => scrollToSection("insights")} className="hover:text-gold-400 text-left cursor-pointer font-sans">
                  Legal insights
                </button>
                <button onClick={() => scrollToSection("booking")} className="hover:text-gold-400 text-left cursor-pointer font-sans text-gold-300">
                  Secure Slot
                </button>
                <button onClick={() => setAssistantOpen(true)} className="hover:text-gold-400 text-left cursor-pointer text-teal-350 font-sans">
                  AI Legal Assistant
                </button>
              </div>
            </div>

            {/* Column 3: Court compliance footnotes */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-sans tracking-widest text-gold-400 font-bold">
                Affiliation Jurisdictions
              </h4>
              <div className="text-[11px] text-gray-400 leading-relaxed space-y-2">
                <p>
                  Supreme Court of India • High Court of Madhya Pradesh (Indore, Jabalpur, Gwalior) • Central Administrative Tribunal (CAT) • Chhattisgarh High Court (Bilaspur) • Bombay High Court (Aurangabad Bench).
                </p>
                <p className="text-gray-500 italic">
                  Adhering strictly to standard Bar Council of India professional directive guidelines.
                </p>
              </div>
            </div>

          </div>

          {/* Regulatory bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] text-gray-500">
            <p>
              © {new Date().getFullYear()} Patne Law Associates. All Rights Reserved. General information only.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-gold-400">Terms of retainer</a>
              <span className="opacity-30">•</span>
              <a href="#" className="hover:text-gold-400">BCI compliance statements</a>
              <span className="opacity-30">•</span>
              <button onClick={scrollToTop} className="hover:text-gold-400 inline-flex items-center gap-1">
                Back to Apex <ChevronUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating AI launcher pill (sticky) */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring" }}
        className="fixed bottom-6 right-6 z-30"
      >
        <button
          onClick={() => setAssistantOpen(true)}
          className="w-14 h-14 rounded-full bg-teal-400 text-onyx-950 flex items-center justify-center shadow-[0_4px_25px_rgba(20,184,166,0.3)] hover:scale-115 active:scale-90 transition-all duration-300 cursor-pointer group"
          title="Open Patne Legal Assistant"
        >
          <MessageSquare className="w-6 h-6 group-hover:rotate-6 transition-transform" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-onyx-950" />
        </button>
      </motion.div>

      {/* Floating AI Panel Draw */}
      <LegalAssistant
        isOpen={assistantOpen}
        onClose={() => setAssistantOpen(false)}
      />

    </div>
  );
}
