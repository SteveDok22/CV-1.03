// Sticky navigation menu
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});

// Add photo functionality
document.addEventListener('DOMContentLoaded', function () {
    const photo = document.getElementById('profile-photo');
    if (photo) {
        photo.src = 'images/stiven.jpg'; // Update to your photo filename in the images folder
        photo.alt = 'Stiven Doktorov';
    }
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animation trigger on scroll
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