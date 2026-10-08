(() => {
  "use strict";

  // Ten moduł jest ładowany przez dark-gold.js z folderu extensions/.
  // RAW, ROOT i CACHE są przekazywane przez loader jako argumenty funkcji.

    if (document.getElementById("tdg-clan-main-v92-style")) return;

    const SURFACE = `${RAW}/assets/clan/surface-v92.png?v=92`;
    const STRIP_H = `${RAW}/assets/clan/strip-h-v92.png?v=92`;
    const STRIP_V = `${RAW}/assets/clan/strip-v-v92.png?v=92`;
    const MENU = `${RAW}/assets/clan/menu-v92.png?v=92`;
    const MENU_A = `${RAW}/assets/clan/menu-active-v92.png?v=92`;

    const style = document.createElement("style");
    style.id = "tdg-clan-main-v92-style";
    style.textContent = `
html.${ROOT} .clan {
  background:#061522 url("${SURFACE}") center/cover no-repeat!important;
  border-color:#238eaa!important;
}

html.${ROOT} #clanmenu,
html.${ROOT} #clanmenu > .boxhover {
  background:#07172b url("${SURFACE}") center/cover no-repeat!important;
  border-color:#238eaa!important;
  box-shadow:inset 0 0 26px rgba(0,8,20,.23)!important;
}

html.${ROOT} #clanmenu > .boxhover > li,
html.${ROOT} #clanmenu li,
html.${ROOT} #clanmenu [id$="-item-menu"],
html.${ROOT} #clanmenu [name$="-item-menu"] {
  background:#07172b url("${MENU}") center/100% 100% no-repeat!important;
  color:#e8fbff!important;
  border-color:#248faa!important;
  box-shadow:inset 0 1px rgba(220,248,255,.07)!important;
}

html.${ROOT} #clanmenu > .boxhover > li:hover,
html.${ROOT} #clanmenu > .boxhover > li.active,
html.${ROOT} #clanmenu li.active,
html.${ROOT} #clanmenu [id$="-item-menu"].active,
html.${ROOT} #clanmenu [name$="-item-menu"].active {
  background-image:url("${MENU_A}")!important;
  border-color:#76ecf5!important;
  color:#f3fdff!important;
  box-shadow:inset 0 0 14px rgba(118,236,245,.22),0 0 6px rgba(118,236,245,.10)!important;
}

html.${ROOT} #clanbox {
  background:#07172b url("${SURFACE}") center/cover no-repeat!important;
  color:#d8f8ff!important;
  border-color:#238eaa!important;
}

html.${ROOT} #clanbox .clan-recruit-content,
html.${ROOT} #clanbox .recruit-section,
html.${ROOT} #clanbox .scroll-wrapper,
html.${ROOT} #clanbox .scroll-pane,
html.${ROOT} #clanbox .background-wrapper,
html.${ROOT} #clanbox .section-recruit-main,
html.${ROOT} #clanbox .clan-part-0,
html.${ROOT} #clanbox .clan-part-1,
html.${ROOT} #clanbox .clan-part-2,
html.${ROOT} #clanbox .clan-members-content,
html.${ROOT} #clanbox .clan-list-content,
html.${ROOT} #clanbox .clan-priv-page,
html.${ROOT} #clanbox .clan-official-page,
html.${ROOT} #clanbox .history,
html.${ROOT} #clanbox .treasury,
html.${ROOT} #clanbox .clan-edit-content,
html.${ROOT} #clanbox .player-edit-pane,
html.${ROOT} #clanbox .clan-list-find-panel,
html.${ROOT} #clanbox .clan-list-atributes,
html.${ROOT} #clanbox .clan-list-find-content,
html.${ROOT} #clanbox .clan-skills-content,
html.${ROOT} #clanbox .clan-bless-content,
html.${ROOT} #clanbox .clan-quests-content,
html.${ROOT} #clanbox .one-clan-skill,
html.${ROOT} #clanbox .one-clan-quest {
  background:#07172b url("${SURFACE}") center/cover no-repeat!important;
  color:#d8f8ff!important;
  border-color:#238eaa!important;
}

html.${ROOT} #clanbox .one-clan-atribute,
html.${ROOT} #clanbox .one-clan-atribute > *,
html.${ROOT} #clanbox .atribute-name-wrapper,
html.${ROOT} #clanbox .atribute-value-wrapper,
html.${ROOT} #clanbox .invite-to-clan {
  background-color:rgba(5,29,49,.94)!important;
  background-image:none!important;
  color:#d8f8ff!important;
  border-color:#248eaa!important;
}

html.${ROOT} #clanbox .clan-recruit-header-option,
html.${ROOT} #clanbox .clan-recruit-header-atribute,
html.${ROOT} #clanbox .clan-recruit-header-0,
html.${ROOT} #clanbox .clan-recruit-header-1,
html.${ROOT} #clanbox .clan-recruit-header-2,
html.${ROOT} #clanbox .clan-list-find-header,
html.${ROOT} #clanbox .quest-content-header,
html.${ROOT} #clanbox .clan-skill-main-header,
html.${ROOT} #clanbox .clan-skill-header,
html.${ROOT} #clanbox .bless-main-header,
html.${ROOT} #clanbox .bless-header {
  background:#082139 url("${STRIP_H}") center/100% 100% no-repeat!important;
  color:#e8fbff!important;
  border-color:#2aa4c1!important;
}

html.${ROOT} #clanbox .clan-recruit-menu,
html.${ROOT} #clanbox .cards-header-wrapper,
html.${ROOT} #clanbox .cards-header,
html.${ROOT} #clanbox .header-background-graphic {
  background:#061727!important;
  background-image:none!important;
  border-color:#279fbd!important;
}

html.${ROOT} #clanbox .clan-recruit-menu .card,
html.${ROOT} #clanbox .cards-header .card {
  background:#07172b url("${MENU}") center/100% 100% no-repeat!important;
  color:#d8f8ff!important;
  border-color:#248faa!important;
}

html.${ROOT} #clanbox .clan-recruit-menu .card.active,
html.${ROOT} #clanbox .cards-header .card.active {
  background-image:url("${MENU_A}")!important;
  border-color:#76ecf5!important;
  color:#f3fdff!important;
}

html.${ROOT} #clanbox .clan-members-table,
html.${ROOT} #clanbox .clan-list-table,
html.${ROOT} #clanbox .recruit-candidate-table,
html.${ROOT} #clanbox .recruit-invite-table,
html.${ROOT} #clanbox table.members,
html.${ROOT} #clanbox table.rankstable {
  background:rgba(4,21,38,.90)!important;
  color:#d8f8ff!important;
  border-collapse:collapse!important;
  border-color:#218fab!important;
}

html.${ROOT} #clanbox .clan-members-table th,
html.${ROOT} #clanbox .clan-list-table th,
html.${ROOT} #clanbox .recruit-candidate-table th,
html.${ROOT} #clanbox .recruit-invite-table th,
html.${ROOT} #clanbox table.members th,
html.${ROOT} #clanbox table.rankstable th {
  background:linear-gradient(180deg,#0a3b58,#07233a)!important;
  color:#e6fbff!important;
  border:1px solid #24a2c2!important;
}

html.${ROOT} #clanbox .clan-members-table td,
html.${ROOT} #clanbox .clan-list-table td,
html.${ROOT} #clanbox .recruit-candidate-table td,
html.${ROOT} #clanbox .recruit-invite-table td,
html.${ROOT} #clanbox table.members td,
html.${ROOT} #clanbox table.rankstable td {
  background:rgba(5,28,48,.86)!important;
  color:#d8f8ff!important;
  border:1px solid #218ba8!important;
}

html.${ROOT} .clan .btn.SI-button,
html.${ROOT} .clan .big-button,
html.${ROOT} .clan button,
html.${ROOT} .clan input[type="button"],
html.${ROOT} .clan input[type="submit"] {
  background:#07172b url("${MENU}") center/100% 100% no-repeat!important;
  color:#e8fbff!important;
  border-color:#2aa9c7!important;
}

html.${ROOT} .clan .btn.SI-button > .left,
html.${ROOT} .clan .btn.SI-button > .right,
html.${ROOT} .clan .btn.SI-button > .label,
html.${ROOT} .clan .big-button > .left,
html.${ROOT} .clan .big-button > .right,
html.${ROOT} .clan .big-button > .content {
  background:none!important;
  background-image:none!important;
}

html.${ROOT} .clan input,
html.${ROOT} .clan select,
html.${ROOT} .clan textarea {
  background:#071d31!important;
  color:#d8f8ff!important;
  border-color:#299fbd!important;
}

html.${ROOT} .tdg92-surface {
  background:#07172b url("${SURFACE}") center/cover no-repeat!important;
  color:#d8f8ff!important;
  border-color:#238eaa!important;
}
html.${ROOT} .tdg92-h {
  background:#082139 url("${STRIP_H}") center/100% 100% no-repeat!important;
  border-color:#2aa4c1!important;
}
html.${ROOT} .tdg92-v {
  background:#082139 url("${STRIP_V}") center/100% 100% no-repeat!important;
  border-color:#2aa4c1!important;
}
html.${ROOT} .tdg92-btn {
  background:#07172b url("${MENU}") center/100% 100% no-repeat!important;
  color:#e8fbff!important;
  border-color:#279fbd!important;
}
`;
    document.head.appendChild(style);

    const skip = /icon|outfit|avatar|logo|character|sprite|picture|item-id|inventory|cl_logo|skill-icon|quest-bring-item|npc|hero/i;
    let foundLogged = false;

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

    function inline(el, type) {
      const key = `92-${type}`;
      if (el.dataset.tdg92 === key) return;
      el.dataset.tdg92 = key;

      if (type === "btn") {
        el.style.setProperty("background-color","#07172b","important");
        el.style.setProperty("background-image",`url("${MENU}")`,"important");
        el.style.setProperty("background-position","center","important");
        el.style.setProperty("background-size","100% 100%","important");
        el.style.setProperty("background-repeat","no-repeat","important");
        el.style.setProperty("border-color","#279fbd","important");
        el.classList.add("tdg92-btn");
      } else if (type === "h") {
        el.style.setProperty("background-color","#082139","important");
        el.style.setProperty("background-image",`url("${STRIP_H}")`,"important");
        el.style.setProperty("background-position","center","important");
        el.style.setProperty("background-size","100% 100%","important");
        el.style.setProperty("background-repeat","no-repeat","important");
        el.classList.add("tdg92-h");
      } else if (type === "v") {
        el.style.setProperty("background-color","#082139","important");
        el.style.setProperty("background-image",`url("${STRIP_V}")`,"important");
        el.style.setProperty("background-position","center","important");
        el.style.setProperty("background-size","100% 100%","important");
        el.style.setProperty("background-repeat","no-repeat","important");
        el.classList.add("tdg92-v");
      } else {
        el.style.setProperty("background-color","#07172b","important");
        el.style.setProperty("background-image",`url("${SURFACE}")`,"important");
        el.style.setProperty("background-position","center","important");
        el.style.setProperty("background-size","cover","important");
        el.style.setProperty("background-repeat","no-repeat","important");
        el.style.setProperty("border-color","#238eaa","important");
        el.classList.add("tdg92-surface");
      }
    }

    function forceKnown() {
      const clan = document.querySelector(".clan");
      const box = document.querySelector("#clanbox");
      const menu = document.querySelector("#clanmenu");

      if (!clan && !box && !menu) return false;

      if (!foundLogged) {
        foundLogged = true;
        console.log("%cTDG clan DOM FOUND v9.2", "color:#81dbd5;font-weight:bold", {
          clan: !!clan, clanmenu: !!menu, clanbox: !!box
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
      ].forEach(sel => document.querySelectorAll(sel).forEach(el => inline(el, "surface")));

      document.querySelectorAll("#clanmenu > .boxhover > li, #clanmenu li, #clanmenu [id$='-item-menu'], #clanmenu [name$='-item-menu']")
        .forEach(el => inline(el, "btn"));

      [
        "#clanbox .clan-recruit-header-option",
        "#clanbox .clan-recruit-header-atribute",
        "#clanbox .clan-recruit-header-0",
        "#clanbox .clan-recruit-header-1",
        "#clanbox .clan-recruit-header-2"
      ].forEach(sel => document.querySelectorAll(sel).forEach(el => inline(el, "h")));

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
      const oldImg = img !== "none" && !own;
      const old = legacyColor(bg) || oldImg;
      const clanish = /clan|recruit|atribute|treasury|history|diplom|quest|skill|bless|boxhover|item-menu/i.test(key);

      if (!clanish && !old) return;

      if (/item-menu|boxhover|card|button|btn/i.test(key) && rect.height <= 95) inline(el, "btn");
      else if (rect.width > 145 && rect.height <= 95) inline(el, "h");
      else if (rect.height > 145 && rect.width <= 145) inline(el, "v");
      else if (rect.width > 75 && rect.height > 45) inline(el, "surface");
    }

    function sweep() {
      if (!forceKnown()) return;
      const root = document.querySelector(".clan") || document.querySelector("#clanbox");
      if (!root) return;
      root.querySelectorAll("*").forEach(inspect);
      document.documentElement.dataset.tdgClanMain = "9.2";
    }

    const observer = new MutationObserver(() => {
      clearTimeout(observer._tdg92);
      observer._tdg92 = setTimeout(sweep, 35);
    });
    observer.observe(document.documentElement, {childList:true, subtree:true});

    document.addEventListener("click", () => {
      setTimeout(sweep, 25);
      setTimeout(sweep, 160);
    }, true);

    setInterval(sweep, 800);
    sweep();

    console.log("%cTDG clan main v9.2 ACTIVE", "color:#76ecf5;font-weight:bold");
  
})();
