import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Scale, RefreshCw, ChevronRight, CornerDownLeft, AlertCircle, Bot, Zap } from "lucide-react";
import { Message } from "../types";

interface LegalAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const suggestedQuestions = [
  "What is your experience in Service/Employment Law?",
  "How do I challenge an arbitrary suspension in Madhya Pradesh?",
  "What steps are required for mutation under land revenue codes?",
  "Where are your chambers based and what are the slot timings?"
];

export default function LegalAssistant({ isOpen, onClose }: LegalAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "### Welcome to Patne Law Associates Consultation Desk.\n\nI am the **Patne Legal Assistant**, built to help you navigate legal concepts, explore procedural guidelines under Indian Law, and coordinate bookings with **Adv. Laxmikant Patne** or **Dr. Neerja Patne**.\n\n*How may I assist you today?*",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: "msg-" + Math.random().toString(36).substr(2, 9),
      role: "user",
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setTyping(true);

    try {
      // Setup payload including full conversational history to ensure context retention
      const apiMessages = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok) throw new Error("Connection is busy.");

      const data = await res.json();
      
      // Simulate slight, elegant typing flow to match prestige look
      setTimeout(() => {
        setTyping(false);
        const assistantMsg: Message = {
          id: "msg-" + Math.random().toString(36).substr(2, 9),
          role: "assistant",
          content: data.content,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMsg]);
        setLoading(false);
      }, 700);

    } catch (err) {
      console.error(err);
      setTyping(false);
      setLoading(false);
      
      const errorMsg: Message = {
        id: "msg-err",
        role: "assistant",
        content: "### Gateway Interruption\n\nMy statutory gateway is experiencing heavy volume. Please retry typing your request or consider scheduling a formal review session directly with the Advocates on the contact board.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  const handleClear = () => {
    if (confirm("Reset current statutory advisor session?")) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: "### Welcome to Patne Law Associates Consultation Desk.\n\nI am the **Patne Legal Assistant**, built to help you navigate legal concepts, explore procedural guidelines under Indian Law, and coordinate bookings with **Adv. Laxmikant Patne** or **Dr. Neerja Patne**.\n\n*How may I assist you today?*",
          timestamp: new Date(),
        },
      ]);
    }
  };

  // Convert simple markdown to JSX safely
  const renderMessageContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, idx) => {
      // Headings
      if (line.startsWith("### ")) {
        return <h4 key={idx} className="font-serif text-gold-200 text-base font-bold mt-3 mb-2">{line.replace("### ", "")}</h4>;
      }
      if (line.startsWith("## ")) {
        return <h3 key={idx} className="font-serif text-gold-300 text-lg font-bold mt-4 mb-2">{line.replace("## ", "")}</h3>;
      }
      // Bullet points
      if (line.startsWith("* ")) {
        return <li key={idx} className="ml-5 list-disc text-gray-300 text-xs mb-1 font-sans">{line.replace("* ", "")}</li>;
      }
      // Simple bold replacements inside lines
      const parts = line.split("**");
      if (parts.length > 1) {
        return (
          <p key={idx} className="text-gray-300 text-xs leading-relaxed mb-2 font-sans">
            {parts.map((p, i) => i % 2 === 1 ? <strong key={i} className="text-gold-200 font-semibold">{p}</strong> : p)}
          </p>
        );
      }
      return <p key={idx} className="text-gray-300 text-xs leading-relaxed mb-2 font-sans">{line}</p>;
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-onyx-950 z-40 backdrop-blur-sm"
          />

          {/* Premium Right Draw Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-navy-950 border-l border-gold-400/20 z-50 shadow-2xl flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-gold-400/15 bg-navy-900/50 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-teal-950/40 border border-teal-500/20 flex items-center justify-center text-teal-400">
                  <Scale className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-teal-400 bg-teal-950/60 px-2 py-0.5 rounded flex items-center gap-1">
                      <Zap className="w-2.5 h-2.5 fill-teal-400 text-teal-400" />
                      Gemini Live Node
                    </span>
                  </div>
                  <h3 className="text-lg font-serif text-white tracking-wide">
                    Patne Legal Assistant
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleClear}
                  className="p-2 text-gray-400 hover:text-gold-400 rounded hover:bg-gold-400/5 transition-colors cursor-pointer"
                  title="Clear context"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-red-400 rounded hover:bg-gold-400/5 transition-colors cursor-pointer"
                  title="Close Assistant"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mandatory Disclaimer Block */}
            <div className="bg-amber-950/15 border-b border-amber-500/15 p-4 flex items-start gap-2.5 text-[11px] text-amber-200/90 font-display italic leading-relaxed">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                “Patne Legal Assistant provides general legal information only and does not constitute legal advice. Consult a qualified advocate regarding your specific legal matter.”
              </span>
            </div>

            {/* Conversational Screen */}
            <div
              ref={scrollRef}
              className="flex-1 p-5 overflow-y-auto space-y-4 scrolling-element"
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg p-4 font-sans text-xs flex flex-col ${
                      m.role === "user"
                        ? "bg-gold-400 text-onyx-950 font-medium rounded-tr-none shadow-md"
                        : "bg-navy-900/60 border border-gold-400/10 text-gray-200 rounded-tl-none shadow"
                    }`}
                  >
                    {/* Speaker Header */}
                    <div className="flex items-center gap-1.5 mb-2 font-mono text-[9px] opacity-60">
                      {m.role === "assistant" ? <Bot className="w-3" /> : null}
                      <span>{m.role === "user" ? "Client Case Inquiry" : "Patne Advisor"}</span>
                    </div>

                    <div>
                      {m.role === "user" ? (
                        <p className="whitespace-pre-line leading-relaxed font-sans">{m.content}</p>
                      ) : (
                        renderMessageContent(m.content)
                      )}
                    </div>

                    <span className="text-[8px] font-mono opacity-40 self-end mt-1">
                      {m.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-navy-900/40 border border-gold-400/5 rounded-lg rounded-tl-none p-4 max-w-[120px] flex gap-1 items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
            </div>

            {/* Suggested Shortcuts Console */}
            {messages.length < 3 && (
              <div className="p-4 border-t border-gold-400/10 bg-navy-950/90">
                <span className="text-[9px] uppercase tracking-widest font-sans font-bold text-gold-400 block mb-2.5">
                  Suggested Enquiries
                </span>
                <div className="flex flex-col gap-1.5">
                  {suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(q)}
                      className="text-left text-[11px] p-2 bg-navy-900 border border-slate-800 hover:border-gold-400/30 rounded text-slate-300 hover:text-gold-200 transition-colors text-ellipsis overflow-hidden whitespace-nowrap cursor-pointer flex items-center gap-1.5"
                    >
                      <ChevronRight className="w-3 h-3 text-gold-400 shrink-0" />
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input form */}
            <div className="p-4 bg-navy-900/60 border-t border-gold-400/15">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(input);
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  disabled={loading}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask regarding CAT service rules or land title disputes..."
                  className="flex-1 bg-navy-950 border border-gold-400/15 focus:border-gold-400 rounded px-3.5 py-3 text-xs text-white focus:outline-none placeholder:text-gray-600 disabled:opacity-40"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="bg-gold-400 hover:bg-gold-500 disabled:opacity-50 text-onyx-950 p-3 rounded transition-all duration-300 cursor-pointer flex items-center justify-center shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="flex items-center gap-1 text-[9px] text-gray-500 mt-2 font-mono justify-center">
                <CornerDownLeft className="w-3 h-3" />
                Press Enter to transmit inquiry securely to Gemini node.
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
