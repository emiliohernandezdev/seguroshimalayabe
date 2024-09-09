import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ValidateUserRequestDto } from "./dto/request/validate-request.dto";

@Controller('auth')
export class AuthController{
    constructor(private readonly authService: AuthService){}


    @Post('validate')
    public async validateUser(@Body() body: ValidateUserRequestDto){
        return await this.authService.validateUser(body);
    }

    @Get('users')
    public async getUsers(){
        return await this.authService.getUsers();
    }
}