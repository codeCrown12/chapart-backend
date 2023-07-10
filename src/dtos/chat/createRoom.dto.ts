import { IsArray, ArrayNotEmpty } from "class-validator";

export default class CreateRoomDto {

    @IsArray()
    @ArrayNotEmpty()
    users: string[]

}