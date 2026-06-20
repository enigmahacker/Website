import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Clock, Landmark, User, Phone, Mail, FileText, CheckCircle, Printer, Plus, AlertCircle, ShieldAlert } from "lucide-react";
import { Booking } from "../types";

export default function BookingSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("Service Law");
  const [courtVenue, setCourtVenue] = useState("Indore Office (HQ)");
  const [description, setDescription] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeReceipt, setActiveReceipt] = useState<Booking | null>(null);
  const [myBookings, setMyBookings] = useState<Booking[]>([]);

  // Working Hours Guidance based on user prompt:
  // Monday - Friday: 4:00 PM - 6:30 PM
  // Saturday: 12:00 PM - 2:00 PM
  const timeSlots = {
    weekday: ["04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM"],
    saturday: ["12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM"],
  };

  const getAvailableSlots = () => {
    if (!date) return timeSlots.weekday;
    const day = new Date(date).getDay();
    if (day === 6) return timeSlots.saturday; // Saturday
    return timeSlots.weekday; // Weekday defaults (excluding Sunday ideally)
  };

  const loadBookings = async () => {
    try {
      const response = await fetch("/api/bookings");
      if (response.ok) {
        const data = await response.json();
        setMyBookings(data.bookings || []);
      }
    } catch (e) {
      console.warn("Failed to fetch fresh bookings array:", e);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !phone || !date || !time || !category) {
      setError("Please fill in all mandatory markers highlighted with an asterisk (*).");
      return;
    }

    // Format phone verification (Indian code or standard length)
    if (phone.replace(/\D/g, "").length < 10) {
      setError("Please input a valid 10-digit Indian contact phone number.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          date,
          time,
          category,
          courtVenue,
          description,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setActiveReceipt(data.booking);
        // Clear Form
        setName("");
        setPhone("");
        setEmail("");
        setDate("");
        setTime("");
        setDescription("");
        
        // Refresh local listings
        loadBookings();
      } else {
        setError(data.error || "An unexpected error impeded your request. Pleae retry model.");
      }
    } catch (err) {
      console.error(err);
      setError("The gateway server is temporarily busy. Please retry in a moment.");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="booking" className="py-24 px-4 bg-navy-950/40 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-400/5 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-11">
        <div className="text-center mb-16">
          <span className="font-serif italic text-gold-400 text-lg tracking-wide">Exclusivity Console</span>
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight mt-2">
            Schedule Consultation
          </h2>
          <div className="w-16 h-[2px] bg-gold-400 mx-auto mt-4" />
          <p className="text-gray-400 font-display italic mt-4 max-w-2xl mx-auto text-base">
            Secure a private briefing session at our suites in Indore, or request supreme appellate reviews online.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Booking Input Frame */}
          <div className="col-span-1 lg:col-span-7">
            <div className="p-8 border border-gold-400/10 rounded-lg bg-navy-950/80 backdrop-blur-md shadow-xl">
              <h3 className="text-xl font-serif text-white mb-6 border-b border-gold-400/10 pb-4 flex items-center gap-2">
                <Landmark className="w-5 h-5 text-gold-400" />
                Appointment Entry Brief
              </h3>

              {error && (
                <div className="mb-6 p-4 rounded bg-red-950/20 border border-red-500/20 text-xs text-red-300 flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleBook} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="relative">
                    <label className="block text-[10px] uppercase tracking-widest text-gold-200 font-semibold mb-1.5 font-sans">
                      Your Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400/60" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Advocate/Company/Individual"
                        className="w-full bg-navy-900 border border-gold-400/25 rounded px-4 pl-10 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400 placeholder:text-gray-600"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-[10px] uppercase tracking-widest text-gold-200 font-semibold mb-1.5 font-sans">
                      Contact Phone *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400/60" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full bg-navy-900 border border-gold-400/25 rounded px-4 pl-10 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400 placeholder:text-gray-600"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="relative">
                    <label className="block text-[10px] uppercase tracking-widest text-gold-200 font-semibold mb-1.5 font-sans">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400/60" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="client@gmail.com"
                        className="w-full bg-navy-900 border border-gold-400/25 rounded px-4 pl-10 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400 placeholder:text-gray-600"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-[10px] uppercase tracking-widest text-gold-200 font-semibold mb-1.5 font-sans">
                      Exclusivity Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-navy-900 border border-gold-400/25 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400 cursor-pointer"
                    >
                      <option value="Service Law">Service Law & employment relations</option>
                      <option value="Constitutional Matters">Constitutional Writs (High Court/Supreme Court)</option>
                      <option value="Real Estate & Property">Real Estate & Revenue Matters</option>
                      <option value="Corporate & Tax">Corporate, Commercial Disputes & GST</option>
                      <option value="Trial & Family">Trial Litigation, Bails & Family laws</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="relative">
                    <label className="block text-[10px] uppercase tracking-widest text-gold-200 font-semibold mb-1.5 font-sans">
                      Preferred Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400/60" />
                      <input
                        type="date"
                        required
                        value={date}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => {
                          setDate(e.target.value);
                          setTime(""); // reset time
                        }}
                        className="w-full bg-navy-900 border border-gold-400/25 rounded px-4 pl-10 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-[10px] uppercase tracking-widest text-gold-200 font-semibold mb-1.5 font-sans">
                      Time Slot * (Selected Day Hours)
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400/60" />
                      <select
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-navy-900 border border-gold-400/25 rounded px-4 pl-10 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400 cursor-pointer"
                      >
                        <option value="">Select slot...</option>
                        {getAvailableSlots().map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gold-200 font-semibold mb-1.5 font-sans">
                    Preferred Consultation Venue
                  </label>
                  <select
                    value={courtVenue}
                    onChange={(e) => setCourtVenue(e.target.value)}
                    className="w-full bg-navy-900 border border-gold-400/25 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400 cursor-pointer"
                  >
                    <option value="Indore Office (HQ)">Indore Main Chambers (D-14 & 15, Bakhtawar Ram Nagar)</option>
                    <option value="Virtual Appellate Desk">Virtual Video Session (Supreme Court / High Court briefs)</option>
                  </select>
                </div>

                <div className="relative">
                  <label className="block text-[10px] uppercase tracking-widest text-gold-200 font-semibold mb-1.5 font-sans">
                    Brief Matter Summary / Disciplinary Context
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 w-4 h-4 text-gold-400/60" />
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Outline any suspension orders, Land records, GST notices, or pending cases details..."
                      className="w-full bg-navy-900 border border-gold-400/25 rounded px-4 pl-10 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400 placeholder:text-gray-600 resize-none"
                    />
                  </div>
                </div>

                {/* Submitting Key */}
                <button
                  type="submit"
                  disabled={loading}
                  id="submit-booking-btn"
                  className="w-full py-3.5 px-6 font-semibold uppercase tracking-wider text-sm bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-500 text-onyx-950 rounded transition-all duration-300 transform active:scale-95 disabled:opacity-50 cursor-pointer select-none"
                >
                  {loading ? "Locking Chamber Slot..." : "Transmit Consultation Request"}
                </button>
              </form>
            </div>
          </div>

          {/* Elegant Receipt / Consultation Confirmation Slip */}
          <div className="col-span-1 lg:col-span-5 flex flex-col justify-start">
            <AnimatePresence mode="wait">
              {activeReceipt ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="border border-gold-400/35 rounded-lg p-6 bg-gradient-to-b from-gold-50 to-white text-onyx-950 shadow-2xl relative gold-text-glow"
                >
                  {/* Watermark Crest */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none text-navy-850">
                    <svg width="220" height="220" viewBox="0 0 100 100" fill="currentColor">
                      <path d="M50,10 L10,30 L10,60 C10,80 50,90 50,90 C50,90 90,80 90,60 L90,30 L50,10 Z" />
                    </svg>
                  </div>

                  {/* Header */}
                  <div className="text-center border-b border-dashed border-gold-400/50 pb-5 mb-5 relative z-10">
                    <span className="font-serif text-lg font-bold tracking-widest text-navy-950 uppercase block">
                      PATNE Law Associates
                    </span>
                    <span className="text-[9px] uppercase font-sans tracking-[0.25em] text-gold-600 font-bold block mb-1">
                      CHAMBER COUNSEL INVITATION
                    </span>
                    <span className="text-xs font-mono text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full inline-block mt-2">
                      SERIAL: {activeReceipt.id}
                    </span>
                  </div>

                  {/* Content parameters */}
                  <div className="space-y-4 font-sans text-xs text-gray-700 relative z-10">
                    <div className="flex justify-between items-center bg-gold-400/10 p-2.5 rounded">
                      <span className="font-semibold text-gold-900">Assigned Advocate Desk:</span>
                      <span className="font-bold underline text-navy-950">
                        {activeReceipt.category.includes("Constitutional") || activeReceipt.category.includes("Service")
                          ? "Adv. Laxmikant Patne"
                          : "Dr. Neerja Patne"}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase font-sans tracking-wide block">Client Name</span>
                        <span className="font-serif text-sm font-semibold text-navy-950">{activeReceipt.name}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase font-sans tracking-wide block">Contact Phone</span>
                        <span className="font-mono text-xs font-semibold text-navy-950">{activeReceipt.phone}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-3">
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase font-sans tracking-wide block">Brief Category</span>
                        <span className="font-sans font-medium text-navy-950">{activeReceipt.category}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase font-sans tracking-wide block">Venue Destination</span>
                        <span className="font-sans font-medium text-navy-950">{activeReceipt.courtVenue}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-3 bg-navy-950/5 p-2 rounded">
                      <div>
                        <span className="text-[10px] text-gold-600 uppercase font-sans tracking-widest font-bold block">Reserved Date</span>
                        <span className="font-mono text-xs font-bold text-navy-950">{activeReceipt.date}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-gold-600 uppercase font-sans tracking-widest font-bold block">Confirmed Slot</span>
                        <span className="font-mono text-xs font-bold text-navy-950 bg-gold-400/20 px-2 py-0.5 rounded inline-block">{activeReceipt.time}</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-200/50 pt-3 mt-4">
                      <span className="text-[10px] text-gray-400 uppercase font-sans tracking-wide block">Brief Description</span>
                      <p className="text-gray-600 italic leading-relaxed mt-1 block max-h-[80px] overflow-y-auto">
                        "{activeReceipt.description}"
                      </p>
                    </div>
                  </div>

                  {/* Actions (Print & Reset) */}
                  <div className="mt-6 pt-5 border-t border-dashed border-gold-400/50 flex gap-3 relative z-10">
                    <button
                      onClick={handlePrint}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-navy-950 text-white hover:bg-navy-900 rounded text-xs font-semibold transition-all duration-300 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      Print Invitation
                    </button>
                    <button
                      onClick={() => setActiveReceipt(null)}
                      className="inline-flex items-center justify-center p-2.5 border border-gray-300 hover:border-gold-400 rounded text-gray-500 hover:text-gold-600 hover:bg-gold-50 transition-all duration-300 cursor-pointer"
                      title="Schedule another brief"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="border border-slate-800 rounded-lg p-6 bg-navy-900/30 flex flex-col justify-center items-center text-center h-full min-h-[300px]">
                  <Calendar className="w-12 h-12 text-gold-400/40 mb-4 animate-bounce" />
                  <h4 className="text-lg font-serif text-gold-400 font-medium mb-1">Lobby Brief Pending</h4>
                  <p className="text-gray-450 font-display italic text-sm max-w-xs leading-relaxed">
                    Once you transmit the brief entry, your personalized gold-foil counsel invitation and printable check-in pass will generate here.
                  </p>

                  {/* Active listings log */}
                  {myBookings.length > 0 && (
                    <div className="w-full mt-6 border-t border-slate-800 pt-5 text-left">
                      <span className="text-[10px] text-gold-400/70 font-sans uppercase tracking-widest font-bold block mb-3">
                        Active Log ({myBookings.length})
                      </span>
                      <div className="space-y-2.5 max-h-[140px] overflow-y-auto pr-1">
                        {myBookings.map((b) => (
                          <div
                            key={b.id}
                            onClick={() => setActiveReceipt(b)}
                            className="p-2 border border-slate-800 hover:border-gold-400/30 bg-onyx-950/60 rounded flex justify-between items-center cursor-pointer transition-colors"
                          >
                            <div>
                              <span className="text-gray-200 text-xs font-semibold block">{b.name}</span>
                              <span className="text-[9px] text-gray-500 font-mono block">
                                {b.id} — {b.date} at {b.time}
                              </span>
                            </div>
                            <span className="text-[9px] font-sans font-bold uppercase py-0.5 px-2 bg-teal-950 text-teal-300 border border-teal-500/20 rounded">
                              {b.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
