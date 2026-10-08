# Teriash Galaxy v13.1 — Safe Empty Slots

Rollback do stabilnej v12.9.

v13.0 zmieniał tło wykrytego kontenera i dodatkowo dodawał
`position: relative` do itemów. To mogło rozjechać układ.

v13.1 NIE modyfikuje żadnego panelu gry.

Puste sloty są tworzone jako osobne `position: fixed` overlaye:
- tylko w wykrytym, małym kontenerze itemów,
- tylko jeśli jego szerokość i wysokość pasują do rasteru ~33 px,
- zajęte komórki są pomijane,
- overlay nie wpływa na layout (`pointer-events:none`).

Zajęte sloty nadal korzystają dokładnie ze stylu v12.9.

Log:
`TDG SAFE empty slots v13.1: [...]`
