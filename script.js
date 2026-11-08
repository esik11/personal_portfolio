/* Jeorge Andrei — Portfolio scripts
   Everything here is progressive: the site still reads fine if this file fails to load. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Theme toggle (the initial theme is set by a tiny inline script in <head>) ---------- */
  const root = document.documentElement;
  const themeBtn = $('.theme-toggle');
  if (themeBtn) {
    const sync = () => themeBtn.setAttribute('aria-label', root.dataset.theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    sync();
    themeBtn.addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
      try { localStorage.setItem('theme', root.dataset.theme); } catch (e) { /* storage unavailable */ }
      sync();
    });
  }

  /* ---------- Mobile menu ---------- */
  const menuBtn = $('.menu-toggle');
  const nav = $('#site-nav');
  if (menuBtn && nav) {
    const setOpen = (open) => {
      nav.classList.toggle('open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.style.overflow = open ? 'hidden' : '';
    };
    menuBtn.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
    window.matchMedia('(min-width: 761px)').addEventListener('change', () => setOpen(false));
  }

  /* ---------- Scroll progress + back-to-top ---------- */
  const bar = $('.progress');
  const fab = $('.fab');
  let ticking = false;
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(scrollY / max, 1) : 0})`;
    if (fab) fab.classList.toggle('show', scrollY > 700);
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
  $$('[data-to-top]').forEach((b) => b.addEventListener('click', () => scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })));

  /* ---------- Live clock (Manila time). Change the timeZone to match where you are. ---------- */
  const clocks = $$('[data-clock]');
  if (clocks.length) {
    const fmt = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Manila', hour: 'numeric', minute: '2-digit', hour12: true });
    const tick = () => clocks.forEach((c) => { c.textContent = fmt.format(new Date()); });
    tick();
    setInterval(tick, 15000);
  }

  /* ---------- Count-up numbers ---------- */
  const counters = $$('[data-count]');
  if (counters.length) {
    const run = (el) => {
      const end = Number(el.dataset.count);
      const small = $('small', el);
      const suffix = small ? small.outerHTML : '';
      if (reduceMotion) { el.innerHTML = end + suffix; return; }
      const t0 = performance.now();
      const dur = 1100;
      const step = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        el.innerHTML = Math.round(end * (1 - Math.pow(1 - p, 3))) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.6 });
    counters.forEach((c) => io.observe(c));
  }

  /* ---------- Scroll reveal ---------- */
  const reveals = $$('[data-reveal]');
  if (reveals.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((r) => io.observe(r));
  } else {
    reveals.forEach((r) => r.classList.add('in'));
  }

  /* ---------- Pointer glow on screenshots ---------- */
  $$('.screen').forEach((s) => {
    s.addEventListener('pointermove', (e) => {
      const r = s.getBoundingClientRect();
      s.style.setProperty('--mx', `${e.clientX - r.left}px`);
      s.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  /* ---------- Button ripple ---------- */
  $$('.btn').forEach((b) => b.addEventListener('click', (e) => {
    if (reduceMotion) return;
    const r = b.getBoundingClientRect();
    const size = Math.max(r.width, r.height);
    const dot = document.createElement('span');
    dot.className = 'ripple';
    dot.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`;
    b.appendChild(dot);
    setTimeout(() => dot.remove(), 600);
  }));

  /* ---------- Copy email ---------- */
  $$('[data-copy]').forEach((b) => b.addEventListener('click', async () => {
    const label = $('span', b);
    try {
      await navigator.clipboard.writeText(b.dataset.copy);
      label.textContent = 'Copied';
    } catch (e) {
      label.textContent = 'Press Ctrl+C';
    }
    setTimeout(() => { label.textContent = 'Copy'; }, 1800);
  }));

  /* ---------- Side-project filters ---------- */
  const filters = $$('.filter');
  if (filters.length) {
    const cards = $$('.side-card');
    const empty = $('.empty-note');
    filters.forEach((f) => f.addEventListener('click', () => {
      filters.forEach((x) => x.setAttribute('aria-pressed', String(x === f)));
      const cat = f.dataset.filter;
      let shown = 0;
      cards.forEach((c) => {
        const match = cat === 'all' || c.dataset.category === cat;
        if (match) shown++;
        if (match && c.hidden) {
          c.hidden = false;
          c.classList.add('is-leaving');
          requestAnimationFrame(() => requestAnimationFrame(() => c.classList.remove('is-leaving')));
        } else if (!match && !c.hidden) {
          c.classList.add('is-leaving');
          setTimeout(() => { c.hidden = true; }, reduceMotion ? 0 : 220);
        }
      });
      if (empty) empty.style.display = shown ? 'none' : 'block';
    }));
  }

  /* ---------- Active tab on scroll (projects page) ---------- */
  const tabs = $$('.subnav a[href^="#"]');
  if (tabs.length) {
    const targets = tabs.map((t) => $(t.getAttribute('href'))).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) tabs.forEach((t) => t.classList.toggle('is-active', t.getAttribute('href') === '#' + en.target.id));
      });
    }, { rootMargin: '-35% 0px -60% 0px' });
    targets.forEach((t) => io.observe(t));
  }

  /* ---------- Lightbox (any image inside [data-lightbox]) ---------- */
  const items = $$('[data-lightbox] img');
  if (items.length) {
    const dlg = document.createElement('dialog');
    dlg.className = 'lightbox';
    dlg.setAttribute('aria-label', 'Image viewer');
    dlg.innerHTML = `
      <div class="lb-inner"><img alt=""><p class="lb-cap"></p></div>
      <span class="lb-count" aria-live="polite"></span>
      <button class="lb-btn lb-close" aria-label="Close"><svg><use href="#i-close"/></svg></button>
      <button class="lb-btn lb-prev" aria-label="Previous image"><svg><use href="#i-arrow"/></svg></button>
      <button class="lb-btn lb-next" aria-label="Next image"><svg><use href="#i-arrow"/></svg></button>`;
    document.body.appendChild(dlg);
    const big = $('img', dlg), cap = $('.lb-cap', dlg), count = $('.lb-count', dlg);
    let i = 0;
    const show = (n) => {
      i = (n + items.length) % items.length;
      const src = items[i];
      big.src = src.currentSrc || src.src;
      big.alt = src.alt;
      const fc = src.closest('figure, .doc');
      const text = fc ? ($('figcaption p, figcaption, h3', fc) || {}).textContent : '';
      cap.textContent = text || src.alt;
      count.textContent = `${i + 1} / ${items.length}`;
    };
    const open = (n) => { show(n); if (!dlg.open) dlg.showModal(); };
    items.forEach((img, n) => {
      img.closest('figure, .screen, .doc')?.addEventListener('click', () => open(n));
      img.tabIndex = 0;
      img.setAttribute('role', 'button');
      img.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(n); } });
    });
    $('.lb-close', dlg).addEventListener('click', () => dlg.close());
    $('.lb-prev', dlg).addEventListener('click', () => show(i - 1));
    $('.lb-next', dlg).addEventListener('click', () => show(i + 1));
    dlg.addEventListener('click', (e) => { if (e.target === dlg || e.target.classList.contains('lb-inner')) dlg.close(); });
    dlg.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') show(i - 1);
      if (e.key === 'ArrowRight') show(i + 1);
    });
    let x0 = null;
    dlg.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    dlg.addEventListener('touchend', (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) show(i + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  }
})();
