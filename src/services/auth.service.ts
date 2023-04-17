import * as bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client"
import database from "../database"
import SignUpDto from "../dtos/auth/signup.dto"
import { StatusCodes } from "http-status-codes"
import HttpException from "../utils/exception"
import LoginDto from "../dtos/auth/login.dto"
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken"
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config"
import emailService from "./email.service"
import SendOtpDto from "../dtos/auth/sendOtp.dto"
import VerifyOtpDto from "../dtos/auth/verifyOtp.dto"
import ChangePasswordDto from "../dtos/auth/changePassword.dto"


export default class AuthService {
    
    private dbService: PrismaClient


    constructor() {
        this.dbService = database.getClient()
    }


    public async signUp (signUpDto: SignUpDto) {

        const emailExists = await this.dbService.user.findFirst({
            where: {
                email: signUpDto.email
            }
        })

        if(emailExists) {
            throw new HttpException(StatusCodes.BAD_REQUEST, "Email already exists")
        }
        
        const hashedPassword = await this.hashPassword(signUpDto.password)
        const token = this.generateToken()
        const user = await this.dbService.user.create({
            data: {
                firstname: signUpDto.firstname.toLowerCase(),
                lastname: signUpDto.lastname.toLowerCase(),
                email: signUpDto.email.toLowerCase(),
                username: signUpDto.username.toLowerCase(),
                password: hashedPassword,
                verification_pin: token
            }
        })
        const { 
            email,
            username, 
            firstname, 
            lastname, 
            is_artist, 
            phone_number, 
            email_verified, 
            date, 
            exhibit, 
            bookmarks, 
            profile_image,
            bio
        } = user
        const message : string = `
        <p>Welcome ${firstname.toUpperCase()}, </p>
        <p>Please verify your account with the otp below</p>
        <b>${token}</b>`
        await emailService.sendEmail(signUpDto.email.toLowerCase(), "Verify email", message)
        return { user: {
            email,
            username, 
            firstname, 
            lastname, 
            is_artist, 
            phone_number, 
            email_verified, 
            date, 
            exhibit, 
            bookmarks, 
            profile_image,
            bio
        } }
    }


    public async login(loginDto: LoginDto) {
        const user = await this.dbService.user.findFirst({
            where: {
                email: loginDto.email.toLowerCase()
            }
        })
        
        if(!user) {
            throw new HttpException(StatusCodes.BAD_REQUEST, "Invalid credentials")
        }

        if(user.is_banned) {
            throw new HttpException(StatusCodes.BAD_REQUEST, "Access denied")
        }

        const passwordIsValid = await this.verifyPassword(user.password, loginDto.password)

        if(!passwordIsValid) {
            throw new HttpException(StatusCodes.BAD_GATEWAY, "Invalid credentials")
        }

        const token = this.signJWT(user.id)

        const { 
            email,
            username, 
            firstname, 
            lastname, 
            is_artist, 
            phone_number, 
            email_verified, 
            date, 
            exhibit, 
            bookmarks, 
            profile_image,
            bio
        } = user

        const loggedInUser = {
            email,
            username, 
            firstname, 
            lastname, 
            is_artist, 
            phone_number, 
            email_verified, 
            date, 
            exhibit, 
            bookmarks, 
            profile_image,
            bio
        }

        return { user: loggedInUser, token }
    }


    public async sendOTP (sendOtpDto: SendOtpDto) {
        const user = await this.dbService.user.findFirst({
            where: {
                email: sendOtpDto.email.toLowerCase()
            }
        })
        if(!user) {
            throw new HttpException(StatusCodes.BAD_REQUEST, "Email not registered")
        }
        const token = this.generateToken()
        await this.dbService.user.update({
            where: {
                email: sendOtpDto.email.toLowerCase()
            },
            data: {
                verification_pin: token
            }
        })
        const message : string = `
        <p>Hello chap, </p>
        <p>Here's your one time token below</p>
        <b>${token}</b>`
        await emailService.sendEmail(sendOtpDto.email.toLowerCase(), "Verify email", message)
        return { msg: "Token sent"}
    }


    public async verifyOtp(verifyEmailDto: VerifyOtpDto) {
        const user = await this.dbService.user.findFirst({
            where: {
                email: verifyEmailDto.email.toLowerCase(),
                verification_pin: verifyEmailDto.token
            }
        })
        if(!user) {
            throw new HttpException(StatusCodes.BAD_REQUEST, "Invalid token")
        }
        const token = this.generateToken()
        if(!user.email_verified) {
            await this.dbService.user.update({
                where: {
                    email: verifyEmailDto.email.toLowerCase()
                },
                data: {
                    email_verified: true,
                    verification_pin: token
                }
            })
            return { msg: "Email verified" }
        }
        await this.dbService.user.update({
            where: {
                email: verifyEmailDto.email.toLowerCase()
            },
            data: {
                verification_pin: token
            }
        })
        return { msg: "Token verified"}
    }


    public async changePassword(changePasswordDto: ChangePasswordDto) {
        const user = await this.dbService.user.findFirst({
            where: {
                email: changePasswordDto.email.toLowerCase(),
                verification_pin: changePasswordDto.token
            }
        })
        if(!user) {
            throw new HttpException(StatusCodes.BAD_REQUEST, "Invalid token or email")
        }
        const hashedPassword = await this.hashPassword(changePasswordDto.password)
        const token = this.generateToken()
        await this.dbService.user.update({
            where: {
                email: changePasswordDto.email.toLowerCase()
            },
            data: {
                password: hashedPassword,
                verification_pin: token
            }
        })
        return { msg: "Password updated"}
    }


    private async hashPassword(password: string) {
        const salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(password, salt)
    }


    private async verifyPassword(passwordFromDb: string, loginPassword: string) {
        return await bcrypt.compare(loginPassword, passwordFromDb)
    }


    public signJWT(id: string | object | Buffer) {
        return jwt.sign(
            { id },
            JWT_SECRET as string,
            { expiresIn: JWT_EXPIRES_IN }
        )
    }


    public verifyJWT(token: string) {
        try {
            return jwt.verify(token, JWT_SECRET as string) as { id: string }
        } catch (error) {
            if (error instanceof JsonWebTokenError) {
                throw new HttpException(
                    StatusCodes.UNAUTHORIZED,
                    error.message
                )
            }
        }
    }

    public generateToken(length: number = 6) {
        let chars = '0123456789';
        let token = '';
        for (let i = 0; i < length; i++) {
            token += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return token;
    }

}