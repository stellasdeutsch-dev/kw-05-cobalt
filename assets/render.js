/* Сборка страницы из window.SITE. Разметка блоков здесь, тексты в content.js. */
(function () {
  'use strict';
  var S = window.SITE;
  var PAGE = document.documentElement.getAttribute('data-page') || 'main'; // main | lesson
  var BASE = document.documentElement.getAttribute('data-base') || '';
  var RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- иконки (свои, линейные) ---------- */
  var P = 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
  var ICONS = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowUpRight: '<path d="M7 17 17 7M9 7h8v8"/>',
    play: '<path d="M7 4.5v15l12-7.5z" fill="currentColor" stroke="none"/>',
    share: '<path d="M12 15V3M7.5 7.5 12 3l4.5 4.5"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    menu: '<path d="M4 8h16M4 16h16"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    xCircle: '<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>',
    film: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 9h18M3 15h18M8 5v4M16 5v4M8 15v4M16 15v4"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>',
    book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/>',
    phone: '<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M10.5 18.5h3"/>',
    youtube: '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10 9.2v5.6l4.8-2.8z" fill="currentColor" stroke="none"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/>',
    route: '<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5"/>',
    bolt: '<path d="M13 3 5 13.5h6L10.5 21 19 10h-6z"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    question: '<circle cx="12" cy="12" r="9"/><path d="M9.6 9.3a2.5 2.5 0 0 1 4.8.9c0 1.7-2.4 2.2-2.4 3.8M12 17.2v.1"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17.5" cy="9.5" r="2.5"/><path d="M16.5 14.6A5 5 0 0 1 22 19.5"/>',
    reset: '<path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4.5h4.5"/>',
    quote: '<path d="M4 18v-5.5C4 8.5 6 6 10 5.5M14 18v-5.5c0-4 2-6.5 6-7M4 18h5v-5H4M14 18h5v-5h-5" fill="currentColor" stroke="none"/>'
  };
  function ico(name, cls) { return '<svg class="ico ' + (cls || '') + '" viewBox="0 0 24 24" ' + P + ' aria-hidden="true">' + (ICONS[name] || '') + '</svg>'; }
  var QUOTE = '<svg viewBox="0 0 64 52" aria-hidden="true" class="q-ico"><path fill="currentColor" d="M0 52V30C0 13 9 3 26 0l3 7C19 10 14 16 14 24h12v28H0zm35 0V30C35 13 44 3 61 0l3 7c-10 3-15 9-15 17h12v28H35z"/></svg>';
  var BRAND_MARK = '<svg class="brand-mark" viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="12" fill="var(--blue)"/><path d="M12 11h7a9 9 0 0 1 0 18h-7z" fill="none" stroke="#fff" stroke-width="3.4" stroke-linejoin="round"/><circle cx="28.5" cy="12.5" r="3.5" fill="var(--lime)"/></svg>';

  /* ---------- помощники ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function src(p) { return /^(https?:)?\/\//.test(p) ? p : BASE + p; }
  function href(h) { if (h && h[0] === '@') return S.links[h.slice(1)] || '#'; return h || '#'; }
  function ext(h) { return /^https?:/.test(href(h)) ? ' target="_blank" rel="noopener"' : ''; }
  function img(o, cls, eager) {
    return '<img class="' + (cls || '') + '" src="' + esc(src(o.src)) + '" alt="' + esc(o.alt || '') + '"' +
      (o.w ? ' width="' + o.w + '" height="' + o.h + '"' : '') + (eager ? ' fetchpriority="high"' : ' loading="lazy"') + ' decoding="async">';
  }
  function btn(b, extra) {
    var i = b.icon ? ico(b.icon) : (/^https?:/.test(href(b.href)) || b.href[0] === '#' ? ico('arrow', 'ico-arrow') : '');
    if (b.href === '#share') return '<button type="button" class="btn btn-' + (b.style || 'light') + ' ' + (extra || '') + '" data-share>' + esc(b.text) + ico('share') + '</button>';
    return '<a class="btn btn-' + (b.style || 'light') + ' ' + (extra || '') + '" href="' + esc(href(b.href)) + '"' + ext(b.href) + '>' + esc(b.text) + i + '</a>';
  }
  function head(b, opt) {
    opt = opt || {};
    return '<div class="sec-head rv"><div>' + (b.meta ? '<p class="meta"><i></i>' + esc(b.meta) + '</p>' : '') +
      '<h2 class="sec-title">' + (opt.titleHtml || esc(b.title)) + '</h2></div>' +
      (b.text ? '<div><p class="sec-text">' + esc(b.text) + '</p>' + (opt.after || '') + '</div>' : (opt.after ? '<div>' + opt.after + '</div>' : '')) + '</div>';
  }
  function show(x) { return PAGE === 'lesson' ? !x.ad : !x.lesson; }

  /* ---------- блоки ---------- */
  var R = {};

  R.hero = function (b) {
    var lines = b.lines.map(function (l) {
      if (typeof l === 'string') return '<span>' + esc(l) + '</span>';
      var av = '<span class="avatars" aria-hidden="true">' + b.avatars.map(function (a) { return img({ src: a.src, alt: '', w: 160, h: 160 }, '', true); }).join('') + '<span class="plus">' + ico('plus') + '</span></span>';
      return '<span class="row">' + av + '<span>' + esc(l.text) + '</span></span>';
    }).join('');
    return '<section class="wrap" aria-label="Первый экран"><div class="hero" data-block="Первый экран">' +
      '<div class="hero-panel" aria-hidden="true"></div>' +
      '<h1 class="hero-title">' + lines + '</h1>' +
      '<p class="hero-sub">' + esc(b.text) + '</p>' +
      '<div class="hero-actions">' + btn({ text: b.button.text, href: b.button.href, style: 'light' }) +
      '<button type="button" class="btn btn-light btn-round" data-video aria-label="Смотреть видео">' + ico('play') + '</button>' +
      '<button type="button" class="btn btn-light btn-round" data-share aria-label="Поделиться ссылкой">' + ico('share') + '</button></div>' +
      img(b.image, 'hero-photo', true) +
      b.chips.map(function (c) { return '<span class="chip-float ' + (c.cls || '') + '" style="' + c.pos + '"><i class="dot-ring"></i>' + esc(c.text) + '</span>'; }).join('') +
      '</div></section>';
  };

  R.bento3 = function (b) {
    return '<section class="wrap"><div class="bento3">' +
      '<article class="card dark rv"><p class="b3-label">' + esc(b.dark.label) + '</p><h2 class="b3-title">' + esc(b.dark.title) + '</h2></article>' +
      '<article class="card rv"><div class="b3-media"><button type="button" class="play" data-video aria-label="Смотреть видео">' + ico('play') + '</button><span class="b3-time">' + esc(b.white.time) + '</span></div>' + img(b.white.image, 'b3-obj') + '</article>' +
      '<article class="card lime rv"><h2 class="b3-title">' + esc(b.lime.title) + '</h2>' + img(b.lime.image, 'b3-plant') + '</article>' +
      '</div></section>';
  };

  R.about = function (b) {
    return '<section class="wrap sec" id="' + b.id + '"><div class="about rv">' +
      '<div class="about-label"><span class="pill-mini"><i></i>' + esc(b.label) + '</span><span class="num-tag">' + esc(b.num) + '</span></div>' +
      '<p class="about-text">' + esc(b.dark) + ' <span>' + esc(b.gray) + '</span></p></div>' +
      '<div class="stats rv">' + b.stats.map(function (s) { return '<div class="stat"><b>' + esc(s.value) + '</b><span>' + esc(s.text) + '</span></div>'; }).join('') + '</div>' +
      '<div class="strip rv"><p>' + esc(b.stripTitle) + '</p><ul>' + b.strip.map(function (s) { return '<li>' + ico(s.icon) + esc(s.text) + '</li>'; }).join('') + '</ul></div>' +
      '</section>';
  };

  R.problemSolution = function (b) {
    var rows = b.rows.map(function (r, i) {
      var n = ('0' + (i + 1)).slice(-2);
      return '<div class="ps-row rv">' +
        '<div class="ps-card prob"><div class="ps-top">' + ico('xCircle', 'ps-x') + '<span class="num-tag">' + n + '</span></div><h3>' + esc(r.problem[0]) + '</h3><p>' + esc(r.problem[1]) + '</p></div>' +
        '<div class="ps-link" aria-hidden="true"><span class="ps-arrow">' + ico('arrow') + '</span></div>' +
        '<div class="ps-card sol ' + r.color + '"><div class="ps-top"><span class="ps-ok">' + ico('check') + '</span><span class="num-tag">' + n + '</span></div><h3>' + esc(r.solution[0]) + '</h3><p>' + esc(r.solution[1]) + '</p></div>' +
        '</div>';
    }).join('');
    return '<section class="wrap"><div class="ps sec on-dark" style="padding-top:80px">' + head(b) +
      '<div class="ps-cols"><p class="ps-col-h">' + esc(b.problemsTitle) + '</p><p class="ps-col-h sol">' + esc(b.solutionsTitle) + '</p>' + rows + '</div></div></section>';
  };

  R.steps = function (b) {
    return '<section class="wrap" id="' + b.id + '"><div class="steps sec on-dark" style="padding-top:80px">' + head(b) +
      '<div class="steps-grid">' + b.items.map(function (s, i) {
        return '<a class="step rv' + (s.accent ? ' lime' : '') + '" href="' + esc(s.href) + '"><div class="step-top"><span class="step-n">0' + (i + 1) + '</span><span class="step-go">' + ico('arrow') + '</span></div>' +
          '<h3>' + esc(s.title) + '</h3><p>' + esc(s.text) + '</p><div class="tags">' + s.tags.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('') + '</div></a>';
      }).join('') + '</div></div></section>';
  };

  R.features = function (b) {
    var f = b;
    var after = '<p style="margin-top:22px">' + btn({ text: b.button.text, href: b.button.href, style: 'dark' }, 'btn-sm') + '</p>';
    return '<section class="wrap sec">' + head(b, { after: after }) + '<div class="feat">' +
      '<article class="card f-photo rv">' + img(f.photo.image) + '<span class="f-chip"><i></i>' + esc(f.photo.chip) + '</span><div class="f-in"><h3 class="f-title">' + esc(f.photo.title) + '</h3><p class="f-text">' + esc(f.photo.text) + '</p></div></article>' +
      '<article class="card f-side rv"><div class="f-head"><h3 class="f-title">' + esc(f.paths.title) + '</h3><span class="f-ico">' + ico('route') + '</span></div><p class="f-text">' + esc(f.paths.text) + '</p><div class="f-chips">' + f.paths.chips.map(function (c, i) { return '<span' + (i === f.paths.on ? ' class="on"' : '') + '>' + esc(c) + '</span>'; }).join('') + '</div></article>' +
      '<article class="card lime f-side rv"><div class="f-head"><h3 class="f-title">' + esc(f.feedback.title) + '</h3><span class="f-ico">' + ico('bolt') + '</span></div><p class="f-text">' + esc(f.feedback.text) + '</p><p class="f-note"><b>' + ico('check') + '</b>' + esc(f.feedback.note) + '</p></article>' +
      '<article class="card f-third rv"><div class="f-head"><h3 class="f-title">' + esc(f.progress.title) + '</h3><span class="f-ico">' + ico('chart') + '</span></div><p class="f-text">' + esc(f.progress.text) + '</p><div class="bars" aria-hidden="true">' + f.progress.bars.map(function (h) { return '<i style="--h:' + h + '%"></i>'; }).join('') + '</div></article>' +
      '<article class="card dark f-third rv"><div class="f-head"><h3 class="f-title">' + esc(f.tutor.title) + '</h3><span class="f-ico">' + ico('question') + '</span></div><p class="f-text">' + esc(f.tutor.text) + '</p><div class="chat"><p class="q">' + esc(f.tutor.q) + '</p><p class="a">' + esc(f.tutor.a) + '</p></div></article>' +
      '<article class="card blue f-third rv"><div class="f-head"><h3 class="f-title">' + esc(f.rooms.title) + '</h3><span class="f-ico">' + ico('users') + '</span></div><p class="f-text">' + esc(f.rooms.text) + '</p><div class="room"><span class="avatars">' + img({ src: 'media/av-dias.webp', alt: '', w: 160, h: 160 }) + img({ src: 'media/av-timur.webp', alt: '', w: 160, h: 160 }) + '<span class="plus">' + ico('plus') + '</span></span><span class="room-tag">' + esc(f.rooms.tag) + '</span></div></article>' +
      '</div></section>';
  };

  R.heatmap = function (b) {
    var g = '<div class="heat-grid" role="group" aria-label="' + esc(b.cardTitle) + '"><span></span>' + b.days.map(function (d) { return '<span class="hd">' + esc(d) + '</span>'; }).join('');
    b.rows.forEach(function (r, ri) {
      g += '<span class="rl">' + esc(r) + '</span>';
      b.days.forEach(function (d, di) {
        var lv = b.shade && b.shade[ri] ? b.shade[ri][di] : 0;
        g += '<button type="button" class="cell l' + lv + '" data-cell="' + ri + '-' + di + '" aria-pressed="false" aria-label="' + esc(d + ', ' + r) + '"></button>';
      });
    });
    g += '</div>';
    return '<section class="wrap sec" id="' + b.id + '" data-heat=\'' + esc(JSON.stringify({ rows: b.rows, days: b.days })) + '\'>' + head(b) +
      '<div class="heat rv"><div class="heat-top"><p class="cap">' + esc(b.cardTitle) + '</p><span class="heat-peak"><i></i><span data-peak>Выбери время</span></span></div>' + g +
      '<div class="heat-foot"><span><span data-count>Отмечено 0 из ' + (b.rows.length * b.days.length) + '.</span> ' + esc(b.hint) + '</span><button type="button" class="heat-reset" data-reset>' + ico('reset') + 'Сбросить</button></div></div>' +
      '<div class="two">' + b.lists.map(listCard).join('') + '</div></section>';
  };
  function listCard(l) {
    return '<article class="card list-card rv ' + (l.style === 'white' ? '' : l.style) + '"><p class="cap">' + esc(l.title) + '</p><ul>' + l.items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul></article>';
  }

  R.persona = function (b) {
    var rates = b.skills.map(function (s, i) {
      var bt = ''; for (var v = 1; v <= 5; v++) bt += '<button type="button" data-skill="' + i + '" data-v="' + v + '" aria-pressed="' + (v === s.v) + '" aria-label="' + esc(s.name) + ': ' + v + '">' + v + '</button>';
      return '<span>' + esc(s.name) + '</span><div class="rate">' + bt + '</div>';
    }).join('');
    return '<section class="wrap sec" id="' + b.id + '" data-skills=\'' + esc(JSON.stringify(b.skills)) + '\'>' + head(b) + '<div class="persona">' +
      '<article class="card p-photo rv">' + img(b.image) + '<div class="p-pills">' +
      '<span class="p-pill"><i></i>Сильный навык <b data-strong></b></span>' +
      '<span class="p-pill"><i></i>Начать с <b data-weak></b></span>' +
      '<span class="p-pill"><i></i>Средний уровень <b data-avg></b></span></div>' +
      '<div class="p-name"><h3>' + esc(b.name) + '</h3><p>' + esc(b.sub) + '</p></div></article>' +
      '<article class="card dark radar-card rv"><p class="cap">' + esc(b.cardTitle) + '</p><svg class="radar" viewBox="-200 -150 400 300" role="img" aria-label="Диаграмма навыков" data-radar></svg>' +
      '<div class="rates">' + rates + '</div><p class="radar-note" data-note></p></article>' +
      '<div class="p-stats">' + b.stats.map(function (s) { return '<article class="card p-stat rv ' + (s.style === 'white' ? '' : s.style) + '"><b>' + esc(s.value) + '</b><span>' + esc(s.text) + '</span></article>'; }).join('') + '</div>' +
      '</div></section>';
  };

  R.quote = function (b) {
    return '<section class="wrap"><blockquote class="quote rv">' + QUOTE + '<div><p>' + esc(b.text) + '</p><cite>' + esc(b.cite) + '</cite></div></blockquote></section>';
  };

  R.overview = function (b) {
    return '<section class="wrap sec" id="' + b.id + '" data-block="Реклама платформы"><div class="ov"><div class="rv"><p class="meta"><i></i>' + esc(b.meta) + '</p>' +
      '<h2 class="ov-title">' + esc(b.titleA) + '<em>' + esc(b.titleB) + '</em></h2><p class="ov-text">' + esc(b.text) + '</p>' +
      '<div class="ov-actions">' + b.buttons.map(function (x) { return btn(x); }).join('') + '</div></div>' +
      '<div class="ov-icons rv" aria-hidden="true">' + b.tiles.map(function (t, i) { return '<div class="ov-tile t' + (i + 1) + '">' + img({ src: t.src, alt: '', w: 800, h: 960 }) + '<span class="lbl"><i></i>' + esc(t.label) + '</span></div>'; }).join('') + '</div></div>' +
      '<div class="ov-cards">' + b.cards.map(function (c) {
        var body = c.flags ? '<div class="ov-flags">' + c.flags.map(function (f) { return '<span>' + esc(f) + '</span>'; }).join('') + '</div>' : '<strong' + (c.big ? ' class="big"' : '') + '>' + esc(c.value) + '</strong>';
        return '<article class="card ov-card rv ' + (c.style || '') + '"><div class="row"><span class="cap">' + esc(c.cap) + '</span><span class="num-tag">' + esc(c.num) + '</span></div>' + body + '</article>';
      }).join('') + '</div></section>';
  };

  R.tracks = function (b) {
    var tabs = '<div class="tabs" role="tablist" aria-label="Язык">' + b.tabs.map(function (t, i) { return '<button type="button" class="tab" role="tab" data-tab="' + t.key + '" aria-selected="' + (i === 0) + '">' + esc(t.text) + '</button>'; }).join('') + '</div>';
    var cards = b.items.map(function (t) {
      var media = t.video
        ? '<video src="' + esc(src(t.video)) + '" poster="' + esc(src(t.img)) + '" muted loop playsinline preload="none" width="' + t.w + '" height="' + t.h + '" aria-label="' + esc(t.title) + '" data-autoplay></video>'
        : img({ src: t.img, alt: t.title + ', скриншот платформы', w: t.w, h: t.h });
      return '<article class="card track rv' + (t.wide ? ' wide' : '') + '" data-lang="' + t.lang + '"><div class="track-img">' + media + '<span class="track-chip ' + t.lang + '"><i></i>' + esc(t.chip) + '</span></div>' +
        '<div class="track-body"><p class="track-meta">' + esc(t.meta) + '</p><h3>' + esc(t.title) + '</h3><p>' + esc(t.text) + '</p>' +
        '<div class="track-foot"><span class="track-price">' + esc(t.price) + '</span><a class="go" href="' + esc(href(t.href)) + '"' + ext(t.href) + ' aria-label="Купить: ' + esc(t.meta) + '">' + ico('arrowUpRight') + '</a></div></div></article>';
    }).join('');
    return '<section class="wrap sec"><div class="tr-head rv"><div><p class="meta"><i></i>' + esc(b.meta) + '</p><h2 class="sec-title">' + esc(b.title) + '</h2></div>' + tabs + '</div><div class="tracks" data-tracks>' + cards + '</div></section>';
  };

  R.who = function (b) { return '<section class="wrap sec">' + head(b) + '<div class="who">' + b.lists.map(listCard).join('') + '</div></section>'; };

  R.counts = function (b) {
    var c = '<div class="counts">' + b.items.map(function (x) {
      return '<article class="card count rv ' + (x.style || '') + '"><div class="row"><b data-count-to="' + x.value + '">' + x.value + '</b><span class="num-tag">' + esc(x.num) + '</span></div><span>' + esc(x.text) + '</span></article>';
    }).join('') + '</div>';
    var ins = '<div class="insights">' + b.insights.map(function (x) {
      var body = '';
      if (x.big) body = '<div class="ins-big">' + esc(x.big) + '</div>';
      if (x.mid) body = '<div class="ins-mid">' + esc(x.mid) + '</div>';
      if (x.ring != null) { var C = 2 * Math.PI * 84; body = '<div class="ring"><svg viewBox="0 0 200 200" aria-hidden="true"><circle class="bgc" cx="100" cy="100" r="84"/><circle class="fg" cx="100" cy="100" r="84" stroke-dasharray="' + C.toFixed(1) + '" stroke-dashoffset="' + C.toFixed(1) + '" data-ring="' + (C * (1 - x.ring / 100)).toFixed(1) + '"/></svg><b>' + esc(x.ringText) + '</b></div>'; }
      var extra = '';
      if (x.levels) extra = '<div class="lvl-bar"><i style="--w:' + x.fill + '%"></i></div><div class="lvl-steps">' + x.levels.map(function (l) { return '<span>' + l + '</span>'; }).join('') + '</div>';
      if (x.dots) extra = '<div class="dots">' + x.dots.map(function (d, i) { return '<i class="' + (i < x.on ? '' : 'off') + '">' + d + '</i>'; }).join('') + '</div>';
      return '<article class="card ins rv ' + x.style + '"><p class="cap">' + esc(x.cap) + '</p>' + body + extra + '<p>' + esc(x.text) + '</p></article>';
    }).join('') + '</div>';
    return '<section class="wrap sec">' + head(b) + c + ins + '</section>';
  };

  R.authors = function (b) {
    return '<section class="wrap sec">' + head(b) + '<div class="authors">' + b.people.map(function (p) {
      return '<article class="card p-photo rv">' + img(p.image) + '<div class="p-pills">' + p.pills.map(function (x) { return '<span class="p-pill"><i></i>' + esc(x[0]) + ' <b>' + esc(x[1]) + '</b></span>'; }).join('') + '</div>' +
        '<div class="p-name"><h3>' + esc(p.name) + '</h3><p>' + esc(p.sub) + '</p><p style="margin-top:20px">' + btn({ text: p.button, href: p.href, style: 'light' }, 'btn-sm') + '</p></div></article>';
    }).join('') + '</div></section>';
  };

  R.prices = function (b) {
    return '<section class="wrap sec">' + head(b) + '<div class="prices">' + b.items.map(function (p) {
      return '<article class="card price rv ' + p.style + '"><div class="row"><span class="cap">' + esc(p.cap) + '</span></div><h3>' + esc(p.name) + '</h3>' +
        '<div class="amt">' + esc(p.amount) + '<small>' + esc(p.note) + '</small></div><ul>' + p.list.map(function (l) { return '<li>' + ico('check') + esc(l) + '</li>'; }).join('') + '</ul>' +
        '<div class="price-actions">' + p.buttons.map(function (x) { return btn(x); }).join('') + '</div></article>';
    }).join('') + '</div></section>';
  };

  R.reviews = function (b) {
    return '<section class="wrap sec">' + head(b) + '<div class="reviews">' + b.items.map(function (r) {
      return '<figure class="card review rv ' + (r.style === 'white' ? '' : r.style) + '">' + QUOTE + img({ src: r.img, alt: 'Скриншот сообщения от ученика', w: r.w, h: r.h }) + '</figure>';
    }).join('') + '</div></section>';
  };

  R.final = function (b) {
    return '<section class="wrap" data-block="' + (b.ad ? 'Реклама платформы, финал' : 'Концовка') + '"><div class="final rv"><h2 class="final-title">' + b.lines.map(function (l) { return '<span>' + esc(l) + '</span>'; }).join('') + '</h2>' +
      '<div class="final-phone">' + img(b.phone) + '</div>' +
      '<div class="final-side"><h3>' + esc(b.title) + ' <em>' + esc(b.titleEm) + '</em></h3><p>' + esc(b.text) + '</p><div class="final-actions">' + b.buttons.map(function (x) { return btn(x); }).join('') + '</div></div></div></section>';
  };

  /* ---------- сборка ---------- */
  function build() {
    Object.keys(S.theme || {}).forEach(function (k) { document.documentElement.style.setProperty('--' + k, S.theme[k]); });
    var navLinks = S.nav.links.filter(show).map(function (l) { return '<li><a href="' + esc(l.href) + '">' + esc(l.text) + '</a></li>'; }).join('');
    var cta = S.nav.cta.filter(show).map(function (c) { return btn({ text: c.text, href: c.href, style: c.style, icon: 'none' }, 'btn-sm'); }).join('');
    var firstCta = S.nav.cta.filter(show)[0];
    var html = '<header class="wrap" data-block="Шапка"><nav class="nav" aria-label="Основное меню"><a class="brand" href="' + esc(S.brand.href) + '">' + BRAND_MARK + esc(S.brand.name) + '</a>' +
      '<ul class="nav-links">' + navLinks + '</ul><div class="nav-cta">' + cta + '</div>' +
      '<a class="nav-burger" href="' + esc(firstCta.href) + '" aria-label="' + esc(firstCta.text) + '">' + ico('arrowUpRight') + '</a></nav></header><main>';
    S.blocks.filter(show).forEach(function (b) { html += R[b.type] ? R[b.type](b) : ''; });
    html += '</main><footer class="wrap foot" data-block="Подвал"><span>' + esc(S.footer.left) + '</span><span>' + S.footer.right.map(function (r) { return '<a href="' + esc(r.href) + '">' + esc(r.text) + '</a>'; }).join(' ') + '</span></footer>' +
      '<dialog class="vd" aria-label="' + esc(S.video.label) + '"><div class="vd-in"><video muted loop playsinline preload="none" poster="' + esc(src(S.video.poster)) + '" src="' + esc(src(S.video.src)) + '"></video><button type="button" class="vd-close" aria-label="Закрыть">' + ico('close') + '</button></div></dialog><div class="toast" role="status" aria-live="polite"></div>';
    document.getElementById('app').innerHTML = html;
    document.title = PAGE === 'lesson' ? S.meta.titleLesson : S.meta.title;
  }
  // иконка "none" у кнопок шапки
  ICONS.none = '';

  /* ---------- интерактив ---------- */
  function toast(t) { var el = document.querySelector('.toast'); el.textContent = t; el.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(function () { el.classList.remove('on'); }, 2200); }

  function initShare() {
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-share]'); if (!b) return;
      var url = location.href.split('#')[0];
      if (navigator.share) { navigator.share({ title: document.title, url: url }).catch(function () {}); return; }
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () { toast('Ссылка скопирована'); }, function () { toast(url); });
      else toast(url);
    });
  }

  function initVideo() {
    var d = document.querySelector('.vd'), v = d.querySelector('video');
    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-video]')) { if (d.showModal) d.showModal(); else d.setAttribute('open', ''); v.muted = true; v.play().catch(function () {}); }
      if (e.target.closest('.vd-close') || e.target === d) { v.pause(); d.close ? d.close() : d.removeAttribute('open'); }
    });
    d.addEventListener('close', function () { v.pause(); });
    // видео в карточках: играть без звука, когда видно
    var vids = document.querySelectorAll('video[data-autoplay]');
    if ('IntersectionObserver' in window && !RM) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (en) { var x = en.target; x.muted = true; if (en.isIntersecting) x.play().catch(function () {}); else x.pause(); }); }, { threshold: .4 });
      vids.forEach(function (x) { io.observe(x); });
    }
  }

  function initTabs() {
    var wrap = document.querySelector('[data-tracks]'); if (!wrap) return;
    var tabs = document.querySelectorAll('[data-tab]');
    tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        tabs.forEach(function (x) { x.setAttribute('aria-selected', x === t); });
        var k = t.getAttribute('data-tab'), first = true;
        wrap.querySelectorAll('.track').forEach(function (c) {
          var on = k === 'all' || c.getAttribute('data-lang') === k;
          c.hidden = !on;
          if (k !== 'all') { c.classList.toggle('wide', on && first); if (on) first = false; }
          else c.classList.toggle('wide', c.hasAttribute('data-wide'));
          if (on) c.classList.add('in');
        });
      });
    });
    wrap.querySelectorAll('.track.wide').forEach(function (c) { c.setAttribute('data-wide', ''); });
  }

  function initHeat() {
    var sec = document.querySelector('[data-heat]'); if (!sec) return;
    var cfg = JSON.parse(sec.getAttribute('data-heat'));
    var KEY = 'kw05-week', state = {};
    try { state = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { state = {}; }
    var cells = sec.querySelectorAll('.cell'), total = cells.length;
    function paint() {
      var n = 0, rowCount = cfg.rows.map(function () { return 0; });
      cells.forEach(function (c) {
        var k = c.getAttribute('data-cell'), on = !!state[k];
        c.setAttribute('aria-pressed', on);
        if (on) { n++; rowCount[+k.split('-')[0]]++; }
      });
      sec.querySelector('[data-count]').textContent = 'Отмечено ' + n + ' из ' + total + '.';
      var max = Math.max.apply(null, rowCount);
      sec.querySelector('[data-peak]').textContent = n ? 'Чаще всего: ' + cfg.rows[rowCount.indexOf(max)].toLowerCase() : 'Выбери время';
    }
    sec.addEventListener('click', function (e) {
      var c = e.target.closest('.cell');
      if (c) { var k = c.getAttribute('data-cell'); if (state[k]) delete state[k]; else state[k] = 1; }
      else if (e.target.closest('[data-reset]')) state = {};
      else return;
      try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (er) {}
      paint();
    });
    paint();
  }

  function initRadar() {
    var sec = document.querySelector('[data-skills]'); if (!sec) return;
    var skills = JSON.parse(sec.getAttribute('data-skills'));
    var KEY = 'kw05-skills';
    try { var saved = JSON.parse(localStorage.getItem(KEY) || 'null'); if (saved && saved.length === skills.length) saved.forEach(function (v, i) { skills[i].v = v; }); } catch (e) {}
    var svg = sec.querySelector('[data-radar]'), N = skills.length, RAD = 110;
    function pt(i, r) { var a = -Math.PI / 2 + i * 2 * Math.PI / N; return [Math.cos(a) * r, Math.sin(a) * r]; }
    var g = '';
    for (var l = 1; l <= 5; l++) g += '<polygon class="grid" points="' + skills.map(function (s, i) { return pt(i, RAD * l / 5).join(','); }).join(' ') + '"/>';
    skills.forEach(function (s, i) { var p = pt(i, RAD); g += '<line class="grid" x1="0" y1="0" x2="' + p[0] + '" y2="' + p[1] + '"/>'; var t = pt(i, RAD + 26); g += '<text x="' + t[0].toFixed(1) + '" y="' + (t[1] + 5).toFixed(1) + '" text-anchor="' + (Math.abs(t[0]) < 5 ? 'middle' : t[0] > 0 ? 'start' : 'end') + '">' + esc(s.name) + '</text>'; });
    g += '<path class="shape" d=""/>' + skills.map(function (s, i) { return '<circle class="pt" r="6" data-i="' + i + '"/>'; }).join('');
    svg.innerHTML = g;
    function draw() {
      var pts = skills.map(function (s, i) { return pt(i, RAD * s.v / 5); });
      svg.querySelector('.shape').setAttribute('d', 'M' + pts.map(function (p) { return p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join('L') + 'Z');
      svg.querySelectorAll('.pt').forEach(function (c, i) { c.setAttribute('cx', pts[i][0].toFixed(1)); c.setAttribute('cy', pts[i][1].toFixed(1)); });
      sec.querySelectorAll('[data-skill]').forEach(function (b) { b.setAttribute('aria-pressed', +b.getAttribute('data-v') === skills[+b.getAttribute('data-skill')].v); });
      var vals = skills.map(function (s) { return s.v; }), max = Math.max.apply(null, vals), min = Math.min.apply(null, vals);
      var strong = skills[vals.indexOf(max)].name, weak = skills[vals.indexOf(min)].name;
      var avg = (vals.reduce(function (a, b) { return a + b; }, 0) / N).toFixed(1).replace('.', ',');
      sec.querySelector('[data-strong]').textContent = strong;
      sec.querySelector('[data-weak]').textContent = weak;
      sec.querySelector('[data-avg]').textContent = avg;
      sec.querySelector('[data-note]').textContent = 'Начни неделю с навыка «' + weak + '». Сильная сторона «' + strong + '» поможет: бери материалы, где оба навыка вместе.';
    }
    sec.addEventListener('click', function (e) {
      var b = e.target.closest('[data-skill]'); if (!b) return;
      skills[+b.getAttribute('data-skill')].v = +b.getAttribute('data-v');
      try { localStorage.setItem(KEY, JSON.stringify(skills.map(function (s) { return s.v; }))); } catch (er) {}
      draw();
    });
    draw();
  }

  function countUp(el) {
    var to = +el.getAttribute('data-count-to'); if (RM) { el.textContent = to; return; }
    var t0 = null, dur = 1400;
    function f(t) { if (!t0) t0 = t; var k = Math.min(1, (t - t0) / dur); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(f); }
    el.textContent = '0'; requestAnimationFrame(f);
  }

  function initReveal() {
    var els = document.querySelectorAll('.rv, .bars, .lvl-bar, [data-ring], [data-count-to]');
    if (RM || !('IntersectionObserver' in window)) {
      els.forEach(function (e) { e.classList.add('in'); if (e.hasAttribute('data-ring')) e.style.strokeDashoffset = e.getAttribute('data-ring'); });
      return;
    }
    document.documentElement.classList.add('js-anim');
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        var e = en.target; e.classList.add('in');
        if (e.hasAttribute('data-ring')) e.style.strokeDashoffset = e.getAttribute('data-ring');
        if (e.hasAttribute('data-count-to')) countUp(e);
        io.unobserve(e);
      });
    }, { threshold: .15, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (e) { io.observe(e); });
  }

  build();
  initShare(); initVideo(); initTabs(); initHeat(); initRadar(); initReveal();
})();
