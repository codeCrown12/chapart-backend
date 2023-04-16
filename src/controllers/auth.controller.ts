import { NextFunction, Request, Response } from "express"
import AuthService from "../services/auth.service"
import { StatusCodes } from "http-status-codes"
import { logger } from "../utils/logger"

export default class AuthController {

    public authService: AuthService = new AuthService()

    public signUp = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const res = await this.authService.signUp(request.body)
            response.status(StatusCodes.OK).send({status: 'ok', error: null, data: res})
        } catch (error) {
            next(error)
        }
    }

    public login = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const res = await this.authService.login(request.body)
            response.status(StatusCodes.OK).send({status: 'ok', error: null, data: res})
        } catch (error) {
            next(error)
        }
    }

    public verifyEmail = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const res = await this.authService.verifyOTP(request.body)
            response.status(StatusCodes.OK).send({status: 'ok', error: null, data: res})
        } catch (error) {
            next(error)
        }
    }

}