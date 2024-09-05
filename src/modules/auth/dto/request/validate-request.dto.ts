import { IsEmail, IsString } from "class-validator";

export class ValidateUserRequestDto{
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    displayName: string;


    authProvider?: string;
}