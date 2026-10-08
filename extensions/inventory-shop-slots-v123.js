
(() => {
  if (!TDG) return;

  console.log("%cTDG real slot squares v12.3 LOADED", "color:#76ecf5;font-weight:bold");

  const visible = el =>
    el instanceof HTMLElement &&
    el.isConnected &&
    el.getClientRects().length > 0;

  function median(values) {
    const v = values.filter(n => Number.isFinite(n) && n > 3).sort((a,b) => a-b);
    if (!v.length) return null;
    return v[Math.floor(v.length / 2)];
  }

  function directOrUsefulItems(root) {
    if (!(root instanceof HTMLElement)) return [];
    return [...root.querySelectorAll(".inventory-item")].filter(visible);
  }

  function findBestGridParent(items) {
    if (items.length < 2) return null;

    // Count ancestors shared by many item nodes. Choose the smallest useful one.
    const counts = new Map();

    for (const item of items) {
      let p = item.parentElement;
      for (let depth = 0; p && depth < 8; depth++, p = p.parentElement) {
        if (!(p instanceof HTMLElement)) continue;
        counts.set(p, (counts.get(p) || 0) + 1);
      }
    }

    const needed = Math.max(2, Math.ceil(items.length * .65));
    const candidates = [...counts.entries()]
      .filter(([el,count]) => count >= needed && visible(el))
      .map(([el,count]) => {
        const r = el.getBoundingClientRect();
        return {el,count,area:r.width*r.height,w:r.width,h:r.height};
      })
      .filter(x => x.w >= 55 && x.h >= 55 && x.w <= 700 && x.h <= 900)
      .sort((a,b) => a.area - b.area);

    return candidates[0]?.el || null;
  }

  function estimateGrid(parent, items) {
    const pr = parent.getBoundingClientRect();

    const coords = items
      .map(item => {
        const r = item.getBoundingClientRect();
        return {
          left: Math.round((r.left - pr.left) * 10) / 10,
          top: Math.round((r.top - pr.top) * 10) / 10,
          width: r.width,
          height: r.height
        };
      })
      .filter(p => p.width >= 15 && p.height >= 15);

    if (!coords.length) return null;

    const xs = [...new Set(coords.map(p => Math.round(p.left)))].sort((a,b)=>a-b);
    const ys = [...new Set(coords.map(p => Math.round(p.top)))].sort((a,b)=>a-b);

    const dx = [];
    const dy = [];

    for (let i=1;i<xs.length;i++) {
      const d = xs[i]-xs[i-1];
      if (d >= 20 && d <= 70) dx.push(d);
    }
    for (let i=1;i<ys.length;i++) {
      const d = ys[i]-ys[i-1];
      if (d >= 20 && d <= 70) dy.push(d);
    }

    // If only one row/column exists, fall back to actual item size.
    const itemW = median(coords.map(p => p.width)) || 33;
    const itemH = median(coords.map(p => p.height)) || 33;
    const pitchX = median(dx) || Math.round(itemW);
    const pitchY = median(dy) || Math.round(itemH);

    const minX = Math.min(...coords.map(p => p.left));
    const minY = Math.min(...coords.map(p => p.top));

    return {
      pitchX: Math.max(24, Math.min(55, Math.round(pitchX))),
      pitchY: Math.max(24, Math.min(55, Math.round(pitchY))),
      offX: Math.round(minX),
      offY: Math.round(minY)
    };
  }

  function markGrid(parent, items) {
    const grid = estimateGrid(parent, items);
    if (!grid) return;

    parent.classList.add("tg123-grid-surface");
    parent.style.setProperty("--tg123-slot-x", `${grid.pitchX}px`);
    parent.style.setProperty("--tg123-slot-y", `${grid.pitchY}px`);
    parent.style.setProperty("--tg123-off-x", `${grid.offX}px`);
    parent.style.setProperty("--tg123-off-y", `${grid.offY}px`);

    // ::after needs absolute containment, but don't alter positioned game layouts.
    const pos = getComputedStyle(parent).position;
    if (pos === "static") {
      // Use an inset box grid only via backgrounds if changing position could alter layout.
      // No position mutation here.
      parent.classList.add("tg123-no-overlay");
    }

    items.forEach(item => item.classList.add("tg123-item-cell"));
  }

  function markInventoryAndShops() {
    const items = [...document.querySelectorAll(".inventory-item")].filter(visible);
    if (!items.length) return;

    // Group by nearest window / inventory wrapper to avoid mixing unrelated grids.
    const groups = new Map();

    for (const item of items) {
      const scope =
        item.closest(".inventory-grid-bg") ||
        item.closest(".c-window.border-window") ||
        item.closest(".c-window") ||
        item.closest(".border-window") ||
        item.parentElement;

      if (!scope) continue;
      if (!groups.has(scope)) groups.set(scope, []);
      groups.get(scope).push(item);
    }

    for (const [, scopedItems] of groups) {
      if (scopedItems.length < 2) continue;
      const parent = findBestGridParent(scopedItems);
      if (parent) markGrid(parent, scopedItems);
    }
  }

  function markEquipmentSlots() {
    document.querySelectorAll(
      ".eq-slot:not(.skill-usable-slot), .interface-element-one-item-slot-background-to-repeat:not(.skill-usable-slot)"
    ).forEach(el => {
      if (el instanceof HTMLElement) el.classList.add("tg123-single-slot");
    });
  }

  function apply() {
    markInventoryAndShops();
    markEquipmentSlots();
    document.documentElement.dataset.tdgSlots = "12.3";
  }

  const mo = new MutationObserver(() => {
    clearTimeout(mo._tg123);
    mo._tg123 = setTimeout(apply, 60);
  });

  mo.observe(document.documentElement, {childList:true, subtree:true});

  document.addEventListener("click", () => {
    setTimeout(apply,30);
    setTimeout(apply,180);
  }, true);

  window.addEventListener("resize", () => setTimeout(apply,80));

  setInterval(apply,1200);
  apply();
})();
