// Start Here: the welcome guide for new Secondary students. Plain JS, hash routes, no build step.
import { SITE, FACTS, DAY, MYTHS, EVENTS, GRADES, GLOSSARY, CHECKLIST, QUIZ, AMBASSADORS, CALENDAR, HELP, MYP, MYP_GROUPS, DP, PLACES, PHOTOS, YEAR, YEARGROUP, CRITERIA } from './content.js?v=1795775305';
import { ICON, GRADE_ICON, GRADE_GRAD } from './art.js?v=1795775305';
import { answer, SUGGESTIONS } from './guide.js?v=1795775305';
import { LANGS, LANG, loadLang, T } from './i18n.js?v=1795775305';

const $app = document.getElementById('app');
const raw = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
// esc() translates (when a translation exists) and escapes; raw() only escapes (names, what people typed).
const esc = (s) => raw(T(String(s ?? '')));
const store = {
  get: (k, d) => { try { return JSON.parse(localStorage.getItem('sh.' + k)) ?? d; } catch { return d; } },
  set: (k, v) => { try { localStorage.setItem('sh.' + k, JSON.stringify(v)); } catch {} },
};
const S = { gl: store.get('gl', 'both'), q: '', quiz: [], grade: store.get('grade', null), sent: null, mark: 6, chat: store.get('chat', []) };
const visited = () => {};

function daysTo(iso) { return Math.ceil((new Date(iso) - Date.now()) / 864e5); }

