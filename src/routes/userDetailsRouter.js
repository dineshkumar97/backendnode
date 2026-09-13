import express from "express";

import {
    createUser,
    getUsers,
    authenticate
} from "../controllers/userDetailsController.js";

const router = express.Router();

router.post("/create", createUser);
router.get("/all", getUsers);
router.post('/authenticate', authenticate);

export default router;