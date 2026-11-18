// Review switches: ?font=a|b|c|d|e|f and ?accent=butter|pink|tomato|sky|lilac|sage on home.html or join.html.
(function () {
  var F = {
    b: { cls: 'f-young', href: 'family=Young+Serif&family=Figtree:wght@400;500;600;800' },
    c: { cls: 'f-fraunces', href: 'family=Fraunces:opsz,wght,SOFT@9..144,300..700,0..100&family=Hanken+Grotesk:wght@400;500;600;800' },
    d: { cls: 'f-capra', href: 'family=Caprasimo&family=Hanken+Grotesk:wght@400;500;600;800' },
    e: { cls: 'f-brico', href: '' },
    f: { cls: 'f-plain', href: 'family=Figtree:wght@400;500;600;800' }
  };
  var q = new URLSearchParams(location.search), root = document.documentElement;
  // c is the default type (Fraunces, soft; Hanken Grotesk on cards). ?font=a shows the original pairing.
  var f = F[q.get('font') || 'c'];
  if (f) {
    root.classList.add(f.cls);
    if (f.href) {
      var l = document.createElement('link');
      l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?' + f.href + '&display=swap';
      document.head.appendChild(l);
    }
  }
  // powder blue is the default accent (Lucas, 2026-11-18). ?accent=marigold shows the old orange-yellow.
  var accent = q.get('accent');
  var tone = accent || 'sky';
  if (/^(butter|pink|tomato|sky|lilac|sage)$/.test(tone)) root.classList.add('c-' + tone);
  // handwriting options: ?hand=reenie|covered|shadows|caveat|gochi|kalam|zeyada|homemade (default: Nanum Pen Script)
  var H = {
    reenie: ['Reenie Beanie', 'Reenie+Beanie', 1.16, '-.12em', .84],
    covered: ['Covered By Your Grace', 'Covered+By+Your+Grace', .98],
    shadows: ['Shadows Into Light Two', 'Shadows+Into+Light+Two', .95],
    caveat: ['Caveat', 'Caveat:wght@500;600', 1],
    gochi: ['Gochi Hand', 'Gochi+Hand', .8],
    kalam: ['Kalam', 'Kalam:wght@400', .74],
    zeyada: ['Zeyada', 'Zeyada', 1.12, '-.05em', .86],
    homemade: ['Homemade Apple', 'Homemade+Apple', .56, '0em', 1.3]
  };
  var hand = H[q.get('hand')];
  if (hand) {
    var hl = document.createElement('link');
    hl.rel = 'stylesheet'; hl.href = 'https://fonts.googleapis.com/css2?family=' + hand[1] + '&display=swap';
    document.head.appendChild(hl);
    root.style.setProperty('--hand', '"' + hand[0] + '", cursive');
    root.style.setProperty('--hk', hand[2]);
    root.style.setProperty('--hws', hand[3] || '0em');
    root.style.setProperty('--hlh', hand[4] || .9);
  }
  // carry explicit choices across to the other page
  if (q.get('font') || accent || hand) document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || !/^(join|index)\.html/.test(a.getAttribute('href'))) return;
    var u = new URL(a.href);
    ['font', 'accent', 'hand'].forEach(function (k) { if (q.get(k)) u.searchParams.set(k, q.get(k)); });
    a.href = u.href;
  }, true);
})();
