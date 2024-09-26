import { IsUUID } from "class-validator"

export class ChangeRoleRequestDto {
    @IsUUID()
    uuidUser: string

    @IsUUID()
    uuidRole: string
}