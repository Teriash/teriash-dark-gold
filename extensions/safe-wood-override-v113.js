
(() => {
  if (!TDG) return;

  console.log("%cTDG artifact-safe wood override v11.3 LOADED", "color:#76ecf5;font-weight:bold");

  const LEGACY_IGNORE = /(^|\s)(item|slot|icon|mini|avatar|outfit|sprite|char|npc|mob|hero|monster|map|mark|skill|emot|canvas|tooltip|bag|eq|button-icon)(\s|$)|icon|sprite|canvas|avatar|outfit|postacie|item/i;
  const STRUCTURAL_HINT = /bar|rail|split|divider|panel|section|main|footer|list|box|quest|journal|filter|pane|attribute|atribute|recruit|treasury|history|diplom/i;

  // Native NI framework pieces must NEVER be auto-classified. These are already
  // themed by the stable base/window CSS and touching them creates holes/artifacts.
  const CORE_NI = [
    '.header-label-positioner', '.draggable-window-element', '.header-label',
    '.header-label .left-decor', '.header-label .right-decor',
    '.window-controlls', '.c-window__bottom-bar',
    '.interface-element-bottom-bar-background-stretch',
    '.close-button-corner-decor', '.close-button', '.border-image',
    '.transparent-window-buttons-menu', '.manage-hamburger-button', '.increase-opacity',
    '.tabs-nav', '.tabs-contents', '.tabs-content-option',
    '.scrollbar-wrapper', '.scrollbar-wrapper .track', '.scrollbar-wrapper .handle',
    '.clear-cross', '.ie-icon', '.search-component',
    '.world-window__tabs', '.world-window__contents'
  ].join(',');

  function parseRgb(v) {
    const m = String(v || '').match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
  }
  function luminance(rgb) {
    if (!rgb) return 0;
    return (rgb[0]*299 + rgb[1]*587 + rgb[2]*114)/1000;
  }
  function isBrown(rgb) {
    if (!rgb) return false;
    const [r,g,b] = rgb;
    return r >= 40 && r <= 190 && g >= 18 && g <= 130 && b <= 105 && r > g + 8 && g >= b - 8;
  }
  function isPaper(rgb) {
    if (!rgb) return false;
    const [r,g,b] = rgb;
    return r >= 155 && g >= 140 && b >= 100 && r-b <= 100 && g-b <= 75;
  }
  function isGreenish(rgb) {
    if (!rgb) return false;
    const [r,g,b] = rgb;
    return g > r + 12 && g > b + 8 && g >= 65 && r <= 120;
  }
  function hasTheme(el, cs) {
    if ([...el.classList].some(c => c.startsWith('tg-'))) return true;
    const s = `${cs.backgroundImage||''} ${cs.borderImageSource||''}`;
    return /assets\/components|panel-v110|bar-h-v110|bar-v-v110|control-v110|row-v110|frame-v110/i.test(s);
  }
  function isCoreNI(el) {
    return !!el.matches(CORE_NI) || !!el.closest('.header-label-positioner,.c-window__bottom-bar,.close-button-corner-decor,.transparent-window-buttons-menu');
  }
  function ignoreElement(el) {
    if (!(el instanceof HTMLElement)) return true;
    if (el.matches('img,canvas,svg,video,input,select,textarea,option,table,thead,tbody,tr,th,td')) return true;
    if (isCoreNI(el)) return true;
    const key = `${el.id||''} ${typeof el.className==='string'?el.className:''}`;
    if (LEGACY_IGNORE.test(key)) return true;
    if (el.closest('.eq-slot,.inventory-item,.skill-usable-slot,.one-message,.message,.chat-message,.frchar')) return true;
    return false;
  }
  function applyClass(el, cls) {
    el.classList.remove('tg-auto-wood-h','tg-auto-wood-v','tg-auto-wood-panel','tg-auto-wood-row','tg-auto-wood-control');
    el.classList.add(cls);
  }

  function classify(el, stats) {
    if (ignoreElement(el)) return;
    const cs = getComputedStyle(el);
    if (hasTheme(el, cs)) return;

    const rect = el.getBoundingClientRect();
    if (rect.width < 5 || rect.height < 5) return;
    if (rect.width > innerWidth*.94 && rect.height > innerHeight*.94) return;

    const key = `${el.id||''} ${typeof el.className==='string'?el.className:''}`;
    const hinted = STRUCTURAL_HINT.test(key);
    const rgb = parseRgb(cs.backgroundColor);
    const bgImg = String(cs.backgroundImage||'');
    const hasBgImage = bgImg && bgImg !== 'none';
    const brown = isBrown(rgb), paper = isPaper(rgb), green = isGreenish(rgb);
    const lum = luminance(rgb);

    if (cs.borderImageSource && cs.borderImageSource !== 'none' && !/frame-v110|assets\/components/i.test(cs.borderImageSource)) {
      // only swap an existing border-image; never create geometry
      el.classList.add('tg-auto-wood-border');
      stats.border++;
    }

    const horiz = rect.width >= 100 && rect.height >= 6 && rect.height <= 62;
    const vert = rect.height >= 100 && rect.width >= 6 && rect.width <= 44;
    const medium = rect.width >= 80 && rect.height >= 24;

    // Controls: only legacy-looking elements with semantic hints or text.
    const txt = (el.textContent||'').trim();
    if ((brown || (hasBgImage && lum < 150)) && rect.width >= 45 && rect.width <= 360 && rect.height >= 22 && rect.height <= 64 && (hinted || txt)) {
      applyClass(el,'tg-auto-wood-control'); stats.control++; return;
    }
    if ((brown || (hasBgImage && lum < 150)) && horiz && hinted) {
      applyClass(el,'tg-auto-wood-h'); stats.h++; return;
    }
    if ((brown || (hasBgImage && lum < 150)) && vert && hinted) {
      applyClass(el,'tg-auto-wood-v'); stats.v++; return;
    }
    if (medium && hinted && (paper || green || brown)) {
      if (rect.height <= 82) { applyClass(el,'tg-auto-wood-row'); stats.row++; }
      else { applyClass(el,'tg-auto-wood-panel'); stats.panel++; }
    }
  }

  function cleanupCoreArtifacts() {
    document.querySelectorAll(CORE_NI).forEach(el => {
      el.classList.remove(
        'tg-auto-wood-h','tg-auto-wood-v','tg-auto-wood-panel','tg-auto-wood-row','tg-auto-wood-control','tg-auto-wood-border'
      );
    });
  }

  const ROOT_SELECTORS = [
    '.c-window.border-window > .content > .inner-content',
    '#clanmenu','#clanbox','#friends','#myfriends','#myenemies',
    '#dlgwin','#config','#console','#trade','#mailnotifier','#alert','#ask'
  ];

  let last='';
  function apply() {
    cleanupCoreArtifacts();
    const seen=new Set();
    const stats={h:0,v:0,panel:0,row:0,control:0,border:0};
    ROOT_SELECTORS.forEach(sel => {
      document.querySelectorAll(sel).forEach(root => {
        if (seen.has(root)) return;
        seen.add(root);
        root.querySelectorAll('*').forEach(el => classify(el,stats));
      });
    });
    const sig=JSON.stringify(stats);
    if (sig!==last) {
      last=sig;
      console.log('%cTDG artifact-safe override v11.3','color:#81dbd5;font-weight:bold',stats);
    }
    document.documentElement.dataset.tdgArtifactSafe='11.3';
  }

  const mo=new MutationObserver(() => { clearTimeout(mo._tdg113); mo._tdg113=setTimeout(apply,70); });
  mo.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class','style']});
  document.addEventListener('click',()=>{setTimeout(apply,40);setTimeout(apply,220);},true);
  setInterval(apply,1400);
  apply();
})();
