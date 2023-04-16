import { NextFunction, Request, Response, RequestHandler } from "express"
import HttpException from "../utils/exception"
import { User } from "@prisma/client"
import database from "../database"
import AuthService from "../services/auth.service"
import { StatusCodes } from "http-status-codes"

interface AuthRequest extends Request {
    user: User | null
}

const authMiddleware = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        const authService = new AuthService()
        const dbService = database.getClient()

        if (!token) {
            throw new HttpException(
                StatusCodes.UNAUTHORIZED,
                'Unauthorized'
            )
        }

        const userPayload = authService.verifyJWT(token)

        if (!userPayload) {
            throw new HttpException(
                StatusCodes.UNAUTHORIZED,
                'Invalid Token'
            )
        }

        const user = await dbService.user.findFirst({
            where: {
                id: userPayload.id
            }
        })

        
        req.user = user

        next()
    } catch (error) {
        next(error)
    }
}

export default authMiddleware