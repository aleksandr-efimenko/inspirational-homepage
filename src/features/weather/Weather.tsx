import React, { useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectWeather } from './weatherSlice'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { NONAME } from 'dns';

export default function Weather() {
    // const dispatch = useDispatch<AppDispatch>();
    const currentWeather = useAppSelector(selectWeather);
    const [buttonText, setButtonText] = useState('Get weather')
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [buttonStyle, setButtonStyle] = useState({})
      
    const [currentLocation, setCurrentLocation] = useState({latitude: 0, longitude: 0});
    const getGeo = () => {
        setButtonText('Loading...');
        setButtonDisabled(true);
        setButtonStyle({cursor: 'wait'})
        navigator.geolocation.getCurrentPosition(
            function (position) {
                setCurrentLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            },
            function (error) {
                console.error("Error Code = " + error.code + " - " + error.message);
            }
        );
    }

    const geoButton = <button disabled={buttonDisabled} style={buttonStyle} onClick={getGeo}>{buttonText}</button>
    const weatherData = <p>{currentWeather}</p>;
    console.log(currentLocation);
    return (
        <div className='weather-widget'>
            {/* {loadingPosition === 'pending' ? geoButton : }  */}
            {currentLocation.latitude === 0 ? geoButton : currentLocation.latitude}

        </div>
    )
}
