const accessKey = process.env.REACT_APP_API_NINJAS_KEY as string;

export const fetchQuote = async (limit: number = 10) => {
    if (!accessKey) {
        console.error('Access key API_NINJAS is not set');
        return;
    }
    const response = fetch(`https://api.api-ninjas.com/v1/quotes?limit=${limit}`,
        {
            method: 'GET',
            headers: { 'X-Api-Key': accessKey },
        })
        .then(response => response.json())
        .catch(error => console.error(error));
    return response;
}

export interface QuotesAPIType {
    quote: string;
    author: string;
    category: string;
}
