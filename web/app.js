// Start Here: the welcome guide for new Secondary students. Plain JS, hash routes, no build step.
import { SITE, FACTS, DAY, MYTHS, EVENTS, GRADES, GLOSSARY, CHECKLIST, QUIZ, AMBASSADORS, CALENDAR, HELP, MYP, MYP_GROUPS, DP } from './content.js';
import { trail, GRADE_ART, MINI } from './art.js';
import { answer, SUGGESTIONS } from './guide.js';

const $app = document.getElementById('app');
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const store = {
  get: (k, d) => { try { return JSON.parse(localStorage.getItem('sh.' + k)) ?? d; } catch { return d; } },
  set: (k, v) => { try { localStorage.setItem('sh.' + k, JSON.stringify(v)); } catch {} },
};
const S = { lang: store.get('lang', 'en'), q: '', quiz: [], grade: store.get('grade', null), sent: null, mark: 6, chat: store.get('chat', []) };
const todo = '<span class="todo">The grade team is writing this</span>';

// progress along the trail = which stops the student has visited
function visited(stop) { const v = new Set(store.get('visited', [])); v.add(stop); store.set('visited', [...v]); }
const trailDone = () => store.get('visited', []);

function daysTo(iso) { return Math.ceil((new Date(iso) - Date.now()) / 864e5); }
function countLine() {
  const o = daysTo(SITE.orientation), f = daysTo(SITE.firstDay);
  if (o > 0) return `Orientation Morning is in <b>${o} days</b>. Your first lessons start ${f} days from now.`;
  if (f > 0) return `Your first day is in <b>${f} days</b>.`;
  return 'Welcome to Secondary. We are glad you are here.';
}

// ---------- pages ----------
function home() {
  return `
  <section class="hero">
    <div class="hero-text">
      <p class="hello">Hello, new Grade 6–11 student.</p>
      <h1>Your first weeks at St.&nbsp;Nicholas, figured out by the students who were new before you.</h1>
      <p class="count">${countLine()}</p>
      <div class="hero-cta"><a class="btn y" href="#/grades">Find your grade</a><button class="btn ghost" data-act="chat">Ask the guide a question</button></div>
    </div>
    <div class="hero-map">${trail(trailDone())}<p class="map-note">Tap a stop. It turns green once you have been there.</p></div>
  </section>

  <section class="band">
    <div class="sec-head"><h2>Six chapters, one for each grade</h2><p>Pick yours. Each one is written by Ambassadors from that grade.</p></div>
    <div class="tickets">${Object.keys(GRADES).map((n) => ticket(n)).join('')}</div>
  </section>

  <section class="band split">
    <div>
      <h2>St. Nicholas in four numbers</h2>
      <dl class="nums">${FACTS.map((f) => `<div><dt>${esc(f.n)}</dt><dd>${esc(f.t)}</dd></div>`).join('')}</dl>
    </div>
    <div class="aside-card">
      <h3>A normal day</h3>
      <div class="clockline"><span>08:00</span><i></i><span>15:40</span></div>
      <p>Everyone in Secondary starts and finishes at the same time. Classes change by subject, so you move rooms and meet different people all day.</p>
      <a class="link" href="#/day">See the whole day</a>
    </div>
  </section>

  <section class="band">
    <div class="sec-head"><h2>Things people worry about</h2><p>Tap a card to see what is actually true.</p></div>
    <div class="notes">${MYTHS.map((m, i) => `<button class="note" data-flip style="--r:${[-1.6, 1.2, -0.8, 1.8][i % 4]}deg"><span class="nq">${esc(m.q)}</span><span class="na"><b>${esc(m.a)}</b> ${esc(m.p)}</span></button>`).join('')}</div>
  </section>

  <section class="band">
    <div class="sec-head"><h2>Everything in this guide</h2></div>
    <div class="index">
      ${idx('#/day', MINI.day, 'A day here', 'From 08:00 to 15:40, step by step.')}
      ${idx('#/ib', MINI.ib, 'The IB, simply', 'MYP and DP: subjects, marks and the core.')}
      ${idx('#/glossary', MINI.words, 'The words everyone uses', '21 words in English and Portuguese.')}
      ${idx('#/help', MINI.help, 'Who to ask', 'The right person for each kind of problem.')}
      ${idx('#/calendar', MINI.cal, 'Key dates', 'Orientation, first day, holidays.')}
      ${idx('#/events', MINI.year, 'The year', 'Spelling Bee, International Day, MUNicks, Made in Brazil.')}
    </div>
  </section>

  <section class="band">
    <div class="sec-head"><h2>The people who wrote this</h2><p>Secondary Ambassadors. Look for us at break on Wednesdays.</p></div>
    <ul class="people">${AMBASSADORS.map(([n, g]) => `<li><span class="av">${esc(n[0])}</span><b>${esc(n)}</b><small>Grade ${g}</small></li>`).join('')}<li class="more">More of us, with photos, soon</li></ul>
  </section>`;
}
const ticket = (n) => `<a class="ticket ${String(S.grade) === n ? 'mine' : ''}" href="#/grade/${n}"><div class="tart">${GRADE_ART[n]}</div><div class="ttext"><span class="tn">Grade ${n}</span><b>${esc(GRADES[n].title)}</b></div></a>`;
const idx = (h, icon, t, p) => `<a class="ix" href="${h}"><span class="ic">${icon}</span><span><b>${esc(t)}</b><small>${esc(p)}</small></span></a>`;

