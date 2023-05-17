import { IsString, IsNotEmpty, IsBoolean, IsArray, IsNumber } from "class-validator"

export default class UpdateArtWorkDto {

    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsString()
    @IsNotEmpty()
    category_id: string

    @IsArray()
    specifications: string[]

    @IsBoolean()
    is_signed: boolean

}