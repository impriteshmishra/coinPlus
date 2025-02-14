import express, { Request, Response } from "express";
import { getCoinPrice } from "../controllers/crypto.controller";

const router = express.Router();

router.route("/price/:coinId").get((req:Request,res:Response)=>getCoinPrice(req,res));

export default router;