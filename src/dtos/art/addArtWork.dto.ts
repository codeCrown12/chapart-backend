import { IsString, IsNotEmpty, IsBoolean, IsArray, IsNumber } from "class-validator"

export default class AddArtWorkDto {

    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsString()
    @IsNotEmpty()
    author_id: string

    @IsString()
    @IsNotEmpty()
    category: string

    @IsArray()
    image_urls: string[]

    @IsNumber()
    price: number

    @IsArray()
    specifications: string[]

    @IsBoolean()
    is_signed: boolean

    @IsBoolean()
    is_available_for_sale: boolean
    
    @IsBoolean()
    is_for_exhibition: boolean

}