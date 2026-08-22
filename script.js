(() => {
  'use strict';

  /* =========================================================
     THEME TOGGLE
     ========================================================= */
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const THEME_KEY = 'forgesoft-theme';

  function applyTheme(theme){
    root.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  const savedTheme = localStorage.getItem(THEME_KEY)
    || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  applyTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });

  /* =========================================================
     MOBILE NAV
     ========================================================= */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  burger.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });

  /* =========================================================
     TICKER — duplicate content for seamless loop
     ========================================================= */
  const TECH = [
    'SolidWorks', 'NX', 'Femap', 'Python', 'C++', 'ROS / Gazebo',
    'YOLO', 'OpenCV', 'ArduPilot', 'Betaflight', 'Raspberry Pi', 'MQTT'
  ];
  const tickerTrack = document.getElementById('tickerTrack');
  function buildTicker(){
    const frag = document.createDocumentFragment();
    for (let rep = 0; rep < 2; rep++){
      TECH.forEach(item => {
        const el = document.createElement('span');
        el.className = 'ticker-item';
        el.innerHTML = `<span>//</span>${item}`;
        frag.appendChild(el);
      });
    }
    tickerTrack.appendChild(frag);
  }
  buildTicker();

  /* =========================================================
     SCROLL REVEAL
     ========================================================= */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  /* =========================================================
     ACTIVE NAV LINK ON SCROLL
     ========================================================= */
  const sections = ['info','stack','projects','articles','experience','sit','contacts']
    .map(id => document.getElementById(id))
    .filter(Boolean);
  const navLinks = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = document.querySelector(`.nav-link[data-nav="${id}"]`);
      if (!link) return;
      if (entry.isIntersecting){
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { threshold: 0, rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(sec => navObserver.observe(sec));

  /* =========================================================
     HEADER — subtle elevation on scroll
     ========================================================= */
  const header = document.getElementById('header');
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    header.style.borderBottomColor = y > 10
      ? 'var(--border-strong)'
      : 'var(--border)';
    lastY = y;
  }, { passive: true });

  /* =========================================================
     3D TILT ON HOVER
     ========================================================= */
  const tiltEls = document.querySelectorAll('.tilt');
  const isFinePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;

  if (isFinePointer){
    tiltEls.forEach(el => {
      let rect = null;

      el.addEventListener('mouseenter', () => {
        rect = el.getBoundingClientRect();
        el.style.transition = 'transform .05s linear, background .25s ease';
      });

      el.addEventListener('mousemove', (e) => {
        if (!rect) rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;   // 0..1
        const py = (e.clientY - rect.top) / rect.height;   // 0..1
        const rotateX = (0.5 - py) * 10;
        const rotateY = (px - 0.5) * 10;
        el.style.transform =
          `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px) scale(1.01)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transition = 'transform .4s cubic-bezier(.16,1,.3,1), background .25s ease';
        el.style.transform = 'perspective(700px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        rect = null;
      });
    });
  }

  /* =========================================================
     COPY TO CLIPBOARD
     ========================================================= */
  const toast = document.getElementById('toast');
  let toastTimer = null;

  function showToast(text){
    toast.querySelector('span:last-child').textContent = text;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  document.querySelectorAll('[data-copy]').forEach(el => {
    el.addEventListener('click', async () => {
      const value = el.getAttribute('data-copy');
      try{
        await navigator.clipboard.writeText(value);
      }catch(err){
        const ta = document.createElement('textarea');
        ta.value = value;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      showToast(`СКОПИРОВАНО: ${value}`);
    });
  });

  /* =========================================================
     CUSTOM CURSOR DOT
     ========================================================= */
  const cursorDot = document.querySelector('.cursor-dot');
  if (isFinePointer && cursorDot){
    window.addEventListener('mousemove', (e) => {
      cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
    }, { passive: true });

    document.querySelectorAll('a, button, .tilt').forEach(el => {
      el.addEventListener('mouseenter', () => cursorDot.style.transform += ' scale(2.2)');
      el.addEventListener('mouseleave', () => {});
    });
  }

  /* =========================================================
     HERO GEO COORDS — subtle live jitter for HUD authenticity
     ========================================================= */
  const geoEl = document.getElementById('geoCoords');
  const baseLat = 55.1644, baseLng = 61.4368;
  if (geoEl){
    setInterval(() => {
      const jLat = (baseLat + (Math.random() - 0.5) * 0.0006).toFixed(4);
      const jLng = (baseLng + (Math.random() - 0.5) * 0.0006).toFixed(4);
      geoEl.textContent = `${jLat}° N, ${jLng}° E`;
    }, 2600);
  }

})();