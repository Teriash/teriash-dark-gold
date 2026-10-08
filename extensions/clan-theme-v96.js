
(() => {
  if (!TDG) {
    console.error("[TDG clan v9.6] missing TDG context");
    return;
  }

  console.log("%cTDG clan module v9.6 LOADED", "color:#76ecf5;font-weight:bold");

  const HBAR = TDG.asset("clan/wood-replace-h-v96.png");
  const VBAR = TDG.asset("clan/wood-replace-v-v96.png");
  const SURFACE = TDG.asset("clan/surface-v96.png");
  const MENU = TDG.asset("clan/menu-v96.png");

  const skip = /icon|outfit|avatar|logo|character|sprite|picture|item-id|inventory|cl_logo|skill-icon|quest-bring-item|npc|hero/i;
  let domLogged = false;
  let lastCount = -1;

  function parseRGB(value) {
    const m = String(value || "").match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
  }

  function looksBrown(rgb) {
    if (!rgb) return false;
    const [r,g,b] = rgb;
    return r >= 42 && g >= 22 && b <= 105 && r > b * 1.18 && g > b * 1.08;
  }

  function isGalaxyImage(s) {
    return /surface-v96|wood-replace-h-v96|wood-replace-v-v96|menu-v96|menu-active-v96|cdn\.jsdelivr\.net\/gh\/Teriash\/teriash-dark-gold/i.test(String(s || ""));
  }

  function setBar(el, vertical) {
    const image = vertical ? VBAR : HBAR;
    el.style.setProperty("background-color", "#082139", "important");
    el.style.setProperty("background-image", `url("${image}")`, "important");
    el.style.setProperty("background-repeat", "no-repeat", "important");
    el.style.setProperty("background-position", "center", "important");
    el.style.setProperty("background-size", "100% 100%", "important");
    el.style.setProperty("border-color", "#2aa4c1", "important");
    el.style.setProperty("box-shadow", "none", "important");
    el.classList.add(vertical ? "tdg96-wood-v" : "tdg96-wood-h");
  }

  function setSurface(el) {
    el.style.setProperty("background-color", "#07172b", "important");
    el.style.setProperty("background-image", `url("${SURFACE}")`, "important");
    el.style.setProperty("background-repeat", "no-repeat", "important");
    el.style.setProperty("background-position", "center", "important");
    el.style.setProperty("background-size", "cover", "important");
    el.style.setProperty("border-color", "#238eaa", "important");
  }

  function killPseudo(el) {
    const before = getComputedStyle(el, "::before");
    const after = getComputedStyle(el, "::after");
    if (before && before.backgroundImage && before.backgroundImage !== "none" && !isGalaxyImage(before.backgroundImage)) {
      el.classList.add("tdg96-kill-before");
    }
    if (after && after.backgroundImage && after.backgroundImage !== "none" && !isGalaxyImage(after.backgroundImage)) {
      el.classList.add("tdg96-kill-after");
    }
  }

  function classifyAndReplace(el) {
    const key = `${el.id || ""} ${typeof el.className === "string" ? el.className : ""}`;
    if (skip.test(key)) return 0;

    const rect = el.getBoundingClientRect();
    if (rect.width < 5 || rect.height < 5) return 0;

    // Do not touch actual content sprites / characters / tiny UI icons.
    if (el.tagName === "IMG") {
      if (rect.width < 120 && rect.height < 120) return 0;
      const src = el.currentSrc || el.src || "";
      if (skip.test(src)) return 0;

      // Structural image strips are hidden and parent gets replacement.
      if (rect.width > 140 && rect.height <= 100) {
        el.style.setProperty("opacity", "0", "important");
        if (el.parentElement) setBar(el.parentElement, false);
        return 1;
      }
      if (rect.height > 140 && rect.width <= 120) {
        el.style.setProperty("opacity", "0", "important");
        if (el.parentElement) setBar(el.parentElement, true);
        return 1;
      }
      return 0;
    }

    const cs = getComputedStyle(el);
    const bg = parseRGB(cs.backgroundColor);
    const img = cs.backgroundImage || "none";
    const hasForeignImage = img !== "none" && !isGalaxyImage(img);
    const brown = looksBrown(bg);

    killPseudo(el);

    const exactWoodHint = /border|frame|wood|separator|decor|graphic|background|header|footer|bottom|side|edge|bar/i.test(key);
    const horizontal = rect.width >= 140 && rect.height <= 100;
    const vertical = rect.height >= 140 && rect.width <= 140;

    // Strong case: brown or foreign sprite on a structural strip.
    if ((brown || hasForeignImage) && horizontal) {
      setBar(el, false);
      return 1;
    }
    if ((brown || hasForeignImage) && vertical) {
      setBar(el, true);
      return 1;
    }

    // Known structural names can be replaced even if computed bg color is transparent.
    if (exactWoodHint && horizontal && rect.width * rect.height > 1200) {
      setBar(el, false);
      return 1;
    }
    if (exactWoodHint && vertical && rect.width * rect.height > 1200) {
      setBar(el, true);
      return 1;
    }

    // Larger brown panels should become a galaxy surface instead of a strip.
    if (brown && rect.width > 120 && rect.height > 100) {
      setSurface(el);
      return 1;
    }

    return 0;
  }

  function forceExactKnownBars() {
    let n = 0;

    [
      "#clanbox .clan-recruit-header-option",
      "#clanbox .clan-recruit-header-atribute",
      "#clanbox .clan-recruit-header-0",
      "#clanbox .clan-recruit-header-1",
      "#clanbox .clan-recruit-header-2",
      "#clanbox .clan-list-find-header"
    ].forEach(sel => document.querySelectorAll(sel).forEach(el => { setBar(el, false); n++; }));

    // Direct children around clan menu/content are where the legacy wood frame usually sits.
    document.querySelectorAll(".clan > *, #clanmenu > *, #clanbox > *").forEach(el => {
      const r = el.getBoundingClientRect();
      const key = `${el.id || ""} ${typeof el.className === "string" ? el.className : ""}`;
      if (skip.test(key)) return;

      const cs = getComputedStyle(el);
      const bg = parseRGB(cs.backgroundColor);
      const img = cs.backgroundImage || "none";
      const foreign = img !== "none" && !isGalaxyImage(img);

      if (r.width > 180 && r.height <= 90 && (looksBrown(bg) || foreign || /border|frame|bottom|header|bar/i.test(key))) {
        setBar(el, false); n++;
      } else if (r.height > 180 && r.width <= 120 && (looksBrown(bg) || foreign || /border|frame|side|edge/i.test(key))) {
        setBar(el, true); n++;
      }
      killPseudo(el);
    });

    return n;
  }

  function sweep() {
    const clan = document.querySelector(".clan");
    const box = document.querySelector("#clanbox");
    const menu = document.querySelector("#clanmenu");

    if (!clan && !box && !menu) return;

    if (!domLogged) {
      domLogged = true;
      console.log("%cTDG clan DOM FOUND v9.6", "color:#81dbd5;font-weight:bold", {
        clan: !!clan,
        clanmenu: !!menu,
        clanbox: !!box
      });
    }

    let count = forceExactKnownBars();

    const root = clan || box || menu;
    root.querySelectorAll("*").forEach(el => {
      count += classifyAndReplace(el);
    });

    document.documentElement.dataset.tdgClanWoodFix = "9.6";

    if (count !== lastCount) {
      lastCount = count;
      console.log("%cTDG clan wood replacements v9.6:", "color:#76ecf5", count);
    }
  }

  const observer = new MutationObserver(() => {
    clearTimeout(observer._tdg96);
    observer._tdg96 = setTimeout(sweep, 40);
  });
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class", "style"]
  });

  document.addEventListener("click", () => {
    setTimeout(sweep, 30);
    setTimeout(sweep, 180);
  }, true);

  setInterval(sweep, 800);
  sweep();
})();
