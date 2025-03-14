document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const workoutForm = document.getElementById('workout-form');
    const workoutsList = document.getElementById('workouts-list');
    const editModal = document.getElementById('edit-modal');
    const editForm = document.getElementById('edit-form');
    const closeModalBtn = editModal.querySelector('.close');
    const errorMessage = document.getElementById('error-message');
    const memberFilter = document.getElementById('member-filter');
    const typeFilter = document.getElementById('type-filter');

    // Event Listeners
    workoutForm.addEventListener('submit', handleWorkoutSubmit);
    editForm.addEventListener('submit', handleEditSubmit);
    closeModalBtn.addEventListener('click', closeModal);
    memberFilter.addEventListener('change', applyFilters);
    typeFilter.addEventListener('change', applyFilters);

    // Add event delegation for edit and delete buttons
    workoutsList.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-edit')) {
            const workoutId = e.target.dataset.id;
            openEditModal(workoutId);
        } else if (e.target.classList.contains('btn-delete')) {
            const workoutId = e.target.dataset.id;
            confirmDelete(workoutId);
        }
    });

    // Functions
    async function handleWorkoutSubmit(e) {
        e.preventDefault();
        const formData = new FormData(workoutForm);
        const workoutData = Object.fromEntries(formData.entries());

        // Format date properly for API
        if (workoutData.date) {
            workoutData.date = new Date(workoutData.date).toISOString();
        }

        // Convert numeric fields to numbers
        if (workoutData.duration) {
            workoutData.duration = Number(workoutData.duration);
        }
        if (workoutData.caloriesBurned) {
            workoutData.caloriesBurned = Number(workoutData.caloriesBurned);
        }

        try {
            const response = await axios.post('/api/v1/workouts', workoutData);
            // Refresh the page to show the new workout
            window.location.reload();
        } catch (error) {
            showError(error.response?.data?.message || 'Failed to add workout');
        }
    }

    async function openEditModal(workoutId) {
        try {
            const response = await axios.get(`/api/v1/workouts/${workoutId}`);
            const workout = response.data;
            
            // Populate the edit form with workout data
            document.getElementById('edit-id').value = workout._id;
            document.getElementById('edit-member').value = workout.member;
            document.getElementById('edit-workoutType').value = workout.workoutType;
            document.getElementById('edit-duration').value = workout.duration;
            
            // Format date for date input (YYYY-MM-DD)
            const workoutDate = new Date(workout.date);
            const formattedDate = workoutDate.toISOString().split('T')[0];
            document.getElementById('edit-date').value = formattedDate;
            
            document.getElementById('edit-caloriesBurned').value = workout.caloriesBurned;

            // Show the modal
            editModal.classList.remove('hidden');
        } catch (error) {
            showError(error.response?.data?.message || 'Failed to fetch workout details');
        }
    }

    async function handleEditSubmit(e) {
        e.preventDefault();
        const formData = new FormData(editForm);
        const workoutData = Object.fromEntries(formData.entries());
        const workoutId = document.getElementById('edit-id').value;

        // Format date properly for API
        if (workoutData.date) {
            workoutData.date = new Date(workoutData.date).toISOString();
        }

        // Convert numeric fields to numbers
        if (workoutData.duration) {
            workoutData.duration = Number(workoutData.duration);
        }
        if (workoutData.caloriesBurned) {
            workoutData.caloriesBurned = Number(workoutData.caloriesBurned);
        }

        try {
            const response = await axios.put(`/api/v1/workouts/${workoutId}`, workoutData);
            // Refresh the page to show the updated workout
            window.location.reload();
        } catch (error) {
            showError(error.response?.data?.message || 'Failed to update workout');
        }
    }

    async function confirmDelete(workoutId) {
        if (confirm('Are you sure you want to delete this workout? This action cannot be undone.')) {
            try {
                const response = await axios.delete(`/api/v1/workouts/${workoutId}`);
                // Refresh the page to update the workouts list
                window.location.reload();
            } catch (error) {
                showError(error.response?.data?.message || 'Failed to delete workout');
            }
        }
    }

    function closeModal() {
        editModal.classList.add('hidden');
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
        
        // Clear error after 5 seconds
        setTimeout(() => {
            errorMessage.textContent = '';
            errorMessage.classList.add('hidden');
        }, 5000);
    }

    function applyFilters() {
        const memberValue = memberFilter.value;
        const typeValue = typeFilter.value;
        
        const workoutCards = document.querySelectorAll('.workout-card');
        
        workoutCards.forEach(card => {
            const member = card.dataset.member || '';
            const type = card.dataset.type || '';
            
            const memberMatch = !memberValue || member === memberValue;
            const typeMatch = !typeValue || type === typeValue;
            
            if (memberMatch && typeMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
});