import { Request, Response } from "express";
import axios from "axios";
import redisClient from "../utils/redisClient";

const fetchCoinData = async (coinId: string): Promise<any> => {
    const cacheKey = `coin:${coinId}`
    try {
        // checking redis client is connected
        if(!redisClient.isOpen){
            console.log('redis client is not connected.');
            
        }
        // here i am checking for existing data
         const cachedData = await redisClient.get(cacheKey);
         if(cachedData){
            console.log("cache hit successfully", coinId );
            return JSON.parse(cachedData);  
         }
        // here data is fetched from coingecko api
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&ids=${coinId}`, {
            headers: {
                'Content-Type': 'application/json', 
                'x-cg-demo-api-key': `CG-ot71bZfzvGXwC3mnSjSJ3JaV`
            }
            
        });
        console.log(response.data);
        const coinData = response.data;

        if(coinData){
            // here i am storing the data in redis
            await redisClient.setEx(cacheKey, 60, JSON.stringify(coinData)); // here i am giving cache data for 60 seconds
            console.log("cache updated now", coinId);
        }
        return coinData
       
    } catch (error: any) {
        console.error("error fetching coin data:", error.message);
        throw new Error("eailed to fetch coin data.");
    }
};
// now using above fetchCoinData we make controller
export const getCoinPrice = async (req: Request, res: Response): Promise<void> => {
    const { coinId } = req.params; 
    console.log("coin id",coinId);
    
    try {
        const data = await fetchCoinData(coinId); // here fetching the data from api and cache also 
        if(!data){
            res.status(404).json({
                success:false, message:"coin not found"
            })
        }
        res.status(200).json({ success: true, data });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};
