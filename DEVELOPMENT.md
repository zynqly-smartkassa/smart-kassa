# Development

## Requirements

### General (Web & Mobile)

- **Node.js** (>= 18.18)
- **npm** (Node Package Manager)
- **Git** (Version Control)
- A code editor (e.g., Visual Studio Code)

### Web Application

No additional requirements beyond the general setup.

### Mobile - Android

- **Android Studio** (latest version)
- **JDK** (Java Development Kit 17 or higher)
- **Android SDK** (API Level 23 or higher)
- Android device or emulator

### Mobile - iOS

- **macOS** (required for iOS development)
- **Xcode** (14.0 or higher)
- **CocoaPods** (iOS dependency manager)
- iOS device or simulator
- Apple Developer Account (for physical device deployment)

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/zynqly-smartkassa/smart-kassa.git
cd smart-kassa
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../backend
npm install
```

### 4. Environment Configuration

**Frontend** - Create a `.env.local` file in the `frontend` directory:

```env
VITE_API_URL="http://localhost:3000"
VITE_TOKEN="your-mapbox-token"
NODE_ENV="development"
MOBILE_REFRESH="false"  # Set to "true" for mobile live reload
LOCAL_URL="http://192.168.x.x:5173"  # Your local IP for mobile development
```

**Backend** - Create a `.env` file in the `backend` directory:

```env
DATABASE_URL="your-postgresql-connection-string"
JWT_SECRET="your-jwt-secret"
AWS_ACCESS_KEY_ID="your-aws-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret"
```

---

## Running the Application

### Web Application

**Start Backend:**
```bash
cd backend
npm run dev
```

> Note: Some features use services from Railway, so you need to set up Railway (see [DEPLOYMENT.md](./docs/DEPLOYMENT.md)) for all features to work correctly.

**Start Frontend:**
```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Mobile - Android

```bash
cd frontend
npm run android
```

This will build the app, sync Capacitor, and launch Android Studio.

### Mobile - iOS

```bash
cd frontend
npm run ios
```

This will build the app, sync Capacitor, and launch Xcode.

### Mobile Live Reload

For live reload during mobile development:

1. Set `MOBILE_REFRESH="true"` in `.env.local`
2. Update `LOCAL_URL` with your local IP address
3. Start the dev server: `npm run dev`
4. Run the mobile app: `npm run android` or `npm run ios`

---

## Scripts

### Root (run from project root)

| Script | Command | Description |
|--------|---------|-------------|
| `npm run dev` | `concurrently start-frontend start-backend` | Starts Frontend **and** Backend simultaneously — fastest way for local development |
| `npm run start-frontend` | `npm run dev --prefix frontend` | Starts only the Frontend (Vite Dev Server) |
| `npm run start-backend` | `npm run dev --prefix backend` | Starts only the Backend (Express + Auto-Reload) |
| `npm run android` | frontend build → cap sync → cap run android | Builds the app, syncs Capacitor and runs it on an Android device/emulator |
| `npm run ios` | frontend build → cap sync → cap run ios | Builds the app, syncs Capacitor and runs it on an iOS device/simulator (macOS only) |

---

### Frontend (`cd frontend`)

#### Development

| Script | Command | Description |
|--------|---------|-------------|
| `npm run dev` | `vite --host` | Starts Vite Dev Server with Hot-Reload. `--host` makes it reachable on the local network (required for Mobile Live Reload) |
| `npm run preview` | `vite preview` | Starts a local server for the **production build** — for testing before deployment |

#### Build & Code Quality

| Script | Command | Description |
|--------|---------|-------------|
| `npm run build` | `tsc -b && vite build` | TypeScript type check + production build (output in `dist/`) |
| `npm run lint` | `eslint .` | Analyzes code for style issues and potential bugs |

#### Tests

| Script | Command | Description |
|--------|---------|-------------|
| `npm run test` | `vitest` | Runs all unit tests with Vitest |
| `npm run testc` | `vitest --coverage` | Runs all tests **and** generates a coverage report |

#### Documentation & Tools

| Script | Command | Description |
|--------|---------|-------------|
| `npm run docs` | `typedoc --plugin typedoc-plugin-markdown` | Generates API documentation from TypeDoc comments |
| `npm run email` | `email dev --dir src/pages/notifications/emails` | Starts a local preview server for email templates |

#### Mobile (Capacitor)

| Script | Command | Description |
|--------|---------|-------------|
| `npm run android` | build → cap sync → cap run android | Builds the app, syncs native files and deploys to an Android device/emulator |
| `npm run ios` | build → cap sync → cap run ios | Builds the app, syncs native files and deploys to an iOS device/simulator |
| `npm run android:open` | build → cap sync → cap open android | Opens the project in **Android Studio** for manual debugging/configuration |
| `npm run ios:open` | build → cap sync → cap open ios | Opens the project in **Xcode** for manual debugging/configuration |

---

### Backend (`cd backend`)

| Script | Command | Description |
|--------|---------|-------------|
| `npm run dev` | `npm install && node --watch app.js` | Installs dependencies and starts the server with **Auto-Reload** |
| `npm run start` | `node app.js` | Starts the server **without** Auto-Reload — for production environments |

---

## Tools We Used

### Documentation

- Markdown (Markup Language)
- Mermaid Chart (Diagramming Tool)
- Figma (Design Platform)
- Microsoft Word (Word Processing Program)

<p align="center">
  <img src="https://img.shields.io/badge/markdown-%23000000.svg?style=plastic&logo=markdown&logoColor=white" alt="Markdown">
  <img src="https://img.shields.io/badge/Mermaid-FF3670?style=plastic&logo=mermaid&logoColor=white" alt="Mermaid">
  <img src="https://img.shields.io/badge/figma-%23F24E1E.svg?style=plastic&logo=figma&logoColor=white" alt="Figma">
  <img src="https://img.shields.io/badge/Microsoft_Word-2B579A?style=plastic&logo=microsoft-word&logoColor=white" alt="Microsoft Word">
</p>

---

### Agile Development

- GitHub / GitHub Projects (project management)
- Microsoft Teams (communication and collaboration)
- WhatsApp (instant messaging)
- Miro (visual collaboration / digital whiteboard)

<p align="center">
  <img src="https://img.shields.io/badge/github-%23121011.svg?style=plastic&logo=github&logoColor=white" alt="GitHub">
  <img src="https://img.shields.io/badge/Microsoft_Teams-6264A7?style=plastic&logo=microsoft-teams&logoColor=white" alt="Microsoft Teams">
  <img src="https://img.shields.io/badge/WhatsApp-25D366?style=plastic&logo=whatsapp&logoColor=white" alt="WhatsApp">
  <img src="https://img.shields.io/badge/Miro-050038?style=plastic&logo=Miro&logoColor=white" alt="Miro">
</p>

---

### Code Editors

- Visual Studio Code
- Android Studio
- Xcode

<p align="center">
  <img src="https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=plastic&logo=visual-studio-code&logoColor=white" alt="Visual Studio Code">
  <img src="https://img.shields.io/badge/Android%20Studio-3DDC84.svg?style=plastic&logo=android-studio&logoColor=white" alt="Android Studio">
  <img src="https://img.shields.io/badge/Xcode-007ACC?style=plastic&logo=Xcode&logoColor=white" alt="Xcode">
</p>
