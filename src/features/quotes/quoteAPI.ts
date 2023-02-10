export const fetchQuote = async (limit:number = 10) => {
    const response = await fetch(`https://api.api-ninjas.com/v1/quotes?limit=${limit}`,
    {
        method: 'GET',
        headers: { 'X-Api-Key': 'LwPHprRIyV1fswPruDZEtQ==iVI1jw2NJmTbezaL'},
        
    });
    return response.json();
}

export interface QuotesAPIType {
    quote:    string;
    author:   string;
    category: string;
}
