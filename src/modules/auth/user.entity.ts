import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}