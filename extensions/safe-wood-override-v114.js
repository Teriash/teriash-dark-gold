(() => {
  if (!TDG) return;

  console.log("%cTDG stable targeted override v11.4 LOADED", "color:#76ecf5;font-weight:bold");

  const IGNORE_RE = /(^|\s)(item|slot|icon|mini|avatar|outfit|sprite|char|npc|mob|hero|monster|map|mark|skill|emot|canvas|tooltip|bag|eq|button-icon)(\s|$)|icon|sprite|canvas|avatar|outfit|postacie|item/i;
  const LEGACY_HINT = /wood|frame|border|separator|divider|bar|rail|header|footer|bottom|side|panel|section|quest|journal|recruit|clan|treasury|history|diplom|filter/i;
  const CONTROL_HINT = /button|btn|menu|tab|card|option|action|filter/i;

  const CORE_NI = [
    '.header-label-positioner', '.draggable-window-element', '.header-label',
    '.header-label .left-decor', '.header-label .right-decor',
    '.window-controlls', '.c-window__bottom-bar',
    '.interface-element-bottom-bar-background-stretch',
    '.close-button-corner-decor', '.close-button', '.border-image',
    '.transparent-window-buttons-menu', '.manage-hamburger-button', '.increase-opacity',
    '.scrollbar-wrapper', '.scrollbar-wrapper .track', '.scrollbar-wrapper .handle',
    '.clear-cross', '.ie-icon'
  ].join(',');

  function parseRgb(v) {
    const m = String(v || '').match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
  }

  function isBrown(rgb) {
    if (!rgb) return false;
    const [r,g,b] = rgb;
    return r >= 42 && r <= 185 && g >= 20 && g <= 125 && b <= 100 && r > g + 8 && g >= b - 8;
  }
  function isPaper(rgb) {
    if (!rgb) return false;
    const [r,g,b] = rgb;
    return r >= 165 && g >= 145 && b >= 105 && r - b <= 95 && g - b <= 75;
  }
  function isGreen(rgb) {
    if (!rgb) return false;
    const [r,g,b] = rgb;
    return g > r + 16 && g > b + 10 && g >= 65 && r <= 115;
  }

  function hasTheme(el, cs) {
    if ([...el.classList].some(c => c.startsWith('tg-'))) return true;
    const s = `${cs.backgroundImage || ''} ${cs.borderImageSource || ''}`;
    return /assets\/components|panel-v110|bar-h-v110|bar-v-v110|control-v110|row-v110|frame-v110/i.test(s);
  }

  function isCoreNI(el) {
    return !!el.matches(CORE_NI) || !!el.closest('.header-label-positioner,.c-window__bottom-bar,.close-button-corner-decor,.transparent-window-buttons-menu');
  }

  function ignore(el) {
    if (!(el instanceof HTMLElement)) return true;
    if (el.matches('img,canvas,svg,video,input,select,textarea,option,table,thead,tbody,tr,th,td')) return true;
    if (isCoreNI(el)) return true;
    const key = `${el.id || ''} ${typeof el.className === 'string' ? el.className : ''}`;
    if (IGNORE_RE.test(key)) return true;
    if (el.closest('.eq-slot,.inventory-item,.skill-usable-slot,.one-message,.message,.chat-message,.frchar')) return true;
    return false;
  }

  function setAuto(el, cls) {
    el.classList.remove('tg-auto-wood-h','tg-auto-wood-v','tg-auto-wood-panel','tg-auto-wood-row','tg-auto-wood-control','tg-auto-wood-border');
    el.classList.add(cls);
  }

  function cleanupCore() {
    document.querySelectorAll(CORE_NI).forEach(el => {
      el.classList.remove('tg-auto-wood-h','tg-auto-wood-v','tg-auto-wood-panel','tg-auto-wood-row','tg-auto-wood-control','tg-auto-wood-border');
    });
  }

  function classify(el, stats) {
    if (ignore(el)) return;
    const cs = getComputedStyle(el);
    if (hasTheme(el, cs)) return;

    const rect = el.getBoundingClientRect();
    if (rect.width < 5 || rect.height < 5) return;
    if (rect.width > innerWidth * .90 && rect.height > innerHeight * .90) return;

    const key = `${el.id || ''} ${typeof el.className === 'string' ? el.className : ''}`;
    const rgb = parseRgb(cs.backgroundColor);
    const brown = isBrown(rgb), paper = isPaper(rgb), green = isGreen(rgb);
    const legacyColor = brown || paper || green;
    const legacyHint = LEGACY_HINT.test(key);

    // Important change vs 11.2: background-image ALONE is never enough.
    // This prevents native NI graphics from being converted into giant bars.
    if (!legacyColor) return;

    // Only swap border-image on a genuinely legacy-coloured semantic element.
    if (legacyHint && cs.borderImageSource && cs.borderImageSource !== 'none' && !/frame-v110|assets\/components/i.test(cs.borderImageSource)) {
      el.classList.add('tg-auto-wood-border');
      stats.border++;
    }

    const horizontal = rect.width >= 100 && rect.height >= 7 && rect.height <= 65 && rect.width > rect.height * 2.5;
    const vertical = rect.height >= 100 && rect.width >= 7 && rect.width <= 42 && rect.height > rect.width * 2.5;
    const text = (el.textContent || '').trim();

    if (horizontal && legacyHint) {
      setAuto(el, 'tg-auto-wood-h');
      stats.h++;
      return;
    }
    if (vertical && legacyHint) {
      setAuto(el, 'tg-auto-wood-v');
      stats.v++;
      return;
    }

    if (CONTROL_HINT.test(key) && text && rect.width >= 40 && rect.width <= 340 && rect.height >= 22 && rect.height <= 64) {
      setAuto(el, 'tg-auto-wood-control');
      stats.control++;
      return;
    }

    // Panels/rows only with semantic hints. No generic content/wrapper matches.
    if (legacyHint && rect.width >= 80 && rect.height >= 28) {
      if (rect.height <= 86) {
        setAuto(el, 'tg-auto-wood-row');
        stats.row++;
      } else {
        setAuto(el, 'tg-auto-wood-panel');
        stats.panel++;
      }
    }
  }

  // Scan only content roots, never full .c-window shells.
  const ROOTS = [
    '.c-window.border-window > .content > .inner-content',
    '#clanmenu', '#clanbox',
    '#friends', '#myfriends', '#myenemies',
    '#dlgwin', '#config', '#console', '#trade', '#mailnotifier', '#alert', '#ask'
  ];

  let last = '';
  function apply() {
    cleanupCore();
    const seen = new Set();
    const stats = {h:0,v:0,panel:0,row:0,control:0,border:0};
    ROOTS.forEach(sel => {
      document.querySelectorAll(sel).forEach(root => {
        if (seen.has(root)) return;
        seen.add(root);
        root.querySelectorAll('*').forEach(el => classify(el, stats));
      });
    });

    const sig = JSON.stringify(stats);
    if (sig !== last) {
      last = sig;
      console.log('%cTDG stable targeted override v11.4', 'color:#81dbd5;font-weight:bold', stats);
    }
    document.documentElement.dataset.tdgStableTargeted = '11.4';
  }

  const mo = new MutationObserver(() => {
    clearTimeout(mo._tdg114);
    mo._tdg114 = setTimeout(apply, 80);
  });
  mo.observe(document.documentElement, {subtree:true, childList:true, attributes:true, attributeFilter:['class','style']});

  document.addEventListener('click', () => {
    setTimeout(apply, 40);
    setTimeout(apply, 220);
  }, true);

  setInterval(apply, 1600);
  apply();
})();