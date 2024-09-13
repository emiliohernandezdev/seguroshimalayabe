import { BaseResponse } from "src/utilities/BaseResponse.dto";
import { User } from "../../user.entity";

export class ValidateUserResponse extends BaseResponse{
    public user: User = null;
    public token: string = '';
}