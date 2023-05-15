var APIKey = "2cf8696659dd95e4c36499af01e37d9c";
var city = "";
var state = "";
var country = "";
var cityForecastContent = $("city-forecast-content");

//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}


//take searched for city name and save it to local storage
    //display city name and date on results section
    //return relevent weather data
        //current temp, wind, and humidity of city data
            //5-day forecast
                //each day has date, temp, wind, and humidity data
    //upon search, button with city name is saved below search bar
        //when button is clicked, return that cities weather results

// function searchAPI() {

// }

//saving and displaying local storage jquery
$('.searchBtn').on('click', function() {
    console.log($(this).siblings('#search-input').val())
    var key = $(this).siblings('#past-search')
    var value = $(this).siblings('#search-input').val()
    localStorage.setItem(key, value);
  })

$('.searchBtn').each(function() {
    var searchHist = $(this).attr('id');
    $(this).siblings('button').val(localStorage.getItem(searchHist));
  })



//perameters for search query
//   function getParams() {
//     // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
//     var searchParamsArr = document.location.search.split('&');
  
//     // Get the query and format values
//     var query = searchParamsArr[0].split('=').pop();
//     var format = searchParamsArr[1].split('=').pop();
  
//     searchApi(query, format);
//   }