// ---------- home: one long page that moves as you scroll ----------
function home() {
  const o = daysTo(SITE.orientation);
  return `
  <section class="h-hero" data-scene="hero">
    <div class="h-glow"></div>
    <div class="h-inner">
      <p class="h-pre">${T('St. Nicholas School · Secondary')}</p>
      <h1 class="h-title">${T('Start here.')}</h1>
      <p class="h-sub">${T('The guide to your first weeks, written by the students who were new before you.')}</p>
      <div class="h-cta"><a class="pill" href="#/grades">${T('Find your grade')}</a><button class="pill line" data-act="chat">${T('Ask the guide')}</button></div>
      ${o > 0 ? `<p class="h-count">${T('{n} days to Orientation Morning', { n: `<b data-count="${o}">${o}</b>` })}</p>` : ''}
    </div>
    <div class="h-scroll" aria-hidden="true"><i></i></div>
  </section>

  <section class="swap" data-scene="swap">
    <div class="swap-stick">
      <p class="swap-lines">
        ${['New school.', 'New people.', 'New words.', 'New timetable.'].map((x) => `<span>${T(x)}</span>`).join('')}<span class="last">${T('Same you.')}</span>
      </p>
    </div>
  </section>

  <section class="zoom" data-scene="zoom">
    <div class="zoom-stick">
      <picture class="zoom-pic"><source media="(min-width: 760px)" srcset="img/outdoor-group.webp"><img src="img/campus-field.webp" alt="${esc("Students on the school field, with São Paulo's buildings around it")}"></picture>
      <div class="zoom-txt"><h2>${T('This is St. Nicholas.')}</h2><p>${T('Pinheiros, São Paulo. Early Years to Grade 12 on one campus.')}</p></div>
    </div>
  </section>

  <section class="stats light">
    <h2 class="big">${T('A small school with<br>a big world inside.')}</h2>
    <div class="stat-row">${FACTS.map((f) => `<div class="stat reveal"><b class="grad-txt">${esc(f.n)}</b><span>${esc(f.t)}</span></div>`).join('')}</div>
  </section>

  <section class="life">
    <div class="ch-head"><h2 class="big">${T('Life here.')}<br><span class="dim">${T('Real photos, taken by us.')}</span></h2></div>
    <div class="marquee" aria-label="${esc('Photos of school life')}"><div class="track">${[...PHOTOS, ...PHOTOS].map((p, i) => `<figure class="ph"${i >= PHOTOS.length ? ' aria-hidden="true"' : ''}><img src="${p.src}" alt="${i >= PHOTOS.length ? '' : esc(p.c)}" loading="lazy"><figcaption>${esc(p.c)}</figcaption></figure>`).join('')}</div></div>
  </section>

  <section class="chapters">
    <div class="ch-head"><h2 class="big">${T('Six chapters.')}<br><span class="dim">${T('One is yours.')}</span></h2><div class="ch-nav"><button data-scroll="-1" aria-label="Previous">‹</button><button data-scroll="1" aria-label="Next">›</button></div></div>
    <div class="rail" id="rail">${Object.keys(GRADES).map((n) => chapterCard(n)).join('')}</div>
  </section>

  <section class="places light">
    <h2 class="big">${T('Places you will hear<br>in your first week.')}</h2>
    <div class="place-grid">
      <figure class="place-hero reveal"><img src="img/deck.webp" alt="${esc('The Deck: a wooden deck under a big tree, with tables')}" loading="lazy"><figcaption><b>${esc(PLACES[0].n)}</b>${esc(PLACES[0].p)}</figcaption></figure>
      <ul class="place-list">${PLACES.slice(1).map((p) => `<li class="reveal"><b>${esc(p.n)}</b><span>${esc(p.p)}</span></li>`).join('')}</ul>
    </div>
  </section>

  <section class="day-scene" data-scene="day">
    <div class="day-stick">
      <p class="day-k">${T('A day in Secondary')}</p>
      <div class="day-clock"><b id="dayTime">08:00</b></div>
      <div class="day-bar"><i id="dayFill"></i></div>
      <ol class="day-steps">${DAY.map((d, i) => `<li data-i="${i}"><b>${esc(d.h)}</b><span>${esc(d.s)}–${esc(d.e)} · ${esc(d.p)}</span></li>`).join('')}</ol>
    </div>
  </section>

  <section class="bento light">
    <h2 class="big">${T('The IB, without the jargon.')}</h2>
    <div class="bento-grid">
      <a class="tile t-myp reveal" href="#/ib"><span class="t-k">${T('Grades 6–10')}</span><h3>MYP</h3><p>${T('Eight subject groups. Every criterion marked from 0 to 8.')}</p><span class="t-big grad-txt">8</span></a>
      <a class="tile t-dp reveal" href="#/ib"><span class="t-k">${T('Grades 11–12')}</span><h3>DP</h3><p>${T('Six subjects, plus TOK, the Extended Essay and CAS.')}</p><span class="t-big">45</span></a>
      <a class="tile t-words reveal" href="#/glossary"><span class="ico">${ICON.book}</span><h3>${T('The words everyone uses')}</h3><p>${T('Search {n} words used at school.', { n: GLOSSARY.length })}</p></a>
      <a class="tile t-help reveal" href="#/help"><span class="ico">${ICON.person}</span><h3>${T('Who to ask')}</h3><p>${T('Start with your tutor. We are here too.')}</p></a>
      <a class="tile t-week reveal" href="#/checklist"><span class="ico">${ICON.check}</span><h3>${T('Week one')}</h3><p>${T('Eight small goals to tick off.')}</p></a>
      <a class="tile t-quiz reveal" href="#/quiz"><span class="ico">${ICON.spark}</span><h3>${T('Which club is for you?')}</h3><p>${T('Five questions.')}</p></a>
    </div>
  </section>

  <section class="bee">
    <div class="bee-in">
      <h2 class="big">${T('A year has moments')}<br><span class="grad-txt">${T('you will remember.')}</span></h2>
      <p class="bee-lead">${T('What is ahead in your year at St. Nicholas.')}</p>
      <ol class="bee-steps">${EVENTS.map((b, i) => `<li class="reveal"><span>${i + 1}</span><b>${esc(b.k)}</b><p>${esc(b.d)}</p></li>`).join('')}</ol>
      <a class="more-link light-link" href="#/events">${T('All the big events')}</a>
    </div>
  </section>

  <section class="myths-scene">
    <h2 class="big">${T('Things people worry about.')}<br><span class="dim">${T('Tap to see what is true.')}</span></h2>
    <div class="myth-grid">${MYTHS.map((m) => `<button class="mcard reveal" data-flip><span class="mq">${esc(m.q)}</span><span class="ma"><b>${esc(m.a)}</b>${esc(m.p)}</span></button>`).join('')}</div>
  </section>

  <section class="guide-scene">
    <div class="g-copy">
      <h2 class="big">${T('Ask anything.')}<br><span class="grad-txt">${T('Get a real answer.')}</span></h2>
      <p>${T('The guide answers only from what is written here, and understands questions in English and Portuguese. If it does not know, it does not guess: your question goes to an Ambassador from your grade.')}</p>
      <button class="pill" data-act="chat">${T('Ask the guide')}</button>
    </div>
    <div class="phone reveal" aria-hidden="true">
      <div class="p-msg me">que horas começa a aula?</div>
      <div class="p-msg">${esc('Secondary starts at 08:00 every day.')}</div>
      <div class="p-msg me">what is CAS?</div>
      <div class="p-msg">${esc('Creativity, Activity, Service: part of the DP, outside the classroom.')}</div>
      <div class="p-msg me">where is the gym?</div>
      <div class="p-msg">${esc('That is not in the guide yet, so I will not guess. I can send it to an Ambassador.')}</div>
    </div>
  </section>

  <section class="people-scene light">
    <h2 class="big">${T('Written by us.')}</h2>
    <p class="lead-d">${T('Secondary Ambassadors. Find us at break on Wednesdays.')}</p>
    <div class="crew">${[...new Set(AMBASSADORS.map(([, g]) => g))].sort((x, y) => x - y).map((g) => `<div class="crew-row reveal"><span>${T('Grade {n}', { n: g })}</span><p>${AMBASSADORS.filter(([, x]) => x === g).map(([nm]) => `<b>${raw(nm)}</b>`).join('')}</p></div>`).join('')}</div>
  </section>`;
}
function chapterCard(n) {
  return `<a class="chap ${String(S.grade) === n ? 'mine' : ''}" href="#/grade/${n}" style="--g:${GRADE_GRAD[n]}">
    <span class="chap-ico">${ICON[GRADE_ICON[n]]}</span>
    <span class="chap-n">${n}</span>
    <span class="chap-t"><b>${T('Grade {n}', { n })}</b><small>${esc(GRADES[n].title)}</small></span></a>`;
}

