// ==UserScript==
// @name         Teriash Dark Gold v5 - Margonem NI
// @namespace    https://github.com/Teriash/teriash-dark-gold
// @version      5.0.0
// @description  Graficzny skin NI, selektory dopasowane do aktualnego DOM. Bez zmiany geometrii.
// @author       Teriash
// @match        https://*.margonem.pl/*
// @match        http://*.margonem.pl/*
// @run-at       document-start
// @grant        none
// ==/UserScript==
(()=>{"use strict";
const ROOT="teriash-dark-gold-v5", A="https://raw.githubusercontent.com/Teriash/teriash-dark-gold/main/assets/";
const I={top:A+"top-bar.png",bottom:A+"bottom-bar.png",right:A+"right-panel.png",chat:A+"chat-bg.png",win:A+"window-bg.png",header:A+"window-header.png",frame:A+"window-frame.png",slot:A+"slot.png",widget:A+"widget-button.png"};
const css=`
html.${ROOT}{--dg:#b77b20;--dgh:#e5bc4c;--dgt:#e7d29a}

/* 1. GÓRNA BELKA - faktyczny NI */
html.${ROOT} .interface-layer .top.positioner>.bg,
html.${ROOT} .interface-layer .positioner.top>.bg{
 background-image:url("${I.top}")!important;background-repeat:repeat-x!important;background-size:auto 100%!important;
}
/* 2. DOLNA BELKA */
html.${ROOT} .interface-layer .bottom.positioner>.bg,
html.${ROOT} .interface-layer .positioner.bottom>.bg{
 background-image:url("${I.bottom}")!important;background-repeat:repeat-x!important;background-size:auto 100%!important;
}

/* 3. PRAWA KOLUMNA - tło bez wymiarów */
html.${ROOT} .interface-layer .right-column.main-column,
html.${ROOT} .right-column .inner-wrapper,
html.${ROOT} .equipment-wrapper,
html.${ROOT} .stats-section{
 background-image:url("${I.right}")!important;background-repeat:repeat!important;
 box-shadow:inset 2px 0 0 #5f3d13,inset 3px 0 0 rgba(229,188,76,.28)!important;
}

/* 4. CHAT / LEWA KOLUMNA */
html.${ROOT} .left-column .inner-wrapper,
html.${ROOT} .chat-tpl,
html.${ROOT} .new-chat-window,
html.${ROOT} .chat-message-wrapper{
 background-image:url("${I.chat}")!important;background-repeat:repeat!important;
}
html.${ROOT} .chat-message-wrapper{color:var(--dgt)!important}
html.${ROOT} .new-chat-message,
html.${ROOT} .chat-tpl .input-wrapper{
 border-color:#704816!important;background-color:#100d08!important;
}

/* 5. SLOTY PRAWEGO PANELU I SKILLI */
html.${ROOT} .eq-slot,
html.${ROOT} .interface-element-one-item-slot-background-to-repeat,
html.${ROOT} .interface-element-one-item-slot-2,
html.${ROOT} .skill-usable-slot{
 background-image:url("${I.slot}")!important;background-position:center!important;
 background-repeat:no-repeat!important;background-size:100% 100%!important;
}
html.${ROOT} .inventory-item,html.${ROOT} .item{filter:none!important}

/* 6. OKNA NI */
html.${ROOT} .c-window.border-window>.content,
html.${ROOT} .border-window>.content{
 background-image:url("${I.win}")!important;background-repeat:repeat!important;
}
html.${ROOT} .c-window .header-label-positioner,
html.${ROOT} .border-window .header-label-positioner{
 background-image:url("${I.header}")!important;background-repeat:repeat-x!important;background-size:auto 100%!important;
}
html.${ROOT} .header-label{color:var(--dgh)!important;text-shadow:0 1px 2px #000!important}
html.${ROOT} .c-window>.border-image,
html.${ROOT} .border-window>.border-image{
 background-image:url("${I.frame}")!important;background-size:100% 100%!important;pointer-events:none!important;
}

/* 7. PRZYCISKI HUD - tylko podmiana tła */
html.${ROOT} .main-buttons-container .widget-button,
html.${ROOT} .widget-in-interface-bar{
 background-image:url("${I.widget}")!important;background-size:100% 100%!important;
}

/* 8. DOLNY PANEL / HUD */
html.${ROOT} .hud-container,
html.${ROOT} .bottom-panel-of-bottom-positioner.bottom-panel{
 filter:sepia(.16) saturate(1.08) brightness(.92)!important;
}

/* Nigdy nie ruszamy świata/mapy ani geometrii. */
html.${ROOT} #GAME_CANVAS,
html.${ROOT} #base,
html.${ROOT} #bground,
html.${ROOT} .game-layer canvas,
html.${ROOT} .window-mode-background-layer{filter:none!important}
`;
function go(){
 if(!document.getElementById("teriash-dg-v5-style")){let s=document.createElement("style");s.id="teriash-dg-v5-style";s.textContent=css;(document.head||document.documentElement).appendChild(s)}
 document.documentElement.classList.add(ROOT);
}
go();
})();
