import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, FolderOpen, ChevronDown, Award, Sparkles, AlertCircle } from "lucide-react";
import { PracticeArea } from "../types";

const practiceAreasData: PracticeArea[] = [
  {
    id: "pa-1",
    name: "Service Law",
    category: "Service & Labor",
    description: "Resolving statutory administrative disputes concerning state and central government services, and security of tenure.",
    landmarkActs: ["Administrative Tribunals Act, 1985", "Civil Services Rules", "CCS (CCA) Rules, 1965"],
  },
  {
    id: "pa-2",
    name: "Civil Litigation",
    category: "Civil & Property",
    description: "Broad-spectrum civil advisory, trial strategy, and appellate representation across courts.",
    landmarkActs: ["Code of Civil Procedure, 1908", "Indian Evidence Act, 1872"],
  },
  {
    id: "pa-3",
    name: "Real Estate & Property Law",
    category: "Civil & Property",
    description: "Property diligence, real estate compliance, and litigation representing developers and buyers alike.",
    landmarkActs: ["M.P. Land Revenue Code, 1959", "Transfer of Property Act, 1882", "RERA, 2016"],
  },
  {
    id: "pa-4",
    name: "Constitutional Matters",
    category: "Constitutional & Appellate",
    description: "Litigation asserting fundamental rights, pursuing writ jurisdictions under Part III of the Constitution.",
    landmarkActs: ["Article 32 & 226 of Constitution of India", "Administrative Law Doctrines"],
  },
  {
    id: "pa-5",
    name: "High Court Litigation",
    category: "Constitutional & Appellate",
    description: "Rigorous representation for writ petitions, reviews, references, and regular first appeals.",
    landmarkActs: ["Appellate Rules of M.P. High Court", "Constitutional Writs"],
  },
  {
    id: "pa-6",
    name: "Supreme Court Litigation",
    category: "Constitutional & Appellate",
    description: "Filing and advocating Special Leave Petitions (SLPs), Civil and Criminal Appeals, and original briefs.",
    landmarkActs: ["Article 136, 133 & 142 of the Constitution", "Supreme Court Rules, 2013"],
  },
  {
    id: "pa-7",
    name: "Corporate Law",
    category: "Corporate, Tax & GST",
    description: "Corporate compliance, board matters, statutory governance, mergers, and restructuring counsel.",
    landmarkActs: ["Companies Act, 2013", "SEBI Regulations"],
  },
  {
    id: "pa-8",
    name: "Commercial Disputes",
    category: "Corporate, Tax & GST",
    description: "Fast-track representation for commercial asset recoveries and partnership disagreements.",
    landmarkActs: ["Commercial Courts Act, 2015", "Specific Relief Act, 1963"],
  },
  {
    id: "pa-9",
    name: "Consumer Protection",
    category: "Arbitration & Family",
    description: "Defending consumers and corporate companies at district commissions, state boards, and national commission.",
    landmarkActs: ["Consumer Protection Act, 2019", "E-commerce guidelines"],
  },
  {
    id: "pa-10",
    name: "Arbitration & Conciliation",
    category: "Arbitration & Family",
    description: "Representing private entities in domestic ad-hoc and institutional alternative disputes resolution.",
    landmarkActs: ["Arbitration and Conciliation Act, 1996"],
  },
  {
    id: "pa-11",
    name: "Revenue Matters",
    category: "Civil & Property",
    description: "Administrative litigation involving state agricultural lands, diversion, and mutation briefs.",
    landmarkActs: ["MP Land Revenue Code, 1959", "Revenue Board Regulations"],
  },
  {
    id: "pa-12",
    name: "Land Record Matters",
    category: "Civil & Property",
    description: "Rectification of records of rights, settlement challenges, and verification of complex revenue chains.",
    landmarkActs: ["Khasra/Khatauni verification guides", "Settlement Act Regulations"],
  },
  {
    id: "pa-13",
    name: "Contract Law",
    category: "Corporate, Tax & GST",
    description: "Drafting, negotiating, and strategic counsel regarding commercial breaches and indemnity.",
    landmarkActs: ["Indian Contract Act, 1872", "Sale of Goods Act, 1930"],
  },
  {
    id: "pa-14",
    name: "Government & Administrative Law",
    category: "Constitutional & Appellate",
    description: "Challenging ultra-vires notifications, tender boards, and arbitrary administrative decisions.",
    landmarkActs: ["Principles of Natural Justice", "Public Law doctrines"],
  },
  {
    id: "pa-15",
    name: "CGST Matters",
    category: "Corporate, Tax & GST",
    description: "Litigation and statutory advisory concerning Central GST, tax classifications, and input credits.",
    landmarkActs: ["Central Goods and Services Tax Act, 2017", "CBIC Circulars"],
  },
  {
    id: "pa-16",
    name: "SGST Matters",
    category: "Corporate, Tax & GST",
    description: "Representing state GST issues, search seizures, assessments, and appeals before appellate authorities.",
    landmarkActs: ["M.P. Goods and Services Tax Act, 2017"],
  },
  {
    id: "pa-17",
    name: "Trial Court Litigation",
    category: "Arbitration & Family",
    description: "Conducting trials, evidence cross-examinations, framing of issues, and original pleadings.",
    landmarkActs: ["Civil Procedure Code", "Code of Criminal Procedure"],
  },
  {
    id: "pa-18",
    name: "Family Law",
    category: "Arbitration & Family",
    description: "Matrimonial disputes, custody litigation, partition actions, maintenance claims, and succession affairs.",
    landmarkActs: ["Hindu Marriage Act, 1955", "Special Marriage Act, 1954", "Indian Succession Act"],
  },
  {
    id: "pa-19",
    name: "Criminal Law",
    category: "Arbitration & Family",
    description: "Strategic defense litigation, criminal appeals, bails, suspension of sentences, and quashing of FIRs.",
    landmarkActs: ["Bharatiya Nyaya Sanhita (BNS)", "Bhartiya Nagarik Suraksha Sanhita (BNSS)"],
  },
  {
    id: "pa-20",
    name: "Labour Law",
    category: "Service & Labor",
    description: "Safeguarding corporate workplace rules, industrial disputes, and collective bargaining compliance.",
    landmarkActs: ["Industrial Disputes Act, 1947", "Employees Provident Fund Act"],
  },
];