function pageHead(title, sub, extra = '') { return `<header class="phead"><h1>${T(title)}</h1>${sub ? `<p>${T(sub)}</p>` : ''}${extra}</header>`; }

function grades() {
  return pageHead('Find your grade.', 'Six chapters. Pick the grade you are joining.') + `<section class="band"><div class="rail grid">${Object.keys(GRADES).map((n) => chapterCard(n)).join('')}</div></section>`;
}

function grade(n) {
  const G = GRADES[n];
  if (!G) return grades();
  S.grade = n; store.set('grade', n);
  const prog = +n <= 10 ? 'myp' : 'dp';
  return `
  <header class="chapter" style="--g:${GRADE_GRAD[n]}">
    <div class="c-glow"></div>
    <div class="c-in">
      <span class="c-ico">${ICON[GRADE_ICON[n]]}</span>
      <h1>${T('Grade {n}', { n })}</h1>
      <p class="ctheme">${esc(G.title)}</p>
      <p class="clead">${esc(G.lead)}</p>
      <nav class="gswitch" aria-label="${esc('Other grades')}">${Object.keys(GRADES).map((k) => `<a href="#/grade/${k}" class="${k === String(n) ? 'on' : ''}">${k}</a>`).join('')}</nav>
    </div>
  </header>
  ${YEAR[n] ? `<section class="band">
    <div class="glance">
      <div><small>${T('Programme')}</small><b>${esc(YEAR[n].prog)}</b></div>
      <div><small>${T('Usual age')}</small><b>${esc(YEAR[n].age)}</b></div>
      <div><small>${T('Your year')}</small><b>${esc(YEARGROUP.size)}</b></div>
      <div><small>${T('Classes')}</small><b>${esc(YEARGROUP.classes)}</b></div>
      <div><small>${T('Every day')}</small><b>${esc(YEARGROUP.day)}</b></div>
    </div>
  </section>` : ''}
  <section class="band tint">
    <h2>${T('What matters this year.')}</h2>
    <div class="ibyear">${[...G.cards, ...(YEAR[n]?.ib || [])].map((x, i) => `<article><span>${i + 1}</span><h3>${esc(x.h)}</h3><p>${esc(x.p)}</p></article>`).join('')}</div>
    <p class="small">${T('This part is the IB’s own framework, the same in every IB school.')} <a href="#/ib">${T('The IB, simply')} ›</a></p>
  </section>
  ${(() => { const here = AMBASSADORS.filter(([, g]) => String(g) === String(n)); const list = here.length ? here : AMBASSADORS.slice().sort((x, y) => Math.abs(x[1] - n) - Math.abs(y[1] - n)).slice(0, 3); return `<section class="band">
    <h2>${here.length ? T('Ambassadors in Grade {n}.', { n }) : T('Ambassadors near you.')}</h2>
    <p class="lead-s">${here.length ? T('They are in your year and remember being new.') : T('No Ambassador is in Grade {n} yet, so your questions go to the nearest grades.', { n })}</p>
    <ul class="people">${list.map(([nm, g]) => `<li><b>${raw(nm)}</b><small>Ambassador · ${T('Grade {n}', { n: g })}</small></li>`).join('')}</ul>
  </section>`; })()}
  <section class="band">
    <div class="askbox"><div><h2>${T('A question about Grade {n}?', { n })}</h2><p>${AMBASSADORS.some(([, g]) => String(g) === String(n)) ? T('An Ambassador from Grade {n} will answer.', { n }) : T('An Ambassador will answer.')}</p></div><a class="pill" href="#/ask">${T('Ask an Ambassador')}</a></div>
    <p class="credit">${T('Grade {n} chapter by {who}.', { n, who: raw(G.team) })}</p>
  </section>`;
}

