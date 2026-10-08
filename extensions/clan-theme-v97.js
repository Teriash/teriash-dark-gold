
(() => {
  if (!TDG) {
    console.error("[TDG clan v9.7] missing TDG context");
    return;
  }

  console.log("%cTDG clan module v9.7 LOADED", "color:#76ecf5;font-weight:bold");

  const skip = /icon|outfit|avatar|logo|character|sprite|picture|item-id|inventory|cl_logo|skill-icon|quest-bring-item|npc|hero/i;
  let logged = false;

  function rgb(value) {
    const m = String(value || "").match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
  }

  function oldColor(v) {
    if (!v) return false;
    const [r,g,b] = v;
    const green = g > r * 1.15 && g > b * 1.03 && g > 28 && r < 120;
    const brown = r > b * 1.20 && g > b * 1.13 && r > 35 && g > 20 && b < 110;
    const gray = Math.max(r,g,b) - Math.min(r,g,b) < 32 && r > 15 && r < 175;
    const beige = r > 145 && g > 110 && b < 155;
    return green || brown || gray || beige;
  }

  function mark(el, kind) {
    const cls = kind === "btn" ? "tdg97-base-btn" : kind === "h" ? "tdg97-base-h" : kind === "v" ? "tdg97-base-v" : "tdg97-base-surface";
    el.classList.add(cls);
  }

  function forceKnown() {
    const clan = document.querySelector(".clan");
    const menu = document.querySelector("#clanmenu");
    const box = document.querySelector("#clanbox");
    if (!clan && !menu && !box) return false;

    if (!logged) {
      logged = true;
      console.log("%cTDG clan DOM FOUND v9.7", "color:#81dbd5;font-weight:bold", {
        clan: !!clan, clanmenu: !!menu, clanbox: !!box
      });
    }

    [".clan","#clanmenu","#clanmenu > .boxhover","#clanbox",
     "#clanbox .clan-recruit-content","#clanbox .recruit-section",
     "#clanbox .scroll-wrapper","#clanbox .scroll-pane",
     "#clanbox .background-wrapper","#clanbox .section-recruit-main",
     "#clanbox .clan-part-0","#clanbox .clan-part-1","#clanbox .clan-part-2",
     "#clanbox .clan-members-content","#clanbox .clan-list-content"
    ].forEach(sel => document.querySelectorAll(sel).forEach(el => mark(el,"surface")));

    document.querySelectorAll("#clanmenu li, #clanmenu [id$='-item-menu'], #clanmenu [name$='-item-menu']")
      .forEach(el => mark(el,"btn"));

    ["#clanbox .clan-recruit-header-option",
     "#clanbox .clan-recruit-header-atribute",
     "#clanbox .clan-recruit-header-0",
     "#clanbox .clan-recruit-header-1",
     "#clanbox .clan-recruit-header-2"
    ].forEach(sel => document.querySelectorAll(sel).forEach(el => mark(el,"h")));

    return true;
  }

  function inspect(el) {
    const key = `${el.id || ""} ${typeof el.className === "string" ? el.className : ""}`;
    if (skip.test(key)) return;
    const rect = el.getBoundingClientRect();
    if (rect.width < 8 || rect.height < 8 || rect.width * rect.height < 550) return;

    const cs = getComputedStyle(el);
    const bg = rgb(cs.backgroundColor);
    const img = cs.backgroundImage || "none";
    const own = /surface-v97|bar-h-v97|bar-v-v97|menu-v97|menu-active-v97/.test(img);
    const legacy = oldColor(bg) || (img !== "none" && !own);
    const clanish = /clan|recruit|atribute|treasury|history|diplom|quest|skill|bless|boxhover|item-menu/i.test(key);

    if (!legacy && !clanish) return;

    if (/item-menu|boxhover|card|button|btn/i.test(key) && rect.height <= 95) mark(el,"btn");
    else if (rect.width > 145 && rect.height <= 95) mark(el,"h");
    else if (rect.height > 145 && rect.width <= 145) mark(el,"v");
    else if (rect.width > 75 && rect.height > 45) mark(el,"surface");
  }

  function sweep() {
    if (!forceKnown()) return;
    const root = document.querySelector(".clan") || document.querySelector("#clanbox");
    if (!root) return;
    root.querySelectorAll("*").forEach(inspect);
    document.documentElement.dataset.tdgClan = "9.5";
  }



  /* Narrow wood-bar fixer:
     - does NOT scan/retouch clan menu <li> contents
     - only thin structural pieces
     - only brown color or foreign legacy background image
  */
  const TDG97_HBAR = TDG.asset("clan/bar-h-v97.png");
  const TDG97_VBAR = TDG.asset("clan/bar-v-v97.png");

  function tdg97Rgb(value) {
    const m = String(value || "").match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
  }

  function tdg97Brown(rgb) {
    if (!rgb) return false;
    const [r,g,b] = rgb;
    return r > 42 && g > 22 && b < 110 &&
           r > b * 1.16 && g > b * 1.08;
  }

  function tdg97OwnImage(img) {
    return /surface-v97|bar-h-v97|bar-v-v97|menu-v97|menu-active-v97/.test(String(img || ""));
  }

  function tdg97SetBar(el, vertical) {
    const image = vertical ? TDG97_VBAR : TDG97_HBAR;
    el.style.setProperty("background-color","#082139","important");
    el.style.setProperty("background-image",`url("${image}")`,"important");
    el.style.setProperty("background-repeat","no-repeat","important");
    el.style.setProperty("background-position","center","important");
    el.style.setProperty("background-size","100% 100%","important");
    el.style.setProperty("border-color","#2aa4c1","important");
    el.style.setProperty("box-shadow","none","important");
    el.classList.add(vertical ? "tdg97-bar-v" : "tdg97-bar-h");
  }

  function tdg97KillPseudo(el) {
    const before = getComputedStyle(el,"::before");
    const after = getComputedStyle(el,"::after");
    if (before && before.backgroundImage && before.backgroundImage !== "none" && !tdg97OwnImage(before.backgroundImage)) {
      el.classList.add("tdg97-no-before");
    }
    if (after && after.backgroundImage && after.backgroundImage !== "none" && !tdg97OwnImage(after.backgroundImage)) {
      el.classList.add("tdg97-no-after");
    }
  }

  function tdg97FixBars() {
    const clan = document.querySelector(".clan");
    if (!clan) return 0;

    let count = 0;

    clan.querySelectorAll("*").forEach(el => {
      // Preserve working menu styling from v9.5.
      if (el.closest("#clanmenu li")) return;

      const key = `${el.id || ""} ${typeof el.className === "string" ? el.className : ""}`;
      if (/icon|outfit|avatar|logo|character|sprite|picture|item|npc|hero/i.test(key)) return;

      const r = el.getBoundingClientRect();
      if (r.width < 7 || r.height < 7) return;

      tdg97KillPseudo(el);

      const cs = getComputedStyle(el);
      const bg = tdg97Rgb(cs.backgroundColor);
      const img = cs.backgroundImage || "none";
      const foreign = img !== "none" && !tdg97OwnImage(img);
      const brown = tdg97Brown(bg);

      const hbar = r.width >= 180 && r.height >= 8 && r.height <= 78;
      const vbar = r.height >= 180 && r.width >= 8 && r.width <= 78;
      const structuralName = /border|frame|separator|decor|graphic|edge|bottom|footer|header|bar|background/i.test(key);

      if (hbar && (brown || (foreign && structuralName))) {
        tdg97SetBar(el,false);
        count++;
      } else if (vbar && (brown || (foreign && structuralName))) {
        tdg97SetBar(el,true);
        count++;
      }
    });

    // exact known horizontal recruit bars always win
    [
      "#clanbox .clan-recruit-header-option",
      "#clanbox .clan-recruit-header-atribute",
      "#clanbox .clan-recruit-header-0",
      "#clanbox .clan-recruit-header-1",
      "#clanbox .clan-recruit-header-2",
      "#clanbox .clan-list-find-header"
    ].forEach(sel => document.querySelectorAll(sel).forEach(el => {
      tdg97SetBar(el,false);
    }));

    document.documentElement.dataset.tdgClanBars = "9.7";
    return count;
  }

  const tdg97OriginalSweep = sweep;
  sweep = function() {
    tdg97OriginalSweep();
    const c = tdg97FixBars();
    if (c) console.log("%cTDG clan precise bars v9.7:", "color:#76ecf5", c);
  };

  const observer = new MutationObserver(() => {
    clearTimeout(observer._tdg95);
    observer._tdg95 = setTimeout(sweep, 35);
  });
  observer.observe(document.documentElement, {childList:true, subtree:true});

  document.addEventListener("click", () => {
    setTimeout(sweep, 25);
    setTimeout(sweep, 160);
  }, true);

  setInterval(sweep, 900);
  sweep();
})();
