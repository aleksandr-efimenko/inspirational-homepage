import { useEffect, useState } from "react";
import { getRandomImageAsync, selectBGImagesUrls, selectBGIndex, selectBackgroundUnsplash, selectBackgroundUnsplashStatus } from "../features/background/backgroundUnsplashSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectBackgroundLocal, selsectBGLocalList } from "../features/background/backgroundLocalSclice";

export default function Background() {
    const dispatch = useAppDispatch();
    const bgLocalUrl = useAppSelector(selectBackgroundLocal);
    const bgLocalList = useAppSelector(selsectBGLocalList);

    const bgUnsplashUrls = useAppSelector(selectBGImagesUrls);
    const bgUnsplashUrl = useAppSelector(selectBackgroundUnsplash);
    const bgUnsplashIndex = useAppSelector(selectBGIndex);
    const bgUnsplashStatus = useAppSelector(selectBackgroundUnsplashStatus);

    const [preloadedImgs, setPreloadedImgs] = useState<Array<string>>([]);
    const [bgStyle, setBgStyle] = useState({});
    useEffect(() => {
        dispatch(getRandomImageAsync());
    }, [dispatch])


    //Preload images from array for quick slide
    useEffect(() => {
        if (bgUnsplashStatus === 'loading') return;
        const loadImage = (url: string) => {
            if (!url)
                return;
            return new Promise((resolve, reject) => {
                const loadImg = new Image();
                loadImg.src = url;
                setPreloadedImgs(items => [...items, url]);
                loadImg.onerror = err => reject(err);
            })
        }
        Promise.all(bgUnsplashUrls
            .slice(0, bgUnsplashIndex + 3)
            .filter(image => preloadedImgs.indexOf(image) < 0)
            .map(image => loadImage(image)))
            .catch(err => console.log("Falied to load images", err));

        if (bgUnsplashUrls.length === 0)
            Promise.all(bgLocalList.map(image => loadImage(image)))
                .catch(err => console.log("Falied to load images", err));
    }, [bgUnsplashUrls, bgLocalList, bgUnsplashStatus, preloadedImgs, bgUnsplashIndex])

    useEffect(() => {
        if (bgUnsplashUrl) {
            setBgStyle((prev) => prev = {
                backgroundImage: `url(${bgUnsplashUrl})`
            });
        } else if (bgUnsplashStatus !== 'loading') {
            setBgStyle((prev) => prev = {
                backgroundImage: `url(${bgLocalUrl})`
            });
        }
    }, [bgUnsplashUrl, bgLocalUrl, bgUnsplashStatus])
    return (
        <div id='background-image-container' style={bgStyle}></div>
    )
}

