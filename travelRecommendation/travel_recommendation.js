// Fetch data from JSON file
fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

// Search function
function searchDestinations() {
    const input = document.getElementById('searchInput').value.toLowerCase().trim();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (!input) {
        alert('Please enter a keyword to search!');
        return;
    }

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {

            // Search for beaches
            if (input === 'beach' || input === 'beaches') {
                if (data.beaches.length > 0) {
                    data.beaches.forEach(place => {
                        const card = document.createElement('div');
                        card.classList.add('result-card');
                        card.innerHTML = `
                            <img src="${place.imageUrl}" alt="${place.name}">
                            <h3>${place.name}</h3>
                            <p>${place.description}</p>
                        `;
                        resultsDiv.appendChild(card);
                    });
                } else {
                    resultsDiv.innerHTML = '<p>No beaches found.</p>';
                }
            }

            // Search for temples
            else if (input === 'temple' || input === 'temples') {
                if (data.temples.length > 0) {
                    data.temples.forEach(place => {
                        const card = document.createElement('div');
                        card.classList.add('result-card');
                        card.innerHTML = `
                            <img src="${place.imageUrl}" alt="${place.name}">
                            <h3>${place.name}</h3>
                            <p>${place.description}</p>
                        `;
                        resultsDiv.appendChild(card);
                    });
                } else {
                    resultsDiv.innerHTML = '<p>No temples found.</p>';
                }
            }

            // Search for countries
            else if (input === 'country' || input === 'countries') {
                data.countries.forEach(country => {
                    country.cities.forEach(city => {
                        const card = document.createElement('div');
                        card.classList.add('result-card');

                        let timezone = 'UTC';
                        if (country.name === 'Australia') timezone = 'Australia/Sydney';
                        if (country.name === 'Japan') timezone = 'Asia/Tokyo';
                        if (country.name === 'Brazil') timezone = 'America/Sao_Paulo';

                        const localTime = getCountryTime(timezone);

                        card.innerHTML = `
                            <img src="${city.imageUrl}" alt="${city.name}">
                            <h3>${city.name}</h3>
                            <p>${city.description}</p>
                            <p>🕐 Local Time: ${localTime}</p>
                        `;
                        resultsDiv.appendChild(card);
                    });
                });
            }

            // No matching keyword
            else {
                resultsDiv.innerHTML = '<p>No results found. Try beach, temple or country.</p>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultsDiv.innerHTML = '<p>An error occurred while fetching data.</p>';
        });
}

// Clear results function
function clearResults() {
    document.getElementById('results').innerHTML = '';
    document.getElementById('searchInput').value = '';
}

// Get country time function
function getCountryTime(timezone) {
    const options = {
        timeZone: timezone,
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    return new Date().toLocaleTimeString('en-US', options);
}

// Auto search function for hint cards
function autoSearch(keyword) {
    document.getElementById('searchInput').value = keyword;
    searchDestinations();
}