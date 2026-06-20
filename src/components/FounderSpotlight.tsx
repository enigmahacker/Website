import React from "react";
import { motion } from "motion/react";
import { BookOpen, GraduationCap, ShieldCheck, Mail, PhoneCall, Award, FileText } from "lucide-react";
import { Founder } from "../types";

const founders: Founder[] = [
  {
    name: "Adv. Laxmikant Patne",
    title: "Founder & Managing Partner",
    qualifications: ["B.A. LL.B. (Hons.)", "LL.M. (Master of Laws)"],
    bio: "Advocating with precision for more than 30 years. Renowned for strategic litigation briefs in Constitutional Writ actions, Appellate petitions, complex Service tribunals (CAT), and Administrative laws.",
    keySpecialties: ["Constitutional Writs", "Service Law & CAT Disputes", "Appellate Litigation", "Government Disputes"],
    imageUrl: "lp",
    letter: "For three decades, our mandate has been unwavering: to deliver unyielding protection of rights and meticulous strategic advisory. We stand by our clients with intellectual integrity and complete statutory mastery.",
  },
  {
    name: "Dr. Neerja Patne",
    title: "Senior Partner",
    qualifications: ["B.A. LL.B. (Hons.)", "LL.M. (Master of Laws)", "Ph.D. in Law (Doctorate)"],
    bio: "An authoritative scholar and litigation specialist. Dr. Patne combines academic jurisprudence with extensive trial and appellate experience, focusing on Real Estate codes, Land Revenue matters, and Tax boards.",
    keySpecialties: ["Real Estate (RERA)", "M.P. Land Revenue Matters", "GST Assessments & Appeals", "Commercial Disputes"],
    imageUrl: "np",
    letter: "Law is not merely a mechanism of compliance; indeed, it is a shield of trust. We merge academic depth with practical boardroom counsel to deliver excellent and transparent solutions.",
  },
];

export default function FounderSpotlight() {
  return (
    <section id="leadership" className="py-24 px-4 bg-onyx-950 relative overflow-hidden">
      {/* Decorative luxury abstract elements */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-gold-400/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-navy-800/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-serif italic text-gold-400 text-lg tracking-wide">Firm Leadership</span>
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight mt-2">
            The Managing Partners
          </h2>
          <div className="w-16 h-[2px] bg-gold-400 mx-auto mt-4" />
          <p className="text-gray-400 font-display italic mt-4 max-w-2xl mx-auto text-base">
            Distinguished legal minds combining three decades of heritage trial experience with authoritative academic research.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {founders.map((founder, i) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              key={founder.name}
              className="bg-navy-950/40 border border-gold-400/10 rounded-lg p-8 backdrop-blur-sm relative hover:border-gold-400/30 transition-all duration-300 group shadow-lg"
            >
              {/* Premium Background Crest Logo */}
              <div className="absolute top-6 right-8 opacity-[0.03] text-gold-400 pointer-events-none group-hover:opacity-[0.06] transition-opacity duration-500">
                <svg width="120" height="120" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50,10 L10,30 L10,60 C10,80 50,90 50,90 C50,90 90,80 90,60 L90,30 L50,10 Z M50,20 L80,35 L80,55 C80,72 50,82 50,82 C50,82 20,72 20,55 L20,35 L50,20 Z" />
                </svg>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-start md:items-center mb-8 border-b border-gold-400/10 pb-6">
                {/* Monogram crest avatar */}
                <div className="w-20 h-20 shrink-0 rounded-full border border-gold-400/30 bg-gradient-to-br from-navy-900 to-navy-950 flex flex-col justify-center items-center shadow-[0_4px_15px_rgba(212,175,55,0.15)] ring-4 ring-gold-400/5">
                  <span className="text-2xl font-serif text-gold-400 font-bold tracking-widest uppercase">
                    {founder.name.split(" ").pop()?.substring(0, 2)}
                  </span>
                  <span className="text-[9px] text-gray-400 tracking-[0.2em] font-sans font-medium uppercase mt-0.5">
                    {founder.name.includes("Laxmikant") ? "FOUNDER" : "PARTNER"}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-4 h-4 text-gold-400 shrink-0" />
                    <span className="text-xs uppercase font-sans tracking-widest text-gold-400 font-semibold">
                      {founder.title}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif text-white tracking-tight">
                    {founder.name}
                  </h3>
                  
                  {/* Academic Credentials */}
                  <div className="flex flex-wrap gap-2 mt-2.5">
                    {founder.qualifications.map((q) => (
                      <span
                        key={q}
                        className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-gold-400/10 border border-gold-400/15 text-gold-300 font-sans font-medium"
                      >
                        <GraduationCap className="w-3.5 h-3.5" />
                        {q}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Personal Letter/Quote Block */}
              <div className="mb-6 relative pl-6 border-l-2 border-gold-400/20 py-1">
                <p className="text-gray-300 italic font-display text-sm leading-relaxed">
                  "{founder.letter}"
                </p>
              </div>

              {/* Founder Bio */}
              <p className="text-gray-400 text-sm leading-relaxed mb-6 font-sans">
                {founder.bio}
              </p>

              {/* Key Domains in Badges */}
              <div>
                <h4 className="text-xs font-sans tracking-[0.2em] text-gold-200 uppercase font-bold mb-3 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                  Primary Representative Realms
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {founder.keySpecialties.map((spec) => (
                    <span
                      key={spec}
                      className="text-xs text-slate-300 font-sans border border-slate-800 hover:border-gold-400/20 bg-onyx-950/40 hover:bg-gold-400/5 px-3 py-1.5 rounded transition-all duration-300"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
