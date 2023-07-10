import { IsString, IsNotEmpty } from "class-validator";

export default class SendMessageDto {

    @IsString()
    @IsNotEmpty()
    message: string

    @IsString()
    @IsNotEmpty()
    room_id: string

}