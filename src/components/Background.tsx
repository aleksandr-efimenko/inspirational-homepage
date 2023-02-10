import { useEffect } from "react";
import { getRandomImageAsync, selectBGImagesUrls, selectBackgroundUnsplash, selectBackgroundUnsplashStatus } from "../features/background/backgroundUnsplashSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectBackgroundLocal, selsectBGLocalList } from "../features/background/backgroundLocalSclice";

export default function Background() {
    const dispatch = useAppDispatch();
    const bgLocalUrl = useAppSelector(selectBackgroundLocal);
    const bgLocalList = useAppSelector(selsectBGLocalList);

    const bgUnsplashUrls = useAppSelector(selectBGImagesUrls);
    const bgUnsplashUrl = useAppSelector(selectBackgroundUnsplash);
    const bgUnsplashStatus = useAppSelector(selectBackgroundUnsplashStatus);

    useEffect(() => {
        dispatch(getRandomImageAsync());
    }, [dispatch])

    //Preload images from array for quick slide
    useEffect(() => {
        console.log('')
        const loadImage = (url: string) => {
            return new Promise((resolve, reject) => {
                const loadImg = new Image();
                loadImg.src = url;
                loadImg.onerror = err => reject(err);
            })
        }
        Promise.all(bgUnsplashUrls.map(image => loadImage(image)))
            .catch(err => console.log("Falied to load images", err));

        Promise.all(bgLocalList.map(image => loadImage(image)))
            .catch(err => console.log("Falied to load images", err));
    }, [bgUnsplashUrls, bgLocalList])
    return (
        <div id='background-image-container' style={{ backgroundImage: `url(${bgUnsplashStatus === 'failed' ? bgLocalUrl : bgUnsplashUrl})` }}></div>
    )
}

function dispatch(arg0: any) {
    throw new Error("Function not implemented.");
}
