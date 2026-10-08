// ==UserScript==
// @name         Teriash Galaxy v8.3 Realistic.1
// @namespace    https://github.com/Teriash/teriash-dark-gold
// @version      8.3.0
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
    version: "8.3.0",
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

  try {
    await Promise.all(CSS.map(loadCss));
    for (const file of EXTENSIONS) {
      try { await loadJs(file); }
      catch (e) { console.warn("[TDG]", file, e); }
    }
    console.log("%cTeriash Galaxy v8.3 Realistic", "color:#e8c66b;font-weight:700", "loaded");
  } catch (e) {
    console.error("[TDG] loader error", e);
  }
})();
