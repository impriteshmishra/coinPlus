
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CoinPage from './pages/CoinPage.js';
import Mainlayout from './pages/Mainlayout.js';
import Wishlist from './pages/Wishlist.js';
import Profile from './pages/Profile.js';



function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Mainlayout/>}/>
    <Route path='/coins/:id' element={<CoinPage/>}/>
    <Route path='/my-wishlist' element={<Wishlist/>}/>
    <Route path='/my-profile' element={<Profile/>}/>
    </Routes>
    </BrowserRouter>
    
  )
}

export default App
