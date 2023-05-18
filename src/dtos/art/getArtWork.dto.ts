import { IsString, IsNotEmpty, IsBoolean, IsArray, IsNumber, IsOptional } from "class-validator"

export default class GetArtWorkDto {

    @IsString()
    @IsOptional()
    search?: string

    @IsString()
    @IsOptional()
    category?: string

    @IsString()
    @IsOptional()
    limit?: string

    @IsString()
    @IsOptional()
    cursor?: string

}