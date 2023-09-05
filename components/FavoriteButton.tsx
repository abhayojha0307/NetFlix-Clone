import useCurrentUser from "@/hooks/useCurrentUser";
import useFavoriteMovie from "@/hooks/useFavoriteMovie";
import axios from "axios";
import React,{useCallback,useMemo} from "react";
import { AiOutlinePlus,AiOutlineCheck } from "react-icons/ai";

interface FavoritesButtonProps{
    movieId:string
}

const FavoritesButton:React.FC<FavoritesButtonProps>=({movieId})=>{
    const {mutate:mutateFavorites}=useFavoriteMovie()
    const{data:currentUser,mutate}=useCurrentUser()
    console.log(currentUser)
    const isFavorite= useMemo(()=>{
        const list = currentUser?.favoriteIds || []
        return list.includes(movieId)
    },[currentUser,movieId])

    const toggleFavourites= useCallback(async()=>{
        let response;
        if(isFavorite){
            response= await axios.delete('/api/favorite', {data:{movieId}})
        }else{
            response= await axios.post('/api/favorite', {movieId})
        }
        const updatedFavoriteMovieIds=response?.data?.favoriteIds;
        mutate({...currentUser,
            favoriteIds:updatedFavoriteMovieIds})
        mutateFavorites()
    },[movieId,isFavorite,currentUser,mutate,mutateFavorites])

    const Icon = isFavorite? AiOutlineCheck: AiOutlinePlus

    return(
        <div
          onClick={toggleFavourites}
         className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
            <Icon className="text-white"/>
        </div>
    )
}

export default FavoritesButton
