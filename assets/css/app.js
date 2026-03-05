// assets/js/app.js

// List every "page-____" you have in index.html
const PAGES = ['home','east','middle','armenia','art','gilded','orthodox'];

function go(id){
  // safety: if someone calls go() with a bad id, ignore
  if (!PAGES.includes(id)) return;

  // hide all pages + remove active nav
  PAGES.forEach(p => {
    const page = document.getElementById('page-' + p);
    if (page) page.classList.remove('active');

    const nav = document.getElementById('nav-' + p);
    if (nav) nav.classList.remove('active');
  });

  // show requested page + set active nav
  const target = document.getElementById('page-' + id);
  if (target) target.classList.add('active');

  const navTarget = document.getElementById('nav-' + id);
  if (navTarget) navTarget.classList.add('active');

  // update URL hash for deep linking (optional but nice)
  if (id === 'home') {
    history.replaceState(null, '', window.location.pathname);
  } else {
    history.replaceState(null, '', '#' + id);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Optional toast helper if you want it from JS too
function toast(msg, ms=2700){
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), ms);
}

// Load correct page on refresh if URL has a hash (#east, #armenia, etc.)
window.addEventListener('load', () => {
  const hash = (window.location.hash || '').replace('#', '').trim();
  if (hash && PAGES.includes(hash)) {
    go(hash);
  } else {
    go('home');
  }
});

// Also respond if user manually edits the hash or uses back/forward
window.addEventListener('hashchange', () => {
  const hash = (window.location.hash || '').replace('#', '').trim();
  if (hash && PAGES.includes(hash)) go(hash);
});
