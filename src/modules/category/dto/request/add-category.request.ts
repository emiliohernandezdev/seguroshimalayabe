import { IsString } from "class-validator";

export class AddCategoryRequest{
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    color: string;
}