
(() => {
  if (!TDG) {
    console.error("[TDG global wood v10.0] missing TDG context");
    return;
  }

  console.log("%cTDG global wood replacer v10.0 LOADED", "color:#76ecf5;font-weight:bold");

  const BAR_H = TDG.asset("global/wood-h-v100.png");
  const BAR_V = TDG.asset("global/wood-v-v100.png");
  const PANEL = TDG.asset("global/wood-panel-v100.png");

  const IGNORE = /icon|outfit|avatar|logo|character|sprite|picture|item|slot|npc|hero|monster|map|mark|tooltip|tip|chat-message|message-text|skill|emot|counter|digits|value/i;
  const STRUCTURAL = /border|frame|separator|decor|graphic|edge|header|footer|bar|background|wrapper|window|panel|content|section|inner/i;

  function rgb(value) {
    const m = String(value || "").match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
  }

  function looksBrown(v) {
    if (!v) return false;
    const [r,g,b] = v;
    const brown = r >= 34 && g >= 16 && b <= 120 && r > b * 1.10 && g > b * 1.02;
    const grayBeige = Math.max(r,g,b) - Math.min(r,g,b) < 36 && r > 70 && g > 60 && b < 145;
    return brown || grayBeige;
  }

  function ownImage(s) {
    return /teriash-dark-gold|wood-h-v100|wood-v-v100|wood-panel-v100|chat-panel|right-panel|window-fill|surface-v|menu-v|slot\.png|mark\.png|tip-bg\.png|hud-|bottom-full|top-full/i.test(String(s || ""));
  }

  function isRelevantArea(el) {
    return !!el.closest(
      ".clan, .c-window, .border-window, .window, .new-chat-window, .left-column, .right-column, .main-column, .interface-window, .dialog-window, .content, body"
    );
  }

  function setBar(el, vertical) {
    const img = vertical ? BAR_V : BAR_H;
    el.style.setProperty("background-color", "#082139", "important");
    el.style.setProperty("background-image", `url("${img}")`, "important");
    el.style.setProperty("background-repeat", "no-repeat", "important");
    el.style.setProperty("background-position", "center", "important");
    el.style.setProperty("background-size", "100% 100%", "important");
    el.style.setProperty("border-color", "#2aa4c1", "important");
    el.style.setProperty("box-shadow", "none", "important");
    el.classList.add(vertical ? "tdg100-wood-v" : "tdg100-wood-h");
  }

  function setPanel(el) {
    el.style.setProperty("background-color", "#07172b", "important");
    el.style.setProperty("background-image", `url("${PANEL}")`, "important");
    el.style.setProperty("background-repeat", "no-repeat", "important");
    el.style.setProperty("background-position", "center", "important");
    el.style.setProperty("background-size", "cover", "important");
    el.style.setProperty("border-color", "#238eaa", "important");
    el.style.setProperty("box-shadow", "none", "important");
    el.classList.add("tdg100-wood-panel");
  }

  function neutralizePseudo(el) {
    const before = getComputedStyle(el, "::before");
    const after = getComputedStyle(el, "::after");

    const beforeRgb = rgb(before.backgroundColor);
    const afterRgb = rgb(after.backgroundColor);

    if ((before.backgroundImage && before.backgroundImage !== "none" && !ownImage(before.backgroundImage)) || looksBrown(beforeRgb)) {
      el.classList.add("tdg100-no-before");
    }
    if ((after.backgroundImage && after.backgroundImage !== "none" && !ownImage(after.backgroundImage)) || looksBrown(afterRgb)) {
      el.classList.add("tdg100-no-after");
    }
  }

  function shouldSkip(el, key, rect) {
    if (!isRelevantArea(el)) return true;
    if (IGNORE.test(key)) return true;
    if (el.matches("img, canvas, svg, video")) return true;
    if (rect.width < 5 || rect.height < 5) return true;
    if (rect.width * rect.height < 60) return true;
    if (el.closest(".eq-slot, .interface-element-one-item-slot-background-to-repeat, .item")) return true;
    if (el.matches("button, input, select, textarea")) return true;
    return false;
  }

  function classify(el) {
    const rect = el.getBoundingClientRect();
    const key = `${el.id || ""} ${typeof el.className === "string" ? el.className : ""}`;
    if (shouldSkip(el, key, rect)) return 0;

    const cs = getComputedStyle(el);
    const bg = rgb(cs.backgroundColor);
    const image = cs.backgroundImage || "none";
    const foreignImage = image !== "none" && !ownImage(image);
    const brown = looksBrown(bg);

    // remove legacy pseudo decorations if present
    neutralizePseudo(el);

    const horizontal = rect.width >= 120 && rect.height >= 6 && rect.height <= 84;
    const vertical = rect.height >= 120 && rect.width >= 6 && rect.width <= 84;
    const panel = rect.width >= 140 && rect.height >= 100;

    const structuralHint = STRUCTURAL.test(key);

    // Primary target: all visible wooden bars / separators.
    if (horizontal && (brown || (foreignImage && structuralHint))) {
      setBar(el, false);
      return 1;
    }
    if (vertical && (brown || (foreignImage && structuralHint))) {
      setBar(el, true);
      return 1;
    }

    // Secondary target: larger wood/paper panels.
    if (panel && brown && structuralHint && !el.closest(".chat-message-wrapper")) {
      setPanel(el);
      return 1;
    }

    return 0;
  }

  let lastChanged = -1;

  function sweep() {
    let changed = 0;

    // Known problem areas first.
    [
      ".clan *",
      ".c-window *",
      ".border-window *",
      ".window *",
      ".left-column.main-column *",
      ".right-column.main-column *"
    ].forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        changed += classify(el);
      });
    });

    // Some legacy bars are direct containers with no useful subtree selector.
    document.querySelectorAll(
      ".clan, .c-window, .border-window, .window, .left-column.main-column, .right-column.main-column"
    ).forEach(el => {
      changed += classify(el);
    });

    document.documentElement.dataset.tdgGlobalWood = "10.0";

    if (changed !== lastChanged) {
      lastChanged = changed;
      console.log("%cTDG global wood replacements v10.0:", "color:#81dbd5", changed);
    }
  }

  const observer = new MutationObserver(() => {
    clearTimeout(observer._tdg100);
    observer._tdg100 = setTimeout(sweep, 45);
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class", "style"]
  });

  document.addEventListener("click", () => {
    setTimeout(sweep, 35);
    setTimeout(sweep, 180);
  }, true);

  window.addEventListener("resize", () => setTimeout(sweep, 40));

  setInterval(sweep, 900);
  sweep();
})();
