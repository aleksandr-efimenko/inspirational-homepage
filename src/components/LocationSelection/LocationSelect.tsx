import React, { ChangeEvent, useMemo, useState } from 'react'
import citiesWithCountries from './countries.json';
import countryCodes from './country_codex.json';
import { nanoid } from 'nanoid';
import { useAppDispatch } from '../../app/hooks';
import { setLocationCityAndCountry } from '../../features/locationSelection/locationManuallySlice';
import { closeModalWindow } from '../../features/modalWindow/modalWindowSlice';

export interface CityWithCountry {
    city: string
    country: string,
    countryCode: string
}

export default function LocationSelect() {
    const dispatch = useAppDispatch();
    const [searchText, setSearchText] = useState('');
    // Transform the array to be in object CityWithCountry: {country: '', city: ''}
    const citiesWithCountry: CityWithCountry[] = Object.entries(citiesWithCountries).map(([country, cities]) =>
        cities.map(city => {
            return {
                country: country,
                city: city,
                countryCode: ''
            }
        })
    ).flat();

    const searchResults: CityWithCountry[] = useMemo(() => {
        if (!searchText)
            return [] as CityWithCountry[];

        const cities = citiesWithCountry.filter((el) =>
            el.city.toLowerCase().includes(searchText.toLowerCase())
        ).sort().slice(0, 20);

        //Filter duplicates
        return cities.filter((tag, index, array) => array.findIndex(t => t.city === tag.city && t.country === tag.country) === index)
    }, [searchText, citiesWithCountry])

    const handleSeach = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    }

    const handleSelect = (cityWithCountry: CityWithCountry) => {
        dispatch(setLocationCityAndCountry({
            city: cityWithCountry.city,
            countryCode: countryCodes.find(codeEl => codeEl.name.toLowerCase().includes(cityWithCountry.country.toLowerCase()))?.['alpha-2']
        }))
        dispatch(closeModalWindow());
    }

    return (
        <>
            <h1>Search city</h1>
            <input autoFocus type='text' id='city-input' className='white-text-input' onChange={handleSeach}></input>
            <ul className='locations-list'>
                {searchResults.map((el) => {
                    return <li className='location-item-container white-button'
                        onClick={() => handleSelect(el)}
                        key={nanoid()}
                    >{el.country}, {el.city}</li>
                })
                }
            </ul>
        </>
    )
}
