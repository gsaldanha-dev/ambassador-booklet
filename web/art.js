// Icons in one consistent line style (thin, rounded, like system symbols). They take currentColor.
const ic = (p, vb = 24) => `<svg viewBox="0 0 ${vb} ${vb}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;

export const ICON = {
  backpack: ic('<path d="M7 9a5 5 0 0 1 10 0v10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z"/><path d="M10 4.5V4a2 2 0 0 1 4 0v.5"/><path d="M9.5 14h5v3h-5z"/>'),
  puzzle: ic('<path d="M5 8h3.5a1.75 1.75 0 1 1 3.5 0H15v3.5a1.75 1.75 0 1 0 0 3.5V19H5z"/><path d="M15 8h4v11h-4"/>'),
  compass: ic('<circle cx="12" cy="12" r="8.5"/><path d="m15 9-2 4-4 2 2-4z"/>'),
  calendar: ic('<rect x="4" y="5.5" width="16" height="14" rx="3"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/><path d="M8 14h2M12 14h2M8 17h2"/>'),
  bulb: ic('<path d="M9 17h6M10 20h4"/><path d="M8.5 14.5A6 6 0 1 1 15.5 14.5c-.6.5-1 1.2-1 2.5h-5c0-1.3-.4-2-1-2.5z"/>'),
  cap: ic('<path d="m2.5 9.5 9.5-4.5 9.5 4.5-9.5 4.5z"/><path d="M6.5 11.5v4.5c0 1.5 11 1.5 11 0v-4.5M21.5 9.5v5"/>'),
  clock: ic('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'),
  book: ic('<path d="M4 5.5A2 2 0 0 1 6 4h13v14H6a2 2 0 0 0-2 2z"/><path d="M4 20V5.5M8 8h7M8 11h5"/>'),
  person: ic('<circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/>'),
  star: ic('<path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.9z"/>'),
  chat: ic('<path d="M20 12.5a7.5 7.5 0 0 1-11.2 6.5L4 20l1.1-4.3A7.5 7.5 0 1 1 20 12.5z"/>'),
  check: ic('<circle cx="12" cy="12" r="8.5"/><path d="m8.5 12.3 2.4 2.4 4.6-5"/>'),
  spark: ic('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>'),
  arrow: ic('<path d="M5 12h14M13 6l6 6-6 6"/>'),
};
export const GRADE_ICON = { 6: 'backpack', 7: 'puzzle', 8: 'compass', 9: 'calendar', 10: 'bulb', 11: 'cap' };
// Each chapter has its own gradient, from the school blue towards a second colour.
export const GRADE_GRAD = {
  6: 'linear-gradient(140deg,#0A5CFF 0%,#00C2FF 100%)',
  7: 'linear-gradient(140deg,#3A2CFF 0%,#A06BFF 100%)',
  8: 'linear-gradient(140deg,#0047D6 0%,#2EE6A6 100%)',
  9: 'linear-gradient(140deg,#002A80 0%,#4F8BFF 100%)',
  10: 'linear-gradient(140deg,#1C3DFF 0%,#FFB800 100%)',
  11: 'linear-gradient(140deg,#0B1B4D 0%,#7A5CFF 60%,#FF6BB5 100%)',
};
