import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { userRoute } from './userRoute'
import { accountRoute } from './accountRoute'

const router = express.Router()

router.get('/', (req, res) => {
  res.status(StatusCodes.OK).send('success!')
})

router.use('/users', userRoute)
router.use('/accounts', accountRoute)

export const API_V1 = router