import { IsString, IsUUID } from "class-validator";

export class UpdateStateRequest{
    @IsUUID()
    @IsString()
    uuidRequest: string;

    @IsString()
    state: string;
}