// ==UserScript==
// @name         Teriash Galaxy v9.0 Main Clan Fix
// @namespace    https://github.com/Teriash/teriash-dark-gold
// @version      9.0.0
// @description  Modułowy Dark Gold dla Margonem NI - architektura rozszerzeń.
// @author       Teriash
// @match        https://*.margonem.pl/*
// @match        https://www.margonem.pl/guilds/*
// @match        https://*.margonem.com/*
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
  const ROOT = "teriash-galaxy-v90";
  const CACHE = Date.now().toString();

  const IS_GUILD_PAGE =
    location.hostname === "www.margonem.pl" &&
    location.pathname.startsWith("/guilds/");

  async function installGuildIframeThemeV89() {
    const SURFACE = `${RAW}/assets/clan/surface-v89.png?v=89`;
    const STRONG  = `${RAW}/assets/clan/surface-strong-v89.png?v=89`;
    const STRIP_H = `${RAW}/assets/clan/strip-h-v89.png?v=89`;
    const STRIP_V = `${RAW}/assets/clan/strip-v-v89.png?v=89`;
    const MENU    = `${RAW}/assets/clan/menu-v89.png?v=89`;
    const MENU_A  = `${RAW}/assets/clan/menu-active-v89.png?v=89`;

    const critical = document.createElement("style");
    critical.id = "tdg-guild-hard-v89";
    critical.textContent = `
html,body{background:#06111f!important;color:#d8f8ff!important}
body{background:#06111f url("${SURFACE}") center/cover no-repeat!important}

#clanbox,.clan,.clan-wrapper,.clan-window,.clan-main,.clan-page{
  background:#07172b url("${SURFACE}") center/cover no-repeat!important;
  color:#d8f8ff!important;border-color:#238eaa!important;
}

/* REKRUTACJA - elementy widoczne jako zielone/brązowe na screenie */
.clan-recruit-content,
.clan-recruit-content>.recruit-section,
.clan-recruit-content .recruit-section,
.clan-recruit-content .scroll-wrapper,
.clan-recruit-content .scroll-pane,
.clan-recruit-content .background-wrapper,
.clan-recruit-content .section-recruit-main,
.clan-recruit-content .clan-part-0,
.clan-recruit-content .clan-part-1,
.clan-recruit-content .clan-part-2{
  background:#07172b url("${SURFACE}") center/cover no-repeat!important;
  background-color:#07172b!important;
  color:#d8f8ff!important;border-color:#238eaa!important;
}

.clan-recruit-header-option,
.clan-recruit-header-atribute,
.clan-recruit-header-0,
.clan-recruit-header-1,
.clan-recruit-header-2{
  background:#082139 url("${STRIP_H}") center/100% 100% no-repeat!important;
  color:#e8fbff!important;border:1px solid #2aa4c1!important;
}

/* Wiersze atrybutów - zero zieleni */
.one-clan-atribute,
.one-clan-atribute>*,
.atribute-name-wrapper,
.atribute-value-wrapper,
.invite-to-clan{
  background-color:rgba(5,29,49,.92)!important;
  background-image:none!important;
  color:#d8f8ff!important;
  border-color:#248eaa!important;
}

/* Górne zakładki */
.clan-recruit-menu,
.cards-header-wrapper,
.cards-header,
.header-background-graphic{
  background:#061727!important;background-image:none!important;border-color:#279fbd!important;
}
.clan-recruit-menu .card,.cards-header .card{
  background:#07172b url("${MENU}") center/100% 100% no-repeat!important;
  color:#d8f8ff!important;border:1px solid #248faa!important;
}
.clan-recruit-menu .card.active,.cards-header .card.active{
  background-image:url("${MENU_A}")!important;border-color:#76ecf5!important;color:#f2fdff!important;
}

/* Lewe menu */
[id^="clan-"][id$="-item-menu"],
[name^="clan-"][name$="-item-menu"],
.clan-menu-item,.clan-menu .item,.clan .menu-item{
  background:#07172b url("${MENU}") center/100% 100% no-repeat!important;
  color:#d8f8ff!important;border:1px solid #248faa!important;
}
[id^="clan-"][id$="-item-menu"].active,
[name^="clan-"][name$="-item-menu"].active,
.clan-menu-item.active,.clan-menu .item.active,.clan .menu-item.active{
  background-image:url("${MENU_A}")!important;border-color:#76ecf5!important;color:#f2fdff!important;
}

/* Stare przyciski */
.btn.SI-button,.big-button,button,input[type="button"],input[type="submit"]{
  background:#07172b url("${MENU}") center/100% 100% no-repeat!important;
  color:#e8fbff!important;border:1px solid #2aa9c7!important;
}
.btn.SI-button>.left,.btn.SI-button>.right,.btn.SI-button>.label,
.big-button>.left,.big-button>.right,.big-button>.content{
  background:none!important;background-image:none!important;color:#e8fbff!important;
}

/* Tabele i panele */
.clan-members-table,.clan-list-table,.recruit-candidate-table,.recruit-invite-table,.members,.rankstable{
  background:rgba(4,21,38,.86)!important;color:#d8f8ff!important;border:1px solid #218fab!important;
}
.clan-members-table th,.clan-list-table th,.recruit-candidate-table th,.recruit-invite-table th,.members th,.rankstable th{
  background:linear-gradient(180deg,#0a3b58,#07233a)!important;color:#e6fbff!important;border:1px solid #24a2c2!important;
}
.clan-members-table td,.clan-list-table td,.recruit-candidate-table td,.recruit-invite-table td,.members td,.rankstable td{
  background:rgba(5,28,48,.84)!important;color:#d8f8ff!important;border:1px solid #218ba8!important;
}

/* klasy nakładane bezpośrednio przez skaner */
.tdg89-surface{background:#07172b url("${SURFACE}") center/cover no-repeat!important;color:#d8f8ff!important;border-color:#238eaa!important}
.tdg89-horizontal{background:#082139 url("${STRIP_H}") center/100% 100% no-repeat!important;border-color:#2aa4c1!important}
.tdg89-vertical{background:#082139 url("${STRIP_V}") center/100% 100% no-repeat!important;border-color:#2aa4c1!important}
.tdg89-button{background:#07172b url("${MENU}") center/100% 100% no-repeat!important;color:#e8fbff!important;border-color:#279fbd!important}
`;
    (document.head || document.documentElement).appendChild(critical);

    const skip = /icon|outfit|avatar|logo|character|sprite|picture|item-id|inventory|cl_logo|skill-icon|quest-bring-item|npc|hero/i;

    function rgb(value){
      const m=String(value||"").match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
      return m ? [Number(m[1]),Number(m[2]),Number(m[3])] : null;
    }

    function isLegacyColor(v){
      if(!v) return false;
      const [r,g,b]=v;
      const green=(g>r*1.18 && g>b*1.05 && g>30 && r<100);
      const brown=(r>b*1.28 && g>b*1.20 && r>40 && g>22 && b<85);
      const gray=(Math.max(r,g,b)-Math.min(r,g,b)<28 && r>18 && r<150);
      const beige=(r>150 && g>120 && b<145);
      return green||brown||gray||beige;
    }

    function classify(el){
      const key=`${el.id||""} ${typeof el.className==="string"?el.className:""}`;
      if(skip.test(key)) return;

      const rect=el.getBoundingClientRect();
      if(rect.width<8||rect.height<8) return;

      const cs=getComputedStyle(el);
      const bg=rgb(cs.backgroundColor);
      const img=cs.backgroundImage||"";
      const legacyImg=img!=="none" && !/surface-v89|strip-h-v89|strip-v-v89|menu-v89|menu-active-v89|cdn\.jsdelivr\.net\/gh\/Teriash\/teriash-dark-gold/i.test(img);
      const legacy=isLegacyColor(bg)||legacyImg;

      const exactRecruit=/clan-recruit|background-wrapper|clan-part-|one-clan-atribute|atribute-|recruit-section|cards-header|header-background-graphic/i.test(key);
      const exactMenu=/item-menu|card|menu|button|btn/i.test(key);

      if(exactRecruit){
        if(/header|strip/i.test(key) && rect.height<=100) el.classList.add("tdg89-horizontal");
        else if(exactMenu) el.classList.add("tdg89-button");
        else el.classList.add("tdg89-surface");
        return;
      }

      if(!legacy || rect.width*rect.height<700) return;

      if(exactMenu || (rect.height<=74 && rect.width>=70 && rect.width<=520)){
        el.classList.add("tdg89-button");
      }else if(rect.width>150 && rect.height<=95){
        el.classList.add("tdg89-horizontal");
      }else if(rect.height>150 && rect.width<=145){
        el.classList.add("tdg89-vertical");
      }else if(rect.width>90 && rect.height>50){
        el.classList.add("tdg89-surface");
      }
    }

    function sweep(){
      const root=document.querySelector(".clan")||document.querySelector("#clanbox")||document.body;
      root.querySelectorAll("*").forEach(classify);

      /* Twarde bezpośrednie nadpisanie dokładnie tych elementów, które widać jako stare. */
      [
        ".clan-recruit-content",
        ".clan-recruit-content .section-recruit-main",
        ".clan-recruit-content .background-wrapper",
        ".clan-recruit-content .clan-part-0",
        ".clan-recruit-content .clan-part-1",
        ".clan-recruit-content .clan-part-2"
      ].forEach(sel=>{
        document.querySelectorAll(sel).forEach(el=>{
          el.style.setProperty("background-color","#07172b","important");
          el.style.setProperty("background-image",`url("${SURFACE}")`,"important");
          el.style.setProperty("background-size","cover","important");
          el.style.setProperty("background-position","center","important");
          el.style.setProperty("border-color","#238eaa","important");
        });
      });

      [
        ".clan-recruit-header-option",
        ".clan-recruit-header-atribute",
        ".clan-recruit-header-0",
        ".clan-recruit-header-1",
        ".clan-recruit-header-2"
      ].forEach(sel=>{
        document.querySelectorAll(sel).forEach(el=>{
          el.style.setProperty("background-color","#082139","important");
          el.style.setProperty("background-image",`url("${STRIP_H}")`,"important");
          el.style.setProperty("background-size","100% 100%","important");
          el.style.setProperty("background-position","center","important");
        });
      });

      document.documentElement.dataset.tdgGuildScan="8.9";
    }

    sweep();

    const observer=new MutationObserver(()=>{
      clearTimeout(observer._tdgTimer);
      observer._tdgTimer=setTimeout(sweep,50);
    });
    observer.observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:["class","style"]});

    document.addEventListener("click",()=>setTimeout(sweep,40),true);
    setTimeout(sweep,150);
    setTimeout(sweep,500);
    setTimeout(sweep,1200);

    console.log("%cTDG guild iframe v8.9 ACTIVE","color:#76ecf5;font-weight:bold");
  }

  if (IS_GUILD_PAGE) {
    installGuildIframeThemeV89();
    return;
  }

  // Do nothing on other www.margonem.pl pages.
  if (location.hostname === "www.margonem.pl") return;


  const CSS = [
    "theme/base.css",
    "theme/hud.css",
    "theme/chat.css",
    "theme/equipment.css",
    "theme/windows.css",
    "theme/tooltips.css",
    "theme/lootlog.css",
    "theme/npc-tips.css",
    "theme/clan-main.css"
  ];

  const EXTENSIONS = [
    "extensions/engine.js",
    "extensions/npc-tips.js",
    "extensions/map-mark.js",
    "extensions/clan-theme.js"
  ];

  window.__TDG = {
    version: "9.0.0",
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
    console.log("%cTeriash Galaxy v9.0 Main Clan Fix", "color:#e8c66b;font-weight:700", "loaded");
  } catch (e) {
    console.error("[TDG] loader error", e);
  }
})();
