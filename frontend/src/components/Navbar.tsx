import React, { useState } from "react";
import { AlignJustify, Heart } from 'lucide-react';
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

const Navbar = () => {
  const wishlisthandler = () => {
    navigate('/my-wishlist')
  }
  const profilehandler = () => {
    navigate('/my-profile')
  }
  const navigate = useNavigate();
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
        {/* <Button className="text-purple-800 bg-white hover:bg-white ml-4 rounded-full transform transition-transform duration-300 hover:scale-110">Login</Button> */}
      </div>
    </nav>
  );
};

export default Navbar;
