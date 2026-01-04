const apiKey = "446f1848e0252d064b4141b48e6013a8";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherSection = document.querySelector(".weather");

async function checkWeather(city) {
    
    // 1. Start Loading Animation
    setLoadingState(true);

    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        // Update Data
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "Km/hr";

        const weatherIcon = document.getElementById("cloud");

        switch (data.weather[0].main) {
            case "Clouds":
                weatherIcon.className = "fa-solid fa-cloud";
                weatherIcon.style.color = "#333";
                break;
            case "Clear":
                weatherIcon.className = "fa-solid fa-sun";
                weatherIcon.style.color = "#facc15";
                break;
            case "Rain":
                weatherIcon.className = "fa-solid fa-cloud-showers-heavy";
                weatherIcon.style.color = "#fff";
                break;
            case "Snow":
                weatherIcon.className = "fa-solid fa-snowflake";
                break;
            case "Thunderstorm":
                weatherIcon.className = "fa-solid fa-bolt";
                break;
            default:
                weatherIcon.className = "fa-solid fa-smog";
        }

        // 2. Data Arrived: Slide Down Animation
        weatherSection.classList.add("active");

    } catch (error) {
        // 3. Error: Slide Up (Close) Animation
        weatherSection.classList.remove("active");
        
        Swal.fire({
            title: 'Error!',
            text: 'City not found or spelling mistake!',
            icon: 'error',
            confirmButtonText: 'Try Again'
        });
    } finally {
        // 4. Stop Loading Animation (runs whether success or fail)
        setLoadingState(false);
    }
}

// Function to handle Button Loading State
function setLoadingState(isLoading) {
    if (isLoading) {
        // Change button content to loader
        searchBtn.innerHTML = '<span class="loader"></span>';
        searchBtn.style.pointerEvents = "none"; // Disable clicks
    } else {
        // Restore original content
        searchBtn.innerHTML = '<span class="btn-text">Search</span> <i class="fa-solid fa-magnifying-glass"></i>';
        searchBtn.style.pointerEvents = "auto"; // Enable clicks
    }
}

searchBtn.addEventListener("click", () => {
    if(searchBox.value.trim() !== "") {
        checkWeather(searchBox.value);
    }
});

// Allow "Enter" key to search as well
searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && searchBox.value.trim() !== "") {
        checkWeather(searchBox.value);
    }
});
