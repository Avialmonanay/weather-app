var cityNameLS = []


$(".search").click(function (event) {
    var element = event.target
    if (element.matches("button")) {
        var userInput = $(this).children("input").val()
        // console.log(userInput)
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

        return
        // pageLoad()
        // logHistory()
    }
})



// fetch("https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=c64d9c95aa9e442bc0444f33c92c8506", {

// })
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//     });