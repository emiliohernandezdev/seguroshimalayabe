import { BaseResponse } from "src/utilities/BaseResponse.dto";

export class DeleteCategoryResponse extends BaseResponse{
    public deleted: boolean = false;
}