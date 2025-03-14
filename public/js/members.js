document.addEventListener('DOMContentLoaded', () => {
  // Form submission for adding a new member
  const memberForm = document.getElementById('member-form');
  if (memberForm) {
    memberForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(memberForm);
      const memberData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        membershipType: formData.get('membershipType'),
        password: formData.get('password'),
        gender: formData.get('gender')
      };
      
      try {
        const response = await axios.post('/api/v1/members', memberData);
        
        // Success - reload the page to show the new member
        alert('Member added successfully!');
        window.location.reload();
      } catch (error) {
        console.error('Error adding member:', error);
        alert(`Error: ${error.response?.data?.message || 'Failed to add member'}`);
      }
    });
  }
  
  // Delete member functionality
  const deleteButtons = document.querySelectorAll('.btn-delete');
  deleteButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
      const memberId = e.target.dataset.id;
      if (!memberId) return;
      
      if (confirm('Are you sure you want to delete this member? This action cannot be undone.')) {
        try {
          const response = await axios.delete(`/api/v1/members/${memberId}`);
          
          // Success - reload the page
          alert('Member deleted successfully!');
          window.location.reload();
        } catch (error) {
          console.error('Error deleting member:', error);
          alert(`Error: ${error.response?.data?.message || 'Failed to delete member'}`);
        }
      }
    });
  });
  
  // Edit member functionality
  const editButtons = document.querySelectorAll('.btn-edit');
  const editModal = document.getElementById('edit-modal');
  const editForm = document.getElementById('edit-form');
  const closeModalBtn = document.querySelector('.close');
  
  // Open modal with member data
  editButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
      const memberId = e.target.dataset.id;
      if (!memberId) return;
      
      try {
        const response = await axios.get(`/api/v1/members/${memberId}`);
        const member = response.data.data;
        
        if (member) {
          // Fill the form with member data
          document.getElementById('edit-id').value = member._id;
          document.getElementById('edit-name').value = member.name;
          document.getElementById('edit-email').value = member.email;
          document.getElementById('edit-phone').value = member.phone;
          document.getElementById('edit-membershipType').value = member.membershipType;
          document.getElementById('edit-gender').value = member.gender;
          
          // Show the modal
          editModal.classList.remove('hidden');
        } else {
          alert('Failed to fetch member data');
        }
      } catch (error) {
        console.error('Error fetching member data:', error);
        alert(`Error: ${error.response?.data?.message || 'Failed to fetch member data'}`);
      }
    });
  });
  
  // Close modal
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      editModal.classList.add('hidden');
    });
  }
  
  // Submit edit form
  if (editForm) {
    editForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(editForm);
      const memberId = formData.get('id');
      
      if (!memberId) {
        alert('Member ID is missing. Please try again.');
        return;
      }
      
      const memberData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        membershipType: formData.get('membershipType'),
        gender: formData.get('gender')
      };
      
      try {
        const response = await axios.put(`/api/v1/members/${memberId}`, memberData);
        
        // Success - reload the page
        alert('Member updated successfully!');
        window.location.reload();
      } catch (error) {
        console.error('Error updating member:', error);
        alert(`Error: ${error.response?.data?.message || 'Failed to update member'}`);
      }
    });
  }
  
  // Edit Member Form (memberEdit.ejs)
  const editMemberForm = document.getElementById('editMemberForm');
  if (editMemberForm) {
    editMemberForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Get form data
      const memberId = document.getElementById('memberId').value;
      const errorMessage = document.getElementById('errorMessage');
      const successMessage = document.getElementById('successMessage');
      
      // Hide any previous messages
      errorMessage.classList.add('hidden');
      successMessage.classList.add('hidden');
      
      // Create member data object
      const memberData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        gender: document.getElementById('gender').value,
        membershipType: document.getElementById('membershipType').value
      };
      
      // Add password only if it's provided
      const password = document.getElementById('password').value;
      if (password && password.trim() !== '') {
        memberData.password = password;
      }
      
      try {
        const response = await axios.put(`/api/v1/members/${memberId}`, memberData);
        
        // Show success message
        successMessage.textContent = 'Member updated successfully!';
        successMessage.classList.remove('hidden');
        
        // Redirect back to member details after a short delay
        setTimeout(() => {
          window.location.href = `/members/${memberId}`;
        }, 1500);
      } catch (error) {
        console.error('Error updating member:', error);
        errorMessage.textContent = error.response?.data?.message || 'Failed to update member. Please try again.';
        errorMessage.classList.remove('hidden');
      }
    });
  }
  
  // Phone number formatting
  const formatPhoneInput = (input) => {
    // Get the selected country code
    const countryCodeSelect = input.closest('.phone-input-group')?.querySelector('.country-code-select');
    const countryCode = countryCodeSelect ? countryCodeSelect.value : '+1';
    
    // Format the phone number based on the country code
    let phoneNumber = input.value.replace(/\D/g, '');
    
    if (phoneNumber.length > 0) {
      // Format based on country
      if (countryCode === '+1') { // USA/Canada
        if (phoneNumber.length > 10) phoneNumber = phoneNumber.slice(0, 10);
        if (phoneNumber.length > 6) {
          phoneNumber = `${countryCode} (${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
        } else if (phoneNumber.length > 3) {
          phoneNumber = `${countryCode} (${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        } else if (phoneNumber.length > 0) {
          phoneNumber = `${countryCode} (${phoneNumber})`;
        }
      } else if (countryCode === '+81') { // Japan
        if (phoneNumber.length > 10) phoneNumber = phoneNumber.slice(0, 10);
        if (phoneNumber.length > 6) {
          phoneNumber = `${countryCode} (${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 6)}-${phoneNumber.slice(6)}`;
        } else if (phoneNumber.length > 2) {
          phoneNumber = `${countryCode} (${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
        } else if (phoneNumber.length > 0) {
          phoneNumber = `${countryCode} (${phoneNumber})`;
        }
      } else if (countryCode === '+880') { // Bangladesh
        if (phoneNumber.length > 10) phoneNumber = phoneNumber.slice(0, 10);
        if (phoneNumber.length > 7) {
          phoneNumber = `${countryCode} (${phoneNumber.slice(0, 4)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7)}`;
        } else if (phoneNumber.length > 4) {
          phoneNumber = `${countryCode} (${phoneNumber.slice(0, 4)}) ${phoneNumber.slice(4)}`;
        } else if (phoneNumber.length > 0) {
          phoneNumber = `${countryCode} (${phoneNumber})`;
        }
      } else {
        // Default formatting for other countries
        if (phoneNumber.length > 10) phoneNumber = phoneNumber.slice(0, 10);
        if (phoneNumber.length > 6) {
          phoneNumber = `${countryCode} ${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
        } else if (phoneNumber.length > 3) {
          phoneNumber = `${countryCode} ${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
        } else {
          phoneNumber = `${countryCode} ${phoneNumber}`;
        }
      }
    } else {
      phoneNumber = countryCode;
    }
    
    input.value = phoneNumber;
  };
  
  // Apply phone formatting to all phone inputs
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach(input => {
    input.addEventListener('input', () => formatPhoneInput(input));
    
    // Initialize with formatting
    if (input.value) {
      formatPhoneInput(input);
    }
  });
});