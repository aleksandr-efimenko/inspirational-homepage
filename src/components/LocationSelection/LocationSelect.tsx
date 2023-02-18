import React, { ChangeEvent, useMemo, useState } from 'react'
import data from './countries.min.json';
import { nanoid } from 'nanoid';
import { useAppDispatch } from '../../app/hooks';
import { setLocationCityAndCountry, showModalWindow } from '../../features/locationSelection/locationSelectionSlice';

export interface CityWithCountry {
    city: string
    country: string,
}

export default function LocationSelect() {
    const dispatch = useAppDispatch();
    const [searchText, setSearchText] = useState('');

    // Transform the array to be in object CityWithCountry: {country: '', city: ''}
    const citiesWithCountry: CityWithCountry[] = Object.entries(data).map(([country, cities]) =>
        cities.map(city => {
            return {
                country: country,
                city: city
            }
        })
    ).flat();

    const searchResults: CityWithCountry[] = useMemo(() => {
        if (!searchText)
            return [] as CityWithCountry[];

        const cities = citiesWithCountry.filter((el) =>
            el.city.toLowerCase().includes(searchText.toLowerCase())
        ).sort().slice(0, 100);

        //Filter duplicates
        return cities.filter((tag, index, array) => array.findIndex(t => t.city === tag.city && t.country === tag.country) === index)
    }, [searchText, citiesWithCountry])

    const handleSeach = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    }

    const handleSelect = (cityWithCountry: CityWithCountry) => {
        console.log(cityWithCountry)
        dispatch(setLocationCityAndCountry({
            city: cityWithCountry.city,
            country: cityWithCountry.country
        }))
        showModalWindow(false);
    }

    return (
        <>
            <h1>Search city</h1>
            <input type='text' id='city-input' className='task-text-input' onChange={handleSeach}></input>
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
