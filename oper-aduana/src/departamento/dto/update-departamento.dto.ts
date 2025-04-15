import { IsOptional, IsString } from "class-validator";


export class UpdateDepartamentoDto{
    @IsOptional()
    @IsString()
    nombreDepartamento? : string;
}
