"use strict";
// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import dotenv from "dotenv";
// import connectDB from "./utils/db";
// import { userRoute } from "./routes/user.route";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dotenv.config();
// const app = express();
// const PORT: number = parseInt(process.env.PORT || "3000", 10);
// // testing the backend
// app.get("/", (req, res) => {
//     return res.status(200).json({
//         message: "backend working.",
//         success: true,
//     });
// });
// // here is middleware setup
// app.use(express.json());
// app.use(cookieParser());
// // configuration cors
// const corsOptions: cors.CorsOptions = {
//     origin: "http://localhost:5173",
//     credentials: true,
// };
// app.use(cors(corsOptions));
// // API routes
// app.use("/api/v1/user", userRoute);
// // tarting the server
// app.listen(PORT, () => {
//     connectDB();
//     console.log(`Server listening on port ${PORT}`);
// });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./utils/db"));
const user_route_1 = require("./routes/user.route");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Set port and fallback to 3000 if not set
const PORT = parseInt(process.env.PORT || "3000", 10);
// Testing the backend
app.get("/", (req, res) => {
    return res.status(200).json({
        message: "backend working.",
        success: true,
    });
});
// Middleware setup
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// CORS configuration
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
// API routes
app.use("/api/v1/user", user_route_1.userRoute);
// Starting the server
app.listen(PORT, () => {
    (0, db_1.default)(); // Make sure DB connection is successful
    console.log(`Server listening on port ${PORT}`);
});
