import { useCallback, useEffect, useState } from "react"
import MobileMenu from "./MobileMenu"
import Navbaritem from "./NavbarItem"
import {BsBell, BsChevronDown,BsSearch} from 'react-icons/bs'
import AccountMenu from "./AccountMenu"

const TOP_OFFSET=66;

const Navbar=()=>{
    const [mobileVisible, setMobileVisible]=useState(false)
    const [showBackground, setShowBackground]=useState(false)
    const toggleVisible=useCallback(()=>{
        setMobileVisible(!mobileVisible)
    },[mobileVisible])
    const [profileVisible, setProfileVisible]=useState(false)
    const toggleProfileVisible=useCallback(()=>{
        setProfileVisible(!profileVisible)
    },[profileVisible])

    useEffect(()=>{
        const handleScroll=()=>{
            if(window.screenY>=TOP_OFFSET){
                setShowBackground(true)
            }
            else{
                setShowBackground(false)
            }
        }
        window.addEventListener('scroll',handleScroll)

        return ()=>{

        window.removeEventListener('scroll',handleScroll)
        }
    },[])
    return(
        <nav className="w-full fixed z-40">
            <div className={`px-4 py-6 flex flex-row md:px-16 items-center transition duration-500 ${showBackground? 'bg-opacity-80 bg-zinc-800':''}`}>
                <img className="h-4 lg:h-7" src='/images/logo.png' alt="logo"></img>
                <div className="flex-row ml-8 gap-7 hidden lg:flex">
                    <Navbaritem label="Home"/>
                    <Navbaritem label="Series"/>
                    <Navbaritem label="Films"/>
                    <Navbaritem label="New & Popular"/>
                    <Navbaritem label="My List"/>
                    <Navbaritem label="Browse by Languages"/>
                </div>
                <div className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative" onClick={toggleVisible}>
                    <p className="text-white text-sm" >Browse</p>
                    <BsChevronDown className={`text-white transition ${mobileVisible?"rotate-180":'rotate-0'}`}></BsChevronDown>
                    <MobileMenu visible={mobileVisible}></MobileMenu>
                </div>
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsSearch></BsSearch>
                    </div>
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsBell></BsBell>
                    </div>
                    <div className="flex flex-row items-center gap-2 cursor-pointer relative" onClick={toggleProfileVisible}>
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                            <img src="/images/icon1.png" alt="icon" />
                        </div>
                        <BsChevronDown className={`text-white transition ${profileVisible?"rotate-180":'rotate-0'}`} ></BsChevronDown>
                        <AccountMenu visible={profileVisible}></AccountMenu>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar