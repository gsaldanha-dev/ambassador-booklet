// Languages for the guide. English is the source; every other language is a dictionary keyed by the English text,
// so anything not translated yet simply shows in English.
export const LANGS = [['en', 'English'], ['pt', 'Português'], ['es', 'Español'], ['fr', 'Français'], ['ja', '日本語'], ['ko', '한국어']];
const ok = (c) => LANGS.some(([k]) => k === c);
function pick() {
  const q = new URLSearchParams(location.search).get('lang');
  let saved = null; try { saved = JSON.parse(localStorage.getItem('sh.siteLang')); } catch {}
  const nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
  return [q, saved, nav].find(ok) || 'en';
}
export let LANG = pick();
let DICT = {};
export async function loadLang(l, v = '') {
  LANG = ok(l) ? l : 'en';
  try { localStorage.setItem('sh.siteLang', JSON.stringify(LANG)); } catch {}
  DICT = LANG === 'en' ? {} : await fetch(`i18n/${LANG}.json?v=${v}`).then((r) => (r.ok ? r.json() : {})).catch(() => ({}));
  document.documentElement.lang = LANG;
}
export function T(s, vars) {
  let r = DICT[s] ?? s;
  if (vars) for (const [k, x] of Object.entries(vars)) r = r.split(`{${k}}`).join(String(x));
  return r;
}
