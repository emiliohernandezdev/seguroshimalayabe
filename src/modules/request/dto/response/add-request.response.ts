import { BaseResponse } from "src/utilities/BaseResponse.dto";
import { RequestEntity } from "../../request.entity";

export class AddRequestResponse extends BaseResponse {
    public request: RequestEntity = null;
}