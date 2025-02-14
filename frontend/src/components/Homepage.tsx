import React, { useEffect, useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Homepage = () => {
  const [coins, setCoins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // here tracking current page
  const coinsPerPage = 16; //16 coins per page


  useEffect(() => {
    const getAllCoin = async () => {
      try {
        const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr',
          {
            headers: { 'Content-Type': 'application/json' }
          }
        )
        setCoins(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllCoin();
  }, []);

  const lastIndex = currentPage * coinsPerPage;
  const firstIndex = lastIndex - coinsPerPage;
  const currentCoins = coins.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(coins.length/coinsPerPage);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 text-white">
      {/* Navbar */}


      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center p-12 bg-gradient-to-r from-purple-600 to-pink-500">
        <h1 className="text-4xl font-extrabold mb-4"> Stay Ahead in the Crypto Game!</h1>
        <p className="text-lg opacity-80">Stay updated with real-time prices and market trends.</p>
      </section>

      {/* Crypto Cards */}
      <div className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-black ">
        {currentCoins.map((coin) => (
          <div
            key={coin.id}
            className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center cursor-pointer transition-transform transform hover:scale-110"
            onClick={()=>navigate(`/coins/${coin.id}`) }
          >
            <img src={coin.image} alt={coin.name} className="w-16 h-16 mb-4" />
            <h2 className="text-xl font-bold">{coin.name}</h2>
            <p className="text-lg">₹{coin.current_price.toFixed(2)}</p>
            <p
              className={`text-sm flex items-center ${coin.price_change_percentage_24h
                >= 0 ? "text-green-500" : "text-red-600"
                }`}
            >
              {coin.price_change_percentage_24h
                >= 0 ? (
                <ArrowUp size={16} className="mr-1" />
              ) : (
                <ArrowDown size={16} className="mr-1" />
              )}
              {coin.price_change_percentage_24h
                .toFixed(2)}% in 24h
            </p>
          </div>
        ))}
      </div>


      <div className="flex justify-center mt-6 space-x-2">
        <button
          className={`px-4 py-2 rounded bg-purple-600 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-500"}`}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`px-4 py-2 rounded ${currentPage === index + 1 ? "bg-blue-500" : "bg-white hover:bg-gray-200 text-black"}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className={`px-4 py-2 rounded bg-purple-600 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-500"}`}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Homepage;
