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
            let results = [];

            // Search for beaches
            if (input === 'beach' || input === 'beaches') {
                results = data.beaches;
            }
            // Search for temples
            else if (input === 'temple' || input === 'temples') {
                results = data.temples;
            }
            // Search for countries
            else if (input === 'country' || input === 'countries') {
                data.countries.forEach(country => {
                    results = results.concat(country.cities);
                });
            }

            // Display results
            if (results.length > 0) {
                results.forEach(place => {
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