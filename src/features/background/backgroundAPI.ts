const accessKey = process.env.REACT_APP_UNSPLASH_PUBLIC_KEY as string;

const root = 'https://api.unsplash.com';
const endPoint = '/photos/random';

export const fetchBackgroundUnsplash = async (count: number = 15) => {
    try {
        const response = await fetch(`${root}${endPoint}?count=${count}&client_id=${accessKey}`);
        return response.json();
    }
    catch (error) {
        console.warn(error);
    }
}