import React, { ChangeEvent, useMemo, useState } from 'react'
import data from './countries.min.json';


type CityWithCountry = {
    city: string
    country: string,
}


export default function LocationSelect() {
    const [searchText, setSearchText] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

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
        ).sort().slice(0, 5);

        //Filter duplicates
        return cities.filter((tag, index, array) => array.findIndex(t => t.city === tag.city && t.country === tag.country) === index)
    }, [searchText])

    const handleSeach = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    }

    const handleSelect = (cityWithCountry: CityWithCountry) => {
        console.log(cityWithCountry)
        setCity(cityWithCountry.city)
        setCountry(cityWithCountry.country)
    }

    return (
        <>
          <span className="close">&times;</span>
          <input type='text' id='city-input' list='cities-list' onChange={handleSeach}></input>
          <ul className='items-list'>
            {searchResults.map((el) => {
              return <li className='location-item-container'
                onClick={() => handleSelect(el)}
                // key={nanoid()}
              >{el.country}, {el.city}</li>
            })
            }
          </ul>
          </>
    )
}
