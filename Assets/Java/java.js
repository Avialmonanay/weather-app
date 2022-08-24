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
    //clears list to be prepared for newly created list
    $('#history').empty();

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


//watches for clicks on the history items. If one is selected it overides the "currentCity" local storage and calls to the weather item function updating the currently displayed weather to your history item.
$("#history").click(function (event) {
    historyEL = event.target
    if (historyEL.matches("h2")) {
        var historyChoice = historyEL.innerText
        localStorage.setItem("currentCity", historyChoice)
    }
}
)




weatherItem()
logHistory()