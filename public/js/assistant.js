// Patne Legal Assistant — client
(() => {
  const $ = (s) => document.querySelector(s);
  const messagesEl = $('#messages');
  const suggestionsEl = $('#suggestions');
  const form = $('#chatForm');
  const input = $('#chatInput');
  const sendBtn = $('#sendBtn');
  const newChatBtn = $('#newChat');

  let sessionId = null;

  const STORE_KEY = 'patne-chat-session';

  // Restore or create session
  async function ensureSession() {
    if (sessionId) return sessionId;
    const stored = localStorage.getItem(STORE_KEY);
    if (stored) {
      sessionId = stored;
      // load history
      try {
        const r = await fetch(`/api/chat/session/${sessionId}`);
        if (r.ok) {
          const { messages } = await r.json();
          if (messages && messages.length) {
            // Clear welcome bubble if history exists
            messagesEl.innerHTML = '';
            messages.forEach(m => appendBubble(m.role, m.content));
          }
        }
      } catch (e) { /* ignore */ }
      return sessionId;
    }
    const r = await fetch('/api/chat/session', { method: 'POST' });
    const j = await r.json();
    sessionId = j.session_id;
    localStorage.setItem(STORE_KEY, sessionId);
    return sessionId;
  }

  function appendBubble(role, text) {
    const div = document.createElement('div');
    div.className = `bubble ${role === 'user' ? 'user' : 'assistant'}`;
    div.textContent = text;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return div;
  }

  function appendTyping() {
    const div = document.createElement('div');
    div.className = 'bubble assistant typing';
    div.innerHTML = `<span class="dot"></span><span class="dot"></span><span class="dot"></span> drafting reply`;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return div;
  }

  function renderSuggestions(items) {
    suggestionsEl.innerHTML = '';
    if (!items || !items.length) return;
    items.slice(0, 4).forEach(t => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = t;
      b.addEventListener('click', () => {
        input.value = t;
        sendMessage();
      });
      suggestionsEl.appendChild(b);
    });
  }

  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    input.style.height = 'auto';
    suggestionsEl.innerHTML = '';
    sendBtn.disabled = true;

    await ensureSession();
    appendBubble('user', text);
    const typing = appendTyping();

    try {
      const r = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, message: text })
      });
      typing.remove();
      if (!r.ok) {
        appendBubble('assistant', 'I am unable to reach the assistant right now. Please try again, or write to contact@patnelaw.in.');
        return;
      }
      const j = await r.json();
      appendBubble('assistant', j.reply || '');
      renderSuggestions(j.suggestions);
    } catch (e) {
      typing.remove();
      appendBubble('assistant', 'Connection error. Please try again.');
    } finally {
      sendBtn.disabled = false;
      input.focus();
    }
  }

  form.addEventListener('submit', (e) => { e.preventDefault(); sendMessage(); });

  // Enter to send, Shift+Enter for newline
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Auto-grow textarea
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(120, input.scrollHeight) + 'px';
  });

  // Sidebar suggestions
  document.querySelectorAll('.chat__sidebar button[data-q]').forEach(btn => {
    btn.addEventListener('click', () => {
      input.value = btn.dataset.q;
      sendMessage();
    });
  });

  // New chat
  newChatBtn.addEventListener('click', async () => {
    localStorage.removeItem(STORE_KEY);
    sessionId = null;
    messagesEl.innerHTML = '<div class="bubble assistant">A new conversation. What would you like to discuss?</div>';
    suggestionsEl.innerHTML = '';
    await ensureSession();
    input.focus();
  });

  // Init
  ensureSession();
})();
