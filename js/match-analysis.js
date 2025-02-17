// Match Analysis Data Structure
let matchData = {
    matches: [],
    currentMatch: null
};

// DOM Elements
let uploadForm;
let videoUploadContainer;
let matchAnalysisSection;
let newMatchBtn;

// Initialize DOM elements and event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize DOM elements
    uploadForm = document.getElementById('videoUploadForm');
    videoUploadContainer = document.getElementById('videoUploadContainer');
    matchAnalysisSection = document.querySelector('.match-analysis-section');
    newMatchBtn = document.getElementById('newMatchBtn');

    // Initialize upload form
    if (uploadForm) {
        uploadForm.addEventListener('submit', handleVideoUpload);
        
        // Set default date to today
        const dateInput = uploadForm.querySelector('#matchDate');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.value = today;
        }
    }

    // Add click handler for new match button
    if (newMatchBtn) {
        newMatchBtn.addEventListener('click', () => {
            console.log('New match button clicked');
            if (videoUploadContainer) {
                matchAnalysisSection.style.display = 'none';
                videoUploadContainer.style.display = 'block';
            }
        });
    }

    // Initialize database and load matches
    initializeDatabase();
});

// Show upload form
function showUploadForm() {
    console.log('Showing upload form');
    if (videoUploadContainer) {
        matchAnalysisSection.style.display = 'none';
        videoUploadContainer.style.display = 'block';
    }
}

// Handle video upload and analysis
async function handleVideoUpload(e) {
    e.preventDefault();
    console.log('Upload started');
    
    const form = e.target;
    const title = form.querySelector('#matchTitle').value;
    const date = form.querySelector('#matchDate').value;
    const videoFile = form.querySelector('#videoFile').files[0];
    const uploadProgress = document.querySelector('.upload-progress');
    const matchAnalysisSection = document.querySelector('.match-analysis-section');
    
    console.log('Form data:', { title, date, fileName: videoFile?.name });
    
    if (!videoFile) {
        alert('Please select a video file');
        return;
    }
    
    if (!title) {
        alert('Please enter a match title');
        return;
    }
    
    try {
        // Show progress bar
        uploadProgress.style.display = 'block';
        await simulateUploadProgress(uploadProgress);
        
        // Generate analysis data
        const analysis = generateMockAnalysis();
        console.log('Generated analysis:', analysis);
        
        // Create match data
        const newMatch = {
            id: Date.now(),
            title,
            date,
            fileName: videoFile.name,
            analysis,
            timestamp: new Date().toISOString()
        };
        
        // Save to IndexedDB
        await saveMatch(newMatch);
        
        // Show analysis
        await showMatchAnalysis(newMatch.id);
        matchAnalysisSection.style.display = 'block';
        console.log('Analysis displayed');
        
        // Reset form
        form.reset();
        const today = new Date().toISOString().split('T')[0];
        form.querySelector('#matchDate').value = today;
        
    } catch (error) {
        console.error('Error during upload:', error);
        alert('An error occurred during upload. Please try again.');
    }
}

function simulateUploadProgress(uploadProgress) {
    return new Promise((resolve) => {
        const progressBar = uploadProgress.querySelector('.progress-bar');
        const progressText = uploadProgress.querySelector('.progress-text');
        let progress = 0;
        
        const interval = setInterval(() => {
            progress += 5;
            progressBar.style.width = `${progress}%`;
            progressText.textContent = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    uploadProgress.style.display = 'none';
                    progressBar.style.width = '0%';
                    progressText.textContent = '0%';
                    resolve();
                }, 500);
            }
        }, 100);
    });
}

function generateMockAnalysis() {
    return {
        overview: {
            winners: Math.floor(Math.random() * 20) + 10,
            errors: Math.floor(Math.random() * 15) + 5,
            successRate: Math.floor(Math.random() * 30) + 60
        },
        games: [
            { score: '11-9', winners: 5, errors: 3 },
            { score: '11-7', winners: 6, errors: 2 },
            { score: '9-11', winners: 4, errors: 5 }
        ],
        shotTypes: {
            drive: Math.floor(Math.random() * 30) + 20,
            crossCourt: Math.floor(Math.random() * 25) + 15,
            drop: Math.floor(Math.random() * 20) + 10,
            lob: Math.floor(Math.random() * 15) + 5,
            boast: Math.floor(Math.random() * 10) + 5
        },
        movement: {
            speed: Math.floor(Math.random() * 40) + 60,
            agility: Math.floor(Math.random() * 30) + 65,
            coverage: Math.floor(Math.random() * 35) + 60,
            recovery: Math.floor(Math.random() * 25) + 70,
            efficiency: Math.floor(Math.random() * 20) + 75
        },
        serves: {
            aces: Math.floor(Math.random() * 5) + 1,
            faults: Math.floor(Math.random() * 4) + 1,
            returnWinners: Math.floor(Math.random() * 6) + 2
        },
        strengths: [
            'Consistent drive shots',
            'Good court coverage',
            'Effective serve placement'
        ],
        areasToFocus: [
            'Drop shot accuracy',
            'Return of serve positioning',
            'Movement efficiency'
        ],
        recommendations: [
            'Practice drop shots from back court',
            'Work on serve return footwork',
            'Focus on T position recovery'
        ]
    };
}

