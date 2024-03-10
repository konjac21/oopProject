// Required Modules
const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');
const generateOutfitRecommendation = require('./outfit');

// Function to Convert Kelvin to Celsius
function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}

// Function to Convert Timestamp to Date and Time
function convertTimestamp(timestamp){
    var date = new Date(timestamp * 1000);
    return date.toDateString() + ' ' + date.toTimeString();
}

// Function Triggered on Button Click
function buttonClicked() {
    // Get User's Input City
    var searchedData = document.getElementById('city_input').value;

    // Fetch Weather Data from OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchedData}&appid=9fd7a449d055dba26a982a3220f32aa2`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            // Convert Kelvin to Celsius for Temperature Values
            var celsiusTemperature = kelvinToCelsius(data.main.temp);
            var like = kelvinToCelsius(data.main.feels_like);
            var max = kelvinToCelsius(data.main.temp_max);
            var min = kelvinToCelsius(data.main.temp_min);

            // Extract Weather Information from API
            var country = data.sys.country;
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            var desc = data.weather[0].description;
            var pressure = data.main.pressure;
            var humidity = data.main.humidity;
            var wind = data.wind.speed;
            var sunrise = convertTimestamp(data.sys.sunrise);
            var sunset = convertTimestamp(data.sys.sunset);

            // Call the generateOutfitRecommendation function
            const { outfitSuggestion, imageSrc } = generateOutfitRecommendation(data);

            // Display Weather Info, Outfit Suggestion, and Images in HTML
            document.getElementById('weather').innerHTML = `Weather Information`;
            document.getElementById('country').innerHTML = `Country: ${country}`;
            document.getElementById('lat').innerHTML = `Latitude: ${lat}`;
            document.getElementById('lon').innerHTML = `Longitude: ${lon}`;
            document.getElementById('desc').innerHTML = `Weather Description: ${desc}`;
            document.getElementById('temperature').innerHTML = `Current Temperature: ${celsiusTemperature.toFixed(2)} °C`;
            document.getElementById('feel_like').innerHTML = `Feels Like: ${like.toFixed(2)} °C`;
            document.getElementById('pressure').innerHTML = `Atmospheric Pressure: ${pressure} hPa`;
            document.getElementById('max').innerHTML = `Maximum Temperature: ${max.toFixed(2)} °C`;
            document.getElementById('min').innerHTML = `Minimum Temperature: ${min.toFixed(2)} °C`;
            document.getElementById('humidity').innerHTML = `Humidity: ${humidity} %`;
            document.getElementById('wind').innerHTML = `Wind Speed: ${wind} meter/sec`;
            document.getElementById('sunrise').innerHTML = `Sunrise: ${sunrise}`;
            document.getElementById('sunset').innerHTML = `Sunset: ${sunset}`;
            document.getElementById('outfit-suggest').innerHTML = `Outfit Suggestion`;
            document.getElementById('outfit').innerText = outfitSuggestion;

            // Display Outfit Images
            const imageContainer = document.getElementById('outfit-image');
            let imageCount = 0;

            imageSrc.forEach((src, index) => {
                // Create imgElement for each image
                const imgElement = document.createElement('img');
                imgElement.src = `images/${src}`;
                imgElement.alt = 'Outfit Image';
                imgElement.style.width = '250px'; 
                imgElement.style.height = '250px'; 
                imgElement.style.marginRight = '10px';
                imageContainer.appendChild(imgElement);

                // Increment imageCount
                imageCount++;

                // Check if two images have been added, then add a line break
                if (imageCount === 2 && index < imageSrc.length - 1) {
                    const brElement = document.createElement('br');
                    imageContainer.appendChild(brElement);
                    // Reset imageCount for the next set of images
                    imageCount = 0;
                }
            });
        });
}

// DOM Elements for File Operations
var btnCreate = document.getElementById('btnCreate');
var btnRead = document.getElementById('btnRead');
var btnUpdate = document.getElementById('btnUpdate');
var btnDelete = document.getElementById('btnDelete');
var fileName = document.getElementById('fileName');
var fileContents = document.getElementById('fileContents');

// Path for File Operations
let pathName = path.join(__dirname, 'Files');

// Event Listener for Creating Text File
btnCreate.addEventListener('click', function(){
    let file = path.join(pathName, fileName.value);
    let contents = fileContents.value;
    fs.writeFile(file, contents, function(err){
        if(err){
            return console.log(err);
        }
        var txtfile = document.getElementById("fileName").value;
        alert(txtfile + " text file was created");
        console.log("The file was created");
    });
});

// Event Listener for Reading Text File
btnRead.addEventListener('click', function(){
    let file = path.join(pathName, fileName.value);
    fs.readFile(file, function(err, data){
        if(err){
            return console.log(err);
        }
        fileContents.value = data;
        console.log("The file was read!");
    });
});

// Event Listener for Updating Text File
btnUpdate.addEventListener('click', function () {
    let file = path.join(pathName, fileName.value);
    let contents = fileContents.value;
    fs.writeFile(file, contents, function (err) {
        if (err) {
            return console.log(err);
        }
        var txtfile = document.getElementById('fileName').value;
        alert(txtfile + ' text file was updated');
        console.log('The file was updated');
    });
});

// Event Listener for Deleting Text File
btnDelete.addEventListener('click', function(){
    let file = path.join(pathName, fileName.value);
    fs.unlink(file, function(err){
        if(err){
            return console.log(err);
        }
        fileName.value = "";
        fileContents.value = "";
        console.log("The file was deleted!");
    });
});
