import express, { Request, Response } from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory store for consultation bookings (provides real-time confirmation)
const bookings: Array<{
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  category: string;
  description: string;
  courtVenue?: string;
  status: string;
  timestamp: string;
}> = [];

// Initialize Gemini Client safely on the server side
let ai: GoogleGenAI | null = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  } else {
    console.warn("GEMINI_API_KEY is not defined or is placeholder. Falling back to local smart advisor mode for legal guidance.");
  }
} catch (error) {
  console.error("Failed to initialize GoogleGenAI client:", error);
}

// System instructions for Patne Legal Assistant
const PATNE_LEG_SYSTEM_INSTRUCTION = `You are the "Patne Legal Assistant", an elite, sophisticated, and highly structured legal information advisor representing Patne Law Associates. 
Your goal is to provide exceptional, accurate, and highly professional general legal information based on Indian Law, guide website visitors through the firm's extensive expertise, and strongly encourage booking a formal legal consultation with the firm's leadership (Adv. Laxmikant Patne and Dr. Neerja Patne).

ABOUT PATNE LAW ASSOCIATES:
- Headquartered in Indore, Madhya Pradesh. Over 3 decades (since 1993, more than 30 years) of pristine legal heritage and courtroom excellence.
- Founder & Managing Partner: Adv. Laxmikant Patne (B.A. LL.B. Hons, LL.M.). A legal stalwart with extensive expertise in Service Matters, Civil Disputes, and Constitutional Laws.
- Senior Partner: Dr. Neerja Patne (B.A. LL.B. Hons, LL.M., Ph.D. in Law), an academic and trial courtroom authority on Constitutional, Property, and Administrative branches.
- Representation Venues: Supreme Court of India, Madhya Pradesh High Court (Indore, Jabalpur, Gwalior benches), Chhattisgarh High Court (Bilaspur), Delhi courts & Central Administrative Tribunal (CAT), Revenue Boards, GST Tribunals, and consumer forums.
- Main Offices: Indore (Madhya Pradesh). Serving Madhya Pradesh, Chhattisgarh, Delhi, and Aurangabad.

KEY INSTRUCTIONS:
1. Speak with pristine legal discipline, authority, and warmth (elite law firm tone like Magic Circle or top Supreme Court senior counsels). Avoid informal colloquial slang.
2. Structure your replies beautifully with bullet points, numbered sub-sections, or elegant paragraphs. Never dump unformatted text.
3. Provide general legal definitions and procedures under Indian law (e.g., Code of Civil Procedure, GST Act, Constitution of India, Service rules) but always append a polite reminder that only a direct consultation or case brief analysis will yield definitive actionable legal strategy.
4. When the user asks about specific topics:
   - Service Law / Government employment rules: Highlight Adv. Laxmikant Patne's extensive experience before the Central Administrative Tribunal (CAT) and High Courts.
   - Constitutional/Writs: Mention represented matters before the Supreme Court of India and High Courts.
   - GST / Taxes / Civil Matters / Land Records: Suggest scheduling a formal assessment.
5. Remind user of the disclaimer: "Patne Legal Assistant provides general legal information only and does not constitute formal legal counsel. For direct legal strategy, we recommend a personal session with the Advocates."
6. Always guide users to the "Appointment Booking" or highlight the Phone (+91 9407119583) and Email (patneadv@gmail.com).

Be helpful, concise, authoritative, and brilliantly intellectual.`;

// API: Consultation Booking
app.post("/api/book", (req: Request, res: Response) => {
  const { name, email, phone, date, time, category, description, courtVenue } = req.body;

  if (!name || !phone || !date || !time || !category) {
    return res.status(400).json({ error: "Please fill in all required fields." });
  }

  const newBooking = {
    id: "PLA-" + Math.floor(Math.random() * 90000 + 10000),
    name,
    email: email || "N/A",
    phone,
    date,
    time,
    category,
    description: description || "General inquiry",
    courtVenue: courtVenue || "Indore Office",
    status: "Confirmed",
    timestamp: new Date().toISOString(),
  };

  bookings.push(newBooking);
  console.log("Registered Booking:", newBooking);
  res.status(201).json({ success: true, booking: newBooking });
});

// API: Get Bookings (For showing active session history to client)
app.get("/api/bookings", (req: Request, res: Response) => {
  res.json({ bookings });
});

