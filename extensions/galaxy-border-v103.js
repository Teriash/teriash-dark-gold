
(() => {
  if (!TDG) {
    console.error("[TDG galaxy border v10.3] missing TDG context");
    return;
  }

  console.log("%cTDG galaxy border replacer v10.3 LOADED", "color:#76ecf5;font-weight:bold");

  const H = TDG.asset("global/galaxy-h-v103.png");
  const V = TDG.asset("global/galaxy-v-v103.png");
  const BORDER = TDG.asset("global/galaxy-border-v103.png");

  const ROOTS = [
    ".clan",
    ".c-window",
    ".border-window",
    ".left-column.main-column",
    ".right-column.main-column",
    ".new-chat-window"
  ];

  const IGNORE = /icon|outfit|avatar|logo|character|sprite|picture|item|slot|npc|hero|monster|map|mark|tooltip|skill|widget|loot|canvas|chat-message|one-message|emot/i;

  function parseRgb(v) {
    const m = String(v || "").match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
  }

  function light(rgb) {
    if (!rgb) return false;
    const [r,g,b] = rgb;
    return r > 180 && g > 180 && b > 180 && Math.max(r,g,b)-Math.min(r,g,b) < 55;
  }

  function applyBorder(el) {
    el.style.setProperty("border-style","solid","important");
    el.style.setProperty("border-color","transparent","important");
    el.style.setProperty("border-image-source",`url("${BORDER}")`,"important");
    el.style.setProperty("border-image-slice","28","important");
    el.style.setProperty("border-image-width","1","important");
    el.style.setProperty("border-image-outset","0","important");
    el.style.setProperty("border-image-repeat","stretch","important");
    el.style.setProperty("box-shadow","none","important");
    el.classList.add("tdg103-galaxy-border");
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
    el.classList.add(vertical ? "tdg103-v" : "tdg103-h");
  }

  function restoreMarkedBorders(stats) {
    document.querySelectorAll(".tdg101-no-border-image").forEach(el => {
      if (!(el instanceof HTMLElement)) return;
      const key = `${el.id || ""} ${typeof el.className === "string" ? el.className : ""}`;
      if (IGNORE.test(key)) return;

      const r = el.getBoundingClientRect();
      if (r.width < 5 || r.height < 5) return;

      const horizontal = r.width >= 90 && r.height <= 110;
      const vertical = r.height >= 90 && r.width <= 110;

      if (horizontal) {
        applyBar(el, false);
        stats.h++;
      } else if (vertical) {
        applyBar(el, true);
        stats.v++;
      } else {
        applyBorder(el);
        stats.border++;
      }
    });
  }

  function replaceBlankRails(stats) {
    ROOTS.forEach(sel => {
      document.querySelectorAll(sel).forEach(root => {
        if (!(root instanceof HTMLElement)) return;

        root.querySelectorAll("*").forEach(el => {
          if (!(el instanceof HTMLElement)) return;

          const key = `${el.id || ""} ${typeof el.className === "string" ? el.className : ""}`;
          if (IGNORE.test(key)) return;
          if (el.matches("img,canvas,svg,video,button,input,select,textarea,table,th,td")) return;
          if (el.closest(".eq-slot,.inventory-item,.skill-usable-slot,#clanmenu li,.cards-header,.one-clan-atribute")) return;

          const r = el.getBoundingClientRect();
          if (r.width < 5 || r.height < 5) return;

          const cs = getComputedStyle(el);
          const rgb = parseRgb(cs.backgroundColor);
          if (!light(rgb)) return;

          const h = r.width >= 80 && r.height >= 4 && r.height <= 110;
          const v = r.height >= 80 && r.width >= 4 && r.width <= 110;

          if (h) {
            applyBar(el, false);
            el.classList.add("tdg103-blank-h");
            stats.blankH++;
          } else if (v) {
            applyBar(el, true);
            el.classList.add("tdg103-blank-v");
            stats.blankV++;
          }
        });
      });
    });
  }

  function knownClanFrames(stats) {
    // Shell frame itself
    [".clan", "#clanmenu", "#clanbox"].forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        if (!(el instanceof HTMLElement)) return;
        // Only apply 9-slice where the element has visible border widths.
        const cs = getComputedStyle(el);
        const total = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderRightWidth) +
                      parseFloat(cs.borderBottomWidth) + parseFloat(cs.borderLeftWidth);
        if (total > 0) {
          applyBorder(el);
          stats.border++;
        }
      });
    });

    // Generated horizontal separators.
    [
      "#clanbox .clan-recruit-header-option",
      "#clanbox .clan-recruit-header-atribute",
      "#clanbox .clan-recruit-header-0",
      "#clanbox .clan-recruit-header-1",
      "#clanbox .clan-recruit-header-2",
      "#clanbox .clan-list-find-header",
      "#clanbox .quest-content-header",
      "#clanbox .clan-skill-main-header",
      "#clanbox .clan-skill-header",
      "#clanbox .bless-main-header",
      "#clanbox .bless-header"
    ].forEach(sel => document.querySelectorAll(sel).forEach(el => {
      applyBar(el,false);
      stats.forceH++;
    }));
  }

  let last = "";

  function sweep() {
    const stats = {border:0,h:0,v:0,blankH:0,blankV:0,forceH:0};

    restoreMarkedBorders(stats);
    replaceBlankRails(stats);
    knownClanFrames(stats);

    document.documentElement.dataset.tdgGalaxyBorder = "10.3";

    const sig = JSON.stringify(stats);
    if (sig !== last) {
      last = sig;
      console.log("%cTDG galaxy borders v10.3", "color:#81dbd5;font-weight:bold", stats);
    }
  }

  const mo = new MutationObserver(() => {
    clearTimeout(mo._tdg103);
    mo._tdg103 = setTimeout(sweep, 50);
  });

  mo.observe(document.documentElement, {
    childList:true,
    subtree:true,
    attributes:true,
    attributeFilter:["class","style"]
  });

  document.addEventListener("click", () => {
    setTimeout(sweep,30);
    setTimeout(sweep,180);
  }, true);

  setInterval(sweep,1000);
  sweep();
})();
