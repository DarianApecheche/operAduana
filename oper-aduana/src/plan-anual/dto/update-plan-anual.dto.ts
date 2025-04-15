import { IsInt, IsOptional } from "class-validator";


export class UpdatePlanAnualDto {
    @IsOptional()
    @IsInt()
    año? : number
}
