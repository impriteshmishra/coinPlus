"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// here i am connecting the database
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URL);
        console.log("MongoDB connected successfully.");
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};
exports.default = connectDB;
