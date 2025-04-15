import { IsOptional, IsString } from "class-validator";


export class UpdateUsuarioDto {
    @IsString()
    @IsOptional()
    nombreUsuario? : string;

    @IsString()
    @IsOptional()
    password? : string;
}
