const apiKey = "446f1848e0252d064b4141b48e6013a8";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherSection = document.querySelector(".weather");

async function checkWeather(city) {
    
    // Start Loading
    setLoadingState(true);

    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        // Update UI
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h";

        const weatherIcon = document.getElementById("cloud");
        updateWeatherIcon(data.weather[0].main, weatherIcon);

        // Slide Down
        weatherSection.classList.add("active");

    } catch (error) {
        // Slide Up (Hide)
        weatherSection.classList.remove("active");
        
        // SweetAlert Configuration for "Stack" look
        Swal.fire({
            title: 'Oops!',
            text: 'City not found. Please check the spelling.',
            icon: 'error',
            confirmButtonText: 'Okay',
            background: '#fff',
            confirmButtonColor: '#333',
            // IMPORTANT: Prevents layout shifting/jumping
            heightAuto: false, 
            customClass: {
                popup: 'my-swal-stack'
            }
        });
    } finally {
        setLoadingState(false);
    }
}

function updateWeatherIcon(weatherCondition, iconElement) {
    // Reset styles
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
            iconElement.style.color = "#ccc";
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
        searchBtn.style.opacity = "0.8";
        searchBtn.style.pointerEvents = "none";
    } else {
        searchBtn.innerHTML = '<span class="btn-text">Search Weather</span> <i class="fa-solid fa-magnifying-glass"></i>';
        searchBtn.style.opacity = "1";
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
        // Helps close mobile keyboard
        searchBox.blur(); 
    }
});
