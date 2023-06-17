const API_KEY="473f54186294f1278a516ff968aaa1f3";
const inputElement=document.querySelector('[InputText]');

//Geolocation Api
function getLocation()
{
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    fetchWeatherCoordinates();
}
// function showLocation()
// {
//     x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
// }
async function fetchWeatherData(city)
{

    try{
        const respose=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

        const data= await respose.json();
        console.log("Weather data Is ->"+ data?.main?.temp.toFixed(2));

        renderInfo(data);

    }
    catch(err)
    {
        console.log("Error found ", err);

    }

}


async function fetchWeatherCoordinates()
{

    try{
        const response1=await fetch('https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid={API key}');

        const data1=await response1.json();
        console.log("Weather data Is ->"+ data1?.main?.temp.toFixed(2));
        renderInfo(data1);

    }
    catch{
        console.log("Coordinate fetch info fails");

    }
}

let info=document.createElement('p');
function renderInfo(data)
{
    info.textContent=`${data?.main?.temp.toFixed(2)}  °C`;
    document.body.appendChild(info);

}

function searchCity()
{
    let cityInput=inputElement.value;

    try
    {
        console.log('trying');
        fetchWeatherData(cityInput);
    }
    catch{
        console.log("fetch weather not working");
    }

}

//Event listener on search 

