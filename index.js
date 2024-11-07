// DATA -------------------------------

const linksData = [
    {
        "folder": "office",
        "links": [
            {
                "name": "My Mail",
                "url": "https://mail.google.com/mail/"
            },
            {
                "name": "WhatsApp",
                "url": "https://web.whatsapp.com"
            },
            {
                "name": "Calendar",
                "url": "https://calendar.google.com/calendar/"
            }
        ]
    },
    {
        "folder": "work",
        "links": [
            {
                "name": "Leetcode",
                "url": "https://leetcode.com/"
            },
            {
                "name": "ChatGPT",
                "url": "https://chat.openai.com/"
            },
            {
                "name": "Google Docs",
                "url": "https://docs.google.com/document/"
            }
        ]
    },
    {
        "folder": "relax",
        "links": [
            {
                "name": "YouTube",
                "url": "https://www.youtube.com"
            },
            {
                "name": "YT Music",
                "url": "https://music.youtube.com/"
            },
            {
                "name": "Spotify",
                "url": "https://open.spotify.com/"
            }
        ]
    }
];

const cities = [
    {
        "name": "Tempe",
        "lat": 33.3898,
        "lon": -111.9344
    },
    {
        "name": "Mysore",
        "lat": 12.2921,
        "lon": 76.6153
    },
    {
        "name": "Trichy",
        "lat": 10.7753, 
        "lon": 78.7706
    }
];

// -------------------------------------

function displayTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12;
    hours = hours.toString().padStart(2, '0');

    document.getElementById("current-time").innerText = `${hours}:${minutes} ${ampm}`;
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

async function loadLinks() {
    const linkContainer = document.getElementById("links-section");

    linksData.forEach(item => {
        const newDiv = document.createElement("div");
        newDiv.id = "links";
        item.links.forEach(link => {
            const aTag = document.createElement('a');
            aTag.href = link.url;
            aTag.textContent = link.name;
            newDiv.appendChild(aTag);
        });
        linkContainer.appendChild(newDiv);
    });
}

class WeatherInfo {
    constructor(city, lat, lon, num) {
        this.city = city;
        this.lat = lat;
        this.lon = lon;
        this.num = num;
    }
    async fetchCurrentWeather() {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${this.lat}&longitude=${this.lon}&hourly=temperature_2m&temperature_unit=fahrenheit&timezone=auto&forecast_days=1`);
        const data = await response.json();

        const now = new Date();
        const currentHour = now.getHours();
        const temperature = data.hourly.temperature_2m[currentHour].toFixed(2);
        const tempInC = ((temperature - 32) * 5 / 9).toFixed(2);

        return [temperature, tempInC];
    }
}

async function displayWeather() {
    const weather_div = document.getElementById("weather");
    for (const city of cities) {
        const weather_info_of_city = new WeatherInfo(city.name, city.lat, city.lon);
        const current_city_weather = await weather_info_of_city.fetchCurrentWeather();
        const newDiv = document.createElement("div");
        newDiv.className = "city-temp";
        newDiv.innerText = `${city.name}: ${current_city_weather[0]} °F / ${current_city_weather[1]} °C`;
        weather_div.appendChild(newDiv);
    };
}

setInterval(displayTime, 1000);
displayDate();
displayWeather();
loadLinks();