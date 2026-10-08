
(() => {
  if (!TDG) return;

  console.log("%cTDG LIVE slot detector v12.5 LOADED", "color:#76ecf5;font-weight:bold");

  const TILE = TDG.asset("equipment/slot-grid-live-v125.png");

  const isVisible = el =>
    el instanceof HTMLElement &&
    el.isConnected &&
    el.getClientRects().length > 0 &&
    getComputedStyle(el).visibility !== "hidden";

  function rect(el) {
    return el.getBoundingClientRect();
  }

  function isItemSized(el) {
    if (!(el instanceof HTMLElement)) return false;
    const r = rect(el);
    return r.width >= 27 && r.width <= 42 && r.height >= 27 && r.height <= 42;
  }

  function findItemWrapper(icon) {
    // Current/older known item classes first.
    const known = icon.closest(".inventory-item, .item");
    if (known && isItemSized(known)) return known;

    // Live-DOM fallback: climb to the first approximately 32x32 wrapper.
    let p = icon.parentElement;
    for (let i = 0; p && i < 6; i++, p = p.parentElement) {
      if (isItemSized(p)) return p;
    }
    return null;
  }

  function collectItemWrappers() {
    const set = new Set();

    // Actual Margonem item icon canvases.
    document.querySelectorAll(
      "canvas.canvas-icon, canvas.icon[width='32'][height='32'], canvas[width='32'][height='32']"
    ).forEach(icon => {
      if (!isVisible(icon)) return;
      const wrapper = findItemWrapper(icon);
      if (wrapper) set.add(wrapper);
    });

    // Image fallback for windows that render icons as <img>.
    document.querySelectorAll("img").forEach(img => {
      if (!isVisible(img)) return;
      const r = rect(img);
      if (r.width < 27 || r.width > 36 || r.height < 27 || r.height > 36) return;

      const wrapper = findItemWrapper(img);
      if (wrapper) set.add(wrapper);
    });

    return [...set];
  }

  function ancestorChain(el, limit = 9) {
    const out = [];
    let p = el.parentElement;
    for (let i = 0; p && i < limit; i++, p = p.parentElement) {
      if (!(p instanceof HTMLElement)) continue;
      out.push(p);
    }
    return out;
  }

  function chooseGridParents(items) {
    // Group item ancestors by how many item wrappers they contain.
    const counts = new Map();

    for (const item of items) {
      for (const a of ancestorChain(item)) {
        counts.set(a, (counts.get(a) || 0) + 1);
      }
    }

    const candidates = [];

    for (const [el, count] of counts) {
      if (count < 2 || !isVisible(el)) continue;

      const r = rect(el);
      if (r.width < 60 || r.height < 40) continue;
      if (r.width > 760 || r.height > 1000) continue;

      const inside = items.filter(item => el.contains(item));
      if (inside.length < 2) continue;

      // Determine whether item coordinates form a 33px-ish grid.
      const er = r;
      const points = inside.map(item => {
        const ir = rect(item);
        return {
          x: Math.round(ir.left - er.left),
          y: Math.round(ir.top - er.top),
          w: ir.width,
          h: ir.height
        };
      });

      const xs = [...new Set(points.map(p => p.x))].sort((a,b)=>a-b);
      const ys = [...new Set(points.map(p => p.y))].sort((a,b)=>a-b);

      const diffs = arr => {
        const d = [];
        for (let i=1;i<arr.length;i++) {
          const v = arr[i]-arr[i-1];
          if (v >= 27 && v <= 40) d.push(v);
        }
        return d;
      };

      const dx = diffs(xs);
      const dy = diffs(ys);

      // One-row / one-column bags still count if several items are aligned.
      const gridEvidence =
        dx.length >= 1 ||
        dy.length >= 1 ||
        (inside.length >= 4 && points.every(p => p.w >= 27 && p.w <= 42 && p.h >= 27 && p.h <= 42));

      if (!gridEvidence) continue;

      // Prefer a compact actual list/grid container over the whole window.
      const itemArea = inside.length * 33 * 33;
      const area = r.width * r.height;
      const score =
        Math.abs(Math.min(area / Math.max(itemArea,1), 50) - 4) +
        (r.width > 500 ? 3 : 0) +
        (r.height > 700 ? 3 : 0);

      candidates.push({el, inside, points, score, area});
    }

    candidates.sort((a,b) => a.score - b.score || a.area - b.area);

    // Keep non-overlapping best candidates.
    const selected = [];
    const claimed = new Set();

    for (const c of candidates) {
      const newItems = c.inside.filter(i => !claimed.has(i));
      if (newItems.length < 2) continue;

      c.inside = newItems;
      selected.push(c);
      newItems.forEach(i => claimed.add(i));
    }

    return selected;
  }

  function median(values) {
    const v = values.filter(n => Number.isFinite(n)).sort((a,b)=>a-b);
    return v.length ? v[Math.floor(v.length/2)] : null;
  }

  function inferPitch(points) {
    const unique = key => [...new Set(points.map(p => p[key]))].sort((a,b)=>a-b);

    const getDiffs = arr => {
      const out = [];
      for (let i=1;i<arr.length;i++) {
        const d = arr[i]-arr[i-1];
        if (d >= 27 && d <= 40) out.push(d);
      }
      return out;
    };

    const dx = getDiffs(unique("x"));
    const dy = getDiffs(unique("y"));

    return {
      x: Math.round(median(dx) || median(points.map(p => p.w)) || 33),
      y: Math.round(median(dy) || median(points.map(p => p.h)) || 33)
    };
  }

  function applyGrid(candidate, index) {
    const el = candidate.el;
    const er = rect(el);
    const points = candidate.inside.map(item => {
      const ir = rect(item);
      return {
        x: Math.round(ir.left - er.left),
        y: Math.round(ir.top - er.top),
        w: ir.width,
        h: ir.height,
        item
      };
    });

    const pitch = inferPitch(points);

    // Grid starts where the first real item coordinate lands modulo pitch.
    const firstX = Math.min(...points.map(p => p.x));
    const firstY = Math.min(...points.map(p => p.y));

    const mod = (n, m) => ((n % m) + m) % m;
    const offX = mod(firstX, pitch.x);
    const offY = mod(firstY, pitch.y);

    el.classList.add("tg125-live-grid");

    // INLINE !important — this wins even over broad Galaxy panel styles.
    el.style.setProperty("background-color", "#020711", "important");
    el.style.setProperty("background-image", `url("${TILE}")`, "important");
    el.style.setProperty("background-repeat", "repeat", "important");
    el.style.setProperty("background-size", `${pitch.x}px ${pitch.y}px`, "important");
    el.style.setProperty("background-position", `${offX}px ${offY}px`, "important");

    points.forEach(p => p.item.classList.add("tg125-item-cell"));

    el.dataset.tdgLiveGrid = "12.5";
    el.dataset.tdgGridPitch = `${pitch.x}x${pitch.y}`;

    return {
      index,
      pitch: `${pitch.x}x${pitch.y}`,
      size: `${Math.round(er.width)}x${Math.round(er.height)}`,
      items: candidate.inside.length,
      cls: typeof el.className === "string" ? el.className.slice(0,120) : ""
    };
  }

  let lastSig = "";

  function apply() {
    const items = collectItemWrappers();
    const grids = chooseGridParents(items);
    const report = grids.map((g,i) => applyGrid(g,i));

    document.documentElement.dataset.tdgSlots = "12.5";

    const sig = JSON.stringify(report.map(r => [r.pitch,r.size,r.items,r.cls]));
    if (sig !== lastSig) {
      lastSig = sig;
      console.log(
        "%cTDG LIVE slot grids v12.5:",
        "color:#81dbd5;font-weight:bold",
        report.length,
        report
      );
    }
  }

  const mo = new MutationObserver(() => {
    clearTimeout(mo._tg125);
    mo._tg125 = setTimeout(apply, 70);
  });

  mo.observe(document.documentElement, {
    childList:true,
    subtree:true
  });

  document.addEventListener("click", () => {
    setTimeout(apply, 40);
    setTimeout(apply, 220);
  }, true);

  window.addEventListener("resize", () => setTimeout(apply,100));

  setInterval(apply,1400);
  apply();
})();
