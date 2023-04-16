import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export default class VerifyEmailDto {
    
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    token: string
} 