import express, {Request,Response,Application} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db";
import userRouter  from "./routes/user.route";
import cryptoRouter from "./routes/crypto.route";
import path from "path"

dotenv.config();

const app:Application = express();


const PORT: number = parseInt(process.env.PORT || "3000", 10);

const DIRNAME = path.resolve();

// testing the backend
// app.get("/", (req:Request, res:Response) => {
//     res.status(200).json({
//         message: "backend working.",
//         success: true,
//     });
// });

// here is middleware setup
app.use(express.json());
app.use(cookieParser());

// configuration cors
const corsOptions: cors.CorsOptions = {
    origin: "https://coinplus.onrender.com",
    credentials: true,
};
app.use(cors(corsOptions));

// API routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/crypto",cryptoRouter);

app.use(express.static(path.join(DIRNAME, "/frontend/dist")));
app.use("*",(_,res)=>{
    res.sendFile(path.resolve(DIRNAME, "frontend", "dist", "index.html"));
});

// starting the server
app.listen(PORT, () => {
    connectDB();
    console.log(`Server listening on port ${PORT}`);
});
