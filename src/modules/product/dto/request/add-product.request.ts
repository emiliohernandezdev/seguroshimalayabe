import { IsBoolean, IsBooleanString, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";
import { Category } from "src/modules/category/category.entity";
import { Provider } from "src/modules/provider/provider.entity";

export class AddProductRequest{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    price: number;

    @IsBoolean()
    isAvailable: boolean;

    category: Category;

    provider: Provider;
}