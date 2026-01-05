const apiKey = "446f1848e0252d064b4141b48e6013a8"; // used because there is not debit or credit card linked to it (not a good idea though)
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherSection = document.querySelector(".weather");

async function checkWeather(city) {
    
    // 1. Reset: Hide previous data immediately to start "Fade Out"
    weatherSection.classList.remove("active");
    
    // 2. Show Loading Spinner
    setLoadingState(true);

    try {
        // Add a tiny delay so the fade-out animation is noticeable before the fetch finishes (optional but looks smoother)
        await new Promise(r => setTimeout(r, 300));

        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        // 3. Update DOM Elements
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " KM/H"; 

        const weatherIcon = document.getElementById("cloud");
        updateWeatherIcon(data.weather[0].main, weatherIcon);

        // 4. Success: Slide Down and Fade In new data
        weatherSection.classList.add("active");

    } catch (error) {
        // 5. Error: Keep hidden and show Alert
        weatherSection.classList.remove("active");
        
        Swal.fire({
            title: 'OOPS!',
            text: 'City not found or spelling mistake.',
            icon: 'error',
            confirmButtonText: 'OKAY',
            background: '#fff',
            confirmButtonColor: '#333',
            heightAuto: false 
        });
    } finally {
        setLoadingState(false);
    }
}

function updateWeatherIcon(weatherCondition, iconElement) {
    iconElement.style.color = ""; 
    
    switch (weatherCondition) {
        case "Clouds":
            iconElement.className = "fa-solid fa-cloud";
            iconElement.style.color = "#555";
            break;
        case "Clear":
            iconElement.className = "fa-solid fa-sun";
            iconElement.style.color = "#FFD700";
            break;
        case "Rain":
        case "Drizzle":
            iconElement.className = "fa-solid fa-cloud-rain";
            iconElement.style.color = "#fff";
            break;
        case "Mist":
        case "Haze":
        case "Fog":
            iconElement.className = "fa-solid fa-smog";
            iconElement.style.color = "#eee";
            break;
        case "Snow":
            iconElement.className = "fa-solid fa-snowflake";
            iconElement.style.color = "#fff";
            break;
        case "Thunderstorm":
            iconElement.className = "fa-solid fa-bolt";
            iconElement.style.color = "#FFD700";
            break;
        default:
            iconElement.className = "fa-solid fa-cloud-sun";
    }
}

function setLoadingState(isLoading) {
    if (isLoading) {
        searchBtn.innerHTML = '<span class="loader"></span>';
        searchBtn.style.pointerEvents = "none";
    } else {
        searchBtn.innerHTML = '<span class="btn-text">Search</span> <i class="fa-solid fa-magnifying-glass"></i>';
        searchBtn.style.pointerEvents = "auto";
    }
}

searchBtn.addEventListener("click", () => {
    if(searchBox.value.trim() !== "") {
        checkWeather(searchBox.value);
    }
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && searchBox.value.trim() !== "") {
        checkWeather(searchBox.value);
        searchBox.blur(); 
    }
});
