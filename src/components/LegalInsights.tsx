import React from "react";
import { motion } from "motion/react";
import { BookOpen, Calendar, Clock, ChevronRight, FileText, ArrowUpRight } from "lucide-react";
import { LegalInsight } from "../types";

const insightsData: LegalInsight[] = [
  {
    id: "insight-1",
    title: "Understanding Disciplinary Inquiries & CAT Service Procedures",
    category: "Service Law",
    summary: "An in-depth analysis of Article 311 of the Constitution, governing protection of central and state government employees facing suspensions or arbitrary departmental inquiry panels.",
    date: "June 12, 2026",
    readTime: "8 min read",
  },
  {
    id: "insight-2",
    title: "Navigating Title Clearances under the MP Land Revenue Code",
    category: "Real Estate & Property",
    summary: "Demystifying Mutational record updates, Diversion indexes, and dispute remedies under Section 110 of the Madhya Pradesh Land Revenue Code, 1959.",
    date: "May 28, 2026",
    readTime: "6 min read",
  },
  {
    id: "insight-3",
    title: "Tax Classification Audits & GST Appeals: Procedural Checklists",
    category: "CGST & SGST Matters",
    summary: "Critical guides for navigating show-cause assessment directives, maintaining credit ledger reconciliations, and filing appellate petitions under the CGST Act.",
    date: "May 15, 2026",
    readTime: "10 min read",
  },
];

export default function LegalInsights() {
  return (
    <section id="insights" className="py-24 px-4 bg-navy-950/60 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-serif italic text-gold-400 text-lg tracking-wide">Jurisprudence Journals</span>
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight mt-2">
            Legal Insights
          </h2>
          <div className="w-16 h-[2px] bg-gold-400 mx-auto mt-4" />
          <p className="text-gray-400 font-display italic mt-4 max-w-2xl mx-auto text-base">
            Exploring constitutional developments, administrative procedures, and commercial statutory frameworks in India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {insightsData.map((ins, i) => (
            <motion.article
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              key={ins.id}
              className="bg-navy-900/30 border border-gold-400/10 rounded-md p-6 flex flex-col justify-between hover:border-gold-400/30 hover:bg-navy-900/50 transition-all duration-300 group cursor-pointer"
            >
              <div>
                {/* Meta details */}
                <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono mb-4 border-b border-gold-400/10 pb-3">
                  <span className="text-gold-400 uppercase tracking-widest font-semibold">{ins.category}</span>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    <span>{ins.date}</span>
                  </div>
                </div>

                <h3 className="text-lg font-serif text-white group-hover:text-gold-200 transition-colors tracking-tight leading-snug mb-3">
                  {ins.title}
                </h3>

                <p className="text-gray-400 text-xs leading-relaxed mb-6 font-display italic">
                  {ins.summary}
                </p>
              </div>

              {/* Read trigger */}
              <div className="flex items-center justify-between text-xs text-gold-400 font-sans tracking-wider border-t border-gold-400/10 pt-4 mt-4">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-gray-400 text-[11px] font-sans">{ins.readTime}</span>
                </div>
                
                <span className="inline-flex items-center gap-0.5 group-hover:text-white transition-colors">
                  Analyze Article
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
