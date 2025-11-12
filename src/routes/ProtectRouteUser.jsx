import React, { useEffect, useState } from 'react'
import useEcomStore from '../store/ecom-store'
import {currentUser} from '../api/auth'
const ProtectRouteUser = () => {
    const ProtectRouteUser = ({Element})=>{
        const [ok,setOk]=useState(false)
        const user = useEcomStore((state)=>state.user)
        const token = useEcomStore((state)=>state.token)
        useEffect(()=>{
            if(user && token){
                currentUser(token)
                .then((res)=>console.log(res))
                .catch((err)=>console.log(err))
                // send to back
            }
        },[]) 
    return element
}
  
}

export default ProtectRouteUser