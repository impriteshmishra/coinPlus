import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom';

function Protectedroutes({children}) {
    const {user} = useSelector(store=>store.auth);
    const navigate = useNavigate();
    useEffect(()=>{
        if(!user){
            navigate('/login');
        }
    },[user,navigate])
  return (
    <><Outlet/></>
  )
}

export default Protectedroutes