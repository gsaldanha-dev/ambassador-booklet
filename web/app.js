// Start Here: the welcome site for new Secondary students. Plain JS, hash routes, no build step.
import { SITE, FACTS, DAY, MYTHS, EVENTS, GRADES, GLOSSARY, CHECKLIST, QUIZ, AMBASSADORS } from './content.js';

const $app = document.getElementById('app');
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const store = {
  get: (k, d) => { try { return JSON.parse(localStorage.getItem('sh.' + k)) ?? d; } catch { return d; } },
  set: (k, v) => { try { localStorage.setItem('sh.' + k, JSON.stringify(v)); } catch {} },
};
const S = { lang: store.get('lang', 'en'), q: '', quiz: [], grade: store.get('grade', null) };
const dots = '<span class="dots"><i></i><i></i><i></i></span>';
const kicker = (t) => `<div class="kicker">${dots}${esc(t)}</div>`;
const todoTag = '<span class="todo">Being written by the grade team</span>';

// ---------- countdown ----------
function until(iso) {
  const ms = new Date(iso) - Date.now();
  if (ms <= 0) return null;
  const d = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5) % 24, m = Math.floor(ms / 6e4) % 60;
  return { d, h, m };
}
function countdown() {
  const o = until(SITE.orientation), f = until(SITE.firstDay);
  const c = o || f;
  if (!c) return '';
  return `<div class="count"><div class="cl">${o ? 'Orientation Morning' : 'Your first day'} in</div>
    <div class="cn"><span><b>${c.d}</b>days</span><span><b>${c.h}</b>hours</span><span><b>${c.m}</b>min</span></div>
    <div class="cs">${o ? 'Friday 22 January · first day of lessons Tuesday 26 January' : 'Tuesday 26 January'}</div></div>`;
}

// ---------- screens ----------
function home() {
  const g = S.grade;
  return `
  <section class="hero">
    ${kicker('Secondary · New students')}
    <h1>Welcome. <em>Start here.</em></h1>
    <p class="lead">Everything we wish someone had told us before our first day, written by the Secondary Ambassadors.</p>
    ${countdown()}
  </section>
  <section class="wrap">
    <h2 class="h2">Which grade are you joining?</h2>
    <div class="grades">${Object.keys(GRADES).map((n) => `<a class="gcard ${String(g) === n ? 'on' : ''}" href="#/grade/${n}"><b>${n}</b><span>${esc(GRADES[n].title)}</span></a>`).join('')}</div>
  </section>
  <section class="wrap facts">${FACTS.map((f) => `<div><b>${esc(f.n)}</b><span>${esc(f.t)}</span></div>`).join('')}</section>
  <section class="wrap">
    <h2 class="h2">Start with these</h2>
    <div class="tiles">
      ${tile('#/day', '08:00 → 15:40', 'A day here', 'How a Secondary day works.')}
      ${tile('#/glossary', 'MYP · DP · CAS', 'The words everyone uses', 'Search any word you heard, in English or Portuguese.')}
      ${tile('#/checklist', `${done()}/${CHECKLIST.length}`, 'Your first week', 'Small goals to tick off.')}
      ${tile('#/quiz', '5 questions', 'Which club is for you?', 'A quick quiz to find where you fit.')}
      ${tile('#/events', '4 big events', 'The year at a glance', 'Spelling Bee, International Day and more.')}
      ${tile('#/ask', 'Answered in 2 days', 'Ask an Ambassador', 'Any question, to someone from your grade.')}
    </div>
  </section>
  <section class="wrap">
    <h2 class="h2">Myth or reality?</h2>
    <p class="muted">Tap a card.</p>
    <div class="myths">${MYTHS.map((m, i) => `<button class="myth" data-flip="${i}"><span class="mq">${esc(m.q)}</span><span class="ma"><b>${esc(m.a)}</b> ${esc(m.p)}</span></button>`).join('')}</div>
  </section>
  <section class="wrap">
    <h2 class="h2">Who we are</h2>
    <p class="muted">The Ambassadors welcome new students and families. Look for us, we are happy to help.</p>
    <div class="amb">${AMBASSADORS.map(([n, g]) => `<span><i>${esc(n[0])}</i>${esc(n)}<small>Grade ${g}</small></span>`).join('')}<span class="more">More names and photos coming</span></div>
  </section>`;
}
function tile(href, tag, h, p) { return `<a class="tile" href="${href}"><span class="tag">${esc(tag)}</span><b>${esc(h)}</b><span>${esc(p)}</span><i>→</i></a>`; }

