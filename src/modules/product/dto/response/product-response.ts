import { BaseResponse } from "src/utilities/BaseResponse.dto";
import { Product } from "../../product.entity";

export class GetProductResponse extends BaseResponse{
    public product: Product = null;
}