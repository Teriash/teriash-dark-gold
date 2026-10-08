
(() => {
  if (!TDG) {
    console.error("[TDG legacy remover v10.1] missing TDG context");
    return;
  }

  console.log("%cTDG hard legacy texture remover v10.1 LOADED", "color:#76ecf5;font-weight:bold");

  const H = TDG.asset("global/legacy-h-v101.png");
  const V = TDG.asset("global/legacy-v-v101.png");
  const P = TDG.asset("global/legacy-panel-v101.png");

  const ROOTS = [
    ".clan",
    ".c-window",
    ".border-window",
    ".left-column.main-column",
    ".right-column.main-column",
    ".new-chat-window"
  ];

  const IGNORE = /icon|outfit|avatar|logo|character|sprite|picture|item|slot|npc|hero|monster|map|mark|tooltip|skill|widget|loot|canvas|chat-message|one-message|emot/i;

  function own(s) {
    return /teriash-dark-gold|legacy-h-v101|legacy-v-v101|legacy-panel-v101|surface-v98|strip-h-v98|strip-v-v98|menu-v98|menu-active-v98|chat-panel|right-panel|window-fill|slot\.png|hud-center|top-full|bottom-full/i.test(String(s || ""));
  }

  function parseRgb(v) {
    const m=String(v||"").match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    return m ? [Number(m[1]),Number(m[2]),Number(m[3])] : null;
  }

  function brown(v) {
    if (!v) return false;
    const [r,g,b]=v;
    return r >= 32 && g >= 16 && b <= 125 && r > b*1.08 && g > b*1.01;
  }

  function applyBar(el, vertical) {
    const url = vertical ? V : H;
    el.style.setProperty("background-color","#082139","important");
    el.style.setProperty("background-image",`url("${url}")`,"important");
    el.style.setProperty("background-repeat","no-repeat","important");
    el.style.setProperty("background-position","center","important");
    el.style.setProperty("background-size","100% 100%","important");
    el.style.setProperty("border-image","none","important");
    el.style.setProperty("border-image-source","none","important");
    el.style.setProperty("border-color","#2aa4c1","important");
    el.style.setProperty("box-shadow","none","important");
    el.classList.add(vertical ? "tdg101-v" : "tdg101-h");
  }

  function applyPanel(el) {
    el.style.setProperty("background-color","#07172b","important");
    el.style.setProperty("background-image",`url("${P}")`,"important");
    el.style.setProperty("background-repeat","no-repeat","important");
    el.style.setProperty("background-position","center","important");
    el.style.setProperty("background-size","cover","important");
    el.style.setProperty("border-image","none","important");
    el.style.setProperty("border-image-source","none","important");
    el.style.setProperty("border-color","#238eaa","important");
    el.style.setProperty("box-shadow","none","important");
    el.classList.add("tdg101-panel");
  }

  function killBorderImage(el) {
    el.style.setProperty("border-image","none","important");
    el.style.setProperty("border-image-source","none","important");
    el.classList.add("tdg101-no-border-image");
  }

  function checkPseudo(el) {
    const before=getComputedStyle(el,"::before");
    const after=getComputedStyle(el,"::after");

    const bBg=before.backgroundImage || "none";
    const aBg=after.backgroundImage || "none";
    const bBi=before.borderImageSource || "none";
    const aBi=after.borderImageSource || "none";

    if ((bBg!=="none" && !own(bBg)) || (bBi!=="none" && !own(bBi)) || brown(parseRgb(before.backgroundColor))) {
      el.classList.add("tdg101-no-before");
    }
    if ((aBg!=="none" && !own(aBg)) || (aBi!=="none" && !own(aBi)) || brown(parseRgb(after.backgroundColor))) {
      el.classList.add("tdg101-no-after");
    }
  }

  function inspect(el, stats) {
    if (!(el instanceof HTMLElement)) return;
    const key=`${el.id||""} ${typeof el.className==="string"?el.className:""}`;
    if (IGNORE.test(key)) return;

    const r=el.getBoundingClientRect();
    if (r.width<5 || r.height<5) return;
    if (el.matches("canvas,svg,video")) return;
    if (el.closest(".eq-slot,.inventory-item,.skill-usable-slot")) return;

    const cs=getComputedStyle(el);
    const bg=cs.backgroundImage || "none";
    const bi=cs.borderImageSource || "none";
    const bgColor=parseRgb(cs.backgroundColor);

    const foreignBg=bg!=="none" && !own(bg);
    const foreignBi=bi!=="none" && !own(bi);
    const isBrown=brown(bgColor);

    checkPseudo(el);

    // Border-image is the missing case from previous versions.
    if (foreignBi) {
      killBorderImage(el);
      stats.borderImage++;
    }

    const h=r.width>=100 && r.height>=5 && r.height<=100;
    const v=r.height>=100 && r.width>=5 && r.width<=100;
    const large=r.width>=130 && r.height>=100;

    // For narrow pieces, ANY foreign texture inside UI roots is structural enough.
    if (h && foreignBg) {
      applyBar(el,false);
      stats.h++;
      return;
    }
    if (v && foreignBg) {
      applyBar(el,true);
      stats.v++;
      return;
    }

    // Brown narrow pieces even without background images.
    if (h && isBrown) {
      applyBar(el,false);
      stats.h++;
      return;
    }
    if (v && isBrown) {
      applyBar(el,true);
      stats.v++;
      return;
    }

    // Larger brown structural surfaces.
    if (large && isBrown && /border|frame|panel|wrapper|background|decor|section|content/i.test(key)) {
      applyPanel(el);
      stats.panel++;
    }
  }

  function inspectImages(root, stats) {
    root.querySelectorAll("img").forEach(img => {
      const key=`${img.id||""} ${img.className||""} ${img.src||""}`;
      if (IGNORE.test(key)) return;
      const r=img.getBoundingClientRect();
      if (r.width<5 || r.height<5) return;

      const h=r.width>=120 && r.height<=100;
      const v=r.height>=120 && r.width<=100;
      if (!h && !v) return;

      // Thin decorative images are legacy bars/rails, not content.
      const parent=img.parentElement;
      if (!parent) return;

      img.style.setProperty("visibility","hidden","important");
      applyBar(parent,v);
      stats.img++;
    });
  }

  let last="";

  function sweep() {
    const stats={borderImage:0,h:0,v:0,panel:0,img:0};
    const seen=new Set();

    ROOTS.forEach(sel => {
      document.querySelectorAll(sel).forEach(root => {
        if (seen.has(root)) return;
        seen.add(root);
        inspect(root,stats);
        root.querySelectorAll("*").forEach(el => inspect(el,stats));
        inspectImages(root,stats);
      });
    });

    document.documentElement.dataset.tdgLegacyRemover="10.1";
    const sig=JSON.stringify(stats);
    if (sig!==last) {
      last=sig;
      console.log("%cTDG legacy replacements v10.1", "color:#81dbd5;font-weight:bold", stats);
    }
  }

  const mo=new MutationObserver(() => {
    clearTimeout(mo._t);
    mo._t=setTimeout(sweep,50);
  });
  mo.observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:["class","style"]});

  document.addEventListener("click",()=>{setTimeout(sweep,30);setTimeout(sweep,180)},true);
  setInterval(sweep,1000);
  sweep();
})();
