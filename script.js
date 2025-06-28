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

        // Create initial stars
        for (let i = 0; i < 50; i++) {
            createStar();
        }

        // Continue creating new stars every 200ms
        setInterval(createStar, 200);
    }

    // ===== PHOTO FUNCTIONALITY =====
    const photo = document.getElementById('profile-photo');
    if (photo) {
        // Update the image path to match your HTML
        photo.src = 'assets/images/profile-photo.jpg';
        photo.alt = 'Stiven Doktorov';
    }
});

// ===== STICKY NAVIGATION =====
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    }
});

// ===== SMOOTH SCROLL FOR INTERNAL LINKS =====
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ===== ANIMATION TRIGGER ON SCROLL =====
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideUp 0.8s ease-out';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });
});