import jwt from "jsonwebtoken"
import { JWT_PRIVATE_KEY, JWT_EXPIRATION_TIME } from "./constants.js"

const createOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

const createJWTToken = async payload => {
  try {
    const token = await jwt.sign({ id: payload }, JWT_PRIVATE_KEY, { expiresIn: JWT_EXPIRATION_TIME })
    return token
  } catch (error) {
    console.log(error.message)
  }
}

const verifyToken = token => {
  return jwt.verify(token, JWT_PRIVATE_KEY)
}

function getToken(req) {
  if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
    // console.log({tokenwithbearer:req.headers.authorization,token: req.headers.authorization.split(" ")[1]});
    return req.headers.authorization.split(" ")[1]
  }
  return null
}

function generateRandomPassword() {
  const length = 8
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let password = ""
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length)
    password += charset[randomIndex]
  }
  return password
}

function calculateAverageRating(reviews) {
  if (reviews.length === 0) return 0; 

  const sumOfRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = sumOfRatings / reviews.length;
  return averageRating;
}

export { createOTP, createJWTToken, getToken, verifyToken, generateRandomPassword, calculateAverageRating }
