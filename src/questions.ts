import { Question } from './types';

export const QUESTIONS: Question[] = [
  // Сөз түркүмдөрү (Parts of speech)
  {
    id: 1,
    text: "'Китеп' сөзү кайсы сөз түркүмүнө кирет?",
    options: ["Зат атооч", "Сын атооч", "Сан атооч", "Этиш"],
    correctAnswer: 0,
    topic: "Сөз түркүмдөрү",
    difficulty: "оңой"
  },
  {
    id: 2,
    text: "'Кызыл' сөзү кайсы сөз түркүмүнө кирет?",
    options: ["Зат атооч", "Сын атооч", "Сан атооч", "Этиш"],
    correctAnswer: 1,
    topic: "Сөз түркүмдөрү",
    difficulty: "оңой"
  },
  {
    id: 3,
    text: "'Окуу' сөзү кайсы сөз түркүмүнө кирет?",
    options: ["Зат атооч", "Сын атооч", "Сан атооч", "Этиш"],
    correctAnswer: 3,
    topic: "Сөз түркүмдөрү",
    difficulty: "оңой"
  },
  // Синоним / антоним
  {
    id: 4,
    text: "'Бийик' сөзүнүн антоними кайсы?",
    options: ["Узун", "Аласа", "Жапыз", "Кыска"],
    correctAnswer: 2,
    topic: "Синоним / антоним",
    difficulty: "оңой"
  },
  {
    id: 5,
    text: "'Адам' сөзүнүн синоними кайсы?",
    options: ["Киши", "Бала", "Кыз", "Аял"],
    correctAnswer: 0,
    topic: "Синоним / антоним",
    difficulty: "оңой"
  },
  // Орфография
  {
    id: 6,
    text: "Кайсы сөз туура жазылган?",
    options: ["Кыргызстан", "Кыргыстан", "Кыргызыстан", "Кыргысстан"],
    correctAnswer: 0,
    topic: "Орфография",
    difficulty: "оңой"
  },
  {
    id: 7,
    text: "Кайсы сөз туура жазылган?",
    options: ["Тундук", "Түндүк", "Тундук", "Түндүк"],
    correctAnswer: 1,
    topic: "Орфография",
    difficulty: "оңой"
  },
  // Сүйлөм түзүү (Sentence structure)
  {
    id: 8,
    text: "Сүйлөмдүн ээсин тап: 'Асан мектепке барды.'",
    options: ["Мектепке", "Барды", "Асан", "Жок"],
    correctAnswer: 2,
    topic: "Сүйлөм түзүү",
    difficulty: "оңой"
  },
  // Medium
  {
    id: 9,
    text: "Сан атоочтун канча түрү бар?",
    options: ["4", "5", "6", "7"],
    correctAnswer: 2,
    topic: "Сөз түркүмдөрү",
    difficulty: "орто"
  },
  {
    id: 10,
    text: "Чыгыш жөндөмөсүнүн мүчөсү кайсы?",
    options: ["-га", "-ны", "-дан", "-нын"],
    correctAnswer: 2,
    topic: "Сөз түркүмдөрү",
    difficulty: "орто"
  },
  {
    id: 11,
    text: "'Жакшы' сөзүнүн синоними кайсы?",
    options: ["Таттуу", "Сонун", "Ачуу", "Жаман"],
    correctAnswer: 1,
    topic: "Синоним / антоним",
    difficulty: "оңой"
  },
  {
    id: 12,
    text: "Этиштин чактары канчага бөлүнөт?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 1,
    topic: "Сөз түркүмдөрү",
    difficulty: "орто"
  },
  {
    id: 13,
    text: "Кайсы сөз туура жазылган?",
    options: ["Тундук", "Түндүк", "Түндүк", "Түндүк"],
    correctAnswer: 1,
    topic: "Орфография",
    difficulty: "оңой"
  },
  {
    id: 14,
    text: "Сүйлөмдүн баяндоочун тап: 'Биз тоого бардык.'",
    options: ["Биз", "Тоого", "Бардык", "Жок"],
    correctAnswer: 2,
    topic: "Сүйлөм түзүү",
    difficulty: "оңой"
  },
  {
    id: 15,
    text: "'Акылдуу' сөзүнүн антоними кайсы?",
    options: ["Билимдүү", "Тартиптүү", "Акылсыз", "Күчтүү"],
    correctAnswer: 2,
    topic: "Синоним / антоним",
    difficulty: "оңой"
  }
];
