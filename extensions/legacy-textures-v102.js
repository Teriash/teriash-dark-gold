
(() => {
  if (!TDG) {
    console.error('[TDG galaxy bar replacer v10.2] missing TDG context');
    return;
  }

  console.log('%cTDG galaxy bar replacer v10.2 LOADED', 'color:#76ecf5;font-weight:bold');

  const H = TDG.asset('clan/frame-h-v98.png');
  const V = TDG.asset('clan/frame-v-v98.png');
  const P = TDG.asset('clan/surface-v98.png');

  const ROOTS = [
    '.clan', '.c-window', '.border-window',
    '.left-column.main-column', '.right-column.main-column', '.new-chat-window'
  ];

  const IGNORE = /icon|outfit|avatar|logo|character|sprite|picture|item|slot|npc|hero|monster|map|mark|tooltip|skill|widget|loot|canvas|chat-message|one-message|emot/i;

  function own(s) {
    return /teriash-dark-gold|frame-h-v98|frame-v-v98|surface-v98|legacy-h-v101|legacy-v-v101|legacy-panel-v101|chat-panel|right-panel|window-fill|slot\.png|hud-center|top-full|bottom-full/i.test(String(s||''));
  }
  function parseRgb(v) {
    const m = String(v||'').match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
  }
  function brown(v) {
    if (!v) return false;
    const [r,g,b]=v;
    return r >= 32 && g >= 16 && b <= 125 && r > b*1.08 && g > b*1.01;
  }
  function light(v) {
    if (!v) return false;
    const [r,g,b]=v;
    return r>180 && g>180 && b>180 && Math.max(r,g,b)-Math.min(r,g,b) < 45;
  }
  function structural(key) {
    return /border|frame|separator|decor|graphic|edge|bottom|footer|side|wood|bar|header|part|wrapper|section|content|background/i.test(key);
  }
  function applyBar(el, vertical) {
    const url = vertical ? V : H;
    el.style.setProperty('background-color','#082139','important');
    el.style.setProperty('background-image',`url("${url}")`,'important');
    el.style.setProperty('background-repeat','no-repeat','important');
    el.style.setProperty('background-position','center','important');
    el.style.setProperty('background-size','100% 100%','important');
    el.style.setProperty('border-image','none','important');
    el.style.setProperty('border-image-source','none','important');
    el.style.setProperty('border-color','#2aa4c1','important');
    el.style.setProperty('box-shadow','none','important');
    el.classList.add(vertical ? 'tdg102-v' : 'tdg102-h');
  }
  function applyPanel(el) {
    el.style.setProperty('background-color','#07172b','important');
    el.style.setProperty('background-image',`url("${P}")`,'important');
    el.style.setProperty('background-repeat','no-repeat','important');
    el.style.setProperty('background-position','center','important');
    el.style.setProperty('background-size','cover','important');
    el.style.setProperty('border-image','none','important');
    el.style.setProperty('border-image-source','none','important');
    el.style.setProperty('border-color','#238eaa','important');
    el.style.setProperty('box-shadow','none','important');
    el.classList.add('tdg102-panel');
  }

  function inspect(el, stats) {
    if (!(el instanceof HTMLElement)) return;
    const key = `${el.id||''} ${typeof el.className==='string'?el.className:''}`;
    if (IGNORE.test(key)) return;
    if (el.matches('canvas,svg,video,table,th,td')) return;
    if (el.closest('.eq-slot,.inventory-item,.skill-usable-slot,#clanmenu li,.cards-header,.one-clan-atribute')) return;

    const r=el.getBoundingClientRect();
    if (r.width<5 || r.height<5) return;

    const cs=getComputedStyle(el);
    const bg=cs.backgroundImage || 'none';
    const bi=cs.borderImageSource || 'none';
    const rgb=parseRgb(cs.backgroundColor);
    const foreignBg = bg!=='none' && !own(bg);
    const foreignBi = bi!=='none' && !own(bi);
    const isBrown = brown(rgb);
    const isLight = light(rgb);

    const h = r.width>=80 && r.height>=4 && r.height<=110;
    const v = r.height>=80 && r.width>=4 && r.width<=110;
    const large = r.width>=120 && r.height>=80;

    if (foreignBi) {
      el.style.setProperty('border-image','none','important');
      el.style.setProperty('border-image-source','none','important');
      stats.borderImage++;
    }

    // Replace thin structural bars - wood, blank white leftovers, or foreign images.
    if (h && (foreignBg || foreignBi || isBrown || (isLight && structural(key)))) {
      applyBar(el,false);
      stats.h++;
      return;
    }
    if (v && (foreignBg || foreignBi || isBrown || (isLight && structural(key)))) {
      applyBar(el,true);
      stats.v++;
      return;
    }

    // Blank white wrappers after the wood is removed.
    if (large && isLight && structural(key)) {
      applyPanel(el);
      stats.panel++;
      return;
    }
  }

  function knownClanFixes(stats) {
    [
      '#clanbox .clan-recruit-header-option',
      '#clanbox .clan-recruit-header-atribute',
      '#clanbox .clan-recruit-header-0',
      '#clanbox .clan-recruit-header-1',
      '#clanbox .clan-recruit-header-2',
      '#clanbox .clan-list-find-header',
      '#clanbox .quest-content-header',
      '#clanbox .clan-skill-main-header',
      '#clanbox .clan-skill-header',
      '#clanbox .bless-main-header',
      '#clanbox .bless-header',
      '#clanbox .header-background-graphic'
    ].forEach(sel => document.querySelectorAll(sel).forEach(el => { applyBar(el,false); stats.forceH++; }));

    [
      '#clanbox .background-wrapper',
      '#clanbox .section-recruit-main',
      '#clanbox .clan-part-0',
      '#clanbox .clan-part-1',
      '#clanbox .clan-part-2'
    ].forEach(sel => document.querySelectorAll(sel).forEach(el => {
      const r=el.getBoundingClientRect();
      if (r.height>120 && r.width<90) { applyBar(el,true); stats.forceV++; }
    }));
  }

  function inspectImages(root, stats) {
    root.querySelectorAll('img').forEach(img => {
      const key=`${img.id||''} ${img.className||''} ${img.src||''}`;
      if (IGNORE.test(key)) return;
      const r=img.getBoundingClientRect();
      if (r.width<5 || r.height<5) return;
      const h=r.width>=120 && r.height<=100;
      const v=r.height>=120 && r.width<=100;
      if (!h && !v) return;
      const parent=img.parentElement;
      if (!parent) return;
      img.style.setProperty('display','none','important');
      applyBar(parent, v);
      stats.img++;
    });
  }

  let last='';
  function sweep() {
    const stats={borderImage:0,h:0,v:0,panel:0,img:0,forceH:0,forceV:0};
    const seen=new Set();
    ROOTS.forEach(sel => {
      document.querySelectorAll(sel).forEach(root => {
        if (seen.has(root)) return;
        seen.add(root);
        inspect(root,stats);
        root.querySelectorAll('*').forEach(el => inspect(el,stats));
        inspectImages(root,stats);
      });
    });
    knownClanFixes(stats);
    document.documentElement.dataset.tdgGalaxyBarReplacer='10.2';
    const sig=JSON.stringify(stats);
    if (sig!==last) {
      last=sig;
      console.log('%cTDG galaxy replacements v10.2', 'color:#81dbd5;font-weight:bold', stats);
    }
  }
  const mo=new MutationObserver(() => { clearTimeout(mo._t); mo._t=setTimeout(sweep, 50); });
  mo.observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['class','style']});
  document.addEventListener('click',()=>{setTimeout(sweep,30); setTimeout(sweep,180);},true);
  setInterval(sweep,1000);
  sweep();
})();