function displayMatchAnalysis(matchData) {
    console.log('Displaying analysis for:', matchData.title);
    const matchAnalysisSection = document.querySelector('.match-analysis-section');
    
    // Show analysis section
    matchAnalysisSection.style.display = 'block';
    
    // Update match title
    document.getElementById('matchAnalysisTitle').textContent = `Match Analysis: ${matchData.title}`;
    
    // Update overview stats
    document.getElementById('totalWinners').textContent = matchData.analysis.overview.winners;
    document.getElementById('totalErrors').textContent = matchData.analysis.overview.errors;
    document.getElementById('successRate').textContent = `${matchData.analysis.overview.successRate}%`;
    
    // Update game stats
    updateGameStats(matchData.analysis.games);
    
    // Update charts
    createShotTypesChart(matchData.analysis.shotTypes);
    createMovementRadarChart(matchData.analysis.movement);
    createServesReturnsChart(matchData.analysis.serves);
    
    // Update lists
    updateList('strengthsList', matchData.analysis.strengths);
    updateList('focusList', matchData.analysis.areasToFocus);
    updateRecommendations(matchData.analysis.recommendations);
    
    // Scroll to analysis section
    matchAnalysisSection.scrollIntoView({ behavior: 'smooth' });
}

function updateGameStats(games) {
    const container = document.querySelector('.game-stats-container');
    container.innerHTML = '';
    
    games.forEach((game, index) => {
        const gameDiv = document.createElement('div');
        gameDiv.className = 'game-stat';
        gameDiv.innerHTML = `
            <h4>Game ${index + 1}</h4>
            <div class="game-score">${game.score}</div>
            <div class="game-details">
                <span>Winners: ${game.winners}</span>
                <span>Errors: ${game.errors}</span>
            </div>
        `;
        container.appendChild(gameDiv);
    });
}

function createShotTypesChart(shotData) {
    const ctx = document.getElementById('shotTypesChart').getContext('2d');
    
    // Destroy existing chart if it exists
    const existingChart = Chart.getChart(ctx.canvas);
    if (existingChart) {
        existingChart.destroy();
    }
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(shotData),
            datasets: [{
                label: 'Shot Distribution',
                data: Object.values(shotData),
                backgroundColor: 'rgba(54, 162, 235, 0.6)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function createMovementRadarChart(movementData) {
    const ctx = document.getElementById('movementRadarChart').getContext('2d');
    
    // Destroy existing chart if it exists
    const existingChart = Chart.getChart(ctx.canvas);
    if (existingChart) {
        existingChart.destroy();
    }
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: Object.keys(movementData),
            datasets: [{
                label: 'Movement Analysis',
                data: Object.values(movementData),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

function createServesReturnsChart(servesData) {
    const ctx = document.getElementById('servesReturnsChart').getContext('2d');
    
    // Destroy existing chart if it exists
    const existingChart = Chart.getChart(ctx.canvas);
    if (existingChart) {
        existingChart.destroy();
    }
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(servesData),
            datasets: [{
                label: 'Serves and Returns',
                data: Object.values(servesData),
                backgroundColor: 'rgba(75, 192, 192, 0.6)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function updateList(listId, items) {
    const list = document.getElementById(listId);
    list.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
    });
}

function updateRecommendations(recommendations) {
    const container = document.getElementById('recommendations');
    container.innerHTML = '';
    recommendations.forEach(rec => {
        const div = document.createElement('div');
        div.className = 'recommendation-item';
        div.textContent = rec;
        container.appendChild(div);
    });
}

// Analytics Section Functions
function updateAnalytics() {
    const transaction = db.transaction(['matches'], 'readonly');
    const store = transaction.objectStore('matches');
    const request = store.getAll();

    request.onsuccess = () => {
        const matches = request.result;
        updatePerformanceChart(matches);
        updateProgressChart(matches);
        updateSkillsRadarChart(matches);
        updateWinRateChart(matches);
        updateCommonMistakesChart(matches);
    };
}

function updatePerformanceChart(matches) {
    const ctx = document.getElementById('overallPerformanceChart').getContext('2d');
    const performanceData = matches.map(match => ({
        date: new Date(match.date),
        successRate: match.analysis.overview.successRate
    })).sort((a, b) => a.date - b.date);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: performanceData.map(d => d.date.toLocaleDateString()),
            datasets: [{
                label: 'Success Rate',
                data: performanceData.map(d => d.successRate),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Success Rate (%)'
                    }
                }
            }
        }
    });
}

function updateProgressChart(matches) {
    const ctx = document.getElementById('progressTrackerChart').getContext('2d');
    const progressData = matches.map(match => ({
        date: new Date(match.date),
        winners: match.analysis.overview.winners,
        errors: match.analysis.overview.errors
    })).sort((a, b) => a.date - b.date);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: progressData.map(d => d.date.toLocaleDateString()),
            datasets: [
                {
                    label: 'Winners',
                    data: progressData.map(d => d.winners),
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                },
                {
                    label: 'Errors',
                    data: progressData.map(d => d.errors),
                    borderColor: 'rgb(255, 99, 132)',
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Count'
                    }
                }
            }
        }
    });
}

