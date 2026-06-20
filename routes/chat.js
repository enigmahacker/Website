// Patne Legal Assistant — Gemini proxy with multi-turn history
const crypto = require('crypto');

const SYSTEM_INSTRUCTION = `You are the Patne Legal Assistant, the official AI guide for Patne Law Associates, a distinguished Indian law firm headquartered in Indore, Madhya Pradesh, with three decades of practice across the Supreme Court of India, High Courts (Madhya Pradesh, Chhattisgarh, Delhi, Aurangabad), district courts, tribunals, consumer forums, revenue courts, GST authorities, and quasi-judicial bodies. Founder & Managing Partner: Adv. Laxmikant Patne (B.A. LL.B. Hons., LL.M.). Senior Partner: Dr. Neerja Patne (B.A. LL.B. Hons., LL.M., Ph.D. Law).

Address: D-14 & 15, Bakhtawar Ram Nagar, Near Tilak Nagar, Indore, Madhya Pradesh — 452018.
Email: patneadv@gmail.com, drpatneadv@gmail.com. Phone: +91 94071 19583, +91 98263 81050.
Hours: Mon–Fri 4:00–6:30 PM, Sat 12:00–2:00 PM (IST).

Your voice: precise, dignified, calm, never casual. Avoid emojis. Write in clear British/Indian English. Use short paragraphs.

Your scope:
- Explain Indian legal concepts in plain language.
- Answer general legal information questions (procedure, jurisdiction, terminology).
- Summarise legal documents the user pastes.
- Guide users to the firm's relevant practice areas: Service Law, Civil Litigation, Real Estate & Property Law, Constitutional Matters, High Court Litigation, Supreme Court Litigation, Corporate Law, Commercial Disputes, Consumer Protection, Arbitration & ADR, Revenue Matters, Land Record Matters, Contract Law, Government & Administrative Law, CGST & SGST Matters, Trial Court Litigation, Family Law, Criminal Law, Labour Law.
- Help users navigate the website (/about, /practice-areas, /attorneys, /contact).
- Recommend booking a consultation when the matter is fact-specific, time-sensitive, or involves a deadline / hearing / notice.

Hard rules:
- Always end advice-shaped answers with a one-line reminder that this is general information, not legal advice, and a qualified advocate should be consulted.
- Never claim to file, draft, or sign on behalf of the user.
- Never request sensitive personal identifiers (Aadhaar, PAN, OTP, passwords).
- If the question is outside Indian law or outside your scope, say so briefly and offer to connect the user with the chambers.
- When recommending booking, suggest the exact path: /contact.

End every substantive reply with a short JSON block on its own final line, of the form:
[SUGGEST]: ["follow up question 1", "follow up question 2", "follow up question 3"]`;

module.exports = (db) => {
  const router = require('express').Router();

  // Create or resume a chat session
  router.post('/session', (req, res) => {
    const id = crypto.randomUUID();
    db.prepare('INSERT INTO chat_sessions (id, user_id) VALUES (?, ?)').run(id, req.session?.userId || null);
    res.json({ session_id: id });
  });

  // List messages
  router.get('/session/:id', (req, res) => {
    const rows = db.prepare('SELECT role, content, created_at FROM chat_messages WHERE session_id = ? ORDER BY id ASC').all(req.params.id);
    res.json({ messages: rows });
  });

  // Send a message
  router.post('/message', async (req, res) => {
    const { session_id, message } = req.body || {};
    if (!session_id || !message) return res.status(400).json({ error: 'session_id and message required' });
    if (typeof message !== 'string' || message.length > 4000) {
      return res.status(400).json({ error: 'Message too long.' });
    }

    // Verify session exists
    const sess = db.prepare('SELECT id FROM chat_sessions WHERE id = ?').get(session_id);
    if (!sess) return res.status(404).json({ error: 'Unknown session' });

    db.prepare('INSERT INTO chat_messages (session_id, role, content) VALUES (?, ?, ?)').run(session_id, 'user', message);

    const history = db.prepare('SELECT role, content FROM chat_messages WHERE session_id = ? ORDER BY id ASC').all(session_id);

    // Build Gemini contents array. Gemini expects roles: 'user' | 'model'.
    const contents = history.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      const stub = 'The assistant is not configured. Please contact the chambers at contact@patnelaw.in or visit /appointment.\n[SUGGEST]: ["Book a consultation","View practice areas","Contact the chambers"]';
      db.prepare('INSERT INTO chat_messages (session_id, role, content) VALUES (?, ?, ?)').run(session_id, 'assistant', stub);
      return res.json({ reply: stub, suggestions: ['Book a consultation', 'View practice areas', 'Contact the chambers'] });
    }

    try {
      const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
      const payload = {
        systemInstruction: { role: 'system', parts: [{ text: SYSTEM_INSTRUCTION }] },
        contents,
        generationConfig: { temperature: 0.4, topP: 0.9, maxOutputTokens: 1024 },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' }
        ]
      };

      const r = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!r.ok) {
        const txt = await r.text();
        console.error('Gemini error', r.status, txt.slice(0, 300));
        const fallback = 'I am unable to reach the legal knowledge service at the moment. Please try again shortly, or book a consultation at /appointment.\n[SUGGEST]: ["Try again","Book a consultation","Contact the chambers"]';
        db.prepare('INSERT INTO chat_messages (session_id, role, content) VALUES (?, ?, ?)').run(session_id, 'assistant', fallback);
        return res.json({ reply: fallback, suggestions: ['Try again', 'Book a consultation', 'Contact the chambers'] });
      }

      const data = await r.json();
      const raw = data?.candidates?.[0]?.content?.parts?.map(p => p.text).join('') || '';

      // Extract [SUGGEST]: [...] tail
      let reply = raw.trim();
      let suggestions = [];
      const m = reply.match(/\[SUGGEST\]:\s*(\[[\s\S]*?\])\s*$/);
      if (m) {
        try { suggestions = JSON.parse(m[1]); } catch (e) { suggestions = []; }
        reply = reply.slice(0, m.index).trim();
      }

      db.prepare('INSERT INTO chat_messages (session_id, role, content) VALUES (?, ?, ?)').run(session_id, 'assistant', reply);
      res.json({ reply, suggestions });
    } catch (e) {
      console.error('chat error', e);
      res.status(500).json({ error: 'Assistant unavailable.' });
    }
  });

  return router;
};
