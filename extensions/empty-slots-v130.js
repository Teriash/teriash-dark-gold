
(() => {
  if (!TDG) return;
  console.log("%cTDG empty-slot detector v13.0 LOADED","color:#76ecf5;font-weight:bold");

  const MIN=26, MAX=42;

  function visible(el){
    if(!(el instanceof HTMLElement)||!el.isConnected||!el.getClientRects().length) return false;
    const cs=getComputedStyle(el);
    return cs.display!=="none"&&cs.visibility!=="hidden";
  }
  function box(el){ return el.getBoundingClientRect(); }
  function itemSized(el){
    const r=box(el);
    return r.width>=MIN&&r.width<=MAX&&r.height>=MIN&&r.height<=MAX;
  }
  function getItem(icon){
    let w=icon.closest(".inventory-item,.item[data-tip-type='t_item'],[data-tip-type='t_item']");
    if(w&&visible(w)&&itemSized(w)) return w;
    let p=icon.parentElement;
    for(let i=0;p&&i<6;i++,p=p.parentElement){
      if(visible(p)&&itemSized(p)) return p;
    }
    return null;
  }
  function collect(){
    const s=new Set();
    document.querySelectorAll(".inventory-item,.item[data-tip-type='t_item'],[data-tip-type='t_item']").forEach(el=>{
      if(visible(el)&&itemSized(el)) s.add(el);
    });
    document.querySelectorAll("canvas.canvas-icon,canvas.icon[width='32'][height='32'],canvas[width='32'][height='32']").forEach(c=>{
      if(!visible(c)) return;
      const w=getItem(c); if(w) s.add(w);
    });
    return [...s];
  }
  function median(a){
    a=a.filter(Number.isFinite).sort((x,y)=>x-y);
    return a.length?a[Math.floor(a.length/2)]:null;
  }
  function pitch(points,key){
    const vals=[...new Set(points.map(p=>Math.round(p[key])))].sort((a,b)=>a-b);
    const d=[];
    for(let i=1;i<vals.length;i++){
      const n=vals[i]-vals[i-1];
      if(n>=29&&n<=37)d.push(n);
    }
    return Math.round(median(d)||33);
  }
  function ancestors(el){
    const a=[]; let p=el.parentElement;
    for(let i=0;p&&i<8;i++,p=p.parentElement) if(p instanceof HTMLElement)a.push(p);
    return a;
  }
  function candidateForGroup(items){
    const counts=new Map();
    items.forEach(it=>ancestors(it).forEach(a=>counts.set(a,(counts.get(a)||0)+1)));
    const c=[];
    for(const [el,count] of counts){
      if(count<2||!visible(el))continue;
      const r=box(el);
      if(r.width<65||r.height<50||r.width>560||r.height>620)continue;
      const inside=items.filter(i=>el.contains(i));
      if(inside.length<2)continue;
      const pts=inside.map(i=>{const q=box(i);return{x:q.left-r.left,y:q.top-r.top,w:q.width,h:q.height}});
      const px=pitch(pts,'x'),py=pitch(pts,'y');
      const phaseX=((Math.min(...pts.map(p=>p.x))%px)+px)%px;
      const phaseY=((Math.min(...pts.map(p=>p.y))%py)+py)%py;
      const residual=pts.reduce((sum,p)=>{
        const rx=Math.min((p.x-phaseX)%px,px-((p.x-phaseX)%px));
        const ry=Math.min((p.y-phaseY)%py,py-((p.y-phaseY)%py));
        return sum+Math.abs(rx)+Math.abs(ry);
      },0)/pts.length;
      if(residual>5)continue;
      const key=((el.id||'')+' '+(typeof el.className==='string'?el.className:'')).toLowerCase();
      const good=/inventory|bag|backpack|shop|store|merchant|depo|deposit|trade|items|grid|slot|scroll-pane|inner-grid/.test(key);
      const bad=/c-window|border-window|right-column|left-column|main-column|game-window/.test(key);
      const spanW=Math.max(...pts.map(p=>p.x+p.w))-Math.min(...pts.map(p=>p.x));
      const spanH=Math.max(...pts.map(p=>p.y+p.h))-Math.min(...pts.map(p=>p.y));
      const extra=(r.width-spanW)+(r.height-spanH);
      let score=residual*12+extra*.05+(good?-80:0)+(bad?160:0);
      // prefer dimensions close to whole slot counts
      score+=Math.abs(r.width-Math.round(r.width/px)*px)*2;
      score+=Math.abs(r.height-Math.round(r.height/py)*py)*2;
      c.push({el,inside,px,py,phaseX,phaseY,score});
    }
    c.sort((a,b)=>a.score-b.score);
    return c[0]&&c[0].score<180?c[0]:null;
  }
  function groupByWindow(items){
    const m=new Map();
    items.forEach(it=>{
      const root=it.closest('.inventory-grid-bg,.c-window.border-window,.c-window,.border-window,.right-column')||it.parentElement;
      if(!root)return;
      if(!m.has(root))m.set(root,[]);
      m.get(root).push(it);
    });
    return [...m.values()].filter(g=>g.length>=2);
  }
  let last='';
  function apply(){
    document.querySelectorAll('.tg130-slot-grid').forEach(el=>{
      el.classList.remove('tg130-slot-grid');
      el.style.removeProperty('--tg130-px');el.style.removeProperty('--tg130-py');
      el.style.removeProperty('--tg130-ox');el.style.removeProperty('--tg130-oy');
    });
    const items=collect();
    const groups=groupByWindow(items);
    const report=[];
    groups.forEach(g=>{
      const c=candidateForGroup(g); if(!c)return;
      c.el.classList.add('tg130-slot-grid');
      c.el.style.setProperty('--tg130-px',c.px+'px');
      c.el.style.setProperty('--tg130-py',c.py+'px');
      c.el.style.setProperty('--tg130-ox',Math.round(c.phaseX)+'px');
      c.el.style.setProperty('--tg130-oy',Math.round(c.phaseY)+'px');
      report.push({items:c.inside.length,pitch:c.px+'x'+c.py,source:(c.el.id||'')+'.'+(typeof c.el.className==='string'?c.el.className:'')});
    });
    const sig=JSON.stringify(report);
    if(sig!==last){last=sig;console.log('%cTDG empty slot grids v13.0:','color:#81dbd5;font-weight:bold',report.length,report);}
  }
  const mo=new MutationObserver(()=>{clearTimeout(mo._tg130);mo._tg130=setTimeout(apply,90)});
  mo.observe(document.documentElement,{childList:true,subtree:true});
  document.addEventListener('click',()=>{setTimeout(apply,50);setTimeout(apply,220)},true);
  setInterval(apply,1400);
  apply();
})();
