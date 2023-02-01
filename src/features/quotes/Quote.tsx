import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getRandomQuoteAsync, selectQuote } from './quoteSlice'


export default function Quote() {
    const dispatch = useAppDispatch();
    const quote = useAppSelector(selectQuote);

    useEffect(() => {
        console.log('use effect')
        dispatch(getRandomQuoteAsync());
    }, [dispatch])

    return (
        <div className='quote-container'>
            <p>"{quote.quoteText}"</p>
            <br />
            <p>-{quote.quoteAuthor}</p>
        </div>
    )
}
