/* eslint-disable no-useless-escape */
/* eslint-disable space-before-blocks */
import Joi from 'joi'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  const correcSignUptCondition = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required().trim().strict().messages({
      'any.required' : 'username is required',
      'string.empty': 'username can not be empty',
      'string.max': 'Title length must be less than or equal to 30 characters long',
      'string.min': 'Title length must be at least 3 characters long',
      'string.trim': 'Title must not have leading or trailing whitespace'
    }),
    password: Joi.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/).required().messages({
      'any.required' : 'password is required',
      'string.empty': 'password can not be empty',
      'string.min': 'password length must be at least 8 characters long',
      'string.pattern.base': '{{#label}} with value {:[.]} fails to match the required pattern: {{#regex}}'
    }),
    repeat_password: Joi.ref('password')
  })

  try {
    await correcSignUptCondition.validateAsync(req.body, { abortEarly: false })
    next()
    //res.status(StatusCodes.CREATED).json({ message: 'API sign-up from validation is ready to use' })
  } catch (error){
    const errorMessage = new Error(error).message
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
    next(customError)
  }
}

const login = async (req, res, next) => {
  const correctLoginInCondition = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required().trim().strict().messages({
      'any.required' : 'username is required',
      'string.empty': 'username can not be empty',
      'string.max': 'Title length must be less than or equal to 30 characters long',
      'string.min': 'Title length must be at least 3 characters long',
      'string.trim': 'Title must not have leading or trailing whitespace'
    }),
    password: Joi.string().required().messages({
      'any.required' : 'password is required',
      'string.empty': 'password can not be empty'
    })
  })

  try {
    await correctLoginInCondition.validateAsync(req.body, { abortEarly: false })
    next()
    //res.status(StatusCodes.CREATED).json({ message: 'API login from validation is ready to use' })
  } catch (error){
    const errorMessage = new Error(error).message
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
    next(customError)
  }
}

export const accountValidation = {
  createNew,
  login
}