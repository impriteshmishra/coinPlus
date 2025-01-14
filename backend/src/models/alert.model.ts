import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    crypto: { type: String, required: true },
    thresholdPrice: { type: Number, required: true }, // price at which the user wants an alert
    price: { type: Number, required: true },
});

export default mongoose.model('Alert', alertSchema);

