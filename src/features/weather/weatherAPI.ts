export const secretKey = process.env.REACT_APP_OPENWEATHER_KEY as string;

export const fetchWeather =async (lon:number, lat: number) => {
    const response = 
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${secretKey}`)
        .then(response => response.json())
        .catch(error => console.log(error));
    return response;
}
