// Everything the site says lives here, so the Ambassadors can edit text without touching the layout.
// Rule: only facts we have checked. Anything a grade team still has to write is marked `todo`.

export const SITE = {
  name: 'Start Here', // provisional: the booklet name is voted at Meeting 2
  school: 'St. Nicholas School · Pinheiros',
  orientation: '2027-01-22T08:00:00-03:00', // New Learners Orientation Morning
  firstDay: '2027-01-26T08:00:00-03:00', // back to school (Tuesday)
};

export const CALENDAR = [
  ['Fri 22 Jan 2027', 'New Learners Orientation Morning'],
  ['Tue 26 Jan 2027', 'Back to school: first day of lessons'],
  ['22–26 Mar 2027', 'Half-term holiday'],
  ['19 Jun 2027', 'Last day of the school year (to be confirmed)'],
];

// Who to go to. Roles only where we are sure of them.
export const HELP = [
  { who: 'Your tutor', when: 'First stop for anything: timetable, rooms, a problem with a class, how you feel.' },
  { who: 'The Pastoral Coordinator', when: 'For well-being and bigger worries. In 2026–27 this is Ms. Luciana Brandespim.' },
  { who: 'The Ambassadors', when: 'Students from your grade who were new once too. We meet on Wednesdays at break.' },
  { who: 'Your class representatives', when: 'When you have an idea for your grade or the school.' },
];

// The IB programmes, explained simply (general IB rules, the same in every IB school).
export const MYP_GROUPS = ['Language and literature', 'Language acquisition', 'Individuals and societies', 'Sciences', 'Mathematics', 'Arts', 'Physical and health education', 'Design'];
export const MYP = [
  { h: 'Eight subject groups', p: 'In the MYP you study eight subject groups every year, from Grade 6 to Grade 10.' },
  { h: 'Marked against criteria', p: 'Each subject has four criteria, A to D. Each one is marked from 0 to 8, so you always know which skill a mark is about.' },
  { h: 'A final grade from 1 to 7', p: 'At the end of the year the criteria add up to a final grade from 1 to 7 in each subject.' },
  { h: 'Learning across subjects', p: 'Some units connect two subjects around one big question: these are interdisciplinary units.' },
  { h: 'The Personal Project', p: 'In Grade 10 you choose something you care about and make it real, then reflect on how you did it.' },
];
export const DP = [
  { h: 'Six subjects', p: 'One from each of six groups, usually three at Higher Level and three at Standard Level.' },
  { h: 'Graded 1 to 7', p: 'Each subject is graded from 1 to 7, so 42 points come from your subjects.' },
  { h: 'The core', p: 'Theory of Knowledge, the Extended Essay and CAS run alongside your subjects and can add up to 3 more points: 45 is the maximum.' },
];

export const FACTS = [
  { n: '1980', t: 'the year St. Nicholas was founded' },
  { n: '17', t: 'nationalities among students and teachers' },
  { n: '10–15', t: 'students in most classes (your year has 50–60, split by subject)' },
  { n: '24+', t: 'years teaching the IB' },
];

export const DAY = [
  { t: '08:00', h: 'School starts', p: 'Everyone in Secondary starts at the same time.' },
  { t: 'Morning', h: 'Lessons', p: 'Your classes change by subject, so you move between rooms and meet different people.' },
  { t: '10:00', h: 'Break', p: 'Time to breathe. Ambassadors meet on Wednesdays at break: come and say hi.' },
  { t: 'During the week', h: 'Tutor time and PSHE', p: 'Your tutor group is your home base, and your tutor is the first person to ask.' },
  { t: '15:40', h: 'Secondary finishes', p: 'Extra-curricular activities (ECAs) happen after school on some days.' },
];

export const MYTHS = [
  { q: '“In the MYP, a 6 means I did badly.”', a: 'Myth.', p: 'MYP criteria go from 0 to 8, so a 6 out of 8 is a strong mark. Ask your teacher what the next level needs.' },
  { q: '“My class will have 55 people.”', a: 'Myth.', p: 'Your year has 50–60 students, but classes are of 10 to 15 and change by subject.' },
  { q: '“Joining in January means I missed everything.”', a: 'Not quite.', p: 'There is a New Learners Orientation Morning on 22 January, and the Ambassadors will be there to welcome you.' },
  { q: '“I will have nobody to ask.”', a: 'Myth.', p: 'Your tutor is the first person to ask, and the Ambassadors from your grade are here to help. Use “Ask an Ambassador” on this site.' },
];

export const EVENTS = [
  { k: 'Spelling Bee', d: 'Three rounds: tutor groups, then the whole grade, then the Grand Final. Run by the Student Council.', when: 'November – December' },
  { k: 'International Day', d: 'A day to celebrate the many nationalities in our community.', when: 'Date to be confirmed' },
  { k: 'Made in Brazil', d: 'A celebration of Brazilian culture.', when: 'Date to be confirmed' },
  { k: 'MUNicks', d: 'Our Model United Nations conference: debate, diplomacy and a lot of preparation.', when: 'Date to be confirmed' },
];

