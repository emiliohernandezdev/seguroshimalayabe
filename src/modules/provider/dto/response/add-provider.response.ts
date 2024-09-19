import { BaseResponse } from "src/utilities/BaseResponse.dto";
import { Provider } from "../../provider.entity";

export class ResponseAddProvider extends BaseResponse{
    public provider: Provider = null;
}