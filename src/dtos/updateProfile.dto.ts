import { IsString, IsNotEmpty } from "class-validator"

export default class UpdateProfileDto {

    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    firstname: string

    @IsString()
    @IsNotEmpty()
    lastname: string

    @IsString()
    phone_number: string

    @IsString()
    bio: string
    
}