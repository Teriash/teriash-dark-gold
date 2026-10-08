
(() => {
  if (!TDG) return;

  console.log("%cTDG per-slot squares v12.7 LOADED","color:#76ecf5;font-weight:bold");

  function visible(el) {
    if (!(el instanceof HTMLElement)) return false;
    if (!el.isConnected || !el.getClientRects().length) return false;
    const cs=getComputedStyle(el);
    return cs.display!=="none" && cs.visibility!=="hidden";
  }

  function sized(el,min=26,max=44) {
    if (!(el instanceof HTMLElement)) return false;
    const r=el.getBoundingClientRect();
    return r.width>=min && r.width<=max && r.height>=min && r.height<=max;
  }

  function inItemUi(el) {
    return !!el.closest(
      ".inventory-grid-bg,.equipment-wrapper,.right-column,"+
      ".c-window,.border-window,"+
      "#shop_store,#shop_buy,#shop_sell,"+
      "#depo-items,#depo-items-wrapper,"+
      "#mytr_items,#tr2_items,"+
      "[class*='inventory'],[class*='shop'],[class*='store'],"+
      "[class*='merchant'],[class*='depo'],[class*='deposit'],[class*='trade']"
    );
  }

  function wrapperFromIcon(icon) {
    const known=icon.closest(".inventory-item,.item[data-tip-type='t_item'],[data-tip-type='t_item']");
    if (known && visible(known) && sized(known) && inItemUi(known)) return known;

    let p=icon.parentElement;
    for(let i=0;p && i<6;i++,p=p.parentElement) {
      if (visible(p) && sized(p) && inItemUi(p)) return p;
    }
    return null;
  }

  function markItems() {
    const found=new Set();

    document.querySelectorAll(
      ".inventory-item,.item[data-tip-type='t_item'],[data-tip-type='t_item']"
    ).forEach(el=>{
      if (!visible(el) || !sized(el) || !inItemUi(el)) return;
      el.classList.add("tg127-item-slot");
      found.add(el);
    });

    document.querySelectorAll(
      "canvas.canvas-icon,canvas.icon[width='32'][height='32'],canvas[width='32'][height='32']"
    ).forEach(icon=>{
      if (!visible(icon)) return;
      const w=wrapperFromIcon(icon);
      if (!w) return;
      w.classList.add("tg127-item-slot");
      found.add(w);
    });

    return found.size;
  }

  function markSlotNodes() {
    let n=0;
    document.querySelectorAll(
      ".eq-slot:not(.skill-usable-slot),"+
      ".interface-element-one-item-slot-background-to-repeat:not(.skill-usable-slot),"+
      ".item-slot:not(.skill-usable-slot),"+
      "[class*='shop-slot'],[class*='store-slot'],"+
      "[class*='inventory-slot'],[class*='deposit-slot'],[class*='depo-slot']"
    ).forEach(el=>{
      if (!visible(el) || !sized(el,26,58) || !inItemUi(el)) return;
      el.classList.add("tg127-slot-node");
      n++;
    });
    return n;
  }

  let last="";
  function apply() {
    /* Remove any leftovers from experimental grid versions. */
    document.querySelectorAll(".tg126-slot-overlay").forEach(el=>el.remove());

    const items=markItems();
    const slots=markSlotNodes();
    document.documentElement.dataset.tdgSlots="12.7";

    const sig=`${items}/${slots}`;
    if(sig!==last) {
      last=sig;
      console.log("%cTDG per-slot squares v12.7:","color:#81dbd5;font-weight:bold",{items,slotNodes:slots});
    }
  }

  const mo=new MutationObserver(()=>{
    clearTimeout(mo._tg127);
    mo._tg127=setTimeout(apply,60);
  });
  mo.observe(document.documentElement,{childList:true,subtree:true});

  document.addEventListener("click",()=>{
    setTimeout(apply,30);
    setTimeout(apply,180);
  },true);

  setInterval(apply,1200);
  apply();
})();
