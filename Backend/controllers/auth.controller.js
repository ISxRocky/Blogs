import jwt from 'jsonwebtoken'
import { BadRequestError } from "../helpers/error-handlers.js"
import { UserModel } from "../models/user.model.js"
import { sendMail } from "../utils/sendMail.js"
import { addExpiryHours, generateRandomAvatar, generateRandomToken } from "../utils/utils.js"
import { findUser } from '../services/user.service.js'

export const registerUser = async (req, res) => {
    const { email, password, firstName, lastName } = req.body

    const existingUser = await UserModel.findOne({ email })
    if (existingUser) {
        throw new BadRequestError('User already registered')
    }

    const profilePicture = generateRandomAvatar()
    const emailVerificationToken = await generateRandomToken()
    const emailVerificationExpires = addExpiryHours()

    const user = await UserModel.create({
        email,
        password,
        firstName,
        lastName,
        profilePicture,
        emailVerificationToken,
        emailVerificationExpires,
    })
    
    const mailOptions = {
        from: 'admin@blog.com',
        to: user.email,
        subject: 'Email Verification',
        template: 'emailVerify',
        context: {
            fullName: user.fullName,
            url: `${process.env.CLIENT_URL}/verify-email/${user.emailVerificationToken}`,
        },
    }

    await sendMail(mailOptions)

    return res.status(201).json({
        message: 'USer registration successful',
        user,
    })
}

export const verifyEmail = async (req, res) => {
    const { token } = req.params
  
    const user = await findUser({ emailVerificationToken: token })
  
    const currentDate = new Date()
    if (currentDate.toISOString() > user.emailVerificationExpires.toISOString()) {
      throw new BadRequestError('Email verification token expired')
    }
  
    user.emailVerified = true
    user.emailVerificationToken = ''
    user.emailVerificationExpires = null
  
    await user.save()
  
    return res.status(200).json({
      message: 'Email verification successful',
    })
}

export const resendEmailVerificationToken = async (req, res) => {
    const { email } = req.body
    const user = await findUser({ email })
    if (user.emailVerified) {
      throw new BadRequestError('Email is already verified')
    }
    const emailVerificationToken = await generateRandomToken()
    const emailVerificationExpires = addExpiryHours()
  
    user.emailVerificationToken = emailVerificationToken
    user.emailVerificationExpires = emailVerificationExpires
    await user.save()
  
    const mailOptions = {
      from: 'admin@blog.com',
      to: user.email,
      subject: 'Email Verification',
      template: 'emailVerify',
      context: {
        fullName: user.fullName,
        url: `${process.env.CLIENT_URL}/verify-email/${user.emailVerificationToken}`,
      },
    }
  
    await sendMail(mailOptions)
  
    return res.status(200).json({
      message: 'Email verification token resent successfully',
    })
}
  
export const forgotPassword = async (req, res) => {
    const { email } = req.body
    const user = await findUser({ email })
  
    const passwordResetToken = await generateRandomToken()
    const passwordResetExpires = addExpiryHours()
  
    user.passwordResetToken = passwordResetToken
    user.passwordResetExpires = passwordResetExpires
    await user.save()
  
    const mailOptions = {
      from: 'admin@blog.com',
      to: user.email,
      subject: 'Reset Your Password',
      template: 'resetPassword',
      context: {
        fullName: user.fullName,
        url: `${process.env.CLIENT_URL}/reset-password/${user.passwordResetToken}`,
      },
    }
  
    await sendMail(mailOptions)
  
    return res.status(200).json({
      message: 'Password reset token sent successfully',
    })
}

export const resetPassword = async (req, res) => {
    const { password, confirmPassword } = req.body
  
    if (password !== confirmPassword) {
      throw new BadRequestError('Passwords do not match')
    }
  
    const token = req.params.token
    const user = await findUser({ passwordResetToken: token })
  
    user.password = password
    user.passwordResetToken = ''
    user.passwordResetExpires = null
    await user.save()
  
    return res.status(200).json({ message: 'Password reset successfully' })
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body
  
    const user = await findUser({ email })
  
    const matchedPassword = await user.comparePassword(password)
    if (!matchedPassword) {
      throw new BadRequestError('Invalid email or password')
    }
  
    const payload = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    }
  
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })
    return res.status(200).json({
      user,
      accessToken: token,
    })
}
