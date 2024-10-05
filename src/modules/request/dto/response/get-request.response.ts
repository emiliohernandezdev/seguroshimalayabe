import { BaseResponse } from "src/utilities/BaseResponse.dto";
import { RequestEntity } from "../../request.entity";

export class GetRequestResponse extends BaseResponse{
    public request: RequestEntity = null;
}