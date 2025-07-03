// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

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

    // ===== FIXED HAMBURGER MENU FUNCTIONALITY =====
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const body = document.body;

    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Hamburger clicked'); // Debug log
            
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                body.classList.add('menu-open');
                console.log('Menu opened'); // Debug log
            } else {
                body.classList.remove('menu-open');
                console.log('Menu closed'); // Debug log
            }
        });
    }

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Nav link clicked'); // Debug log
            
            if (navToggle && navMenu) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navToggle && navMenu && 
            !navToggle.contains(e.target) && 
            !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navToggle && navMenu) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // ===== SMOOTH SCROLL FOR INTERNAL LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 100; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
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

    window.addEventListener('scroll', updateActiveNav);
    
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

    // ===== ADDITIONAL MOBILE TOUCH HANDLING =====
    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });

    document.addEventListener('touchmove', function(e) {
        if (navMenu && navMenu.classList.contains('active')) {
            // Prevent scrolling when menu is open
            e.preventDefault();
        }
    }, { passive: false });

    // ===== DEBUG INFORMATION =====
    console.log('Script loaded successfully');
    console.log('Navigation elements found:', {
        navToggle: !!navToggle,
        navMenu: !!navMenu,
        navLinks: navLinks.length
    });
});