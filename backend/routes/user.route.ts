import express, { Request, Response } from "express";
import { login, logout, register } from "../controllers/user.controller";

const router = express.Router();

router.route('/register').post((req: Request, res: Response) => register(req, res));
router.route('/login').post((req: Request, res: Response) => login(req, res));
router.route('/logout').get((_: Request, res: Response) => logout(_, res));

export default router;
