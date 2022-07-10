import { register, login } from "../controllers/userController"
import express from "express";
const router = express.Router()

router.route('/')
    .post(register)
router.route('/login')
    .post(login)

export default router;