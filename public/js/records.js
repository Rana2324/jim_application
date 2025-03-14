document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const recordForm = document.getElementById('record-form');
    const recordsList = document.getElementById('records-list');
    const editModal = document.getElementById('edit-modal');
    const editForm = document.getElementById('edit-form');
    const closeModalBtn = editModal.querySelector('.close');
    const errorMessage = document.getElementById('error-message');

    // Event Listeners
    recordForm.addEventListener('submit', handleRecordSubmit);
    editForm.addEventListener('submit', handleEditSubmit);
    closeModalBtn.addEventListener('click', closeModal);

    // Add event delegation for edit and delete buttons
    recordsList.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-edit')) {
            const recordId = e.target.dataset.id;
            openEditModal(recordId);
        } else if (e.target.classList.contains('btn-delete')) {
            const recordId = e.target.dataset.id;
            confirmDelete(recordId);
        }
    });

    // Format date input to current datetime
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        
        dateInput.value = `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    // Functions
    async function handleRecordSubmit(e) {
        e.preventDefault();
        const formData = new FormData(recordForm);
        const recordData = Object.fromEntries(formData.entries());

        // Format date properly for API
        if (recordData.date) {
            recordData.date = new Date(recordData.date).toISOString();
        }

        // Convert numeric fields to numbers
        if (recordData.value) {
            recordData.value = Number(recordData.value);
        }

        try {
            const response = await axios.post('/api/v1/records', recordData);
            // Refresh the page to show the new record
            window.location.reload();
        } catch (error) {
            showError(error.response?.data?.message || 'Failed to add record');
        }
    }

    async function openEditModal(recordId) {
        try {
            const response = await axios.get(`/api/v1/records/${recordId}`);
            const record = response.data;
            
            // Format date for datetime-local input
            const recordDate = new Date(record.date);
            const year = recordDate.getFullYear();
            const month = String(recordDate.getMonth() + 1).padStart(2, '0');
            const day = String(recordDate.getDate()).padStart(2, '0');
            const hours = String(recordDate.getHours()).padStart(2, '0');
            const minutes = String(recordDate.getMinutes()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
            
            // Populate the edit form with record data
            document.getElementById('edit-id').value = record._id;
            document.getElementById('edit-memberId').value = record.memberId;
            document.getElementById('edit-workoutId').value = record.workoutId;
            document.getElementById('edit-recordType').value = record.recordType;
            document.getElementById('edit-value').value = record.value;
            document.getElementById('edit-date').value = formattedDate;

            // Show the modal
            editModal.classList.remove('hidden');
        } catch (error) {
            showError(error.response?.data?.message || 'Failed to fetch record details');
        }
    }

    async function handleEditSubmit(e) {
        e.preventDefault();
        const formData = new FormData(editForm);
        const recordData = Object.fromEntries(formData.entries());
        const recordId = document.getElementById('edit-id').value;

        // Format date properly for API
        if (recordData.date) {
            recordData.date = new Date(recordData.date).toISOString();
        }

        // Convert numeric fields to numbers
        if (recordData.value) {
            recordData.value = Number(recordData.value);
        }

        try {
            const response = await axios.put(`/api/v1/records/${recordId}`, recordData);
            // Refresh the page to show the updated record
            window.location.reload();
        } catch (error) {
            showError(error.response?.data?.message || 'Failed to update record');
        }
    }

    async function confirmDelete(recordId) {
        if (confirm('Are you sure you want to delete this record? This action cannot be undone.')) {
            try {
                const response = await axios.delete(`/api/v1/records/${recordId}`);
                // Refresh the page to update the records list
                window.location.reload();
            } catch (error) {
                showError(error.response?.data?.message || 'Failed to delete record');
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
});