function day() {
  return pageHead('A day here.', 'From 08:00 to 15:40. The same for every grade in Secondary.') + `
  <section class="band"><ol class="tl">${DAY.map((d) => `<li class="${/Period/.test(d.h) ? '' : 'pause'}"><time>${esc(d.s)}<small>${esc(d.e)}</small></time><div><b>${esc(d.h)}</b><p>${esc(d.p)}</p></div></li>`).join('')}</ol>
  <p class="todo-line">${T('Seven periods of 50 minutes, a 30-minute break and an hour for lunch.')}</p></section>`;
}

function ib() {
  const band = T(S.mark === 0 ? 'Not shown yet' : S.mark <= 2 ? 'Limited' : S.mark <= 4 ? 'Adequate' : S.mark <= 6 ? 'Substantial' : 'Excellent');
  return pageHead('The IB, simply', 'St. Nicholas teaches the IB from Early Years to Grade 12. In Secondary you are in one of two programmes.') + `
  <section class="band two">
    <article class="prog"><p class="pg">${T('Grades 6 to 10')}</p><h2>${T('The MYP')}</h2><p>${T('Middle Years Programme. Eight subject groups, every year:')}</p>
      <ul class="groups">${MYP_GROUPS.map((g) => `<li>${esc(g)}</li>`).join('')}</ul>
      ${MYP.slice(1).map((x) => `<h3>${esc(x.h)}</h3><p>${esc(x.p)}</p>`).join('')}</article>
    <article class="prog dark"><p class="pg">${T('Grades 11 and 12')}</p><h2>${T('The DP')}</h2><p>${T('Diploma Programme.')}</p>
      ${DP.map((x) => `<h3>${esc(x.h)}</h3><p>${esc(x.p)}</p>`).join('')}
      <div class="pts"><span style="--w:93%">${T('42 from your six subjects')}</span><span style="--w:7%">+3</span></div><p class="small">${T('Maximum: 45 points.')}</p></article>
  </section>
  <section class="band tint">
    <h2>${T('What does an MYP mark mean?')}</h2><p>${T('Each criterion is marked from 0 to 8. Slide to see what a mark says.')}</p>
    <div class="marker"><input type="range" min="0" max="8" value="${S.mark}" id="mark" aria-label="${esc('Mark from 0 to 8')}"><div class="mk"><b>${S.mark}</b><span>${T('out of 8')}</span><em>${band}</em></div></div>
    <p class="small">${T('The bands (1–2, 3–4, 5–6, 7–8) are the same in every MYP subject. Your teacher’s rubric says exactly what each band means for a task.')}</p>
  </section>
  <section class="band">
    <h2>${T('What each criterion means.')}</h2>
    <p>${T('Every MYP subject group is marked on four criteria, A to D. Here is what they are in each one.')}</p>
    <div class="crit">${CRITERIA.map((x) => `<article><h3>${esc(x.g)}</h3><ol>${x.c.map((c, i) => `<li><b>${'ABCD'[i]}</b><span>${esc(c)}</span></li>`).join('')}</ol></article>`).join('')}</div>
    <p class="small">${T('The Personal Project, in Grade 10, has three criteria instead: planning, applying skills and reflecting. These are the IB’s own criteria, the same in every IB school.')}</p>
  </section>`;
}

