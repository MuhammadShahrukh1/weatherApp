let fetchCityName;
let apiurl = 'https://api.openweathermap.org/data/2.5/weather?';
let apiKey = 'e2cc7bbf49e2a11bae99c925b4f131ac';
//when fetch city name from input field printWeather function runs
function printWeather() {
    fetchCityName = document.getElementById('cityName').value;
    if (fetchCityName.trim() !== '') {
        fetch(`${apiurl}q=${fetchCityName}&appid=${apiKey}&units=metric`)
            .then(data => data.json())
            .then((res) => {
                console.log(res);
                displayData(res);
                document.getElementById('cityName').value = ''
            })
    }
    else {
        swal.fire({
            title: `Enter A City Name`,
            icon: `error`
        })
    }
}
function displayData(data) {
    let cityNamePlace = document.getElementById('printCityName');
    let date = new Date();
    console.log(((date.toDateString()).slice(0.10)))
    document.getElementById('date').innerHTML = ((date.toDateString()).slice(0, 10));
    let weatherImg = document.getElementById('weatherImg');
    let temperature = document.getElementById('temperature');
    let weatherBehaviour = document.getElementById('weatherBehaviour');
    let humidity = document.getElementById('humidity');
    let feelTemp = document.getElementById('feelTemp');
    let wind = document.getElementById('wind');
    if (data.name === undefined) {
        swal.fire({
            title: `Enter A Valid City Name`,
            icon: `error`
        })
        fetchLocation(lat, lon)
    }
    else {
        cityNamePlace.innerHTML = `${data.name}`;
        temperature.innerHTML = `${Math.round(data.main.temp)} °C`;
        weatherBehaviour.innerHTML = `${data.weather[0].main}`;
        humidity.innerHTML = `${data.main.humidity} %`;
        feelTemp.innerHTML = `${data.main.feels_like} °C`;
        wind.innerHTML = `${data.wind.speed} m/s`;
        weatherImg.src = `./assests/${(data.weather[0].main).toLowerCase()}.svg`
        console.log(document.body)
        document.getElementById('body').style.background = "url(`./assests/${(data.weather[0].main).toLowerCase()}.jpg`)";
    }

}
let lat;
let lon;

//when window load first so window take permission to access your location
function onload() {
     document.getElementById('container').style.display = 'none'
    window.navigator.geolocation.getCurrentPosition((data) => {
        console.log(data)
        lat = data.coords.latitude;
        lon = data.coords.longitude
        setTimeout(()=>{
            document.getElementById('container').style.display = 'block'
            fetchLocation(lat, lon);
        },500)
       
    })
}

function fetchLocation(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(data => data.json())
        .then((res) => {
            displayData(res)

        })

}
window.onload = onload()
















// let date = new Date();
// date = date.toDateString();
// console.log(date.slice(0,10))