function grade(n) {
  const G = GRADES[n];
  if (!G) return home();
  S.grade = n; store.set('grade', n);
  return `
  <section class="hero compact">
    ${kicker(`Grade ${n}`)}
    <h1>${esc(G.title)}</h1>
    <p class="lead">${esc(G.lead)}</p>
    <div class="gpills">${Object.keys(GRADES).map((k) => `<a href="#/grade/${k}" class="${k === String(n) ? 'on' : ''}">G${k}</a>`).join('')}</div>
  </section>
  <section class="wrap">
    <div class="gcards">${G.cards.map((c) => `<article class="gc ${c.todo ? 'is-todo' : ''}"><h3>${esc(c.h)}</h3><p>${esc(c.p)}</p>${c.todo ? todoTag : ''}</article>`).join('')}</div>
    <p class="muted small">Grade ${n} pages by: ${esc(G.team)}.</p>
    <a class="cta" href="#/ask">Ask an Ambassador from Grade ${n} →</a>
  </section>`;
}

function day() {
  return `<section class="hero compact">${kicker('A day at St. Nicholas')}<h1>From 08:00 to 15:40</h1><p class="lead">The shape of a normal Secondary day.</p></section>
  <section class="wrap"><ol class="timeline">${DAY.map((d) => `<li><time>${esc(d.t)}</time><div><b>${esc(d.h)}</b><p>${esc(d.p)}</p></div></li>`).join('')}</ol>
  <p class="todo-line">${todoTag} A real Grade 6 and Grade 11 day, hour by hour.</p></section>`;
}

function glossary() {
  const q = S.q.trim().toLowerCase();
  const list = GLOSSARY.filter(([w, en, pt]) => !q || (w + ' ' + en + ' ' + pt).toLowerCase().includes(q));
  return `<section class="hero compact">${kicker('Glossary')}<h1>The words everyone uses</h1>
    <div class="search"><input id="gq" type="search" placeholder="Type a word you heard: CAS, criteria, tutor…" value="${esc(S.q)}" autocomplete="off">
    <div class="lang"><button data-lang="en" class="${S.lang === 'en' ? 'on' : ''}">EN</button><button data-lang="pt" class="${S.lang === 'pt' ? 'on' : ''}">PT</button><button data-lang="both" class="${S.lang === 'both' ? 'on' : ''}">Both</button></div></div></section>
  <section class="wrap"><div class="gl" id="gl">${glossRows(list)}</div></section>`;
}
function glossRows(list) {
  if (!list.length) return `<p class="muted">Not here yet. <a href="#/ask">Ask an Ambassador</a> and we will add it.</p>`;
  return list.map(([w, en, pt]) => `<div class="gw"><b>${esc(w)}</b>${S.lang !== 'pt' ? `<p>${esc(en)}</p>` : ''}${S.lang !== 'en' ? `<p class="pt">${esc(pt)}</p>` : ''}</div>`).join('');
}

function done() { return store.get('check', []).length; }
function checklist() {
  const ticks = new Set(store.get('check', []));
  const pct = Math.round((ticks.size / CHECKLIST.length) * 100);
  return `<section class="hero compact">${kicker('Your first week')}<h1>Small goals, one at a time</h1>
    <div class="ring" style="--p:${pct}"><b>${ticks.size}/${CHECKLIST.length}</b><span>done</span></div></section>
  <section class="wrap"><ul class="check">${CHECKLIST.map((c, i) => `<li><label><input type="checkbox" data-check="${i}" ${ticks.has(i) ? 'checked' : ''}><span>${esc(c)}</span></label></li>`).join('')}</ul>
  <p class="muted small">Saved on this phone only.</p></section>`;
}

function quiz() {
  const i = S.quiz.length;
  if (i < QUIZ.questions.length) {
    const Q = QUIZ.questions[i];
    return `<section class="hero compact">${kicker(`Which club is for you? · ${i + 1} of ${QUIZ.questions.length}`)}<h1>${esc(Q.q)}</h1>
      <div class="bar"><i style="width:${(i / QUIZ.questions.length) * 100}%"></i></div></section>
      <section class="wrap"><div class="answers">${Q.a.map(([t, k]) => `<button class="ans" data-ans="${k}">${esc(t)}</button>`).join('')}</div></section>`;
  }
  const count = {}; S.quiz.forEach((k) => { count[k] = (count[k] || 0) + 1; });
  const best = Object.entries(count).sort((a, b) => b[1] - a[1])[0][0];
  const R = QUIZ.results[best];
  return `<section class="hero compact">${kicker('Your result')}<h1>${esc(R.h)}</h1><p class="lead">${esc(R.p)}</p></section>
    <section class="wrap"><button class="cta" data-act="quizAgain">Try again</button> <a class="cta ghost" href="#/events">See the year’s events</a></section>`;
}

function events() {
  return `<section class="hero compact">${kicker('The year at a glance')}<h1>Big events you can be part of</h1></section>
  <section class="wrap"><div class="ev">${EVENTS.map((e) => `<article><span class="tag">${esc(e.when)}</span><h3>${esc(e.k)}</h3><p>${esc(e.d)}</p></article>`).join('')}</div>
  <p class="todo-line">${todoTag} How to sign up for each one.</p></section>`;
}

