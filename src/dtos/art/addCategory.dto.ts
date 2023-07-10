import { IsString, IsNotEmpty } from "class-validator"

export default class AddCategoryDto {

    @IsString()
    @IsNotEmpty()
    name: string

}