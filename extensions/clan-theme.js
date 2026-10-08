
(() => {
  const TDG = window.__TDG;
  if (!TDG) return;

  const SURFACE = TDG.asset("clan/surface-v90.png");
  const STRIP_H = TDG.asset("clan/strip-h-v90.png");
  const STRIP_V = TDG.asset("clan/strip-v-v90.png");
  const MENU = TDG.asset("clan/menu-v90.png");

  const skip = /icon|outfit|avatar|logo|character|sprite|picture|item-id|inventory|cl_logo|skill-icon|quest-bring-item|npc|hero/i;

  function rgb(value) {
    const m = String(value || "").match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
  }

  function oldColor(v) {
    if (!v) return false;
    const [r,g,b] = v;
    const green = g > r * 1.15 && g > b * 1.03 && g > 28 && r < 115;
    const brown = r > b * 1.22 && g > b * 1.16 && r > 35 && g > 20 && b < 100;
    const gray = Math.max(r,g,b) - Math.min(r,g,b) < 30 && r > 15 && r < 165;
    const beige = r > 145 && g > 110 && b < 150;
    return green || brown || gray || beige;
  }

  function applyInline(el, type) {
    if (el.dataset.tdg90 === type) return;
    el.dataset.tdg90 = type;

    if (type === "btn") {
      el.style.setProperty("background-color", "#07172b", "important");
      el.style.setProperty("background-image", `url("${MENU}")`, "important");
      el.style.setProperty("background-position", "center", "important");
      el.style.setProperty("background-size", "100% 100%", "important");
      el.style.setProperty("background-repeat", "no-repeat", "important");
      el.style.setProperty("border-color", "#279fbd", "important");
      el.classList.add("tdg90-btn");
    } else if (type === "h") {
      el.style.setProperty("background-color", "#082139", "important");
      el.style.setProperty("background-image", `url("${STRIP_H}")`, "important");
      el.style.setProperty("background-position", "center", "important");
      el.style.setProperty("background-size", "100% 100%", "important");
      el.style.setProperty("background-repeat", "no-repeat", "important");
      el.classList.add("tdg90-h");
    } else if (type === "v") {
      el.style.setProperty("background-color", "#082139", "important");
      el.style.setProperty("background-image", `url("${STRIP_V}")`, "important");
      el.style.setProperty("background-position", "center", "important");
      el.style.setProperty("background-size", "100% 100%", "important");
      el.style.setProperty("background-repeat", "no-repeat", "important");
      el.classList.add("tdg90-v");
    } else {
      el.style.setProperty("background-color", "#07172b", "important");
      el.style.setProperty("background-image", `url("${SURFACE}")`, "important");
      el.style.setProperty("background-position", "center", "important");
      el.style.setProperty("background-size", "cover", "important");
      el.style.setProperty("background-repeat", "no-repeat", "important");
      el.style.setProperty("border-color", "#238eaa", "important");
      el.classList.add("tdg90-surface");
    }
  }

  function inspectElement(el) {
    const key = `${el.id || ""} ${typeof el.className === "string" ? el.className : ""}`;
    if (skip.test(key)) return;

    const rect = el.getBoundingClientRect();
    if (rect.width < 8 || rect.height < 8 || rect.width * rect.height < 500) return;

    const cs = getComputedStyle(el);
    const bgColor = rgb(cs.backgroundColor);
    const bgImage = cs.backgroundImage || "none";

    const isOurImage = /surface-v90|strip-h-v90|strip-v-v90|menu-v90|menu-active-v90/.test(bgImage);
    const hasOldImage = bgImage !== "none" && !isOurImage;
    const looksOld = oldColor(bgColor) || hasOldImage;

    const exactMenu = /clanmenu|item-menu|boxhover|card|button|btn/i.test(key);
    const exactClan = /clan|recruit|atribute|treasury|history|diplom|quest|skill|bless/i.test(key);

    if (!exactClan && !looksOld) return;

    if (exactMenu && rect.height <= 90 && rect.width >= 55) {
      applyInline(el, "btn");
    } else if (rect.width > 145 && rect.height <= 90) {
      applyInline(el, "h");
    } else if (rect.height > 145 && rect.width <= 135) {
      applyInline(el, "v");
    } else if (rect.width > 75 && rect.height > 45) {
      applyInline(el, "surface");
    }
  }

  function forceKnown() {
    const selectors = [
      ".clan",
      "#clanmenu",
      "#clanmenu > .boxhover",
      "#clanbox",
      "#clanbox .clan-recruit-content",
      "#clanbox .recruit-section",
      "#clanbox .scroll-wrapper",
      "#clanbox .scroll-pane",
      "#clanbox .background-wrapper",
      "#clanbox .section-recruit-main",
      "#clanbox .clan-part-0",
      "#clanbox .clan-part-1",
      "#clanbox .clan-part-2",
      "#clanbox .clan-members-content",
      "#clanbox .clan-list-content"
    ];
    selectors.forEach(sel => document.querySelectorAll(sel).forEach(el => applyInline(el, "surface")));

    [
      "#clanbox .clan-recruit-header-option",
      "#clanbox .clan-recruit-header-atribute",
      "#clanbox .clan-recruit-header-0",
      "#clanbox .clan-recruit-header-1",
      "#clanbox .clan-recruit-header-2"
    ].forEach(sel => document.querySelectorAll(sel).forEach(el => applyInline(el, "h")));

    document.querySelectorAll("#clanmenu > .boxhover > li, #clanmenu li, #clanmenu [id$='-item-menu'], #clanmenu [name$='-item-menu']")
      .forEach(el => applyInline(el, "btn"));
  }

  function sweep() {
    const clan = document.querySelector(".clan");
    if (!clan) return;

    forceKnown();
    clan.querySelectorAll("*").forEach(inspectElement);
    document.documentElement.dataset.tdgClanMain = "9.0";
  }

  // Works even when clan panel is created after game load.
  const observer = new MutationObserver(() => {
    clearTimeout(observer._timer);
    observer._timer = setTimeout(sweep, 40);
  });
  observer.observe(document.documentElement, {childList:true, subtree:true});

  document.addEventListener("click", () => {
    setTimeout(sweep, 30);
    setTimeout(sweep, 180);
  }, true);

  setInterval(() => {
    if (document.querySelector(".clan") && getComputedStyle(document.querySelector(".clan")).display !== "none") {
      sweep();
    }
  }, 1000);

  sweep();
  console.log("%cTDG main clan extension v9.0 ACTIVE", "color:#76ecf5;font-weight:bold");
})();
