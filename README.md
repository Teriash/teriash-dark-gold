# Teriash Galaxy v12.3 — Real Slot Squares

W v12.1/v12.2 problem polegał na tym, że stylowaliśmy głównie tło
kontenera / stretch sprite. W sklepie widoczna lista itemów korzysta z
rzeczywistych `.inventory-item` i ich własnego rodzica, więc kafelek nie
musiał być widoczny dokładnie pod przedmiotami.

v12.3:
- wyszukuje rzeczywiste `.inventory-item`,
- znajduje ich najmniejszego wspólnego rodzica,
- wylicza realny odstęp X/Y między itemami,
- rysuje siatkę kwadratów dokładnie z tym krokiem,
- każdy zajęty `.inventory-item` dostaje dodatkową własną ramkę Galaxy,
- nie nadpisuje grafiki przedmiotu ani koloru rarity,
- działa dla torby i dynamicznych sklepów bez zakładania na sztywno 33 px.

Nowe moduły:
- `theme/92-real-slot-squares-v123.css`
- `extensions/inventory-shop-slots-v123.js`
