
(() => {
  if (!TDG) return;

  console.log("%cTDG layout-safe component theme v11.1 LOADED", "color:#76ecf5;font-weight:bold");

  function safeWindowScope(el) {
    if (!el) return;
    el.classList.add("tg-window-scope");
  }

  function swapExistingBorderImage(el) {
    if (!(el instanceof HTMLElement)) return;
    const cs = getComputedStyle(el);
    const src = cs.borderImageSource || "none";
    // Swap only if the game already uses border-image.
    // This preserves border widths and therefore preserves geometry.
    if (src !== "none") el.classList.add("tg-border-swap");
  }

  function tagFriends() {
    const root = document.querySelector("#friends");
    if (!root) return;

    safeWindowScope(root);

    // Background only on the actual friends content. No frame, no positioning.
    const r = root.getBoundingClientRect();
    if (r.width < innerWidth * .75 && r.height < innerHeight * .95) {
      root.classList.add("tg-panel");
    }

    document.querySelector("#myfriends")?.classList.add("tg-panel");
    document.querySelector("#myenemies")?.classList.add("tg-panel");

    root.querySelectorAll(".frbox").forEach(el => el.classList.add("tg-row"));

    root.querySelectorAll('input[type="text"]').forEach(input => {
      let p = input.parentElement;
      for (let i=0; p && i<3; i++, p=p.parentElement) {
        if (p === root) break;
        const pr = p.getBoundingClientRect();
        if (pr.height <= 70 && pr.width >= r.width * .60) {
          p.classList.add("tg-social-footer");
          break;
        }
      }
    });

    [...root.children].forEach(el => {
      if (!(el instanceof HTMLElement)) return;
      if (el.id === "myfriends" || el.id === "myenemies") return;
      const er = el.getBoundingClientRect();
      const text = (el.textContent || "").trim().toLowerCase();
      if (
        er.width >= r.width * .60 &&
        er.height >= 16 && er.height <= 48 &&
        (/przyjaci|wrog|friend|enemy|ilość|ilosc|liczba/.test(text))
      ) {
        el.classList.add("tg-social-strip");
      }
    });

    // Only swap existing decorative borders.
    swapExistingBorderImage(root);
    const wnd = root.closest(".c-window.border-window");
    if (wnd) swapExistingBorderImage(wnd);
  }

  function tagClan() {
    // .clan is intentionally untouched: in this interface it is a layout
    // container, not the visible panel.
    const menu = document.querySelector("#clanmenu");
    const box = document.querySelector("#clanbox");

    if (menu) {
      safeWindowScope(menu);
      menu.classList.add("tg-panel");
      swapExistingBorderImage(menu);
    }
    if (box) {
      safeWindowScope(box);
      box.classList.add("tg-panel");
      swapExistingBorderImage(box);
    }
  }

  function tagKnownLegacyWindows() {
    ["#dlgwin","#config","#console","#trade","#mailnotifier","#alert","#ask"].forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        safeWindowScope(el);
        swapExistingBorderImage(el);
      });
    });
  }

  function swapNativeWindowBorders() {
    document.querySelectorAll(".c-window.border-window").forEach(wnd => {
      swapExistingBorderImage(wnd);
      const border = wnd.querySelector(":scope > .border-image");
      if (border) border.classList.add("tg-border-swap");
    });
  }

  function apply() {
    tagFriends();
    tagClan();
    tagKnownLegacyWindows();
    swapNativeWindowBorders();
    document.documentElement.dataset.tdgComponentTheme = "11.1";
  }

  const mo = new MutationObserver(() => {
    clearTimeout(mo._tg111);
    mo._tg111 = setTimeout(apply, 50);
  });

  mo.observe(document.documentElement, {childList:true, subtree:true});

  document.addEventListener("click", () => {
    setTimeout(apply, 30);
    setTimeout(apply, 180);
  }, true);

  setInterval(apply, 1000);
  apply();
})();
