const accessKey = '9DNyZdurkOKkfnlk55Q-W80JWPLs_BERiw57O0P1WSs';

const root = 'https://api.unsplash.com';
const endPoint = '/photos/random';

export const fetchQuote = async () => {
    const response = await fetch(root + endPoint,
        {
            method: 'GET',
            headers: { 'Authorization': accessKey },
        });
    return response.json();
}