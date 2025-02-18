// import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface CoinData {
  name: string;
  low_24h: number;
  current_price: number;
  high_24h: number;
}

interface CryptoPriceChartProps{
  coinData: CoinData | null;
}

const CryptoPriceChart: React.FC<CryptoPriceChartProps> = ({ coinData }) => {
  if (!coinData) return <p className="text-center text-red-500">Data not available</p>;

  // Prepare data for the chart
  const chartData = [
    { name: "Low 24h", value: coinData.low_24h },
    { name: "Current Price", value: coinData.current_price },
    { name: "High 24h", value: coinData.high_24h },
    
  ];

  return (
    <div className="w-full h-96 p-4 bg-gray-900 rounded-xl shadow-lg">
      <h2 className="text-center text-white text-xl font-bold mb-4">{coinData.name} 24H Price Trend</h2>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip contentStyle={{ backgroundColor: "#222", color: "#fff" }} />
          <Line type="monotone" dataKey="value" stroke="#f7931a" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CryptoPriceChart;
