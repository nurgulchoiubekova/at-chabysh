import { Question } from './types';

const BASE_QUESTIONS = [
  {
    text: "Адилеттин кайгысын унуттуруп, алаксытып, кыйын учурдан ким алып чыкты?",
    options: ["таякеси", "апасы", "Кылыч", "агайы"],
    correctAnswer: 3,
    topic: "Чыгарманын мазмуну"
  },
  {
    text: "Адилеттин шаардагы таекесинин аты ким?",
    options: ["Эсен", "Жапар", "Совет", "Кубаныч"],
    correctAnswer: 2,
    topic: "Каармандар"
  },
  {
    text: "Мектептеги болгон иш-чарада Адилет ким жөнүндө ыр айтып берген?",
    options: ["досу жөнүндө", "атасы мигрант бала жөнүндө", "апасы жөнүндө", "шахмат жөнүндө"],
    correctAnswer: 1,
    topic: "Чыгарманын мазмуну"
  },
  {
    text: "Чыгарманын негизги идеясы эмнеде?",
    options: ["Оюн ойноо", "Достук жөнүндө гана", "Чоңоюп, жоопкерчиликтүү болуу", "Табиятты сүрөттөө"],
    correctAnswer: 2,
    topic: "Идея жана маани"
  },
  {
    text: "Чыгармадагы окуя көбүнчө эмнеге байланыштуу?",
    options: ["Мамилени жакшыртуу", "Баланын тарбиясына", "Кыйынчылыктан чыгуу", "Спортко"],
    correctAnswer: 2,
    topic: "Идея жана маани"
  },
  {
    text: "Адилет жолдон гүл терип жатып кимдер менен сүйлөштү?",
    options: ["Кызгалдактар менен", "Достору менен", "Аты менен", "Эч ким менен сүйлөшкөн жок"],
    correctAnswer: 0,
    topic: "Чыгарманын мазмуну"
  }
];

const generateQuestions = () => {
  const allQuestions: Question[] = [];
  let id = 1;
  
  ['оңой', 'орто', 'татаал'].forEach((diff) => {
    BASE_QUESTIONS.forEach((q) => {
      allQuestions.push({
        ...q,
        id: id++,
        difficulty: diff as any
      });
    });
  });
  
  return allQuestions;
};

export const QUESTIONS: Question[] = generateQuestions();
