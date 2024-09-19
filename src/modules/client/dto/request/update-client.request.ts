import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class UpdateClientRequest{

    @IsString()
    @IsUUID()
    uuid: string;
    
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