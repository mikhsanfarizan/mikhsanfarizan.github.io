/* =========================================================
   Muhammad Ikhsan Farizan — Portfolio interactions
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {

    const header = document.querySelector('.header');
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a');
    const sections = document.querySelectorAll('section[id]');

    /* ---- Dark/Light Mode Toggle ---- */
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle ? themeToggle.querySelector('i') : null;

    // Memeriksa pengaturan tema yang tersimpan di localStorage browser
    const savedTheme = localStorage.getItem('theme');
    
    // Default kita atur ke light (terang). Kalau user sebelumnya pilih gelap, aktifkan.
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (icon) {
            icon.classList.remove('bx-moon');
            icon.classList.add('bx-sun');
        }
    }

    // Fungsi klik tombol untuk pindah mode
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.documentElement.removeAttribute('data-theme'); // Mode Terang
                localStorage.setItem('theme', 'light');
                icon.classList.remove('bx-sun');
                icon.classList.add('bx-moon');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark'); // Mode Gelap
                localStorage.setItem('theme', 'dark');
                icon.classList.remove('bx-moon');
                icon.classList.add('bx-sun');
            }
        });
    }

    /* ---- Mobile menu toggle ---- */
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    });

    /* close menu when a link is clicked */
    navLinks.forEach(link => link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    }));

    /* ---- Sticky header ---- */
    const onScroll = () => header.classList.toggle('sticky', window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll);

    /* ---- Active nav link via IntersectionObserver ---- */
    const navObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(a => {
                    a.classList.toggle('active', a.getAttribute('href') === '#' + id);
                });
            }
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(sec => navObserver.observe(sec));

    /* ---- Scroll reveal ---- */
    const revealTargets = document.querySelectorAll(
        '.heading, .home-content, .home-img, .about-img, .about-content, .timeline-item, .skill-card, .cert-card, .edu-card, .project-card, .projects-more, .contact-info, .contact form'
    );
    revealTargets.forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = (i % 6) * 0.06 + 's';
    });

    const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealTargets.forEach(el => revealObserver.observe(el));

    /* ---- Typing effect (Teks berjalan) ---- */
    const typingEl = document.querySelector('.typing');
    if (typingEl) {
        // Teks ini disesuaikan dengan profil Anda
        const words = [
            'Fresh Graduate',
            'S1 Sistem Informasi',
            'Web Developer',
            'IT Enthusiast'
        ];
        let w = 0, c = 0, deleting = false;

        const type = () => {
            const word = words[w];
            typingEl.textContent = word.substring(0, c);

            if (!deleting && c < word.length) {
                c++;
                setTimeout(type, 90);
            } else if (deleting && c > 0) {
                c--;
                setTimeout(type, 45);
            } else {
                if (!deleting) {
                    deleting = true;
                    setTimeout(type, 1600);
                } else {
                    deleting = false;
                    w = (w + 1) % words.length;
                    setTimeout(type, 300);
                }
            }
        };
        type();
    }

    /* ---- Animated stat counters ---- */
    const counters = document.querySelectorAll('.stat-card h4[data-count]');
    const runCounter = el => {
        const target = Number(el.dataset.count);
        const isFloat = target % 1 !== 0; // Cek apakah angkanya desimal (contoh: 3.96)
        const suffix = el.dataset.suffix || '';
        const duration = 1400;
        const start = performance.now();
        
        const step = now => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            const currentVal = eased * target;
            
            // Format 2 angka desimal jika float, kalau tidak bulatkan penuh
            el.textContent = (isFloat ? currentVal.toFixed(2) : Math.round(currentVal)) + suffix;
            
            if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };

    const counterObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCounter(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });
    counters.forEach(el => counterObserver.observe(el));

});