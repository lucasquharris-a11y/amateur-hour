#!/usr/bin/env python3
"""Build the public site into docs/ (served by GitHub Pages) from the working files.

  python3 build.py

home.html becomes docs/index.html, links are rewritten, and asset URLs get a version
stamp so browsers pick up changes straight away.
"""
import re, shutil, time, pathlib

root = pathlib.Path(__file__).parent
docs = root / "docs"
docs.mkdir(exist_ok=True)
v = str(int(time.time()))
meta = '<meta name="viewport" content="width=device-width, initial-scale=1">'

def page(src, dst):
    s = (root / src).read_text().replace('href="home.html"', 'href="index.html"')
    s = s.replace(meta, meta + '\n<meta name="robots" content="noindex">', 1)
    s = re.sub(r'(amateur\.css|fonts\.js|activities\.js)"', lambda m: f'{m.group(1)}?v={v}"', s)
    (docs / dst).write_text(s)

page("home.html", "index.html")
page("join.html", "join.html")
for name in ("hands.html", "colors.html", "fonts.html", "compare.html", "choice.html"):
    s = (root / name).read_text().replace("home.html?", "index.html?").replace('"home.html"', '"index.html"')
    (docs / name).write_text(s.replace(meta, meta + '\n<meta name="robots" content="noindex">', 1))
shutil.copy(root / "logo.html", docs / "logo.html")
(docs / "fonts.js").write_text((root / "fonts.js").read_text().replace("/^(join|home)\\.html/", "/^(join|index)\\.html/"))
for name in ("amateur.css", "activities.js"):
    shutil.copy(root / name, docs / name)
print("built docs/ at version", v)