function updateSkillsRadarChart(matches) {
    const ctx = document.getElementById('skillsRadarChart').getContext('2d');
    const latestMatch = matches.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Drive', 'Cross-court', 'Boast', 'Lob', 'Drop Shot', 'Volley'],
            datasets: [{
                label: 'Current Skill Level',
                data: latestMatch ? latestMatch.analysis.shotTypes : [0, 0, 0, 0, 0, 0],
                fill: true,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgb(75, 192, 192)',
                pointBackgroundColor: 'rgb(75, 192, 192)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(75, 192, 192)'
            }]
        },
        options: {
            elements: {
                line: {
                    borderWidth: 3
                }
            },
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            }
        }
    });
}

function updateWinRateChart(matches) {
    const ctx = document.getElementById('winRateChart').getContext('2d');
    const monthlyWinRates = calculateMonthlyWinRates(matches);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(monthlyWinRates),
            datasets: [{
                label: 'Monthly Win Rate',
                data: Object.values(monthlyWinRates),
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Win Rate (%)'
                    }
                }
            }
        }
    });
}

function updateCommonMistakesChart(matches) {
    const ctx = document.getElementById('commonMistakesChart').getContext('2d');
    const mistakes = analyzeCommonMistakes(matches);

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(mistakes),
            datasets: [{
                data: Object.values(mistakes),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right'
                },
                title: {
                    display: true,
                    text: 'Common Mistakes Distribution'
                }
            }
        }
    });
}

function calculateMonthlyWinRates(matches) {
    const monthlyStats = {};
    
    matches.forEach(match => {
        const date = new Date(match.date);
        const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' });
        
        if (!monthlyStats[monthYear]) {
            monthlyStats[monthYear] = {
                wins: 0,
                total: 0
            };
        }
        
        monthlyStats[monthYear].total++;
        if (match.analysis.overview.successRate > 50) {
            monthlyStats[monthYear].wins++;
        }
    });
    
    return Object.fromEntries(
        Object.entries(monthlyStats).map(([month, stats]) => [
            month,
            (stats.wins / stats.total) * 100
        ])
    );
}

function analyzeCommonMistakes(matches) {
    const mistakes = {
        'Poor Positioning': 0,
        'Wrong Shot Selection': 0,
        'Unforced Errors': 0,
        'Weak Return': 0,
        'Loss of Focus': 0
    };
    
    matches.forEach(match => {
        // Mock data - replace with actual analysis
        mistakes['Poor Positioning'] += Math.floor(Math.random() * 10);
        mistakes['Wrong Shot Selection'] += Math.floor(Math.random() * 10);
        mistakes['Unforced Errors'] += match.analysis.overview.errors;
        mistakes['Weak Return'] += Math.floor(Math.random() * 10);
        mistakes['Loss of Focus'] += Math.floor(Math.random() * 10);
    });
    
    return mistakes;
}

// Navigation
document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation
    initializeNavigation();
    
    // Load matches from IndexedDB
    initializeDatabase();
    
    // Initialize charts
    initializeCharts();
    
    // Initialize analytics when the analytics section is shown
    const analyticsLink = document.querySelector('[data-section="analytics-section"]');
    analyticsLink.addEventListener('click', () => {
        updateAnalytics();
    });
});

// Navigation handling
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section');
            navigateToSection(sectionId);
        });
    });
}

function navigateToSection(sectionId) {
    // Remove active class from all sections and nav links
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Add active class to selected section and nav link
    document.getElementById(sectionId).classList.add('active');
    document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
}

// Database initialization
let db;

function initializeDatabase() {
    const request = indexedDB.open('MatchAnalysisDB', 1);

    request.onerror = (event) => {
        console.error('Database error:', event.target.error);
    };

    request.onupgradeneeded = (event) => {
        db = event.target.result;
        if (!db.objectStoreNames.contains('matches')) {
            const store = db.createObjectStore('matches', { keyPath: 'id', autoIncrement: true });
            store.createIndex('date', 'date');
            store.createIndex('title', 'title');
        }
    };

    request.onsuccess = (event) => {
        db = event.target.result;
        loadMatches();
    };
}

