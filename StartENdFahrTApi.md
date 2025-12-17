#  Fahrten API Dokumentation

Diese Datei beschreibt die Endpunkte des Fahrten-Systems  
(Start einer Fahrt & Beenden einer Fahrt) im Registrierkasse-Backend.

Die API ermöglicht:

- Erfassen einer neuen Fahrt
- Beenden einer aktiven Fahrt
- Speichern von Kilometerständen & GPS-Positionen
- Fehlerhandling & Rückgabeformate

---

##  Datenmodell — Tabelle `fahrten`

| Feld           | Typ     | Beschreibung |
|----------------|---------|--------------|
| id             | int     | Primärschlüssel der Fahrt |
| user_id        | int     | Fahrer / Benutzer der Fahrt |
| vehicle_id     | int     | (optional) Fahrzeug-ID |
| start_km       | float   | Kilometerstand beim Start (aktuell 0 oder vom Client) |
| end_km         | float   | End-Kilometer bzw. gefahrene Strecke |
| start_lat      | float   | Start-GPS-Latitude |
| start_lng      | float   | Start-GPS-Longitude |
| end_lat        | float   | End-GPS-Latitude |
| end_lng        | float   | End-GPS-Longitude |
| status         | ENUM(open/closed) | Fahrtstatus |

---

# Fahrt starten — **StartFahrt**

**Endpoint**

```http
POST /fahrten/start
```

### Zweck  

Erstellt eine neue Fahrt & speichert Start-Kilometer und GPS-Position.

### Request Body

```json
{
  "userId": 123,
  "vehicleId": 5,
  "startKm": 0,
  "lat": 48.2082,
  "lng": 16.3738
}
```

| Feld | Pflicht? | Beschreibung |
|------|----------|--------------|
| userId | ✔ required | Benutzer der Fahrt — ohne diese Angabe erfolgt ein Error |
| vehicleId | optional | Fahrzeugzugehörigkeit |
| startKm | optional / aktuell nötig | Start-Km — kann später fix auf 0 gesetzt werden |
| lat / lng | optional | GPS-Position des Startpunktes |

---

### Erfolgreiche Response (200)

```json
{
  "id": 42,
  "user_id": 123,
  "vehicle_id": 5,
  "start_km": 0,
  "start_lat": 48.2082,
  "start_lng": 16.3738,
  "status": "open",
  "created_at": "2025-11-27T10:00:00.000Z"
}
```

---

### Fehler beim Starten

| Fehler | Wann passiert es? | Response Beispiel |
|--------|------------------|-------------------|
|  `userId is required` | Wenn userId fehlt | `{ "error":"userId is required" }` |
|  DB-/Serverfehler | SQL-Fehler, Connection Fehler u.a. | `{ "error":"Failed to start Fahrt" }` oder DB-Fehlermeldung |

---

# Fahrt beenden — **EndFahrt**

**Endpoint**

```http
POST /fahrten/:fahrten_id/end
```

### Zweck  
Beendet eine aktive Fahrt → setzt End-KM, GPS-Endposition & Status = `closed`.

### URL-Parameter

| Parameter | Pflicht? | Beschreibung |
|----------|----------|--------------|
| `fahrten_id` | ✔ required | ID der zu beendenden Fahrt |

Beispiel-Aufruf:

```
POST /fahrten/42/end
```

---

### Request Body

```json
{
  "endKm": 120.5,
  "lat": 48.2100,
  "lng": 16.3700
}
```

| Feld | Pflicht? | Beschreibung |
|------|----------|--------------|
| endKm | ✔ | End-Kilometer (= gefahrene Distanz oder Tacho-Endwert) |
| lat/lng | optional | End-GPS-Position |

 In zukünftiger Version kann `endKm` = gefahrene Kilometer errechnet werden:  
 `distance = endKm - startKm`

---

### Erfolgreiche Response (200)

```json
{
  "id": 42,
  "user_id": 123,
  "vehicle_id": 5,
  "start_km": 0,
  "end_km": 120.5,
  "start_lat": 48.2082,
  "start_lng": 16.3738,
  "end_lat": 48.2100,
  "end_lng": 16.3700,
  "status": "closed",
}
```

---

### Fehler beim Beenden der Fahrt

| Fehler | Ursache | Response |
|--------|---------|----------|
|  `Fahrt not found or already closed` | ID existiert nicht oder Status ≠ open | `{ "error":"Fahrt not found or already closed" }` |
|  Ungültige fahrten_id | `/fahrten/abc/end` oder leer | `{ "error":"Failed to end Fahrt" }` |
|  Datenbank-/Serverfehler | Query-Fehler o.ä. | `{ "error":"Failed to end Fahrt" }` + Log-Output im Server |

---

#  Beispiel-Requests (cURL)

### Start einer Fahrt

```bash
curl -X POST http://localhost:3000/fahrten/start \
-H "Content-Type: application/json" \
-d '{ "userId":123,"vehicleId":5,"startKm":0,"lat":48.2082,"lng":16.3738 }'
```

### Fahrt beenden

```bash
curl -X POST http://localhost:3000/fahrten/42/end \
-H "Content-Type: application/json" \
-d '{ "endKm":120.5,"lat":48.2100,"lng":16.3700 }'
```

---

#  Zukünftige Verbesserungen (Empfehlung)

| To-Do | Vorteil |
|------|--------|
| startKm immer automatisch = 0 | Weniger Fehler, Client einfacher |
| endKm = Distanz berechnen statt eingeben | Nutzen für Abrechnungen / Steuer |
| Middleware Auth aktivieren | Zugriffskontrolle für Benutzer |
