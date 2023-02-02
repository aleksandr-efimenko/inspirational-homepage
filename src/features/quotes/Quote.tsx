import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getRandomQuoteAsync, selectQuote } from './quoteSlice'


export default function Quote() {
    const dispatch = useAppDispatch();
    const quote = useAppSelector(selectQuote);

    useEffect(() => {
        //TODO: while developing
        // dispatch(getRandomQuoteAsync());
    }, [dispatch])

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
