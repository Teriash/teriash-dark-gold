# Teriash Galaxy v11.4 — Stable Targeted Fix

Ta wersja jest zbudowana od v11.2, nie od v11.3.

Cofnięto agresywne poprawki v11.3, które tworzyły wielkie pionowe/podłużne pasy w Klany.

Co zmieniono względem v11.2:
- skaner nie traktuje już samego `background-image` jako dowodu, że element jest drewniany,
- nie skanuje całych shelli `.c-window`, tylko zawartość okien,
- frameworkowe elementy NI (header/footer/border-image/decor) są całkowicie pomijane,
- stare elementy są zmieniane tylko jeśli mają rzeczywiście brązowy/papierowy/zielony kolor + sensowny semantyczny hint,
- Dziennik Zadań, Klany i Świat mają kilka dokładnych poprawek po konkretnych klasach, bez ruszania geometrii.

Nie ma zmian `position`, `width`, `height`, `display`.

Logi:
- `TDG stable targeted override v11.4 LOADED`
- `Teriash Galaxy v11.4 Stable Targeted Fix loaded`
