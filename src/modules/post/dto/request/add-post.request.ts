import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class AddPostRequest{

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    link: string;

    @IsDateString()
    startDate: Date;

    @IsDateString()
    endDate: Date;
}