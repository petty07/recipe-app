<img width="1179" height="2556" alt="img4" src="https://github.com/user-attachments/assets/bc5997ba-ee7d-4d14-ae87-d8130aeeb9eb" /><img width="1179" height="2556" alt="img3" src="https://github.com/user-attachments/assets/b30bbd74-470d-4d8c-ab61-0d241edac364" /><img width="1179" height="2556" alt="img3" src="https://github.com/user-attachments/assets/9b5dded6-6acd-4075-8cdd-d923ad5d4fb8" /># Mobcast RE

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



<img width="1179" height="2556" alt="img1" src="https://github.com/user-attachments/assets/f25bc3b8-ada4-4440-a73f-692d43eb3368" />
<img width="1179" height="2556" alt="img2" src="https://github.com/user-attachments/assets/99bf8922-6731-4767-9456-355a81ab08df" />
<img width="1179" height="2556" alt="img3" src="https://github.com/user-attachments/assets/f8480167-efa1-4ae4-ac86-8ffbd6b79150" />
<img width="1179" height="2556" alt="img4" src="https://github.com/user-attachments/assets/85979d79-509b-49b3-9dba-1237f9b4d54b" />
<img width="1179" height="2556" alt="img5" src="https://github.com/user-attachments/assets/7af882bd-a74c-40e5-adf1-53d7490743cd" />
<img width="1179" height="2556" alt="img6" src="https://github.com/user-attachments/assets/2276b63a-23d5-4b4d-8a55-86e5ee1cd817" />



