import express, { Request, Response } from "express";
import { getCoinPrice } from "../controllers/crypto.controller";

const router = express.Router();

router.get("/price/:coinId", getCoinPrice);

export default router;