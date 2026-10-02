# Glide Calendar

A self-contained web app. Everything it needs is in this folder; it makes no requests to other sites.
Calendars you import are stored in the browser on each device and are never uploaded.

## Put it on GitHub Pages

1. On github.com, create a new repository (for example `glide`). On a free GitHub account it must be **Public** for Pages to work. Only the app's code is public, not your calendars.
2. On the repository page choose **Add file → Upload files**. Drag in the *contents* of this folder (index.html, sw.js, manifest.webmanifest, jszip.min.js, and the `fonts` and `icons` folders), so that `index.html` sits at the top level of the repository. Commit.
3. Go to **Settings → Pages**. Under "Build and deployment" set Source to **Deploy from a branch**, Branch to **main** and folder **/ (root)**. Save.
4. Wait a minute or two, then open `https://YOUR-USERNAME.github.io/glide/`.

## Install it

- **Mac:** open the address in Safari, then **File → Add to Dock** (macOS Sonoma 14 or later).
- **iPhone:** open the address in **Safari** (not another browser), tap **Share → Add to Home Screen**.

Open the installed app once while online. After that it also opens offline.

## Things to know

- The installed app has its own storage, separate from Safari and separate on each device. Import your calendars inside the installed app, on the Mac and on the iPhone.
- Data belongs to the address. If you later move the app to a different address (for example from GitHub Pages to a Raspberry Pi), import again there.
- To update: upload the new files over the old ones. The app picks up a new version the second time you open it after the upload.

## Run it on a Raspberry Pi instead

Copy this folder to the Pi, then from inside the folder:

    python3 -m http.server 8080

Open `http://raspberrypi.local:8080/` from a device on the same network (use the Pi's own hostname or IP address).
Over plain http the app works and can be added to the Dock or Home Screen, but it will not open offline, because browsers only allow offline support over https.

For https, and access away from home, install Tailscale on the Pi, the Mac and the iPhone, then on the Pi:

    tailscale serve --bg --https=443 /full/path/to/this/folder

and open `https://<pi-name>.<your-tailnet>.ts.net/`.