// Grade pages. `todo: true` = the grade team is still writing it (shown with a soft tag on the site).
export const GRADES = {
  6: {
    title: 'From Primary to MYP',
    lead: 'Grade 6 is your first year of Secondary and of the MYP. More teachers, more rooms, more independence.',
    cards: [
      { h: 'Primary vs Secondary', p: 'What changes, side by side: rooms, teachers, timetable, homework and lockers.', todo: true },
      { h: 'Reading your timetable', p: 'A real timetable, explained step by step.', todo: true },
      { h: 'Backpack and locker checklist', p: 'Made by Grade 7 students who were in your place last year.', todo: true },
    ],
    team: 'Anuja',
  },
  7: {
    title: 'Settling into the MYP',
    lead: 'If you join in Grade 7, your classmates already had a year of MYP. Here is how to catch up fast.',
    cards: [
      { h: 'Joining in the middle of the MYP', p: 'What your classmates already know and how to catch up.', todo: true },
      { h: 'MYP criteria, simply', p: 'In the MYP, each subject is marked against criteria (A, B, C, D), each out of 8. One marked task as an example is coming.', todo: false },
      { h: 'Group projects', p: 'How to split the work fairly, and what to do when it is not fair.', todo: true },
    ],
    team: 'Anuja',
  },
  8: {
    title: 'More independence',
    lead: 'Grade 8 brings interdisciplinary units, the Life Skills Trip and more responsibility for your own work.',
    cards: [
      { h: 'Interdisciplinary units', p: 'Two subjects working on one unit, explained by a Grade 8 student with a real example.', todo: true },
      { h: 'Design: idea to product', p: 'How a Design project goes from the first idea to the final product, with tips from the MiniDoc unit.', todo: true },
      { h: 'The Life Skills Trip', p: 'What to pack and what it is really like.', todo: true },
      { h: 'Your class representatives', p: 'Who they are and how to take an idea to them.', todo: true },
    ],
    team: 'Anuja',
  },
  9: {
    title: 'Getting ready for the Personal Project',
    lead: 'A heavier workload, and the year to start thinking about your Personal Project.',
    cards: [
      { h: 'Personal Project preview', p: 'What Grade 10 students wish they had started thinking about in Grade 9.', todo: true },
      { h: 'A week with many deadlines', p: 'A sample planner page, filled in by a real Grade 9 student.', todo: true },
      { h: 'Competitions and roles', p: 'Spelling Bee, MUN, Student Council and more, and how to sign up.', todo: false },
    ],
    team: 'Francisca',
  },
  10: {
    title: 'The Personal Project and choosing the DP',
    lead: 'The last year of the MYP: the Personal Project, and choosing your DP subjects.',
    cards: [
      { h: 'Personal Project timeline', p: 'From a student who finished it, with the mistakes to avoid.', todo: true },
      { h: 'Choosing DP subjects', p: 'The questions to ask yourself and who to talk to before deciding.', todo: true },
      { h: '“What I would tell myself in Grade 10”', p: 'An interview with a Grade 11 student.', todo: true },
    ],
    team: 'Ana L. and Sofia B.',
  },
  11: {
    title: 'Starting the DP',
    lead: 'The IB Diploma Programme: six subjects, plus CAS, TOK and the Extended Essay.',
    cards: [
      { h: 'DP in one page', p: 'CAS: creativity, activity and service. TOK: Theory of Knowledge, how we know what we know. The Extended Essay: your own 4,000-word research paper.', todo: false },
      { h: 'A week in the life of a DP student', p: 'Hour by hour.', todo: true },
      { h: 'Using free periods well', p: 'Tips from Grade 12 students.', todo: true },
    ],
    team: 'Fernando, Oliver, Leopoldo, Elena, Emilly and Maya',
  },
};

