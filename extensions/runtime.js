
(() => {
  const api = window.__TERIASH_DARK_GOLD__;
  if (!api) return;
  document.documentElement.dataset.teriashDarkGold = "6";
  console.log("%cTeriash Dark Gold v6", "color:#e7bf59;font-weight:bold", "runtime loaded");
})();
