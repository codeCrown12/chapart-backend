import { IsString, IsNotEmpty, IsBoolean, IsArray, IsNumber, IsOptional } from "class-validator"

export default class GetRoomsDto {

    @IsString()
    @IsOptional()
    limit?: string

    @IsString()
    @IsOptional()
    cursor?: string

}