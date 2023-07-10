import { IsString, IsNotEmpty, IsBoolean, IsArray, IsNumber, IsOptional } from "class-validator"

export default class GetMessagesDto {

    @IsString()
    @IsOptional()
    search?: string

    @IsString()
    @IsOptional()
    limit?: string

    @IsString()
    @IsOptional()
    cursor?: string

}