// import  { useState } from "react";
// import { AlignJustify, Heart } from 'lucide-react';
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/authSlice";

interface User {
  id: string;
  firstname: string;
  lastname:string;
  email: string;
}

interface ResponseData {
  success: boolean;
  message: string;
  user: User;
}

interface RootState {
  auth: {
    user: User; // Define this according to the user structure
  };
}

const Navbar = () => {
  // const wishlisthandler = () => {
  //   navigate('/my-wishlist')
  // }
  // const profilehandler = () => {
  //   navigate('/my-profile')
  // }
  const navigate = useNavigate();
  const {user} = useSelector((store:RootState)=>store.auth);
  const dispatch = useDispatch();
  
  const logOutHandler = async () =>{
    try {
      const res = await axios.get<ResponseData>("http://localhost:3500/api/v1/user/logout",{
        withCredentials:true
      });
      if(res.data.success){
        dispatch(setAuthUser(null));
        navigate('/');
        toast.success(res.data.message);
      }
    }  catch (error: unknown) {
          console.log(error);
          const errorMessage = error || 'Something went wrong';
          toast.error(errorMessage);
        }
    }

   

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-500 p-4 sticky top-0  z-50">
      <div className="mx-auto flex items-center justify-between">
        <div onClick={() => navigate('/')} className="text-white text-xl font-bold cursor-pointer">CoinPlus</div>


        {/* <div className="flex space-x-6 ml-auto ">
          <span className="flex items-center cursor-pointer font-semibold text-white gap-1 transform transition-transform duration-300 hover:scale-110" onClick={wishlisthandler}><Heart /><span className="hidden sm:block">Favorite</span></span>

          <span className="flex items-center cursor-pointer font-semibold text-white gap-1 transform transition-transform duration-300 hover:scale-110" onClick={profilehandler}>
            <Avatar className="w-9 h-9">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="hidden sm:block">Profile</span></span>

        </div> */}
        {
          user ? (
            <Button className="text-purple-800 bg-white hover:bg-white ml-4 rounded-full transform transition-transform duration-300 hover:scale-110" onClick={logOutHandler}>Logout</Button>
          ) : (
            <Button className="text-purple-800 bg-white hover:bg-white ml-4 rounded-full transform transition-transform duration-300 hover:scale-110" onClick={()=>navigate("/login")}>Login</Button>
          )
        }

        
      </div>
    </nav>
  );
}

export default Navbar;
