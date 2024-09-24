import { IsNotEmpty, IsString, IsUUID, IsUrl } from "class-validator";

export class UpdateProviderRequest{
    @IsString()
    @IsUUID()
    uuid: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsUrl()
    url: string;

    @IsString()
    @IsNotEmpty()
    color: string;

    @IsString()
    @IsNotEmpty()
    logo: string;
}