// Show upload form
function showUploadForm() {
    document.getElementById('videoUploadContainer').style.display = 'block';
    document.querySelector('.match-analysis-section').style.display = 'none';
}

// Handle video upload
document.getElementById('videoUploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const matchData = {
        title: document.getElementById('matchTitle').value,
        date: document.getElementById('matchDate').value,
        videoFile: document.getElementById('videoFile').files[0],
        analysis: generateMockAnalysis(), // Replace with actual analysis
        timestamp: new Date().getTime()
    };

    // Save to IndexedDB
    await saveMatch(matchData);
});

async function saveMatch(matchData) {
    const transaction = db.transaction(['matches'], 'readwrite');
    const store = transaction.objectStore('matches');
    
    const request = store.add(matchData);
    
    request.onsuccess = () => {
        loadMatches(); // Refresh the matches list
        showMatchAnalysis(request.result); // Show analysis for the new match
    };
    
    request.onerror = () => {
        console.error('Error saving match:', request.error);
        alert('Failed to save match. Please try again.');
    };
}

async function loadMatches() {
    const transaction = db.transaction(['matches'], 'readonly');
    const store = transaction.objectStore('matches');
    const request = store.getAll();

    request.onsuccess = () => {
        const matches = request.result;
        updateMatchesList(matches);
        updateRecentMatches(matches);
    };
}

