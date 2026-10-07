// ==UserScript==
// @name         Teriash Dark Gold v6
// @namespace    https://github.com/Teriash/teriash-dark-gold
// @version      6.1.0
// @description  Modułowy graficzny motyw Dark Gold dla Margonem NI.
// @author       Teriash
// @match        https://*.margonem.pl/*
// @match        https://*.margonem.com/*
// @exclude      https://www.margonem.pl/*
// @exclude      https://forum.margonem.pl/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// @updateURL    https://raw.githubusercontent.com/Teriash/teriash-dark-gold/main/teriash-dark-gold.user.js
// @downloadURL  https://raw.githubusercontent.com/Teriash/teriash-dark-gold/main/teriash-dark-gold.user.js
// ==/UserScript==

(() => {
  "use strict";

  const ROOT = "teriash-dark-gold-v6";
  const RAW = "https://raw.githubusercontent.com/Teriash/teriash-dark-gold/main";
  const CACHE = Date.now().toString();
  const DEBUG = false;

  const CSS_FILES = [
    "theme/00-base.css",
    "theme/10-hud.css",
    "theme/20-chat.css",
    "theme/30-equipment.css",
    "theme/40-windows.css",
    "theme/50-tooltips.css"
  ];

  const JS_FILES = [
    "extensions/runtime.js",
    "extensions/diagnostics.js"
  ];

  window.__TERIASH_DARK_GOLD__ = {
    version: "6.1.0",
    rootClass: ROOT,
    rawBase: RAW,
    cacheToken: CACHE,
    debug: DEBUG
  };

  document.documentElement.classList.add(ROOT);

  function requestText(path) {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: "GET",
        url: `${RAW}/${path}?v=${CACHE}`,
        headers: { "Cache-Control": "no-cache" },
        onload: r => {
          if (r.status >= 200 && r.status < 300) resolve(r.responseText);
          else reject(new Error(`${path}: HTTP ${r.status}`));
        },
        onerror: () => reject(new Error(`${path}: network error`))
      });
    });
  }

  async function loadCss(path) {
    const css = (await requestText(path))
      .replaceAll("__ROOT__", ROOT)
      .replaceAll("__ASSET__", `${RAW}/assets`)
      .replaceAll("__CACHE__", CACHE);

    const style = document.createElement("style");
    style.dataset.teriashDarkGold = path;
    style.textContent = css;
    (document.head || document.documentElement).appendChild(style);
  }

  async function loadJs(path) {
    const code = await requestText(path);
    // osobny plik JS, ale uruchamiany w sandboxie Tampermonkey - bez problemów z MIME raw.githubusercontent.
    Function(code)();
  }

  async function boot() {
    try {
      await Promise.all(CSS_FILES.map(loadCss));
      for (const file of JS_FILES) {
        try { await loadJs(file); }
        catch (e) { console.warn("[Dark Gold] extension:", e); }
      }
      console.log("%cTeriash Dark Gold v6 loaded", "color:#e7bf59;font-weight:bold");
    } catch (e) {
      console.error("[Dark Gold] loader error:", e);
    }
  }

  boot();
})();
