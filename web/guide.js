// "Ask the guide": a chatbot that only answers from this site's own content.
// No AI service: it matches the question against the answers below and the glossary,
// so it can never invent a fact. When it is not sure, it sends the question to an Ambassador.
import { GLOSSARY, GRADES, CALENDAR, MYP_GROUPS } from './content.js';

const fold = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]/g, ' ');
// Portuguese and informal words mapped to the words the answers use.
const SYN = {
  horario: 'time', hora: 'time', horas: 'time', aula: 'school', aulas: 'school', comeca: 'start', começa: 'start', termina: 'end', acaba: 'end', sai: 'end', saida: 'end', entrada: 'start',
  quando: 'when', primeiro: 'first', dia: 'day', ferias: 'holiday', feriado: 'holiday', recesso: 'holiday', break: 'holiday', vacation: 'holiday',
  ajuda: 'help', triste: 'help', problema: 'help', worried: 'help', nervous: 'help', ansioso: 'help', bullying: 'help', quem: 'who',
  turma: 'class', sala: 'class', alunos: 'students', tamanho: 'size', big: 'size', many: 'size', quantos: 'size',
  nota: 'marks', notas: 'marks', mark: 'marks', marked: 'marks', grades: 'marks', avaliacao: 'marks', pontos: 'points', criterio: 'criteria', criterios: 'criteria',
  materias: 'subjects', materia: 'subjects', disciplinas: 'subjects', subject: 'subjects',
  clube: 'club', clubes: 'club', esporte: 'sport', esportes: 'sport', atividades: 'club', ecas: 'club', eca: 'club', activities: 'club',
  lanche: 'snack', comida: 'snack', food: 'snack', lunch: 'snack', almoco: 'snack',
  embaixador: 'ambassador', embaixadores: 'ambassador', ambassadors: 'ambassador', tutora: 'tutor', tutores: 'tutor',
  projeto: 'project', pessoal: 'personal', orientacao: 'orientation', nacionalidades: 'nationalities', countries: 'nationalities', paises: 'nationalities',
  escola: 'school', fundada: 'founded', ano: 'year', calendario: 'calendar', dates: 'calendar', datas: 'calendar', fim: 'end', ultimo: 'last',
};
const STOP = new Set('the a an is are do does i my me to of in on at what whats how and or for you your can will be it this that o a os as e de do da que um uma eu meu minha no na em para por com como qual quais'.split(' '));
const words = (s) => fold(s).split(/\s+/).filter(Boolean).map((w) => SYN[w] || w).filter((w) => !STOP.has(w));

