import express from 'express'
import { registerUser, verifyEmail, resendEmailVerificationToken, forgotPassword, resetPassword, loginUser } from '../controllers/auth.controller.js'
import { registerUserValidator, loginUserValidator } from '../validations/auth.validator.js'
import { isLoggedIn, isAdmin } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/register',registerUserValidator, registerUser)
router.post('/login', loginUserValidator, loginUser)
router.put('/verify-email/:token', verifyEmail)
router.put('/resend-email', resendEmailVerificationToken)
router.put('/forgot-password', forgotPassword)
router.put('/reset-password/:token', resetPassword)


router.get('/test', isLoggedIn, isAdmin, (req, res) => {
    res.json({ message: 'test' })
})

export default router