function updateMatchesList(matches) {
    const matchesList = document.getElementById('matchesList');
    matchesList.innerHTML = '';

    matches.sort((a, b) => b.timestamp - a.timestamp).forEach(match => {
        const matchElement = document.createElement('div');
        matchElement.className = 'match-item';
        matchElement.innerHTML = `
            <div class="match-info">
                <h3>${match.title}</h3>
                <p>${new Date(match.date).toLocaleDateString()}</p>
            </div>
            <div class="match-actions">
                <button class="action-btn edit-btn" title="Edit Match">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete-btn" title="Delete Match">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;

        // View match analysis
        matchElement.querySelector('.match-info').addEventListener('click', () => {
            showMatchAnalysis(match.id);
        });

        // Edit match
        matchElement.querySelector('.edit-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            showEditMatchForm(match);
        });

        // Delete match
        matchElement.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            showDeleteConfirmation(match);
        });

        matchesList.appendChild(matchElement);
    });
}

function updateRecentMatches(matches) {
    const recentMatchesList = document.getElementById('recentMatchesList');
    recentMatchesList.innerHTML = '';

    matches.sort((a, b) => b.timestamp - a.timestamp)
          .slice(0, 3)
          .forEach(match => {
              const matchElement = document.createElement('div');
              matchElement.className = 'match-preview-card';
              matchElement.innerHTML = `
                  <h3>${match.title}</h3>
                  <p>${new Date(match.date).toLocaleDateString()}</p>
                  <button onclick="navigateToSection('matches-section'); showMatchAnalysis(${match.id})">
                      View Analysis
                  </button>
              `;
              recentMatchesList.appendChild(matchElement);
          });
}

async function showMatchAnalysis(matchId) {
    console.log('Showing match analysis for ID:', matchId);
    const transaction = db.transaction(['matches'], 'readonly');
    const store = transaction.objectStore('matches');
    const request = store.get(matchId);

    request.onsuccess = () => {
        const match = request.result;
        console.log('Match data:', match);
        
        if (match) {
            document.getElementById('videoUploadContainer').style.display = 'none';
            const analysisSection = document.querySelector('.match-analysis-section');
            analysisSection.style.display = 'block';
            
            // Initialize default data if not present
            if (!match.analysis) {
                console.log('Initializing default data');
                match.analysis = getDefaultAnalysisData();
            }
            
            try {
                console.log('Updating analysis displays');
                // Update header
                document.getElementById('matchAnalysisTitle').textContent = match.title || 'Match Analysis';
                document.getElementById('matchDate').textContent = new Date(match.date).toLocaleDateString();
                
                // Update all report sections
                updateExecutiveSummary(match);
                updateGameAnalysis(match);
                updateShotAnalysis(match);
                updateCourtAnalysis(match);
                updateServeAnalysis(match);
                updateStrategicAnalysis(match);
                updateTrainingPlan(match);

                // Initialize PDF export
                initializePdfExport(match);
                
                console.log('Analysis display updates completed');
            } catch (error) {
                console.error('Error updating analysis displays:', error);
            }
        }
    };

    request.onerror = (event) => {
        console.error('Error fetching match:', event.target.error);
    };
}

function getDefaultAnalysisData() {
    return {
        winners: 15,
        errors: 8,
        successRate: 65,
        avgRallyLength: 6,
        pointsWon: 33,
        shotDistribution: [10, 15, 8, 12, 20, 15],
        shotSuccessRates: [75, 65, 60, 70, 80, 68],
        movementMetrics: [80, 75, 70, 85, 78],
        courtCoverage: generateDefaultHeatmapData(),
        firstServePercentage: 65,
        secondServePercentage: 55,
        forehandReturnPercentage: 70,
        backhandReturnPercentage: 65,
        mostEffectiveShot: 'Drop Shot',
        leastEffectiveShot: 'Backhand Drive',
        strengths: [
            'Powerful and accurate serve',
            'Excellent court coverage and movement',
            'Strong forehand drive',
            'Effective drop shots'
        ],
        improvements: [
            'Backhand consistency under pressure',
            'Second serve reliability',
            'Net play positioning',
            'Return of serve depth'
        ],
        recommendations: [
            {
                title: 'Serve Development',
                description: 'Focus on second serve consistency by practicing different spin variations and placement. Aim to increase second serve percentage above 60%.'
            },
            {
                title: 'Movement Pattern',
                description: 'Work on improving lateral movement speed and recovery position. Incorporate ghosting drills with emphasis on proper technique.'
            },
            {
                title: 'Shot Selection',
                description: 'Practice backhand drives under pressure situations. Use multi-ball drills to simulate match conditions.'
            }
        ],
        trainingPlan: [
            {
                title: 'Serve Practice Session',
                description: 'Focus on second serve consistency and placement',
                duration: '30 mins',
                intensity: 'Medium',
                focusAreas: ['Technique', 'Consistency', 'Placement']
            },
            {
                title: 'Movement Drills',
                description: 'Ghosting exercises with emphasis on recovery position',
                duration: '45 mins',
                intensity: 'High',
                focusAreas: ['Speed', 'Agility', 'Positioning']
            },
            {
                title: 'Backhand Development',
                description: 'Multi-ball drills focusing on backhand drive',
                duration: '40 mins',
                intensity: 'Medium-High',
                focusAreas: ['Technique', 'Consistency', 'Power']
            }
        ],
        games: [
            {
                score: '11-9',
                winners: 5,
                errors: 3,
                successRate: 62,
                summary: 'Strong start with effective serve placement'
            },
            {
                score: '11-7',
                winners: 6,
                errors: 2,
                successRate: 75,
                summary: 'Dominated with aggressive shot selection'
            },
            {
                score: '9-11',
                winners: 4,
                errors: 5,
                successRate: 44,
                summary: 'Increased unforced errors, need to maintain focus'
            }
        ]
    };
}

function generateDefaultHeatmapData() {
    const data = [];
    for (let i = 0; i < 10; i++) {
        data.push({
            x: Math.floor(Math.random() * 100),
            y: Math.floor(Math.random() * 100),
            value: Math.floor(Math.random() * 100)
        });
    }
    return data;
}

function updateExecutiveSummary(match) {
    console.log('Updating executive summary');
    const analysis = match.analysis;
    
    // Update stats
    document.getElementById('totalWinners').textContent = analysis.winners;
    document.getElementById('totalErrors').textContent = analysis.errors;
    document.getElementById('successRate').textContent = `${analysis.successRate}%`;
    document.getElementById('totalPoints').textContent = analysis.winners + analysis.errors;

    // Update performance summary
    const summary = document.getElementById('performanceSummary');
    summary.innerHTML = `
        <h4>Match Overview</h4>
        <p>${generateMatchSummary(analysis)}</p>
        <div class="key-metrics">
            <div class="metric">
                <span class="label">Rally Length (Avg):</span>
                <span class="value">${analysis.avgRallyLength || 0} shots</span>
            </div>
            <div class="metric">
                <span class="label">First Serve %:</span>
                <span class="value">${analysis.firstServePercentage || 0}%</span>
            </div>
            <div class="metric">
                <span class="label">Points Won:</span>
                <span class="value">${analysis.pointsWon || 0}</span>
            </div>
        </div>
    `;
}

function updateShotAnalysis(match) {
    console.log('Updating shot analysis');
    const analysis = match.analysis;
    
    // Clear existing charts
    const shotTypesCtx = document.getElementById('shotTypesChart');
    const shotSuccessCtx = document.getElementById('shotSuccessChart');
    
    // Destroy existing charts if they exist
    const existingShotTypes = Chart.getChart(shotTypesCtx);
    const existingShotSuccess = Chart.getChart(shotSuccessCtx);
    if (existingShotTypes) existingShotTypes.destroy();
    if (existingShotSuccess) existingShotSuccess.destroy();
    
    // Create new shot distribution chart
    new Chart(shotTypesCtx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Drive', 'Cross-court', 'Boast', 'Lob', 'Drop Shot', 'Volley'],
            datasets: [{
                label: 'Shot Distribution',
                data: analysis.shotDistribution,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgb(54, 162, 235)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });

    // Create new shot success rate chart
    new Chart(shotSuccessCtx.getContext('2d'), {
        type: 'radar',
        data: {
            labels: ['Drive', 'Cross-court', 'Boast', 'Lob', 'Drop Shot', 'Volley'],
            datasets: [{
                label: 'Success Rate (%)',
                data: analysis.shotSuccessRates,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgb(75, 192, 192)',
                pointBackgroundColor: 'rgb(75, 192, 192)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(75, 192, 192)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            }
        }
    });

    // Update shot details
    const shotDetails = document.getElementById('shotDetails');
    shotDetails.innerHTML = `
        <div class="shot-stats-grid">
            <div class="shot-stat">
                <h5>Most Effective Shot</h5>
                <p>${analysis.mostEffectiveShot || 'Drop Shot'}</p>
            </div>
            <div class="shot-stat">
                <h5>Areas for Improvement</h5>
                <p>${analysis.leastEffectiveShot || 'Backhand Drive'}</p>
            </div>
        </div>
    `;
}

function updateCourtAnalysis(match) {
    console.log('Updating court analysis');
    const analysis = match.analysis;
    
    // Clear existing heatmap
    const heatmapContainer = document.getElementById('courtCoverageHeatmap');
    heatmapContainer.innerHTML = '';
    
    // Create new heatmap instance
    const heatmapInstance = h337.create({
        container: heatmapContainer,
        radius: 20,
        maxOpacity: 0.6,
        minOpacity: 0.1,
        blur: 0.75
    });
    
    // Set heatmap data
    heatmapInstance.setData({
        max: 100,
        data: analysis.courtCoverage
    });

    // Clear existing movement chart
    const movementCtx = document.getElementById('movementRadarChart');
    const existingMovementChart = Chart.getChart(movementCtx);
    if (existingMovementChart) existingMovementChart.destroy();

    // Create new movement radar chart
    new Chart(movementCtx.getContext('2d'), {
        type: 'radar',
        data: {
            labels: ['Speed', 'Agility', 'Recovery', 'Court Coverage', 'Position'],
            datasets: [{
                label: 'Movement Metrics',
                data: analysis.movementMetrics,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            }
        }
    });
}

function updateServeAnalysis(match) {
    console.log('Updating serve analysis');
    const analysis = match.analysis;
    
    // Clear existing charts
    const serveCtx = document.getElementById('serveChart');
    const returnCtx = document.getElementById('returnChart');
    
    const existingServeChart = Chart.getChart(serveCtx);
    const existingReturnChart = Chart.getChart(returnCtx);
    if (existingServeChart) existingServeChart.destroy();
    if (existingReturnChart) existingReturnChart.destroy();

    // Create new serve performance chart
    new Chart(serveCtx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['First Serve', 'Second Serve'],
            datasets: [{
                label: 'Success Rate',
                data: [
                    analysis.firstServePercentage,
                    analysis.secondServePercentage
                ],
                backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(255, 99, 132, 0.5)'],
                borderColor: ['rgb(75, 192, 192)', 'rgb(255, 99, 132)'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    // Create new return performance chart
    new Chart(returnCtx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Forehand Return', 'Backhand Return'],
            datasets: [{
                label: 'Return Success Rate',
                data: [
                    analysis.forehandReturnPercentage,
                    analysis.backhandReturnPercentage
                ],
                backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)'],
                borderColor: ['rgb(54, 162, 235)', 'rgb(255, 206, 86)'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

function updateStrategicAnalysis(match) {
    console.log('Updating strategic analysis');
    const analysis = match.analysis;
    
    // Update strengths list
    const strengthsList = document.getElementById('strengthsList');
    if (strengthsList) {
        strengthsList.innerHTML = analysis.strengths.map(strength => 
            `<li>${strength}</li>`
        ).join('');
    } else {
        console.error('strengthsList element not found');
    }

    // Update improvements list
    const improvementsList = document.getElementById('improvementsList');
    if (improvementsList) {
        improvementsList.innerHTML = analysis.improvements.map(improvement => 
            `<li>${improvement}</li>`
        ).join('');
    } else {
        console.error('improvementsList element not found');
    }

    // Update recommendations
    const recommendations = document.getElementById('recommendations');
    if (recommendations) {
        recommendations.innerHTML = analysis.recommendations.map(rec => `
            <div class="recommendation-card">
                <h5>${rec.title}</h5>
                <p>${rec.description}</p>
            </div>
        `).join('');
    } else {
        console.error('recommendations element not found');
    }
}

function updateTrainingPlan(match) {
    console.log('Updating training plan');
    const analysis = match.analysis;
    
    const trainingPlan = document.getElementById('trainingPlan');
    if (trainingPlan) {
        trainingPlan.innerHTML = analysis.trainingPlan.map(exercise => `
            <div class="training-card">
                <h4>${exercise.title}</h4>
                <p class="exercise-description">${exercise.description}</p>
                <div class="exercise-details">
                    <span class="duration"><i class="fas fa-clock"></i> ${exercise.duration}</span>
                    <span class="intensity"><i class="fas fa-fire"></i> ${exercise.intensity}</span>
                </div>
                <div class="exercise-focus">
                    <h5>Focus Areas:</h5>
                    <ul>
                        ${exercise.focusAreas.map(area => `<li>${area}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `).join('');
    } else {
        console.error('trainingPlan element not found');
    }
}

function updateGameAnalysis(match) {
    console.log('Updating game analysis');
    const gamesAnalysis = document.getElementById('gamesAnalysis');
    
    // Initialize default game data if not present
    if (!match.analysis.games || match.analysis.games.length === 0) {
        match.analysis.games = [
            {
                score: '11-9',
                winners: 5,
                errors: 3,
                successRate: 62,
                summary: 'Strong start with effective serve placement'
            },
            {
                score: '11-7',
                winners: 6,
                errors: 2,
                successRate: 75,
                summary: 'Dominated with aggressive shot selection'
            },
            {
                score: '9-11',
                winners: 4,
                errors: 5,
                successRate: 44,
                summary: 'Increased unforced errors, need to maintain focus'
            }
        ];
    }
    
    const games = match.analysis.games;
    gamesAnalysis.innerHTML = games.map((game, index) => `
        <div class="game-card">
            <h4>Game ${index + 1}</h4>
            <div class="game-score">${game.score}</div>
            <div class="game-stats">
                <div class="stat">
                    <span class="label">Winners:</span>
                    <span class="value">${game.winners}</span>
                </div>
                <div class="stat">
                    <span class="label">Errors:</span>
                    <span class="value">${game.errors}</span>
                </div>
                <div class="stat">
                    <span class="label">Success Rate:</span>
                    <span class="value">${game.successRate}%</span>
                </div>
            </div>
            <p class="game-summary">${game.summary}</p>
        </div>
    `).join('');
}

// PDF Export functionality
function initializePdfExport(match) {
    document.getElementById('exportPdfBtn').addEventListener('click', async () => {
        try {
            await generatePDF(match);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('There was an error generating the PDF. Please try again.');
        }
    });
}

async function generatePDF(match) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Add match title
    doc.setFontSize(20);
    doc.text(match.title, 20, 20);
    
    // Add date
    doc.setFontSize(12);
    doc.text(`Date: ${new Date(match.date).toLocaleDateString()}`, 20, 30);
    
    // Add executive summary
    doc.setFontSize(16);
    doc.text('Executive Summary', 20, 45);
    doc.setFontSize(12);
    doc.text(`Winners: ${match.analysis.winners}`, 25, 55);
    doc.text(`Errors: ${match.analysis.errors}`, 25, 65);
    doc.text(`Success Rate: ${match.analysis.successRate}%`, 25, 75);
    
    // Convert charts to images
    const charts = document.querySelectorAll('canvas');
    let yPosition = 90;
    
    for (let chart of charts) {
        if (yPosition > 250) {
            doc.addPage();
            yPosition = 20;
        }
        
        try {
            const canvas = await html2canvas(chart);
            const imageData = canvas.toDataURL('image/jpeg', 1.0);
            doc.addImage(imageData, 'JPEG', 20, yPosition, 170, 80);
            yPosition += 90;
        } catch (error) {
            console.error('Error converting chart to image:', error);
        }
    }
    
    // Add strategic analysis
    doc.addPage();
    doc.setFontSize(16);
    doc.text('Strategic Analysis', 20, 20);
    doc.setFontSize(12);
    
    let strategyY = 35;
    match.analysis.strengths.forEach(strength => {
        doc.text(`• ${strength}`, 25, strategyY);
        strategyY += 10;
    });
    
    // Save the PDF
    doc.save(`${match.title.replace(/\s+/g, '_')}_analysis.pdf`);
}

// Initialize Chart.js defaults
Chart.defaults.responsive = true;
Chart.defaults.maintainAspectRatio = false;

let db;

// Initialize database
async function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('MatchAnalysisDB', 1);
        
        request.onerror = () => {
            console.error('Database failed to open');
            reject(request.error);
        };

        request.onsuccess = () => {
            db = request.result;
            console.log('Database opened successfully');
            resolve(db);
        };

        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains('matches')) {
                db.createObjectStore('matches', { keyPath: 'id' });
            }
        };
    });
}

