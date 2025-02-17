// User data structure
let userData = {
    trainingSessions: 0,
    averageScore: 0,
    practiceTime: 0,
    performanceHistory: [],
    heatmapData: [],
    profile: {
        name: '',
        email: '',
        phone: '',
        country: ''
    },
    settings: {
        notifications: true,
        darkMode: false,
        language: 'en'
    }
};

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    // Set user name in navigation
    document.getElementById('userName').textContent = user.name || 'User';

    // Load user data
    loadUserData();

    // Initialize navigation
    initializeNavigation();

    // Initialize charts
    initializeCharts();
});

// Load user data from localStorage or server
function loadUserData() {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
        userData = JSON.parse(storedData);
    }
    updateDashboardUI();
}

// Update all UI elements with current data
function updateDashboardUI() {
    // Update statistics
    updateStatistics();
    
    // Update charts
    updateCharts();
}

// Update statistics cards
function updateStatistics() {
    const statElements = document.querySelectorAll('.stat-card');
    statElements.forEach(stat => {
        const title = stat.querySelector('h3').textContent;
        const numberElement = stat.querySelector('.stat-number');
        const changeElement = stat.querySelector('.stat-change');

        switch(title) {
            case 'Training Sessions':
                numberElement.textContent = userData.trainingSessions;
                changeElement.textContent = 'This month';
                break;
            case 'Average Score':
                numberElement.textContent = userData.averageScore.toFixed(1);
                const improvement = calculateImprovement();
                changeElement.textContent = `${improvement >= 0 ? '+' : ''}${improvement}% improvement`;
                changeElement.className = `stat-change ${improvement >= 0 ? 'positive' : ''}`;
                break;
            case 'Practice Time':
                numberElement.textContent = `${userData.practiceTime}h`;
                changeElement.textContent = 'This week';
                break;
        }
    });
}

// Calculate improvement percentage
function calculateImprovement() {
    // Mock calculation - replace with real calculation based on historical data
    return userData.performanceHistory.length >= 2 
        ? ((userData.performanceHistory[userData.performanceHistory.length - 1] - 
            userData.performanceHistory[userData.performanceHistory.length - 2]) * 100).toFixed(1)
        : 0;
}

// Initialize navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const mainContent = document.querySelector('.dashboard-content');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Load content based on href
            const section = this.getAttribute('href').substring(1);
            loadSection(section, mainContent);
        });
    });

    // Handle logout
    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });
}

// Load section content
function loadSection(section, container) {
    switch(section) {
        case 'analytics':
            container.innerHTML = createAnalyticsHTML();
            initializeCharts();
            break;
        case 'profile':
            container.innerHTML = createProfileHTML();
            loadProfileData();
            break;
        case 'settings':
            container.innerHTML = createSettingsHTML();
            loadSettingsData();
            break;
        default:
            // Dashboard is the default view
            container.innerHTML = createDashboardHTML();
            updateDashboardUI();
    }
}

