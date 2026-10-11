# Mobcast RE

A premium, modern **Expo + React Native + TypeScript** meal recipe application designed for smooth cross-platform performance. Browse categories, search recipes, view detailed ingredients and instructions, save favourites locally, and enjoy automatic device-aware dark mode mapping.

---

## 🚀 Features

*   **Responsive UI Layouts:** Adaptive multi-column grid layout calculations using screen dimension vectors, complete with full-bleed touch targets and horizontally scrollable category chips.
*   **Performance Optimized Search:** Search input is powered by an input throttling debounce pipeline (`400ms`), preventing redundant query storms to remote databases.
*   **Native Gestures & Interaction:** Full integration of system-level pull-to-refresh indicators, custom loading feedback skeleton layers, and interactive empty states.

---

## 🛠️ Tech Stack

*   **Core Architecture:** React Native, Expo SDK 57, TypeScript (Strict Schema Mapping)
*   **Navigation Stack:** React Navigation (Native Stack + Animated Bottom Tabs)
*   **Network Engine:** Axios (Configured client with timeout tracking constraints)
*   **Local Storage:** React Native AsyncStorage Engine Adapter
*   **Testing Infrastructure:** Jest + `jest-expo` test runner presets

---

## 📂 Architecture & Directory Map

```text
├── App.tsx                      # Application baseline entry wrapper
├── app.json                     # Expo SDK configuration and plugin manifest
├── package.json                 # Dependency library versions and test scripts
└── src/
    ├── api/                     # Shared Axios HTTP instance and endpoints
    ├── components/              # Reusable grid views, chips, bars, and states
    ├── constants/               # Domain configurations (timeouts, keys, paddings)
    ├── hooks/                   # Business logic handlers (debouncing, state queries)
    ├── navigation/              # Typed navigation stack routers
    ├── screens/                 # Core screen containers (Home, Details, Saved)
    ├── state/                   # App-wide global data providers
    ├── storage/                 # Local device filesystem adapters
    ├── theme/                   # System-aware palette design tokens
    ├── types/                   # Structural model maps
    └── utils/                   # Ingredient parsing helper pipelines
```

---

## 📡 Remote API References

The network layer hooks directly into the **TheMealDB v1 API**. The custom Axios provider automatically catches unexpected server responses and normalizes a `null` API response into a standard empty array `[]` to prevent user layout crashes:

*   `GET /categories.php` — Retrieves global category array list.
*   `GET /filter.php?c={category}` — Filters meals tracking specified categorizations.
*   `GET /search.php?s={query}` — Pulls filtered term matches.
*   `GET /lookup.php?i={id}` — Fetches individual dish recipe parameters.
*   `GET /random.php` — Selects a randomized surprise item.

---

## 💻 Execution & Local Environment Boot

Follow these instructions to get your local development server running on your Mac.

### 1. Install Project Core Modules
Ensure you are inside the directory containing `package.json` and install the node dependencies cleanly:
```bash
npm install
```

### 2. Launch the Development Environment
Boot up the Expo interactive Metro server with an explicit clear configuration to wipe out legacy caching limits:
```bash
npx expo start --clear
```

### 3. Open on Target Emulator Devices
*   **Android:** Ensure your Android Studio emulator window is loaded on screen, then press **`a`** inside your active terminal console window.
*   **iOS:** Press **`i`** to launch the code within your Mac's default Xcode iOS Simulator block.

### 4. Execute the Jest Test Suite
To confirm the ingredient extraction algorithmic modules and state managers match structural expectations perfectly:
```bash
npm run test
```
