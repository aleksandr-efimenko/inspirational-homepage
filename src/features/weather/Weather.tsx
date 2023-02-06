import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { getWeatherAsync, selectWeather, selectWeatherLoadingStatus, setLocation } from './weatherSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import WeatherWidget from '../../components/WeatherWidget';
import './weather.css';

export type WeatherLocation = {
    longitude: number,
    latitude: number
}

export type WeatherData = {
    temperature: number,
    icon: string,
    description: string,
    unit: string,
    location?: string
}

export default function Weather() {
    const dispatch = useDispatch<AppDispatch>();
    const currentWeather:WeatherData = useAppSelector(selectWeather);
    const weatherLoadingStatus = useAppSelector(selectWeatherLoadingStatus);

    const [buttonText, setButtonText] = useState('Get weather')
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [buttonStyle, setButtonStyle] = useState({})
    
    const [currentLocation, setCurrentLocation] = useState<WeatherLocation>({ latitude: 0, longitude: 0 });
    const getGeo = () => {
        setButtonText('Loading...');
        setButtonDisabled(true);
        setButtonStyle({ cursor: 'wait' })
        const options = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 3600000
          };
          
        navigator.geolocation.getCurrentPosition(
            function (position) {
                setCurrentLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            },
            function (error) {
                console.error("Error Code = " + error.code + " - " + error.message);
            }, options
        );
    }

    useEffect(() => {
        if (currentLocation.latitude !== 0) {
            dispatch(setLocation({
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude
            }))
            dispatch(getWeatherAsync(currentLocation))
        }
    }, [currentLocation, dispatch])

    const geoButton = <button disabled={buttonDisabled} style={buttonStyle} onClick={getGeo}>{buttonText}</button>;
    const renderWeatherWidget = () => {
        switch (weatherLoadingStatus) {
            case 'loading':
                return <></>
            case 'idle':
                return <WeatherWidget {...currentWeather} />;
            case 'failed':
                return <p>Error loading weather</p>;
            default:
                return <></>;
        }
    }

    return (
        <div className='weather-widget'>
            {/* {loadingPosition === 'pending' ? geoButton : }  */}
            {currentLocation.latitude === 0 ? geoButton : renderWeatherWidget()}

        </div>
    )
}
