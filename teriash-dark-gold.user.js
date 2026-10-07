// ==UserScript==
// @name         Teriash Dark Gold - Margonem NI
// @namespace    https://github.com/Teriash/teriash-dark-gold
// @version      4.1.0
// @description  Graficzny Dark Gold skin dla Margonem NI.
// @author       Teriash
// @match        https://*.margonem.pl/*
// @match        http://*.margonem.pl/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(() => {
    "use strict";

    const ROOT = "teriash-dark-gold";
    const KEY = "teriash-dark-gold-enabled";
    const ASSETS = "https://raw.githubusercontent.com/Teriash/teriash-dark-gold/main/assets/";

    const img = {
        rightPanel: ASSETS + "right-panel.png",
        chat:       ASSETS + "chat-bg.png",
        window:     ASSETS + "window-bg.png",
        bar:        ASSETS + "bar-horizontal.png",
        header:     ASSETS + "header-bar.png",
        frame:      ASSETS + "gold-frame.png",
        slot:       ASSETS + "slot.png"
    };

    const css = `
html.${ROOT} {
    --dg-gold:#b77b20;
    --dg-gold-hi:#e6bc53;
    --dg-text:#ead8a7;
}

/* Nie zmieniamy geometrii NI: bez width/height/top/left/margin/padding/transform. */

/* PRAWY PANEL / EKWIPUNEK */
html.${ROOT} .equipment-wrapper,
html.${ROOT} .stats-section {
    background-image:url("${img.rightPanel}") !important;
    background-repeat:repeat !important;
}

html.${ROOT} .eq-slot,
html.${ROOT} .interface-element-one-item-slot-background-to-repeat {
    background-image:url("${img.slot}") !important;
    background-position:center !important;
    background-repeat:no-repeat !important;
    background-size:100% 100% !important;
}

html.${ROOT} .inventory-item {
    filter:none !important;
}

/* CHAT */
html.${ROOT} .chat-message-wrapper {
    background-image:url("${img.chat}") !important;
    background-repeat:repeat !important;
    color:var(--dg-text) !important;
}

html.${ROOT} .new-chat-message {
    background-image:url("${img.bar}") !important;
    background-repeat:repeat-x !important;
}

/* OKNA NI */
html.${ROOT} .c-window.border-window > .content,
html.${ROOT} .c-window.border-window > .inner-content {
    background-image:url("${img.window}") !important;
    background-repeat:repeat !important;
}

html.${ROOT} .c-window.border-window .header-label-positioner {
    background-image:url("${img.header}") !important;
    background-repeat:repeat-x !important;
}

html.${ROOT} .c-window.border-window .header-label {
    color:var(--dg-gold-hi) !important;
    text-shadow:0 1px 2px #000 !important;
}

html.${ROOT} .c-window.border-window > .border-image {
    background-image:url("${img.frame}") !important;
    background-size:100% 100% !important;
    pointer-events:none !important;
}

/* DOLNE BELKI OKIEN */
html.${ROOT} .c-window__bottom-bar,
html.${ROOT} .interface-element-bottom-bar-background-stretch {
    background-image:url("${img.bar}") !important;
    background-repeat:repeat-x !important;
}

/* ŚWIAT GRY ZOSTAJE NIETKNIĘTY */
html.${ROOT} #GAME_CANVAS,
html.${ROOT} #base,
html.${ROOT} #bground,
html.${ROOT} .window-mode-background-layer {
    filter:none !important;
}
`;

    function install() {
        if (!document.getElementById("teriash-dark-gold-style")) {
            const style = document.createElement("style");
            style.id = "teriash-dark-gold-style";
            style.textContent = css;
            (document.head || document.documentElement).appendChild(style);
        }
        const enabled = localStorage.getItem(KEY) !== "0";
        document.documentElement.classList.toggle(ROOT, enabled);
    }

    install();
})();
