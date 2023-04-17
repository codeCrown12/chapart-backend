import { IsString, IsEmail, IsNotEmpty } from "class-validator"

export default class ChangePasswordDto {

    @IsEmail()
    @IsNotEmpty()
    email: string
    
    @IsString()
    @IsNotEmpty()
    token: string

    @IsString()
    @IsNotEmpty()
    password: string

}