

async function getCoordinates(location) {
    try {
        // Construct the API URL with the encoded location
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;
        
        // Fetch the data from the API
        const response = await fetch(url);
        
        // Convert the response to JSON
        const data = await response.json();
        
        // Check if data was returned
        if (data.length > 0) {
            const lat = data[0].lat;
            const lon = data[0].lon;
            
            // Return the coordinates
            return { lat, lon };
        } else {
            console.log("Location not found!");
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}


// Example usage
getCoordinates(listingLocation).then(coordinates => {
    if (coordinates) {
        // Initialize the map with the fetched coordinates
        var map = L.map('map').setView([coordinates.lat, coordinates.lon], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        L.marker([coordinates.lat, coordinates.lon]).addTo(map)
            .bindPopup('<b>Welcome to RentNest!</b><br>Your ideal stay awaits here.')
            .openPopup();

        L.circle([coordinates.lat, coordinates.lon], {radius: 900, color: '#fe424d', opacity: 0.8, fillOpacity: 0.4, stroke: false}).addTo(map);

    }
});

// const olaMaps = new OlaMapsSDK.OlaMaps({
//     apiKey: 'PY87xIs1GJtYNa8DGI2kMhFYscxn0tGYE2RiVdAg',
    
//   });
  
//   const myMap = olaMaps.init({
//       style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
//       container: 'map',
//       center: [77.61648476788898, 12.931423492103944],
//       zoom: 15,
//   })
