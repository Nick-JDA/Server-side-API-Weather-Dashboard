var apiKey = "2cf8696659dd95e4c36499af01e37d9c";
var city = "";
var state = "";
var country = "";
var cityForecastContent = $("city-forecast-content");
// savedCities will either be the localstorage under the key "savedCities", if there is no localStorage, then it will be an empty array
var savedCities = JSON.parse(localStorage.getItem('savedCities')) || [];
// JSON.parse can used for objects OR arrays

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
    var fetchURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

    fetch(fetchURL)
    .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
        return response.json();
})
.then(function(results) {
console.log(results);
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
    // If the target tag that was clicked on is defined as a button, then it will run our api fetch
    if(event.target.localName === 'button') {
        // instead of capturing the input value, we capture the button text
        var value = event.target.textContent;
        searchAPI(value);
    }
  })


displayPastSearches();



//perameters for search query
//   function getParams() {
//     // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
//     var searchParamsArr = document.location.search.split('&');
  
//     // Get the query and format values
//     var query = searchParamsArr[0].split('=').pop();
//     var format = searchParamsArr[1].split('=').pop();
  
//     searchApi(query, format);
//   }