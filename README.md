# Teriash Galaxy v13.2 — Tip Safe Empty Slots

Zmiany względem v13.1:
- obniżony `z-index` pustych slotów, żeby nie zasłaniały tipów,
- puste sloty są lekko przyciemnione,
- baza działania dalej ta sama co w stabilnej v13.1.

Nowe ustawienia overlay:
- `z-index: 5000`
- `opacity: .88`
- `filter: brightness(.78) saturate(.9)`

Jeśli dalej jakiś konkretny tip będzie pod spodem, można jeszcze niżej zbić z-index tylko dla overlayów.
