# Capacitor - Mobile App Development

<p align="center">
<a href="https://www.apple.com/at/os/ios/"><img src="../docs/pictures/iOS.png" width="150" height="150"></a>
<a href="https://capacitorjs.com"><img src="../docs/pictures/Capacitor.jpeg" width="150" height="150"></a>
<a href="https://www.android.com/intl/de_de/"><img src="../docs/pictures/android.png" width="150" height="150"></a>
</p>

## Official Docs

Besuche [https://capacitorjs.com](https://capacitorjs.com) für die offizielle Dokumentation.

---

## 🚀 Root Project Scripts

Um die Entwicklung zu beschleunigen, kann das gesamte Projekt (Frontend & Backend) direkt aus dem **Root-Verzeichnis** gesteuert werden. Hierfür wird das Paket `concurrently` verwendet.

| Script                   | Command                         | Beschreibung                                                                               |
| :----------------------- | :------------------------------ | :----------------------------------------------------------------------------------------- |
| `npm run dev`            | `concurrently ...`              | Startet Frontend **und** Backend gleichzeitig — der schnellste Weg für lokale Entwicklung. |
| `npm run start-frontend` | `npm run dev --prefix frontend` | Startet nur den Vite Dev Server (Frontend).                                                |
| `npm run start-backend`  | `npm run dev --prefix backend`  | Startet nur den Express Server (Backend).                                                  |
| `npm run android`        | `build → sync → run`            | Baut die App, synchronisiert Capacitor und startet sie auf Android.                        |
| `npm run ios`            | `build → sync → run`            | Baut die App, synchronisiert Capacitor und startet sie auf iOS.                            |

---

## Set Up (Manuell)

Führe diese Schritte im **frontend** Ordner aus:

1. **Abhängigkeiten installieren:**

```sh
   npm i
```

2. **Projekt bauen:**

```bash
   npm run build
```

_(Dies erstellt den `dist`-Ordner via Vite.)_

3. **Capacitor Sync:**

```bash
   npx cap sync [android | ios]
```

4. **Editor öffnen oder App starten:**

```bash
   npx cap open [android | ios]
   # ODER
   npx cap run [android | ios]
```

---

## ⚠️ Die Backend "Localhost" Falle

Beim Testen auf einem echten Smartphone darf im Frontend kein `localhost:3000` als API-URL verwendet werden. Für das Handy ist `localhost` das Handy selbst, nicht dein Computer.

### Lösung 1: Lokale LAN-IP-Adresse

Nutze deine lokale Netzwerk-IP, damit das Handy deinen PC im selben WLAN erreicht.

**IP finden (Windows):** Tippe `ipconfig` im Terminal → Suche nach `IPv4-Adresse` (z.B. `192.168.0.150`).

**IP finden (Windows):** `hostname -I`

**Backend Config:** Stelle sicher, dass das Express-Backend auf `0.0.0.0` horcht, um externe Anfragen zuzulassen:

```javascript
const HOST = "0.0.0.0";
app.listen(PORT, HOST, () => {
  console.log(`Server läuft auf http://${HOST}:${PORT}`);
});
```

**Frontend Config:** Nutze die gefundene IP in deiner `.env`:

```
VITE_API_URL="http://192.168.0.150:3000"
```

> **Voraussetzung:** Handy und PC müssen sich im **selben WLAN-Netzwerk** befinden.

### Lösung 2: Deployed Backend

Alternativ kann das Backend auf einem Server deployed werden. Das Handy greift dann direkt auf die öffentliche URL zu — unabhängig vom Netzwerk. Das wird in Production genutzt (Ein deployed Backend)

**Frontend Config:** Setze die deployed URL in deiner `.env`:

```
VITE_API_URL="https://mein-backend.onrender.com"
```

> **Vorteil:** Kein WLAN-Zwang, keine IP-Änderungen, funktioniert auch unterwegs.
> **Nachteil:** Änderungen am Backend müssen erst deployed werden, bevor sie auf dem Handy sichtbar sind.

### Zusammenfassung

| Methode              | Wann nutzen?                                | Voraussetzung                           |
| :------------------- | :------------------------------------------ | :-------------------------------------- |
| **LAN-IP**           | Lokale Entwicklung, schnelles Testen        | Gleiches WLAN, `0.0.0.0` als Host       |
| **Deployed Backend** | Testen auf echten Geräten, Demos, unterwegs | Backend muss deployed & erreichbar sein |

---

## ⚡ Live Refresh Konfiguration

Um UI-Änderungen sofort auf dem Handy zu sehen, ohne jedes Mal neu zu bauen, nutzen wir den Live-Server von Vite.

### Automatisierung via `.env`

Setze in deiner `.env`-Datei im Frontend:

```
MOBILE_REFRESH="true"
LOCAL_URL="http://192.168.0.150:5173"  # Deine IP + Vite Port
```

In der `capacitor.config.ts` wird dies dynamisch geladen:

```typescript
server: process.env.MOBILE_REFRESH === "true"
  ? {
      url: process.env.LOCAL_URL || "http://192.168.0.1:5173",
      cleartext: true,
    }
  : undefined,
```

> **Hinweis:** Live Refresh zeigt UI-Änderungen live an. Bei Änderungen an der `.env`, neu installierten Paketen oder nativen Dateien im `Android`/`iOS`-Ordner muss manuell `npx cap sync` ausgeführt werden.

---

## 🛠 Native Android Konfiguration

Damit Android die unverschlüsselte Verbindung (`http`) zu deinem lokalen PC erlaubt, wurde eine automatische Umschaltung konfiguriert.

### 1. Gradle Placeholders (`android/app/build.gradle`)

Wir steuern die Erlaubnis für Klartext-Traffic über den Build-Typ:

```gradle
android {
    buildTypes {
        release {
            addManifestPlaceholders([usesCleartextTraffic: "false"])
        }
        debug {
            addManifestPlaceholders([usesCleartextTraffic: "true"])
        }
    }
}
```

### 2. Android Manifest (`android/app/src/main/AndroidManifest.xml`)

Das Manifest nutzt diesen Platzhalter im `<application>` Tag:

```xml
<application
    ...
    android:usesCleartextTraffic="${usesCleartextTraffic}">
```

> Dadurch ist HTTP in der Entwicklung (Debug) erlaubt, im fertigen Release (Production) jedoch aus Sicherheitsgründen automatisch gesperrt.

---

## 🔍 Debugging

### Android

1. Gerät via USB anschließen & USB-Debugging in den Entwickleroptionen aktivieren.
2. App auf dem Handy starten.
3. In Chrome am PC öffnen: `chrome://inspect`.
4. Klicke bei deinem Gerät auf **"inspect"**, um Console, Netzwerk-Tab und Elemente zu sehen.

### iOS

1. Gerät anschließen.
2. In Safari (auf dem Mac): **Entwickler** → **[Dein Gerät]** → **[App Name]**.

---

## Frontend Command Shortcuts

Diese Scripts in der `frontend/package.json` vereinfachen den mobilen Workflow:

```json
"scripts": {
  "cap:dev": "npm run build && npx cap sync && npx cap run android",
  "android": "npm run build && npx cap sync && npx cap run android",
  "ios": "npm run build && npx cap sync && npx cap run ios",
  "android:open": "npm run build && npx cap sync && npx cap open android",
  "ios:open": "npm run build && npx cap sync && npx cap open ios"
}
```
