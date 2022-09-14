//global variables
var cityNameLS = []
var listEl = $("#history")
var fiveDayContainer = $("#fiveDay")
var uvCard =$("#uvCard")
var recProtection =$("#protections")



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
                uvIndex(data)
                fiveDayWeather()
            });


    }
}

function uvIndex(data){
    var lat = data.coord.lat
    var lon = data.coord.lon

    console.log (lat, lon)
    fetch("https://api.openweathermap.org/data/2.5/uvi?appid=c64d9c95aa9e442bc0444f33c92c8506&lat="+lat+"&lon="+lon, {

        })
            .then(function (response) {
                return response.json();
            })
            .then(function (uvData) {
                uvDataCardCreation(uvData)
            });

}

//updates the main weather card with API data. inputs all data onto the screen
function setCurrentWeather(data) {
    
    var currentDataUnix = data.dt
    var currentDay = moment.unix(currentDataUnix).format("MM/DD/YY")

    
    $("#currentSelection").text(data.name + " " + currentDay)
    $("#skyCon").text(data.weather[0].description)
    $("#currentWind").text(data.wind.speed + " mph")
    $("#currentTemp").text(data.main.temp + "f")
    $("#currentHumidity").text(data.main.humidity + "%")
    var weatherIcon = data.weather[0].icon
    var iconurl = "http://openweathermap.org/img/w/" + weatherIcon + ".png"
    $('#wicon').attr('src', iconurl)
}


