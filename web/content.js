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

// The Secondary day (confirmed by the Ambassadors, 25/11). Seven 50-minute periods.
export const DAY = [
  { s: '08:00', e: '08:20', h: 'Tutor time', p: 'Start the day with your tutor group. Your tutor is the first person to ask about anything.' },
  { s: '08:20', e: '09:10', h: 'Period 1', p: 'Lessons are 50 minutes. Classes change by subject, so you move rooms.' },
  { s: '09:10', e: '10:00', h: 'Period 2', p: 'Check your timetable for the room before the bell.' },
  { s: '10:00', e: '10:30', h: 'Break', p: 'Thirty minutes. Ambassadors meet on Wednesdays at break in Humanities 3: come and say hi.' },
  { s: '10:30', e: '11:20', h: 'Period 3', p: 'Back to lessons.' },
  { s: '11:20', e: '12:10', h: 'Period 4', p: 'Halfway through the day.' },
  { s: '12:10', e: '13:00', h: 'Period 5', p: 'The last lesson before lunch.' },
  { s: '13:00', e: '14:00', h: 'Lunch', p: 'A whole hour. Eat with someone new: it is on your week-one list.' },
  { s: '14:00', e: '14:50', h: 'Period 6', p: 'Afternoon lessons.' },
  { s: '14:50', e: '15:40', h: 'Period 7', p: 'The last lesson. Secondary finishes at 15:40.' },
];

export const MYTHS = [
  { q: '“In the MYP, a 6 means I did badly.”', a: 'Myth.', p: 'MYP criteria go from 0 to 8, so a 6 out of 8 is a strong mark. Ask your teacher what the next level needs.' },
  { q: '“My class will have 55 people.”', a: 'Myth.', p: 'Your year has 50–60 students, but classes are of 10 to 15 and change by subject.' },
  { q: '“Joining in January means I missed everything.”', a: 'Not quite.', p: 'There is a New Learners Orientation Morning on 22 January, and the Ambassadors will be there to welcome you.' },
  { q: '“I will have nobody to ask.”', a: 'Myth.', p: 'Your tutor is the first person to ask, and the Ambassadors from your grade are here to help. Use “Ask an Ambassador” on this site.' },
];

export const EVENTS = [
  { k: 'Open Day', d: 'Families visit the school. The Ambassadors give the tours, so you may be one of the guides next time.', when: 'Twice a year' },
  { k: 'Life Skills Trip', d: 'A trip for Grade 8. In 2026 it went to Ubatuba, on the coast of São Paulo.', when: 'Grade 8 · in October in 2026' },
  { k: 'Spelling Bee', d: 'Three rounds: tutor groups, then the whole grade, then the Grand Final. Run by the Student Council.', when: 'November – December' },
  { k: 'International Day', d: 'A day to celebrate the many nationalities in our community.', when: 'Date to be confirmed' },
  { k: 'Made in Brazil', d: 'Student writing chosen for the Made in Brazil book, celebrated at a ceremony with an award for each year group. Winners only find out on the day.', when: 'Date to be confirmed' },
  { k: 'MUNicks', d: 'Our Model United Nations conference: debate, diplomacy and a lot of preparation.', when: 'Date to be confirmed' },
];

