export class BaseResponse{

    public success: boolean = false;

    public message: string = '';

    public data: any = [];

    constructor(success?: boolean, message?: string, data?: any){
        this.success = success;
        this.message = message;
        this.data = data;
    }
}