// import { useState } from 'react'

// function CoinpageAction({ coin }) {
//     const [alertPrice, setAlertPrice] = useState("");
//     const [showAlertModal, setShowAlertModal] = useState(false);
//     const [message, setMessage] = useState("");

//     // // Handler to set an alert for the coin
//     // const handleSetAlert = async () => {
//     //     try {
//     //         // POST alert data to your backend
//     //         const response = await axios.post("", {
//     //             coinId: coin.id,
//     //             alertPrice: Number(alertPrice),
//     //         });
//     //         setMessage("Alert set successfully!");
//     //         setShowAlertModal(false);
//     //         setAlertPrice("");
//     //     } catch (error) {
//     //         console.error("Error setting alert:", error);
//     //         setMessage("Failed to set alert. Please try again.");
//     //     }
//     // };

//     // // Handler to add the coin to favorites
//     // const handleAddFavorite = async () => {
//     //     try {
//     //         // POST favorite coin data to your backend
//     //         const response = await axios.post("", {
//     //             coinId: coin.id,
//     //         });
//     //         setMessage("Coin added to favorites!");
//     //     } catch (error) {
//     //         console.error("Error adding favorite:", error);
//     //         setMessage("Failed to add coin to favorites. Please try again.");
//     //     }
//     // };

//     return (
//         <div className="mt-6">
//             {message && (
//                 <p className="mb-4 text-center text-green-600">
//                     {message}
//                 </p>
//             )}
//             <div className="flex gap-4 justify-center">
//                 <button
//                     onClick={() => setShowAlertModal(true)}
//                     className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//                 >
//                     Set Alert
//                 </button>
//                 <button
//                     // onClick={handleAddFavorite}
//                     className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
//                 >
//                     Save to Favorites
//                 </button>
//             </div>

//             {/* Alert Modal */}
//             {showAlertModal && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//                     <div className="bg-white p-6 rounded shadow-lg w-96">
//                         <h3 className="text-xl font-bold mb-4">
//                             Set Alert for {coin.name}
//                         </h3>
//                         <label className="block mb-2">
//                             Alert Price (₹):
//                         </label>
//                         <input
//                             type="number"
//                             value={alertPrice}
//                             onChange={(e) => setAlertPrice(e.target.value)}
//                             className="w-full p-2 border border-gray-300 rounded mb-4"
//                             placeholder="Enter alert price"
//                         />
//                         <div className="flex justify-end gap-4">
//                             <button
//                                 onClick={() => setShowAlertModal(false)}
//                                 className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleSetAlert}
//                                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//                             >
//                                 Set Alert
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }

// export default CoinpageAction;