import { Router } from "express"
import AuthController from "../controllers/auth.controller"
import { AppRoute } from "../interfaces/route.interface"
import dtoValidationMiddleware from "../middlewares/validation.middleware"
import SignUpDto from "../dtos/signup.dto"
import LoginDto from "../dtos/login.dto"
import VerifyOtpDto from "../dtos/verifyOtp.dto"
import SendOtpDto from "../dtos/sendOtp.dto"
import ChangePasswordDto from "../dtos/changePassword.dto"

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

        this.router.put(
            '/change_password',
            dtoValidationMiddleware(ChangePasswordDto, "body"),
            this.controller.changePassword
        )

    }
}