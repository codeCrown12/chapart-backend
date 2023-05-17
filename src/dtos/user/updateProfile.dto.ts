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
    country: string

    @IsString()
    @IsOptional()
    bio: string
    
}