function ask() {
  const sent = S.sent;
  return `<section class="hero compact">${kicker('Ask an Ambassador')}<h1>No question is too small</h1><p class="lead">An Ambassador from your grade answers within two days, in person or through your tutor.</p></section>
  <section class="wrap">${sent ? `<div class="ok"><b>Sent!</b> An Ambassador from Grade ${esc(sent)} will find you within two days.</div><button class="cta ghost" data-act="askAgain">Ask another question</button>` : `
    <form id="askForm" class="form">
      <label>Your grade<select name="grade" required>${Object.keys(GRADES).map((n) => `<option value="${n}" ${String(S.grade) === n ? 'selected' : ''}>Grade ${n}</option>`).join('')}</select></label>
      <label>Your first name<input name="name" required maxlength="60" autocomplete="given-name"></label>
      <label>Tutor group <small>(if you know it)</small><input name="tutor_group" maxlength="40"></label>
      <label>Your question<textarea name="question" required minlength="3" maxlength="800" rows="4" placeholder="Where is the library? What should I bring on Monday?"></textarea></label>
      <p class="muted small">Only the Ambassadors and the Admissions team see your question. Please do not write phone numbers or addresses.</p>
      <button class="cta" type="submit">Send</button><p class="err" id="askErr"></p>
    </form>`}</section>`;
}

function me() {
  return `<section class="hero compact">${kicker('My page')}<h1>Just for you</h1><p class="lead">Saved on this phone only.</p></section>
  <section class="wrap">
    <div class="mycard"><h3>My Ambassador</h3><input data-me="buddy" placeholder="Name" value="${esc(store.get('buddy', ''))}"><input data-me="buddyWhere" placeholder="Where to find them" value="${esc(store.get('buddyWhere', ''))}"></div>
    <div class="mycard"><h3>A letter to myself</h3><p class="muted small">Write it on your first day. Read it again at the end of your first term.</p><textarea data-me="letter" rows="6" placeholder="Dear me…">${esc(store.get('letter', ''))}</textarea></div>
  </section>`;
}

// ---------- router ----------
function route() {
  const h = location.hash.replace(/^#\/?/, '');
  const [a, b] = h.split('/');
  document.getElementById('drawer').hidden = true;
  const views = { '': home, day, glossary, checklist, quiz, events, ask, me };
  $app.innerHTML = a === 'grade' ? grade(b) : (views[a] || home)();
  document.querySelectorAll('#tabbar a').forEach((x) => x.classList.toggle('on', x.dataset.t === (a || 'home')));
  if (a === 'grade' || a === '') document.querySelector('#tabbar [data-t="grade"]').href = `#/grade/${S.grade || 6}`;
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);
route();
setInterval(() => { if (!location.hash.replace(/^#\/?/, '')) { const c = document.querySelector('.count'); if (c) c.outerHTML = countdown(); } }, 30000);

// ---------- events ----------
document.getElementById('menuBtn').onclick = () => { const d = document.getElementById('drawer'); d.hidden = !d.hidden; };
document.addEventListener('click', (e) => {
  const flip = e.target.closest('[data-flip]'); if (flip) return flip.classList.toggle('open');
  const l = e.target.closest('[data-lang]'); if (l) { S.lang = l.dataset.lang; store.set('lang', S.lang); return route(); }
  const ans = e.target.closest('[data-ans]'); if (ans) { S.quiz.push(ans.dataset.ans); return route(); }
  const act = e.target.closest('[data-act]')?.dataset.act;
  if (act === 'quizAgain') { S.quiz = []; route(); }
  if (act === 'askAgain') { S.sent = null; route(); }
});
document.addEventListener('input', (e) => {
  if (e.target.id === 'gq') { S.q = e.target.value; const list = GLOSSARY.filter(([w, en, pt]) => !S.q.trim() || (w + ' ' + en + ' ' + pt).toLowerCase().includes(S.q.trim().toLowerCase())); document.getElementById('gl').innerHTML = glossRows(list); }
  const m = e.target.dataset?.me; if (m) store.set(m, e.target.value);
});
document.addEventListener('change', (e) => {
  const c = e.target.dataset?.check;
  if (c !== undefined) {
    const t = new Set(store.get('check', [])); e.target.checked ? t.add(+c) : t.delete(+c); store.set('check', [...t]);
    route();
  }
});
document.addEventListener('submit', async (e) => {
  if (e.target.id !== 'askForm') return;
  e.preventDefault();
  const f = new FormData(e.target); const btn = e.target.querySelector('button'); btn.disabled = true;
  const body = { grade: +f.get('grade'), name: String(f.get('name')).trim(), tutor_group: String(f.get('tutor_group') || '').trim() || null, question: String(f.get('question')).trim() };
  try {
    const C = window.BOOKLET;
    const r = await fetch(`${C.supabaseUrl}/rest/v1/booklet_questions`, { method: 'POST', headers: { apikey: C.anonKey, Authorization: `Bearer ${C.anonKey}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' }, body: JSON.stringify(body) });
    if (!r.ok) throw new Error();
    S.sent = body.grade; route();
  } catch { btn.disabled = false; document.getElementById('askErr').textContent = 'It did not send. Check the internet and try again.'; }
});
