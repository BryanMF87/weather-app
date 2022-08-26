
let weatherAPI = 'a9abcd8e70f23b882cd63a0bd29bb182';
let searchInput = document.getElementById('search');
const weatherDisplay = document.getElementById('weatherdisplay');

fetch(`https://api.openweathermap.org/data/2.5/weather?q=london&appid=${weatherAPI}&units=imperial`, {mode: 'cors'})
    .then(response => response.json())
    .then(data => {
        const { main, name, sys, weather } = data;
        const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;

        const markup = 
            `<div id="cityname">${name}, ${sys.country}</div>
            <div id="citytemp">${Math.round(main.temp)}<sup>°F</sup></div>
            <img class="cityicon" src=${icon} alt=${weather[0]["main"]}>
            <div id="conditions">${weather[0]["description"]}</div>`  
        ;
    weatherDisplay.innerHTML = markup;
    document.body.style.background = "url('https://source.unsplash.com/1600x900/?london')";

    })
.catch(() => {
    console.log('Could not find weather for that location. Please try again.')
});

searchInput.addEventListener('keydown', event => {
    if (event.keyCode === 13) {
        event.preventDefault;
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${weatherAPI}&units=imperial`, {mode: 'cors'})
            .then(response => response.json())
            .then(data => {
                const { main, name, sys, weather } = data;
                const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
                
                const markup = 
                    `<div id="cityname">${name}, ${sys.country}</div>
                    <div id="citytemp">${Math.round(main.temp)}<sup>°F</sup></div>
                    <img class="cityicon" src=${icon} alt=${weather[0]["main"]}>
                    <div id="conditions">${weather[0]["description"]}</div>`
                ;
                weatherDisplay.innerHTML = markup;
                document.body.style.background = `url('https://source.unsplash.com/1600x900/? + ${name} + ')`;
            })
        .catch(() => {
            alert('Could not find weather for that location. Please try again.')
        });
    };
});   
