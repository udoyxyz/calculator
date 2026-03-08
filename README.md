# Glow Calculator (Web + Windows + Android)

A polished calculator with live date/time, now packaged so it can be distributed as:
- a **Windows installer** (`.exe`)
- an **Android app** (`.apk`)

## What this repo includes
- `index.html`, `styles.css`, `script.js`: core calculator UI/logic.
- `electron/`: desktop shell to run the calculator as a native app on Windows.
- `capacitor.config.ts`: Android wrapper config.
- `.github/workflows/build-artifacts.yml`: CI pipeline that builds downloadable Windows and Android artifacts.

## Use it on Windows
### Option A (recommended for end users)
1. Go to your GitHub repository **Actions** tab.
2. Run the **Build desktop and Android artifacts** workflow (or push to `main`).
3. Download the `windows-installer` artifact.
4. Run the generated installer `.exe` and install Glow Calculator.

### Option B (build locally)
```bash
npm install
npm run dist:win
```
Installer output is created in `dist/`.

## Use it on Android
### Option A (recommended for end users)
1. Go to your GitHub repository **Actions** tab.
2. Download the `android-apk` artifact from a successful workflow run.
3. Transfer `app-debug.apk` to your phone.
4. Install it (enable "Install unknown apps" if prompted).

### Option B (build locally)
```bash
npm install
npx cap add android
npm run cap:sync
cd android
./gradlew assembleDebug
```
APK path:
`android/app/build/outputs/apk/debug/app-debug.apk`

## Run as a normal web app
Open `index.html` directly, or run:

```bash
python3 -m http.server 4173
```
Then browse to `http://localhost:4173`.
