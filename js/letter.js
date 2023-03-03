// Define a function to handle user input for a field
function handleFieldInput(inputEl, outputEl, extraText) {
    inputEl.addEventListener('input', (e) => {
        const inputValue = e.target.value;
        // Do something with the inputValue...
        outputEl.innerHTML = extraText + inputValue;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // Get references to all necessary input and output elements
    const inputs = {
        firstName: document.getElementById('first-name-input'),
        lastName: document.getElementById('last-name-input'),
        degree: document.getElementById('degree-input'),
        address: document.getElementById('address-input'),
        stateProvince: document.getElementById('state-province-input'),
        country: document.getElementById('country-input'),
        institution: document.getElementById('institution-input'),
        passport: document.getElementById('passport-input'),
        dob: document.getElementById('dob-input'),
        arrival: document.getElementById('arrival-input'),
        departure: document.getElementById('departure-input')
    };
    const outputs = {
        currentDate: document.getElementById('currentDate'),
        firstName: document.querySelectorAll('.firstName'),
        lastName: document.querySelectorAll('.lastName'),
        degree: document.querySelector('.degree'),
        address: document.getElementById('address'),
        stateProvince: document.getElementById('cityState'),
        country: document.getElementById('country'),
        institution: document.getElementById('institution'),
        passport: document.getElementById('passportNumber'),
        dob: document.getElementById('dateOfBirth'),
        arrival: document.getElementById('arrivalDate'),
        departure: document.getElementById('departureDate')
    };

    // Get all the countries and populate the country select element
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(countries => {
            countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
            countries.forEach(country => {
                const option = document.createElement('option');
                option.value = country.name.common;
                option.textContent = country.name.common;
                inputs.country.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });

    // Populate the letter template with the current date
    outputs.currentDate.textContent = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Handle user input for each field
    inputs.firstName.addEventListener('input', (e) => {
        const inputValue = e.target.value;
        document.querySelectorAll('.firstName').forEach((element) => {
            element.innerHTML = inputValue;
        });
    });

    // Handle user input for each field
    inputs.lastName.addEventListener('input', (e) => {
        const inputValue = e.target.value;
        document.querySelectorAll('.lastName').forEach((element) => {
            element.innerHTML = inputValue + ',';
        });
    });
    
    handleFieldInput(inputs.degree, outputs.degree, '');
    handleFieldInput(inputs.address, outputs.address, '');
    handleFieldInput(inputs.stateProvince, outputs.stateProvince, '');
    inputs.country.addEventListener('change', (e) => {
        const selectedValue = e.target.value;
        outputs.country.innerHTML = selectedValue;
    });
    handleFieldInput(inputs.institution, outputs.institution, '');
    handleFieldInput(inputs.passport, outputs.passport, '');
    handleFieldInput(inputs.dob, outputs.dob, '');
    handleFieldInput(inputs.arrival, outputs.arrival, '');
    handleFieldInput(inputs.departure, outputs.departure, '');

    // Attach the print functionality to the print button
    const printButton = document.getElementById('print-button');
    printButton.addEventListener('click', function() {
        window.print();
    });
});
