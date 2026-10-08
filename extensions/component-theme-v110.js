
(() => {
  if (!TDG) return;

  console.log("%cTDG component theme v11.0 LOADED", "color:#76ecf5;font-weight:bold");

  function tagFriends() {
    const root = document.querySelector("#friends");
    if (!root) return;

    root.classList.add("tg-window-scope", "tg-panel");

    document.querySelector("#myfriends")?.classList.add("tg-panel");
    document.querySelector("#myenemies")?.classList.add("tg-panel");

    root.querySelectorAll(".frbox").forEach(el => el.classList.add("tg-row"));

    // Bottom controls: parent containing the text input and action controls.
    root.querySelectorAll('input[type="text"]').forEach(input => {
      let p = input.parentElement;
      for (let i=0; p && i<3; i++, p=p.parentElement) {
        if (p === root) break;
        const r = p.getBoundingClientRect();
        if (r.height <= 70 && r.width >= root.getBoundingClientRect().width * .65) {
          p.classList.add("tg-social-footer");
          break;
        }
      }
    });

    // Small, full-width information strip such as "Ilość przyjaciół".
    const rr = root.getBoundingClientRect();
    [...root.children].forEach(el => {
      if (!(el instanceof HTMLElement)) return;
      if (el.id === "myfriends" || el.id === "myenemies") return;
      if (el.classList.contains("tg-social-footer")) return;
      const r = el.getBoundingClientRect();
      const text = (el.textContent || "").trim().toLowerCase();
      if (
        r.width >= rr.width * .65 &&
        r.height >= 16 && r.height <= 48 &&
        (/przyjaci|wrog|friend|enemy|ilość|ilosc|liczba/.test(text))
      ) {
        el.classList.add("tg-social-strip");
      }
    });

    const wnd = root.closest(".c-window.border-window");
    if (wnd) wnd.classList.add("tg-frame");
  }

  function tagClan() {
    const clan = document.querySelector(".clan");
    if (!clan) return;
    clan.classList.add("tg-window-scope", "tg-frame");
    document.querySelector("#clanmenu")?.classList.add("tg-panel");
    document.querySelector("#clanbox")?.classList.add("tg-panel");
  }

  function tagKnownLegacyWindows() {
    ["#dlgwin","#config","#console","#trade","#mailnotifier","#alert","#ask"].forEach(sel => {
      document.querySelectorAll(sel).forEach(el => el.classList.add("tg-window-scope","tg-panel"));
    });
  }

  function apply() {
    tagFriends();
    tagClan();
    tagKnownLegacyWindows();
    document.documentElement.dataset.tdgComponentTheme = "11.0";
  }

  const mo = new MutationObserver(() => {
    clearTimeout(mo._tg110);
    mo._tg110 = setTimeout(apply, 40);
  });

  mo.observe(document.documentElement, {childList:true, subtree:true});
  document.addEventListener("click", () => {
    setTimeout(apply, 25);
    setTimeout(apply, 160);
  }, true);

  setInterval(apply, 1000);
  apply();
})();
