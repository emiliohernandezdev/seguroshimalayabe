import { BaseResponse } from "src/utilities/BaseResponse.dto";
import { Product } from "../../product.entity";

export class AddProductResponse extends BaseResponse{
    public product: Product = null;
}