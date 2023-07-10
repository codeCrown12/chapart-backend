import { NextFunction, Request, Response } from "express"
import AuthService from "../services/auth.service"
import { StatusCodes } from "http-status-codes"

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

    public sendOtp = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const res = await this.authService.sendOTP(request.body)
            response.status(StatusCodes.OK).send({status: 'ok', error: null, data: res})
        } catch (error) {
            next(error)
        }
    }

    public verifyOtp = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const res = await this.authService.verifyOtp(request.body)
            response.status(StatusCodes.OK).send({status: 'ok', error: null, data: res})
        } catch (error) {
            next(error)
        }
    }

    public changePassword = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const res = await this.authService.changePassword(request.body)
            response.status(StatusCodes.OK).send({status: 'ok', error: null, data: res})
        } catch (error) {
            next(error)
        }
    }

}