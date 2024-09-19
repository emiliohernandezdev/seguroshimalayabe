import { BaseResponse } from "src/utilities/BaseResponse.dto";
import { Client } from "../../client.entity";

export class GetClientInfoResponse extends BaseResponse{
    public client: Client = null;
}