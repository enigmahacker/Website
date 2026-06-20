import React from "react";
import { motion } from "motion/react";
import { Quote, Landmark, Award, Star } from "lucide-react";
import { Testimonial } from "../types";

const testimonials: Testimonial[] = [
  {
    id: "test-1",
    clientType: "Administrative",
    statement: "I was facing wrongful suspension and pay stagnation just two years before my retirement. Adv. Laxmikant Patne analyzed my service rules with academic accuracy and secured a stay order before the High Court within 48 hours. His strategic depth in Service Law is unparalleled in central India.",
    author: "Retd. Chief Engineer",
    designation: "Water Resources Department, Gov. of MP",
    venueName: "CAT Jabalpur & MP High Court",
  },
  {
    id: "test-2",
    clientType: "Corporate",
    statement: "During a critical SGST classification dispute that threatened our operations we engaged Patne Law Associates. Dr. Neerja Patne represented us before the state tax authorities and GST tribunal boards. Her comprehensive, research-backed brief led to a complete waiver of the arbitrary penalty.",
    author: "Managing Director",
    designation: "Indore Logistics & Warehousing Corp",
    venueName: "GST Appellate Board (MP)",
  },
  {
    id: "test-3",
    clientType: "Individual",
    statement: "A disputed ancestral property inheritance had been locked in revenue court circles for nearly 12 years. Under Dr. Patne's trial board filings, the land partition decree was finally declared in our favor. The firm's procedural control of the Madhya Pradesh Land Revenue Code is outstanding.",
    author: "Smt. Arundhati Rao",
    designation: "Landowner & Trustee",
    venueName: "Revenue Board & District Court",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-4 bg-onyx-950 relative overflow-hidden">
      {/* Visual luxury accent lines */}
      <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-gold-400/5" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="font-serif italic text-gold-400 text-lg tracking-wide">Client Narratives</span>
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight mt-2">
            Case Testimonials
          </h2>
          <div className="w-16 h-[2px] bg-gold-400 mx-auto mt-4" />
          <p className="text-gray-400 font-display italic mt-4 max-w-2xl mx-auto text-base">
            Reflecting on milestone representation outcomes from India's senior tribunals and high courts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, i) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              key={test.id}
              className="bg-navy-950/30 border border-gold-400/10 rounded-lg p-8 relative flex flex-col justify-between hover:border-gold-400/20 transition-all duration-300"
            >
              {/* Premium Quote icon watermark */}
              <Quote className="w-10 h-10 text-gold-400/10 absolute top-6 right-6" />

              <div>
                {/* 5-star rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>

                {/* Case citation header */}
                <span className="inline-block text-[9px] uppercase font-sans tracking-[0.2em] bg-gold-400/10 text-gold-300 px-2.5 py-1 rounded font-semibold mb-6">
                  {test.clientType} Realm
                </span>

                <p className="text-gray-300 text-sm leading-relaxed mb-8 italic font-display">
                  "{test.statement}"
                </p>
              </div>

              {/* Author Info */}
              <div className="border-t border-gold-400/10 pt-5 mt-5">
                <span className="text-sm font-serif text-white font-semibold block">
                  {test.author}
                </span>
                <span className="text-xs text-gray-400 block font-sans">
                  {test.designation}
                </span>
                
                {/* Rep Venue tag */}
                <div className="flex items-center gap-1.5 mt-3 text-[10px] text-gold-400/80 font-mono">
                  <Landmark className="w-3.5 h-3.5" />
                  <span>Decided: {test.venueName}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