// Create HTML for different sections
function createAnalyticsHTML() {
    return `
        <div class="analytics-section">
            <div class="section-header">
                <h2>Detailed Analytics</h2>
            </div>
            <div class="analytics-grid">
                <div class="analytics-card">
                    <h3>Performance Trends</h3>
                    <div id="performanceChart" class="chart-placeholder">
                        <p>No data available</p>
                    </div>
                </div>
                <div class="analytics-card">
                    <h3>Movement Heatmap</h3>
                    <div id="heatmapChart" class="chart-placeholder">
                        <p>No data available</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createProfileHTML() {
    return `
        <div class="profile-section">
            <div class="section-header">
                <h2>My Profile</h2>
            </div>
            <div class="profile-form">
                <div class="form-group">
                    <label for="profileName">Name</label>
                    <input type="text" id="profileName" value="${userData.profile.name}" readonly>
                </div>
                <div class="form-group">
                    <label for="profileEmail">Email</label>
                    <input type="email" id="profileEmail" value="${userData.profile.email}" readonly>
                </div>
                <div class="form-group">
                    <label for="profilePhone">Phone</label>
                    <input type="tel" id="profilePhone" value="${userData.profile.phone}" readonly>
                </div>
                <div class="form-group">
                    <label for="profileCountry">Country</label>
                    <input type="text" id="profileCountry" value="${userData.profile.country}" readonly>
                </div>
            </div>
        </div>
    `;
}

function createSettingsHTML() {
    return `
        <div class="settings-section">
            <div class="section-header">
                <h2>Settings</h2>
            </div>
            <div class="settings-form">
                <div class="form-group">
                    <label>
                        <input type="checkbox" id="notificationsToggle" ${userData.settings.notifications ? 'checked' : ''}>
                        Enable Notifications
                    </label>
                </div>
                <div class="form-group">
                    <label>
                        <input type="checkbox" id="darkModeToggle" ${userData.settings.darkMode ? 'checked' : ''}>
                        Dark Mode
                    </label>
                </div>
                <div class="form-group">
                    <label for="languageSelect">Language</label>
                    <select id="languageSelect">
                        <option value="en" ${userData.settings.language === 'en' ? 'selected' : ''}>English</option>
                        <option value="es" ${userData.settings.language === 'es' ? 'selected' : ''}>Spanish</option>
                        <option value="fr" ${userData.settings.language === 'fr' ? 'selected' : ''}>French</option>
                    </select>
                </div>
            </div>
        </div>
    `;
}

function createDashboardHTML() {
    return `
        <div class="stats-grid">
            <div class="stat-card">
                <h3>Training Sessions</h3>
                <p class="stat-number">0</p>
                <p class="stat-change">This month</p>
            </div>
            <div class="stat-card">
                <h3>Average Score</h3>
                <p class="stat-number">0</p>
                <p class="stat-change positive">+0% improvement</p>
            </div>
            <div class="stat-card">
                <h3>Practice Time</h3>
                <p class="stat-number">0h</p>
                <p class="stat-change">This week</p>
            </div>
        </div>
        <div class="analytics-section">
            <div class="section-header">
                <h2>Recent Analytics</h2>
            </div>
            <div class="analytics-grid">
                <div class="analytics-card">
                    <h3>Performance Trends</h3>
                    <div id="performanceChart" class="chart-placeholder">
                        <p>No data available</p>
                    </div>
                </div>
                <div class="analytics-card">
                    <h3>Movement Heatmap</h3>
                    <div id="heatmapChart" class="chart-placeholder">
                        <p>No data available</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Load profile data
function loadProfileData() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
        userData.profile = {
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || '',
            country: user.country || ''
        };
    }
}

// Load settings data
function loadSettingsData() {
    // Add event listeners for settings changes
    const notificationsToggle = document.getElementById('notificationsToggle');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const languageSelect = document.getElementById('languageSelect');

    if (notificationsToggle) {
        notificationsToggle.addEventListener('change', function() {
            userData.settings.notifications = this.checked;
            saveUserData();
        });
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', function() {
            userData.settings.darkMode = this.checked;
            document.body.classList.toggle('dark-mode', this.checked);
            saveUserData();
        });
    }

    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            userData.settings.language = this.value;
            saveUserData();
        });
    }
}

// Initialize charts (placeholder for now)
function initializeCharts() {
    // This is where you would initialize your charts
    // For now, we'll just show the placeholder
    const performanceChart = document.getElementById('performanceChart');
    const heatmapChart = document.getElementById('heatmapChart');

    if (performanceChart) {
        performanceChart.innerHTML = '<p>No performance data available</p>';
    }
    if (heatmapChart) {
        heatmapChart.innerHTML = '<p>No heatmap data available</p>';
    }
}

// Save user data
function saveUserData() {
    localStorage.setItem('userData', JSON.stringify(userData));
}

// Update charts (placeholder for now)
function updateCharts() {
    // This is where you would update your charts with real data
    // For now, we'll keep the placeholder
}

// Initialize the dashboard
loadUserData();
