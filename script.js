const apiKey = "446f1848e0252d064b4141b48e6013a8";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.getElementById("cloud");
        
async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await response.json();
    } catch (error) {
        alert("This city ain't exists! or probabily spell mistake!")
        return;
    }
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
   
    document.querySelector(".weather").style.display = "block";
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})
        
