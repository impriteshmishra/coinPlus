import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CryptoPriceChart from "../components/Cryptopricechart";
import { ArrowBigUp } from 'lucide-react';
// import { AxiosResponse } from "axios";
// import CoinpageAction from "./Coinpagebutton";

interface Coin {
    name: string;
    image: string;
    current_price: number;
    price_change_percentage_24h: number;
    low_24h: number;
    high_24h: number;
    market_cap_rank: number;
    ath: number;
    atl: number;
    market_cap: number;
  }

interface ResponseData {
    data: Coin[];
  }

const Cryptodata = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState<Coin | null>(null);
    const [loading, setLoading] = useState(true);
    console.log("id", id);

    useEffect(() => {
        const fetchCoinDetails = async () => {
            try {
                const res = await axios.get<ResponseData>(`https://coinplus.onrender.com/api/v1/crypto/price/${id}`);
                console.log("res", res.data.data[0]);
                setCoin(res.data.data[0]);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching coin details:", error);
                setLoading(false);
            }
        };
        fetchCoinDetails();
    }, [id]);

    if (loading) return <p className="text-center text-white">Loading...</p>;
    if (!coin) return <p className="text-center text-red-500">Coin not found!</p>;
    const position = ((coin?.current_price - coin?.low_24h) / (coin?.high_24h - coin?.low_24h)) * 100;
    const clampedPosition = Math.max(5, Math.min(position, 95)); // using this the arrow prevent to go outside.
    return (
        <div className="flex  flex-col">
            <div className="flex  md:flex-row items-center justify-between p-4 text-black gap-2">
                <div className="w-full md:w-1/4 bg-white rounded-lg shadow-lg p-3">
                    <h1 className="text-3xl font-bold text-center">{coin?.name}</h1>
                    <img src={coin?.image} alt={coin?.name} className="w-20 h-20 mx-auto my-4" />
                    <p className="text-center text-lg font-semibold">Current Price: ₹{coin?.current_price}</p>
                    <p className={`text-center font-semibold ${coin?.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                        24h Change: {coin?.price_change_percentage_24h}%
                    </p>
                    <div className="relative w-full mt-4 ">
                        {/* Horizontal line */}
                        <div className="w-full h-4 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"></div>

                        {/* Arrow marker for current price */}
                        <div className="absolute top-[10px] " style={{ left: `${clampedPosition}%` }}>
                            <span className="text-purple-500 transform -translate-x-1/2"><ArrowBigUp className="w-8 h-8" /></span>
                        </div>

                        {/* Labels for low and high */}
                        <div className="flex justify-between mt-8">
                            <span className="text-sm text-red-500">24H Low: ₹{coin?.low_24h}</span>
                            <span className="text-sm text-green-600">24H High: ₹{coin?.high_24h}</span>
                        </div>
                    </div>
                    <div className="flex flex-col mt-4 font-semibold text-gray-600">
                        <span>Rank: <span className="font-bold text-yellow-600">#{coin?.market_cap_rank}</span></span>
                        <span>All time high: <span className="font-bold text-green-600"> ₹{coin?.ath}</span>   </span>
                        <span>All time low: <span className="font-bold text-red-500"> ₹{coin?.atl}</span></span>
                        <span>Market cap:  <span className="font-bold text-pink-600">₹{coin?.market_cap}</span></span>
                    </div>

                </div>
                <div className="w-full md:w-3/4 mt-6 md:mt-0">
                    <h2 className="text-3xl font-bold p-2 text-purple-600">24H market trend Chart</h2>
                    <CryptoPriceChart coinData={coin} />
                </div>
                
            </div>
            {/* <CoinpageAction coin={coin}/> */}
        </div>


    );
};

export default Cryptodata;
