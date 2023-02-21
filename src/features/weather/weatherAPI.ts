export const accessKey = process.env.REACT_APP_OPENWEATHER_KEY as string;

export const fetchWeatherByAutoLocation = async (lon: number, lat: number) => {
    if (!accessKey) {
        console.error('Access key OPENWEATHER is not set');
        return;
    }
    const response =
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${accessKey}`)
            .then(response => response.json())
            .catch(error => console.log(error));
    return response;
}

export const fetchWeatherByCity = async (city: string, countryCode: string) => {
    if (!accessKey) {
        console.error('Access key OPENWEATHER is not set');
        return;
    }
    const response = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}}&units=metric&appid=${accessKey}`)
        .then((response) => response.json())
        .catch(error => console.log(error));
    return response;
}


