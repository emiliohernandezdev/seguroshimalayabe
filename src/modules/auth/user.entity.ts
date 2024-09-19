import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../role/role.entity";
import { RequestEntity } from "../request/request.entity";
import { RequestDetail } from "../request/request-detail.entity";

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({type: 'varchar'})
    displayName: string;

    @Column({type: 'varchar', unique: true})
    email: string;

    @Column({type: 'varchar', enum: ['local', 'google'], default: 'local'})
    authProvider: string;

    @Column({type: 'boolean', default: true})
    enabled: boolean;

    @ManyToOne(() => Role, role => role.users)
    role: Role;

    @OneToMany(() => RequestEntity, (request) => request.user)
    requests: RequestEntity[];

    @OneToMany(() => RequestDetail, (requestDet) => requestDet.user)
    requestDetails: RequestDetail[];
}