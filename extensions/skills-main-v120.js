
(() => {
  if (!TDG) return;

  console.log("%cTDG skills/main bottom fix v12.0 LOADED", "color:#76ecf5;font-weight:bold");

  const norm = value => String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();

  const visible = el =>
    el instanceof HTMLElement &&
    el.isConnected &&
    el.getClientRects().length > 0 &&
    getComputedStyle(el).visibility !== "hidden";

  function textLeaves(root, phrase) {
    const wanted = norm(phrase);
    const result = [];
    root.querySelectorAll("*").forEach(el => {
      if (!visible(el)) return;
      const text = norm(el.textContent);
      if (!text || !text.includes(wanted)) return;

      // Prefer the smallest element carrying the text.
      const childAlsoMatches = [...el.children].some(ch =>
        visible(ch) && norm(ch.textContent).includes(wanted)
      );
      if (!childAlsoMatches) result.push(el);
    });
    return result;
  }

  function containsMainSkillsMarkers(root) {
    const text = norm(root.textContent);
    const markers = [
      "LISTA UMIEJETNOSCI",
      "PUNKTY UMIEJETNOSCI",
      "MISTRZOSTWO WALKI",
      "RESET PUNKTOW"
    ];
    return markers.filter(m => text.includes(m)).length >= 2;
  }

  function findMainSkillsWindow() {
    // Legacy root, if current NI still exposes it.
    const legacy = document.querySelector("#skills");
    if (visible(legacy) && containsMainSkillsMarkers(legacy)) return legacy;

    // The key correction vs v11.9:
    // do NOT choose a window merely because its title is "Umiejętności".
    // There is also a small battle-help window with that same title.
    const candidates = [...document.querySelectorAll(
      ".c-window.border-window, .c-window, .border-window"
    )].filter(visible);

    for (const win of candidates) {
      const rect = win.getBoundingClientRect();
      if (rect.width < 450 || rect.height < 300) continue;
      if (containsMainSkillsMarkers(win)) return win;
    }

    // Find "Lista umiejętności" first, then climb to a large ancestor
    // that also contains a second skills marker.
    for (const label of [...document.querySelectorAll("body *")]) {
      if (!visible(label)) continue;
      if (!norm(label.textContent).includes("LISTA UMIEJETNOSCI")) continue;

      let p = label;
      for (let i = 0; p && i < 12; i++, p = p.parentElement) {
        if (!(p instanceof HTMLElement)) continue;
        const r = p.getBoundingClientRect();
        if (r.width < 450 || r.height < 300) continue;
        if (containsMainSkillsMarkers(p)) return p;
      }
    }

    return null;
  }

  function closestHorizontalContainer(label, root, minRatio = .30, maxHeight = 90) {
    if (!label) return null;
    const rr = root.getBoundingClientRect();

    let p = label;
    let best = null;
    for (let i = 0; p && p !== root && i < 10; i++, p = p.parentElement) {
      if (!(p instanceof HTMLElement)) continue;
      const r = p.getBoundingClientRect();
      if (r.height < 12 || r.height > maxHeight) continue;
      if (r.width < rr.width * minRatio || r.width > rr.width * 1.03) continue;
      best = p;
      if (r.width > rr.width * .55) break;
    }
    return best;
  }

  function commonFooter(root) {
    const rr = root.getBoundingClientRect();
    const markers = [
      ...textLeaves(root, "MISTRZOSTWO WALKI"),
      ...textLeaves(root, "RESET PUNKTOW")
    ];

    for (const marker of markers) {
      let p = marker;
      for (let i = 0; p && p !== root && i < 10; i++, p = p.parentElement) {
        if (!(p instanceof HTMLElement)) continue;
        const r = p.getBoundingClientRect();
        if (
          r.height >= 28 &&
          r.height <= 95 &&
          r.width >= rr.width * .65 &&
          r.bottom >= rr.top + rr.height * .72
        ) {
          return p;
        }
      }
    }

    // Geometry fallback: brown/legacy horizontal strip close to bottom.
    const nodes = [...root.querySelectorAll("*")].filter(visible);
    for (const el of nodes) {
      if (el.matches("img,canvas,svg,input,button,select,textarea")) continue;
      const r = el.getBoundingClientRect();
      if (r.width < rr.width * .68 || r.height < 22 || r.height > 90) continue;
      if (r.bottom < rr.top + rr.height * .78) continue;
      if (r.left < rr.left - 4 || r.right > rr.right + 4) continue;

      const cs = getComputedStyle(el);
      const m = String(cs.backgroundColor).match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (m) {
        const R = +m[1], G = +m[2], B = +m[3];
        if (R > G + 8 && G >= B - 4 && B < 120) return el;
      }
    }
    return null;
  }

  function brownish(value) {
    const m = String(value || "").match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if (!m) return false;
    const r = +m[1], g = +m[2], b = +m[3];
    return r >= 40 && g >= 18 && b <= 125 && r > g + 8 && g >= b - 6;
  }

  function tagMainSkills(root) {
    if (!root) return;
    root.classList.add("tg120-skills-window");

    const titleLabels = textLeaves(root, "LISTA UMIEJETNOSCI");
    for (const label of titleLabels) {
      const bar = closestHorizontalContainer(label, root, .28, 90);
      if (bar) {
        bar.classList.add("tg120-skills-list-title");
        break;
      }
    }

    const footer = commonFooter(root);
    if (footer) footer.classList.add("tg120-skills-footer");

    // Replace only thin brown strips in this positively identified window.
    const rr = root.getBoundingClientRect();
    root.querySelectorAll("*").forEach(el => {
      if (!(el instanceof HTMLElement) || !visible(el)) return;
      if (el.closest(".skillbox,.skillbox_shadow,[class*='skill-icon']")) return;
      if (el.matches("img,canvas,svg,input,button,select,textarea")) return;
      if (el.classList.contains("tg120-skills-list-title") ||
          el.classList.contains("tg120-skills-footer")) return;

      const r = el.getBoundingClientRect();
      if (r.width < rr.width * .32 || r.height < 5 || r.height > 58) return;
      if (!brownish(getComputedStyle(el).backgroundColor)) return;

      el.classList.add("tg120-skills-separator");
    });

    console.log("%cTDG main skills window v12.0 FOUND", "color:#81dbd5;font-weight:bold", {
      width: Math.round(root.getBoundingClientRect().width),
      height: Math.round(root.getBoundingClientRect().height),
      titleBar: !!root.querySelector(".tg120-skills-list-title"),
      footer: !!root.querySelector(".tg120-skills-footer")
    });
  }

  let lastRoot = null;

  function apply() {
    const root = findMainSkillsWindow();
    if (root) {
      tagMainSkills(root);
      lastRoot = root;
    }

    // Global bottom bar exact DOM fix: tag for diagnostics.
    document.querySelectorAll(
      ".c-window__bottom-bar, .interface-element-bottom-bar-background-stretch"
    ).forEach(el => {
      if (el instanceof HTMLElement) el.dataset.tdgBottomBar = "12.0";
    });

    document.documentElement.dataset.tdgSkillsFix = "12.0";
  }

  const mo = new MutationObserver(() => {
    clearTimeout(mo._tg120);
    mo._tg120 = setTimeout(apply, 45);
  });

  mo.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  document.addEventListener("click", () => {
    setTimeout(apply, 30);
    setTimeout(apply, 180);
    setTimeout(apply, 500);
  }, true);

  setInterval(apply, 900);
  apply();
})();
