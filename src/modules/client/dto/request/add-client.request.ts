import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AddClientRequest{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    surname: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsDateString()
    bornDate: Date;

    @IsString()
    @IsNotEmpty()
    gender: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    phone: string;
    
    @IsString()
    @IsNotEmpty()
    type: string;
}