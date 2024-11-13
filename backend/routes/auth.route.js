import  express from 'express'
import { login, logout, signup, verifyEmail,forgotPassword, resetPassword } from '../controllers/auth.controller.js';

const router = express.Router();

//set up routes
// This is the last method then I move to the frontend
router.get('/check-auth',verifyToken, checkAuth)
// first ones were for post


router.post('/signup', signup);

router.post('/login', login);

router.post('/logout',logout);

router.post('/verify-email', verifyEmail)

router.post("/forgot-password", forgotPassword)

router.post("/reset-password/:token", resetPassword)

export default router;