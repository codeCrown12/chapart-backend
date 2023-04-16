import { IsEmail, IsNotEmpty, IsString, IsBoolean } from "class-validator"

export default class SignUpDto {

    @IsString()
    @IsNotEmpty()
    firstname: string

    @IsString()
    @IsNotEmpty()
    lastname: string

    @IsString()
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    @IsEmail()
    email: string
    
    @IsString()
    @IsNotEmpty()
    password: string

    @IsBoolean()
    is_artist: boolean

}