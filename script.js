document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. THEME SWITCHER (DARK / LIGHT)
  // ==========================================
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('.theme-icon');
  const themeText = themeToggle.querySelector('.theme-text');
  
  // Проверка сохраненной темы
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });

  function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      themeIcon.textContent = '🌙';
      themeText.textContent = 'DARK';
    } else {
      themeIcon.textContent = '☀️';
      themeText.textContent = 'LIGHT';
    }
  }

  // ==========================================
  // 2. SCROLL REVEAL ANIMATION
  // ==========================================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('on');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ==========================================
  // 3. NAV ACTIVE LINK HIGHLIGHTING
  // ==========================================
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop;
      if (window.pageYOffset >= top - 150) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === `#${current}`) {
        a.classList.add('active');
      }
    });
  });

  // ==========================================
  // 4. COPY TO CLIPBOARD FUNCTIONALITY
  // ==========================================
  document.querySelectorAll('.copyable').forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          const hint = btn.querySelector('.copy-hint');
          const originalText = hint.textContent;
          hint.textContent = 'СКОПИРОВАНО!';
          hint.style.color = 'var(--cyan)';
          setTimeout(() => {
            hint.textContent = originalText;
            hint.style.color = 'var(--muted)';
          }, 2000);
        });
      }
    });
  });

  // ==========================================
  // 5. 3D PARALLAX EFFECT ON CARDS
  // ==========================================
  document.querySelectorAll('.hud-card, .avatar-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      card.style.transform = `perspective(1000px) rotateX(${-y / 25}deg) rotateY(${x / 25}deg) translateY(-3px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'none';
    });
  });

});