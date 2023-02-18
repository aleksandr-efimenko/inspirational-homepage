import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { getWeatherAsync, selectWeather, selectWeatherLoadingStatus, setLocation } from './weatherSlice';
import { useDispatch } from 'react-redux';
import WeatherWidget from '../../components/WeatherWidget';
import './weather.css';
import { AppDispatch } from '../../app/store';
import { showModalWindow } from '../locationSelection/locationSelectionSlice';
// import { classNames } from '../../classNames';

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

export type GeoPositionStatus = 'idle' | 'loading' | 'failed';

export default function Weather() {
    const dispatch = useDispatch<AppDispatch>();
    const [geoPositionLoadingStatus, setGeoPositionLoading] = useState<GeoPositionStatus>('idle');

    const currentWeather: WeatherData = useAppSelector(selectWeather);
    const weatherLoadingStatus = useAppSelector(selectWeatherLoadingStatus);

    const [currentLocation, setCurrentLocation] = useState<WeatherLocation>({ latitude: 0, longitude: 0 });
    const getGeo = () => {
        if (geoPositionLoadingStatus === 'loading' || weatherLoadingStatus === 'loading')
            return;
        setGeoPositionLoading('loading');
        const options = {
            enableHighAccuracy: false,
            timeout: 20_000,
            maximumAge: 60_000
        };

        navigator.geolocation.getCurrentPosition(
            function (position) {
                setCurrentLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            },
            function (error) {
                setGeoPositionLoading('failed');
                console.error("Error Code = " + error.code + " - " + error.message);
                dispatch(showModalWindow(true));
            }, options
        );
    }

    useEffect(() => {
        if (currentLocation.latitude !== 0) {
            dispatch(setLocation({
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude
            }))
            dispatch(getWeatherAsync(currentLocation));
        }
    }, [currentLocation, dispatch])

    const renderGeoButton = () => {
        return (
            <button
                // className={classNames('white-button', geoPositionLoadingStatus !== 'idle' && 'button-disabled')}
                className='white-button'
                disabled={geoPositionLoadingStatus !== 'idle'}
                onClick={getGeo}>
                {geoPositionLoadingStatus === 'loading' ? 'Loading...' : 'Get weather'}
            </button>
        )
    }
    const renderWeatherWidget = () => {
        switch (weatherLoadingStatus) {
            case 'loading':
                return <></>
            case 'idle':
                return <WeatherWidget {...currentWeather} />;
            case 'failed':
                return <p className='weather-error-message'>Error loading weather</p>;
            default:
                return <></>;
        }
    }
    const handleManuallySetLocation = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        dispatch(showModalWindow(true));
    }

    const renderButtonOrWidget = () => {
        //If there were not attmpts to get location show button
        if (currentLocation.latitude === 0 && geoPositionLoadingStatus !== 'failed') {
            return renderGeoButton();
        //If attempt to get location was not succesful show message
        } else if (geoPositionLoadingStatus === 'failed') {
            return <p className='weather-error-message'>User denied Geolocation <a href='/' onClick={handleManuallySetLocation}>set manually</a></p>
        } 
        //If location was determined show weather
        else {
            return renderWeatherWidget();
        }
    }

    return (
        <div className='weather-widget'>
            {renderButtonOrWidget()}
        </div>
    )
}
