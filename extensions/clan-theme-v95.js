
(() => {
  if (!TDG) {
    console.error("[TDG clan v9.5] missing TDG context");
    return;
  }

  console.log("%cTDG clan module v9.5 LOADED", "color:#76ecf5;font-weight:bold");

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
    const cls = kind === "btn" ? "tdg95-btn" : kind === "h" ? "tdg95-h" : kind === "v" ? "tdg95-v" : "tdg95-surface";
    el.classList.add(cls);
  }

  function forceKnown() {
    const clan = document.querySelector(".clan");
    const menu = document.querySelector("#clanmenu");
    const box = document.querySelector("#clanbox");
    if (!clan && !menu && !box) return false;

    if (!logged) {
      logged = true;
      console.log("%cTDG clan DOM FOUND v9.5", "color:#81dbd5;font-weight:bold", {
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
    const own = /surface-v95|strip-h-v95|strip-v-v95|menu-v95|menu-active-v95/.test(img);
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
