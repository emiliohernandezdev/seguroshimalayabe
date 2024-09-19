import { BaseResponse } from "src/utilities/BaseResponse.dto";
import { Product } from "../../product.entity";

export class GetProductsResponse extends BaseResponse{
    public products: Product[] = [];
}