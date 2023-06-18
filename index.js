
const API_KEY="473f54186294f1278a516ff968aaa1f3";
const inputElement=document.querySelector('[InputText]');
const grantAccess=document.querySelector('.grant-access-page')
const loadContent=document.querySelector('.loader')
const contents=document.querySelector('.shuffleContent')
const access=document.querySelector('.accessed')
const yourWeather=document.querySelector("[DefaultWeather]")
const searchWeather=document.querySelector("[SearchWeather]")
const ContainerTab=document.querySelector('#Container');
//Geolocation Api


function getLocation()
{

    
    try{
        loadContent.classList.remove('size0');
        contents.classList.add('size0');
        if(navigator.geolocation)
        {
             navigator.geolocation.getCurrentPosition(fetchWeatherCoordinates);
        }


        

    }
    catch{
       console.log('try failed');
    }
    
    if(!grantAccess.classList.contains('size0'))
    {
        grantAccess.classList.add("size0");
        access.classList.remove("size0");

    }    
    contents.classList.remove("size0");
    yourWeather.classList.add('s1');     
    loadContent.classList.add('size0');
    
    
}

// for country icon
// https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png

// for current weathericon
// https://openweathermap.org/img/wn/${value to be inserted}@2x.png
function renderInfo(CurrentData)
{

    const city=document.querySelector("[City]");
    const countryIcon=document.querySelector("[country-icon]");
    const description=document.querySelector("[Desc]");
    const weatherIcon=document.querySelector("[weather-image]");
    const temperature=document.querySelector("[Temp]");

    const winds=document.querySelector("wind-speed");
    const Humidity=document.querySelector("humidity");
    const Clouds=document.querySelector("clouds");

    city.innerText=CurrentData?.name;
    countryIcon.src=`https://flagcdn.com/144x108/${CurrentData?.sys?.country.toLowerCase()}.png`;
    description.innerText=CurrentData?.weather?.[0]?.description;
    weatherIcon.src=`https://openweathermap.org/img/wn/${CurrentData?.weather?.icon}@2x.png`;
    temperature.innerText=CurrentData?.main?.temp;
    winds.innerText=CurrentData?.wind?.speed;
    Humidity.innerText=`${CurrentData?.main?.humidity} %`;
    Clouds.innerText=`${CurrentData?.clouds?.all} %`;
    ContainerTab.classList.remove('size0');
    access.classList.remove('size0');



    
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


async function fetchWeatherCoordinates(position)
{
    let lat=position.coords.latitude;
    let lon=position.coords.longitude;

    try{
        const response1=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);

        const data1=await response1.json();
        renderInfo(data1);

    }
    catch{
        console.log("Coordinate fetch fails");

    }
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

