# Game Night Scores (synced with Firebase)

Log final scores from board game nights. Sign in on iPhone, iPad, Mac or PC and see the
same history everywhere. Works offline and syncs when back online.

## 1. Set up Firebase (free Spark plan, no card needed)
1. Go to console.firebase.google.com > Create a project. Analytics can be switched off.
2. On the project overview, click the Web icon (</>), give it a nickname, Register app.
   Copy the firebaseConfig values into firebase-config.js. Skip "Firebase Hosting".
3. Build > Authentication > Get started > Email/Password > Enable > Save.
4. Authentication > Settings > Authorized domains > Add domain: YOUR-USERNAME.github.io
5. Build > Firestore Database > Create database. Pick a location near you
   (e.g. asia-southeast1, Singapore). Start in production mode.
6. Firestore > Rules: replace everything with the contents of firestore.rules > Publish.

## 2. Host on GitHub Pages
Upload all files in this folder to your repository (replace the old ones), then open
https://YOUR-USERNAME.github.io/scores/ and choose Create account.

## 3. Install
- iPhone/iPad: Safari > Share > Add to Home Screen. If you installed the first version,
  delete that home-screen icon and add it again.
- Mac: Safari > File > Add to Dock (or the install icon in Chrome/Edge).
- PC: install icon in Chrome/Edge's address bar.

## Updating later
Upload changed files and bump the cache name in sw.js (scores-v2 -> scores-v3).
