import { Body, Controller, Get, Patch, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ValidateUserRequestDto } from "./dto/request/validate-request.dto";
import { ChangeRoleRequestDto } from "./dto/request/change-role.request";

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

    @Patch('changeRole')
    public async changeRole(@Body() body: ChangeRoleRequestDto){
        return await this.authService.changeRole(body.uuidUser, body.uuidRole);
    }
}