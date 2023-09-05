import {getSession, signOut} from 'next-auth/react'
import { NextPageContext } from 'next'
import Navbar from '@/components/Navbar'
import BillBoard from '@/components/BillBoard'
import MovieList from '@/components/MovieList'
import useMovieList from '@/hooks/useMovieList'
import useFavoriteMovie from '@/hooks/useFavoriteMovie'
import InfoModal from '@/components/InfoModal'
import userInfoModal from '@/hooks/useInfoModal'

export async function getServerSideProps(context:NextPageContext){
  const session =await getSession(context)
  if(!session){
    return {
      redirect:{
        destination:'/auth',
        permanent:false
      }
    }
  }
  return{
    props:{}
  }
}

export default function Home() {
  const {data:movies=[]}= useMovieList()
  const {data:favMovies=[]}=useFavoriteMovie()
  const {isOpen, closeModal}=userInfoModal()
  return (
    <>
    <InfoModal visiible={isOpen} onClose={closeModal}/>
      <Navbar/>
      <BillBoard/>
      <div className='pb-40'>
        <MovieList title="Trending Now" data={movies}></MovieList>
        <MovieList title="My List" data={favMovies}></MovieList>
      </div>
    </>
  )
}
