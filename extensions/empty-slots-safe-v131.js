
(() => {
  if (!TDG) return;

  console.log("%cTDG SAFE empty slots v13.1 LOADED", "color:#76ecf5;font-weight:bold");

  const MIN_ITEM = 26;
  const MAX_ITEM = 42;
  const MIN_PITCH = 29;
  const MAX_PITCH = 37;
  const MAX_GRID_W = 520;
  const MAX_GRID_H = 520;

  function visible(el) {
    if (!(el instanceof HTMLElement)) return false;
    if (!el.isConnected || !el.getClientRects().length) return false;
    const cs = getComputedStyle(el);
    return cs.display !== "none" && cs.visibility !== "hidden";
  }

  function rect(el) {
    return el.getBoundingClientRect();
  }

  function itemSized(el) {
    if (!(el instanceof HTMLElement)) return false;
    const r = rect(el);
    return r.width >= MIN_ITEM && r.width <= MAX_ITEM &&
           r.height >= MIN_ITEM && r.height <= MAX_ITEM;
  }

  function findItemWrapper(icon) {
    const known = icon.closest(
      ".inventory-item,.item[data-tip-type='t_item'],[data-tip-type='t_item']"
    );
    if (known && visible(known) && itemSized(known)) return known;

    let p = icon.parentElement;
    for (let i = 0; p && i < 5; i++, p = p.parentElement) {
      if (visible(p) && itemSized(p)) return p;
    }
    return null;
  }

  function collectItems() {
    const set = new Set();

    document.querySelectorAll(
      ".inventory-item,.item[data-tip-type='t_item'],[data-tip-type='t_item']"
    ).forEach(el => {
      if (visible(el) && itemSized(el)) set.add(el);
    });

    document.querySelectorAll(
      "canvas.canvas-icon,canvas.icon[width='32'][height='32'],canvas[width='32'][height='32']"
    ).forEach(icon => {
      if (!visible(icon)) return;
      const w = findItemWrapper(icon);
      if (w) set.add(w);
    });

    return [...set];
  }

  function median(values) {
    const arr = values.filter(Number.isFinite).sort((a,b) => a-b);
    return arr.length ? arr[Math.floor(arr.length / 2)] : null;
  }

  function inferPitch(values) {
    const sorted = [...new Set(values.map(v => Math.round(v)))].sort((a,b) => a-b);
    const diffs = [];
    for (let i = 1; i < sorted.length; i++) {
      const d = sorted[i] - sorted[i-1];
      if (d >= MIN_PITCH && d <= MAX_PITCH) diffs.push(d);
    }
    return Math.round(median(diffs) || 33);
  }

  function mod(n, m) {
    return ((n % m) + m) % m;
  }

  function lineError(length, origin, pitch) {
    const usable = length - origin;
    if (usable < pitch * 2) return 999;
    const rem = mod(usable, pitch);
    return Math.min(rem, pitch - rem);
  }

  function commonAncestors(group) {
    if (!group.length) return [];
    const chain = [];
    let p = group[0].parentElement;
    for (let i = 0; p && i < 7; i++, p = p.parentElement) {
      if (p instanceof HTMLElement) chain.push(p);
    }
    return chain.filter(a => group.every(item => a.contains(item)));
  }

  function groupItems(items) {
    // First choice: offsetParent is usually the exact absolutely-positioned item grid.
    const byOffsetParent = new Map();

    for (const item of items) {
      const op = item.offsetParent;
      if (op instanceof HTMLElement) {
        if (!byOffsetParent.has(op)) byOffsetParent.set(op, []);
        byOffsetParent.get(op).push(item);
      }
    }

    const groups = [...byOffsetParent.values()].filter(g => g.length >= 2);
    if (groups.length) return groups;

    // Fallback: nearest shared parent among nearby items.
    const byParent = new Map();
    for (const item of items) {
      const p = item.parentElement;
      if (!(p instanceof HTMLElement)) continue;
      if (!byParent.has(p)) byParent.set(p, []);
      byParent.get(p).push(item);
    }
    return [...byParent.values()].filter(g => g.length >= 2);
  }

  function evaluateCandidate(el, group) {
    if (!(el instanceof HTMLElement) || !visible(el)) return null;

    const r = rect(el);
    if (r.width < 60 || r.height < 50 || r.width > MAX_GRID_W || r.height > MAX_GRID_H) {
      return null;
    }

    const pts = group.map(item => {
      const q = rect(item);
      return {
        item,
        x: q.left - r.left,
        y: q.top - r.top,
        w: q.width,
        h: q.height
      };
    });

    const px = inferPitch(pts.map(p => p.x));
    const py = inferPitch(pts.map(p => p.y));

    if (px < MIN_PITCH || px > MAX_PITCH || py < MIN_PITCH || py > MAX_PITCH) {
      return null;
    }

    // Real item grids normally have one stable remainder/origin.
    const ox = Math.round(median(pts.map(p => mod(Math.round(p.x), px))) || 0);
    const oy = Math.round(median(pts.map(p => mod(Math.round(p.y), py))) || 0);

    const ex = lineError(r.width, ox, px);
    const ey = lineError(r.height, oy, py);

    // Strong guard against selecting a whole window/background.
    if (ex > 6 || ey > 6) return null;

    const cols = Math.floor((r.width - ox + 2) / px);
    const rows = Math.floor((r.height - oy + 2) / py);

    if (cols < 2 || rows < 1 || cols > 16 || rows > 16) return null;

    const key = `${el.id || ""} ${typeof el.className === "string" ? el.className : ""}`.toLowerCase();
    const good = /grid|inventory|bag|backpack|shop|store|merchant|depo|deposit|trade|items|slots|pane/.test(key);
    const bad = /c-window|border-window|right-column|left-column|main-column|game-window|content$/.test(key);

    // Prefer small aligned containers.
    let score = r.width * r.height;
    if (good) score *= 0.45;
    if (bad) score *= 3.5;

    return {el, r, pts, px, py, ox, oy, cols, rows, score, key};
  }

  function chooseGrid(group) {
    const candidates = [];

    // Offset parent first.
    const op = group[0].offsetParent;
    if (op instanceof HTMLElement && group.every(item => item.offsetParent === op)) {
      const c = evaluateCandidate(op, group);
      if (c) candidates.push(c);
    }

    // Then shared ancestors, smallest/aligned one wins.
    for (const a of commonAncestors(group)) {
      const c = evaluateCandidate(a, group);
      if (c) candidates.push(c);
    }

    candidates.sort((a,b) => a.score - b.score);
    return candidates[0] || null;
  }

  function occupiedCells(grid) {
    const set = new Set();

    for (const p of grid.pts) {
      const col = Math.round((p.x - grid.ox) / grid.px);
      const row = Math.round((p.y - grid.oy) / grid.py);

      if (col >= 0 && row >= 0 && col < grid.cols && row < grid.rows) {
        set.add(`${col},${row}`);
      }
    }
    return set;
  }

  function clearOverlays() {
    document.querySelectorAll(".tg131-empty-slot").forEach(el => el.remove());
  }

  function drawEmptySlots(grid, index) {
    const occupied = occupiedCells(grid);
    const frag = document.createDocumentFragment();

    // Use 32px-like visual square inside the 33px pitch.
    const slotW = Math.max(26, grid.px - 1);
    const slotH = Math.max(26, grid.py - 1);

    let emptyCount = 0;

    for (let row = 0; row < grid.rows; row++) {
      for (let col = 0; col < grid.cols; col++) {
        if (occupied.has(`${col},${row}`)) continue;

        const left = grid.r.left + grid.ox + col * grid.px;
        const top = grid.r.top + grid.oy + row * grid.py;

        // Must stay fully inside the chosen grid container.
        if (left < grid.r.left - 1 || top < grid.r.top - 1) continue;
        if (left + slotW > grid.r.right + 2 || top + slotH > grid.r.bottom + 2) continue;

        const slot = document.createElement("div");
        slot.className = "tg131-empty-slot";
        slot.dataset.grid = String(index);
        slot.style.left = `${Math.round(left)}px`;
        slot.style.top = `${Math.round(top)}px`;
        slot.style.width = `${slotW}px`;
        slot.style.height = `${slotH}px`;

        frag.appendChild(slot);
        emptyCount++;
      }
    }

    document.documentElement.appendChild(frag);
    return emptyCount;
  }

  let lastSig = "";

  function apply() {
    clearOverlays();

    const items = collectItems();
    const groups = groupItems(items);
    const report = [];

    groups.forEach((group, i) => {
      const grid = chooseGrid(group);
      if (!grid) return;

      const empty = drawEmptySlots(grid, i);

      report.push({
        items: group.length,
        empty,
        pitch: `${grid.px}x${grid.py}`,
        cells: `${grid.cols}x${grid.rows}`,
        source: grid.key.slice(0, 120)
      });
    });

    document.documentElement.dataset.tdgEmptySlots = "13.1";

    const sig = JSON.stringify(report);
    if (sig !== lastSig) {
      lastSig = sig;
      console.log(
        "%cTDG SAFE empty slots v13.1:",
        "color:#81dbd5;font-weight:bold",
        report
      );
    }
  }

  const mo = new MutationObserver(() => {
    clearTimeout(mo._tg131);
    mo._tg131 = setTimeout(apply, 80);
  });

  mo.observe(document.documentElement, {childList:true, subtree:true});

  document.addEventListener("click", () => {
    setTimeout(apply, 40);
    setTimeout(apply, 220);
  }, true);

  window.addEventListener("resize", () => setTimeout(apply, 100));
  window.addEventListener("scroll", () => setTimeout(apply, 60), true);

  setInterval(apply, 1300);
  apply();
})();
