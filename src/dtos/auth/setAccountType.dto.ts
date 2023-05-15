import { IsEmail, IsNotEmpty, IsBoolean } from "class-validator"

export default class SetAccountTypeDto {
    
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsBoolean()
    is_artist: boolean
    
} 