function glossary() {
  visited(2);
  return pageHead('The words everyone uses', 'Type a word you heard in class or in the corridor.', `
    <div class="search"><input id="gq" type="search" placeholder="${esc('CAS, criteria, tutor group…')}" value="${raw(S.q)}" autocomplete="off" aria-label="${esc('Search the glossary')}"></div>`) +
  `<section class="band"><dl class="gl" id="gl">${glossRows()}</dl></section>`;
}
function glossRows() {
  const q = S.q.trim().toLowerCase();
  const local = (en, pt) => (LANG === 'pt' ? pt : T(en));
  const list = GLOSSARY.filter(([w, en, pt]) => !q || (w + ' ' + en + ' ' + local(en, pt)).toLowerCase().includes(q));
  if (!list.length) return `<p class="empty">${T('“{q}” is not here yet.', { q: raw(S.q) })} <a href="#/ask">${T('Ask an Ambassador')}</a></p>`;
  // The words stay in English (that is how you will hear them at school); the meaning is in your language, with the English underneath.
  return list.map(([w, en, pt]) => `<div class="gw"><dt>${raw(w)}</dt><dd><p>${raw(local(en, pt))}</p>${LANG !== 'en' ? `<p class="pt">${raw(en)}</p>` : ''}</dd></div>`).join('');
}

function help() {
  return pageHead('Who to ask', 'Nobody expects you to know everything in your first weeks. Start at the top.') + `
  <section class="band"><ol class="ladder">${HELP.map((h) => `<li><b>${esc(h.who)}</b><p>${esc(h.when)}</p></li>`).join('')}</ol>
  <div class="askbox"><div><h2>${T('Not sure who?')}</h2><p>${T('Ask the guide, or send your question to an Ambassador.')}</p></div><button class="btn" data-act="chat">${T('Ask the guide')}</button></div></section>`;
}

function calendar() {
  visited(0);
  return pageHead('Key dates', 'The school year 2026–27, from January.') + `
  <section class="band"><ul class="dates">${CALENDAR.map(([d, t]) => `<li><time>${esc(d)}</time><span>${esc(t)}</span></li>`).join('')}</ul></section>`;
}

function events() {
  return pageHead('The year', 'The big moments you can be part of.') + `
  <section class="band"><div class="events">${EVENTS.map((e) => `<article><p class="when">${esc(e.when)}</p><h2>${esc(e.k)}</h2><p>${esc(e.d)}</p></article>`).join('')}</div></section>`;
}

function checklist() {
  visited(3);
  const ticks = new Set(store.get('check', []));
  const pct = Math.round((ticks.size / CHECKLIST.length) * 100);
  return pageHead('Week one', 'Small goals, one at a time. Saved on this phone only.', `<div class="ring" style="--p:${pct}"><b>${ticks.size}</b><span>${T('of {n}', { n: CHECKLIST.length })}</span></div>`) + `
  <section class="band"><ul class="check">${CHECKLIST.map((c, i) => `<li><label><input type="checkbox" data-check="${i}" ${ticks.has(i) ? 'checked' : ''}><span>${esc(c)}</span></label></li>`).join('')}</ul></section>`;
}

function quiz() {
  visited(4);
  const i = S.quiz.length, n = QUIZ.questions.length;
  if (i < n) {
    const Q = QUIZ.questions[i];
    return pageHead(esc(Q.q), T('Question {i} of {n}', { i: i + 1, n }), `<div class="bar"><i style="width:${(i / n) * 100}%"></i></div>`) +
      `<section class="band"><div class="answers">${Q.a.map(([t, k]) => `<button class="ans" data-ans="${k}">${esc(t)}</button>`).join('')}</div></section>`;
  }
  const count = {}; S.quiz.forEach((k) => { count[k] = (count[k] || 0) + 1; });
  const R = QUIZ.results[Object.entries(count).sort((a, b) => b[1] - a[1])[0][0]];
  return pageHead(esc(R.h), esc(R.p)) + `<section class="band"><button class="btn" data-act="quizAgain">${T('Take the quiz again')}</button> <a class="btn ghost-d" href="#/events">${T('See the year’s events')}</a></section>`;
}

