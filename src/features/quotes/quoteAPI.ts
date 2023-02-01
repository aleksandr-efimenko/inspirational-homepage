
export const fetchQuote = async () => {
    const response = await fetch('https://api.api-ninjas.com/v1/quotes?category=success',
    {
        method: 'GET',
        headers: { 'X-Api-Key': 'LwPHprRIyV1fswPruDZEtQ==iVI1jw2NJmTbezaL'},
    });
    return response.json();
}