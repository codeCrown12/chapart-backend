import { IsString, IsNotEmpty, IsOptional } from "class-validator"

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
    @IsOptional()
    phone_number: string

    @IsString()
    @IsOptional()
    bio: string
    
}