function pageHead(title, sub, extra = '') { return `<header class="phead"><h1>${title}</h1>${sub ? `<p>${sub}</p>` : ''}${extra}</header>`; }

function grades() {
  visited(1);
  return pageHead('Find your grade', 'Six chapters. Pick the grade you are joining.') + `<section class="band"><div class="tickets big">${Object.keys(GRADES).map((n) => ticket(n)).join('')}</div></section>`;
}

function grade(n) {
  const G = GRADES[n];
  if (!G) return grades();
  S.grade = n; store.set('grade', n); visited(1);
  const prog = +n <= 10 ? 'myp' : 'dp';
  return `
  <header class="chapter">
    <div class="cart">${GRADE_ART[n]}</div>
    <div class="ctext"><p class="cnum">Chapter ${+n - 5} of 6</p><h1>Grade ${n}: ${esc(G.title)}</h1><p class="clead">${esc(G.lead)}</p></div>
    <nav class="gswitch" aria-label="Other grades">${Object.keys(GRADES).map((k) => `<a href="#/grade/${k}" class="${k === String(n) ? 'on' : ''}">${k}</a>`).join('')}</nav>
  </header>
  <section class="band">
    <h2>What matters this year</h2>
    <div class="topics">${G.cards.map((c) => `<article class="topic ${c.todo ? 'is-todo' : ''}"><h3>${esc(c.h)}</h3><p>${esc(c.p)}</p>${c.todo ? todo : ''}</article>`).join('')}</div>
  </section>
  <section class="band tint">
    <h2>${prog === 'myp' ? 'Your programme: the MYP' : 'Your programme: the DP'}</h2>
    <div class="facts-list">${(prog === 'myp' ? MYP : DP).map((x) => `<div><b>${esc(x.h)}</b><p>${esc(x.p)}</p></div>`).join('')}</div>
    <a class="link" href="#/ib">The IB, simply</a>
  </section>
  <section class="band">
    <div class="askbox"><div><h2>A question about Grade ${n}?</h2><p>An Ambassador from Grade ${n} will answer.</p></div><a class="btn" href="#/ask">Ask an Ambassador</a></div>
    <p class="credit">Grade ${n} chapter by ${esc(G.team)}.</p>
  </section>`;
}

function day() {
  return pageHead('A day here', 'The shape of a normal Secondary day.') + `
  <section class="band"><ol class="tl">${DAY.map((d) => `<li><time>${esc(d.t)}</time><div><b>${esc(d.h)}</b><p>${esc(d.p)}</p></div></li>`).join('')}</ol>
  <p class="todo-line">${todo}: a real Grade 6 day and a real Grade 11 day, hour by hour.</p></section>`;
}

