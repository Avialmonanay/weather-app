var cityNameLS = []
var listEl = $("#history")

$(".search").click(function (event) {
    var element = event.target
    if (element.matches("button")) {
        var userInput = $(this).children("input").val()
        // console.log(userInput)

        if (!userInput){
            return
        }
        localStorage.setItem("currentCity", userInput)

        const cityNameStorage = JSON.parse(localStorage.getItem("cityNameLS"))

        if (!cityNameStorage) {
            cityNameLS.push(userInput)

            localStorage.setItem("cityNameLS", JSON.stringify(cityNameLS));
            console.log
        }

        else {


            cityNameStorage.push(userInput)


            localStorage.setItem("cityNameLS", JSON.stringify(cityNameStorage));
        }
        weatherItem()
        logHistory()
        return








    }

})


function weatherItem() {
    const currentCityLS = localStorage.getItem("currentCity")

    if (currentCityLS) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + currentCityLS + "&appid=c64d9c95aa9e442bc0444f33c92c8506", {

        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
            });
    }
}





function logHistory() {
    const cityHistory = JSON.parse(localStorage.getItem("cityNameLS"));


    if (!cityHistory) {
        return
    }

    else{
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

weatherItem()
logHistory()