import { Estado } from "@prisma/client";
import { IsArray, IsEnum, IsOptional, IsString } from "class-validator";

export class UpdateTareaDto {

        @IsOptional()
        @IsString()
        nombreTarea? : string;
    
        @IsOptional()
        @IsArray()
        fechas? : Date[];

        @IsOptional()
        @IsString()
        lugar? : string;

        @IsOptional()
        @IsEnum(Estado)
        estado? : Estado;
    
        @IsOptional()
        @IsString()
        dirigente? : string;
    
        @IsOptional()
        @IsArray()
        participantes? : string[]
    
}
