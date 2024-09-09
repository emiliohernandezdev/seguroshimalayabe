import { BaseResponse } from "src/utilities/BaseResponse.dto";
import { Role } from "../../role.entity";

export class GetRolesResponse extends BaseResponse{
    public roles: Role[] = [];
}