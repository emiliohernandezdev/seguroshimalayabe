import { BaseResponse } from "src/utilities/BaseResponse.dto";
import { Category } from "../../category.entity";

export class GetCategoriesResponse extends BaseResponse{
    public categories: Category[] = [];
}