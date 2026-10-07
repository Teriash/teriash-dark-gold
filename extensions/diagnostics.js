
(() => {
  const api = window.__TERIASH_DARK_GOLD__;
  if (!api || !api.debug) return;
  const selectors = [
    ".interface-layer .top.positioner > .bg",
    ".interface-layer .bottom.positioner > .bg",
    ".left-column.main-column .new-chat-window",
    ".right-column.main-column .right-main-column-wrapper",
    ".hud-container",
    ".bottom-panel-of-bottom-positioner.bottom-panel",
    ".interface-element-equipment"
  ];
  console.table(selectors.map(selector => ({
    selector,
    found: document.querySelectorAll(selector).length
  })));
})();
