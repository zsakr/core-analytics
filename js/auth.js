// Mock user database
const users = [
    {
        username: 'admin_core-analytics',
        password: 'test@1234-core-admin',
        role: 'admin',
        name: 'Admin User'
    }
];

document.addEventListener('DOMContentLoaded', function() {
    // Initialize country select if it exists
    const countrySelect = document.getElementById('country');
    if (countrySelect) {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                const countries = data.map(country => country.name.common).sort();
                countries.forEach(country => {
                    const option = document.createElement('option');
                    option.value = country;
                    option.textContent = country;
                    countrySelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error fetching countries:', error);
                // Fallback for demo
                ['United States', 'Canada', 'United Kingdom'].forEach(country => {
                    const option = document.createElement('option');
                    option.value = country;
                    option.textContent = country;
                    countrySelect.appendChild(option);
                });
            });
    }

    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');
            
            if (!usernameInput || !passwordInput) {
                console.error('Form inputs not found');
                return;
            }
            
            const username = usernameInput.value;
            const password = passwordInput.value;

            // Check credentials
            const user = users.find(u => u.username === username && u.password === password);
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify({
                    username: user.username,
                    role: 'admin',
                    name: user.name
                }));
                window.location.href = 'admin-dashboard.html';
                return;
            }

            alert('Invalid credentials. Please try again.');
        });
    }

    // Handle signup form submission
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const phoneInput = document.getElementById('phone');
            const countryInput = document.getElementById('country');
            const passwordInput = document.getElementById('password');
            const confirmPasswordInput = document.getElementById('confirmPassword');
            
            if (!nameInput || !emailInput || !phoneInput || !countryInput || !passwordInput || !confirmPasswordInput) {
                console.error('Form inputs not found');
                return;
            }
            
            const name = nameInput.value;
            const email = emailInput.value;
            const phone = phoneInput.value;
            const country = countryInput.value;
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            // Check if user already exists
            if (users.some(u => u.email === email)) {
                alert('User already exists with this email!');
                return;
            }

            // Add new user
            users.push({
                email,
                password,
                role: 'user',
                name,
                phone,
                country
            });

            alert('Account created successfully! Please login.');
            window.location.href = 'login.html';
        });
    }

    // Handle logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        });
    }
});

// Check authentication status
function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const isLoginPage = window.location.href.includes('login.html');
    
    if (!currentUser && !isLoginPage) {
        window.location.href = 'login.html';
    } else if (currentUser && isLoginPage) {
        window.location.href = 'admin-dashboard.html';
    }
}

// Check authentication status
checkAuth();
