# Сайт 05 · kw-05-cobalt

Копия дизайна Cognix (Behance, AI Education Website) как шаблон для сайта под кодовое слово.
Реклама в конце: английский Диаса (Dias English) и турецкий Тимура (Alterna Timur).

- `gh/index.html` — главная, с рекламой.
- `gh/lesson/index.html` — та же страница без рекламы, с короткой концовкой.
- `design/` — скриншоты образца.
- `qa/` — проверки и скриншоты.

## Как поменять текст, ссылки, порядок блоков
Всё в одном файле `gh/assets/content.js`.

- `blocks` — список блоков сверху вниз. Блок можно удалить, скопировать или переставить.
- `ad: true` — блок только на главной. `lesson: true` — только на `/lesson/`.
- `links` — ссылки на покупку. В блоках пишется `@english`, `@turkish`, `@turkishWhatsApp`, и подставится ссылка отсюда.
- Типы блоков: `hero`, `bento3`, `about`, `problemSolution`, `steps`, `features`, `heatmap` (планер недели), `persona` (профиль навыков с диаграммой), `quote`, `overview`, `tracks` (карточки с вкладками), `who`, `counts`, `authors`, `prices`, `reviews`, `final`.
- Разметка каждого типа в `gh/assets/render.js` (объект `R`). Иконки там же, в `ICONS`.

## Цвета и шрифты
CSS-переменные в начале `gh/assets/style.css` (`--blue`, `--lime`, `--bg`, `--ink`, `--display`, `--body`).
Быстро поменять цвет можно и в `content.js` → `theme`, например `theme: { blue: '#1f4fd8' }`.

Шрифты лежат в `gh/assets/fonts/`: Space Grotesk (латиница и цифры), Manrope (кириллица в заголовках), Inter (текст).

## Картинки
Кладутся в `gh/media/` в webp, не шире 1600 px, до ~250 КБ:

```bash
cwebp -q 80 -resize 1200 0 фото.jpg -o gh/media/имя.webp
```

Потом путь `media/имя.webp` и размеры `w`, `h` пишутся в `content.js`.

## Проверка и публикация
```bash
python3 -m http.server 8505 --directory gh
node qa/check.mjs http://127.0.0.1:8505/
```

Скрипт проверяет 1440, 834 и 390: нет бокового скролла, все картинки загрузились, нет ошибок в консоли. Скриншоты кладёт в `qa/shots/`.

Публикуется папка `gh/` в ветку `main` репозитория `stellasdeutsch-dev/kw-05-cobalt` (GitHub Pages из корня).
