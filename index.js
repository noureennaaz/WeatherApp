const API_KEY="473f54186294f1278a516ff968aaa1f3";
async function fetchWeatherData()
{
    let city='jabalpur';

    try{
        const respose=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

        const data= await respose.json();
        console.log("Weather data Is ->"+ data);
        renderInfo(data);

    }
    catch(err)
    {
        console.log("Error found ", err);

    }
    

}
let info=document.createElement('p');
function renderInfo(data)
{
    info.textContent=`${data?.main?.temp.toFixed(2)}  °C`;
    document.body.appendChild(info);

}
