
(async () => {
  const TDG = window.__TDG;
  if (!TDG?.waitForEngine) return;
  if (!(await TDG.waitForEngine())) return;

  const npcs = window.Engine?.npcs;
  if (!npcs?.getTip || npcs.getTip.__tdgWrapped) return;

  const original = npcs.getTip.bind(npcs);

  function tier(wt) {
    if (wt > 99) return ["tdg-titan","⚔ TYTAN ⚔"];
    if (wt > 89) return ["tdg-colossus","✦ KOLOS ✦"];
    if (wt > 79) return ["tdg-hero","☠ HEROS ☠"];
    if (wt > 29) return ["tdg-elite3","◆ ELITA III ◆"];
    if (wt > 19) return ["tdg-elite2","★ ELITA II ★"];
    if (wt > 9) return ["tdg-elite","★ ELITA ★"];
    return null;
  }

  function wrapped(...args) {
    const tip = original(...args);
    try {
      const npc = args[0];
      const wt = npc?.d?.wt;
      const t = tier(wt);
      if (!t || typeof tip !== "string") return tip;

      const host = document.createElement("div");
      host.innerHTML = tip;
      const i = host.querySelector("i");
      if (i) i.innerHTML = `<div class="tdg-mob-tier ${t[0]}">${t[1]}</div>`;
      return host.innerHTML;
    } catch {
      return tip;
    }
  }

  wrapped.__tdgWrapped = true;
  npcs.getTip = wrapped;
})();
