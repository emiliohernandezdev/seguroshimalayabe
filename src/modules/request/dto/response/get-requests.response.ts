import { BaseResponse } from "src/utilities/BaseResponse.dto";
import { RequestEntity } from "../../request.entity";

export class GetRequestsResponse extends BaseResponse {
    public requests: RequestEntity[] = [];
}