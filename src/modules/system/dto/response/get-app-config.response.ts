import { BaseResponse } from "src/utilities/BaseResponse.dto";
import { Config } from "../../config.entity";

export class GetAppConfigResponse extends BaseResponse{
    public config: Config[] = null;
}