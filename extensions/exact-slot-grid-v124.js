
(() => {
  if (!TDG) return;

  console.log("%cTDG exact 33px slots v12.4 LOADED", "color:#76ecf5;font-weight:bold");

  function mark() {
    const selectors = [
      ".inventory-grid-bg .interface-element-item-slot-grid-stretch",
      ".inventory-grid-bg .inventory-grid .inner-grid > .scroll-pane",
      "#shop_store",
      "#shop_buy",
      "#shop_sell",
      "#depo-items",
      "#mytr_items",
      "#tr2_items"
    ];

    let found = 0;
    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        if (!(el instanceof HTMLElement)) return;
        el.dataset.tdgExactGrid = "12.4";
        found++;
      });
    });

    document.documentElement.dataset.tdgSlots = "12.4";
    return found;
  }

  let last = -1;
  function run() {
    const found = mark();
    if (found !== last) {
      last = found;
      console.log("%cTDG exact slot grids v12.4:", "color:#81dbd5;font-weight:bold", found);
    }
  }

  const mo = new MutationObserver(() => {
    clearTimeout(mo._tg124);
    mo._tg124 = setTimeout(run, 50);
  });
  mo.observe(document.documentElement, {childList:true, subtree:true});

  document.addEventListener("click", () => {
    setTimeout(run, 30);
    setTimeout(run, 180);
  }, true);

  setInterval(run, 1200);
  run();
})();
