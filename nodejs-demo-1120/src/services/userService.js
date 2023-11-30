/* eslint-disable no-console */
/* eslint-disable no-useless-catch */
import { StatusCodes } from 'http-status-codes'
import { userModel } from '~/models/userModel'
import ApiError from '~/utils/ApiError'
const bcrypt = require('bcryptjs')

const createNewUser = async (reqBody) => {
  try {
    const { username, password } = reqBody
    const user = await userModel.fineOneByUsername(username)
    if (user) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'username already exist')
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = {
      username,
      password: hashedPassword
    }
    const createdUser = await userModel.createNew(newUser)
    const findOneById = await userModel.findOneById(createdUser.insertedId)
    return findOneById
  } catch (error) { throw error }
}

const getUserDetails = async (userId) => {
  try {
    const user = await userModel.getUserDetails(userId)
    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'user not found! ')
    }
    return user
  } catch (error) { throw error }
}

const getAllUser = async () => {
  try {
    const users = await userModel.getAllUsers()
    if (!users) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'users not found')
    }
    return users
  } catch (error) {throw error}
}

const updateUserDetails = async (userId, reqBody) => {
  try {
    const { username } = reqBody
    const user = await userModel.fineOneByUsername(username)
    if (user) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'username already exist')
    }
    const userDetails = await userModel.updateUserDetails(userId, reqBody)
    return userDetails
  } catch (error) { throw error }
}

const deleteUser = async (userId) => {
  try {
    const user = await userModel.deleteUser(userId)
    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'users not found')
    }
    return user
  } catch (error) { throw error }
}


export const userService = {
  createNewUser,
  getUserDetails,
  getAllUser,
  updateUserDetails,
  deleteUser
}