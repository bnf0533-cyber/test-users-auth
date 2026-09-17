import express from "express";

import {
    getAllUsersController,
    loginUserController,
    profileController,
    registerUserController,
} from "../controller/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUserController);

router.post("/login", loginUserController);

router.get("/me", authMiddleware, profileController);

router.get("/users", getAllUsersController);

export default router;
