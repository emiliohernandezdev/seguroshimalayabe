import { BaseResponse } from "src/utilities/BaseResponse.dto";
import { Provider } from "../../provider.entity";

export class ResponseGetProviders extends BaseResponse{
    public providers: Provider[] = [];
}