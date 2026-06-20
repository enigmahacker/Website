import React, { useState } from "react";
import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock, Instagram, Send, ShieldAlert, CheckCircle2 } from "lucide-react";

export default function ContactSection() {
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [subject, setSubject] = useState("General Legal Inquiry");
  const [message, setMessage] = useState("");
  
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone || !message) return;
    
    setSubmitting(true);
    // Simulate transmitting secure message
    setTimeout(() => {
      setSuccess(true);
      setSubmitting(false);
      setInquiryName("");
      setInquiryPhone("");
      setInquiryEmail("");
      setMessage("");
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 px-4 bg-onyx-950 relative overflow-hidden">
      {/* Abstract structural grid map placeholder */}
      <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-radial from-gold-400/5 to-transparent pointer-events-none hidden lg:block" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="font-serif italic text-gold-400 text-lg tracking-wide">Communication Desk</span>
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight mt-2">
            Establish Contact
          </h2>
          <div className="w-16 h-[2px] bg-gold-400 mx-auto mt-4" />
          <p className="text-gray-400 font-display italic mt-4 max-w-2xl mx-auto text-base">
            Initiate connection with our legal team to map out your strategic defense options.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details Panel */}
          <div className="col-span-1 lg:col-span-5 space-y-8">
            <div className="p-8 border border-gold-400/10 rounded-lg bg-navy-950/30 backdrop-blur-sm">
              <h3 className="text-xl font-serif text-white mb-6 border-b border-gold-400/10 pb-4">
                Chamber Coordinates
              </h3>

              <div className="space-y-6">
                {/* Physical Location */}
                <div className="flex gap-4 items-start">
                  <div className="p-2 bg-gold-400/10 border border-gold-400/15 rounded text-gold-400 mt-1 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-sans tracking-widest text-gold-400 font-bold block mb-1">
                      Indore Headquarters
                    </span>
                    <p className="text-gray-300 text-sm leading-relaxed font-sans">
                      D-14 & 15, Bakhtawar Ram Nagar,<br />
                      Near Tilak Nagar,<br />
                      Indore, Madhya Pradesh – 452018
                    </p>
                    <a
                      href="https://maps.google.com/?q=D-14+%26+15%2C+Bakhtawar+Ram+Nagar%2C+Indore"
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="text-xs text-gold-400 hover:text-white mt-2 inline-block font-sans underline"
                    >
                      Retrieve GPS Coordinates
                    </a>
                  </div>
                </div>

                {/* Telephone Lines */}
                <div className="flex gap-4 items-start">
                  <div className="p-2 bg-gold-400/10 border border-gold-400/15 rounded text-gold-400 mt-1 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-sans tracking-widest text-gold-400 font-bold block mb-1">
                      Direct Hotlines
                    </span>
                    <p className="text-gray-300 font-mono text-sm leading-relaxed space-y-1 block">
                      <a href="tel:+919407119583" className="hover:text-gold-400 transition-colors block">
                        +91 9407119583
                      </a>
                      <a href="tel:+919826381050" className="hover:text-gold-400 transition-colors block">
                        +91 9826381050
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email Gateways */}
                <div className="flex gap-4 items-start">
                  <div className="p-2 bg-gold-400/10 border border-gold-400/15 rounded text-gold-400 mt-1 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-sans tracking-widest text-gold-400 font-bold block mb-1">
                      Electronic Brief Gateways
                    </span>
                    <p className="text-gray-300 font-sans text-sm leading-relaxed space-y-1 block">
                      <a href="mailto:patneadv@gmail.com" className="hover:text-gold-400 underline block">
                        patneadv@gmail.com
                      </a>
                      <a href="mailto:drpatneadv@gmail.com" className="hover:text-gold-400 underline block">
                        drpatneadv@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* Timetables */}
                <div className="flex gap-4 items-start">
                  <div className="p-2 bg-gold-400/10 border border-gold-400/15 rounded text-gold-400 mt-1 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-sans tracking-widest text-gold-400 font-bold block mb-1">
                      Consultation Hours
                    </span>
                    <div className="text-gray-300 text-xs space-y-2 block">
                      <div className="flex justify-between items-center gap-12">
                        <span className="font-semibold text-gray-400">Monday – Friday</span>
                        <span className="font-mono text-gold-300 bg-gold-400/5 border border-gold-400/10 px-2 py-0.5 rounded">
                          04:00 PM – 06:30 PM
                        </span>
                      </div>
                      <div className="flex justify-between items-center gap-12">
                        <span className="font-semibold text-gray-400">Saturday</span>
                        <span className="font-mono text-gold-300 bg-gold-400/5 border border-gold-400/10 px-2 py-0.5 rounded">
                          12:00 PM – 02:00 PM
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instagram link */}
              <div className="mt-8 pt-6 border-t border-gold-400/10 flex items-center gap-3">
                <a
                  href="https://www.instagram.com/patne_law_associates/"
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-widest font-sans font-bold border border-gold-400/20 text-gold-200 hover:text-white hover:border-gold-400/60 rounded"
                >
                  <Instagram className="w-4 h-4 text-rose-400" />
                  Follow Instagram Handle
                </a>
              </div>
            </div>
          </div>

          {/* Secure Message Interface */}
          <div className="col-span-1 lg:col-span-7">
            <div className="p-8 border border-gold-400/10 rounded-lg bg-navy-950/30 backdrop-blur-sm">
              <h3 className="text-xl font-serif text-white mb-2">
                Transmit Diagnostic Inquiry
              </h3>
              <p className="text-gray-400 text-xs tracking-wide font-display italic mb-6">
                Receive general response within 24 operational hours. Fully secure.
              </p>

              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1 }}
                  className="p-6 bg-teal-950/20 border border-teal-500/20 rounded-md text-center text-teal-300 flex flex-col items-center justify-center gap-3"
                >
                  <CheckCircle2 className="w-12 h-12 text-teal-400 animate-pulse" />
                  <h4 className="text-lg font-serif">Inquiry Safely Transmitted</h4>
                  <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
                    Thank you. Your preliminary inquiry has been routed to Patne Law Associates' desk. A liaison will revert via telephone or email today.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="text-xs text-gold-400 hover:text-gold-200 font-sans tracking-wider underline mt-4"
                  >
                    Transmit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-gold-200 font-bold mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-navy-950 border border-gold-400/15 focus:border-gold-400 rounded px-4 py-2.5 text-sm text-white focus:outline-none placeholder:text-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-gold-200 font-bold mb-1.5">
                        10-Digit Contact Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={inquiryPhone}
                        onChange={(e) => setInquiryPhone(e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full bg-navy-950 border border-gold-400/15 focus:border-gold-400 rounded px-4 py-2.5 text-sm text-white focus:outline-none placeholder:text-gray-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-gold-200 font-bold mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      placeholder="client@gmail.com"
                      className="w-full bg-navy-950 border border-gold-400/15 focus:border-gold-400 rounded px-4 py-2.5 text-sm text-white focus:outline-none placeholder:text-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-gold-200 font-bold mb-1.5">
                      Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-navy-950 border border-gold-400/15 focus:border-gold-400 rounded px-4 py-2.5 text-sm text-white focus:outline-none cursor-pointer"
                    >
                      <option value="General Legal Inquiry">General Legal Inquiry</option>
                      <option value="Service & Labor Disputes">Service & Labor disputes</option>
                      <option value="Constitutional Writs">Constitutional Writs (High Court)</option>
                      <option value="Property Title Verification">Property title search / Mutation</option>
                      <option value="Corporate Retention & GST">Corporate representation / GST assessments</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-gold-200 font-bold mb-1.5">
                      Describe your situation or list previous orders *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Input any detailed facts regarding order dates, employer board notices, or statutory claims..."
                      className="w-full bg-navy-950 border border-gold-400/15 focus:border-gold-400 rounded px-4 py-2.5 text-sm text-white focus:outline-none placeholder:text-gray-600 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-gold-500 to-gold-400 text-onyx-950 uppercase font-sans tracking-wider font-bold text-xs rounded transition-all duration-300 hover:scale-[1.01] active:scale-95 disabled:opacity-50 cursor-pointer select-none"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {submitting ? "Signing Security Brief..." : "Transmit Strategic Brief"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
