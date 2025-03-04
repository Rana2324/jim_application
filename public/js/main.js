// API endpoints
const API_BASE_URL = 'http://localhost:5000/api/v1';

// Fetch helpers
async function fetchApi(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        showError(error.message);
        throw error;
    }
}

// Error handling
function showError(message) {
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    }
}

// Members functions
async function loadMembers() {
    try {
        const data = await fetchApi('/members');
        const membersList = document.getElementById('members-list');
        if (membersList && data.data) {
            membersList.innerHTML = data.data.map(member => `
                <div class="member-card">
                    <h3>${member.name}</h3>
                    <p>Email: ${member.email}</p>
                    <p>Membership: ${member.membershipType}</p>
                    <div class="actions">
                        <button onclick="editMember('${member._id}')">Edit</button>
                        <button onclick="deleteMember('${member._id}')">Delete</button>
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading members:', error);
    }
}

// Workouts functions
async function loadWorkouts() {
    try {
        const data = await fetchApi('/workouts');
        const workoutsList = document.getElementById('workouts-list');
        if (workoutsList && data.data) {
            workoutsList.innerHTML = data.data.map(workout => `
                <div class="workout-card">
                    <h3>${workout.name}</h3>
                    <p>${workout.description}</p>
                    <div class="actions">
                        <button onclick="editWorkout('${workout._id}')">Edit</button>
                        <button onclick="deleteWorkout('${workout._id}')">Delete</button>
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading workouts:', error);
    }
}

// Form submission handlers
async function handleMemberSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const memberData = Object.fromEntries(formData.entries());
    
    try {
        await fetchApi('/members', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(memberData)
        });
        loadMembers();
        event.target.reset();
    } catch (error) {
        console.error('Error creating member:', error);
    }
}

async function handleWorkoutSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const workoutData = Object.fromEntries(formData.entries());
    
    try {
        await fetchApi('/workouts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(workoutData)
        });
        loadWorkouts();
        event.target.reset();
    } catch (error) {
        console.error('Error creating workout:', error);
    }
}

// Initialize page data
document.addEventListener('DOMContentLoaded', () => {
    const membersPage = document.getElementById('members-list');
    const workoutsPage = document.getElementById('workouts-list');
    
    if (membersPage) loadMembers();
    if (workoutsPage) loadWorkouts();
    
    // Setup form listeners
    const memberForm = document.getElementById('member-form');
    const workoutForm = document.getElementById('workout-form');
    
    if (memberForm) memberForm.addEventListener('submit', handleMemberSubmit);
    if (workoutForm) workoutForm.addEventListener('submit', handleWorkoutSubmit);
});