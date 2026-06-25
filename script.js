const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const city = document.getElementById("city");
const temperature = document.getElementById("temperature");
const wind = document.getElementById("wind");
const weather = document.getElementById("weather");

searchBtn.addEventListener("click", getWeather);

async function getWeather() {

    const cityName = cityInput.value;

    if(cityName===""){

        alert("Please enter a city");

        return;

    }

    try{

        // Step 1 : Get Latitude and Longitude

        const geoResponse = await fetch(

`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`

        );

        const geoData = await geoResponse.json();

        if(!geoData.results){

            alert("City not found");

            return;

        }

        const latitude = geoData.results[0].latitude;

        const longitude = geoData.results[0].longitude;

        // Step 2 : Get Weather

        const weatherResponse = await fetch(

`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weather_code`

        );

        const weatherData = await weatherResponse.json();

        city.textContent = geoData.results[0].name;

        temperature.textContent =
        "🌡 Temperature : "
        + weatherData.current.temperature_2m
        + " °C";

        wind.textContent =
        "🌬 Wind Speed : "
        + weatherData.current.wind_speed_10m
        + " km/h";

        weather.textContent =
        "Weather Code : "
        + weatherData.current.weather_code;

    }

    catch(error){

        console.log(error);

        alert("Something went wrong");

    }

}