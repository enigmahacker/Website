import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Globe, CheckCircle2, Navigation, Landmark, Info } from "lucide-react";

interface VenueDetails {
  id: string;
  name: string;
  locationName: string;
  courts: string[];
  casesHandled: string;
  presenceType: "Headquarters" | "Affiliate Chamber" | "Senior appellate desk" | "Tribunal division";
  highlight: string;
}

const nationalPresenceData: VenueDetails[] = [
  {
    id: "mp-indore",
    name: "Madhya Pradesh Division (Indore)",
    locationName: "Indore (Headquarters) & Jabalpur / Gwalior Benches",
    courts: ["High Court of Madhya Pradesh", "District Courts of MP", "State Consumer Commission", "Board of Revenue", "GST Tribunals"],
    casesHandled: "High-volume Constitutional writ actions, service law promotions/suspensions petitions, property titles, local tax assessments, and first appeals.",
    presenceType: "Headquarters",
    highlight: "Home of our complete administrative archives and managing partners' main consult offices."
  },
  {
    id: "supreme-court",
    name: "Supreme Court of India (Delhi Office)",
    locationName: "New Delhi",
    courts: ["Supreme Court of India", "Central Administrative Tribunal (CAT)", "National Disputes Commission"],
    casesHandled: "Special Leave Petitions (SLPs), transfer claims, national constitutional reviews, and landmark appellate briefs.",
    presenceType: "Senior appellate desk",
    highlight: "Senior advocates collaborate with seasoned Delhi Advocates-on-Record to deliver strategic supreme appeals."
  },
  {
    id: "chhattisgarh",
    name: "Chhattisgarh Practice Desk",
    locationName: "Bilaspur & Raipur",
    courts: ["High Court of Chhattisgarh (Bilaspur)", "State Tribunals"],
    casesHandled: "Service disputes representation, civil litigation, contracts, and municipal appeals.",
    presenceType: "Affiliate Chamber",
    highlight: "Bespoke trial briefs defense and service writtings for central and state corporation employees."
  },
  {
    id: "aurangabad",
    name: "Bombay High Court Practice",
    locationName: "Aurangabad Bench",
    courts: ["High Court of Judicature at Bombay (Aurangabad Bench)", "Maharashtra Revenue Tribunals"],
    casesHandled: "Appellate cases, civil title claims, family partitions, and contract disputes.",
    presenceType: "Affiliate Chamber",
    highlight: "Co-counsel networks delivering streamlined litigation mapping under unified standard directives."
  }
];

