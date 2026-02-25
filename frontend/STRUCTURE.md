# Frontend Source Structure

This document describes the folder conventions inside `frontend/src/`.

---

## Overview

```
frontend/src/
├── components/        # All reusable UI components
├── content/           # Static text / config data
├── hooks/             # Custom React hooks
├── lib/               # Third-party library setup
├── pages/             # Page-level entry components
├── types/             # TypeScript type definitions
├── utils/             # Utility / helper functions
├── App.tsx            # Root component & route declarations
├── main.tsx           # Application entry point
├── index.css          # Global base styles
├── routing.css        # Transition / routing animations
└── standard.css       # Shared utility classes
```

---

## Folder Rules

### `pages/`

Each file represents one route. **A page component only defines the layout and content of that page** — it does not contain sub-components inline.

```
pages/
├── Home.tsx
├── Settings.tsx
├── Documentation.tsx
├── Help.tsx
├── auth/
│   ├── Login.tsx
│   └── Register.tsx
├── invoices/
│   ├── Invoices.tsx
│   └── Payment.tsx
├── notifications/
│   ├── SingleNotification.tsx
│   └── inlineSlider/
│       ├── Notifications.tsx
│       ├── NotificationsMessages.tsx
│       └── Message.tsx
└── rides/
    ├── AllRides.tsx
    ├── Ride.tsx
    ├── Bill.tsx
    ├── RideAtDate.tsx
    └── SummaryRide.tsx
```

> **Rule:** If a component is used exclusively on one page, it still belongs in `components/`, not inside `pages/`. Pages only render content — they do not define new components.

---

### `components/`

Contains every component that is used by a page. Components are grouped into **subfolders named after the page or feature they belong to**.

```
components/
├── ui/                        # shadcn/ui primitives (button, card, input, ...)
├── providers/                 # App-wide wrappers (ProtectedRoute, RootLayout, ThemeProvider)
├── AppSidebar.tsx             # Global sidebar (used across all pages)
├── StatusOverlay.tsx          # Global status overlay
│
├── Home/                      # Components used in pages/Home.tsx
│   └── Balance.tsx
│
├── Payment/                   # Components used in pages/invoices/Payment.tsx
│   ├── LoadingPayment.tsx
│   └── NoRideDataWarning.tsx
│
├── settings/                  # Components used in pages/Settings.tsx
│   ├── Account.tsx
│   ├── Notifications.tsx
│   ├── SingleNotification.tsx
│   └── UiStyling.tsx
│
└── inputs/                    # Shared input components (used across multiple pages)
    ├── Inputs.tsx
    ├── PasswordInputs.tsx
    └── SearchInput.tsx
```

**Naming convention:**

| Situation | Where it goes |
|---|---|
| Component used by one page | `components/<PageName>/MyComponent.tsx` |
| Component used by multiple pages | `components/<FeatureName>/MyComponent.tsx` |
| Global component (sidebar, overlay) | `components/MyComponent.tsx` (root level) |
| shadcn/ui primitive | `components/ui/` |
| App-wide provider / layout wrapper | `components/providers/` |

---

### `hooks/`

Custom React hooks grouped by domain.

```
hooks/
├── layout/
│   ├── keyboardResizer.ts   # Handles virtual keyboard resize on mobile
│   ├── use-mobile.tsx       # Detects mobile viewport
│   └── useTheme.ts          # Reads/sets the active theme
├── rides/
│   ├── useDriverLocation.ts # Tracks GPS location during a ride
│   └── useRideStates.ts     # Ride start/stop state machine
└── userfeedback/
    ├── useAchievements.ts
    ├── useNews.ts
    ├── useNotificationCheck.ts
    ├── useToast.ts
    └── useValidator.ts
```

---

### `utils/`

Pure functions and helpers grouped by domain. No React — no JSX.

```
utils/
├── config.ts               # Global app config values
├── dashboard.ts            # Dashboard data helpers
├── formatDate.ts           # Date formatting
├── secureStorage.ts        # Access/refresh token storage (AuthStorage)
├── auth/
│   ├── auth.ts             # Auth request helpers
│   ├── deviceId.ts         # Device ID generation
│   └── jwttokens.ts        # JWT refresh logic
├── errorHandling/
│   ├── authErrorHandler.ts
│   ├── tokenErrorHandler.ts
│   ├── updateProfileErrorHandler.ts
│   └── index.ts
├── invoices/
│   ├── appendBills.ts
│   ├── fetchDownload.ts
│   ├── sendBill.ts
│   └── setRideInfo.ts      # Persists ride info between pages
├── profile/
│   ├── getAvatar.ts
│   └── updateProfile.ts
├── rides/
│   ├── all-rides.ts
│   ├── formatTime.ts
│   ├── geoAdress.ts
│   ├── getDate.ts
│   ├── getRides.ts
│   ├── icons.ts
│   ├── reverseGeocode.ts
│   ├── ride.ts
│   ├── sort.ts
│   └── summaryMinutes.ts
└── test/
    ├── input.ts
    └── renderWithRouter.tsx
```

---

### `content/`

Static data and configuration used to populate the UI — no logic, no API calls.

```
content/
├── auth/
│   ├── auth.ts              # Auth form field config
│   ├── toastMessages.ts     # Toast message strings
│   └── validationMessages.ts
├── balance/
│   ├── config.ts
│   └── data.ts
├── header/
│   └── navContent.ts        # Navigation link definitions
├── home/
│   ├── homeContent.ts
│   ├── monthData.ts
│   ├── todayData.ts
│   └── weekData.ts
└── sidebar/
    └── sidebar.ts           # Sidebar item definitions
```

---

### `types/`

TypeScript type and interface definitions shared across the app.

```
types/
├── InvoiceFile.ts       # Type for invoice file objects returned by the API
├── RideInfoForBill.ts   # Type for ride data passed to the Payment page
└── leaflet-routing.d.ts # Type declarations for the Leaflet routing plugin
```

---

### `lib/`

Minimal setup files for third-party libraries.

```
lib/
└── utils.ts    # cn() helper (clsx + tailwind-merge) used by shadcn/ui
```
