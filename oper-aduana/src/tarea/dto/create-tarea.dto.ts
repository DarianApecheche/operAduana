import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateTareaDto {

    @IsNotEmpty()
    @IsString()
    nombreTarea : string;

    @IsNotEmpty()
    @IsArray()
    fechas : Date[];

    @IsNotEmpty()
    @IsString()
    lugar : string;

    @IsNotEmpty()
    @IsString()
    dirigente : string;

    @IsArray()
    @IsNotEmpty()
    participantes : string[]

    @IsNotEmpty()
    @IsUUID()
    capituloId : string;

    @IsArray()
    @IsUUID()
    departamentoId : string[]

    @IsNotEmpty()
    @IsUUID()
    planAnualId : string;

    @IsOptional()
    @IsUUID()
    tareaPadreId? : string
}
