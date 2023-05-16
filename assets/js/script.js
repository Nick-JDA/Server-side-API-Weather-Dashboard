var apiKey = "2cf8696659dd95e4c36499af01e37d9c";
var cityForecastContent = $("#city-forecast-content");
var cityName = $('.location-city');
// savedCities will either be the localstorage under the key "savedCities", if there is no localStorage, then it will be an empty array
var savedCities = JSON.parse(localStorage.getItem('savedCities')) || [];
// JSON.parse can used for objects OR arrays
var fiveDayCast = $('#5dayCast');
var weatherCont = $('#wehtercontainer');

//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

//take searched for city name and save it to local storage
    //display city name and date on results section
    //return relevent weather data
        //current temp, wind, and humidity of city data
            //5-day forecast
                //each day has date, temp, wind, and humidity data
    //upon search, button with city name is saved below search bar
        //when button is clicked, return that cities weather results

function searchAPI(query) {
    var fetchURL = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${apiKey}`;

    fetch(fetchURL)
        .then(function (response) {
            if (!response.ok) {
              throw response.json();
            }
            return response.json();
})
.then(function(results) {
    console.log(results);
    // Capture lat and lon and save it to a variable, build a second function to fetch the actual weather data
    secondSearchAPI(results[0].lat, results[0].lon);
})
.catch(function (error) {
    console.error(error);
})
};

function secondSearchAPI(lat, lon) {
    var fetchURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    fetch(fetchURL)
    .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
        return response.json();
})
.then(function(results) {
console.log(results);
displayWeatherContent(results);
// Create and append the daily forecast and the five day forecast
})
.catch(function (error) {
console.error(error);
})
}

function displayPastSearches() {
    $('#past-searches').empty();
    savedCities.forEach(city => {
        $('#past-searches').append($('<button></button>').text(city).addClass('btn btn-info btn-block w-100 pastSearch'));
    })
};

//saving and displaying local storage jquery
$('.searchBtn').on('click', function(event) {
    event.preventDefault();
    // console.log($(this).siblings('#search-input').val())
    // var key = $(this).siblings('#past-search')
    var value = $(this).siblings('#search-input').val()
    if(value !== "") {
        savedCities = savedCities.filter(city => city != value);
        savedCities.push(value);
        localStorage.setItem('savedCities', JSON.stringify(savedCities));
    }
    displayPastSearches();
    searchAPI(value);
  });

// $('.pastSearch').each(function(button) {
//     button.on('click', function(event) {
//     // $(this).on('click', function(event) {
//         event.preventDefault();
//         var value = $(this).text();
//         searchAPI(value);
//     })
//   })

  $('#past-searches').on('click', function(event) {
    // Added eventlistner to the div
    console.log(event);
    // If the target tag that was clicked on is defined as a button, then it will run api fetch
    if(event.target.localName === 'button') {
        // instead of capturing the input value, we capture the button text
        var value = event.target.textContent;
        searchAPI(value);
    }
  })


displayPastSearches();

function displayWeatherContent(values) {
    
    var currentTime = values.list[0].dt_txt;
    var todayDate = dayjs(currentTime).format('MM/DD/YYYY');
    var h4El1 = $('<h4></h4>').text('Temp: ' + values.list[0].main.temp + "°C");
    var h4El2 = $('<h4></h4>').text('Wind: ' + values.list[0].wind.speed);
    var h4El3 = $('<h4></h4>').text('Humidity: ' + values.list[0].main.humidity);
    cityForecastContent.append(h4El1, h4El2, h4El3);
    cityName.text(values.city.name + " " + todayDate);

    
    
    for (var index  = 7; index < values.list.length; index+=8) {
        var Thyme = values.list[index].dt_txt;
        var Date = dayjs(Thyme).format('MM/DD/YYYY');
        var divMain = $('<div></div>');
        var theDate = $('<h4></h4>').text(Date);
        var pEl1 = $('<p></p>').text('Temp: ' + values.list[index].main.temp);
        var pEl2 = $('<p></p>').text('Wind: ' + values.list[index].wind.speed);
        var pEl3 = $('<p></p>').text('Humidity: ' + values.list[index].main.humidity);
        fiveDayCast.append(divMain);
        divMain.append(theDate, pEl1, pEl2, pEl3);
    }
}


//perameters for search query
//   function getParams() {
//     // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
//     var searchParamsArr = document.location.search.split('&');
  
//     // Get the query and format values
//     var query = searchParamsArr[0].split('=').pop();
//     var format = searchParamsArr[1].split('=').pop();
  
//     searchApi(query, format);
//   }