// API: Patne Legal Chatbot API (Server-side Gemini)
app.post("/api/chat", async (req: Request, res: Response) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array is required." });
  }

  // Format messages for the GoogleGenAI chats API structure
  const lastUserMessage = messages[messages.length - 1]?.content;
  if (!lastUserMessage) {
    return res.status(400).json({ error: "Valid content in last message is required." });
  }

  // Fallback responder in case Gemini API is not working, has no key, or is rate-limited
  const sendFallbackResponse = (userQuery: string) => {
    const q = userQuery.toLowerCase();
    let reply = "";

    if (q.includes("service") || q.includes("employer") || q.includes("termination") || q.includes("promotion")) {
      reply = `### **Service & Employment Law Advisory** \n\nPatne Law Associates enjoys a celebrated legacy in Service Law disputes. Under the expert leadership of **Adv. Laxmikant Patne**, our firm regularly represents clients before the **Central Administrative Tribunal (CAT)**, the **Madhya Pradesh High Court**, and the **Supreme Court of India**.\n\n**Key Service Law Specialties:**\n* Pension and Retiral Benefits\n* Arbitrary Disciplinary Inquiries & Suspensions\n* Seniority, Pay Fixation, and Promotion disputes\n* Wrap-around challenging of wrongful terminations.\n\n*Recommendation:* Since service disputes have strict statutory limitations (e.g., under the Administrative Tribunals Act, 1985), I highly recommend scheduling a formal consultation through our client dashboard of this website.`;
    } else if (q.includes("property") || q.includes("real estate") || q.includes("land") || q.includes("revenue")) {
      reply = `### **Real Estate & Land Revenue Matters** \n\nOur property practice is led by **Dr. Neerja Patne**, specializing in Land Revenue laws, Title Clearances, and Commercial Real Estate conflicts under Madhya Pradesh Land Revenue Code (MPLRC) and national acts.\n\n**Specialized Representation:**\n* Title verifications and legal searches\n* Partition suits, declaration decrees, and injunction briefs\n* Representation before the Revenue Courts (Tehsildar, Sub-Divisional Officer, Collector, and Board of Revenue).\n\n*Advocate Suggestion:* Please navigate to the **Appointment Booking** section of our website to schedule a file-review mapping with Dr. Neerja Patne.`;
    } else if (q.includes("supreme court") || q.includes("delhi") || q.includes("high court")) {
      reply = `### **High Court & Supreme Court Appellate Practice**\n\nPatne Law Associates maintains an elite appellate desk led by our managing partners. We render strategic legal draftings (Writ Petitions, Special Leave Petitions, and Appeals) before:\n* The Supreme Court of India (New Delhi)\n* Madhya Pradesh High Court (Indore, Jabalpur, Gwalior)\n* Chhattisgarh High Court (Bilaspur)\n* High Court of Bombay (Aurangabad Bench)\n\nWe provide critical strategic evaluations for challenging lower court orders under the Indian Constitution.`;
    } else if (q.includes("cost") || q.includes("fee") || q.includes("price") || q.includes("charge")) {
      reply = `### **Fee Structure and Initial Case Evaluation**\n\nAt Patne Law Associates, professional fees are structured specifically to the complexity, forum of representation, and research required for your brief.\n\n* **Initial Meeting:** An academic file review is conducted during your consultation booking.\n* **Standard Retainership & Appearance Rates:** Communicated transparently once the scope of the appellate or trial draft has been mapped.\n\nWould you like me to guide you directly to our **Appointment Booking** section to establish a formal slot?`;
    } else {
      reply = `### **Patne Law Associates Legal Consultation Desk**\n\nThank you for reaching out to Patne Law Associates. With over **three decades of legal heritage**, we provide strategic representation spanning **Constitutional, Service, Civil, Corporate, Revenue, and Appellate Litigations** across India.\n\nTo better serve you, could you please specify which domain your query concerns?\n1. **Service & Government Employment Law** (Suspensions, promotions, pension claims)\n2. **Constitutional Writs or Appellate Advocacy** (High Court & Supreme Court)\n3. **Real Estate, Land Revenue, & GST Matters**\n4. **Commercial Contracts and Civil Disputes**\n\n*A reminder:* For actionable strategy, please lock in an exclusive session via our online calendar, or call us at **+91 9407119583**.`;
    }

    return res.json({
      role: "assistant",
      content: `${reply}\n\n*— Patne Legal Assistant provides general legal information only. Consult a qualified advocate for official legal counsel.*`,
    });
  };

  // If AI client is not available, use the fallback responder immediately
  if (!ai) {
    return sendFallbackResponse(lastUserMessage);
  }

  try {
    // Map existing messaging history to Gemini SDK format
    // Convert frontend messages format to GoogleGenAI parts
    // We can use a direct generateContent or chat object
    const aiMessages = messages.map((m: any) => ({
      role: m.role === "user" ? "user" as const : "model" as const,
      parts: [{ text: m.content }],
    }));

    // Generate content using gemini-3.5-flash
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: aiMessages,
      config: {
        systemInstruction: PATNE_LEG_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I was unable to formulate a response. Please schedule a direct consultation with our advocates.";
    
    res.json({
      role: "assistant",
      content: replyText,
    });
  } catch (error: any) {
    console.error("Gemini API call failed:", error);
    // Graceful fallback during API failure
    sendFallbackResponse(lastUserMessage);
  }
});

// Configure Vite or Static Asset Serving
const startServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    
    app.use(vite.middlewares);
    console.log("Vite dev middleware mounted successfully.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving production static assets from /dist.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Patne Law Associates server operating at http://localhost:${PORT}`);
  });
};

startServer().catch((err) => {
  console.error("Failed to start full-stack server:", err);
});