const WEAK = new Set(['time', 'day', 'school', 'grade', 'what', 'mean', 'meaning', 'define', 'year', 'when', 'who', 'how', 'start', 'end']);
const T = (k, a, link, label) => ({ k: k.split(' '), a, link, label });
const FAQ = [
  T('time start school day 8 morning', 'Secondary starts at 08:00 every day.', '#/day', 'A day here'),
  T('time end finish school day afternoon home', 'Secondary finishes at 15:40.', '#/day', 'A day here'),
  T('when first day start january back', 'The first day of lessons is Tuesday 26 January 2027. Before that, on Friday 22 January, there is the New Learners Orientation Morning.', '#/calendar', 'Key dates'),
  T('orientation morning new learners', 'The New Learners Orientation Morning is on Friday 22 January 2027, before your first day.', '#/calendar', 'Key dates'),
  T('holiday half term when calendar', 'The next half-term holiday is 22–26 March 2027.', '#/calendar', 'Key dates'),
  T('last day year end june', 'The school year ends in June 2027 (19 June, still to be confirmed).', '#/calendar', 'Key dates'),
  T('calendar dates important', CALENDAR.map(([d, t]) => `${d}: ${t}`).join('. ') + '.', '#/calendar', 'Key dates'),
  T('class size students how many people', 'Your year has 50 to 60 students, but most classes have 10 to 15 and change by subject.', '#/', 'Home'),
  T('help who ask problem worried sad tutor', 'Start with your tutor: they are the first person to ask about anything. For well-being and bigger worries there is the Pastoral Coordinator, Ms. Luciana Brandespim. And the Ambassadors from your grade are always happy to help.', '#/help', 'Who to ask'),
  T('who tutor', 'Your tutor looks after your tutor group. You will meet them on your first day; they are the first person to ask about anything.', '#/help', 'Who to ask'),
  T('ambassador who meet join', 'The Ambassadors are students who welcome new students and families. We meet on Wednesdays at break, 10:00–10:30. Ask us anything through this site.', '#/ask', 'Ask an Ambassador'),
  T('marks criteria myp 8 how', 'In the MYP each subject has four criteria, A to D, each marked from 0 to 8. At the end of the year they add up to a final grade from 1 to 7.', '#/ib', 'The IB, simply'),
  T('marks dp 7 45 points', 'In the DP each of your six subjects is graded 1 to 7. TOK and the Extended Essay can add up to 3 points, so the maximum is 45.', '#/ib', 'The IB, simply'),
  T('subjects myp study groups', `In the MYP you study eight subject groups: ${MYP_GROUPS.join(', ')}.`, '#/ib', 'The IB, simply'),
  T('subjects dp choose hl sl', 'In the DP you take six subjects, usually three at Higher Level and three at Standard Level. Grade 10 is when you choose them.', '#/grade/10', 'Grade 10'),
  T('personal project', 'The Personal Project is a project of your own choice in Grade 10, the last year of the MYP. You make something real and reflect on how you did it.', '#/grade/10', 'Grade 10'),
  T('cas creativity activity service', 'CAS means Creativity, Activity, Service: experiences outside the classroom that are part of the DP.', '#/grade/11', 'Grade 11'),
  T('tok theory knowledge', 'TOK, Theory of Knowledge, is a DP course about how we know what we know.', '#/grade/11', 'Grade 11'),
  T('extended essay ee research', 'The Extended Essay is a 4,000-word research paper on a topic you choose, in the DP.', '#/grade/11', 'Grade 11'),
  T('club sport activities after school', 'Clubs and sports (ECAs) happen after school on some days. Take the club quiz, and ask your tutor which ones run on which days.', '#/quiz', 'Which club?'),
  T('snack food bring', 'From Grade 2 on, you can bring your own snack. For lunch, ask an Ambassador on your first day: we will show you how it works.', '#/ask', 'Ask an Ambassador'),
  T('nationalities international countries', 'Students and teachers at St. Nicholas come from 17 nationalities.', '#/', 'Home'),
  T('school founded old history ib', 'St. Nicholas was founded in 1980 and has taught the IB for more than 24 years, from Early Years to Grade 12.', '#/', 'Home'),
  T('spelling bee', 'The Spelling Bee is run by the Student Council in three rounds: tutor groups, then the whole grade, then the Grand Final.', '#/events', 'The year'),
  T('student council representatives idea', 'The Student Council represents students and runs events like the Spelling Bee. Your class representatives take your ideas to them.', '#/events', 'The year'),
  T('mun munick debate', 'MUNicks is our Model United Nations conference: students debate as delegates of different countries.', '#/events', 'The year'),
];
for (const n of Object.keys(GRADES)) {
  const g = GRADES[n];
  FAQ.push(T(`grade${n} g${n} ${n} year`, `Grade ${n}: ${g.lead}`, `#/grade/${n}`, `Grade ${n}`));
}
for (const [w, en] of GLOSSARY) FAQ.push(T(`${w} what mean meaning define`, `${w}: ${en}`, '#/glossary', 'Glossary'));

export function answer(question) {
  const q = words(question);
  if (!q.length) return null;
  const qs = new Set(q);
  // "grade 8" → also match "grade8"
  const gm = fold(question).match(/(?:grade|g|ano|serie)\s*(6|7|8|9|10|11)\b/); if (gm) qs.add(`grade${gm[1]}`);
  let best = null;
  for (const f of FAQ) {
    let score = 0;
    for (const k of f.k) if (qs.has(k)) score += WEAK.has(k) ? 1 : 2;
    if (score > (best?.score ?? 0)) best = { ...f, score };
  }
  return best && best.score >= 2 ? best : null;
}
export const SUGGESTIONS = ['What time does school start?', 'Who do I ask for help?', 'What is CAS?', 'How are MYP marks given?', 'When is my first day?'];