const categories = [
  "All",
  "Constitutional & Appellate",
  "Civil & Property",
  "Service & Labor",
  "Corporate, Tax & GST",
  "Arbitration & Family",
];

export default function PracticeAreas() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredAreas = practiceAreasData.filter((area) => {
    const matchesCategory = selectedCategory === "All" || area.category === selectedCategory;
    const matchesSearch =
      area.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      area.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      area.landmarkActs.some((act) => act.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="practice-areas" className="py-24 px-4 bg-navy-950/60 relative">
      {/* Decorative vertical lines */}
      <div className="absolute top-0 bottom-0 left-10 w-[1px] bg-gold-400/5 hidden md:block" />
      <div className="absolute top-0 bottom-0 right-10 w-[1px] bg-gold-400/5 hidden md:block" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-serif italic text-gold-400 text-lg tracking-wide">Practice Directory</span>
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight mt-2">
            Structured Law Practice
          </h2>
          <div className="w-16 h-[2px] bg-gold-400 mx-auto mt-4" />
          <p className="text-gray-400 font-display italic mt-4 max-w-2xl mx-auto text-base">
            Offering seasoned jurisdictional solutions across both appellate chambers and trial boardrooms.
          </p>
        </div>

        {/* Dynamic Navigation & Search Console */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-gold-400/15 pb-8">
          <div className="flex flex-wrap gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setExpandedId(null);
                }}
                className={`px-4 py-2 text-xs uppercase tracking-wider rounded transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-gold-400 text-onyx-950 font-bold shadow-[0_2px_12px_rgba(212,175,55,0.2)]"
                    : "border border-gold-400/20 text-gold-200 hover:text-white hover:border-gold-400/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400" />
            <input
              type="text"
              placeholder="Search acts, codes or practice..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-navy-950 border border-gold-400/20 text-white rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-gold-400 transition-colors placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Dynamic Practice List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredAreas.map((area) => {
              const isExpanded = expandedId === area.id;
              return (
                <motion.div
                  layout
                  key={area.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`border border-gold-400/10 rounded-md overflow-hidden bg-navy-900/40 backdrop-blur-sm transition-all duration-300 ${
                    isExpanded ? "border-gold-400/40 ring-1 ring-gold-400/20 bg-navy-900/80 shadow-2xl" : "hover:border-gold-400/20"
                  }`}
                >
                  <div
                    onClick={() => toggleExpand(area.id)}
                    className="p-6 flex justify-between items-center cursor-pointer select-none group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded bg-gold-400/5 border border-gold-400/15 group-hover:border-gold-400/40 transition-colors">
                        <FolderOpen className="w-5 h-5 text-gold-400" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-semibold text-gold-400/60 tracking-wider font-sans">
                          {area.category}
                        </span>
                        <h3 className="text-lg font-serif text-white group-hover:text-gold-200 transition-colors">
                          {area.name}
                        </h3>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-gold-400/60 group-hover:text-gold-400 transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden border-t border-gold-400/10"
                      >
                        <div className="p-6 bg-navy-950/40 flex flex-col gap-5">
                          <p className="text-gray-300 text-sm leading-relaxed font-display italic">
                            "{area.description}"
                          </p>
                          <div>
                            <div className="flex items-center gap-1.5 mb-2">
                              <Award className="w-3.5 h-3.5 text-gold-400" />
                              <span className="text-[11px] font-sans font-bold text-gold-200 uppercase tracking-widest">
                                Governing Statutes & Frameworks
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {area.landmarkActs.map((act, i) => (
                                <span
                                  key={i}
                                  className="text-xs px-2.5 py-1 rounded bg-gold-400/10 border border-gold-400/15 text-gold-300"
                                >
                                  {act}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredAreas.length === 0 && (
          <div className="text-center py-16 border border-gold-400/10 rounded bg-navy-900/20">
            <AlertCircle className="w-8 h-8 text-gold-400/60 mx-auto mb-3" />
            <p className="text-gray-400 font-display italic">No specific legal practice matched your query.</p>
          </div>
        )}
      </div>
    </section>
  );
}
