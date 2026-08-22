document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. THEME TOGGLE (Dark / Light)
    // ==========================================
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Проверка сохраненной темы
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('.theme-icon');
        icon.textContent = theme === 'dark' ? '☀' : '☾';
        themeToggle.innerHTML = `<span class="theme-icon">${icon.textContent}</span> ${theme.toUpperCase()} MODE`;
    }

    // ==========================================
    // 2. SCROLL REVEAL ANIMATION
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Анимируем только один раз
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ==========================================
    // 3. ACTIVE NAV HIGHLIGHTING ON SCROLL
    // ==========================================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => navObserver.observe(section));

    // ==========================================
    // 4. 3D TILT EFFECT FOR CARDS
    // ==========================================
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Вычисляем центр
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Вычисляем угол наклона (максимум 10 градусов)
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // ==========================================
    // 5. COPY TO CLIPBOARD (Email)
    // ==========================================
    const emailBtn = document.getElementById('email-copy-btn');
    const toast = document.getElementById('toast');
    const emailText = 'nikitosrus01@gmail.com';

    emailBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(emailText);
            showToast();
        } catch (err) {
            console.error('Failed to copy: ', err);
            // Fallback для старых браузеров
            const textArea = document.createElement("textarea");
            textArea.value = emailText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            showToast();
        }
    });

    function showToast() {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    }

    // ==========================================
    // 6. SYSTEM TIME (UTC / MSK)
    // ==========================================
    function updateTime() {
        const now = new Date();
        
        // UTC
        const utcTime = now.toLocaleTimeString('ru-RU', { timeZone: 'UTC', hour12: false });
        document.getElementById('time-utc').textContent = utcTime;
        
        // MSK (UTC+3)
        const mskTime = now.toLocaleTimeString('ru-RU', { timeZone: 'Europe/Moscow', hour12: false });
        document.getElementById('time-msk').textContent = mskTime;
    }
    
    updateTime();
    setInterval(updateTime, 1000);

    // ==========================================
    // 7. MOBILE MENU TOGGLE
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.querySelector('.nav');

    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Закрытие меню при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });
});