// Smooth scroll functionality
function scrollToFeatures() {
    document.getElementById('features').scrollIntoView({
        behavior: 'smooth'
    });
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.transform = 'translateY(0)';
        return;
    }
    
    if (currentScroll > lastScroll) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Authentication state
let isAuthenticated = false;

// Admin credentials (In production, this would be on the server)
const ADMIN_CREDENTIALS = {
    'admin123': 'tempPass123',
    'user456': 'tempPass456'
};

// DOM Elements
const loginModal = document.getElementById('loginModal');
const loginBtn = document.getElementById('loginBtn');
const loginPromptBtn = document.getElementById('loginPromptBtn');
const closeBtn = document.querySelector('.close');
const loginForm = document.getElementById('loginForm');
const uploadSection = document.getElementById('protected-upload-section');
const loginPrompt = document.getElementById('login-prompt');

// Event Listeners
loginBtn.addEventListener('click', openLoginModal);
loginPromptBtn.addEventListener('click', openLoginModal);
closeBtn.addEventListener('click', closeLoginModal);
loginForm.addEventListener('submit', handleLogin);

window.addEventListener('click', (event) => {
    if (event.target === loginModal) {
        closeLoginModal();
    }
});

// Functions
function openLoginModal() {
    loginModal.style.display = 'block';
}

function closeLoginModal() {
    loginModal.style.display = 'none';
}

function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (ADMIN_CREDENTIALS[username] === password) {
        isAuthenticated = true;
        updateAuthState();
        closeLoginModal();
        showMessage('Login successful!', 'success');
    } else {
        showMessage('Invalid credentials. Please contact your administrator.', 'error');
    }
}

function updateAuthState() {
    if (isAuthenticated) {
        uploadSection.style.display = 'block';
        loginPrompt.style.display = 'none';
        loginBtn.textContent = 'LOGOUT';
        loginBtn.removeEventListener('click', openLoginModal);
        loginBtn.addEventListener('click', handleLogout);
    } else {
        uploadSection.style.display = 'none';
        loginPrompt.style.display = 'block';
        loginBtn.textContent = 'LOGIN';
        loginBtn.removeEventListener('click', handleLogout);
        loginBtn.addEventListener('click', openLoginModal);
    }
}

function handleLogout() {
    isAuthenticated = false;
    updateAuthState();
    showMessage('Logged out successfully', 'success');
}

function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// File upload handling
const fileUpload = document.getElementById('video-upload');
const previewContainer = document.getElementById('analysis-preview');

fileUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        previewContainer.innerHTML = '';
        
        if (file.type.startsWith('video/')) {
            const video = document.createElement('video');
            video.style.maxWidth = '100%';
            video.style.maxHeight = '400px';
            video.controls = true;
            
            const source = document.createElement('source');
            source.src = URL.createObjectURL(file);
            source.type = file.type;
            
            video.appendChild(source);
            previewContainer.appendChild(video);
            
            const status = document.createElement('div');
            status.style.marginTop = '1rem';
            status.textContent = 'Video uploaded successfully! Analysis ready to begin.';
            previewContainer.appendChild(status);
        } else {
            previewContainer.textContent = 'Please upload a valid video file.';
        }
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    observer.observe(card);
});

// Add loading animation for analysis
function simulateAnalysis() {
    const preview = document.getElementById('analysis-preview');
    preview.innerHTML = '<div class="loading">Analyzing video...</div>';
    
    // Simulate analysis progress
    setTimeout(() => {
        preview.innerHTML = `
            <div class="analysis-results">
                <h3>Analysis Complete</h3>
                <div class="metrics">
                    <div>Player Movement: 87%</div>
                    <div>Ball Tracking: 92%</div>
                    <div>Court Coverage: 75%</div>
                </div>
            </div>
        `;
    }, 3000);
}

// Initialize tooltips
document.querySelectorAll('[data-tooltip]').forEach(element => {
    element.addEventListener('mouseenter', e => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = e.target.dataset.tooltip;
        document.body.appendChild(tooltip);
        
        const rect = e.target.getBoundingClientRect();
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
        tooltip.style.left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`;
    });
    
    element.addEventListener('mouseleave', () => {
        document.querySelector('.tooltip')?.remove();
    });
});

// Initialize auth state
document.addEventListener('DOMContentLoaded', updateAuthState);
