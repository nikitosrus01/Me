'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    const themeLabel = document.querySelector('.theme-label');
    const themeIcon = document.querySelector('.theme-icon');
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = [...document.querySelectorAll('.main-nav a')];
    const sections = [...document.querySelectorAll('main section[id]')];
    const revealElements = [...document.querySelectorAll('.reveal')];
    const tiltCards = [...document.querySelectorAll('.tilt-card')];
    const copyButtons = [...document.querySelectorAll('[data-copy]')];
    const toast = document.querySelector('.toast');
    const toastMessage = document.querySelector('.toast-message');
    const cursor = document.querySelector('.cursor-crosshair');
    const utcTime = document.querySelector('#utc-time');
    const mskTime = document.querySelector('#msk-time');

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function getStoredTheme() {
        const storedTheme = localStorage.getItem('uav-lab-theme');

        if (storedTheme === 'dark' || storedTheme === 'light') {
            return storedTheme;
        }

        return window.matchMedia('(prefers-color-scheme: light)').matches
            ? 'light'
            : 'dark';
    }

    function updateThemeButton(theme) {
        const isLight = theme === 'light';

        themeLabel.textContent = isLight ? 'LIGHT' : 'DARK';
        themeIcon.textContent = isLight ? '☼' : '◐';
        themeToggle.setAttribute(
            'aria-label',
            isLight ? 'Переключить на тёмную тему' : 'Переключить на светлую тему'
        );
    }

    function setTheme(theme, save = true) {
        root.dataset.theme = theme;
        updateThemeButton(theme);

        if (save) {
            localStorage.setItem('uav-lab-theme', theme);
        }
    }

    setTheme(getStoredTheme(), false);

    themeToggle.addEventListener('click', () => {
        const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
    });

    function toggleMobileMenu(forceState) {
        const shouldOpen = typeof forceState === 'boolean'
            ? forceState
            : !mainNav.classList.contains('open');

        mainNav.classList.toggle('open', shouldOpen);
        mobileMenuButton.setAttribute('aria-expanded', String(shouldOpen));

        const menuLines = [...mobileMenuButton.querySelectorAll('span')];

        if (shouldOpen) {
            menuLines[0].style.transform = 'translateY(7px) rotate(45deg)';
            menuLines[1].style.opacity = '0';
            menuLines[2].style.transform = 'translateY(-7px) rotate(-45deg)';
        } else {
            menuLines[0].style.transform = '';
            menuLines[1].style.opacity = '';
            menuLines[2].style.transform = '';
        }
    }

    mobileMenuButton.addEventListener('click', () => {
        toggleMobileMenu();
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            toggleMobileMenu(false);
        });
    });

    function setActiveNavigation(sectionId) {
        navLinks.forEach((link) => {
            const isActive = link.dataset.section === sectionId;
            link.classList.toggle('active', isActive);

            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            const visibleEntries = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

            if (visibleEntries.length > 0) {
                setActiveNavigation(visibleEntries[0].target.id);
            }
        },
        {
            rootMargin: '-35% 0px -55% 0px',
            threshold: [0.05, 0.2, 0.5]
        }
    );

    sections.forEach((section) => sectionObserver.observe(section));

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: '0px 0px -45px 0px'
        }
    );

    if (prefersReducedMotion) {
        revealElements.forEach((element) => {
            element.classList.add('is-visible');
        });
    } else {
        revealElements.forEach((element) => revealObserver.observe(element));
    }

    function resetTilt(card) {
        card.style.transform = '';
    }

    function handleTiltMove(event) {
        const card = event.currentTarget;
        const rect = card.getBoundingClientRect();
        const pointerX = event.clientX - rect.left;
        const pointerY = event.clientY - rect.top;
        const rotateY = ((pointerX / rect.width) - 0.5) * 8;
        const rotateX = ((pointerY / rect.height) - 0.5) * -8;

        card.style.transform = `
            perspective(1100px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-4px)
        `;
    }

    if (!prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
        tiltCards.forEach((card) => {
            card.addEventListener('pointermove', handleTiltMove);
            card.addEventListener('pointerleave', () => resetTilt(card));
            card.addEventListener('pointercancel', () => resetTilt(card));
        });
    }

    async function fallbackCopy(text) {
        const temporaryInput = document.createElement('textarea');

        temporaryInput.value = text;
        temporaryInput.setAttribute('readonly', '');
        temporaryInput.style.position = 'fixed';
        temporaryInput.style.top = '-9999px';
        temporaryInput.style.left = '-9999px';

        document.body.appendChild(temporaryInput);
        temporaryInput.select();

        const copied = document.execCommand('copy');
        temporaryInput.remove();

        if (!copied) {
            throw new Error('Fallback copy failed');
        }
    }

    function showToast(message, isError = false) {
        toastMessage.textContent = message;
        toast.classList.toggle('toast-error', isError);
        toast.classList.add('show');

        window.clearTimeout(showToast.timeoutId);

        showToast.timeoutId = window.setTimeout(() => {
            toast.classList.remove('show');
        }, 2400);
    }

    async function copyText(text) {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return;
        }

        await fallbackCopy(text);
    }

    copyButtons.forEach((button) => {
        button.addEventListener('click', async () => {
            const textToCopy = button.dataset.copy;

            try {
                await copyText(textToCopy);
                showToast('СКОПИРОВАНО!');
            } catch (error) {
                showToast('НЕ УДАЛОСЬ СКОПИРОВАТЬ', true);
            }
        });
    });

    if (cursor && window.matchMedia('(pointer: fine)').matches) {
        window.addEventListener('pointermove', (event) => {
            cursor.style.left = `${event.clientX}px`;
            cursor.style.top = `${event.clientY}px`;
        });

        document.querySelectorAll('a, button, .project-card').forEach((element) => {
            element.addEventListener('mouseenter', () => {
                cursor.style.width = '36px';
                cursor.style.height = '36px';
            });

            element.addEventListener('mouseleave', () => {
                cursor.style.width = '24px';
                cursor.style.height = '24px';
            });
        });
    }

    function formatTime(date, timeZone) {
        return new Intl.DateTimeFormat('ru-RU', {
            timeZone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).format(date);
    }

    function updateClocks() {
        const now = new Date();

        utcTime.textContent = formatTime(now, 'UTC');
        mskTime.textContent = formatTime(now, 'Europe/Moscow');
    }

    updateClocks();
    window.setInterval(updateClocks, 1000);

    const year = new Date().getFullYear();
    const footerCopy = document.querySelector('.footer-copy');

    if (footerCopy && year !== 2026) {
        footerCopy.textContent = `© 2023—${year} NIKITA GOLUBITSKY`;
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth > 800) {
            toggleMobileMenu(false);
        }
    });
});