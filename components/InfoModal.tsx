import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import PlayButton from "./PlayButton";
import FavoritesButton from "./FavoriteButton";
import userInfoModal from "@/hooks/useInfoModal";
import useMovie from "@/hooks/useMovie";

interface infoMaodalProps {
    visiible?: boolean;
    onClose: any
}

const InfoModal: React.FC<infoMaodalProps> = ({ visiible, onClose }) => {
    const [isVisible, setIsVisible] = useState(!!visiible)

    const { movieId } = userInfoModal()
    const { data = {} } = useMovie(movieId)

    useEffect(() => {
        setIsVisible(!!visiible)
    }, [visiible])

    const handleClose = useCallback(() => {
        setIsVisible(false)
        setTimeout(() => {
            onClose
        }, 300);
    }, [onClose])

    if (!visiible) {
        return null
    }
    return (
        <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
            <div className="relative w-auto mx-auto rounded-md max-w-3xl overflow-hidden">
                <div className={`
                    ${isVisible ? 'scale-100' : 'scale-0'}
                    transform
                    duration-300
                    relative
                    flex-auto bg-zinc-900 drop-shadow-md
                `}>
                    <div className="relative h-96">
                        <video src={data?.videoUrl} poster={data?.thumbnailUrl} autoPlay muted loop className="w-full brightness-[60%] object-cover h-full"> </video>
                        <div onClick={handleClose} className="cursor-pointer absolute h-10 w-10 rounded-full top-3 right-3 bg-black bg-opacity-70 flex items-center justify-center">
                            <AiOutlineClose className="text-white" /></div>

                        <div className="absolute bottom-[10%] left-10">
                            <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                                {data?.title}
                            </p>
                            <div className="flex flex-row gap-4 items-center">
                                <PlayButton movieId={data?.id}/>
                                <FavoritesButton movieId={data?.id}/>

                            </div>
                        </div>
                    </div>
                    <div className="py-8 px-12">
                        <p className="text-green-400 font-semibold text-lg">
                            New
                        </p>
                        <p className="text-white text-lg">
                            {data?.duration}
                        </p>
                        <p className="text-white text-lg">
                            {data?.genre}
                        </p>
                        <p className="text-white text-lg">
                            {data?.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoModal