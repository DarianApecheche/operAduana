import { Rol } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateUsuarioDto {

    @IsString()
    @IsNotEmpty()
    nombreUsuario : string;

    @IsString()
    @IsNotEmpty()
    password : string;

    @IsNotEmpty()
    @IsEnum(Rol)
    rol : Rol;

    @IsUUID()
    @IsOptional()
    departamentoId? : string;
}
