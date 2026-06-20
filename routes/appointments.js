// Appointments API
module.exports = (db) => {
  const router = require('express').Router();

  router.post('/', (req, res) => {
    const { name, email, phone, practice_area, preferred_date, preferred_time, message } = req.body || {};
    if (!name || !email) return res.status(400).json({ error: 'Name and email are required.' });
    const stmt = db.prepare(`INSERT INTO appointments
      (name, email, phone, practice_area, preferred_date, preferred_time, message)
      VALUES (?, ?, ?, ?, ?, ?, ?)`);
    const info = stmt.run(name, email, phone || null, practice_area || null,
      preferred_date || null, preferred_time || null, message || null);
    res.json({
      ok: true,
      id: info.lastInsertRowid,
      confirmation: `PLA-${String(info.lastInsertRowid).padStart(6, '0')}`,
      message: 'Your consultation request has been received. Our chambers will confirm by email within one business day.'
    });
  });

  router.get('/', (req, res) => {
    // basic admin guard (placeholder — wire to session role later)
    if (req.query.key !== process.env.SESSION_SECRET) return res.status(403).json({ error: 'forbidden' });
    res.json(db.prepare('SELECT * FROM appointments ORDER BY created_at DESC LIMIT 200').all());
  });

  return router;
};
