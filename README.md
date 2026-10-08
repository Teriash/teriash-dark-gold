# Teriash Galaxy v11.9 — Skills DOM Target

v11.8 nie trafiał w aktualne elementy NI, bo selektory `#skills_title` / `#skills_footer` pochodzą ze starszej struktury klienta.

v11.9 nie zgaduje klas okna Umiejętności. Skrypt:
- znajduje widoczne okno po nagłówku `UMIEJĘTNOŚCI`,
- znajduje element z tekstem `Lista umiejętności`,
- znajduje dolny pasek po `MISTRZOSTWO WALKI` / `Reset punktów`,
- styluje tylko ich rzeczywiste kontenery,
- nie zmienia position/width/height/display.

Pliki:
- `theme/90-skills-dom-target-v119.css`
- `extensions/skills-dom-target-v119.js`
