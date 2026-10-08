# Teriash Galaxy v8.4 Panel Fix

Poprawka dokładnie pod problem widoczny na screenie:

- chat ma teraz JEDNO pełne tło na całej wysokości panelu,
- prawy panel ma JEDNO pełne tło na całej wysokości,
- usunięte jest powtarzanie małego `256x256` tła, które robiło poziome kreski,
- wewnętrzne wrappery mają transparentne tła, więc nie odcinają grafiki,
- nowe pliki:
  - `assets/chat/chat-panel-full.png`
  - `assets/equipment/right-panel-full.png`

Nie zmieniam geometrii paneli.

CDN:
`https://cdn.jsdelivr.net/gh/Teriash/teriash-dark-gold@main/`
