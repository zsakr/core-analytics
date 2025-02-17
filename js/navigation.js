// Navigation functionality
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');

    // Function to update active section
    function setActiveSection(sectionId) {
        // Update navigation links
        navLinks.forEach(link => {
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Update content sections
        contentSections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });

        // Update URL hash without scrolling
        history.pushState(null, '', `#${sectionId.replace('-section', '')}`);
    }

    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section');
            setActiveSection(sectionId);
        });
    });

    // Handle direct URL navigation
    function handleUrlNavigation() {
        const hash = window.location.hash.slice(1) || 'dashboard';
        const sectionId = `${hash}-section`;
        setActiveSection(sectionId);
    }

    // Listen for URL changes
    window.addEventListener('popstate', handleUrlNavigation);

    // Handle initial page load
    handleUrlNavigation();

    // Handle logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Add logout logic here
            console.log('Logging out...');
        });
    }
});

// Function to navigate to a specific section programmatically
function navigateToSection(sectionId) {
    const navLink = document.querySelector(`[data-section="${sectionId}"]`);
    if (navLink) {
        navLink.click();
    }
}
