// ==========================================================================
// CAD / HUD INTERACTIVE ENGINE
// ==========================================================================

// 1. Часы и статус
function tickClock() {
  const el = document.getElementById('clock');
  if (!el) return;
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  el.textContent = `${hh}:${mm}:${ss} · CHELYABINSK_SYS`;
}
tickClock();
setInterval(tickClock, 1000);

// 2. Плавное проявление элементов
const revealEls = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in-view'));
}

// 3. Активные ссылки в меню при скролле
const sections = document.querySelectorAll('main > .section');
const navLinks = document.querySelectorAll('.nav-links a');

if ('IntersectionObserver' in window && sections.length) {
  const navIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(sec => navIO.observe(sec));
}

// 4. Копирование контактов
document.querySelectorAll('.copyable').forEach(btn => {
  btn.addEventListener('click', async () => {
    const value = btn.getAttribute('data-copy');
    const flag = btn.querySelector('.copy-flag');
    if (!value || !flag) return;

    try {
      await navigator.clipboard.writeText(value);
    } catch (err) {}

    const original = flag.textContent;
    flag.textContent = 'COPIED!';
    flag.classList.add('copied');
    setTimeout(() => {
      flag.textContent = original;
      flag.classList.remove('copied');
    }, 1800);
  });
});

// 5. Легкий Parallax-эффект наклона карточек при наведении (CAD/HUD feel)
const cards = document.querySelectorAll('.project-card, .stack-card, .sit-block');
cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  });
});