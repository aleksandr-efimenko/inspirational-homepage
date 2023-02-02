export const secretKey = '0c5065764c9332454afe3203b0c3fb7f';

export const fetchWeather =async (lon:number, lat: number) => {
    console.log('API', lon, lat)
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${secretKey}`);
    return response.json();
}