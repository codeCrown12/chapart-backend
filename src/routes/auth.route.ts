import { Router } from "express"
import AuthController from "../controllers/auth.controller"
import { appRoute } from "../interfaces/route.interface"
import dtoValidationMiddleware from "../middlewares/validation.middleware"
import SignUpDto from "../dtos/signup.dto"
import LoginDto from "../dtos/login.dto"
import VerifyEmailDto from "../dtos/verifyEmail.dto"

class AuthRoute implements appRoute {
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
            '/verify_token',
            dtoValidationMiddleware(VerifyEmailDto, "body"),
            this.controller.verifyEmail
        )

    }
}

export default AuthRoute