
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CoinPage from './pages/CoinPage.tsx';
import Mainlayout from './pages/Mainlayout.tsx';
import Wishlist from './pages/Wishlist.tsx';
import Profile from './pages/Profile.tsx';
import Signup from './components/Signup.tsx';
import Signin from './components/Signin.tsx';
import Protectedroutes from './components/Protectedroutes.tsx';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/' element={<Mainlayout />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Signin />} />

        <Route element={<Protectedroutes />}>
          <Route path='/coins/:id' element={<CoinPage />} />
          <Route path='/my-wishlist' element={<Wishlist />} />
          <Route path='/my-profile' element={<Profile />} />
        </Route>

      </Routes>

    </BrowserRouter>

  )
}

export default App
