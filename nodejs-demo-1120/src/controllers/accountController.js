/* eslint-disable space-before-blocks */
import { StatusCodes } from 'http-status-codes'
import { accountService } from '~/services/accountService'

const createNew = async (req, res, next) => {
  try {
    const createdAccount = await accountService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createdAccount)
  }
  catch (error){ next(error) }
}

const login = async (req, res, next) => {
  try {
    const token = await accountService.login(req.body)
    res.status(StatusCodes.OK).json({ token })
  }
  catch (error){ next(error) }
}

export const accountController = {
  createNew,
  login
}