//creates the UV index information and appends the items to the page. Presets for every index value provide recommended coverage and a brief description of how to protect yourself.
function uvDataCardCreation(uvData){
    uvCard.empty()
    recProtection.empty()

    var uvValue = uvData.value
    const uvContainer = $("#uvContainer")
    if (uvValue <= 2) {

        uvContainer.addClass("uvIndexCard uvIndexLow")
        var uvInteger = document.createElement("h1")
        uvInteger.innerText = "UV Index "+uvValue+" Low"
        var uvInfo = document.createElement("p")
        uvInfo.innerText = "minimal danger from the sun’s UV rays for the average person. Most people can stay in the sun for up to one hour during peak sun (10 am to 4 pm) without burning. However, people with very sensitive skin and infants should always be protected from prolonged sun exposure."
        uvCard.append(uvInteger)
        uvCard.append(uvInfo)

        var sunscreen = document.createElement("div")
        sunscreen.setAttribute("class", "protectionItems")

        var sunscreenEmoji = document.createElement("h2")
        sunscreenEmoji.innerText = "🧴"

        var sunscreenText = document.createElement("p")
        sunscreenText.innerText = "Sunscreen"

        var sunGlasses = document.createElement("div")
        sunGlasses.setAttribute("class", "protectionItems")

        var sunGlassesEmoji = document.createElement("h2")
        sunGlassesEmoji.innerText = "🕶"

        var sunGlassesText = document.createElement("p")
        sunGlassesText = "Sunglasses"

        var hat = document.createElement("div")
        hat.setAttribute("class", "protectionItems")

        var hatEmoji = document.createElement("h2")
        hatEmoji.innerText = "👒"

        var hatText = document.createElement("p")
        hatText.innerText = "Hat"

        var clothing = document.createElement("div")
        clothing.setAttribute("class", "protectionItems")

        var clothingEmoji = document.createElement("h2")
        clothingEmoji.innerText = "👚"

        var clothingText = document.createElement("p")
        clothingText.innerText = "Protective Clothing"

        
        recProtection.append(sunscreen)
        sunscreen.append(sunscreenEmoji)
        sunscreen.append(sunscreenText)
        recProtection.append(sunGlasses)
        sunGlasses.append(sunGlassesEmoji)
        sunGlasses.append(sunGlassesText)
        recProtection.append(hat)
        hat.append(hatEmoji)
        hat.append(hatText)
        recProtection.append(clothing)
        clothing.append(clothingEmoji)
        clothing.append(clothingText)
    }

    else if (uvValue > 2 && uvValue <6){
        uvContainer.addClass("uvIndexCard uvIndexMod")
        var uvInteger = document.createElement("h1")
        uvInteger.innerText = "UV Index "+uvValue+" Moderate"
        var uvInfo = document.createElement("p")
        uvInfo.innerText = "low risk of harm from unprotected sun exposure. Fair-skinned people, however, may burn in less than 20 minutes. Wearing a hat with a wide brim and sunglasses will protect your eyes. Always use a broad-spectrum sunscreen with an SPF of at least 30, and wear long-sleeved shirts when outdoors."
        uvCard.append(uvInteger)
        uvCard.append(uvInfo)

        var sunscreen = document.createElement("div")
        sunscreen.setAttribute("class", "protectionItems")

        var sunscreenEmoji = document.createElement("h2")
        sunscreenEmoji.innerText = "🧴"

        var sunscreenText = document.createElement("p")
        sunscreenText.innerText = "Sunscreen"

        var sunGlasses = document.createElement("div")
        sunGlasses.setAttribute("class", "protectionItems")

        var sunGlassesEmoji = document.createElement("h2")
        sunGlassesEmoji.innerText = "🕶"

        var sunGlassesText = document.createElement("p")
        sunGlassesText = "Sunglasses"

        var hat = document.createElement("div")
        hat.setAttribute("class", "protectionItems")

        var hatEmoji = document.createElement("h2")
        hatEmoji.innerText = "👒"

        var hatText = document.createElement("p")
        hatText.innerText = "Hat"

        var clothing = document.createElement("div")
        clothing.setAttribute("class", "protectionItems")

        var clothingEmoji = document.createElement("h2")
        clothingEmoji.innerText = "👚"

        var clothingText = document.createElement("p")
        clothingText.innerText = "Protective Clothing"
        
        var shade = document.createElement("div")
        shade.setAttribute("class", "protectionItems")

        var shadeEmoji = document.createElement("h2")
        shadeEmoji.innerText = "🌳"

        var shadeText = document.createElement("p")
        shadeText.innerText = "Stay in shade near midday"

        
        recProtection.append(sunscreen)
        sunscreen.append(sunscreenEmoji)
        sunscreen.append(sunscreenText)
        recProtection.append(sunGlasses)
        sunGlasses.append(sunGlassesEmoji)
        sunGlasses.append(sunGlassesText)
        recProtection.append(hat)
        hat.append(hatEmoji)
        hat.append(hatText)
        recProtection.append(clothing)
        clothing.append(clothingEmoji)
        clothing.append(clothingText)
        recProtection.append(shade)
        shade.append(shadeEmoji)
        shade.append(shadeText)
    }
    
    else if (uvValue > 5 && uvValue <8){
        uvContainer.addClass("uvIndexCard uvIndexHigh")
        var uvInteger = document.createElement("h1")
        uvInteger.innerText = "UV Index "+uvValue+" High"
        var uvInfo = document.createElement("p")
        uvInfo.innerText = "moderate risk of harm from unprotected sun exposure. Fair-skinned people, however, may burn in less than 20 minutes. Wearing a hat with a wide brim and sunglasses will protect your eyes. Always use a broad-spectrum sunscreen with an SPF of at least 30 and wear long-sleeved shirts when outdoors. Remember to protect sensitive areas like the nose and the rims of the ears. Sunscreen prevents sunburn and some of the sun’s damaging effects on the immune system. Use a lip balm or lip cream containing a sunscreen."
        uvCard.append(uvInteger)
        uvCard.append(uvInfo)

        var sunscreen = document.createElement("div")
        sunscreen.setAttribute("class", "protectionItems")

        var sunscreenEmoji = document.createElement("h2")
        sunscreenEmoji.innerText = "🧴"

        var sunscreenText = document.createElement("p")
        sunscreenText.innerText = "Sunscreen"

        var sunGlasses = document.createElement("div")
        sunGlasses.setAttribute("class", "protectionItems")

        var sunGlassesEmoji = document.createElement("h2")
        sunGlassesEmoji.innerText = "🕶"

        var sunGlassesText = document.createElement("p")
        sunGlassesText = "Sunglasses"

        var hat = document.createElement("div")
        hat.setAttribute("class", "protectionItems")

        var hatEmoji = document.createElement("h2")
        hatEmoji.innerText = "👒"

        var hatText = document.createElement("p")
        hatText.innerText = "Hat"

        var clothing = document.createElement("div")
        clothing.setAttribute("class", "protectionItems")

        var clothingEmoji = document.createElement("h2")
        clothingEmoji.innerText = "👚"

        var clothingText = document.createElement("p")
        clothingText.innerText = "Protective Clothing"
        
        var shade = document.createElement("div")
        shade.setAttribute("class", "protectionItems")

        var shadeEmoji = document.createElement("h2")
        shadeEmoji.innerText = "🌳"

        var shadeText = document.createElement("p")
        shadeText.innerText = "Stay in shade near midday"

        var avoidSun = document.createElement("div")
        avoidSun.setAttribute("class", "protectionItems")

        var avoidSunEmoji = document.createElement("h2")
        avoidSunEmoji.innerText = "⛱️"

        var avoidSunText = document.createElement("p")
        avoidSunText.innerText = "Reduce time in the sun"

        
        recProtection.append(sunscreen)
        sunscreen.append(sunscreenEmoji)
        sunscreen.append(sunscreenText)
        recProtection.append(sunGlasses)
        sunGlasses.append(sunGlassesEmoji)
        sunGlasses.append(sunGlassesText)
        recProtection.append(hat)
        hat.append(hatEmoji)
        hat.append(hatText)
        recProtection.append(clothing)
        clothing.append(clothingEmoji)
        clothing.append(clothingText)
        recProtection.append(shade)
        shade.append(shadeEmoji)
        shade.append(shadeText)
        recProtection.append(avoidSun)
        avoidSun.append(avoidSunEmoji)
        avoidSun.append(avoidSunText)
    }
    else if (uvValue > 7 && uvValue <11){
        uvContainer.addClass("uvIndexCard uvIndexXhigh")
        var uvInteger = document.createElement("h1")
        uvInteger.innerText = "UV Index "+uvValue+" Very High"
        var uvInfo = document.createElement("p")
        uvInfo.innerText = "high risk of harm from unprotected sun exposure. Fair-skinned people may burn in less than 10 minutes. Minimize sun exposure during midday hours of 10 am to 4 pm. Protect yourself by liberally applying a broad-spectrum sunscreen of at least SPF 30. Wear protective clothing and sunglasses to protect the eyes. When outside, seek shade. Don’t forget that water, sand, pavement, and glass reflect UV rays even under a tree, near a building or beneath a shady umbrella. Wear long-sleeved shirts and trousers made from tightly-woven fabrics. UV rays can pass through the holes and spaces of loosely knit fabrics."
        uvCard.append(uvInteger)
        uvCard.append(uvInfo)

        var sunscreen = document.createElement("div")
        sunscreen.setAttribute("class", "protectionItems")

        var sunscreenEmoji = document.createElement("h2")
        sunscreenEmoji.innerText = "🧴"

        var sunscreenText = document.createElement("p")
        sunscreenText.innerText = "Sunscreen"

        var sunGlasses = document.createElement("div")
        sunGlasses.setAttribute("class", "protectionItems")

        var sunGlassesEmoji = document.createElement("h2")
        sunGlassesEmoji.innerText = "🕶"

        var sunGlassesText = document.createElement("p")
        sunGlassesText = "Sunglasses"

        var hat = document.createElement("div")
        hat.setAttribute("class", "protectionItems")

        var hatEmoji = document.createElement("h2")
        hatEmoji.innerText = "👒"

        var hatText = document.createElement("p")
        hatText.innerText = "Hat"

        var clothing = document.createElement("div")
        clothing.setAttribute("class", "protectionItems")

        var clothingEmoji = document.createElement("h2")
        clothingEmoji.innerText = "👚"

        var clothingText = document.createElement("p")
        clothingText.innerText = "Protective Clothing"
        
        var shade = document.createElement("div")
        shade.setAttribute("class", "protectionItems")

        var shadeEmoji = document.createElement("h2")
        shadeEmoji.innerText = "🌳"

        var shadeText = document.createElement("p")
        shadeText.innerText = "Stay in shade near midday"

        var avoidSun = document.createElement("div")
        avoidSun.setAttribute("class", "protectionItems")

        var avoidSunEmoji = document.createElement("h2")
        avoidSunEmoji.innerText = "⛱️"

        var avoidSunText = document.createElement("p")
        avoidSunText.innerText = "Reduce time in the sun"

        var indoors = document.createElement("div")
        indoors.setAttribute("class", "protectionItems")

        var indoorsEmoji = document.createElement("h2")
        indoorsEmoji.innerText = "🏠"

        var indoorsText = document.createElement("p")
        indoorsText.innerText = "Avoid the sun between 10am-2pm"

        
        recProtection.append(sunscreen)
        sunscreen.append(sunscreenEmoji)
        sunscreen.append(sunscreenText)
        recProtection.append(sunGlasses)
        sunGlasses.append(sunGlassesEmoji)
        sunGlasses.append(sunGlassesText)
        recProtection.append(hat)
        hat.append(hatEmoji)
        hat.append(hatText)
        recProtection.append(clothing)
        clothing.append(clothingEmoji)
        clothing.append(clothingText)
        recProtection.append(shade)
        shade.append(shadeEmoji)
        shade.append(shadeText)
        recProtection.append(avoidSun)
        avoidSun.append(avoidSunEmoji)
        avoidSun.append(avoidSunText)
        recProtection.append(indoors)
        indoors.append(indoorsEmoji)
        indoors.append(indoorsText)

    }
    else if (uvValue >= 11){
        uvContainer.addClass("uvIndexCard uvIndexExt")
        var uvInteger = document.createElement("h1")
        uvInteger.innerText = "UV Index "+uvValue+" Extreme"
        var uvInfo = document.createElement("p")
        uvInfo.innerText = "a very high risk of harm from unprotected sun exposure. Fair skinned people may burn in less than 5 minutes. Outdoor workers and vacationers who can receive very intense sun exposure are especially at risk. Minimize sun exposure during midday hours of 10 am to 4 pm. Apply broad-spectrum SPF 30+ sunscreen every 2 hours, more frequently if you are sweating or swimming. Avoid being in the sun as much as possible and wear sunglasses that block out 99-100% of all UV rays (UVA and UVB). Wear a hat with a wide brim which will block roughly 50% of UV radiation from reaching the eyes"
        uvCard.append(uvInteger)
        uvCard.append(uvInfo)

        var sunscreen = document.createElement("div")
        sunscreen.setAttribute("class", "protectionItems")

        var sunscreenEmoji = document.createElement("h2")
        sunscreenEmoji.innerText = "🧴"

        var sunscreenText = document.createElement("p")
        sunscreenText.innerText = "Sunscreen"

        var sunGlasses = document.createElement("div")
        sunGlasses.setAttribute("class", "protectionItems")

        var sunGlassesEmoji = document.createElement("h2")
        sunGlassesEmoji.innerText = "🕶"

        var sunGlassesText = document.createElement("p")
        sunGlassesText = "Sunglasses"

        var hat = document.createElement("div")
        hat.setAttribute("class", "protectionItems")

        var hatEmoji = document.createElement("h2")
        hatEmoji.innerText = "👒"

        var hatText = document.createElement("p")
        hatText.innerText = "Hat"

        var clothing = document.createElement("div")
        clothing.setAttribute("class", "protectionItems")

        var clothingEmoji = document.createElement("h2")
        clothingEmoji.innerText = "👚"

        var clothingText = document.createElement("p")
        clothingText.innerText = "Protective Clothing"
        
        var shade = document.createElement("div")
        shade.setAttribute("class", "protectionItems")

        var shadeEmoji = document.createElement("h2")
        shadeEmoji.innerText = "🌳"

        var shadeText = document.createElement("p")
        shadeText.innerText = "Stay in shade near midday"

        var avoidSun = document.createElement("div")
        avoidSun.setAttribute("class", "protectionItems")

        var avoidSunEmoji = document.createElement("h2")
        avoidSunEmoji.innerText = "⛱️"

        var avoidSunText = document.createElement("p")
        avoidSunText.innerText = "Reduce time in the sun"

        var indoors = document.createElement("div")
        indoors.setAttribute("class", "protectionItems")

        var indoorsEmoji = document.createElement("h2")
        indoorsEmoji.innerText = "🏠"

        var indoorsText = document.createElement("p")
        indoorsText.innerText = "Avoid the sun between 10am-2pm"

        
        recProtection.append(sunscreen)
        sunscreen.append(sunscreenEmoji)
        sunscreen.append(sunscreenText)
        recProtection.append(sunGlasses)
        sunGlasses.append(sunGlassesEmoji)
        sunGlasses.append(sunGlassesText)
        recProtection.append(hat)
        hat.append(hatEmoji)
        hat.append(hatText)
        recProtection.append(clothing)
        clothing.append(clothingEmoji)
        clothing.append(clothingText)
        recProtection.append(shade)
        shade.append(shadeEmoji)
        shade.append(shadeText)
        recProtection.append(avoidSun)
        avoidSun.append(avoidSunEmoji)
        avoidSun.append(avoidSunText)
        recProtection.append(indoors)
        indoors.append(indoorsEmoji)
        indoors.append(indoorsText)

    }
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

    console.log(data.list[1].weather[0].icon)
    for (let i = 3; i < data.list.length; i += 8) {
        var fiveDayDate = data.list[i].dt


        var monthday = moment.unix(fiveDayDate).format("MM/DD")


        var card = document.createElement("div")
        card.setAttribute("class", "col-2 fiveDayCard")

        var fiveDayCardDate = document.createElement("h2")
        fiveDayCardDate.innerText = monthday

        var fiveDayIcon = document.createElement("div")
        var fiveDayImage = document.createElement("img")
        var fiveDayWeatherIcon = data.list[i].weather[0].icon
        var fiveDayIconURL = "http://openweathermap.org/img/w/" + fiveDayWeatherIcon + ".png"

        fiveDayImage.setAttribute("src", fiveDayIconURL)

        var skyCondition = document.createElement("p")
        skyCondition.innerText = (data.list[i].weather[0].description)

        var fiveDayHigh = document.createElement("p")
        fiveDayHigh.innerText = ("High: " + data.list[i].main.temp_max + "f")

        var fiveDayLow = document.createElement("p")
        fiveDayLow.innerText = ("Low: " + data.list[i].main.temp_min + "f")

        var fiveDayHumidity = document.createElement("p")
        fiveDayHumidity.innerText = ("Humidity: " + data.list[i].main.humidity +"%")



        fiveDayContainer.append(card)
        card.append(fiveDayCardDate)
        card.append(skyCondition)
        card.append(fiveDayIcon)
        fiveDayIcon.append(fiveDayImage)
        card.append(fiveDayHigh)
        card.append(fiveDayLow)
        card.append(fiveDayHumidity)








    }
}

fiveDayWeather()
currentWeather()
logHistory()