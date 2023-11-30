import { StatusCodes } from 'http-status-codes'

export const errorHandlingMiddleware = (err, req, res) => {
  if (!err.StatusCodes) {
    err.StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR
  }

  const responseError = {
    statusCode: err.statusCode,
    message: err.message || StatusCodes[err.StatusCode],
    stack: err.stack
  }

  res.status(responseError.statusCode).json(responseError)
}