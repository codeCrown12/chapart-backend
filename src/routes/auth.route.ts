import { Router } from "express"
import AuthController from "../controllers/auth.controller"
import { AppRoute } from "../interfaces/route.interface"
import dtoValidationMiddleware from "../middlewares/validation.middleware"
import SignUpDto from "../dtos/auth/signup.dto"
import LoginDto from "../dtos/auth/login.dto"
import VerifyOtpDto from "../dtos/auth/verifyOtp.dto"
import SendOtpDto from "../dtos/auth/sendOtp.dto"
import ChangePasswordDto from "../dtos/auth/changePassword.dto"
import SetUserTypeDto from "../dtos/auth/setAccountType.dto"

export default class AuthRoute implements AppRoute {
    public path: string = '/auth'
    public router: Router = Router()
    private controller: AuthController = new AuthController()

    constructor(){
        this.initializeRoutes()
    }

    private initializeRoutes(){

        this.router.post(
            '/signup', 
            dtoValidationMiddleware(SignUpDto, "body"),
            this.controller.signUp
        )

        this.router.post(
            '/login',
            dtoValidationMiddleware(LoginDto, "body"),
            this.controller.login
        )

        this.router.post(
            '/get_token',
            dtoValidationMiddleware(SendOtpDto, "body"),
            this.controller.sendOtp
        )

        this.router.post(
            '/verify_token',
            dtoValidationMiddleware(VerifyOtpDto, "body"),
            this.controller.verifyOtp
        )

        this.router.post(
            '/set_account_type',
            dtoValidationMiddleware(SetUserTypeDto, "body"),
            this.controller.setAccountType
        )

        this.router.put(
            '/change_password',
            dtoValidationMiddleware(ChangePasswordDto, "body"),
            this.controller.changePassword
        )

    }
}