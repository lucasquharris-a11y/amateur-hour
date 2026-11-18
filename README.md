# Amateur Hour

Prototype for a San Francisco membership: one entirely new hands-on class every week. Each Sunday members get two options, pick one and show up.

**Live prototype:** https://lucasquharris-a11y.github.io/amateur-hour/

Nothing here sends or stores data. Sign-up is a mock (any four digits work as the code), and class times and spot counts are sample values.

## What's in here

| File | What it is |
|---|---|
| `home.html` | Landing page |
| `join.html` | Sign-up flow: phone, code, name, preferences, first pick, confirmation |
| `amateur.css` | Shared styles and design tokens |
| `activities.js` | The 20 seed activities, with what is and isn't verified |
| `fonts.js` | Review switches: `?font=`, `?accent=`, `?hand=`, plus `?hero=type` on the landing page |
| `index.html` | Concept board: the idea, how a week works, open decisions |
| `fonts.html`, `colors.html`, `hands.html`, `logo.html` | Side-by-side option pages |
| `1-…` to `4-….html` | The four first-round directions, kept for reference |
| `docs/` | The built public site. Don't edit by hand |

## Run it locally

```bash
python3 -m http.server 8790
```

Then open http://localhost:8790/home.html.

## Publish a change

```bash
python3 build.py
```

Commit and push; GitHub Pages serves `docs/` from `main` about a minute later.
