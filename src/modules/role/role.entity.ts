import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role{
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({type: 'varchar'})
    name: string;

    @Column({type: 'varchar'})
    label: string;

    @Column({type: 'varchar'})
    description: string;
}