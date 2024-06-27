import { RemoveModal, ShowModal } from "./modal.js"
import { CurrentWeather } from "./utils/ReqAPi.js"


const searchButton = document.getElementById("searchBtn")
const cityNameInput = document.querySelector('input')
const parentCurrentWeather = document.querySelector('.currentWeather')
const parentForcastWeather = document.querySelector('.forcastboxes')
const locatoinIcon = document.querySelector('.locatoinIcon')
const closeModalBtn = document.getElementById("closeModal")


const day = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',

]


const WeatherByname = async name => {
    const currentWeather = await CurrentWeather(name, status = 'current')
    renderEL(currentWeather)

    const ForcastWeather = await CurrentWeather(name, status = 'forcast')
    if (!ForcastWeather) return

    const forcastData = ForcastWeather.list.filter(item => item.dt_txt.endsWith('12:00:00'))
    renderForcastEL(forcastData)
}
const SerachHandlerbyName = async () => {
    if (!cityNameInput.value) {
        ShowModal("enter city name")
        return
    }

    WeatherByname(cityNameInput.value)
}


const errorHandler = () => {

}

const showPosition = async position => {
    const { latitude, longitude } = position.coords
    const currentWeather = await CurrentWeather(cityNameInput.value, status = 'current', position.coords)
    renderEL(currentWeather)

    const ForcastWeather = await CurrentWeather(cityNameInput.value, status = 'forcast', position.coords)
    const forcastData = ForcastWeather.list.filter(item => item.dt_txt.endsWith('12:00:00'))
    renderForcastEL(forcastData)
}

const SerachHandlerbyLocation = async () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, errorHandler);
    } else {
        ShowModal("Geolocation is not supported by this browser.");
    }

}


const renderEL = (currentWeather) => {
    if (currentWeather) {


        const CurrentWeatherEl = `  
        <div class="boxCurrentWeather">
            <div class="city">
                <span >${currentWeather.name},${currentWeather.sys.country}</span>
            </div>
            <div class="detail">
                <img src=https://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png alt="WeatherIcon"/>
                <span >${currentWeather.weather[0].main}</span>
                <span>${currentWeather.main.temp} °C</span>
            </div>

            <div class="detail">
                <span >humidity :${currentWeather.main.humidity} %</span>
                <span>wind spped :${currentWeather.wind.speed} m/s</span>
            </div>
        </div>
        `

        parentCurrentWeather.innerHTML = CurrentWeatherEl



    }
}


const getDay = (data) => {
    return day[new Date(data.dt * 1000).getDay()]
}
const renderForcastEL = (forcastWeather) => {
    if (forcastWeather) {
        parentForcastWeather.innerHTML = ''
        forcastWeather.map((item) => {
            const day = getDay(item)
            const forcastWeatherEl = `  

            <div class="box">
            <div >${day}</div>
                <img src=https://openweathermap.org/img/w/${item.weather[0].icon}.png alt="WeatherIcon"/>
                <div >${item.weather[0].main}</div>
                <div>${item.main.temp} °C</div>
                <div >humidity :${item.main.humidity} %</div>
                <div>wind spped :${item.wind.speed} m/s</div>
            </div>
            `

            parentForcastWeather.innerHTML += forcastWeatherEl

        })



    }
}

searchButton.addEventListener("click", SerachHandlerbyName)
locatoinIcon.addEventListener("click", SerachHandlerbyLocation)
closeModalBtn.addEventListener("click", RemoveModal)

document.addEventListener("DOMContentLoaded",()=>WeatherByname('esfahan'))



