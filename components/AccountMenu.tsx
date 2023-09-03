import { signOut } from "next-auth/react"
import React from "react"

interface AccountMenuProps{
    visible?:boolean
}

const AccountMenu:React.FC<AccountMenuProps>=({visible})=>{
    if(!visible) return null
    return (
        <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
            <div className="flex flex-col gap-3">
                <div className="px-3 group/item flex flex-row gap-2 items-center w-full">
                    <img src='/images/icon1.png' alt='icon' className="w-8 rounded-md"></img>
                    <p className="text-white  text-sm group-hover/item:underline">Username</p>
                </div>
                <hr className="bg-gray-600 border-0 h-px my-4"></hr>
                <div className="px-3 text-white text-center text-sm hover:underline" onClick={()=>{signOut()}}>
                    Sign Out of Netflix
                </div>
            </div>
        </div>
    )
}

export default AccountMenu