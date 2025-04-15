import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateCapituloDto {

    @IsNotEmpty()
    @IsString()
    tituloCapitulo : string;

    @IsNotEmpty()
    @IsUUID()
    planAnualId : string;
}
