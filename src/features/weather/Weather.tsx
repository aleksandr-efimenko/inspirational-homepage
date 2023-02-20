import React, { useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import { WeatherData, getWeatherAsync, selectWeather, selectWeatherLoadingStatus } from './weatherSlice';
import { useDispatch } from 'react-redux';
import WeatherWidget from '../../components/WeatherWidget';
import './weather.css';
import { AppDispatch } from '../../app/store';
import { showModalWindow } from '../locationSelection/locationManuallySlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { selectAutoGeoposition, setLocationAuto, setLocationAutoStatus as setAutoLocationStatus } from '../locationSelection/locationAutoSlice';

library.add(faCircleNotch);

// import { classNames } from '../../classNames';

export default function Weather() {
    const dispatch = useDispatch<AppDispatch>();
    const currentWeather: WeatherData = useAppSelector(selectWeather);
    const weatherLoadingStatus = useAppSelector(selectWeatherLoadingStatus);

    const currentAutoLocation = useAppSelector(selectAutoGeoposition)

    const getGeo = () => {
        if (currentAutoLocation.status === 'loading' || weatherLoadingStatus === 'loading')
            return;
        dispatch(setAutoLocationStatus('loading'));
        const options = {
            enableHighAccuracy: false,
            timeout: 20_000,
            maximumAge: 60_000
        };

        navigator.geolocation.getCurrentPosition(
            function (position) {
                setLocationAuto({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            },
            function (error) {
                setAutoLocationStatus('failed');
                console.error("Error Code = " + error.code + " - " + error.message);
                dispatch(showModalWindow(true));
            }, options
        );
    }

    useEffect(() => {
        if (currentAutoLocation.status === 'loaded') {
            dispatch(setLocationAuto({
                latitude: currentAutoLocation.latitude,
                longitude: currentAutoLocation.longitude
            }))
            dispatch(getWeatherAsync(currentAutoLocation));
        }
    }, [currentAutoLocation, dispatch])

    const renderGeoButton = () => {
        return (
            <button
                // className={classNames('white-button', geoPositionLoadingStatus !== 'idle' && 'button-disabled')}
                className='white-button'
                disabled={currentAutoLocation.status === 'not-set'}
                onClick={getGeo}>
                Get weather
            </button>
        )
    }
    const renderWeatherWidget = () => {
        switch (weatherLoadingStatus) {
            case 'loading':
                return <FontAwesomeIcon className='spinner' size={'1x'} icon={['fas', 'circle-notch']} />
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
        if (currentAutoLocation.latitude === 0 && currentAutoLocation.status === 'not-set') {
            return renderGeoButton();
            //If attempt to get location was not succesful show message
        } else if (currentAutoLocation.latitude === 0 && currentAutoLocation.status === 'loading') {
            return <FontAwesomeIcon className='spinner' size={'1x'} icon={['fas', 'circle-notch']} />
        }
        else if (currentAutoLocation.status === 'failed') {
            return <>
                <p className='weather-error-message'>User denied Geolocation
                    <br />
                    <a href='/' onClick={handleManuallySetLocation}>Set Geolocation</a>
                </p>
            </>
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
