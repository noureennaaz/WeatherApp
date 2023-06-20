
const API_KEY=config.api_key;
const inputElement=document.querySelector('[InputText]');
const grantAccess=document.querySelector('.grant-access-page')
const loadContent=document.querySelector('.loader')
const contents=document.querySelector('.shuffleContent')
const access=document.querySelector('.accessed')
const yourWeather=document.querySelector("[DefaultWeather]")
const searchWeather=document.querySelector("[SearchWeather]")
const ContainerTab=document.querySelector('#Container');
//Geolocation Api
const searchbar=document.querySelector('.searchBar');
let errPage=document.querySelector('.erronous');
const submit=document.querySelector("[submiti]");
const input=document.querySelector("[input]");

let CurrentTab=yourWeather;
FromSessionStorage();

function switchTab(NewTab)
{
    console.log(NewTab);
    if(NewTab!=CurrentTab)
    {
        //Yourweather selected
        if(NewTab==yourWeather)
        {
            yourWeather.classList.add("s1");
            searchWeather.classList.remove("s1");
            searchbar.classList.add('size0');
            ContainerTab.classList.remove('size0')
            console.log("added class");
            
            fetchDataFromCoordinates(JSON.parse(sessionStorage.getItem("user-coordinates")));
            
        }
        else
        {
            searchWeather.classList.add("s1");
            ContainerTab.classList.add("size0");
            yourWeather.classList.remove("s1");
            searchbar.classList.remove('size0');

        }
        CurrentTab=NewTab;
    }

}
function FromSessionStorage()
{

    
    const localCoordinates=sessionStorage.getItem("user-coordinates");

    // check if already present//
    if(localCoordinates)
    {

        console.log("already here");
        grantAccess.classList.add("size0");
        access.classList.remove("size0");
        loadContent.classList.remove("size0")
        fetchDataFromCoordinates(JSON.parse(localCoordinates));
        loadContent.classList.add("size0");
    }
    else{
        grantAccess.classList.remove("size0");
        
        
    }
    
}


async function fetchDataFromCoordinates(coordinates)
{
    lat=coordinates.lat;
    lon=coordinates.lon;
    console.log(lat);
    try{
        const response1=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);

        const data1=await response1.json();
        renderInfo(data1);
        console.log("coordinates");
    }
    catch{
        console.log("Coordinate fetch fails");
        
    }
}


function getLocation()
{

    try{

        contents.classList.add("size0");
        loadContent.classList.remove("size0");
        
        if(navigator.geolocation)
        {
             navigator.geolocation.getCurrentPosition(fetchWeatherCoordinates);
             grantAccess.classList.add('size0');
        }
        contents.classList.remove("size0");
        loadContent.classList.add("size0");

    }
    catch{
       console.log('geolocationfailed');
    }
    
}
function fetchWeatherCoordinates(location)
{
    try{
        const locationObject={
            lat:location.coords.latitude,
            lon:location.coords.longitude
        }
        console.log('this is to inform coordinates are being stored on the session');
        sessionStorage.setItem("user-coordinates", JSON.stringify(locationObject));
        console.log("successfull");
        console.log(sessionStorage.getItem("user-coordinates"));
    
    
        fetchDataFromCoordinates(locationObject);
    }
    catch{

    }

}

// for country icon
// https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png

// for current weathericon
// https://openweathermap.org/img/wn/${value to be inserted}@2x.png
function renderInfo(CurrentData)
{
    if(!errPage.classList.contains("size0"))
    {
        errPage.classList.add("size0");
    }

    const city=document.querySelector("[City]");
    const countryIcon=document.querySelector("[country-icon]");
    const description=document.querySelector("[Desc]");
    const weatherIcon=document.querySelector("[weather-image]");
    const temperature=document.querySelector("[Temp]");

    const winds=document.querySelector("[wind-speed]");
    const Humidity=document.querySelector("[humidity]");
    const Clouds=document.querySelector("[clouds]");

    city.innerText=CurrentData?.name;
    countryIcon.src=`https://flagcdn.com/144x108/${CurrentData?.sys?.country.toLowerCase()}.png`;
    description.innerText=CurrentData?.weather?.[0]?.description;
    weatherIcon.src=`http://openweathermap.org/img/w/${CurrentData?.weather?.[0]?.icon}.png`;
    
    temperature.innerText=`${CurrentData?.main?.temp} °C `;
    winds.innerText=`${CurrentData?.wind?.speed} m/s`;
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
        
        if(data?.cod==='404')
        {
            throw "error";
        }
        renderInfo(data);

    }
    catch(err)
    {
        
          console.log("fetch fail");
          if(!ContainerTab.classList.contains('size0'))
               ContainerTab.classList.add('size0');
              
          errPage.classList.remove("size0");

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

// //Event listener on search 
// input.addEventListener("keypress", function(event){
//     if (event.key === "Enter") {
//         event.preventDefault();
//         submit.click();
// }
// })

