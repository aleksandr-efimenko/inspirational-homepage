const accessKey = '9DNyZdurkOKkfnlk55Q-W80JWPLs_BERiw57O0P1WSs';

const root = 'https://api.unsplash.com';
const endPoint = '/photos/random';

export const fetchBackgroundUnsplash = async (count:number = 3) => {
    // console.log('Unsplash API call');
    const response = await fetch(`${root}${endPoint}?count=${count}&client_id=${accessKey}`);
    return response.json();
}