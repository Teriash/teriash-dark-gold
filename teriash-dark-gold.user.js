// ==UserScript==
// @name         Teriash Dark Gold v5.1 Ornate - Margonem NI
// @namespace    https://github.com/Teriash/teriash-dark-gold
// @version      5.1.0
// @description  Ozdobny graficzny Dark Gold dla NI. Naprawiona górna belka, bez zmian geometrii.
// @author       Teriash
// @match        https://*.margonem.pl/*
// @match        http://*.margonem.pl/*
// @run-at       document-start
// @grant        none
// ==/UserScript==
(()=>{"use strict";
const R="teriash-dark-gold-v51",A="https://raw.githubusercontent.com/Teriash/teriash-dark-gold/main/assets/";
const I={top:A+"top-bar.png",bottom:A+"bottom-bar.png",right:A+"right-panel.png",chat:A+"chat-bg.png",win:A+"window-bg.png",header:A+"window-header.png",frame:A+"window-frame.png",slot:A+"slot.png",widget:A+"widget-button.png"};
const css=`
html.${R}{--dg:#c68a25;--dgh:#f0cf72;--dgt:#ead7a0}

/* GÓRA: tło na positioner + bg, bo samo .bg dawało czarny pas */
html.${R} .interface-layer>.top.positioner,
html.${R} .interface-layer .top.positioner,
html.${R} .interface-layer .positioner.top,
html.${R} .interface-layer .top.positioner>.bg,
html.${R} .interface-layer .positioner.top>.bg{
 background-color:#1d1309!important;
 background-image:url("${I.top}")!important;
 background-repeat:repeat-x!important;
 background-position:top left!important;
 background-size:auto 100%!important;
}
html.${R} .interface-layer .top.positioner>.content{background-color:transparent!important}

/* DÓŁ */
html.${R} .interface-layer .bottom.positioner,
html.${R} .interface-layer .positioner.bottom,
html.${R} .interface-layer .bottom.positioner>.bg{
 background-color:#171008!important;background-image:url("${I.bottom}")!important;
 background-repeat:repeat-x!important;background-size:auto 100%!important;
}

/* LEWY CHAT */
html.${R} .left-column.main-column,
html.${R} .left-column .inner-wrapper,
html.${R} .chat-tpl,
html.${R} .new-chat-window,
html.${R} .chat-message-wrapper{
 background-color:#0d0b08!important;background-image:url("${I.chat}")!important;background-repeat:repeat!important;
 box-shadow:inset -2px 0 #6c4516,inset -3px 0 rgba(236,190,72,.28)!important;
}
html.${R} .chat-tpl .input-wrapper,
html.${R} .new-chat-message{background:#100d08!important;border-color:#9b671d!important}
html.${R} .chat-message-wrapper{color:var(--dgt)!important}

/* PRAWY HUD */
html.${R} .right-column.main-column,
html.${R} .right-column .inner-wrapper,
html.${R} .equipment-wrapper,
html.${R} .stats-section{
 background-color:#0d0b08!important;background-image:url("${I.right}")!important;background-repeat:repeat!important;
 box-shadow:inset 2px 0 #6c4516,inset 3px 0 rgba(236,190,72,.28)!important;
}
html.${R} .stats-section .stat-row{color:var(--dgt)!important}

/* SLOTY */
html.${R} .eq-slot,
html.${R} .interface-element-one-item-slot-background-to-repeat,
html.${R} .interface-element-one-item-slot-2,
html.${R} .skill-usable-slot{
 background-image:url("${I.slot}")!important;background-position:center!important;
 background-repeat:no-repeat!important;background-size:100% 100%!important;
}
html.${R} .inventory-item,html.${R} .item{filter:none!important}

/* PRZYCISKI HUD */
html.${R} .main-buttons-container .widget-button,
html.${R} .widget-in-interface-bar{
 background-image:url("${I.widget}")!important;background-size:100% 100%!important;
 box-shadow:inset 0 0 5px rgba(230,177,61,.28)!important;
}

/* OKNA */
html.${R} .c-window.border-window>.content,
html.${R} .border-window>.content{
 background-color:#0d0b08!important;background-image:url("${I.win}")!important;background-repeat:repeat!important;
}
html.${R} .c-window .header-label-positioner,
html.${R} .border-window .header-label-positioner{
 background-image:url("${I.header}")!important;background-repeat:repeat-x!important;background-size:auto 100%!important;
}
html.${R} .header-label{color:var(--dgh)!important;text-shadow:0 1px 2px #000,0 0 5px rgba(210,153,40,.35)!important}
html.${R} .c-window>.border-image,
html.${R} .border-window>.border-image{
 background-image:url("${I.frame}")!important;background-size:100% 100%!important;pointer-events:none!important;
}
html.${R} .c-window__bottom-bar,
html.${R} .interface-element-bottom-bar-background-stretch{
 background-image:url("${I.bottom}")!important;background-repeat:repeat-x!important;
}

/* dodatkowe złote akcenty bez ruszania rozmiaru */
html.${R} .tabs-content-option.active,
html.${R} .menu-option:hover{color:var(--dgh)!important;text-shadow:0 0 4px #7c5119!important}
html.${R} .close-button,html.${R} .manage-hamburger-button{filter:sepia(.55) saturate(1.35) brightness(1.08)!important}

/* ŚWIAT / MAPA bez filtrów */
html.${R} #GAME_CANVAS,
html.${R} #base,
html.${R} #bground,
html.${R} .game-layer canvas,
html.${R} .window-mode-background-layer{filter:none!important}
`;
let s=document.createElement("style");s.id="teriash-dg-v51-style";s.textContent=css;(document.head||document.documentElement).appendChild(s);
document.documentElement.classList.add(R);
})();
