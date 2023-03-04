import { WeatherData } from '../features/weather/weatherSlice'

export default function WeatherWidget({ temperature, description, icon, unit, location }: WeatherData) {
    return (
        <>
            <div className='temp'>
                {icon ? <img src={`https://openweathermap.org/img/w/${icon}.png`} alt='weather-pic' /> : <></> }
                <p>{ `${temperature} ${unit}` }</p>
            </div>
            <p className='temp-description'>{location}</p>
            <p className='temp-description'>{description}</p>
        </>
    )
}