import { IsInt, IsNotEmpty, IsUUID } from "class-validator";

export class CreatePlanAnualDto {
    @IsNotEmpty()
    @IsInt()
    año : number;

    @IsNotEmpty()
    @IsUUID()
    usuarioId : string;
}
