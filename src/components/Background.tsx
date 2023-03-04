import { useEffect, useState } from "react";
import { getRandomImageAsync, selectBGImagesUrls, selectBGIndex, selectBackgroundUnsplash, selectBackgroundUnsplashStatus } from "../features/background/backgroundUnsplashSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectBackgroundLocal, selsectBGLocalList } from "../features/background/backgroundLocalSclice";
import React from "react";

function Background() {
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
                setPreloadedImgs(items => [...items, url]);
                loadImg.src = url;
                loadImg.onerror = err => reject(err);
            })
        }
        Promise.all(bgUnsplashUrls
            .slice(bgUnsplashIndex, bgUnsplashIndex + 3)
            .filter(image => preloadedImgs.indexOf(image) < 0)
            .map(image => loadImage(image)))
            .catch(err => console.log("Falied to load images", err));

        if (bgUnsplashUrls.length === 0)
            Promise.all(bgLocalList
                .filter(image => preloadedImgs.indexOf(image) < 0)
                .map(image => loadImage(image)))
                .catch(err => console.log("Falied to load images", err));
    }, [bgUnsplashUrls, bgLocalList, bgUnsplashStatus, preloadedImgs, bgUnsplashIndex])

    useEffect(() => {


        if (bgUnsplashUrl) {
            setBgStyle((prev) => prev = {
                ...prev, backgroundImage: `url(${bgUnsplashUrl})`
            });
        } else if (bgUnsplashStatus !== 'loading') {
            setBgStyle((prev) => prev = {
                ...prev, backgroundImage: `url(${bgLocalUrl})`
            });
        }

        // if ((bgUnsplashStatus === 'idle' || bgUnsplashStatus === 'failed')   && (bgUnsplashUrl || bgLocalUrl)) {
        //     console.log('upd')

        //     setBgStyle((prev) => prev = {
        //         ...prev, animationName: 'none',
        //     });

        //     const timer = setTimeout(() => {
        //         setBgStyle((prev) => prev = {
        //             ...prev, animationName: 'a',
        //         });
        //     }, 10);
        //     return () => clearTimeout(timer);

        // }

    }, [bgUnsplashUrl, bgLocalUrl, bgUnsplashStatus])

    return (
        <> {<div id='background-image-container' style={bgStyle}></div>}</>
    )
}

export default React.memo(Background);

