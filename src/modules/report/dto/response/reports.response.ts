import { BaseResponse } from "src/utilities/BaseResponse.dto";

export class ReportsResponse extends BaseResponse{
    public users: number = 0;
    public categories: number = 0;
    public clients: number = 0;
    public products: number = 0;
    public providers: number = 0;
    public requests: number = 0;
}