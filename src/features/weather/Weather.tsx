import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectWeather } from './weatherSlice'

export default function Weather() {
    const currentWeather = useAppSelector(selectWeather);

    return (
        <div className='weather-widget'>
            <p>{currentWeather}</p>
        </div>
    )
}
