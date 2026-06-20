// Patne Law Associates — Express server
require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const PORT = process.env.PORT || 3000;
const app = express();

// --- Database bootstrap -----------------------------------------------------
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
const db = new Database(path.join(dataDir, 'patne.db'));
db.pragma('journal_mode = WAL');

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'client',
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  practice_area TEXT,
  preferred_date TEXT,
  preferred_time TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS inquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS chat_sessions (
  id TEXT PRIMARY KEY,
  user_id INTEGER,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS chat_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);
`);

// --- Middleware -------------------------------------------------------------
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'patne-dev-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }
}));

// --- Routes -----------------------------------------------------------------
app.use('/api/appointments', require('./routes/appointments')(db));
app.use('/api/contact', require('./routes/contact')(db));
app.use('/api/chat', require('./routes/chat')(db));

// --- Static -----------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public'), {
  extensions: ['html'],
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

// Serve index.html for root
app.get('/', (_req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.use((_req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'), err => {
    if (err) res.status(404).send('Not found');
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Patne Law Associates listening on port ${PORT}`);
});
