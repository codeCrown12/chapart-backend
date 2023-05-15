import { IsNotEmpty, IsString } from "class-validator";

export default class ArtworktDto {

    @IsString()
    @IsNotEmpty()
    id: string

}