function ask() {
  visited(5);
  const pre = raw(store.get('draft', ''));
  return pageHead('Ask an Ambassador', 'No question is too small. An Ambassador from your grade answers within two days, in person or through your tutor.') + `
  <section class="band">${S.sent ? `<div class="sent"><h2>${T('Question sent')}</h2><p>${T('An Ambassador from Grade {n} will find you within two days.', { n: raw(S.sent) })}</p><button class="btn ghost-d" data-act="askAgain">${T('Ask another question')}</button></div>` : `
    <form id="askForm" class="form">
      <label>${T('Your grade')}<select name="grade" required>${Object.keys(GRADES).map((n) => `<option value="${n}" ${String(S.grade) === n ? 'selected' : ''}>${T('Grade {n}', { n })}</option>`).join('')}</select></label>
      <label>${T('Your first name')}<input name="name" required maxlength="60" autocomplete="given-name"></label>
      <label>${T('Tutor group, if you know it')}<input name="tutor_group" maxlength="40"></label>
      <label>${T('Your question')}<textarea name="question" required minlength="3" maxlength="800" rows="4" placeholder="${esc('Where is the gym? What should I bring on Monday?')}">${pre}</textarea></label>
      <p class="small">${T('Only the Ambassadors and the Admissions team see your question. Do not write phone numbers or addresses.')}</p>
      <button class="btn" type="submit">${T('Send question')}</button><p class="err" id="askErr"></p>
    </form>`}</section>`;
}

function me() {
  return pageHead('My page', 'Saved on this phone only.') + `<section class="band two">
    <div class="paper"><h2>${T('My Ambassador')}</h2><input data-me="buddy" placeholder="${esc('Their name')}" value="${raw(store.get('buddy', ''))}" aria-label="${esc('Their name')}"><input data-me="buddyWhere" placeholder="${esc('Where to find them')}" value="${raw(store.get('buddyWhere', ''))}" aria-label="${esc('Where to find them')}"></div>
    <div class="paper lined"><h2>${T('A letter to myself')}</h2><p class="small">${T('Write it on your first day. Read it again at the end of your first term.')}</p><textarea data-me="letter" rows="8" placeholder="${esc('Dear me,')}" aria-label="${esc('A letter to myself')}">${raw(store.get('letter', ''))}</textarea></div></section>`;
}

// ---------- the guide (chat) ----------
// ---------- the guide (chat) ----------
const $chat = document.getElementById('chat');
function chatHtml() {
  const msgs = S.chat.length ? S.chat : [{ me: false, t: raw(T('Hi! I answer only from this guide, so I never make things up. If I do not know, I will send your question to an Ambassador.')) }];
  return `<div class="chat-head"><div><b>${T('Ask the guide')}</b><small>${T('Answers come only from this site')}</small></div><button class="x" data-act="chatClose">${T('Close')}</button></div>
    <div class="chat-log" id="chatLog" aria-live="polite">${msgs.map((m) => `<div class="msg ${m.me ? 'me' : ''}">${m.me ? raw(m.t) : m.t}</div>`).join('')}</div>
    <div class="chips">${SUGGESTIONS.map((s) => `<button data-sugg="${raw(s)}">${esc(s)}</button>`).join('')}</div>
    <form id="chatForm" class="chat-in"><input id="chatQ" autocomplete="off" placeholder="${esc('Type a question, in English or Portuguese')}" aria-label="${esc('Your question')}"><button class="btn" type="submit">${T('Send')}</button></form>`;
}
function drawChat() { $chat.innerHTML = chatHtml(); const l = document.getElementById('chatLog'); l.scrollTop = l.scrollHeight; }
function reply(q) {
  const a = answer(q);
  S.chat.push({ me: true, t: T(q) });
  if (a) S.chat.push({ me: false, t: `${esc(a.a)}<a class="src" href="${a.link}">${T('Read more: {x}', { x: esc(a.label) })}</a>` });
  else { store.set('draft', q); S.chat.push({ me: false, t: `${T('That is not in the guide yet, so I will not guess.')}<a class="src" href="#/ask">${T('Send it to an Ambassador')}</a>` }); }
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
  shell();
  openChat(false);
  window.scrollTo(0, 0);
  initScenes();
}
// Static text in the page shell, and the language menu.
document.querySelectorAll('[data-i18n]').forEach((el) => { el.dataset.en = el.textContent; });
function shell() {
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = T(el.dataset.en); });
  document.getElementById('langBtn').textContent = LANG.toUpperCase();
  document.getElementById('langMenu').innerHTML = LANGS.map(([k, l]) => `<button data-setlang="${k}" class="${k === LANG ? 'on' : ''}" lang="${k}">${l}</button>`).join('');
  document.title = `${T('Start Here')} · St. Nicholas Secondary`;
}
window.addEventListener('hashchange', route);
await loadLang(LANG, '1795775305');
route();