// Save match to database
async function saveMatch(match) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['matches'], 'readwrite');
        const store = transaction.objectStore('matches');
        const request = store.put(match);

        request.onsuccess = () => {
            console.log('Match saved successfully');
            loadMatches(); // Refresh the matches list
            resolve(request.result);
        };

        request.onerror = () => {
            console.error('Error saving match');
            reject(request.error);
        };
    });
}

// Load all matches
async function loadMatches() {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['matches'], 'readonly');
        const store = transaction.objectStore('matches');
        const request = store.getAll();

        request.onsuccess = () => {
            const matches = request.result;
            updateMatchesList(matches);
            updateRecentMatches(matches);
            resolve(matches);
        };

        request.onerror = () => {
            console.error('Error loading matches');
            reject(request.error);
        };
    });
}

// Update matches list in sidebar
function updateMatchesList(matches) {
    const matchesList = document.getElementById('matchesList');
    if (!matchesList) return;

    matchesList.innerHTML = matches.map(match => `
        <div class="match-item" data-id="${match.id}">
            <div class="match-info">
                <h4>${match.title}</h4>
                <p class="match-date">${new Date(match.date).toLocaleDateString()}</p>
            </div>
            <div class="match-actions">
                <button onclick="showMatchAnalysis(${match.id})" class="action-btn">
                    <i class="fas fa-chart-bar"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Show match analysis
async function showMatchAnalysis(matchId) {
    console.log('Showing analysis for match:', matchId);
    const transaction = db.transaction(['matches'], 'readonly');
    const store = transaction.objectStore('matches');
    const request = store.get(matchId);

    request.onsuccess = () => {
        const match = request.result;
        if (match) {
            // Hide upload form and show analysis section
            document.getElementById('videoUploadContainer').style.display = 'none';
            const analysisSection = document.querySelector('.match-analysis-section');
            analysisSection.style.display = 'block';

            // Initialize default data if not present
            if (!match.analysis) {
                match.analysis = getDefaultAnalysisData();
                saveMatch(match);
            }

            // Update UI elements
            document.getElementById('matchAnalysisTitle').textContent = match.title;
            document.getElementById('matchDate').textContent = new Date(match.date).toLocaleDateString();
            
            // Update all sections
            updateExecutiveSummary(match);
            updateGameAnalysis(match);
            updateShotAnalysis(match);
            updateCourtAnalysis(match);
            updateServeAnalysis(match);
            updateStrategicAnalysis(match);
            updateTrainingPlan(match);
        }
    };
}

// Update executive summary
function updateExecutiveSummary(match) {
    const analysis = match.analysis;
    document.getElementById('winnersCount').textContent = analysis.winners;
    document.getElementById('errorsCount').textContent = analysis.errors;
    document.getElementById('successRate').textContent = analysis.successRate + '%';
    document.getElementById('pointsWon').textContent = analysis.pointsWon;
}

// Update game analysis
function updateGameAnalysis(match) {
    const gamesAnalysis = document.getElementById('gamesAnalysis');
    if (!gamesAnalysis) return;

    gamesAnalysis.innerHTML = match.analysis.games.map(game => `
        <div class="game-card">
            <h4>Game Score: ${game.score}</h4>
            <div class="game-stats">
                <p>Winners: ${game.winners}</p>
                <p>Errors: ${game.errors}</p>
                <p>Success Rate: ${game.successRate}%</p>
            </div>
            <p class="game-summary">${game.summary}</p>
        </div>
    `).join('');
}

// Get default analysis data
function getDefaultAnalysisData() {
    return {
        winners: 15,
        errors: 8,
        successRate: 65,
        pointsWon: 33,
        games: [
            {
                score: '11-9',
                winners: 5,
                errors: 3,
                successRate: 62,
                summary: 'Strong start with effective serve placement'
            },
            {
                score: '11-7',
                winners: 6,
                errors: 2,
                successRate: 75,
                summary: 'Excellent shot selection and minimal errors'
            }
        ]
    };
}

// Handle video upload
document.getElementById('videoUploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const title = document.getElementById('matchTitle').value;
    const date = document.getElementById('matchDate').value;
    const videoFile = document.getElementById('videoFile').files[0];

    if (!title || !date || !videoFile) {
        alert('Please fill in all fields');
        return;
    }

    const newMatch = {
        id: Date.now(),
        title,
        date,
        fileName: videoFile.name,
        analysis: getDefaultAnalysisData(),
        timestamp: new Date().toISOString()
    };

    try {
        await saveMatch(newMatch);
        showMatchAnalysis(newMatch.id);
    } catch (error) {
        console.error('Error saving match:', error);
        alert('Error saving match. Please try again.');
    }
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await initDB();
        await loadMatches();
    } catch (error) {
        console.error('Error initializing:', error);
    }
});
