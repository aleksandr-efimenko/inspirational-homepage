import React from 'react'
import {WeatherData}  from '../../features/weather/Weather'

export default function WeatherWidget({temperature, description, unit, icon}: WeatherData ) {
  return (
    <div>
        { temperature }
    </div>
  )
}

