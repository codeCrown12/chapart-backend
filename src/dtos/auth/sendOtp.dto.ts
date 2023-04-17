import { IsEmail, IsNotEmpty } from "class-validator"

export default class SendOtpDto {
    
    @IsEmail()
    @IsNotEmpty()
    email: string

} 