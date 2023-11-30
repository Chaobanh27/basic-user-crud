/* eslint-disable no-console */
/* eslint-disable space-before-blocks */
import { StatusCodes } from 'http-status-codes'
import { userService } from '~/services/userService'

const createNewUser = async (req, res, next) => {
  try {
    const createdUser = await userService.createNewUser(req.body)
    res.status(StatusCodes.CREATED).json(createdUser)
  }
  catch (error){ next(error) }
}

const getUserDetails = async (req, res, next) => {
  try {
    const userId = req.params.id
    const user = await userService.getUserDetails(userId)
    res.status(StatusCodes.OK).json(user)
  } catch (error) {
    next(error)
  }
}

const getAllUser = async (req, res, next) => {
  try {
    const users = await userService.getAllUser()
    res.status(StatusCodes.OK).json(users)
  } catch (error) {
    next(error)
  }
}

const updateUserDetails = async (req, res, next) => {
  try {
    const userId = req.params.id
    const userDetails = await userService.updateUserDetails(userId, req.body)
    res.status(StatusCodes.OK).json(userDetails)
  } catch (error) {
    next(error)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id
    const user = await userService.deleteUser(userId)
    res.status(StatusCodes.OK).json(user)
  } catch (error) {
    next(error)
  }
}

export const userController = {
  createNewUser,
  getUserDetails,
  getAllUser,
  updateUserDetails,
  deleteUser
}