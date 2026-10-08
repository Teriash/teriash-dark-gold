# Teriash Galaxy v8.5 Hard Panel Fix

Ta wersja naprawia panel inaczej niż v8.4.

## Dlaczego v8.4 mogło wyglądać identycznie
Poprawka była wyłącznie w zdalnych plikach CSS / PNG. Przy CDN-ie pliki z gałęzi `main`
mogą przez chwilę pozostać w cache.

## Co robi v8.5
- krytyczny CSS chatu i prawego panelu jest osadzony bezpośrednio w userscripcie,
- nowe grafiki mają nowe nazwy (`chat-panel-v85.png`, `right-panel-v85.png`),
  więc CDN nie może zwrócić starszej grafiki pod tą samą nazwą,
- tło jest nakładane na cały `.left-column.main-column` i `.right-column.main-column`,
- usuwane są osobne elementy `.border`, które w NI są rodzeństwem wrapperów i mogą
  tworzyć widoczne kreski / odcięcia,
- wewnętrzne wrappery są transparentne,
- obraz jest rozciągany dokładnie `100% 100%` na cały panel, bez kafelkowania.

Po instalacji w konsoli powinien pojawić się:
`TDG panel fix v8.5 ACTIVE`
