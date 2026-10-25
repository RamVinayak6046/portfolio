/* ==========================================================================
   PORTFOLIO SCRIPTS - RAM VINAYAK
   Smooth micro-interactions: typing effect, scroll progress, scroll reveal.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reading Progress Bar
    const progressBar = document.getElementById('progressBar');
    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');
    let ticking = false;

    function onScroll() {
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

        // Progress bar scale
        if (progressBar) {
            const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
            progressBar.style.transform = `scaleX(${progress})`;
        }

        // Header scrolled class
        if (header) {
            header.classList.toggle('scrolled', scrollY > 30);
        }

        // Back to top button
        if (backToTop) {
            backToTop.classList.toggle('visible', scrollY > 400);
        }

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            ticking = true;
            window.requestAnimationFrame(onScroll);
        }
    }, { passive: true });
    onScroll();

    // 2. Typing Effect (Java prioritized as #1)
    const typingElem = document.getElementById('typing');
    if (typingElem) {
        const words = [
            'Java',
            'Enterprise Backends',
            'MySQL & Databases',
            'Full Stack Systems'
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeLoop() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                typingElem.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElem.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 45 : 85;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 1600; // Hold word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 300; // Pause before new word
            }

            setTimeout(typeLoop, typeSpeed);
        }

        typeLoop();
    }

    // 3. Scroll Reveal Animations (IntersectionObserver)
    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('active'));
    }

    // 4. Active Navigation Link Highlighting (IntersectionObserver)
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"], .nav-link[href^="index.html#"]');

    if ('IntersectionObserver' in window && sections.length > 0) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        const href = link.getAttribute('href');
                        const isMatch = href === `#${id}` || href === `index.html#${id}`;
                        link.classList.toggle('active', isMatch);
                    });
                }
            });
        }, {
            threshold: 0.25,
            rootMargin: '-60px 0px -40% 0px'
        });

        sections.forEach(sec => navObserver.observe(sec));
    }

    // 5. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        const menuIcon = mobileToggle.querySelector('i');

        function toggleMenu(forceClose) {
            const willOpen = forceClose === undefined ? !navMenu.classList.contains('open') : !forceClose;
            navMenu.classList.toggle('open', willOpen);
            mobileToggle.setAttribute('aria-expanded', String(willOpen));
            if (menuIcon) {
                menuIcon.classList.toggle('fa-bars', !willOpen);
                menuIcon.classList.toggle('fa-xmark', willOpen);
            }
        }

        mobileToggle.addEventListener('click', () => toggleMenu());

        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => toggleMenu(true));
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('open')) {
                toggleMenu(true);
            }
        });
    }

    // 6. Back to Top Click
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 7. Contact Form Handling (Direct Mailto Dispatch)
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('senderName')?.value.trim();
            const email = document.getElementById('senderEmail')?.value.trim();
            const subject = document.getElementById('msgSubject')?.value.trim() || 'Software Engineering Inquiry';
            const message = document.getElementById('msgBody')?.value.trim();

            if (!name || !email || !message) {
                if (formStatus) {
                    formStatus.textContent = 'Please fill out all required fields (Name, Email, Message).';
                    formStatus.style.color = '#f87171';
                    formStatus.style.display = 'block';
                }
                return;
            }

            const bodyContent = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
            const mailtoUrl = `mailto:vtu29562@veltech.edu.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyContent)}`;

            if (formStatus) {
                formStatus.textContent = 'Launching your email client to send message to vtu29562@veltech.edu.in...';
                formStatus.style.color = '#38bdf8';
                formStatus.style.display = 'block';
            }

            window.location.href = mailtoUrl;
        });
    }
});
