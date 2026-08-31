# SanoSec Website v1

A lightweight static website for SanoSec. No WordPress, plugins, build process or paid dependencies required.

## Files
- `index.html` — page content
- `styles.css` — design, responsiveness and animations
- `script.js` — navigation, scroll reveals, score animation, cursor glow and card tilt

## Run locally
Double-click `index.html`, or for best results run a tiny local web server from this folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Before publishing
1. Confirm `hello@sanosec.co.uk` is the correct contact address.
2. Replace or expand the About copy when ready.
3. Add Privacy / Cookies pages before collecting visitor data through forms or analytics.
4. If a contact form is added, use a form service or serverless endpoint rather than exposing secrets in frontend JavaScript.
5. The Google Fonts links can be removed/self-hosted later if you want zero third-party font requests.

## Hosting
This can be deployed easily to GitHub Pages, Cloudflare Pages, Netlify or similar static hosting.
