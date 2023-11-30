/* eslint-disable no-console */
/* eslint-disable no-useless-catch */
import { StatusCodes } from 'http-status-codes'
import { userModel } from '~/models/userModel'
import ApiError from '~/utils/ApiError'
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const createNew = async (reqBody) => {
  try {
    const { username, password } = reqBody
    const user = await userModel.fineOneByUsername(username)
    if (user) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'username already exist')
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newAccount = {
      username,
      password: hashedPassword
    }
    const createdAccount = await userModel.createNew(newAccount)
    const findOneById = await userModel.findOneById(createdAccount.insertedId)
    return findOneById
  } catch (error) { throw error }
}

const login = async (reqBody) => {
  try {
    const { username, password } = reqBody
    const user = await userModel.fineOneByUsername(username)
    if (!user) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'username or password is not valid')
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'username or password is not valid')
    }
    const token = jwt.sign({ userId: user._id, username: user.username }, 'your-secret-key', { expiresIn: '1h' })

    return token
  } catch (error) { throw error }
}

export const accountService = {
  createNew,
  login
}