export const GLOSSARY = [
  ['IB', 'International Baccalaureate: the programmes we follow, from Early Years to Grade 12.', 'International Baccalaureate: os programas que seguimos, do Early Years ao Grade 12.'],
  ['MYP', 'Middle Years Programme: Grades 6 to 10.', 'Middle Years Programme: do Grade 6 ao Grade 10.'],
  ['DP', 'Diploma Programme: Grades 11 and 12.', 'Diploma Programme: Grade 11 e Grade 12.'],
  ['PYP', 'Primary Years Programme: before Secondary.', 'Primary Years Programme: antes do Secondary.'],
  ['Criteria', 'How MYP work is marked: each subject has criteria A to D, each out of 8.', 'Como os trabalhos do MYP são avaliados: cada matéria tem critérios A a D, cada um de 0 a 8.'],
  ['Personal Project', 'A project of your own choice at the end of the MYP (Grade 10).', 'Um projeto escolhido por você no fim do MYP (Grade 10).'],
  ['Interdisciplinary unit', 'A unit where two subjects work together on one big question.', 'Uma unidade em que duas matérias trabalham juntas numa mesma pergunta.'],
  ['CAS', 'Creativity, Activity, Service: part of the DP, outside the classroom.', 'Criatividade, Atividade e Serviço: parte do DP, fora da sala de aula.'],
  ['TOK', 'Theory of Knowledge: a DP course about how we know what we know.', 'Teoria do Conhecimento: matéria do DP sobre como sabemos o que sabemos.'],
  ['Extended Essay', 'A 4,000-word research paper on a topic you choose, in the DP.', 'Uma pesquisa de 4.000 palavras sobre um tema que você escolhe, no DP.'],
  ['Tutor group', 'Your home group, with your tutor. The first place to go with any question.', 'Sua turma de referência, com o seu tutor. O primeiro lugar para levar qualquer dúvida.'],
  ['Tutor', 'The teacher who looks after your tutor group.', 'O professor responsável pela sua tutor group.'],
  ['PSHE', 'Personal, Social and Health Education: a lesson about life, well-being and the school community.', 'Educação pessoal, social e de saúde: aula sobre vida, bem-estar e a comunidade da escola.'],
  ['ECA', 'Extra-curricular activity: clubs and sports after school.', 'Atividade extracurricular: clubes e esportes depois da aula.'],
  ['Half-term', 'A short holiday in the middle of a term.', 'Uma pausa curta no meio do semestre.'],
  ['Student Council', 'Students elected to represent the school and run events like the Spelling Bee.', 'Alunos eleitos que representam a escola e organizam eventos como o Spelling Bee.'],
  ['Ambassadors', 'Students who welcome new families and new students. We wrote this site.', 'Alunos que recebem as famílias e os alunos novos. Fomos nós que fizemos este site.'],
  ['MUN', 'Model United Nations: students debate as delegates of different countries.', 'Simulação da ONU: alunos debatem como delegados de países.'],
  ['Orientation Morning', 'A morning for new learners before the first day.', 'Uma manhã para os alunos novos antes do primeiro dia.'],
  ['Timetable', 'Your weekly schedule of lessons and rooms.', 'Seu horário semanal de aulas e salas.'],
  ['Deadline', 'The date work must be handed in.', 'A data de entrega de um trabalho.'],
];

export const CHECKLIST = [
  'Find your tutor group room',
  'Learn your timetable for Monday',
  'Know where your next lesson is before the bell',
  'Eat lunch with someone new',
  'Write your Ambassador’s name on your card',
  'Ask your tutor one question',
  'Try one club or activity',
  'Learn three new words from the glossary',
];

export const QUIZ = {
  questions: [
    { q: 'On a free afternoon you would rather…', a: [['Play a sport', 'sport'], ['Make or create something', 'arts'], ['Discuss a big question', 'debate'], ['Organise something for others', 'lead']] },
    { q: 'In a group project you are usually the one who…', a: [['Keeps everyone moving', 'lead'], ['Makes it look great', 'arts'], ['Argues for the best idea', 'debate'], ['Brings the energy', 'sport']] },
    { q: 'Pick a superpower:', a: [['Speak every language', 'debate'], ['Never get tired', 'sport'], ['Draw anything', 'arts'], ['Make anyone feel welcome', 'host']] },
    { q: 'A new student looks lost. You…', a: [['Show them around', 'host'], ['Invite them to play', 'sport'], ['Ask about their old school', 'debate'], ['Plan a welcome for them', 'lead']] },
    { q: 'Your dream school event is…', a: [['A competition', 'debate'], ['A show or exhibition', 'arts'], ['A tournament', 'sport'], ['A day you organised yourself', 'lead']] },
  ],
  results: {
    sport: { h: 'Sports and ECAs', p: 'Try a sports ECA after school. Ask your tutor which ones run on which days.' },
    arts: { h: 'Arts and events', p: 'Look out for International Day and Made in Brazil: they always need creative people.' },
    debate: { h: 'MUN and the Spelling Bee', p: 'MUNicks is our Model United Nations; the Spelling Bee is for word lovers.' },
    lead: { h: 'Student Council', p: 'The Student Council runs events like the Spelling Bee. Talk to your class representatives.' },
    host: { h: 'Ambassadors', p: 'You would be a great Ambassador: we welcome new students and families. Ask us how to join.' },
  },
};

// Only Ambassadors whose grade we have confirmed. The Media team adds the rest, with photos.
export const AMBASSADORS = [
  ['Gustavo', 8], ['Lucas F.', 8], ['Anuja', 8], ['Francisca', 9],
  ['Leopoldo', 11], ['Maya', 11], ['Oliver', 11], ['Elena', 11],
];
