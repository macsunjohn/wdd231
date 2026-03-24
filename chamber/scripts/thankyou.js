// Thank You Page Logic
// Extract data from the URL (GET method)
        const urlParams = new URLSearchParams(window.location.search);
        const resultsContainer = document.querySelector('#results');

        // Map the 'name' attribute from your form to a user-friendly label
        const fieldLabels = {
            'fname': 'First Name',
            'lname': 'Last Name',
            'email': 'Email Address',
            'phone': 'Mobile Phone',
            'organization': 'Business Name',
            'timestamp': 'Submission Date/Time'
        };

        // Loop through and display only the required fields
        Object.keys(fieldLabels).forEach(key => {
            if (urlParams.has(key)) {
                let value = urlParams.get(key);
                
                // If it's the timestamp, format it to be readable
                if (key === 'timestamp') {
                    value = new Date(parseInt(value)).toLocaleString();
                }

                const infoDiv = document.createElement('div');
                infoDiv.className = 'info-item';
                infoDiv.innerHTML = `<strong>${fieldLabels[key]}:</strong> ${value}`;
                resultsContainer.appendChild(infoDiv);
            }
        });