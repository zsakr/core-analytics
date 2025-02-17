// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Add parallax effect to hero section
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    hero.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// Add 3D hover effect to feature cards
document.querySelectorAll('.feature-item').forEach(card => {
    card.addEventListener('mousemove', handleHover);
    card.addEventListener('mouseleave', resetCard);
});

function handleHover(e) {
    const card = this;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = -(x - centerX) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    card.style.transition = 'transform 0.1s';
    
    // Add shine effect
    const shine = card.querySelector('.shine');
    if (shine) {
        const moveX = (x / rect.width) * 200 - 100;
        const moveY = (y / rect.height) * 200 - 100;
        shine.style.background = `radial-gradient(circle at ${moveX}% ${moveY}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 80%)`;
    }
}

function resetCard() {
    this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    this.style.transition = 'transform 0.5s';
    
    const shine = this.querySelector('.shine');
    if (shine) {
        shine.style.background = 'none';
    }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add floating animation to login required section
const loginSection = document.querySelector('.login-required');
if (loginSection) {
    let float = 0;
    const animate = () => {
        float += 0.02;
        loginSection.style.transform = `translateY(${Math.sin(float) * 10}px)`;
        requestAnimationFrame(animate);
    };
    animate();
}
