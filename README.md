# Glow Calculator (Web + Windows + Android)

A polished calculator with live date/time, packaged for:
- **Windows installer** (`.exe`)
- **Android app** (`.apk`)

## Why there is no `.exe` / `.apk` committed in the repo
Installers/APKs are build artifacts and should not be committed to git.
This repo builds them automatically with GitHub Actions and uploads them for download.

## Fastest way for anyone to download install files
### 1) Build from GitHub Actions
1. Push this repo to GitHub.
2. Open **Actions** → **Build desktop and Android artifacts**.
3. Click **Run workflow**.
4. After it finishes, download artifacts:
   - `windows-installer` → contains `.exe`
   - `android-apk` → contains `app-debug.apk`

### 2) Optional: auto-attach files to a GitHub Release
If you publish a GitHub Release, the workflow also attaches:
- built `.exe`
- built `app-debug.apk`

## Local Windows build (for maintainers)
```bash
npm install
npm run dist:win
```
Output: `dist/*.exe`

## Local Android build (for maintainers)
```bash
npm install --ignore-scripts
npx cap add android
npm run cap:sync
cd android
./gradlew assembleDebug
```
Output: `android/app/build/outputs/apk/debug/app-debug.apk`

## Run as plain web app
```bash
python3 -m http.server 4173
```
Open `http://localhost:4173`.
