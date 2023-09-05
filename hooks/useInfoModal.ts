import { create } from "zustand";

export interface ModalStoreInterfaces{
    movieId?:string;
    isOpen?:boolean;
    openModal?:(movieId:string)=>void
    closeModal?:()=>void
}

const userInfoModal=create<ModalStoreInterfaces>((sec)=>({
    movieId:undefined,
    isOpen:false,
    openModal:(movieId:string)=>sec({
        isOpen:true,movieId,
    }),
    closeModal:()=>sec({isOpen:false,movieId:undefined})
}))

export default userInfoModal