function ib() {
  const band = S.mark === 0 ? 'Not shown yet' : S.mark <= 2 ? 'Limited' : S.mark <= 4 ? 'Adequate' : S.mark <= 6 ? 'Substantial' : 'Excellent';
  return pageHead('The IB, simply', 'St. Nicholas teaches the IB from Early Years to Grade 12. In Secondary you are in one of two programmes.') + `
  <section class="band two">
    <article class="prog"><p class="pg">Grades 6 to 10</p><h2>The MYP</h2><p>Middle Years Programme. Eight subject groups, every year:</p>
      <ul class="groups">${MYP_GROUPS.map((g) => `<li>${esc(g)}</li>`).join('')}</ul>
      ${MYP.slice(1).map((x) => `<h3>${esc(x.h)}</h3><p>${esc(x.p)}</p>`).join('')}</article>
    <article class="prog dark"><p class="pg">Grades 11 and 12</p><h2>The DP</h2><p>Diploma Programme.</p>
      ${DP.map((x) => `<h3>${esc(x.h)}</h3><p>${esc(x.p)}</p>`).join('')}
      <div class="pts"><span style="--w:93%">42 from your six subjects</span><span style="--w:7%">+3</span></div><p class="small">Maximum: 45 points.</p></article>
  </section>
  <section class="band tint">
    <h2>What does an MYP mark mean?</h2><p>Each criterion is marked from 0 to 8. Slide to see what a mark says.</p>
    <div class="marker"><input type="range" min="0" max="8" value="${S.mark}" id="mark" aria-label="Mark from 0 to 8"><div class="mk"><b>${S.mark}</b><span>out of 8</span><em>${band}</em></div></div>
    <p class="small">The bands (1–2, 3–4, 5–6, 7–8) are the same in every MYP subject. Your teacher’s rubric says exactly what each band means for a task.</p>
  </section>`;
}

function glossary() {
  visited(2);
  return pageHead('The words everyone uses', 'Type a word you heard in class or in the corridor.', `
    <div class="search"><input id="gq" type="search" placeholder="CAS, criteria, tutor group…" value="${esc(S.q)}" autocomplete="off" aria-label="Search the glossary">
    <div class="seg" role="group" aria-label="Language">${[['en', 'English'], ['pt', 'Português'], ['both', 'Both']].map(([k, l]) => `<button data-lang="${k}" class="${S.lang === k ? 'on' : ''}">${l}</button>`).join('')}</div></div>`) +
  `<section class="band"><dl class="gl" id="gl">${glossRows()}</dl></section>`;
}
function glossRows() {
  const q = S.q.trim().toLowerCase();
  const list = GLOSSARY.filter(([w, en, pt]) => !q || (w + ' ' + en + ' ' + pt).toLowerCase().includes(q));
  if (!list.length) return `<p class="empty">“${esc(S.q)}” is not here yet. <a href="#/ask">Ask an Ambassador</a> and we will add it.</p>`;
  return list.map(([w, en, pt]) => `<div class="gw"><dt>${esc(w)}</dt><dd>${S.lang !== 'pt' ? `<p>${esc(en)}</p>` : ''}${S.lang !== 'en' ? `<p class="pt">${esc(pt)}</p>` : ''}</dd></div>`).join('');
}

function help() {
  return pageHead('Who to ask', 'Nobody expects you to know everything in your first weeks. Start at the top.') + `
  <section class="band"><ol class="ladder">${HELP.map((h) => `<li><b>${esc(h.who)}</b><p>${esc(h.when)}</p></li>`).join('')}</ol>
  <div class="askbox"><div><h2>Not sure who?</h2><p>Ask the guide, or send your question to an Ambassador.</p></div><button class="btn" data-act="chat">Ask the guide</button></div></section>`;
}

function calendar() {
  visited(0);
  return pageHead('Key dates', 'The school year 2026–27, from January.') + `
  <section class="band"><ul class="dates">${CALENDAR.map(([d, t]) => `<li><time>${esc(d)}</time><span>${esc(t)}</span></li>`).join('')}</ul></section>`;
}

function events() {
  return pageHead('The year', 'Four big events you can be part of.') + `
  <section class="band"><div class="events">${EVENTS.map((e) => `<article><p class="when">${esc(e.when)}</p><h2>${esc(e.k)}</h2><p>${esc(e.d)}</p></article>`).join('')}</div>
  <p class="todo-line">${todo}: how to sign up for each one.</p></section>`;
}

function checklist() {
  visited(3);
  const ticks = new Set(store.get('check', []));
  const pct = Math.round((ticks.size / CHECKLIST.length) * 100);
  return pageHead('Week one', 'Small goals, one at a time. Saved on this phone only.', `<div class="ring" style="--p:${pct}"><b>${ticks.size}</b><span>of ${CHECKLIST.length}</span></div>`) + `
  <section class="band"><ul class="check">${CHECKLIST.map((c, i) => `<li><label><input type="checkbox" data-check="${i}" ${ticks.has(i) ? 'checked' : ''}><span>${esc(c)}</span></label></li>`).join('')}</ul></section>`;
}

