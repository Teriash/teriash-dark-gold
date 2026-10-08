// ==UserScript==
// @name         Teriash Galaxy v11.2 Safe Wood Override
// @namespace    https://github.com/Teriash/teriash-dark-gold
// @version      11.2.0
// @description  Modułowy Dark Gold dla Margonem NI - architektura rozszerzeń.
// @author       Teriash
// @match        https://*.margonem.pl/*
// @match        https://*.margonem.com/*
// @exclude      https://forum.margonem.pl/*
// @run-at       document-end
// @grant        GM_xmlhttpRequest
// @connect      cdn.jsdelivr.net
// @connect      cdn.statically.io
// @connect      raw.githubusercontent.com
// @updateURL    https://cdn.jsdelivr.net/gh/Teriash/teriash-dark-gold@main/teriash-dark-gold.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/Teriash/teriash-dark-gold@main/teriash-dark-gold.user.js
// ==/UserScript==

(async () => {
  "use strict";

  const RAW = "https://cdn.jsdelivr.net/gh/Teriash/teriash-dark-gold@main";
  const ROOT = "teriash-galaxy-v112";
  const CACHE = Date.now().toString();



  const CSS = [
    "theme/base.css",
    "theme/hud.css",
    "theme/chat.css",
    "theme/equipment.css",
    "theme/windows.css",
    "theme/tooltips.css",
    "theme/lootlog.css",
    "theme/npc-tips.css",
    "theme/80-component-tokens-v110.css",
    "theme/81-component-core-v111.css",
    "theme/82-social-v111.css",
    "theme/83-clan-components-v111.css",
    "theme/84-legacy-components-v111.css",
    "theme/85-safe-wood-override-v112.css"
  ];

  const EXTENSIONS = [
    "extensions/engine.js",
    "extensions/npc-tips.js",
    "extensions/map-mark.js",
    "extensions/component-theme-v111.js",
    "extensions/safe-wood-override-v112.js"
  ];

  window.__TDG = {
    version: "11.2.0",
    root: ROOT,
    raw: RAW,
    cache: CACHE,
    asset(path) { return `${RAW}/assets/${path}?v=${CACHE}`; }
  };

  document.documentElement.classList.add(ROOT);

  function gmGetUrl(url) {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: "GET",
        url,
        headers: {"Cache-Control":"no-cache"},
        onload: r => r.status >= 200 && r.status < 300
          ? resolve(r.responseText)
          : reject(new Error(`${url}: HTTP ${r.status}`)),
        onerror: () => reject(new Error(`${url}: network error`))
      });
    });
  }

  async function get(path) {
    const urls = [
      `https://cdn.jsdelivr.net/gh/Teriash/teriash-dark-gold@main/${path}?v=${CACHE}`,
      `https://cdn.statically.io/gh/Teriash/teriash-dark-gold/main/${path}?v=${CACHE}`,
      `https://raw.githubusercontent.com/Teriash/teriash-dark-gold/main/${path}?v=${CACHE}`
    ];

    let lastError;
    for (const url of urls) {
      try {
        const text = await gmGetUrl(url);
        console.log("%cTDG module fetched", "color:#76ecf5", path, "via", new URL(url).host);
        return text;
      } catch (e) {
        lastError = e;
      }
    }
    throw lastError || new Error(`Cannot load ${path}`);
  }

  async function loadCss(path) {
    let css = await get(path);
    css = css
      .replaceAll("__ROOT__", ROOT)
      .replaceAll("__RAW__", RAW)
      .replaceAll("__CACHE__", CACHE);
    const style = document.createElement("style");
    style.dataset.tdg = path;
    style.textContent = css;
    document.head.appendChild(style);
  }

  async function loadJs(path) {
    const source = await get(path);
    // Every extension receives the same explicit TDG context.
    // This avoids the previous scope problem with clan-theme.js.
    Function("TDG", source)(window.__TDG);
    console.log("%cTDG extension executed", "color:#81dbd5", path);
  }




  function installPanelFixV85() {
    if (document.getElementById("tdg-panel-fix-v85")) return;

    const style = document.createElement("style");
    style.id = "tdg-panel-fix-v85";
    style.textContent = `
html.${ROOT} .left-column.main-column {
  background-color:#06111f!important;
  background-image:url("${RAW}/assets/chat/chat-panel-v85.png?v=85")!important;
  background-repeat:no-repeat!important;
  background-position:center center!important;
  background-size:100% 100%!important;
  box-shadow:inset -2px 0 #028d87,inset -4px 0 rgba(118,236,245,.12)!important;
}

html.${ROOT} .left-column.main-column > .inner-wrapper,
html.${ROOT} .left-column.main-column .new-chat-window,
html.${ROOT} .left-column.main-column .chat-message-wrapper,
html.${ROOT} .left-column.main-column .scroll-wrapper,
html.${ROOT} .left-column.main-column .scroll-pane {
  background-color:transparent!important;
  background-image:none!important;
}

/* To właśnie ten element jest osobną nakładką obok inner-wrapper. */
html.${ROOT} .left-column.main-column > .border {
  background:none!important;
  background-image:none!important;
  border:0!important;
  box-shadow:none!important;
  opacity:0!important;
}

html.${ROOT} .right-column.main-column {
  background-color:#06111f!important;
  background-image:url("${RAW}/assets/equipment/right-panel-v85.png?v=85")!important;
  background-repeat:no-repeat!important;
  background-position:center center!important;
  background-size:100% 100%!important;
  box-shadow:inset 2px 0 #028d87,inset 4px 0 rgba(118,236,245,.12)!important;
}

html.${ROOT} .right-column.main-column > .inner-wrapper,
html.${ROOT} .right-column.main-column .right-main-column-wrapper,
html.${ROOT} .right-column.main-column .right-main-column-wrapper > .bottom-wrapper,
html.${ROOT} .right-column.main-column .equipment-wrapper,
html.${ROOT} .right-column.main-column .interface-element-equipment,
html.${ROOT} .right-column.main-column .stats-section {
  background-color:transparent!important;
  background-image:none!important;
}

/* NI ma osobne .border po wrapperze oraz wewnątrz extended-stats. */
html.${ROOT} .right-column.main-column > .border,
html.${ROOT} .right-column.main-column .extended-stats > .border {
  background:none!important;
  background-image:none!important;
  border:0!important;
  box-shadow:none!important;
  opacity:0!important;
}

/* Nie usuwamy tła samych slotów. */
html.${ROOT} .right-column.main-column .eq-slot,
html.${ROOT} .right-column.main-column .interface-element-one-item-slot-background-to-repeat {
  background-image:url("${RAW}/assets/equipment/slot.png?v=${CACHE}")!important;
  background-repeat:no-repeat!important;
  background-position:center!important;
  background-size:100% 100%!important;
}

/* Zakładki i input chatu zostają czytelne, ale bez dzielenia tła panelu. */
html.${ROOT} .chat-channel-card-wrapper {
  background-color:rgba(5,23,42,.91)!important;
}
html.${ROOT} .new-chat-window .input-wrapper {
  background:rgba(6,22,39,.94)!important;
}
`;
    document.head.appendChild(style);
    document.documentElement.dataset.tdgPanelFix = "8.5";
    console.log("%cTDG panel fix v8.5 ACTIVE", "color:#76ecf5;font-weight:bold");
  }


  function installWindowReskinV86() {
    if (document.getElementById("tdg-window-reskin-v86")) return;
    const style = document.createElement("style");
    style.id = "tdg-window-reskin-v86";
    style.textContent = `
html.${ROOT} .c-window.border-window > .content,
html.${ROOT} .border-window > .content,
html.${ROOT} .c-window.border-window .inner-content {
  background:#071221 url("${RAW}/assets/windows/window-fill-v86.png?v=86") repeat!important;
  color:#d8f8ff!important;
}
html.${ROOT} .c-window .content .scroll-wrapper,
html.${ROOT} .c-window .content .scroll-pane,
html.${ROOT} .c-window .content .list,
html.${ROOT} .c-window .content .list-container,
html.${ROOT} .c-window .content .panel,
html.${ROOT} .c-window .content .section,
html.${ROOT} .c-window .content .box,
html.${ROOT} .c-window .content .content-box,
html.${ROOT} .c-window .content .paper,
html.${ROOT} .c-window .content .sheet,
html.${ROOT} .c-window .content .details,
html.${ROOT} .c-window .content .description,
html.${ROOT} .c-window .content table,
html.${ROOT} .c-window .content tbody,
html.${ROOT} .c-window .content tr,
html.${ROOT} .c-window .content td,
html.${ROOT} .c-window .content th,
html.${ROOT} .border-window .content .scroll-wrapper,
html.${ROOT} .border-window .content .scroll-pane,
html.${ROOT} .border-window .content .list,
html.${ROOT} .border-window .content .list-container,
html.${ROOT} .border-window .content .panel,
html.${ROOT} .border-window .content .section,
html.${ROOT} .border-window .content .box,
html.${ROOT} .border-window .content .content-box,
html.${ROOT} .border-window .content .paper,
html.${ROOT} .border-window .content .sheet,
html.${ROOT} .border-window .content .details,
html.${ROOT} .border-window .content .description,
html.${ROOT} .border-window .content table,
html.${ROOT} .border-window .content tbody,
html.${ROOT} .border-window .content tr,
html.${ROOT} .border-window .content td,
html.${ROOT} .border-window .content th {
  background:rgba(6,22,39,.78) url("${RAW}/assets/windows/paper-replacement-v86.png?v=86") repeat!important;
  border-color:#279ebd!important;
  color:#d8f8ff!important;
}
html.${ROOT} .c-window .content h1,
html.${ROOT} .c-window .content h2,
html.${ROOT} .c-window .content h3,
html.${ROOT} .c-window .content h4,
html.${ROOT} .c-window .content .title,
html.${ROOT} .c-window .content .header,
html.${ROOT} .c-window .content .subheader,
html.${ROOT} .c-window .content .section-title,
html.${ROOT} .c-window .content .top-bar,
html.${ROOT} .c-window .content .tabs-nav,
html.${ROOT} .border-window .content h1,
html.${ROOT} .border-window .content h2,
html.${ROOT} .border-window .content h3,
html.${ROOT} .border-window .content h4,
html.${ROOT} .border-window .content .title,
html.${ROOT} .border-window .content .header,
html.${ROOT} .border-window .content .subheader,
html.${ROOT} .border-window .content .section-title,
html.${ROOT} .border-window .content .top-bar,
html.${ROOT} .border-window .content .tabs-nav {
  background:url("${RAW}/assets/windows/section-bar-v86.png?v=86") repeat-x!important;
  background-size:auto 100%!important;
  color:#e7fbff!important;
}
html.${ROOT} .c-window .content button,
html.${ROOT} .border-window .content button,
html.${ROOT} .c-window .content .button,
html.${ROOT} .border-window .content .button,
html.${ROOT} .c-window .content .tab,
html.${ROOT} .border-window .content .tab,
html.${ROOT} .c-window .content .item,
html.${ROOT} .border-window .content .item,
html.${ROOT} .c-window .content .row,
html.${ROOT} .border-window .content .row,
html.${ROOT} .c-window .content li,
html.${ROOT} .border-window .content li,
html.${ROOT} .c-window .content .menu-entry,
html.${ROOT} .border-window .content .menu-entry {
  background:rgba(6,18,33,.88) url("${RAW}/assets/windows/menu-button-v86.png?v=86") repeat-x!important;
  background-size:auto 100%!important;
  border:1px solid #248ea8!important;
  color:#d8f8ff!important;
}
html.${ROOT} .c-window .content .active,
html.${ROOT} .c-window .content .selected,
html.${ROOT} .c-window .content .current,
html.${ROOT} .c-window .content [aria-selected="true"],
html.${ROOT} .border-window .content .active,
html.${ROOT} .border-window .content .selected,
html.${ROOT} .border-window .content .current,
html.${ROOT} .border-window .content [aria-selected="true"] {
  background:url("${RAW}/assets/windows/menu-button-active-v86.png?v=86") repeat-x!important;
  background-size:auto 100%!important;
  border-color:#76ecf5!important;
  color:#f1fdff!important;
}
`;
    document.head.appendChild(style);
    document.documentElement.dataset.tdgWindowReskin = "8.6";
    console.log("%cTDG window reskin v8.6 ACTIVE", "color:#76ecf5;font-weight:bold");
  }

  try {
    await Promise.all(CSS.map(loadCss));
    for (const file of EXTENSIONS) {
      try { await loadJs(file); }
      catch (e) { console.warn("[TDG]", file, e); }
    }
    installPanelFixV85();
    installWindowReskinV86();
    console.log("%cTeriash Galaxy v11.2 Safe Wood Override", "color:#e8c66b;font-weight:700", "loaded");
  } catch (e) {
    console.error("[TDG] loader error", e);
  }
})();
