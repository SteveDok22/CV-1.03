// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    console.log('Script loaded and DOM ready');

    // ===== ANIMATED STARS BACKGROUND =====
    const starsContainer = document.querySelector('.stars');

    if (starsContainer) {
        function createStar() {
            const star = document.createElement('div');
            star.classList.add('star');

            // Random star size
            const size = Math.random() * 3 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;

            // Random starting position on X axis
            star.style.left = `${Math.random() * 100}vw`;

            // Random animation duration
            star.style.animationDuration = `${Math.random() * 5 + 5}s`;

            // Random animation delay
            star.style.animationDelay = `${Math.random() * 0.5}s`;

            starsContainer.appendChild(star);

            // Remove star after animation ends
            star.addEventListener('animationend', () => {
                if (star.parentNode) {
                    star.remove();
                }
            });
        }

        // Create initial stars (reduced number for better performance)
        for (let i = 0; i < 30; i++) {
            createStar();
        }

        // Continue creating new stars every 300ms (reduced frequency)
        setInterval(createStar, 300);
    }

    // ===== PHOTO FUNCTIONALITY =====
    const photo = document.getElementById('profile-photo');
    if (photo) {
        photo.src = 'assets/images/profile-photo.jpg';
        photo.alt = 'Stiven Doktorov';
    }

    // =====  HAMBURGER MENU FUNCTIONALITY =====
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const body = document.body;

    console.log('Navigation elements found:', {
        navToggle: !!navToggle,
        navMenu: !!navMenu,
        navLinks: navLinks.length
    });

    // Toggle mobile menu with better event handling
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            console.log('Hamburger clicked - before toggle');
            console.log('Menu active before:', navMenu.classList.contains('active'));

            // Toggle classes
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');

            console.log('Menu active after:', navMenu.classList.contains('active'));

            // FIXED: Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                body.classList.add('menu-open');
                console.log('Menu opened - body scroll disabled');
            } else {
                body.classList.remove('menu-open');
                console.log('Menu closed - body scroll enabled');
            }
        });
    } else {
        console.error('Navigation elements not found!');
    }

    //  Close menu when clicking on a link
    navLinks.forEach((link, index) => {
        link.addEventListener('click', function (e) {
            console.log(`Nav link ${index + 1} clicked`);

            // Close the mobile menu
            if (navToggle && navMenu) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
                console.log('Menu closed via nav link click');
            }
        });
    });

    //  Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (navToggle && navMenu) {
            // Check if click is outside both toggle and menu
            const isClickInsideNav = navToggle.contains(e.target) || navMenu.contains(e.target);

            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
                console.log('Menu closed via outside click');
            }
        }
    });

    // Handle window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && navToggle && navMenu) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
            console.log('Menu closed via window resize');
        }
    });

    // ===== SMOOTH SCROLL FOR INTERNAL LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                const offsetTop = target.offsetTop - 100; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                console.log(`Smooth scrolling to ${targetId}`);
            }
        });
    });

    // ===== ACTIVE STATE ON SCROLL =====
    const sections = document.querySelectorAll('[id]');

    function updateActiveNav() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // Throttled scroll event for better performance
    let scrollTimeout;
    window.addEventListener('scroll', function () {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(updateActiveNav, 10);
    });

    // Initial call to set active state
    updateActiveNav();

    // ===== STICKY NAVIGATION =====
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('sticky');
            } else {
                navbar.classList.remove('sticky');
            }
        });
    }

    // ===== ANIMATION TRIGGER ON SCROLL =====
    const sectionsToAnimate = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideUp 0.8s ease-out';
            }
        });
    }, { threshold: 0.1 });

    sectionsToAnimate.forEach(section => {
        observer.observe(section);
    });

    // ===== MOBILE TOUCH HANDLING =====
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    document.addEventListener('touchstart', function (e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
    }, { passive: true });

    document.addEventListener('touchmove', function (e) {
        // Only prevent scrolling when menu is active
        if (navMenu && navMenu.classList.contains('active')) {
            e.preventDefault();
        }
    }, { passive: false });

    //  Add swipe gesture to close menu
    document.addEventListener('touchend', function (e) {
        if (navMenu && navMenu.classList.contains('active')) {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const touchEndTime = Date.now();

            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            const deltaTime = touchEndTime - touchStartTime;

            // Check for swipe left gesture (close menu)
            if (deltaTime < 300 && Math.abs(deltaX) > 50 && Math.abs(deltaY) < 100 && deltaX < 0) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
                console.log('Menu closed via swipe gesture');
            }
        }
    }, { passive: true });

    // ===== DEBUG INFORMATION =====
    console.log('Script initialization complete');
    console.log('Viewport width:', window.innerWidth);
    console.log('User agent:', navigator.userAgent);

    // Test function for debugging
    window.testHamburger = function () {
        console.log('Testing hamburger menu...');
        if (navToggle && navMenu) {
            navToggle.click();
            console.log('Hamburger clicked programmatically');
        } else {
            console.error('Navigation elements not found for test');
        }
    };
});