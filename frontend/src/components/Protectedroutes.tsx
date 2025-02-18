import { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom';


interface User {
  id: string;
  firstname: string;
  lastname:string;
  email: string;
}

interface RootState {
  auth:{
    user: User
  }
}

interface ProtectedRoutesProps {
  children?:ReactNode;
}

const Protectedroutes: React.FC<ProtectedRoutesProps> = ({children}) =>{
    const {user} = useSelector((store: RootState)=>store.auth);
    const navigate = useNavigate();
    useEffect(()=>{
        if(!user){
            navigate('/login');
        }
    },[user,navigate])
  return (
    <>{children ? children : <Outlet/>}</>
  )
}

export default Protectedroutes