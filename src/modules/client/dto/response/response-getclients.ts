import { BaseResponse } from "src/utilities/BaseResponse.dto";
import { Client } from "../../client.entity";

export class GetClientsResponse extends BaseResponse{
    public clients: Client[] = [];
}