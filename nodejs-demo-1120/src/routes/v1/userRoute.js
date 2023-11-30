import express from 'express'
import { userController } from '~/controllers/userController'
import { userValidation } from '~/validations/userValidation'

const router = express.Router()

router.route('/getAllUser').get(userController.getAllUser)
router.route('/getUser/:id').get(userController.getUserDetails)
router.route('/addUser').post(userValidation.createNewUser, userController.createNewUser)
router.route('/updateUser/:id').put(userValidation.updateUser, userController.updateUserDetails)
router.route('/deleteUser/:id').delete(userController.deleteUser)

export const userRoute = router