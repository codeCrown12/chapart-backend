import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export default class VerifyOtpDto {
    
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    token: string
} 