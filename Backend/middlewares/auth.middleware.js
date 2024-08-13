import jwt from 'jsonwebtoken'
import { UnauthorizedError } from '../helpers/error-handlers.js'

const extractTokenFromHeader = req => {
  const authHeader = req.headers.authorization
  if (!authHeader) throw new UnauthorizedError('User not authorized')

  const isValidToken = authHeader.startsWith('Bearer')
  if (!isValidToken) throw new UnauthorizedError('Invalid token')

  const token = authHeader.split(' ')[1]
  return token
}

export const isLoggedIn = (req, res, next) => {
  const token = extractTokenFromHeader(req)
  if (!token) throw new UnauthorizedError('User not logged in')

  const payload = jwt.verify(token, process.env.JWT_SECRET)
  req.user = payload
  next()
}

export const isAdmin = (req, res, next) => {
  const user = req.user
  if (user.role !== 'admin')
    throw new UnauthorizedError('Unautorized. Only admins are allowed')

  next()
}