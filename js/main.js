// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true
});

// Stats number animation
const animateNumber = (element, start, end, duration) => {
    let current = 0;
    const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Intersection Observer for stats animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-value'));
                animateNumber(stat, 0, target, 2000);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Handle window resize
window.addEventListener('resize', () => {
    AOS.refresh();
});

// Handle smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add touch support for features
const stepFeatures = document.querySelectorAll('.step-feature');
stepFeatures.forEach(feature => {
    feature.addEventListener('touchstart', function() {
        this.style.background = 'rgba(0, 230, 230, 0.1)';
    });
    feature.addEventListener('touchend', function() {
        this.style.background = 'rgba(0, 230, 230, 0.05)';
    });
});

// Testimonial slider functionality
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.testimonial-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    let currentIndex = 0;

    function updateSlider() {
        const cardWidth = cards[0].offsetWidth + 32; // Including gap
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = Math.max(currentIndex - 1, 0);
            updateSlider();
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = Math.min(currentIndex + 1, cards.length - 1);
            updateSlider();
        });
    }

    window.addEventListener('resize', updateSlider);
});

// Animate statistics
document.addEventListener('DOMContentLoaded', function() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue(entry.target, 0, parseInt(entry.target.dataset.value), 2000);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
});

// Handle image loading states
document.addEventListener('DOMContentLoaded', () => {
    const stepImages = document.querySelectorAll('.step-image');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                handleImageLoad(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stepImages.forEach(img => observer.observe(img));

    function handleImageLoad(img) {
        img.classList.add('loaded');
        img.closest('.step-visual').classList.remove('loading');
    }
});

// Pricing section functionality
document.addEventListener('DOMContentLoaded', () => {
    // Toggle functionality for billing period and plan type
    const billingButtons = document.querySelectorAll('.billing-toggle .toggle-btn');
    const planButtons = document.querySelectorAll('.plan-toggle .toggle-btn');

    // Handle billing period toggle
    billingButtons.forEach(button => {
        button.addEventListener('click', function() {
            billingButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const period = this.dataset.period;
            const billingToggle = document.querySelector('.billing-toggle');
            billingToggle.setAttribute('data-period', period);

            document.querySelectorAll('.plan-price').forEach(priceContainer => {
                if (period === 'yearly') {
                    priceContainer.querySelector('.yearly-price').style.display = 'block';
                    setTimeout(() => {
                        priceContainer.querySelector('.yearly-price').style.opacity = '1';
                        priceContainer.querySelector('.yearly-price').style.transform = 'translateY(0)';
                        priceContainer.querySelector('.monthly-price').style.opacity = '0';
                        priceContainer.querySelector('.monthly-price').style.transform = 'translateY(-10px)';
                    }, 50);
                } else {
                    priceContainer.querySelector('.monthly-price').style.opacity = '1';
                    priceContainer.querySelector('.monthly-price').style.transform = 'translateY(0)';
                    priceContainer.querySelector('.yearly-price').style.opacity = '0';
                    priceContainer.querySelector('.yearly-price').style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        priceContainer.querySelector('.yearly-price').style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Handle plan type toggle
    planButtons.forEach(button => {
        button.addEventListener('click', function() {
            planButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const planType = this.dataset.plan;
            this.parentElement.setAttribute('data-plan', planType);

            const sections = document.querySelectorAll('.pricing-section');
            sections.forEach(section => {
                if (section.id === `${planType}-plans`) {
                    section.style.display = 'block';
                    setTimeout(() => {
                        section.classList.add('active');
                    }, 50);
                } else {
                    section.classList.remove('active');
                    setTimeout(() => {
                        section.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});


const targets = [100, 25, 98, 40];
                        const duration = 2000;
                        const frameRate = 1000 / 60;
                        const numbers = document.querySelectorAll('.stat-number');
                        
                        function startCounting() {
                            numbers.forEach((number, index) => {
                                let current = 0;
                                const target = targets[index];
                                const increment = target / (duration / frameRate);
                                
                                const timer = setInterval(() => {
                                    current += increment;
                                    if (current >= target) {
                                        number.textContent = target;
                                        clearInterval(timer);
                                    } else {
                                        number.textContent = Math.round(current);
                                    }
                                }, frameRate);
                            });
                        }

                        // Start counting when the section is in view
                        const observer = new IntersectionObserver((entries) => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                    startCounting();
                                    observer.disconnect();
                                }
                            });
                        }, { threshold: 0.5 });

observer.observe(document.querySelector('.stats-grid'));


// Mobile navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.navbar-toggler');
    const navMenu = document.querySelector('.nav-menu');
    
    // Add index to nav items for staggered animation
    document.querySelectorAll('.nav-item').forEach((item, index) => {
        item.style.setProperty('--item-index', index + 1);
    });

    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', 
            navToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
        );
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Handle scroll behavior
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Close mobile menu on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 991 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
