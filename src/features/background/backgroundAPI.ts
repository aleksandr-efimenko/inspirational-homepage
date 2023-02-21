const accessKey = process.env.REACT_APP_UNSPLASH_PUBLIC_KEY as string;

const root = 'https://api.unsplash.com';
const endPoint = '/photos/random';

export const fetchBackgroundUnsplash = async (count: number = 15) => {
    if (!accessKey) {
        console.error('Access key UNSPLASH is not set');
        // throw new Error('Access key not set');
        return;
    }
    try {
        const response = await fetch(`${root}${endPoint}?count=${count}&client_id=${accessKey}`);
        if (response.ok)
           return response.json();
    }
    catch (error) {
        console.warn(error);
    }
}