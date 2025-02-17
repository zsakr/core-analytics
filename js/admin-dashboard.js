document.addEventListener('DOMContentLoaded', function() {
    // Check if user is admin
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'admin') {
        window.location.href = 'login.html';
        return;
    }

    // Set admin name
    document.getElementById('adminName').textContent = currentUser.name;

    // Handle logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        });
    }

    // Mock user data for demonstration
    const mockUsers = [
        {
            name: 'John Doe',
            email: 'john@example.com',
            country: 'United States',
            status: 'Active'
        },
        {
            name: 'Jane Smith',
            email: 'jane@example.com',
            country: 'Canada',
            status: 'Inactive'
        }
    ];

    // Populate users table
    const usersTableBody = document.getElementById('usersTableBody');
    mockUsers.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.country}</td>
            <td><span class="status-badge ${user.status.toLowerCase()}">${user.status}</span></td>
            <td>
                <button class="action-btn edit"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete"><i class="fas fa-trash"></i></button>
            </td>
        `;
        usersTableBody.appendChild(row);
    });

    // Update stats
    document.querySelectorAll('.stat-number').forEach((stat, index) => {
        const numbers = [mockUsers.length, '3', '5'];
        stat.textContent = numbers[index];
    });

    // Handle refresh button
    document.querySelector('.refresh-btn').addEventListener('click', function() {
        location.reload();
    });

    // Handle add user button
    document.querySelector('.add-user-btn').addEventListener('click', function() {
        alert('Add user functionality will be implemented here');
    });

    // Handle edit and delete buttons
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.classList.contains('edit') ? 'Edit' : 'Delete';
            alert(`${action} functionality will be implemented here`);
        });
    });
});
