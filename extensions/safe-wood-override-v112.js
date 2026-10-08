
(() => {
  if (!TDG) return;

  console.log("%cTDG safe wood override v11.2 LOADED", "color:#76ecf5;font-weight:bold");

  const IGNORE_RE = /(^|\s)(item|slot|icon|mini|avatar|outfit|sprite|char|npc|mob|hero|monster|map|mark|skill|emot|canvas|tooltip|bag|eq|button-icon)(\s|$)|icon|sprite|canvas|avatar|outfit|postacie|item/i;
  const NAME_HINT_RE = /header|title|bar|rail|split|divider|content|wrapper|panel|body|section|main|left|right|top|bottom|footer|list|scroll|box|window|quest|journal|tabs|tab|card|menu|search|filter|pane/i;

  function parseRgb(v) {
    const m = String(v || '').match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
  }

  function luminance(rgb) {
    if (!rgb) return 0;
    return (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
  }

  function isBrown(rgb) {
    if (!rgb) return false;
    const [r,g,b] = rgb;
    return r >= 40 && r <= 190 && g >= 18 && g <= 130 && b <= 100 && r > g + 8 && g >= b - 8;
  }

  function isPaper(rgb) {
    if (!rgb) return false;
    const [r,g,b] = rgb;
    return r >= 155 && g >= 145 && b >= 105 && r - b <= 90 && g - b <= 70;
  }

  function isGreenish(rgb) {
    if (!rgb) return false;
    const [r,g,b] = rgb;
    return g > r + 12 && g > b + 8 && g >= 65 && r <= 120;
  }

  function hasTheme(el, cs) {
    if (!(el instanceof HTMLElement)) return true;
    if ([...el.classList].some(c => c.startsWith('tg-'))) return true;
    const bg = String(cs.backgroundImage || '');
    const bi = String(cs.borderImageSource || '');
    return /assets\/components|panel-v110|bar-h-v110|bar-v-v110|control-v110|row-v110|frame-v110/i.test(bg + ' ' + bi);
  }

  function ignoreElement(el) {
    if (!(el instanceof HTMLElement)) return true;
    if (el.matches('img,canvas,svg,video,input,select,textarea,option')) return true;
    const key = ((el.id || '') + ' ' + (typeof el.className === 'string' ? el.className : '')).trim();
    if (IGNORE_RE.test(key)) return true;
    if (el.closest('.eq-slot,.inventory-item,.skill-usable-slot,.one-message,.message,.chat-message,.frchar')) return true;
    return false;
  }

  function applyClass(el, cls) {
    if (!(el instanceof HTMLElement)) return;
    // Keep only one auto wood class per element.
    el.classList.remove('tg-auto-wood-h','tg-auto-wood-v','tg-auto-wood-panel','tg-auto-wood-row','tg-auto-wood-control');
    el.classList.add(cls);
  }

  function classify(el, root, stats) {
    if (ignoreElement(el)) return;
    const cs = getComputedStyle(el);
    if (hasTheme(el, cs)) return;

    const rect = el.getBoundingClientRect();
    if (rect.width < 4 || rect.height < 4) return;
    if (rect.width > innerWidth * 0.96 && rect.height > innerHeight * 0.96) return;

    const key = ((el.id || '') + ' ' + (typeof el.className === 'string' ? el.className : '')).trim();
    const hinted = NAME_HINT_RE.test(key);
    const rgb = parseRgb(cs.backgroundColor);
    const bgImg = String(cs.backgroundImage || '');
    const hasBgImage = bgImg && bgImg !== 'none';
    const brownish = isBrown(rgb);
    const paperish = isPaper(rgb);
    const greenish = isGreenish(rgb);
    const lum = luminance(rgb);

    // existing border-image wood/paper frame swap
    if (cs.borderImageSource && cs.borderImageSource !== 'none' && !/assets\/components|frame-v110/i.test(cs.borderImageSource)) {
      el.classList.add('tg-auto-wood-border');
      stats.border += 1;
    }

    // Skip totally transparent / empty elements unless they have a bg image
    if (!hasBgImage && (!rgb || (cs.backgroundColor in {'transparent':1,'rgba(0, 0, 0, 0)':1,'rgba(0,0,0,0)':1}))) return;

    const horiz = rect.width >= 80 && rect.height <= 72;
    const vert = rect.height >= 80 && rect.width <= 48;
    const mediumBox = rect.width >= 60 && rect.height >= 24;

    // Very likely buttons/controls: moderate boxes with text.
    const txt = (el.textContent || '').trim();
    if ((hinted || txt) && rect.width >= 40 && rect.width <= 380 && rect.height >= 20 && rect.height <= 70 && (brownish || hasBgImage && lum < 150) && !el.matches('table,tbody,tr,td,th,ul,ol')) {
      applyClass(el, 'tg-auto-wood-control');
      stats.control += 1;
      return;
    }

    if ((brownish || hasBgImage && lum < 155) && horiz && rect.width > rect.height * 2.3) {
      applyClass(el, 'tg-auto-wood-h');
      stats.h += 1;
      return;
    }

    if ((brownish || hasBgImage && lum < 155) && vert && rect.height > rect.width * 2.3) {
      applyClass(el, 'tg-auto-wood-v');
      stats.v += 1;
      return;
    }

    // Large legacy surfaces (paper/green/wood) -> panel or row.
    if (mediumBox && (paperish || greenish || brownish || (hasBgImage && lum < 165))) {
      if (rect.height <= 90 && rect.width >= 90) {
        applyClass(el, 'tg-auto-wood-row');
        stats.row += 1;
      } else {
        applyClass(el, 'tg-auto-wood-panel');
        stats.panel += 1;
      }
    }
  }

  function sweepRoot(root, stats) {
    if (!(root instanceof HTMLElement)) return;
    root.querySelectorAll('*').forEach(el => classify(el, root, stats));
  }

  const ROOT_SELECTORS = [
    '.c-window.border-window',
    '.c-window',
    '#clanmenu',
    '#clanbox',
    '#friends',
    '#myfriends',
    '#myenemies',
    '#dlgwin',
    '#config',
    '#console',
    '#trade',
    '#mailnotifier',
    '#alert',
    '#ask'
  ];

  let lastSig = '';
  function apply() {
    const seen = new Set();
    const stats = {h:0,v:0,panel:0,row:0,control:0,border:0};
    for (const sel of ROOT_SELECTORS) {
      document.querySelectorAll(sel).forEach(root => {
        if (seen.has(root)) return;
        seen.add(root);
        sweepRoot(root, stats);
      });
    }
    const sig = JSON.stringify(stats);
    if (sig !== lastSig) {
      lastSig = sig;
      console.log('%cTDG safe wood override v11.2', 'color:#81dbd5;font-weight:bold', stats);
    }
    document.documentElement.dataset.tdgSafeWood = '11.2';
  }

  const mo = new MutationObserver(() => {
    clearTimeout(mo._tdg112);
    mo._tdg112 = setTimeout(apply, 60);
  });
  mo.observe(document.documentElement, {subtree:true, childList:true, attributes:true, attributeFilter:['class','style']});

  document.addEventListener('click', () => {
    setTimeout(apply, 35);
    setTimeout(apply, 180);
    setTimeout(apply, 500);
  }, true);

  setInterval(apply, 1200);
  apply();
})();
