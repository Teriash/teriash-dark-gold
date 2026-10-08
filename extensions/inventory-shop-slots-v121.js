
(() => {
  if (!TDG) return;

  console.log("%cTDG inventory/shop slots v12.1 LOADED", "color:#76ecf5;font-weight:bold");

  function visible(el) {
    return el instanceof HTMLElement &&
      el.isConnected &&
      el.getClientRects().length > 0;
  }

  function looksLikeItemGrid(el) {
    if (!(el instanceof HTMLElement)) return false;
    const r = el.getBoundingClientRect();
    if (r.width < 64 || r.height < 64) return false;

    const items = el.querySelectorAll(":scope > .inventory-item, :scope > .item.inventory-item");
    if (items.length >= 2) return true;

    const nested = el.querySelectorAll(".inventory-item");
    return nested.length >= 4;
  }

  function tagInventoryGrid() {
    document.querySelectorAll(".inventory-grid-bg").forEach(wrapper => {
      if (!(wrapper instanceof HTMLElement)) return;
      wrapper.classList.add("tg121-grid-wrapper");

      const stretch = wrapper.querySelector(".interface-element-item-slot-grid-stretch");
      if (stretch) stretch.classList.add("tg121-item-grid");

      const pane = wrapper.querySelector(".inventory-grid .scroll-pane");
      if (pane) pane.classList.add("tg121-item-grid");
    });
  }

  function tagDynamicShopGrids() {
    document.querySelectorAll(".c-window, .border-window").forEach(win => {
      if (!(win instanceof HTMLElement) || !visible(win)) return;

      const key = `${win.id || ""} ${typeof win.className === "string" ? win.className : ""}`.toLowerCase();
      const text = (win.textContent || "").toLowerCase();

      // Only treat the window as shop-like if its DOM or visible text suggests it.
      const shopLike =
        /shop|store|merchant|sklep|handel|kup|sprzed/.test(key) ||
        /sklep|kup|sprzedaj|sprzedaz|sprzedaż|towary|oferta/.test(text);

      if (!shopLike) return;

      win.querySelectorAll("*").forEach(el => {
        if (!(el instanceof HTMLElement)) return;

        const cls = typeof el.className === "string" ? el.className : "";

        if (
          cls.includes("interface-element-item-slot-grid-stretch") ||
          (looksLikeItemGrid(el) && /grid|list|store|shop|items/i.test(`${el.id || ""} ${cls}`))
        ) {
          el.classList.add("tg121-item-grid");
          el.parentElement?.classList.add("tg121-grid-wrapper");
        }

        if (
          /item-slot|one-item-slot|shop-slot|store-slot/i.test(cls) &&
          !cls.includes("skill-usable-slot")
        ) {
          el.classList.add("tg121-shop-slot");
        }
      });
    });
  }

  function tagSingleSlots() {
    document.querySelectorAll(
      ".eq-slot:not(.skill-usable-slot), .interface-element-one-item-slot-background-to-repeat:not(.skill-usable-slot)"
    ).forEach(el => {
      if (el instanceof HTMLElement) el.classList.add("tg121-single-slot");
    });
  }

  function apply() {
    tagInventoryGrid();
    tagSingleSlots();
    tagDynamicShopGrids();
    document.documentElement.dataset.tdgSlots = "12.1";
  }

  const mo = new MutationObserver(() => {
    clearTimeout(mo._tg121);
    mo._tg121 = setTimeout(apply, 50);
  });

  mo.observe(document.documentElement, {
    childList:true,
    subtree:true
  });

  document.addEventListener("click", () => {
    setTimeout(apply, 30);
    setTimeout(apply, 180);
  }, true);

  setInterval(apply, 1200);
  apply();
})();