export default function NationalPresence() {
  const [selectedVenue, setSelectedVenue] = useState<VenueDetails>(nationalPresenceData[0]);

  return (
    <section id="national-presence" className="py-24 px-4 bg-navy-950 relative overflow-hidden">
      {/* Editorial background grid highlights */}
      <div className="absolute inset-0 bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.02]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="font-serif italic text-gold-400 text-lg tracking-wide">Territorial Scope</span>
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight mt-2">
            National Presence
          </h2>
          <div className="w-16 h-[2px] bg-gold-400 mx-auto mt-4" />
          <p className="text-gray-400 font-display italic mt-4 max-w-2xl mx-auto text-base">
            Representing clients across supreme jurisdictions and elite tax/service tribunals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Interactive Topological SVG Representation of Central-North India */}
          <div className="col-span-1 lg:col-span-7 flex flex-col items-center justify-center bg-navy-900/30 border border-gold-400/10 rounded-lg p-6 relative backdrop-blur-sm min-h-[400px]">
            <div className="absolute top-4 left-4 flex items-center gap-2 text-xs text-gold-400/80 uppercase font-sans tracking-widest">
              <Landmark className="w-4 h-4" />
              Dynamic Territorial Visualizer
            </div>

            {/* Custom high-end interactive topological vector map */}
            <svg viewBox="0 0 500 450" className="w-full max-w-[440px] h-auto text-gold-400 drop-shadow-lg">
              {/* Abstract decorative connection networks (Trust Lines) */}
              <motion.path
                d="M 250 80 L 250 250 L 320 280 L 250 250 L 150 320"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                className="opacity-40"
                animate={{ strokeDashoffset: [0, -20] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />

              {/* Node: Delhi (Supreme Court at top coord) */}
              <g
                className="cursor-pointer group"
                onClick={() => setSelectedVenue(nationalPresenceData[1])}
                id="node-delhi"
              >
                <circle
                  cx="250"
                  cy="80"
                  r={selectedVenue.id === "supreme-court" ? "12" : "8"}
                  className={`fill-navy-950 stroke-gold-400 stroke-2 transition-all group-hover:fill-gold-400/20`}
                />
                <circle cx="250" cy="80" r="18" className={`fill-none stroke-gold-400/30 stroke-[0.5] ${selectedVenue.id === "supreme-court" ? "animate-ping" : "opacity-0 group-hover:opacity-100"}`} />
                <text x="250" y="55" textAnchor="middle" className="fill-white font-serif text-[10px] tracking-wider font-semibold">
                  New Delhi (Supreme Court)
                </text>
              </g>

              {/* Node: Madhya Pradesh (Indore Headquarters central-left coord) */}
              <g
                className="cursor-pointer group"
                onClick={() => setSelectedVenue(nationalPresenceData[0])}
                id="node-indore"
              >
                <circle
                  cx="250"
                  cy="230"
                  r={selectedVenue.id === "mp-indore" ? "14" : "9"}
                  className="fill-navy-950 stroke-gold-400 stroke-2 transition-all group-hover:fill-gold-400/20"
                />
                <circle cx="250" cy="230" r="22" className={`fill-none stroke-gold-400/30 stroke-[0.5] ${selectedVenue.id === "mp-indore" ? "animate-ping" : "opacity-0 group-hover:opacity-100"}`} />
                <text x="250" y="205" textAnchor="middle" className="fill-gold-400 font-serif text-[11px] tracking-widest font-bold">
                  Indore (HQ) & MP High Court
                </text>
              </g>

              {/* Node: Bilaspur (Chhattisgarh at central-right coord) */}
              <g
                className="cursor-pointer group"
                onClick={() => setSelectedVenue(nationalPresenceData[2])}
                id="node-bilaspur"
              >
                <circle
                  cx="370"
                  cy="270"
                  r={selectedVenue.id === "chhattisgarh" ? "12" : "8"}
                  className="fill-navy-950 stroke-gold-400 stroke-2 transition-all group-hover:fill-gold-400/20"
                />
                <circle cx="370" cy="270" r="18" className={`fill-none stroke-gold-400/30 stroke-[0.5] ${selectedVenue.id === "chhattisgarh" ? "animate-ping" : "opacity-0 group-hover:opacity-100"}`} />
                <text x="370" y="295" textAnchor="middle" className="fill-white font-serif text-[10px] tracking-wider">
                  Bilaspur HC (CG)
                </text>
              </g>

              {/* Node: Aurangabad (Maharashtra at bottom-left coord) */}
              <g
                className="cursor-pointer group"
                onClick={() => setSelectedVenue(nationalPresenceData[3])}
                id="node-aurangabad"
              >
                <circle
                  cx="150"
                  cy="330"
                  r={selectedVenue.id === "aurangabad" ? "12" : "8"}
                  className="fill-navy-950 stroke-gold-400 stroke-2 transition-all group-hover:fill-gold-400/20"
                />
                <circle cx="150" cy="330" r="18" className={`fill-none stroke-gold-400/30 stroke-[0.5] ${selectedVenue.id === "aurangabad" ? "animate-ping" : "opacity-0 group-hover:opacity-100"}`} />
                <text x="150" y="355" textAnchor="middle" className="fill-white font-serif text-[10px] tracking-wider">
                  Aurangabad Bench (MH)
                </text>
              </g>
            </svg>

            <span className="text-gray-500 font-sans text-xs mt-4 flex items-center gap-1.5 italic">
              <Info className="w-3.5 h-3.5 text-gold-400/70" />
              Click on nodes to analyze active courtrooms, benches and represent boundaries.
            </span>
          </div>

          {/* Details Sidebar Deck */}
          <div className="col-span-1 lg:col-span-5 flex flex-col justify-center min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedVenue.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-navy-950/80 border border-gold-400/20 rounded-lg p-8 shadow-2xl relative"
              >
                <span className="inline-block text-[10px] uppercase font-sans font-bold text-gold-400 tracking-[0.2em] bg-gold-400/10 px-3 py-1 rounded mb-4">
                  {selectedVenue.presenceType}
                </span>

                <h3 className="text-xl md:text-2xl font-serif text-white tracking-tight mb-2">
                  {selectedVenue.name}
                </h3>
                
                <div className="flex items-center gap-2 text-xs text-gray-400 italic font-display mb-6">
                  <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                  {selectedVenue.locationName}
                </div>

                <div className="mb-6">
                  <h4 className="text-xs uppercase font-sans tracking-widest text-gold-200 font-bold mb-3">
                    Benches & Representation Venues:
                  </h4>
                  <ul className="space-y-2">
                    {selectedVenue.courts.map((court, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                        <span>{court}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-gold-400/10 pt-5 mt-5">
                  <h4 className="text-xs uppercase font-sans tracking-widest text-gold-200 font-bold mb-1.5">
                    Case Scope & Key Specialities:
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {selectedVenue.casesHandled}
                  </p>
                  
                  <div className="p-3 bg-gold-400/5 rounded border border-gold-400/10 text-xs italic text-gold-200 font-display">
                    {selectedVenue.highlight}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
