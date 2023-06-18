const API_KEY="473f54186294f1278a516ff968aaa1f3";
const inputElement=document.querySelector('[InputText]');
const grantAccess=document.querySelector('.grant-access-page')
const loadContent=document.querySelector('.loader')
const contents=document.querySelector('.shuffleContent')
const access=document.querySelector('.accessed')
const yourWeather=document.querySelector("[DefaultWeather]")
const searchWeather=document.querySelector("[SearchWeather]")
//Geolocation Api
function getLocation()
{

    //display loader till contents loads

    
    try{
        loadContent.classList.remove('size0');
        contents.classList.add('size0');
        if(navigator.geolocation)
        {
             navigator.geolocation.getCurrentPosition(fetchWeatherCoordinates);
        }


        // Complete this given function 
        // renderInfo()

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
        console.log(data1)
        console.log("City is :" + data1['name']);
        console.log("Weather data Is ->"+ data1?.main?.temp);
        renderInfo(data1);

    }
    catch{
        console.log("Coordinate fetch info fails");

    }
}


function renderInfo(data)
{
    let info=document.createElement('p');
    info.textContent=`${data?.main?.temp}  °C`;
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

