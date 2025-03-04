# Dokumentation von entdeckten Fehlern 

1.  **Fehler/Edge-Case 1: Ungültige Eingabe im Strict-Mode**
    * Beschreibung: Im Strict-Mode wurde eine Dezimalzahl als gültige Punktzahl akzeptiert, obwohl sie eine ganze Zahl sein sollte.
    * Lösung: Ein zusätzlicher Test wurde hinzugefügt, um sicherzustellen, dass im Strict-Mode nur ganze Zahlen akzeptiert werden. Der Fehler wurde durch die hinzufügung einer Prüfung auf ganzzahlige werte behoben.
2.  **Fehler/Edge-Case 2: Bonuspunkte über 100**
    * Beschreibung: Bei sehr hohen Bonuspunkten (z.B. 6 Bonuskategorien) konnte die Gesamtpunktzahl über 100 steigen.
    * Lösung: Die Funktion wurde angepasst, um sicherzustellen, dass die Gesamtpunktzahl niemals 100 überschreitet.
3.  **Fehler/Edge-Case 3: Leere Bonuskategorien**
    * Beschreibung: Bei einem leeren Array von Bonuskategorien, wurde ein Fehler ausgegeben.
    * Lösung: Die Funktion wurde angepasst, um sicherzustellen, dass ein leeres Array von Bonuskategorien keine Fehler ausgibt.

## Erklärung der Test-Struktur

Die Tests sind in `describe`-Blöcken organisiert, um die verschiedenen Aspekte der `validateScore`-Funktion zu gruppieren (Basisvalidierung, Strict-Mode, Bonuspunkte, Notenberechnung, Edge-Cases). Innerhalb der `describe`-Blöcke werden `it`-Blöcke verwendet, um einzelne Tests zu definieren. Vitest-Matcher wie `toBe`, `toEqual` und `toContain` werden verwendet, um die erwarteten Ergebnisse zu überprüfen. Parametrisierte Tests wurden verwendet, um verschiedene Eingaben mit dem gleichen Testcode zu testen.

## Reflexion über Vor- und Nachteile des TDD-Ansatzes

Der TDD-Ansatz hat mir geholfen, über die Anforderungen der Funktion nachzudenken, bevor ich den Code schreibe.  Ein Nachteil war, dass das Schreiben von Tests vor dem Code anfangs etwas zeitaufwändiger war. 

