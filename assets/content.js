/*
  Все тексты, ссылки, цены, картинки и порядок блоков сайта.
  Блок можно убрать, повторить или переставить в массиве blocks.
  ad: true  — блок показывается только на главной (с рекламой), на /lesson/ его нет.
  lesson: true — блок показывается только на /lesson/.
  Пути к картинкам пишутся от папки gh/ (media/имя.webp).
  Иконки: имена из assets/render.js → ICONS.
*/
window.SITE = {
  meta: {
    lang: 'ru',
    title: 'Язык по 20 минут в день: план, планер недели и проверка навыков',
    description: 'Гайд о том, как учить язык короткими занятиями: три шага, планер недели и профиль навыков.',
    titleLesson: 'Язык по 20 минут в день: гайд'
  },

  // Цвета и шрифты можно переопределить здесь (ключ = CSS-переменная без --)
  theme: {
    // blue: '#2552e0', lime: '#c9ee5b', bg: '#ececec'
  },

  links: {
    english: 'https://app.lava.top/products/2c950aa0-d8be-4317-8f39-0f9b4016f5da',
    turkish: 'https://app.lava.top/products/2cdbb9f8-e65b-443e-8d2c-4fea4c121e41',
    turkishWhatsApp: 'https://wa.me/message/RCHLEOGGLZ5OC1'
  },

  brand: { name: 'Диас и Тимур', href: '#top' },

  nav: {
    links: [
      { text: 'План', href: '#plan' },
      { text: 'Шаги', href: '#steps' },
      { text: 'Неделя', href: '#week' },
      { text: 'Навыки', href: '#skills' },
      { text: 'Платформы', href: '#platforms', ad: true }
    ],
    // На главной кнопки ведут к платформам, на /lesson/ к планеру
    cta: [
      { text: 'Английский', href: '#platforms', style: 'dark', ad: true },
      { text: 'Турецкий', href: '#platforms', style: 'light', ad: true },
      { text: 'Планер', href: '#week', style: 'dark', lesson: true },
      { text: 'Навыки', href: '#skills', style: 'light', lesson: true }
    ]
  },

  // Видео для кнопок «play» (без звука)
  video: { src: 'media/tr-guide.mp4', poster: 'media/tr-guide-poster.webp', label: 'Как выглядит разобранная тема' },

  blocks: [
    {
      type: 'hero',
      lines: ['Слушать', { avatars: true, text: 'Говорить' }, 'Понимать'],
      avatars: [
        { src: 'media/av-dias.webp', alt: 'Диас' },
        { src: 'media/av-timur.webp', alt: 'Тимур' }
      ],
      text: 'Гайд о том, как учить язык короткими занятиями. Внутри план на неделю, проверка навыков и три шага, которые держат ритм.',
      button: { text: 'Начать', href: '#plan' },
      image: { src: 'media/hero-timur.webp', alt: 'Тимур, автор курса турецкого', w: 900, h: 961 },
      chips: [
        { text: 'Короткие занятия', pos: 'left:57%;top:56%', cls: 'c1' },
        { text: 'Ответ сразу', pos: 'right:3%;top:70%', cls: 'c2' }
      ]
    },
    {
      type: 'bento3',
      dark: { label: 'Коротко о гайде', title: 'Как учить язык, когда на него есть 20 минут в день.' },
      white: { time: '0:13 мин', image: { src: 'media/headphones.webp', alt: 'Белые наушники', w: 640, h: 460 } },
      lime: { title: 'Немного слушать, говорить, читать и писать каждый день.', image: { src: 'media/plant.webp', alt: 'Росток с круглыми листьями', w: 560, h: 371 } }
    },
    {
      type: 'about', id: 'plan',
      label: 'О гайде', num: '01',
      dark: 'Этот гайд собирает занятия в систему,',
      gray: 'чтобы язык держался в голове дольше одной недели. Внутри план, проверка навыков и разбор частых ошибок.',
      stats: [
        { value: '20 мин', text: 'в день на старте' },
        { value: '7 дней', text: 'в планере недели' },
        { value: '4 навыка', text: 'слушать, говорить, читать, писать' },
        { value: '3 шага', text: 'от первой фразы к привычке' }
      ],
      stripTitle: 'Что подойдёт для занятий',
      strip: [
        { icon: 'film', text: 'Сериалы' },
        { icon: 'mic', text: 'Подкасты' },
        { icon: 'book', text: 'Книги' },
        { icon: 'phone', text: 'Приложения' },
        { icon: 'youtube', text: 'YouTube' },
        { icon: 'chat', text: 'Диалоги' }
      ]
    },
    {
      type: 'problemSolution',
      meta: '(02) Разбор · ошибки',
      title: 'Почему бросают и что делать вместо этого.',
      text: 'Три причины, из-за которых язык откладывают. Для каждой есть простое решение.',
      problemsTitle: 'Что мешает', solutionsTitle: 'Что делать',
      rows: [
        { problem: ['Учишь списки слов', 'Через неделю половина забыта.'], solution: ['Фразы из ситуаций', 'Слово запоминается вместе с ситуацией.'], color: 'lime' },
        { problem: ['Ждёшь, когда будешь готов', 'Речь откладывается на месяцы.'], solution: ['Говоришь с первого дня', 'Вслух, хотя бы одну фразу.'], color: 'blue' },
        { problem: ['Занимаешься по настроению', 'Ритма нет, прогресс не виден.'], solution: ['20 минут по плану', 'Короткое занятие проще не пропустить.'], color: 'white' }
      ]
    },
    {
      type: 'steps', id: 'steps',
      meta: '(03) План · три шага',
      title: 'От первой фразы к привычке в три шага.',
      text: 'Сначала понять, где ты сейчас. Потом найти время. Потом держать ритм и видеть результат.',
      items: [
        { title: 'Проверь навыки', text: 'Отметь ниже, что даётся легко, а что трудно. Так видно, с чего начать.', tags: ['5 минут', '6 навыков'], href: '#skills' },
        { title: 'Собери свою неделю', text: 'Выбери в планере время, когда у тебя точно есть 20 минут.', tags: ['7 дней', '20 минут'], href: '#week', accent: true },
        { title: 'Повторяй и отмечай', text: 'После занятия отмечай, что сделал. Через неделю видно, что работает.', tags: ['Повторение', 'Прогресс'], href: '#week' }
      ]
    },
    {
      type: 'features',
      meta: '(04) Способы · что работает',
      title: 'Всё, что нужно для занятий по 20 минут.',
      text: 'Шесть простых приёмов. Каждый можно начать сегодня и ничего не покупать.',
      button: { text: 'К планеру', href: '#week' },
      photo: { title: 'Учись там, где удобно', text: 'У окна, в дороге, за кофе. Двадцать минут находятся почти везде.', chip: 'Дом, дорога, кафе', image: { src: 'media/dias-window.webp', alt: 'Диас с книгой у окна', w: 1200, h: 900 } },
      paths: { title: 'Свой порядок тем', text: 'Начинай с того, что нужно сейчас: поездка, работа, экзамен или сериалы.', chips: ['Поездка', 'Работа', 'Экзамен', 'Сериалы'], on: 1 },
      feedback: { title: 'Проверка сразу', text: 'Ответил, сверил, понял ошибку. Пока помнишь, почему ответил именно так.', note: 'Сверяй ответ сразу после задания' },
      progress: { title: 'Прогресс по неделям', text: 'Отмечай занятия и смотри, как растёт ряд.', bars: [22, 34, 30, 46, 52, 64, 88] },
      tutor: { title: 'Вопросы в одном месте', text: 'Записывай непонятное сразу, чтобы потом найти ответ или спросить.', q: 'Как сказать «я уже был здесь»?', a: 'Запиши вопрос и найди его в теме про прошедшее время.' },
      rooms: { title: 'Учиться вдвоём', text: 'С другом проще держать ритм: договоритесь о времени и проверяйте друг друга.', tag: 'Пара на неделю' }
    },
    {
      type: 'heatmap', id: 'week',
      meta: '(05) Планер · твоя неделя',
      title: 'Когда у тебя есть 20 минут.',
      text: 'Нажми на клетки, когда точно можешь заниматься. Планер запомнит выбор в этом браузере.',
      cardTitle: 'Моя неделя',
      days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      rows: ['Утро', 'Обед', 'После работы', 'Вечер', 'Перед сном'],
      hint: 'Для начала хватит четырёх или пяти занятий в неделю.',
      // Подсказка-фон: насколько удобно время обычно (0–4), только для вида
      shade: [[0,0,0,0,0,2,2],[1,1,1,1,1,2,2],[2,2,2,2,1,2,2],[3,3,3,3,2,2,3],[2,2,2,2,1,1,2]],
      lists: [
        { title: 'Цели', style: 'white', items: ['Понимать, а не заучивать', 'Заниматься по 20 минут', 'Говорить на простые темы'] },
        { title: 'Что мешает', style: 'dark', items: ['Длинные видео без практики', 'Ошибки видны только на экзамене', 'Непонятно, есть ли прогресс'] }
      ]
    },
    {
      type: 'persona', id: 'skills',
      meta: '(06) Навыки · проверь себя',
      title: 'Твой профиль навыков.',
      text: 'Отметь уровень от 1 до 5 для каждого навыка. Самый слабый навык подскажет, с чего начать.',
      image: { src: 'media/dias-coffee.webp', alt: 'Диас с чашкой кофе', w: 900, h: 1065 },
      name: 'Твой профиль', sub: 'Обновляется, пока ты отмечаешь уровни',
      cardTitle: 'Профиль',
      skills: [
        { name: 'Слушать', v: 3 }, { name: 'Говорить', v: 2 }, { name: 'Читать', v: 4 },
        { name: 'Писать', v: 2 }, { name: 'Слова', v: 3 }, { name: 'Грамматика', v: 3 }
      ],
      stats: [
        { value: '1 навык', text: 'в фокусе на неделю', style: 'blue' },
        { value: '20 мин', text: 'одно занятие', style: 'white' },
        { value: '3 раза', text: 'повторить тему за неделю', style: 'lime' }
      ]
    },
    {
      type: 'quote',
      text: '«Каждая тема как эта: сначала смешно, потом понятно, потом руками.»',
      cite: 'Тимур, автор курса турецкого Alterna Timur'
    },

    /* ================= РЕКЛАМА (только на главной) ================= */
    {
      type: 'overview', ad: true, id: 'platforms',
      meta: '(07) Платформы · английский и турецкий',
      titleA: 'Учить дальше вместе с ', titleB: 'Диасом и Тимуром',
      text: 'Этот гайд ты прочитал за несколько минут. Так же по шагам разобраны все темы на двух платформах: английский от Диаса и турецкий от Тимура. Каждая от A0 до C1.',
      buttons: [
        { text: 'Английский за 30 €', href: '@english', style: 'dark' },
        { text: 'Турецкий за 30 €', href: '@turkish', style: 'blue' }
      ],
      tiles: [
        { src: 'media/dias-coffee.webp', alt: 'Диас', label: 'Dias English' },
        { src: 'media/timur-portrait.webp', alt: 'Тимур', label: 'Alterna Timur' }
      ],
      cards: [
        { cap: 'Языки', num: '01', flags: ['EN', 'TR'] },
        { cap: 'Уровни', num: '02', value: 'От A0 до C1 на каждой платформе' },
        { cap: 'Цена', num: '03', value: '30 €', big: true, style: 'blue' },
        { cap: 'Доступ', num: '04', value: 'Один раз и навсегда, с телефона и ноутбука' }
      ]
    },
    {
      type: 'tracks', ad: true,
      meta: '(08) Внутри · как это выглядит',
      title: 'Выбери язык и посмотри, что внутри.',
      tabs: [{ key: 'all', text: 'Все' }, { key: 'en', text: 'Английский' }, { key: 'tr', text: 'Турецкий' }],
      items: [
        { lang: 'en', chip: 'English · A0', img: 'media/en-a0-roadmap.webp', w: 1100, h: 688, title: 'Дорожная карта по уровням', text: 'Темы идут по порядку от A0 до C1. Видно, что уже пройдено.', meta: 'Dias English · Notion', price: '30 €', href: '@english', wide: true },
        { lang: 'tr', chip: 'Türkçe · B1', img: 'media/tr-b1.webp', w: 1100, h: 561, title: 'Гайды по грамматике', text: '128 гайдов: 58 для A1-A2 и 70 для B1-C1.', meta: 'Alterna Timur', price: '30 €', href: '@turkish', wide: true },
        { lang: 'en', chip: 'English · грамматика', img: 'media/en-a0-grammar.webp', w: 1100, h: 688, title: 'Грамматические темы', text: 'Каждая тема разобрана по шагам на русском.', meta: 'Dias English · Notion', price: '30 €', href: '@english' },
        { lang: 'en', chip: 'English · Lexika', img: 'media/en-a0-lexika.webp', w: 1100, h: 688, title: 'Словарь Lexika', text: 'Слова по темам, чтобы учить их вместе с ситуацией.', meta: 'Dias English · Notion', price: '30 €', href: '@english' },
        { lang: 'en', chip: 'English · Gemini', img: 'media/en-a0-gemini.webp', w: 1100, h: 688, title: 'Практика в Gemini', text: 'Задания, где нужно отвечать самому.', meta: 'Dias English · Notion', price: '30 €', href: '@english' },
        { lang: 'en', chip: 'English · трекер', img: 'media/en-habits.webp', w: 1100, h: 687, title: 'Трекер и привычки', text: 'Отмечаешь занятия и видишь свой ритм.', meta: 'Dias English · Notion', price: '30 €', href: '@english' },
        { lang: 'tr', chip: 'Türkçe · лексика', img: 'media/tr-lexika.webp', w: 1100, h: 667, title: 'Лексика по темам', text: '131 блок лексики: то, что реально говорят.', meta: 'Alterna Timur', price: '30 €', href: '@turkish' },
        { lang: 'tr', chip: 'Türkçe · гайд', video: 'media/tr-guide.mp4', img: 'media/tr-guide-poster.webp', w: 1000, h: 476, title: 'Тема целиком', text: 'Сначала смешно, потом понятно, потом упражнения с разбором.', meta: 'Alterna Timur', price: '30 €', href: '@turkish' },
        { lang: 'en', chip: 'English · главная', img: 'media/en-home.webp', w: 1100, h: 687, title: 'Главная страница курса', text: 'Все разделы в одном месте в Notion.', meta: 'Dias English · Notion', price: '30 €', href: '@english' }
      ]
    },
    {
      type: 'who', ad: true,
      meta: '(09) Кому подойдёт',
      title: 'Для кого и с какого уровня.',
      lists: [
        { title: 'Английский с Диасом', style: 'white', items: ['Начинаешь с нуля: старт с A0', 'Есть база: темы до C1', 'Нужна практика: задания в Gemini', 'Хочешь ритм: трекер и привычки'] },
        { title: 'Турецкий с Тимуром', style: 'dark', items: ['Едешь в Турцию: кофе, вывески, ответы', 'Любишь сериалы: материалы по уровням', 'Нужен экзамен: блоки A1, A2, B1, B2, C1', 'Живёшь в Турции: 36 гайдов по работе'] }
      ]
    },
    {
      type: 'counts', ad: true,
      meta: '(10) Цифры · турецкая платформа',
      title: 'Что внутри у Тимура.',
      text: 'Цифры с сайта Тимура, их можно пересчитать на платформе.',
      items: [
        { value: 128, text: 'гайдов по грамматике', num: '01' },
        { value: 131, text: 'блок лексики по темам', num: '02', style: 'dark' },
        { value: 109, text: 'интерактивных ресурсов', num: '03' },
        { value: 1716, text: 'материалов по уровням', num: '04' }
      ],
      insights: [
        { style: 'blue', cap: 'Цена', big: '30 €', text: 'Один раз, доступ навсегда. Так на обеих платформах.', levels: ['A0', 'A1', 'A2', 'B1', 'B2', 'C1'], fill: 100 },
        { style: 'dark', cap: 'Экзамены', mid: '5 из 5', text: 'уровней экзамена с отдельным блоком: A1, A2, B1, B2, C1.', dots: ['A1', 'A2', 'B1', 'B2', 'C1'], on: 5 },
        { style: 'lime', cap: 'Начальный уровень', ring: 45, ringText: '58', text: 'из 128 гайдов по грамматике для A1-A2.' }
      ]
    },
    {
      type: 'authors', ad: true,
      meta: '(11) Авторы',
      title: 'Кто ведёт курсы.',
      people: [
        { image: { src: 'media/dias-coffee.webp', alt: 'Диас', w: 900, h: 1065 }, name: 'Диас', sub: 'Казыгурт, НИШ, Sapienza в Риме', pills: [['Курс', 'English'], ['Уровни', 'A0 до C1'], ['Где', 'Notion']], href: '@english', button: 'Английский за 30 €' },
        { image: { src: 'media/timur-portrait.webp', alt: 'Тимур', w: 800, h: 981 }, name: 'Тимур', sub: 'Alterna Timur, турецкий от A0 до C1', pills: [['Курс', 'Türkçe'], ['Материалы', '1716'], ['Экзамены', '32 блока']], href: '@turkish', button: 'Турецкий за 30 €' }
      ]
    },
    {
      type: 'prices', ad: true,
      meta: '(12) Цена · что входит',
      title: 'Один платёж, доступ навсегда.',
      items: [
        { style: 'dark', cap: 'English', name: 'Dias English', amount: '30 €', note: 'один раз',
          list: ['Уровни от A0 до C1', 'Дорожная карта по уровням', 'Грамматические темы', 'Словарь Lexika', 'Практика в Gemini', 'Трекер и привычки', 'В Notion: телефон и ноутбук'],
          buttons: [{ text: 'Купить английский', href: '@english', style: 'lime' }] },
        { style: 'blue', cap: 'Türkçe', name: 'Alterna Timur', amount: '30 €', note: 'один раз',
          list: ['Уровни от A0 до C1', '128 гайдов по грамматике', '131 блок лексики по темам', '109 интерактивных ресурсов', '32 блока по экзаменам', '36 гайдов по работе', '1716 материалов по уровням'],
          buttons: [{ text: 'Купить турецкий', href: '@turkish', style: 'light' }, { text: 'Спросить в WhatsApp', href: '@turkishWhatsApp', style: 'dark', icon: 'chat' }] }
      ]
    },
    {
      type: 'reviews', ad: true,
      meta: '(13) Отзывы · турецкий',
      title: 'Что пишут Тимуру в личку.',
      text: 'Настоящие сообщения. Текст не менялся, имена и аватарки убраны.',
      items: [
        { img: 'media/tr-rv1-c.webp', w: 520, h: 460, style: 'blue' },
        { img: 'media/tr-rv2-c.webp', w: 520, h: 697, style: 'white' },
        { img: 'media/tr-rv3-c.webp', w: 520, h: 652, style: 'lime' }
      ]
    },
    {
      type: 'final', ad: true,
      lines: ['Спасибо, что', 'дочитал!'],
      phone: { src: 'media/en-m-roadmap.webp', alt: 'Дорожная карта курса на телефоне', w: 500, h: 1083 },
      title: 'Выбери язык и', titleEm: 'продолжай',
      text: 'Английский с Диасом или турецкий с Тимуром. 30 € один раз, доступ навсегда.',
      buttons: [
        { text: 'Английский за 30 €', href: '@english', style: 'lime' },
        { text: 'Турецкий за 30 €', href: '@turkish', style: 'light' }
      ]
    },

    /* ================= КОНЦОВКА /lesson/ ================= */
    {
      type: 'final', lesson: true,
      lines: ['Спасибо, что', 'дочитал!'],
      phone: { src: 'media/en-m-roadmap.webp', alt: 'Дорожная карта на телефоне', w: 500, h: 1083 },
      title: 'Вернись через', titleEm: 'неделю',
      text: 'Сохрани ссылку. Через семь дней открой планер и посмотри, сколько занятий получилось.',
      buttons: [
        { text: 'К планеру', href: '#week', style: 'lime' },
        { text: 'Поделиться', href: '#share', style: 'light', icon: 'share' }
      ]
    }
  ],

  footer: { left: 'Диас и Тимур', right: [{ text: 'Наверх', href: '#top' }] }
};
