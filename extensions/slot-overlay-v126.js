
(() => {
  if (!TDG) return;

  console.log("%cTDG slot region overlay v12.6 LOADED", "color:#76ecf5;font-weight:bold");

  const PITCH_MIN = 29;
  const PITCH_MAX = 37;

  function visible(el) {
    if (!(el instanceof HTMLElement)) return false;
    if (!el.isConnected || !el.getClientRects().length) return false;
    const cs = getComputedStyle(el);
    return cs.visibility !== "hidden" && cs.display !== "none" && Number(cs.opacity || 1) !== 0;
  }

  function rect(el) {
    return el.getBoundingClientRect();
  }

  function itemWrapperFromIcon(icon) {
    // Known item wrapper if present.
    const known = icon.closest(".inventory-item, .item");
    if (known instanceof HTMLElement) {
      const r = rect(known);
      if (r.width >= 27 && r.width <= 42 && r.height >= 27 && r.height <= 42) return known;
    }

    // Current-DOM fallback: first approximately item-sized ancestor.
    let p = icon.parentElement;
    for (let i=0; p && i<6; i++, p=p.parentElement) {
      if (!(p instanceof HTMLElement)) continue;
      const r = rect(p);
      if (r.width >= 27 && r.width <= 42 && r.height >= 27 && r.height <= 42) return p;
    }
    return null;
  }

  function collectItems() {
    const set = new Set();

    document.querySelectorAll("canvas.canvas-icon, canvas.icon, canvas[width='32'][height='32']").forEach(icon => {
      if (!visible(icon)) return;
      const r = rect(icon);
      if (r.width < 26 || r.width > 38 || r.height < 26 || r.height > 38) return;
      const w = itemWrapperFromIcon(icon);
      if (w) set.add(w);
    });

    // fallback for icon images
    document.querySelectorAll("img").forEach(img => {
      if (!visible(img)) return;
      const r = rect(img);
      if (r.width < 27 || r.width > 36 || r.height < 27 || r.height > 36) return;
      const w = itemWrapperFromIcon(img);
      if (w) set.add(w);
    });

    return [...set];
  }

  function center(item) {
    const r = rect(item);
    return {x:r.left + r.width/2, y:r.top + r.height/2, l:r.left, t:r.top, r:r.right, b:r.bottom};
  }

  function closeToGridDelta(d) {
    const a = Math.abs(d);
    if (a < 1) return true;
    const k = Math.round(a / 33);
    if (k < 1 || k > 8) return false;
    return Math.abs(a - k*33) <= 4;
  }

  function connected(a,b) {
    const A=center(a), B=center(b);
    const dx=B.x-A.x, dy=B.y-A.y;

    // same grid row / column with holes allowed
    const row = Math.abs(dy) <= 5 && closeToGridDelta(dx);
    const col = Math.abs(dx) <= 5 && closeToGridDelta(dy);

    // neighboring diagonal positions also help connect sparse shop grids
    const diag = closeToGridDelta(dx) && closeToGridDelta(dy) &&
                 Math.abs(dx) <= 4*33 && Math.abs(dy) <= 4*33;

    return row || col || diag;
  }

  function clusters(items) {
    const unseen = new Set(items);
    const out=[];

    while (unseen.size) {
      const first=unseen.values().next().value;
      unseen.delete(first);
      const q=[first], group=[first];

      while(q.length) {
        const cur=q.shift();
        for (const other of [...unseen]) {
          if (connected(cur,other)) {
            unseen.delete(other);
            q.push(other);
            group.push(other);
          }
        }
      }

      if (group.length >= 3) out.push(group);
    }
    return out;
  }

  function median(values) {
    const v=values.filter(n=>Number.isFinite(n)).sort((a,b)=>a-b);
    return v.length ? v[Math.floor(v.length/2)] : null;
  }

  function inferPitch(group) {
    const pts=group.map(center);

    function vals(key) {
      return [...new Set(pts.map(p=>Math.round(p[key])))].sort((a,b)=>a-b);
    }
    function diffs(arr) {
      const out=[];
      for(let i=1;i<arr.length;i++) {
        const d=arr[i]-arr[i-1];
        if (d>=PITCH_MIN && d<=PITCH_MAX) out.push(d);
      }
      return out;
    }

    const dx=diffs(vals("x"));
    const dy=diffs(vals("y"));
    return {
      x: Math.round(median(dx) || 33),
      y: Math.round(median(dy) || 33)
    };
  }

  function commonAncestors(group) {
    if (!group.length) return [];
    const firstChain=[];
    let p=group[0].parentElement;
    for(let i=0;p && i<10;i++,p=p.parentElement) {
      if (p instanceof HTMLElement) firstChain.push(p);
    }

    return firstChain.filter(a => group.every(item => a.contains(item)));
  }

  function groupBounds(group) {
    const rs=group.map(rect);
    return {
      left: Math.min(...rs.map(r=>r.left)),
      top: Math.min(...rs.map(r=>r.top)),
      right: Math.max(...rs.map(r=>r.right)),
      bottom: Math.max(...rs.map(r=>r.bottom))
    };
  }

  function candidateScore(el, group, pitch) {
    const r=rect(el);
    const gb=groupBounds(group);
    if (r.width < 60 || r.height < 45) return Infinity;
    if (r.width > 650 || r.height > 850) return Infinity;

    const spanW=gb.right-gb.left;
    const spanH=gb.bottom-gb.top;

    // Parent cannot be smaller than item span.
    if (r.width + 4 < spanW || r.height + 4 < spanH) return Infinity;

    const key=`${el.id||""} ${typeof el.className==="string"?el.className:""}`.toLowerCase();
    const goodName=/grid|items|inventory|bag|shop|store|merchant|depo|deposit|trade|offer|goods|list|slots|pane|scroll/.test(key);
    const badName=/window|main-column|right-column|left-column|game-window-positioner|content$/.test(key);

    // Alignment to pitch — real grids tend to be close to N*33 px.
    const nx=Math.max(1,Math.round(r.width/pitch.x));
    const ny=Math.max(1,Math.round(r.height/pitch.y));
    const alignErr=Math.abs(r.width-nx*pitch.x)+Math.abs(r.height-ny*pitch.y);

    // Penalize lots of unused panel around the item span.
    const extraW=Math.max(0,r.width-spanW);
    const extraH=Math.max(0,r.height-spanH);

    // Item cluster should occupy a meaningful part of the candidate.
    const areaRatio=(spanW*spanH)/Math.max(1,r.width*r.height);

    let score=alignErr*.8 + extraW*.12 + extraH*.08;
    if (areaRatio < .18) score += 90;
    if (areaRatio < .08) score += 160;
    if (goodName) score -= 50;
    if (badName) score += 70;

    return score;
  }

  function chooseRegion(group,pitch) {
    const ancestors=commonAncestors(group);
    const scored=ancestors
      .map(el=>({el,score:candidateScore(el,group,pitch)}))
      .filter(x=>Number.isFinite(x.score))
      .sort((a,b)=>a.score-b.score);

    if (scored.length && scored[0].score < 180) {
      const el=scored[0].el;
      const r=rect(el);
      const gb=groupBounds(group);

      // phase is based on actual item position relative to the candidate.
      const phaseX=((gb.left-r.left)%pitch.x+pitch.x)%pitch.x;
      const phaseY=((gb.top-r.top)%pitch.y+pitch.y)%pitch.y;

      // Start at nearest preceding slot line.
      const left=r.left + phaseX;
      const top=r.top + phaseY;

      const cols=Math.max(1,Math.floor((r.right-left+2)/pitch.x));
      const rows=Math.max(1,Math.floor((r.bottom-top+2)/pitch.y));

      return {
        left, top,
        width:cols*pitch.x,
        height:rows*pitch.y,
        source: el
      };
    }

    // Safe fallback: ONLY occupied span + one empty cell margin.
    // Never paint a whole window if no good grid parent exists.
    const gb=groupBounds(group);
    const left=gb.left;
    const top=gb.top;
    const cols=Math.max(1,Math.round((gb.right-gb.left)/pitch.x)+1);
    const rows=Math.max(1,Math.round((gb.bottom-gb.top)/pitch.y)+1);

    return {
      left, top,
      width:cols*pitch.x,
      height:rows*pitch.y,
      source:null
    };
  }

  function removeOverlays() {
    document.querySelectorAll(".tg126-slot-overlay").forEach(el=>el.remove());
  }

  function makeOverlay(region,pitch,index) {
    const ov=document.createElement("div");
    ov.className="tg126-slot-overlay";
    ov.dataset.grid=String(index);
    ov.style.left=`${Math.round(region.left)}px`;
    ov.style.top=`${Math.round(region.top)}px`;
    ov.style.width=`${Math.max(pitch.x,Math.round(region.width))}px`;
    ov.style.height=`${Math.max(pitch.y,Math.round(region.height))}px`;
    ov.style.setProperty("--tg126-pitch-x",`${pitch.x}px`);
    ov.style.setProperty("--tg126-pitch-y",`${pitch.y}px`);
    document.documentElement.appendChild(ov);
    return ov;
  }

  let lastSig="";
  function apply() {
    removeOverlays();

    const items=collectItems();
    const groups=clusters(items);
    const report=[];

    groups.forEach((group,i)=>{
      const pitch=inferPitch(group);
      if (pitch.x<PITCH_MIN || pitch.x>PITCH_MAX || pitch.y<PITCH_MIN || pitch.y>PITCH_MAX) return;

      const region=chooseRegion(group,pitch);

      // Hard safety guard: never draw giant page/window grids.
      if (region.width > 520 || region.height > 650) return;
      if (region.width*region.height > 240000) return;

      makeOverlay(region,pitch,i);

      const sr=region.source ? rect(region.source) : null;
      report.push({
        items:group.length,
        pitch:`${pitch.x}x${pitch.y}`,
        overlay:`${Math.round(region.width)}x${Math.round(region.height)}`,
        source: region.source
          ? `${region.source.id||""}.${typeof region.source.className==="string"?region.source.className:""}`
          : "fallback"
      });
    });

    document.documentElement.dataset.tdgSlots="12.6";

    const sig=JSON.stringify(report);
    if(sig!==lastSig) {
      lastSig=sig;
      console.log("%cTDG slot regions v12.6:", "color:#81dbd5;font-weight:bold", report.length, report);
    }
  }

  const mo=new MutationObserver(()=>{
    clearTimeout(mo._tg126);
    mo._tg126=setTimeout(apply,90);
  });
  mo.observe(document.documentElement,{childList:true,subtree:true});

  document.addEventListener("click",()=>{
    setTimeout(apply,50);
    setTimeout(apply,250);
  },true);

  window.addEventListener("resize",()=>setTimeout(apply,100));
  window.addEventListener("scroll",()=>setTimeout(apply,50),true);

  setInterval(apply,1200);
  apply();
})();
