import { IsOptional, IsString } from "class-validator";

export class UpdateCapituloDto {

    @IsString()
    @IsOptional()
    tituloCapitulo? : string;
}
