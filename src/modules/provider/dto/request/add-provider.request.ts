import { IsNotEmpty, IsString } from "class-validator";

export class AddProviderRequest{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    url: string;

    @IsString()
    @IsNotEmpty()
    color: string;

    @IsString()
    @IsNotEmpty()
    logo: string;
}