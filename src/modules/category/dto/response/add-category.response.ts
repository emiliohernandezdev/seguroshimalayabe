import { BaseResponse } from "src/utilities/BaseResponse.dto";
import { Category } from "../../category.entity";

export class AddCategoryResponse extends BaseResponse{
    public category: Category =null;
}