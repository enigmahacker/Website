var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
var bookings = [];
var ai = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    ai = new import_genai.GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  } else {
    console.warn("GEMINI_API_KEY is not defined or is placeholder. Falling back to local smart advisor mode for legal guidance.");
  }
} catch (error) {
  console.error("Failed to initialize GoogleGenAI client:", error);
}
var PATNE_LEG_SYSTEM_INSTRUCTION = `You are the "Patne Legal Assistant", an elite, sophisticated, and highly structured legal information advisor representing Patne Law Associates. 
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
app.post("/api/book", (req, res) => {
  const { name, email, phone, date, time, category, description, courtVenue } = req.body;
  if (!name || !phone || !date || !time || !category) {
    return res.status(400).json({ error: "Please fill in all required fields." });
  }
  const newBooking = {
    id: "PLA-" + Math.floor(Math.random() * 9e4 + 1e4),
    name,
    email: email || "N/A",
    phone,
    date,
    time,
    category,
    description: description || "General inquiry",
    courtVenue: courtVenue || "Indore Office",
    status: "Confirmed",
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
  bookings.push(newBooking);
  console.log("Registered Booking:", newBooking);
  res.status(201).json({ success: true, booking: newBooking });
});
app.get("/api/bookings", (req, res) => {
  res.json({ bookings });
});
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array is required." });
  }
  const lastUserMessage = messages[messages.length - 1]?.content;
  if (!lastUserMessage) {
    return res.status(400).json({ error: "Valid content in last message is required." });
  }
  const sendFallbackResponse = (userQuery) => {
    const q = userQuery.toLowerCase();
    let reply = "";
    if (q.includes("service") || q.includes("employer") || q.includes("termination") || q.includes("promotion")) {
      reply = `### **Service & Employment Law Advisory** 

Patne Law Associates enjoys a celebrated legacy in Service Law disputes. Under the expert leadership of **Adv. Laxmikant Patne**, our firm regularly represents clients before the **Central Administrative Tribunal (CAT)**, the **Madhya Pradesh High Court**, and the **Supreme Court of India**.

**Key Service Law Specialties:**
* Pension and Retiral Benefits
* Arbitrary Disciplinary Inquiries & Suspensions
* Seniority, Pay Fixation, and Promotion disputes
* Wrap-around challenging of wrongful terminations.

*Recommendation:* Since service disputes have strict statutory limitations (e.g., under the Administrative Tribunals Act, 1985), I highly recommend scheduling a formal consultation through our client dashboard of this website.`;
    } else if (q.includes("property") || q.includes("real estate") || q.includes("land") || q.includes("revenue")) {
      reply = `### **Real Estate & Land Revenue Matters** 

Our property practice is led by **Dr. Neerja Patne**, specializing in Land Revenue laws, Title Clearances, and Commercial Real Estate conflicts under Madhya Pradesh Land Revenue Code (MPLRC) and national acts.

**Specialized Representation:**
* Title verifications and legal searches
* Partition suits, declaration decrees, and injunction briefs
* Representation before the Revenue Courts (Tehsildar, Sub-Divisional Officer, Collector, and Board of Revenue).

*Advocate Suggestion:* Please navigate to the **Appointment Booking** section of our website to schedule a file-review mapping with Dr. Neerja Patne.`;
    } else if (q.includes("supreme court") || q.includes("delhi") || q.includes("high court")) {
      reply = `### **High Court & Supreme Court Appellate Practice**

Patne Law Associates maintains an elite appellate desk led by our managing partners. We render strategic legal draftings (Writ Petitions, Special Leave Petitions, and Appeals) before:
* The Supreme Court of India (New Delhi)
* Madhya Pradesh High Court (Indore, Jabalpur, Gwalior)
* Chhattisgarh High Court (Bilaspur)
* High Court of Bombay (Aurangabad Bench)

We provide critical strategic evaluations for challenging lower court orders under the Indian Constitution.`;
    } else if (q.includes("cost") || q.includes("fee") || q.includes("price") || q.includes("charge")) {
      reply = `### **Fee Structure and Initial Case Evaluation**

At Patne Law Associates, professional fees are structured specifically to the complexity, forum of representation, and research required for your brief.

* **Initial Meeting:** An academic file review is conducted during your consultation booking.
* **Standard Retainership & Appearance Rates:** Communicated transparently once the scope of the appellate or trial draft has been mapped.

Would you like me to guide you directly to our **Appointment Booking** section to establish a formal slot?`;
    } else {
      reply = `### **Patne Law Associates Legal Consultation Desk**

Thank you for reaching out to Patne Law Associates. With over **three decades of legal heritage**, we provide strategic representation spanning **Constitutional, Service, Civil, Corporate, Revenue, and Appellate Litigations** across India.

To better serve you, could you please specify which domain your query concerns?
1. **Service & Government Employment Law** (Suspensions, promotions, pension claims)
2. **Constitutional Writs or Appellate Advocacy** (High Court & Supreme Court)
3. **Real Estate, Land Revenue, & GST Matters**
4. **Commercial Contracts and Civil Disputes**

*A reminder:* For actionable strategy, please lock in an exclusive session via our online calendar, or call us at **+91 9407119583**.`;
    }
    return res.json({
      role: "assistant",
      content: `${reply}

*\u2014 Patne Legal Assistant provides general legal information only. Consult a qualified advocate for official legal counsel.*`
    });
  };
  if (!ai) {
    return sendFallbackResponse(lastUserMessage);
  }
  try {
    const aiMessages = messages.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }]
    }));
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: aiMessages,
      config: {
        systemInstruction: PATNE_LEG_SYSTEM_INSTRUCTION,
        temperature: 0.7
      }
    });
    const replyText = response.text || "I was unable to formulate a response. Please schedule a direct consultation with our advocates.";
    res.json({
      role: "assistant",
      content: replyText
    });
  } catch (error) {
    console.error("Gemini API call failed:", error);
    sendFallbackResponse(lastUserMessage);
  }
});
var startServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
    console.log("Vite dev middleware mounted successfully.");
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
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
//# sourceMappingURL=server.cjs.map
