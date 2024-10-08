let participants = []; // Array to hold all participants

// 1. Event Handler Functions

// Form submit handler
function handleFormSubmit(e) {
    e.preventDefault(); 

    if (validateForm()) {
        const participant = collectFormData();

        if (!isEmailRegistered(participant[2])) {
            participants.push(participant);
            updateTable();
        } else {
            alert("Email is already registered.");
        }
    }
}

// Form validation function
function validateForm() {
    if (!isAtLeastOneClubSelected()) {
        alert("Please select at least one club.");
        return false;
    }

    return true;
}

// Check if at least one club is selected
function isAtLeastOneClubSelected() {
    const clubCheckboxes = document.querySelectorAll('.club-checkbox');
    for (let checkbox of clubCheckboxes) {
        if (checkbox.checked) {
            return true;
        }
    }
    return false;
}

// Function to collect form data
function collectFormData() {
    let firstName = document.getElementById('firstName').value.trim();
    let lastName = document.getElementById('lastName').value.trim();
    let email = document.getElementById('email').value.trim();
    let field = document.getElementById('field').value;
    let group = document.getElementById('group').value;

    // Get the selected gender (radio button)
    let gender = document.querySelector('input[name="gender"]:checked').value;

    // Get all selected clubs (checkboxes)
    let clubs = [];
    const clubCheckboxes = document.querySelectorAll('.club-checkbox:checked');
    clubCheckboxes.forEach((checkbox) => clubs.push(checkbox.value));

    return [firstName, lastName, email, field, group, gender, clubs];
}

// Check if email is already registered
function isEmailRegistered(email) {
    for (let i = 0; i < participants.length; i++) {
        if (participants[i][2] === email) { // Accessing the email by index 2
            return true;
        }
    }
    return false;
}

// Update the participants table
function updateTable() {
    const tbody = document.querySelector('#participantsTable tbody');
    tbody.innerHTML = ''; // Clear table before adding updated rows

    participants.forEach(participant => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${participant[0]} ${participant[1]}</td>
            <td>${participant[2]}</td>
            <td>${participant[3]}</td>
            <td>${participant[4]}</td>
            <td>${participant[5]}</td>
            <td>${participant[6].join(', ')}</td>
        `;
        tbody.appendChild(row);
    });
}

// Show or hide groups based on the selected field
function toggleGroups() {
    const field = document.getElementById('field').value;
    const mobileGroups = document.getElementById('mobileGroups');
    const webGroups = document.getElementById('webGroups');

    if (field === 'mobile') {
        mobileGroups.style.display = 'block';
        webGroups.style.display = 'none';
    } else if (field === 'web') {
        webGroups.style.display = 'block';
        mobileGroups.style.display = 'none';
    } else {
        mobileGroups.style.display = 'none';
        webGroups.style.display = 'none';
    }
}

// Add event listeners
document.getElementById('participationForm').addEventListener('submit', handleFormSubmit);
document.getElementById('field').addEventListener('change', toggleGroups);
document.getElementById('participationForm').addEventListener('reset', function() {
    const mobileGroups = document.getElementById('mobileGroups');
    const webGroups = document.getElementById('webGroups');
    mobileGroups.style.display = 'none';
    webGroups.style.display = 'none';
});

// Initially hide the groups
toggleGroups();
