//global variables
var cityNameLS = []
var listEl = $("#history")
var fiveDayContainer = $("#fiveDay")



// search event listener, grabs user input and sets it as the current city in local storage.
$(".search").click(function (event) {
    var element = event.target
    if (element.matches("button")) {
        var userInput = $(this).children("input").val()
        

        if (!userInput) {
            return
        }
        localStorage.setItem("currentCity", userInput)

        const cityNameStorage = JSON.parse(localStorage.getItem("cityNameLS"))

        if (!cityNameStorage) {
            cityNameLS.push(userInput)

            localStorage.setItem("cityNameLS", JSON.stringify(cityNameLS));
        
        }

        //pushes items to local storage and creates a array of searched citys to be displayed later
        else {

            cityNameStorage.push(userInput)

            localStorage.setItem("cityNameLS", JSON.stringify(cityNameStorage));
        }
        currentWeather()
        logHistory()
        return
    }

})


// grabs current city from local storage and inputs it into an API call that pulls a 1 day forcast. Sends data to currentWeather function. calls on five day weather
function currentWeather() {
    const currentCityLS = localStorage.getItem("currentCity")

    if (currentCityLS) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + currentCityLS + "&units=imperial&appid=c64d9c95aa9e442bc0444f33c92c8506", {

        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
            
                setCurrentWeather(data)
                fiveDayWeather()
            });


    }
}

//updates the main weather card with API data. inputs all data onto the screen
function setCurrentWeather(data) {
    

    var currentDataUnix = data.dt
    var currentDay = moment.unix(currentDataUnix).format("MM/DD/YY")

console.log(data)
    $("#currentSelection").text(data.name + " " + currentDay)
    $("#skyCon").text(data.weather[0].description)
    $("#currentTemp").text(data.main.temp + "f")
    $("#currentWind").text(data.wind.speed + " mph")
    $("#currentHumidity").text(data.main.humidity + "%")
    var weathericon = data.weather[0].icon
    $(".icon").html("<img src=" + weathericon + ">")
}


//creates a histort log on the left of the application
function logHistory() {
    //clears list to be prepared for newly created list
    $('#history').empty();

    const cityHistory = JSON.parse(localStorage.getItem("cityNameLS"));


    if (!cityHistory) {
        return
    }

    else {

        for (var i = 0; i < cityHistory.length; i++) {
            var nameDisplay = cityHistory;



            var listItem = document.createElement("li")
            listItem.setAttribute("class", "historycard")

            var initial = document.createElement("h2")

            initial.innerText = nameDisplay[i]


            listEl.append(listItem)
            listItem.append(initial)

        }

    }
}


//watches for clicks on the history items. If one is selected it overides the "currentCity" local storage and calls to the currentWeather function updating the currently displayed weather to your history item.
$("#history").click(function (event) {
    historyEL = event.target
    if (historyEL.matches("h2")) {
        var historyChoice = historyEL.innerText
        localStorage.setItem("currentCity", historyChoice)
        currentWeather()
    }
}
)



// pulls the current city from local storage and runs an API call to pull forcast information for 5 days
function fiveDayWeather() {
    const currentCityLS = localStorage.getItem("currentCity")
    if (currentCityLS) {
        fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + currentCityLS + "&units=imperial&appid=c64d9c95aa9e442bc0444f33c92c8506", {

        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                setFiveDayWeather(data)
            })
    }
}


//takes the 5 day API data and pulls out 1 forcast from each day. Creates the 5 forcast days with their corisponding date.
function setFiveDayWeather(data) {
    fiveDayContainer.empty()


    for (let i = 3; i < data.list.length; i += 8) {
        var fiveDayDate = data.list[i].dt


        var monthday = moment.unix(fiveDayDate).format("MM/DD")


        var card = document.createElement("div")
        card.setAttribute("class", "col-2 fiveDayCard")

        var fiveDayCardDate = document.createElement("h2")
        fiveDayCardDate.innerText = monthday

        var skyCondition = document.createElement("p")
        skyCondition.innerText = (data.list[i].weather[0].description)

        var fiveDayHigh = document.createElement("p")
        fiveDayHigh.innerText = ("High: " + data.list[i].main.temp_max + "f")

        var fiveDayLow = document.createElement("p")
        fiveDayLow.innerText = ("Low: " + data.list[i].main.temp_min + " f")

        var fiveDayHumidity = document.createElement("p")
        fiveDayHumidity.innerText = ("Humidity: " + data.list[i].main.humidity)



        fiveDayContainer.append(card)
        card.append(fiveDayCardDate)
        card.append(skyCondition)
        card.append(fiveDayHigh)
        card.append(fiveDayLow)
        card.append(fiveDayHumidity)








    }
}

fiveDayWeather()
currentWeather()
logHistory()