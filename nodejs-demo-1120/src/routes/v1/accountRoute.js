import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { accountController } from '~/controllers/accountController'
import { accountValidation } from '~/validations/accountValidation'

const router = express.Router()

router.route('/signup')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'account sign-up api is ready' })
  })
  .post(accountValidation.createNew, accountController.createNew)

router.route('/login')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'account login api is ready' })
  })
  .post(accountValidation.login, accountController.login)

export const accountRoute = router