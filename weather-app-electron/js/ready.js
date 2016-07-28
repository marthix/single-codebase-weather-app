//Fetch the API data
function deviceReady(){
  fetch('http://api.openweathermap.org/data/2.5/forecast/daily?id=4259418&cnt=6&APPID=c85f930bc85698958515238c970fbda0')

    //Parse the returned JSON response
    .then(function(response) {
        return response.json()
    })

    //Take the JSON object, and begin creating HTML elements
    .then(function(weather) {
        console.log(weather)
        var city = weather.city.name,
            iconCode = weather.list[0].weather[0].id,
            date = moment().format('MMMM Do [at] h:mm a'),
            currentTemp = toFahrenheit(weather.list[0].temp.day),
            currentCondition = weather.list[0].weather[0].description,
            forecast = weather.list

        document.getElementById('city').innerHTML = city
        document.getElementById('date').innerHTML = date
        document.getElementById('current-temp').innerHTML = currentTemp + '&deg;'
        document.getElementById('current-condition').innerHTML = currentCondition

        for (i = 1; i < forecast.length; i++) {
            var listItem = document.createElement('li'),
                icon = document.createElement('i'),
                temp = document.createElement('h3'),
                listIconCode = weather.list[i].weather[0].id

            if (moment().format('H') >= 18 || moment().format('H') <= 6) {
                icon.className = `owf owf-${listIconCode}-n owf-3x`
                temp.innerHTML = toFahrenheit(forecast[i].temp.night) + '&deg;'
            }
            else {
                icon.className = `owf owf-${listIconCode}-d owf-3x`
                temp.innerHTML = toFahrenheit(forecast[i].temp.day) + '&deg;'
            }

            listItem.appendChild(icon)
            listItem.appendChild(temp)

            document.getElementById('forecast').appendChild(listItem)
        }




        console.log('The city is: ' + city)
        console.log('The icon code is: ' + iconCode)
        console.log('The date is: ' + date)
        console.log('The current temp is: ' + currentTemp + ' degrees Fahrenheit')
        console.log('The current conditions are: ' + currentCondition)
        console.log('The current forecast is: ' + forecast)

        //For each of the results, create a new image from the result object's Image property
        // weather.results.forEach(function(result){
        //
        // })
    })
}

function toFahrenheit(x) {
    return Math.round((1.8 * (x - 273)) + 32)
}