document.getElementById('menuBtn').onclick = () => { const d = document.getElementById('drawer'); d.hidden = !d.hidden; };
document.addEventListener('click', (e) => {
  const flip = e.target.closest('[data-flip]'); if (flip) return flip.classList.toggle('open');
  if (e.target.closest('#langBtn')) { const m = document.getElementById('langMenu'); m.hidden = !m.hidden; return; }
  const sl = e.target.closest('[data-setlang]'); if (sl) { document.getElementById('langMenu').hidden = true; S.chat = []; store.set('chat', []); return loadLang(sl.dataset.setlang, '1795775305').then(() => { const y = scrollY; route(); scrollTo(0, y); }); }
  if (!e.target.closest('.langs')) { const m = document.getElementById('langMenu'); if (m) m.hidden = true; }
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
    const band = T(S.mark === 0 ? 'Not shown yet' : S.mark <= 2 ? 'Limited' : S.mark <= 4 ? 'Adequate' : S.mark <= 6 ? 'Substantial' : 'Excellent');
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
  } catch { btn.disabled = false; document.getElementById('askErr').textContent = T('Your question was not sent. Check the internet and press Send question again.'); }
});

// ---------- scroll scenes ----------
var io;
function initScenes() {
  io?.disconnect();
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const obs = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } }), { threshold: 0.15 }); io = obs;
  document.querySelectorAll('.reveal').forEach((el) => (reduce ? el.classList.add('in') : obs.observe(el)));
  onScroll();
}
function clamp(v) { return Math.max(0, Math.min(1, v)); }
function progress(el) { const r = el.getBoundingClientRect(); return clamp(-r.top / Math.max(1, r.height - innerHeight)); }
function onScroll() {
  const hero = document.querySelector('[data-scene="hero"]');
  if (hero) { const p = clamp(scrollY / innerHeight); hero.style.setProperty('--p', p); }
  const zoom = document.querySelector('[data-scene="zoom"]');
  if (zoom) zoom.style.setProperty('--z', progress(zoom));
  const swap = document.querySelector('[data-scene="swap"]');
  if (swap) {
    const lines = swap.querySelectorAll('.swap-lines span'); const p = progress(swap);
    const idx = Math.min(lines.length - 1, Math.floor(p * lines.length * 0.999));
    lines.forEach((l, i) => l.classList.toggle('on', i === idx));
  }
  const day = document.querySelector('[data-scene="day"]');
  if (day) {
    const p = progress(day); const mins = 8 * 60 + Math.round(p * (7 * 60 + 40));
    document.getElementById('dayTime').textContent = `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`;
    document.getElementById('dayFill').style.width = `${p * 100}%`;
    const steps = day.querySelectorAll('.day-steps li');
    const toMin = (t) => +t.slice(0, 2) * 60 + +t.slice(3);
    let k = DAY.findIndex((d) => mins >= toMin(d.s) && mins < toMin(d.e)); if (k < 0) k = DAY.length - 1;
    steps.forEach((s, i) => { s.classList.toggle('on', i === k); s.classList.toggle('past', i < k); });
  }
}
addEventListener('scroll', () => requestAnimationFrame(onScroll), { passive: true });
addEventListener('resize', onScroll);
document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-scroll]'); if (!b) return;
  const rail = document.getElementById(b.dataset.rail || 'rail'); rail.scrollBy({ left: +b.dataset.scroll * rail.clientWidth * 0.8, behavior: 'smooth' });
});
// the top bar turns solid after the hero
addEventListener('scroll', () => document.body.classList.toggle('scrolled', scrollY > 40), { passive: true });
