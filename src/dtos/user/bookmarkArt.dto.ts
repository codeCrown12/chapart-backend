import { IsNotEmpty, IsString } from "class-validator";

export default class BookmarkArtDto {

    @IsString()
    @IsNotEmpty()
    id: string

}