document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. THEME SWITCHER (DARK / LIGHT)
  // ==========================================
  const themeToggle = document.getElementById('themeToggle');
  
  if (themeToggle) {
    const themeIcon = themeToggle.querySelector('.theme-icon');
    const themeText = themeToggle.querySelector('.theme-text');
    
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
      if (themeIcon && themeText) {
        if (theme === 'dark') {
          themeIcon.textContent = '🌙';
          themeText.textContent = 'DARK';
        } else {
          themeIcon.textContent = '☀️';
          themeText.textContent = 'LIGHT';
        }
      }
    }
  }

  // ==========================================
  // 2. SCROLL REVEAL (Появление блоков при скролле)
  // ==========================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Поддерживаем оба класса для анимации появление
        entry.target.classList.add('on');
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

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
          const hint = btn.querySelector('.copy-hint') || btn.querySelector('.copy-flag');
          if (hint) {
            const originalText = hint.textContent;
            hint.textContent = 'СКОПИРОВАНО!';
            hint.classList.add('copied');
            setTimeout(() => {
              hint.textContent = originalText;
              hint.classList.remove('copied');
            }, 2000);
          }
        });
      }
    });
  });

  // ==========================================
  // 5. 3D HOVER PARALLAX EFFECT ON CARDS
  // ==========================================
  const cards = document.querySelectorAll('.hud-card, .avatar-card, .stack-card, .project-card, .contact-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Наклон карточки за мышкой
      card.style.transform = `perspective(1000px) rotateX(${-y / 20}deg) rotateY(${x / 20}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

});