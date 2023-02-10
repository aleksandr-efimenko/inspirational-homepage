import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { getRandomQuoteAsync, selectQuote } from '../features/quotes/quoteSlice'


export default function Quote() {
    const dispatch = useAppDispatch();
    const quote = useAppSelector(selectQuote);

    useEffect(() => {
        dispatch(getRandomQuoteAsync());
    }, [dispatch])

    
    if (!quote) 
        return  <></>
    return (
        <div className='quote-container'>
            {quote.quoteText ? <p>"</p> : ''}
            <p>{quote.quoteText}</p>
            {quote.quoteText ? <p>"</p> : ''}
            <br />
            {quote.quoteText ? <p>-</p> : ''}
            <p>{quote.quoteAuthor}</p>
        </div>
    )
}
