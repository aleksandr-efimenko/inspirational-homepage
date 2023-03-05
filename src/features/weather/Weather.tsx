import React, { useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import { WeatherData, getWeatherFromAutoLocationAsync, getWeatherFromManualLocationAsync, selectWeather, selectWeatherLoadingStatus } from './weatherSlice';
import { useDispatch } from 'react-redux';
import WeatherWidget from '../../components/WeatherWidget';
import './weather.css';
import { AppDispatch } from '../../app/store';
import { selectManualLocationStatus } from '../locationSelection/locationManuallySlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { selectAutoGeoposition, selectAutoGeopositionStatus, setAutoLocationStatus, setLocationAuto } from '../locationSelection/locationAutoSlice';
import { selectManualLocation } from "../locationSelection/locationManuallySlice";
import { openLocationSelect } from '../modalWindow/modalWindowSlice';

// import { classNames } from '../../classNames';

function Weather() {
    const dispatch = useDispatch<AppDispatch>();
    const currentWeather: WeatherData = useAppSelector(selectWeather);
    const weatherLoadingStatus = useAppSelector(selectWeatherLoadingStatus);

    const currentAutoLocation = useAppSelector(selectAutoGeoposition);
    const currentAutoLocationStatus = useAppSelector(selectAutoGeopositionStatus)

    const currentManualLocation = useAppSelector(selectManualLocation);
    const currentManualLocationStatus = useAppSelector(selectManualLocationStatus);




    useEffect(() => {
        if (currentAutoLocationStatus === 'loaded') {
            dispatch(getWeatherFromAutoLocationAsync(currentAutoLocation));
        } else if (currentManualLocationStatus === 'set') {
            dispatch(getWeatherFromManualLocationAsync(currentManualLocation))
        }
    }, [dispatch, currentAutoLocation, currentAutoLocationStatus, currentManualLocation, currentManualLocationStatus])


    useEffect(() => {
        const getAutoGeoLocation = () => {
            if (currentAutoLocationStatus !== 'not-set')
                return;
            dispatch(setAutoLocationStatus('loading'));
            const options = {
                enableHighAccuracy: false,
                timeout: 20_000,
                maximumAge: 60_000
            };

            navigator.geolocation.getCurrentPosition(
                function (position) {
                    dispatch(setLocationAuto({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }))
                },
                function (error) {
                    dispatch(setAutoLocationStatus('failed'));
                    // console.error("Error Code = " + error.code + " - " + error.message);
                    // dispatch(openLocationSelect());
                }, options
            );
        }

        getAutoGeoLocation();
    }, [dispatch, currentAutoLocationStatus])

    // const renderGeoButton = () => {
    //     return (
    //         <button
    //             // className={classNames('white-button', geoPositionLoadingStatus !== 'idle' && 'button-disabled')}
    //             className='white-button'
    //             // disabled={currentAutoLocation.status === 'loading'}
    //             onClick={getAutoGeoLocation}>
    //             Get weather
    //         </button>
    //     )
    // }
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
        dispatch(openLocationSelect());
    }

    const renderButtonOrWidget = () => {
        //If there were not attmpts to get location show button
        if (currentAutoLocationStatus === 'not-set') {
            // return renderGeoButton();
        } else if (currentAutoLocationStatus === 'loading') {
            return <FontAwesomeIcon className='spinner' size={'1x'} icon={['fas', 'circle-notch']} />
        }
        else if (currentAutoLocationStatus === 'failed' && currentManualLocationStatus === 'not-set') {
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


export default React.memo(Weather)
