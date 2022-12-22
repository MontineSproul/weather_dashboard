var apiKey = '0dff05e8fe26750242f5de6308aaff1f';
// current weather
//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=0dff05e8fe26750242f5de6308aaff1f
//weather api
//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=0dff05e8fe26750242f5de6308aaff1f
//geo coding api
//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=0dff05e8fe26750242f5de6308aaff1f
//moments/jquery to change the day of the week at the top of the card
// if (day is today) {
//     Today + date
// } else if (date ++) {
//     day of the week and date 
// }
var savedCities = JSON.parse(localStorage.getItem("myCities")) || [];

(function searchHistory() {
    for (i = 0; i < savedCities.length; i++) {
      document.querySelector('.history' + i).innerHTML = savedCities[i];
    }
} ) ();

document.querySelector('.clearHistory').addEventListener('click', function(){
    localStorage.removeItem('myCities');
})
//button for clear storage add event listener localStorage. clear item 
    //reading the localStorage item
    //local storage in search bar
    
    
function searchWeather(event) {
        event.preventDefault()
   
    // use searchCity to put it on the card
    var searchCity = document.getElementById('cityName').value;
    savedCities.push(searchCity);
    localStorage.setItem("myCities", JSON.stringify(savedCities));
    console.log(localStorage);


    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + searchCity + '&units=imperial&appid=0dff05e8fe26750242f5de6308aaff1f')
    .then(function(response){
        // console.log(response)
        return response.json()
    })
    .then(function(data){
        console.log(data)
        
        for (i=2; i <= 6; i++) {

            var day = data.list[(i -2) * 8] ;
       var degrees = document.querySelector('.degrees' + i);
       degrees.innerHTML = day.main.temp;
       var realFeel = document.querySelector('.realFeel' + i);
       realFeel.innerHTML = day.main.feels_like;
       var date = document.querySelector('.date' + i);
       date.innerHTML = day.dt_txt;
       var iconDescription = document.querySelector('.iconDescription' + i);
       iconDescription.src = `http://openweathermap.org/img/w/${day.weather[0].icon}.png`;
       var description = document.querySelector('.description' + i);
         description.innerHTML = day.weather[0].description;
    }
    })
    // another fetch using the same 
// day.main.temp grabbing the items from the obj
//   var degrees1 = document.querySelector('.degrees1');      degrees1.innerHTML = day.main.temp; this is grabbing which element we want to add something on and the second part adds the data into the html
fetch('https://api.openweathermap.org/data/2.5/weather?q=' + searchCity + '&units=imperial&appid=0dff05e8fe26750242f5de6308aaff1f')
.then(function(response){
    // console.log(response)
    return response.json()
})
.then(function(data){
    console.log(data)
    // var condition = data.weather[0];

   var degrees1 = document.querySelector('.degrees1');
    degrees1.innerHTML = data.main.temp;
   var realFeel1 = document.querySelector('.realFeel1');
    realFeel1.innerHTML = data.main.feels_like;
    var description1 = document.querySelector('.description1');
    description1.innerHTML = data.weather[0].description;
    // var date = document.querySelector('.date' + i);
    //    date.innerHTML = day.dt_txt;


})
}


//add event listener for search button 
var searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('submit', searchWeather)
//function that displays the day of the week in the header

//display weather in cards 