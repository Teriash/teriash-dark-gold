// ==UserScript==
// @name         Teriash Galaxy v8.5 Hard Panel Fix
// @namespace    https://github.com/Teriash/teriash-dark-gold
// @version      8.5.0
// @description  Modułowy Dark Gold dla Margonem NI - architektura rozszerzeń.
// @author       Teriash
// @match        https://*.margonem.pl/*
// @match        https://*.margonem.com/*
// @exclude      https://www.margonem.pl/*
// @exclude      https://forum.margonem.pl/*
// @run-at       document-end
// @grant        GM_xmlhttpRequest
// @connect      cdn.jsdelivr.net
// @updateURL    https://cdn.jsdelivr.net/gh/Teriash/teriash-dark-gold@main/teriash-dark-gold.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/Teriash/teriash-dark-gold@main/teriash-dark-gold.user.js
// ==/UserScript==

(async () => {
  "use strict";

  const RAW = "https://cdn.jsdelivr.net/gh/Teriash/teriash-dark-gold@main";
  const ROOT = "teriash-dark-gold-v7";
  const CACHE = Date.now().toString();

  const CSS = [
    "theme/base.css",
    "theme/hud.css",
    "theme/chat.css",
    "theme/equipment.css",
    "theme/windows.css",
    "theme/tooltips.css",
    "theme/lootlog.css",
    "theme/npc-tips.css"
  ];

  const EXTENSIONS = [
    "extensions/engine.js",
    "extensions/npc-tips.js",
    "extensions/map-mark.js"
  ];

  window.__TDG = {
    version: "8.5.0",
    root: ROOT,
    raw: RAW,
    cache: CACHE,
    asset(path) { return `${RAW}/assets/${path}?v=${CACHE}`; }
  };

  document.documentElement.classList.add(ROOT);

  function get(path) {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: "GET",
        url: `${RAW}/${path}?v=${CACHE}`,
        headers: {"Cache-Control":"no-cache"},
        onload: r => r.status >= 200 && r.status < 300 ? resolve(r.responseText) : reject(new Error(`${path}: HTTP ${r.status}`)),
        onerror: () => reject(new Error(`${path}: network error`))
      });
    });
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
    Function(source)();
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

  try {
    await Promise.all(CSS.map(loadCss));
    for (const file of EXTENSIONS) {
      try { await loadJs(file); }
      catch (e) { console.warn("[TDG]", file, e); }
    }
    installPanelFixV85();
    console.log("%cTeriash Galaxy v8.4 Panel Fix", "color:#e8c66b;font-weight:700", "loaded");
  } catch (e) {
    console.error("[TDG] loader error", e);
  }
})();
