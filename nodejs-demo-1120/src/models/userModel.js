/* eslint-disable no-console */
/* eslint-disable indent */
import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from './validators'
import { formattedTime } from '~/utils/TimeFormat'
import { GET_DB } from '~/config/mongodb'
import { ObjectId } from 'mongodb'

const USER_COLLECTION_NAME = 'users'
const USER_COLLECTION_SCHEMA = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required().trim().strict(),
    password: Joi.string().min(8).required(),

    columnOrderIds: Joi.array().items(
        Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
    ).default([]),

    createdAt: Joi.date().timestamp('javascript').default(formattedTime(Date.now())),
    updatedAt: Joi.date().timestamp('javascript').default(null),
    _destroy: Joi.boolean().default(false)
})
const validateBeforeCreate = async (data) => {
    return await USER_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
    try {
        const validData = await validateBeforeCreate(data)
        const createdUser = await GET_DB().collection('users').insertOne(validData)
        return createdUser
    } catch (error) { throw new Error(error)}
}

const findOneById = async (id) => {
    const result = await GET_DB().collection(USER_COLLECTION_NAME).findOne({
        _id: new ObjectId(id)
    })
    return result
}

const fineOneByUsername = async (username) => {
    const result = await GET_DB().collection(USER_COLLECTION_NAME).findOne({ username: username })
    return result
}

const getUserDetails = async (id) => {
    const result = await GET_DB().collection(USER_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
    return result
}

const getAllUsers = async () => {
    const result = GET_DB().collection(USER_COLLECTION_NAME).find()
    const allUses = await result.toArray()
    return allUses
}

const updateUserDetails = async (id, reqBody) => {
    try {
        const currentTime = formattedTime(Date.now())
        reqBody.updatedAt = currentTime
        const result = await GET_DB().collection(USER_COLLECTION_NAME).updateOne({
         _id: new ObjectId(id)
        },
        {
            $set: {
                ...reqBody
            }
        })

        let updatedUser
        if (result.modifiedCount > 0) {
            updatedUser = await findOneById(id)
        }
        return updatedUser
    } catch (error) { throw new Error(error)}

}

const deleteUser = async (id) => {
    const result = await GET_DB().collection(USER_COLLECTION_NAME).deleteOne({
        _id: new ObjectId(id)
    })
    return result
}

export const userModel = {
    USER_COLLECTION_NAME,
    USER_COLLECTION_SCHEMA,
    createNew,
    findOneById,
    fineOneByUsername,
    getUserDetails,
    getAllUsers,
    updateUserDetails,
    deleteUser
}