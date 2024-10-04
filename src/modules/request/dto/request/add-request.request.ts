import { IsJSON, IsString, IsUUID } from "class-validator";

export class AddRequestRequest{
    @IsUUID()
    @IsString()
    uuidProduct: string;

    @IsString()
    description: string;

    @IsJSON()
    data: string;
}