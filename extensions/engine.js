
(() => {
  const TDG = window.__TDG;
  if (!TDG) return;

  TDG.waitForEngine = function() {
    return new Promise(resolve => {
      const check = () => {
        const ni = document.cookie.match(/interface=(\w+)/)?.[1] === "ni";
        if (!ni) return resolve(false);
        if (window.Engine?.allInit) return resolve(true);
        setTimeout(check, 40);
      };
      check();
    });
  };
})();
