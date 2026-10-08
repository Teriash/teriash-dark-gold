
(function () {
  const TDG = window.__TDG || {};
  if (window.__TDGWindowRethemeInstalled) return;
  window.__TDGWindowRethemeInstalled = true;

  const style = document.createElement("style");
  style.id = "tdg-window-retheme-runtime";
  style.textContent = `
html.${TDG.root} .tdg-cosmic-reset-bg {
  background-image:none!important;
}
`;
  document.head.appendChild(style);

  function rgbFromString(input) {
    if (!input || input === "transparent" || input === "rgba(0, 0, 0, 0)") return null;
    const m = input.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if (!m) return null;
    return { r:+m[1], g:+m[2], b:+m[3] };
  }

  function looksWood(c) {
    if (!c) return false;
    const brightness = c.r + c.g + c.b;
    return c.r > c.g && c.g >= c.b && (c.r - c.b) > 28 && brightness > 120 && brightness < 560;
  }

  function looksPaper(c) {
    if (!c) return false;
    const brightness = c.r + c.g + c.b;
    return c.r > 165 && c.g > 150 && c.b > 105 && brightness > 430;
  }

  function looksGray(c) {
    if (!c) return false;
    const maxv = Math.max(c.r, c.g, c.b);
    const minv = Math.min(c.r, c.g, c.b);
    const brightness = c.r + c.g + c.b;
    return (maxv - minv) < 18 && brightness > 80 && brightness < 620;
  }

  function shouldSkip(el) {
    if (!el || !el.classList) return true;
    const tag = el.tagName;
    if (["IMG","CANVAS","SVG","PATH","INPUT","TEXTAREA","SELECT","OPTION"].includes(tag)) return true;
    const cls = (el.className || "").toString();
    if (/icon|slot|item|eq-|outfit|avatar|map|canvas|mark|npc|hero|mob|close|resizer/i.test(cls)) return true;
    const rect = el.getBoundingClientRect();
    if (rect.width < 24 || rect.height < 12) return true;
    return false;
  }

  function classify(el) {
    const rect = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    const bg = rgbFromString(cs.backgroundColor);
    const hasImage = cs.backgroundImage && cs.backgroundImage !== "none";
    const text = (el.textContent || "").trim();
    const childCount = el.children ? el.children.length : 0;
    const buttonLike = rect.height >= 28 && rect.height <= 62 && rect.width >= 120 && rect.width <= 280 && text.length > 1 && text.length < 60;
    const stripLike = rect.height >= 16 && rect.height <= 38 && rect.width >= 180;
    const panelLike = rect.width >= 200 && rect.height >= 100;
    const sidebarLike = rect.width >= 160 && rect.width <= 260 && rect.height >= 110;

    // active item hints
    const active = /active|selected|current|hover|on/i.test(el.className) ||
      cs.boxShadow.includes("inset") || cs.outlineStyle !== "none";

    if (buttonLike && (looksGray(bg) || looksWood(bg) || hasImage)) {
      return active ? "tdg-cosmic-menu-item-active" : "tdg-cosmic-menu-item";
    }

    if (looksPaper(bg) && panelLike) {
      return "tdg-cosmic-paper";
    }

    if ((looksWood(bg) || hasImage) && stripLike && rect.width > 220 && rect.height < 40) {
      return "tdg-cosmic-strip";
    }

    if ((looksWood(bg) || looksGray(bg)) && sidebarLike && childCount > 2) {
      return "tdg-cosmic-sidebar-top";
    }

    if ((looksWood(bg) || looksGray(bg)) && panelLike) {
      return "tdg-cosmic-surface";
    }

    return null;
  }

  function rethemeWindow(root) {
    if (!root) return;
    const nodes = [root, ...root.querySelectorAll("*")];
    for (const el of nodes) {
      if (shouldSkip(el)) continue;
      const mode = classify(el);
      if (!mode) continue;

      el.classList.remove(
        "tdg-cosmic-menu-item",
        "tdg-cosmic-menu-item-active",
        "tdg-cosmic-surface",
        "tdg-cosmic-strip",
        "tdg-cosmic-sidebar-top",
        "tdg-cosmic-paper"
      );
      el.classList.add(mode);

      // Clear old wood/gray asset slices while preserving layout.
      el.style.backgroundImage = "";
      el.style.backgroundColor = "";
      if (mode === "tdg-cosmic-paper" || mode === "tdg-cosmic-surface") {
        el.style.color = "#d8f8ff";
      }
    }
  }

  function scan() {
    const windows = document.querySelectorAll(".border-window, .c-window.border-window, .mz-window");
    windows.forEach(rethemeWindow);
  }

  const observer = new MutationObserver(() => {
    window.requestAnimationFrame(scan);
  });

  function boot() {
    scan();
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "style"]
    });
    console.log("%cTDG cosmic windows retheme ACTIVE", "color:#76ecf5;font-weight:bold");
  }

  if (document.body) boot();
  else window.addEventListener("DOMContentLoaded", boot, { once:true });
})();