// Grade pages. Only finished cards are listed; unfinished ones stay out until the grade team writes them.
export const GRADES = {
  6: {
    title: 'From Primary to MYP',
    lead: 'Grade 6 is your first year of Secondary and of the MYP. More teachers, more rooms, more independence.',
    cards: [
    ],
    team: 'Anuja',
  },
  7: {
    title: 'Settling into the MYP',
    lead: 'If you join in Grade 7, your classmates already had a year of MYP. Here is how to catch up fast.',
    cards: [
      { h: 'MYP criteria, simply', p: 'In the MYP, each subject is marked against criteria (A, B, C, D), each out of 8.', todo: false },
    ],
    team: 'Anuja',
  },
  8: {
    title: 'More independence',
    lead: 'Grade 8 brings interdisciplinary units, the Life Skills Trip (Ubatuba, in 2026) and more responsibility for your own work.',
    cards: [
    ],
    team: 'Anuja',
  },
  9: {
    title: 'Getting ready for the Personal Project',
    lead: 'A heavier workload, and the year to start thinking about your Personal Project.',
    cards: [
      { h: 'Competitions and roles', p: 'Spelling Bee, MUN, Student Council and more. Ask an Ambassador how to join each one.', todo: false },
    ],
    team: 'Francisca',
  },
  10: {
    title: 'The Personal Project and choosing the DP',
    lead: 'The last year of the MYP: the Personal Project, and choosing your DP subjects.',
    cards: [
    ],
    team: 'Ana L. and Sofia B.',
  },
  11: {
    title: 'Starting the DP',
    lead: 'The IB Diploma Programme: six subjects, plus CAS, TOK and the Extended Essay.',
    cards: [
      { h: 'DP in one page', p: 'CAS: creativity, activity and service. TOK: Theory of Knowledge, how we know what we know. The Extended Essay: your own 4,000-word research paper.', todo: false },
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
  ['Bulletin', 'The school news your tutor reads in tutor time. The Year Group Information at the back is the part for your grade.', 'As notícias da escola que o tutor lê na tutor time. O Year Group Information, no fim, é a parte da sua série.'],
  ['Tuck shop', 'The school snack shop, open at break and at lunch.', 'A lanchonete da escola, aberta no break e no almoço.'],
  ['Class representative', 'A student elected to speak for your grade at the Student Council.', 'Aluno eleito para representar a sua série no Student Council.'],
  ['Junior Ambassadors', 'Grade 6 students who help the Ambassadors welcome new students.', 'Alunos do Grade 6 que ajudam os Ambassadors a receber os alunos novos.'],
  ['Alphaville', 'The other St. Nicholas campus. This guide is about the Pinheiros campus.', 'O outro campus da St. Nicholas. Este guia é sobre o campus de Pinheiros.'],
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
  ['Antônia', 6], ['Joana', 6], ['Olivia', 6], ['Maria Fernanda', 6], ['Nina', 6], ['Izabel', 6],
  ['Gustavo', 8], ['João', 8], ['Lucas F.', 8], ['Anuja', 8], ['Francisca', 9],
  ['Leopoldo', 11], ['Maya', 11], ['Oliver', 11], ['Elena', 11],
];

// Places you will hear about in your first week (names as the school uses them).
export const PLACES = [
  { n: 'The Deck', p: 'An outdoor wooden deck under a big tree, with tables and benches. A favourite spot at break.', img: 'img/deck.webp' },
  { n: 'The Green Area', p: 'Outdoor space for big activities. The whole of Grade 6 met here for the Spelling Bee.' },
  { n: 'The Learning Hub', p: 'A large indoor space. When it rains, activities from the Deck move here.' },
  { n: 'Humanities 2 and 3', p: 'Classrooms you will use a lot. The Ambassadors meet in Humanities 3 on Wednesdays at break.' },
  { n: 'Flex Rooms 1 and 2', p: 'Used together when a whole grade needs to be in one place.' },
  { n: 'The Library', p: 'For quiet study. At break there are card games too, an idea from the Student Council.' },
  { n: 'Multipurpose 2', p: 'In the Primary building. Secondary uses it for some grade events.' },
];

// Photos from the Ambassadors' folder, captioned only with what you can see.
export const PHOTOS = [
  { src: 'img/campus-field.webp', c: 'The field, with the city all around it.' },
  { src: 'img/classroom.webp', c: 'A Secondary classroom.' },
  { src: 'img/together.webp', c: 'Students gathered in front of a presentation.' },
  { src: 'img/lounge.webp', c: 'Group work does not always happen at a desk.' },
  { src: 'img/ambassadors.webp', c: 'Ambassadors wear these vests at events. Look for them.' },
  { src: 'img/study-hall.webp', c: 'A big room for study and meetings.' },
  { src: 'img/outdoor-group.webp', c: 'Outside, between buildings.' },
  { src: 'img/studio.webp', c: 'Rooms are made for working together.' },
];

// A real example of the year, with real numbers: the 2026 Spelling Bee.
export const BEE = [
  { n: '1', h: 'Round 1', p: 'Thursday 19 November, in every tutor group. 54 spellers went through.' },
  { n: '2', h: 'Round 2', p: 'Wednesday 25 November, one room per grade, with the words on a TV. 21 finalists.' },
  { n: '3', h: 'The Grand Final', p: 'Wednesday 2 December. Grade 6 against Grade 7, Grade 8 against Grade 9, and Grades 10, 11 and 12 together.' },
];

// Year by year (25/11). School facts come only from the school's "About the School" deck and the timetable Gustavo
// confirmed. The IB parts are the IB's own framework (the same in every IB school); nothing here is invented about St. Nicholas.
export const YEAR = {
  6: {
    prog: 'MYP Year 1', age: '11 to 12',
    ib: [
      { h: 'Six global contexts', p: 'Every MYP unit is set in one of six contexts: identities and relationships; orientation in space and time; personal and cultural expression; scientific and technical innovation; globalization and sustainability; fairness and development.' },
      { h: 'Approaches to learning', p: 'Five groups of skills you practise in every subject: thinking, communication, social, self-management and research. Teachers name them in each unit.' },
      { h: 'The learner profile', p: 'Ten traits the IB hopes you grow into: inquirer, knowledgeable, thinker, communicator, principled, open-minded, caring, risk-taker, balanced and reflective.' },
    ],
  },
  7: {
    prog: 'MYP Year 2', age: '12 to 13',
    ib: [
      { h: 'Four criteria per subject', p: 'Each subject has four criteria (A, B, C and D), each marked from 0 to 8. Your teacher tells you which criteria a task is assessing before you start.' },
      { h: 'Statement of inquiry', p: 'Each unit starts from one sentence that links a big idea to a global context. Reading it tells you what the unit is really about.' },
      { h: 'Service as action', p: 'The MYP asks you to take action in your community: helping, campaigning or volunteering, and then reflecting on what you learned.' },
    ],
  },
  8: {
    prog: 'MYP Year 3', age: '13 to 14',
    ib: [
      { h: 'Interdisciplinary units', p: 'The MYP brings two subjects together in at least one unit every year, so you use both to understand one problem.' },
      { h: 'Design cycle', p: 'In Design you go through four stages: inquiring and analysing, developing ideas, creating the solution, and evaluating.' },
      { h: 'Reflection counts', p: 'Many criteria ask you to reflect: what worked, what did not, and what you would change. It is marked, not just a nice extra.' },
    ],
  },
  9: {
    prog: 'MYP Year 4', age: '14 to 15',
    ib: [
      { h: 'The Personal Project is next', p: 'In MYP Year 5 every student completes a Personal Project. Year 4 is the time to notice what you really care about.' },
      { h: 'Higher expectations', p: 'The criteria stay the same, but the level of work expected for each band grows every year.' },
      { h: 'Managing your own deadlines', p: 'Self-management is one of the five skill groups the MYP asks you to build, and it shows most this year.' },
    ],
  },
  10: {
    prog: 'MYP Year 5', age: '15 to 16',
    ib: [
      { h: 'The Personal Project', p: 'A project of your own choice, over several months: you set a goal, create a product or outcome, keep a process journal and write a report.' },
      { h: 'How it is assessed', p: 'The IB assesses it on three criteria: planning, applying skills and reflecting.' },
      { h: 'Looking ahead to the DP', p: 'This is the year you choose your Diploma Programme subjects, three at Higher Level and three at Standard Level.' },
    ],
  },
  11: {
    prog: 'DP Year 1', age: '16 to 17',
    ib: [
      { h: 'Six subjects, two levels', p: 'One subject from each of six groups. Higher Level subjects have about 240 teaching hours and Standard Level about 150.' },
      { h: 'Theory of Knowledge', p: 'TOK asks how we know what we claim to know. It is assessed by an exhibition and a 1,600-word essay.' },
      { h: 'CAS and the Extended Essay', p: 'CAS (creativity, activity, service) runs for about 18 months. The Extended Essay is your own research paper of up to 4,000 words.' },
    ],
  },
};
export const YEARGROUP = { size: '50 to 60 students in each year', classes: '10 to 15 in most classes, mixed by subject', day: '08:00 to 15:40, seven periods' };

// MYP assessment criteria by subject group (the IB's own framework, the same in every IB school).
export const CRITERIA = [
  { g: 'Language and literature', c: ['Analysing', 'Organizing', 'Producing text', 'Using language'] },
  { g: 'Language acquisition', c: ['Listening', 'Reading', 'Speaking', 'Writing'] },
  { g: 'Individuals and societies', c: ['Knowing and understanding', 'Investigating', 'Communicating', 'Thinking critically'] },
  { g: 'Sciences', c: ['Knowing and understanding', 'Inquiring and designing', 'Processing and evaluating', 'Reflecting on the impacts of science'] },
  { g: 'Mathematics', c: ['Knowing and understanding', 'Investigating patterns', 'Communicating', 'Applying mathematics in real-life contexts'] },
  { g: 'Arts', c: ['Investigating', 'Developing', 'Creating or performing', 'Evaluating'] },
  { g: 'Physical and health education', c: ['Knowing and understanding', 'Planning for performance', 'Applying and performing', 'Reflecting and improving performance'] },
  { g: 'Design', c: ['Inquiring and analysing', 'Developing ideas', 'Creating the solution', 'Evaluating'] },
];
