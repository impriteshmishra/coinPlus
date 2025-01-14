import { Request, Response } from "express";
import axios from "axios";






const fetchCoinData = async (coinId: string): Promise<any> => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`, {
            headers: {
                accept: 'application/json', 
                'x-cg-demo-api-key': `CG-ot71bZfzvGXwC3mnSjSJ3JaV`
            },
            params: { vs_currency: 'inr'
               
             }
        });
        console.log(response.data);
        
        return response.data; 
    } catch (error: any) {
        console.error("Error fetching coin data:", error.message);
        throw new Error("Failed to fetch coin data.");
    }
};
// now using above fetchCoinData we make controller
export const getCoinPrice = async (req: Request, res: Response): Promise<void> => {
    const { coinId } = req.params; 
    try {
        const data = await fetchCoinData(coinId); // Fetch data
        res.status(200).json({ success: true, data });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};
