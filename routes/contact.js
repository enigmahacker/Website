// Contact form API
module.exports = (db) => {
  const router = require('express').Router();

  router.post('/', (req, res) => {
    const { name, email, phone, subject, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }
    db.prepare(`INSERT INTO inquiries (name, email, phone, subject, message)
      VALUES (?, ?, ?, ?, ?)`).run(name, email, phone || null, subject || null, message);
    res.json({
      ok: true,
      message: 'Thank you. A member of our chambers will respond within one business day.'
    });
  });

  return router;
};
