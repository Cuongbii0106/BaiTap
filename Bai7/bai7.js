const apiKey = "34f3c5d438a823eec00a0addb01751c1";

const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")
const favoriteBtn = document.getElementById("add-favorite")
const favoriteList = document.getElementById("favorite-list")

async function checkWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    const response = await fetch(apiUrl);  
    if (response.status == 404) {           
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    } else {
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C"
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%"
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h"

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png"
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png"
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png"
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png"
        }

        document.querySelector(".weather").style.display = "block"
        document.querySelector(".error").style.display = "none"
    }
}


searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

favoriteBtn.addEventListener("click", () => {
    const city = document.querySelector(".city").innerText;
    if (!city) return;

    let favorites = JSON.parse(localStorage.getItem("favorites")) || []
    if (!favorites.includes(city)) {
        favorites.push(city);
        localStorage.setItem("favorites", JSON.stringify(favorites))
        renderFavorites();
    }
});


function renderFavorites() {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || []
    favoriteList.innerHTML = ""
    favorites.forEach(city => {
        const li = document.createElement("li");
        li.innerText = city;
        li.addEventListener("click", () => {
            checkWeather(city);
        });
        favoriteList.appendChild(li);
    });
}


renderFavorites();

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
function renderFavorites() {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favoriteList.innerHTML = "";
    favorites.forEach(city => {
        const li = document.createElement("li");
        li.innerText = city;

        
        li.addEventListener("click", () => {
            checkWeather(city);
        });

        
        const delBtn = document.createElement("button");
        delBtn.innerText = "X";
        delBtn.addEventListener("click", (e) => {
            e.stopPropagation(); 
            favorites = favorites.filter(c => c !== city);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            renderFavorites();
        });

        li.appendChild(delBtn);
        favoriteList.appendChild(li);
    });
}
