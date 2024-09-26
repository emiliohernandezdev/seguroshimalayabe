import { Role } from "src/modules/role/role.entity";
import { BaseResponse } from "src/utilities/BaseResponse.dto";
import { User } from "../../user.entity";

export class ChangeRoleResponse extends BaseResponse{
    public user: User = null;
    public role: Role = null;
}