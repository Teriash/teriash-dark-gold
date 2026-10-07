
(async () => {
  const TDG = window.__TDG;
  if (!TDG?.waitForEngine) return;
  if (!(await TDG.waitForEngine())) return;

  const mark = window.Engine?.mapGoMark;
  if (!mark || mark.__tdgWrapped) return;

  const state = {active:false,x:0,y:0,time:0};
  const img = new Image();
  img.src = TDG.asset("map/mark.png");

  const originalDraw = mark.draw?.bind(mark);
  const originalCreate = mark.createMapGoMark?.bind(mark);
  const originalUpdate = mark.update?.bind(mark);

  if (originalCreate) {
    mark.createMapGoMark = function(x,y,...rest) {
      state.active = true;
      state.x = x;
      state.y = y;
      state.time = Date.now();
      return originalCreate(x,y,...rest);
    };
  }

  if (originalDraw) {
    mark.draw = function(ctx,...rest) {
      const out = originalDraw(ctx,...rest);
      if (!state.active || !ctx) return out;
      try {
        const offset = window.Engine.map.getOffset();
        const tile = window.CFG?.tileSize || 32;
        const elapsed = Date.now() - state.time;
        const alpha = Math.max(0, 1 - elapsed / 1000);
        if (alpha <= 0) {
          state.active = false;
          return out;
        }
        const oldAlpha = ctx.globalAlpha;
        ctx.globalAlpha = alpha;
        ctx.drawImage(img, Math.round(state.x*tile-offset[0]), Math.round(state.y*tile-offset[1]));
        ctx.globalAlpha = oldAlpha;
      } catch {}
      return out;
    };
  }

  if (originalUpdate) {
    mark.update = function(...args) {
      if (state.active && Date.now() - state.time > 1000) state.active = false;
      return originalUpdate(...args);
    };
  }

  mark.__tdgWrapped = true;
})();