function quiz() {
  visited(4);
  const i = S.quiz.length, n = QUIZ.questions.length;
  if (i < n) {
    const Q = QUIZ.questions[i];
    return pageHead(esc(Q.q), `Question ${i + 1} of ${n}`, `<div class="bar"><i style="width:${(i / n) * 100}%"></i></div>`) +
      `<section class="band"><div class="answers">${Q.a.map(([t, k]) => `<button class="ans" data-ans="${k}">${esc(t)}</button>`).join('')}</div></section>`;
  }
  const count = {}; S.quiz.forEach((k) => { count[k] = (count[k] || 0) + 1; });
  const R = QUIZ.results[Object.entries(count).sort((a, b) => b[1] - a[1])[0][0]];
  return pageHead(esc(R.h), esc(R.p)) + `<section class="band"><button class="btn" data-act="quizAgain">Take the quiz again</button> <a class="btn ghost-d" href="#/events">See the year’s events</a></section>`;
}

function ask() {
  visited(5);
  const pre = esc(store.get('draft', ''));
  return pageHead('Ask an Ambassador', 'No question is too small. An Ambassador from your grade answers within two days, in person or through your tutor.') + `
  <section class="band">${S.sent ? `<div class="sent"><h2>Question sent</h2><p>An Ambassador from Grade ${esc(S.sent)} will find you within two days.</p><button class="btn ghost-d" data-act="askAgain">Ask another question</button></div>` : `
    <form id="askForm" class="form">
      <label>Your grade<select name="grade" required>${Object.keys(GRADES).map((n) => `<option value="${n}" ${String(S.grade) === n ? 'selected' : ''}>Grade ${n}</option>`).join('')}</select></label>
      <label>Your first name<input name="name" required maxlength="60" autocomplete="given-name"></label>
      <label>Tutor group, if you know it<input name="tutor_group" maxlength="40"></label>
      <label>Your question<textarea name="question" required minlength="3" maxlength="800" rows="4" placeholder="Where is the library? What should I bring on Monday?">${pre}</textarea></label>
      <p class="small">Only the Ambassadors and the Admissions team see your question. Do not write phone numbers or addresses.</p>
      <button class="btn" type="submit">Send question</button><p class="err" id="askErr"></p>
    </form>`}</section>`;
}

function me() {
  return pageHead('My page', 'Saved on this phone only.') + `<section class="band two">
    <div class="paper"><h2>My Ambassador</h2><input data-me="buddy" placeholder="Their name" value="${esc(store.get('buddy', ''))}" aria-label="My Ambassador's name"><input data-me="buddyWhere" placeholder="Where to find them" value="${esc(store.get('buddyWhere', ''))}" aria-label="Where to find them"></div>
    <div class="paper lined"><h2>A letter to myself</h2><p class="small">Write it on your first day. Read it again at the end of your first term.</p><textarea data-me="letter" rows="8" placeholder="Dear me," aria-label="Letter to myself">${esc(store.get('letter', ''))}</textarea></div></section>`;
}

// ---------- the guide (chat) ----------
const $chat = document.getElementById('chat');
function chatHtml() {
  const msgs = S.chat.length ? S.chat : [{ me: false, t: 'Hi! I answer only from this guide, so I never make things up. If I do not know, I will send your question to an Ambassador.' }];
  return `<div class="chat-head"><div><b>Ask the guide</b><small>Answers come only from this site</small></div><button class="x" data-act="chatClose">Close</button></div>
    <div class="chat-log" id="chatLog" aria-live="polite">${msgs.map((m) => `<div class="msg ${m.me ? 'me' : ''}">${m.me ? esc(m.t) : m.t}</div>`).join('')}</div>
    <div class="chips">${SUGGESTIONS.map((s) => `<button data-sugg="${esc(s)}">${esc(s)}</button>`).join('')}</div>
    <form id="chatForm" class="chat-in"><input id="chatQ" autocomplete="off" placeholder="Type a question, in English or Portuguese" aria-label="Your question"><button class="btn" type="submit">Send</button></form>`;
}
function drawChat() { $chat.innerHTML = chatHtml(); const l = document.getElementById('chatLog'); l.scrollTop = l.scrollHeight; }
function reply(q) {
  const a = answer(q);
  S.chat.push({ me: true, t: q });
  if (a) S.chat.push({ me: false, t: `${esc(a.a)}<a class="src" href="${a.link}">Read more: ${esc(a.label)}</a>` });
  else { store.set('draft', q); S.chat.push({ me: false, t: 'That is not in the guide yet, so I will not guess.<a class="src" href="#/ask">Send it to an Ambassador</a>' }); }
  S.chat = S.chat.slice(-30); store.set('chat', S.chat);
  drawChat(); document.getElementById('chatQ').focus();
}
function openChat(open) { $chat.hidden = !open; document.body.classList.toggle('chat-open', open); if (open) { drawChat(); setTimeout(() => document.getElementById('chatQ')?.focus(), 50); } }

