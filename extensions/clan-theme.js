
(() => {
  if (!TDG) return;

  const SURFACE = TDG.asset("clan/surface-v92.png");
  const STRIP_H = TDG.asset("clan/strip-h-v92.png");
  const STRIP_V = TDG.asset("clan/strip-v-v92.png");
  const MENU = TDG.asset("clan/menu-v92.png");

  const skip = /icon|outfit|avatar|logo|character|sprite|picture|item-id|inventory|cl_logo|skill-icon|quest-bring-item|npc|hero/i;
  let domLogged = false;

  function rgb(value) {
    const m = String(value || "").match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
  }

  function legacyColor(v) {
    if (!v) return false;
    const [r,g,b] = v;
    const green = g > r * 1.15 && g > b * 1.03 && g > 28 && r < 120;
    const brown = r > b * 1.20 && g > b * 1.13 && r > 35 && g > 20 && b < 110;
    const gray = Math.max(r,g,b) - Math.min(r,g,b) < 32 && r > 15 && r < 175;
    const beige = r > 145 && g > 110 && b < 155;
    return green || brown || gray || beige;
  }

  function apply(el, type) {
    if (type === "btn") {
      el.classList.add("tdg-clan-btn");
    } else if (type === "h") {
      el.classList.add("tdg-clan-h");
    } else if (type === "v") {
      el.classList.add("tdg-clan-v");
    } else {
      el.classList.add("tdg-clan-surface");
    }
  }

  function forceKnown() {
    const clan = document.querySelector(".clan");
    const box = document.querySelector("#clanbox");
    const menu = document.querySelector("#clanmenu");

    if (!clan && !box && !menu) return false;

    if (!domLogged) {
      domLogged = true;
      console.log("%cTDG clan module DOM FOUND", "color:#81dbd5;font-weight:bold", {
        clan: !!clan,
        clanmenu: !!menu,
        clanbox: !!box
      });
    }

    [
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
    ].forEach(sel => document.querySelectorAll(sel).forEach(el => apply(el, "surface")));

    document.querySelectorAll(
      "#clanmenu > .boxhover > li, #clanmenu li, #clanmenu [id$='-item-menu'], #clanmenu [name$='-item-menu']"
    ).forEach(el => apply(el, "btn"));

    [
      "#clanbox .clan-recruit-header-option",
      "#clanbox .clan-recruit-header-atribute",
      "#clanbox .clan-recruit-header-0",
      "#clanbox .clan-recruit-header-1",
      "#clanbox .clan-recruit-header-2"
    ].forEach(sel => document.querySelectorAll(sel).forEach(el => apply(el, "h")));

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
    const own = /surface-v92|strip-h-v92|strip-v-v92|menu-v92|menu-active-v92/.test(img);
    const oldImage = img !== "none" && !own;
    const old = legacyColor(bg) || oldImage;
    const clanish = /clan|recruit|atribute|treasury|history|diplom|quest|skill|bless|boxhover|item-menu/i.test(key);

    if (!clanish && !old) return;

    if (/item-menu|boxhover|card|button|btn/i.test(key) && rect.height <= 95) apply(el, "btn");
    else if (rect.width > 145 && rect.height <= 95) apply(el, "h");
    else if (rect.height > 145 && rect.width <= 145) apply(el, "v");
    else if (rect.width > 75 && rect.height > 45) apply(el, "surface");
  }

  function sweep() {
    if (!forceKnown()) return;

    const root = document.querySelector(".clan") || document.querySelector("#clanbox");
    if (!root) return;

    root.querySelectorAll("*").forEach(inspect);
    document.documentElement.dataset.tdgClanModule = "1.0";
  }

  const observer = new MutationObserver(() => {
    clearTimeout(observer._tdgClan);
    observer._tdgClan = setTimeout(sweep, 40);
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  document.addEventListener("click", () => {
    setTimeout(sweep, 30);
    setTimeout(sweep, 180);
  }, true);

  setInterval(sweep, 900);
  sweep();

  console.log("%cTDG clan module v1.0 ACTIVE", "color:#76ecf5;font-weight:bold");
})();
