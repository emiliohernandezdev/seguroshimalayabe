import { BaseResponse } from "src/utilities/BaseResponse.dto";
import { User } from "../../user.entity";

export class GetUsersResponse extends BaseResponse{

    public users: User[] = [];
}