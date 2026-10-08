
(() => {
  if (!TDG) {
    console.error("[TDG clan v9.9] missing TDG context");
    return;
  }

  console.log("%cTDG clan module v9.9 LOADED", "color:#76ecf5;font-weight:bold");

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
    const cls = kind === "btn" ? "tdg99-btn" : kind === "h" ? "tdg99-h" : kind === "v" ? "tdg99-v" : "tdg99-surface";
    el.classList.add(cls);
  }

  function forceKnown() {
    const clan = document.querySelector(".clan");
    const menu = document.querySelector("#clanmenu");
    const box = document.querySelector("#clanbox");
    if (!clan && !menu && !box) return false;

    if (!logged) {
      logged = true;
      console.log("%cTDG clan DOM FOUND v9.9", "color:#81dbd5;font-weight:bold", {
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
    const own = /surface-v99|strip-h-v99|strip-v-v99|menu-v99|menu-active-v99/.test(img);
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
    document.documentElement.dataset.tdgClan = "9.9";
  }

  // ---------------------------------------------------------------
  // v9.9 — exact geometry covers for remaining legacy wood.
  // No broad DOM scanner: we only cover gaps/rails around #clanmenu
  // and #clanbox plus the recruitment separator.
  // ---------------------------------------------------------------
  const TDG99_RAIL_H = TDG.asset("clan/rail-h-v99.png");
  const TDG99_RAIL_V = TDG.asset("clan/rail-v-v99.png");

  function ensureClanPositioning(clan) {
    const pos = getComputedStyle(clan).position;
    if (pos === "static") clan.style.position = "relative";
  }

  function getRail(clan, name, vertical) {
    let el = clan.querySelector(`:scope > .tdg99-rail[data-rail="${name}"]`);
    if (!el) {
      el = document.createElement("div");
      el.className = `tdg99-rail ${vertical ? "tdg99-rail-v" : "tdg99-rail-h"}`;
      el.dataset.rail = name;
      clan.appendChild(el);
    }
    return el;
  }

  function setRect(el, left, top, width, height, vertical) {
    if (width <= 0 || height <= 0) {
      el.style.display = "none";
      return;
    }
    el.style.display = "block";
    el.style.left = `${Math.round(left)}px`;
    el.style.top = `${Math.round(top)}px`;
    el.style.width = `${Math.round(width)}px`;
    el.style.height = `${Math.round(height)}px`;
    el.style.backgroundImage = `url("${vertical ? TDG99_RAIL_V : TDG99_RAIL_H}")`;
  }

  function forceRecruitHeaders() {
    [
      "#clanbox .clan-recruit-header-atribute",
      "#clanbox .clan-recruit-header-option",
      "#clanbox .clan-recruit-header-0",
      "#clanbox .clan-recruit-header-1",
      "#clanbox .clan-recruit-header-2"
    ].forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        el.style.setProperty("background-color", "#082139", "important");
        el.style.setProperty("background-image", `url("${TDG99_RAIL_H}")`, "important");
        el.style.setProperty("background-repeat", "no-repeat", "important");
        el.style.setProperty("background-position", "center", "important");
        el.style.setProperty("background-size", "100% 100%", "important");
        el.style.setProperty("border-color", "#2aa4c1", "important");
        el.style.setProperty("box-shadow", "none", "important");
        el.style.setProperty("position", "relative", "important");
        el.style.setProperty("z-index", "4", "important");
      });
    });
  }

  function updateRails() {
    const clan = document.querySelector(".clan");
    const menu = document.querySelector("#clanmenu");
    const box = document.querySelector("#clanbox");

    if (!clan || !menu || !box) return;

    ensureClanPositioning(clan);

    const c = clan.getBoundingClientRect();
    const m = menu.getBoundingClientRect();
    const b = box.getBoundingClientRect();

    // Viewport -> .clan local coordinates.
    const ml = m.left - c.left;
    const mr = m.right - c.left;
    const mt = m.top - c.top;
    const mb = m.bottom - c.top;

    const bl = b.left - c.left;
    const br = b.right - c.left;
    const bt = b.top - c.top;
    const bb = b.bottom - c.top;

    const contentTop = Math.min(mt, bt);
    const contentBottom = Math.max(mb, bb);

    // 1. Left wooden rail: only the strip directly before #clanmenu.
    const leftGap = Math.max(0, ml);
    const leftW = Math.min(18, Math.max(0, leftGap));
    setRect(
      getRail(clan, "left", true),
      Math.max(0, ml - leftW),
      contentTop,
      leftW,
      Math.max(0, contentBottom - contentTop),
      true
    );

    // 2. Center wooden separator between left menu and right content.
    const middleGap = Math.max(0, bl - mr);
    if (middleGap >= 4 && middleGap <= 80) {
      setRect(
        getRail(clan, "middle", true),
        mr,
        contentTop,
        middleGap,
        Math.max(0, contentBottom - contentTop),
        true
      );
    } else {
      // If the DOM boxes overlap but the old separator is drawn on their edges,
      // mask a narrow rail centered on their meeting point.
      const meet = (mr + bl) / 2;
      setRect(
        getRail(clan, "middle", true),
        meet - 7,
        contentTop,
        14,
        Math.max(0, contentBottom - contentTop),
        true
      );
    }

    // 3. Right wooden rail directly after #clanbox.
    const rightGap = Math.max(0, c.width - br);
    const rightW = Math.min(18, Math.max(0, rightGap));
    setRect(
      getRail(clan, "right", true),
      br,
      contentTop,
      rightW,
      Math.max(0, contentBottom - contentTop),
      true
    );

    // 4. Thin wood immediately below the galaxy title/header bar.
    setRect(
      getRail(clan, "top-content", false),
      Math.max(0, ml - leftW),
      Math.max(0, contentTop - 8),
      Math.min(c.width, br + rightW) - Math.max(0, ml - leftW),
      8,
      false
    );

    // 5. Bottom wooden strip across the whole content width.
    const bottomGap = Math.max(0, c.height - contentBottom);
    const bottomH = Math.min(24, Math.max(10, bottomGap));
    setRect(
      getRail(clan, "bottom", false),
      Math.max(0, ml - leftW),
      contentBottom,
      Math.min(c.width, br + rightW) - Math.max(0, ml - leftW),
      bottomH,
      false
    );

    // 6. The large horizontal wood separator under recruitment attributes.
    // Anchor it to the last generated attribute row, not to a guessed fixed Y.
    const attrs = [...document.querySelectorAll("#clanbox .one-clan-atribute")]
      .filter(el => {
        const r = el.getBoundingClientRect();
        return r.width > 40 && r.height > 5;
      });

    const sep = getRail(clan, "recruit-separator", false);

    if (attrs.length) {
      const last = attrs[attrs.length - 1].getBoundingClientRect();
      const localY = last.bottom - c.top + 8;
      const available = Math.max(0, bb - localY);

      // The legacy separator on this view is roughly 28–40px tall.
      const h = Math.min(38, available);
      setRect(sep, bl, localY, Math.max(0, b.width), h, false);
    } else {
      sep.style.display = "none";
    }

    forceRecruitHeaders();

    document.documentElement.dataset.tdgClanRails = "9.9";
  }

  const v99BaseSweep = sweep;
  sweep = function() {
    v99BaseSweep();
    updateRails();
  };

  const observer = new MutationObserver(() => {
    clearTimeout(observer._tdg99);
    observer._tdg99 = setTimeout(sweep, 35);
  });

  observer.observe(document.documentElement, {
    childList:true,
    subtree:true
  });

  document.addEventListener("click", () => {
    setTimeout(sweep, 30);
    setTimeout(sweep, 180);
  }, true);

  window.addEventListener("resize", () => setTimeout(updateRails, 30));

  setInterval(() => {
    if (document.querySelector(".clan")) updateRails();
  }, 700);

  sweep();
  console.log("%cTDG clan rails v9.9 ACTIVE", "color:#76ecf5;font-weight:bold");
})();
