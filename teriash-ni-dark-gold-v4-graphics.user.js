// ==UserScript==
// @name         Teriash NI - Dark Gold v4 Graphics
// @namespace    https://github.com/Teriash
// @version      4.0.0
// @description  Graficzny skin NI: assety PNG + bez zmiany geometrii interfejsu.
// @author       Teriash
// @match        https://*.margonem.pl/*
// @match        http://*.margonem.pl/*
// @run-at       document-start
// ==/UserScript==

(() => {
  'use strict';
  const ROOT = 'teriash-dg-v4';
  const KEY = 'teriash-dg-v4-enabled';
  const enabled = localStorage.getItem(KEY) !== '0';

  const urls = {"right": "data:image/png;base64,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", "chat": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAEACAYAAADFkM5nAAAFJ0lEQVR4nO3dMW4TQRiA0Q1aKSRCIAoQdBQgSiRarkCBOCgVV+AAlAgKOlCoqEiqoYCIZO10ZC3ne6/Z8djF3/nzWPYe3L97dDoBACnzGGPXMwAAK5vPF88eHx3uchAA4Pp9/vbrbJouBMA0TdPzh5svfPvq3joTAQD/zbsPPzf2Pp38W8/LJ99//FMGFx5fw1gAwJpev7h80r8RANM0TU8eHPo6AABuiK8/zs6We1sD4KoXAwD75aoP9bfWHgQA2D0BAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAImsdiYyyuAMB+G1vWTgAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAoHnjT//dDAAAbpYtNwNwAgAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgaB6LjbG4AgD7bWxZOwEAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABA0DyNcXnn/PFyHwDYTxff0/+unQAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQNA8FhtjcQUA9tvYsnYCAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAEDRPY7EzFlcAYL+NzbUTAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABA0OxeQABws225F5ATAAAoEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABA0HzVE08f3T5ccxAAYD1bA+DL99OztQcBANazEQBvXh775A8AN9ylAPh0sqsxAIA1Hdw5Pjzd9RAAwLr8CgAAgn4DmHRM/aCVeiQAAAAASUVORK5CYII=", "win": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYAAAAEACAYAAAC6d6FnAAAFaElEQVR4nO3cvW4cZRiA0QlaySRCIAoQdBRgpDRItFxCLItwoUSKnEvgAmgiJVDQgUJFhbcaClixXu96f/yzXj/nNDuetSdTfc/3TqR59PGHj88HAHIm4zju+x4A2IPJ7OCrzx8f7fNGALgbv/z+93QY5gIwDMPw9aeXf/GH7z66mzsC4Eb9+NNfl869eff/8WTxy7Of/y3D3M+3cFsA3LWTby4+6bkUgGEYhi8+OfI4COAB+e3P6XTx3NIArPplAA7Pqk39e+v+8PWLZ6YBgAOzydq9cgKYv8AmF3r6/JWJAeAObLoxf/3i2dFVa/OVAXj6/NV03QXWfQ/AzbqptfnKAMz+oVUXv+p7AG7PLAKz42Xfr7vG2gAsY9cPsH+zdXjXNXntfwID8DBtHQC7f4D7Zf5x0DZMAABRWwXA7h/gftplCjABAERtFQC7f4D7a9s12gQAECUAAFECABAlAABRAgAQJQAAUQIAECUAAFECABAlAABRAgAQJQAAUQIAECUAAFECABAlAABRAgAQJQAAUQIAECUAAFECABAlAABRAgAQJQAAUQIAECUAAFECABAlAABRAgAQJQAAUQIAECUAAFECABAlAABRk3HhxLjwCcDhG5ccmwAAogQAIEoAAKIEACBKAACiBAAgSgAAogQAIEoAAKIEACBKAACiJpde+uNlQAAPz5KXAZkAAKIEACBKAACiBAAgSgAAogQAIEoAAKIEACBKAACiBAAgSgAAogQAIEoAAKIEACBKAACiBAAgSgAAogQAIEoAAKIEACBKAACiBAAgSgAAogQAIEoAAKIEACBKAACiBAAgSgAAogQAIEoAAKIEACBKAACiBAAgSgAAogQAIEoAAKIEACBqMi6cGBc+ATh845JjEwBAlAAARAkAQJQAAEQJAECUAABECQBAlAAARAkAQJQAAEQJAECUAABECQBAlAAARAkAQJQAAEQJAECUAABECQBAlAAARAkAQJQAAEQJAECUAABETYZxvHhm9vPieQAO1/ya/t+xCQAgSgAAogQAIEoAAKIEACBKAACiBAAgSgAAogQAIEoAAKIEACBKAACiBAAgSgAAogQAIEoAAKIEACBKAACiBAAgSgAAogQAIEoAAKIEACBKAACiBAAgajIunBgXPgE4fOOSYxMAQJQAAEQJAECUAABECQBAlAAARAkAQJQAAEQJAECUAABECQBAlAAARAkAQJQAAEQJAECUAABECQBAlAAARAkAQJQAAEQJAECUAABECQBAlAAARAkAQJQAAEQJAECUAABECQBAlAAARAkAQJQAAEQJAECUAABECQBAlAAARAkAQNRkGBfOjAufABy+8fKxCQAgSgAAogQAIEoAAKIEACBKAACiBAAgSgAAogQAIEoAAKIEACBKAACiJt4FB/DwLXkXnAkAoEoAAKIEACBKAACiBAAgSgAAogQAIEoAAKIEACBKAACiBAAgSgAAogQAIEoAAKIEACBKAACiBAAgSgAAogQAIEoAAKIEACBKAACiBAAgSgAAogQAIEoAAKIEACBKAACiBAAgSgAAogQAIEoAAKIEACBqqwC8fXlydFs3AsD1bLtGmwAAorYKwPHp2dQUAHD/vH15cnR8ejbd5m9MAABRWwfAFABwv+yy+x8GEwBA1mSXP5qfAnapDgDXd911eO0EsOpxz/Hp2dTjIID9mD32WbX4b7I2XzkBzC6w7kK7Pn8CYHs3tTZfGYDZDt/iDnB/bLImb7J2r30EZPEHODybrN0rJ4AvP3vfs32AB2xpAH7949yuH+CBuxSA7799YucPEHAhAG/e7es2ALhrjz54cnS+75sA4O55FQRA1D/MouuOViYrHAAAAABJRU5ErkJggg==", "bar": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAAgCAYAAABkS8DlAAABj0lEQVR4nO3cvU7CUBiA4ZZ0MNWlscTfeA/uXgJOrg6Co/ZmQEe5CkevxwUTJ1nrQEh0giot0e95km6Q9+vEyaE96evLVZ0AAKGk1xeFBQAABJOeHux9bHsIAKBbvaROkibX+KbMm37nN5eenp6enp7e5q9ek8+Ph2U+eX5PxsMy7+L+9fT09PT09NpppCf99f4CmIwWwyxVgyKppm/zdb77E3p6enp6enrt9dLj/u7KBcDDqP9tmK9D3U9nGx9KT09PT09Pr91eb50P3U9n82pQtD6Mnp6enp6eXje99KhcvQOw9Hi7WJlUgyK5e2rn5vX09PT09PTa7zVaACyH6uLm9fT09PT09NrrpYf7zRYAAMDfly1eBgAAIslqv/8AEM5abwEAAP9LZgMAAOLJPAIAAPFktRUAAIRjBwAAAvIMAAAE5C0AAAjIOQAAEJCTAAEgIDsAABCQZwAAICA7AAAQkB0AAAjISYAAEJCTAAEgICcBAkBAdgAAIKDs8jzPtz0EANCt9KzcsQcAAMF8AqbDgClIVXy5AAAAAElFTkSuQmCC", "header": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYAAAAAcCAYAAABoFGgzAAABZ0lEQVR4nO3bPU4CQRiA4R2yhVltiEv8jXew9whY2Vr4V4lcBtRKPQWl57GhoNJ2rTRGE7OoA4nf8yQUFMw7NEw+djc9PR41BQDhpOODrgMAIKC0u7H2vOxNALB4naIpinleo5O6mvczv3np6enp6eXpdeZZb3RaV+PJrBid1tUi9q+np6enl6+Xdnqrrf4CGp/1qvFk9v5+2O8Ww4fpS5vP/oSenp6eXt5e2m5xAFx/WuzjolcZvoSenp6eXv5e2qrbTQA3519PlMF9vhNMT09PTy9vr9N2wcH99GXY73672F/S09PT08vbS5vr7SaAN7cXveryLu/m9fT09PTy99LmeuU5AICAyqZZ9hYAWIbS7z9ATGXhBAAIqWycAAAhmQAAgnINACAodwEBBNX6SWAA/peyMQIAhGQCAAjKNQCAoNwFBBBUWRgBAEIyAQAE5UlggKDKw/2qWvYmAFi8tFevmAEAAnoFg5X4bIxDddsAAAAASUVORK5CYII=", "frame": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAADNUlEQVR4nO3aMU7jQBhA4fEqLQVtREGBOAVlTpC03IMz5B604QKkpKDhAogiBUpLwQG8xcrgOI6xx5PY7Htfs7JYJSPP8z9ZsiEILQshhNub83zohej07p8+sj9DL0LDmpQv7p8+sqEWotMpT/xJ9YfXF2dvp12OTun1/fOqfL0XQN1f0v+h7uGuDaDwcHf5NSrmy43Hwy/Sdu8OBlB+geI6JoLtepFPZyvjibBdL6L+dfb8+LJz3bR3jRMg1YKMYLw6BRDLze+vyz2sTu8mBwOYLzfZ3jmy3Pz4guUp4cb3M52tsuJ+Fn+2uae1e3dA4wTocuZXjwc3P43iPpZDaBtBm9dP8pvA6lPv5qdXvqfb9SKP/TxWlfRXwW78cVUfrhQR+F3AL5TyQesdQJcPJ0qn+tkglhMAzgDgegXg+B9WimPACQAXHYBP/zj0nQJOADgDgIsKwPE/Ln2OAScAXNT/B/DJH5/YPXECwBkAnAHAGQCcAcAZAJwBwBkAnAHAGQCcAcAZAJwBwBkAnAHAGQCcAcAZAJwBwBkAnAHAGQCcAcAZAJwBwBkAnAHAGQCcAcAZAJwBwBkAnAHAGQCcAcAZAJwBwBkAnAHAGQCcAcAZAJwBwBkAnAHAGQCcAcAZAJwBwBkAnAHAGQCcAcAZAJwBwBkAnAHAGQCcAcAZAJwBwBkAnAHAGQCcAcAZAJwBwBkAnAHAGQCcAcAZAJwBwBkAnAHAGQCcAcB1DmC7XuTb9SI/xmIUp8+eOAHgOgcwna2yEP5Vl3456qrYh2JfunICwBkAXFQAHgPj0Hf8h+AEwIsOwCkwrBRPfwhOADwDgOsVgMfAMFKN/xASTgAj+J16B1Cu0O8Jji/1/U0yAaazVVYNIcXr6lv14Uox/kMIYdL0w4e7y683nC83P77hdLbKikWmPKfoYja+7d4dDKD8AsV12whC+F70dr3IjSBO3SRtM12fH192rpv2rnECxLy50jjVve4UgE6nOE5jpmd1ejc5GMB8ucn2zpHlputa1EPs0Vm7dwc0ToA2Z77Gqe3e1QZwfXH2lnY5Gqu9AF7fP6+GWIiGsRPA7c25n/Jh/DZQIvsL8pctC/fiGT8AAAAASUVORK5CYII=", "slot": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAA2klEQVR4nO3YMQqCUBzH8Z8lCA4+kDc2eAEJXL2EuLR1iC4QXaBDtLWEl2gVvEOjCC5CQ9hghmhE8Ieew+87vfemD2/8WWHgtZhxNgAcNv774XKtjWEAII3V+7w/Vx1wWJY35V9Fo9JY6eF9AtTK0eM3k1lh4LXr1RJZ3pRaObqs70Z/sDckkauL2wMLk5hfIlAagdIIlEagNAKlESiNQGkESiNQGoHSCJRGoDQCpREojUBpNtDNrv2yuTtVRgfM49YHAA0AxacJ2PSAiReubwJMInd+E7BpxLee7OwpCDhtAfUAAAAASUVORK5CYII="};

  const css = `
html.${ROOT} {
  --dg-gold:#b77b20;
  --dg-gold-hi:#e6bc53;
  --dg-text:#ead8a7;
}

/* WAŻNE: żadnych width/height/top/left/padding/margin/transform */
html.${ROOT} .game-window-positioner .interface-layer,
html.${ROOT} .game-window-positioner .right-column,
html.${ROOT} .game-window-positioner .right-panel,
html.${ROOT} .game-window-positioner .interface-right-column {
  background-image:url("${urls.right}") !important;
  background-repeat:repeat !important;
}

/* prawy panel / wyposażenie - tylko tło */
html.${ROOT} .equipment-wrapper,
html.${ROOT} .inventory-wrapper,
html.${ROOT} .stats-section {
  background-image:url("${urls.right}") !important;
  background-repeat:repeat !important;
}

/* sloty - grafika 40x40, nie zmienia rozmiaru elementu */
html.${ROOT} .eq-slot,
html.${ROOT} .inventory-slot {
  background-image:url("${urls.slot}") !important;
  background-repeat:no-repeat !important;
  background-position:center !important;
  background-size:100% 100% !important;
}

/* przedmioty zostają oryginalne */
html.${ROOT} .inventory-item,
html.${ROOT} .item {
  filter:none !important;
}

/* chat */
html.${ROOT} .chat-wrapper,
html.${ROOT} .chat-content,
html.${ROOT} .chat-message-wrapper {
  background-image:url("${urls.chat}") !important;
  background-repeat:repeat !important;
}
html.${ROOT} .new-chat-message,
html.${ROOT} .chat-input-wrapper {
  background-image:url("${urls.bar}") !important;
  background-repeat:repeat-x !important;
}
html.${ROOT} .chat-message-wrapper { color:var(--dg-text) !important; }

/* belki i nagłówki */
html.${ROOT} .interface-element-bottom-bar-background-stretch,
html.${ROOT} .bottom-bar,
html.${ROOT} .widget-bar {
  background-image:url("${urls.bar}") !important;
  background-repeat:repeat-x !important;
}
html.${ROOT} .c-window .header-label-positioner,
html.${ROOT} .border-window .header-label-positioner {
  background-image:url("${urls.header}") !important;
  background-repeat:repeat-x !important;
}
html.${ROOT} .c-window .header-label .text,
html.${ROOT} .border-window .header-label .text {
  color:var(--dg-gold-hi) !important;
  text-shadow:0 1px 2px #000 !important;
}

/* okna - bez ruszania geometrii */
html.${ROOT} .c-window > .content,
html.${ROOT} .border-window > .content {
  background-image:url("${urls.win}") !important;
  background-repeat:repeat !important;
}
html.${ROOT} .c-window > .border-image,
html.${ROOT} .border-window > .border-image {
  background-image:url("${urls.frame}") !important;
  background-size:100% 100% !important;
  pointer-events:none !important;
}

/* złote akcenty bez zmiany wymiarów */
html.${ROOT} .stats-section,
html.${ROOT} .equipment-wrapper,
html.${ROOT} .chat-wrapper {
  box-shadow:inset 0 0 0 1px rgba(183,123,32,.65),
             inset 0 0 0 2px rgba(0,0,0,.55) !important;
}
html.${ROOT} .stat-row { color:var(--dg-text) !important; }
html.${ROOT} .active,
html.${ROOT} .selected { border-color:var(--dg-gold) !important; }

/* Nigdy nie styluj świata/mapy */
html.${ROOT} #base,
html.${ROOT} #bground,
html.${ROOT} canvas,
html.${ROOT} #GAME_CANVAS,
html.${ROOT} .game-canvas {
  filter:none !important;
}

#teriash-dg-v4-toggle{
  position:fixed;right:8px;bottom:8px;z-index:2147483646;
  width:34px;height:30px;box-sizing:border-box;
  display:flex;align-items:center;justify-content:center;
  background:#0d0b07;border:1px solid #b77b20;color:#e6bc53;
  font:700 10px Arial;cursor:pointer;border-radius:4px;
}
`;

  function installStyle(){
    if (document.getElementById('teriash-dg-v4-style')) return;
    const s=document.createElement('style');
    s.id='teriash-dg-v4-style';
    s.textContent=css;
    (document.head || document.documentElement).appendChild(s);
  }
  function apply(on){
    document.documentElement.classList.toggle(ROOT,on);
    localStorage.setItem(KEY,on?'1':'0');
    const b=document.getElementById('teriash-dg-v4-toggle');
    if(b){ b.textContent=on?'DG':'OFF'; b.title='Dark Gold v4 Graphics'; }
  }
  function button(){
    if(!document.body || document.getElementById('teriash-dg-v4-toggle')) return;
    const b=document.createElement('div');
    b.id='teriash-dg-v4-toggle';
    b.onclick=()=>apply(!document.documentElement.classList.contains(ROOT));
    document.body.appendChild(b);
    apply(document.documentElement.classList.contains(ROOT));
  }

  installStyle();
  if(enabled) document.documentElement.classList.add(ROOT);
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',button,{once:true});
  else button();
})();