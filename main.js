cityOneLat = '33.3898';
cityOneLon = '-111.9344';
cityTwoLat = '12.2921';
cityTwoLon = '76.6153';

function displayTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    hours = hours.toString().padStart(2, '0');
    document.getElementById("current-time").innerText = `${hours}:${minutes} ${ampm}`;
    displayDate();
}

function displayDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString('en-US', options);

    const day = now.getDate();
    const suffix = (day % 10 === 1 && day !== 11) ? 'st' :
        (day % 10 === 2 && day !== 12) ? 'nd' :
            (day % 10 === 3 && day !== 13) ? 'rd' : 'th';

    document.getElementById("current-date").innerText = formattedDate.replace(/\d+/, day + suffix);
}

async function fetchWeatherCityOne(lat, lon) {
    
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&temperature_unit=fahrenheit&timezone=auto&forecast_days=1`);
    const data = await response.json();
    
    const now = new Date();
    const currentHour = now.getHours();
    const temperature = data.hourly.temperature_2m[currentHour].toFixed(2);
    
    document.getElementById("temperature-one").innerText = `${temperature} °F`;
}

fetchWeatherCityOne(cityOneLat, cityOneLon);

async function fetchWeatherCityTwo(lat, lon) {
    
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&temperature_unit=fahrenheit&timezone=auto&forecast_days=1`);
    const data = await response.json();
    
    const now = new Date();
    const currentHour = now.getHours();
    const temperature = data.hourly.temperature_2m[currentHour].toFixed(2);
    
    document.getElementById("temperature-two").innerText = `${temperature} °F`;
}

fetchWeatherCityTwo(cityTwoLat, cityTwoLon);

setInterval(displayTime, 1000);
displayTime();
fetchWeatherCityOne(cityOneLat, cityOneLon);
fetchWeatherCityTwo(cityTwoLat, cityTwoLon);