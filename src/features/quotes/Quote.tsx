import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectQuote } from './quoteSlice'


export default function Quote() {
    const quote = useAppSelector(selectQuote);
    return (
        <div className='quote-container'>
            <p>{quote}</p>
        </div>
    )
}