// ---------- router ----------
function route() {
  const [a, b] = location.hash.replace(/^#\/?/, '').split('/');
  document.getElementById('drawer').hidden = true;
  const views = { '': home, grades, day, ib, glossary, help, calendar, events, checklist, quiz, ask, me };
  $app.innerHTML = a === 'grade' ? grade(b) : (views[a] || home)();
  document.body.dataset.page = a || 'home';
  document.querySelectorAll('[data-t]').forEach((x) => x.classList.toggle('on', x.dataset.t === (a === 'grade' ? 'grades' : a || 'home')));
  openChat(false);
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);
route();

document.getElementById('menuBtn').onclick = () => { const d = document.getElementById('drawer'); d.hidden = !d.hidden; };
document.addEventListener('click', (e) => {
  const flip = e.target.closest('[data-flip]'); if (flip) return flip.classList.toggle('open');
  const l = e.target.closest('[data-lang]'); if (l) { S.lang = l.dataset.lang; store.set('lang', S.lang); return route(); }
  const ans = e.target.closest('[data-ans]'); if (ans) { S.quiz.push(ans.dataset.ans); return route(); }
  const sg = e.target.closest('[data-sugg]'); if (sg) return reply(sg.dataset.sugg);
  const act = e.target.closest('[data-act]')?.dataset.act;
  if (act === 'chat') openChat(true);
  if (act === 'chatClose') openChat(false);
  if (act === 'quizAgain') { S.quiz = []; route(); }
  if (act === 'askAgain') { S.sent = null; route(); }
});
document.addEventListener('input', (e) => {
  if (e.target.id === 'gq') { S.q = e.target.value; document.getElementById('gl').innerHTML = glossRows(); }
  if (e.target.id === 'mark') {
    S.mark = +e.target.value;
    const band = S.mark === 0 ? 'Not shown yet' : S.mark <= 2 ? 'Limited' : S.mark <= 4 ? 'Adequate' : S.mark <= 6 ? 'Substantial' : 'Excellent';
    const mk = document.querySelector('.mk'); mk.querySelector('b').textContent = S.mark; mk.querySelector('em').textContent = band;
  }
  const m = e.target.dataset?.me; if (m) store.set(m, e.target.value);
});
document.addEventListener('change', (e) => {
  const c = e.target.dataset?.check;
  if (c !== undefined) {
    const t = new Set(store.get('check', [])); e.target.checked ? t.add(+c) : t.delete(+c); store.set('check', [...t]);
    const ring = document.querySelector('.ring'); ring.style.setProperty('--p', Math.round((t.size / CHECKLIST.length) * 100)); ring.querySelector('b').textContent = t.size;
  }
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !$chat.hidden) openChat(false); });
document.addEventListener('submit', async (e) => {
  if (e.target.id === 'chatForm') { e.preventDefault(); const q = document.getElementById('chatQ').value.trim(); if (q) reply(q); return; }
  if (e.target.id !== 'askForm') return;
  e.preventDefault();
  const f = new FormData(e.target); const btn = e.target.querySelector('button'); btn.disabled = true;
  const body = { grade: +f.get('grade'), name: String(f.get('name')).trim(), tutor_group: String(f.get('tutor_group') || '').trim() || null, question: String(f.get('question')).trim() };
  try {
    const C = window.BOOKLET;
    const r = await fetch(`${C.supabaseUrl}/rest/v1/booklet_questions`, { method: 'POST', headers: { apikey: C.anonKey, Authorization: `Bearer ${C.anonKey}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' }, body: JSON.stringify(body) });
    if (!r.ok) throw new Error();
    store.set('draft', ''); S.sent = body.grade; route();
  } catch { btn.disabled = false; document.getElementById('askErr').textContent = 'Your question was not sent. Check the internet and press Send question again.'; }
});
