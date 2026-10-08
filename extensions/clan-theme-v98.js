
(() => {
  if (!TDG) {
    console.error("[TDG clan v9.8] missing TDG context");
    return;
  }

  console.log("%cTDG clan module v9.8 LOADED", "color:#76ecf5;font-weight:bold");

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
    const cls = kind === "btn" ? "tdg98-btn" : kind === "h" ? "tdg98-h" : kind === "v" ? "tdg98-v" : "tdg98-surface";
    el.classList.add(cls);
  }

  function forceKnown() {
    const clan = document.querySelector(".clan");
    const menu = document.querySelector("#clanmenu");
    const box = document.querySelector("#clanbox");
    if (!clan && !menu && !box) return false;

    if (!logged) {
      logged = true;
      console.log("%cTDG clan DOM FOUND v9.8", "color:#81dbd5;font-weight:bold", {
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
    const own = /surface-v98|strip-h-v98|strip-v-v98|menu-v98|menu-active-v98/.test(img);
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
    document.documentElement.dataset.tdgClan = "9.8";
  }



  // ---------------------------------------------------------------
  // v9.8: frame-only detector.
  // It deliberately does NOT restyle menu entries, cards, buttons,
  // attribute rows or tables. It only replaces narrow structural bars.
  // ---------------------------------------------------------------
  const TDG98_FRAME_H = TDG.asset("clan/frame-h-v98.png");
  const TDG98_FRAME_V = TDG.asset("clan/frame-v-v98.png");

  function tdg98ParseRgb(value) {
    const m = String(value || "").match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
  }

  function tdg98LooksBrown(rgb) {
    if (!rgb) return false;
    const [r,g,b] = rgb;
    return r >= 38 && g >= 20 && b <= 115 &&
           r > b * 1.14 && g > b * 1.06;
  }

  function tdg98IsOwnImage(value) {
    return /surface-v98|strip-h-v98|strip-v-v98|menu-v98|menu-active-v98|frame-h-v98|frame-v-v98/.test(String(value || ""));
  }

  function tdg98SetFrame(el, vertical) {
    const image = vertical ? TDG98_FRAME_V : TDG98_FRAME_H;
    el.style.setProperty("background-color", "#082139", "important");
    el.style.setProperty("background-image", `url("${image}")`, "important");
    el.style.setProperty("background-repeat", "no-repeat", "important");
    el.style.setProperty("background-position", "center", "important");
    el.style.setProperty("background-size", "100% 100%", "important");
    el.style.setProperty("border-color", "#2aa4c1", "important");
    el.style.setProperty("box-shadow", "none", "important");
    el.classList.add(vertical ? "tdg98-frame-v" : "tdg98-frame-h");
  }

  function tdg98KillLegacyPseudo(el) {
    const before = getComputedStyle(el, "::before");
    const after = getComputedStyle(el, "::after");

    if (before && before.backgroundImage && before.backgroundImage !== "none" &&
        !tdg98IsOwnImage(before.backgroundImage)) {
      el.classList.add("tdg98-no-before");
    }

    if (after && after.backgroundImage && after.backgroundImage !== "none" &&
        !tdg98IsOwnImage(after.backgroundImage)) {
      el.classList.add("tdg98-no-after");
    }
  }

  function tdg98FixFrameBars() {
    const clan = document.querySelector(".clan");
    if (!clan) return 0;

    let changed = 0;

    clan.querySelectorAll("*").forEach(el => {
      // Never touch working interactive/content elements.
      if (el.closest("#clanmenu li")) return;
      if (el.closest(".cards-header")) return;
      if (el.closest(".one-clan-atribute")) return;
      if (el.closest("table")) return;
      if (el.matches("button,input,select,textarea,.btn,.SI-button,.big-button,.card")) return;

      const key = `${el.id || ""} ${typeof el.className === "string" ? el.className : ""}`;
      if (/icon|outfit|avatar|logo|character|sprite|picture|item|npc|hero/i.test(key)) return;

      const r = el.getBoundingClientRect();
      if (r.width < 6 || r.height < 6) return;

      tdg98KillLegacyPseudo(el);

      const cs = getComputedStyle(el);
      const rgb = tdg98ParseRgb(cs.backgroundColor);
      const bgImage = cs.backgroundImage || "none";
      const foreignImage = bgImage !== "none" && !tdg98IsOwnImage(bgImage);
      const brown = tdg98LooksBrown(rgb);
      const structuralName = /border|frame|separator|decor|graphic|edge|bottom|footer|side|wood|bar/i.test(key);

      // Thin bars only. This cannot hit the big green/blue content panels.
      const horizontal = r.width >= 220 && r.height >= 7 && r.height <= 62;
      const vertical = r.height >= 260 && r.width >= 7 && r.width <= 52;

      // Brown is enough. Foreign image additionally needs structural-looking name.
      if (horizontal && (brown || (foreignImage && structuralName))) {
        tdg98SetFrame(el, false);
        changed++;
      } else if (vertical && (brown || (foreignImage && structuralName))) {
        tdg98SetFrame(el, true);
        changed++;
      }
    });

    // Exact generated header strips.
    [
      "#clanbox .clan-recruit-header-option",
      "#clanbox .clan-recruit-header-atribute",
      "#clanbox .clan-recruit-header-0",
      "#clanbox .clan-recruit-header-1",
      "#clanbox .clan-recruit-header-2",
      "#clanbox .clan-list-find-header",
      "#clanbox .clan-find-header-0",
      "#clanbox .clan-find-header-1",
      "#clanbox .clan-find-header-2"
    ].forEach(sel => {
      document.querySelectorAll(sel).forEach(el => tdg98SetFrame(el, false));
    });

    document.documentElement.dataset.tdgClanFrameFix = "9.8";
    return changed;
  }

  const tdg98BaseSweep = sweep;
  sweep = function() {
    tdg98BaseSweep();
    const changed = tdg98FixFrameBars();
    if (changed) {
      console.log("%cTDG clan frame bars v9.8:", "color:#76ecf5", changed);
    }
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
