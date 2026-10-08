
(() => {
  if (!TDG) return;

  console.log('%cTDG skills DOM target v11.9 LOADED', 'color:#76ecf5;font-weight:bold');

  const norm = s => String(s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase();

  function leavesWithText(root, wanted) {
    const w = norm(wanted);
    const out = [];
    root.querySelectorAll('*').forEach(el => {
      if (!(el instanceof HTMLElement)) return;
      if (el.children.length > 4) return;
      const t = norm(el.textContent);
      if (t === w || t.includes(w)) out.push(el);
    });
    return out;
  }

  function findSkillsWindow() {
    // Old/SI-compatible id if present.
    const legacy = document.querySelector('#skills');
    if (legacy && legacy.offsetParent !== null) return legacy;

    // Current NI window: identify by visible header text, not guessed class names.
    const windows = [...document.querySelectorAll('.c-window.border-window, .c-window, .border-window')]
      .filter(el => el instanceof HTMLElement && el.offsetParent !== null);

    for (const win of windows) {
      const header = win.querySelector('.header-label, .header-label-positioner, [class*="header-label"]');
      const text = norm(header?.textContent || '');
      if (text.includes('UMIEJETNOSCI')) return win;
    }

    // Fallback: locate visible exact heading and climb to a window-sized ancestor.
    for (const el of [...document.querySelectorAll('body *')]) {
      if (!(el instanceof HTMLElement) || el.offsetParent === null) continue;
      if (!norm(el.textContent).includes('LISTA UMIEJETNOSCI')) continue;
      let p = el;
      for (let i=0; p && i<10; i++, p=p.parentElement) {
        const r = p.getBoundingClientRect();
        if (r.width >= 450 && r.height >= 300 && r.width <= innerWidth*.95 && r.height <= innerHeight*.95) {
          return p;
        }
      }
    }
    return null;
  }

  function ancestorBar(el, root, opts={}) {
    if (!el) return null;
    const rr = root.getBoundingClientRect();
    let p = el;
    let best = null;
    for (let i=0; p && p !== root && i<8; i++, p=p.parentElement) {
      const r = p.getBoundingClientRect();
      if (r.width < 120 || r.height < 12) continue;
      if (r.width > rr.width * 1.02) continue;
      const maxH = opts.maxH || 90;
      if (r.height <= maxH) {
        best = p;
        if (r.width >= rr.width * (opts.minWidthRatio || .35)) break;
      }
    }
    return best;
  }

  function findCommonFooter(root) {
    const mastery = leavesWithText(root, 'MISTRZOSTWO WALKI')[0];
    const reset = leavesWithText(root, 'RESET PUNKTOW')[0];
    if (!mastery && !reset) return null;

    const rr = root.getBoundingClientRect();
    const starts = [mastery, reset].filter(Boolean);
    for (const start of starts) {
      let p = start;
      for (let i=0; p && p !== root && i<9; i++, p=p.parentElement) {
        const r = p.getBoundingClientRect();
        if (r.height >= 28 && r.height <= 90 && r.width >= rr.width * .65) {
          const t = norm(p.textContent);
          if (t.includes('MISTRZOSTWO WALKI') || t.includes('RESET PUNKTOW')) return p;
        }
      }
    }
    return null;
  }

  function brownish(rgb) {
    const m = String(rgb || '').match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if (!m) return false;
    const r=+m[1], g=+m[2], b=+m[3];
    return r >= 45 && g >= 20 && b <= 110 && r > g + 8 && g >= b - 5;
  }

  function apply() {
    const root = findSkillsWindow();
    if (!root) return;

    let titleBar = null;
    const listLabels = leavesWithText(root, 'LISTA UMIEJETNOSCI');
    for (const label of listLabels) {
      const b = ancestorBar(label, root, {maxH:80, minWidthRatio:.35});
      if (b) { titleBar = b; break; }
    }
    if (titleBar) titleBar.classList.add('tg119-skills-bar');

    const footer = findCommonFooter(root);
    if (footer) footer.classList.add('tg119-skills-footer');

    // Very narrow scope: only visible thin brown separators inside this identified skills window.
    const rr = root.getBoundingClientRect();
    root.querySelectorAll('*').forEach(el => {
      if (!(el instanceof HTMLElement) || el === titleBar || el === footer) return;
      if (el.matches('img,canvas,svg,button,input,select,textarea')) return;
      if (el.closest('.skillbox,.skillbox_shadow,[class*="skill-icon"]')) return;
      const r = el.getBoundingClientRect();
      if (r.width < rr.width * .35 || r.height < 6 || r.height > 55) return;
      const cs = getComputedStyle(el);
      if (brownish(cs.backgroundColor)) el.classList.add('tg119-skills-separator');
    });

    document.documentElement.dataset.tdgSkillsDomTarget = '11.9';
  }

  const mo = new MutationObserver(() => {
    clearTimeout(mo._tg119);
    mo._tg119 = setTimeout(apply, 60);
  });
  mo.observe(document.documentElement, {subtree:true, childList:true});

  document.addEventListener('click', () => {
    setTimeout(apply, 30);
    setTimeout(apply, 160);
  }, true);

  setInterval(apply, 1000);
  apply();
})();
