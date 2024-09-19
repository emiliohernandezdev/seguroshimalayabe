import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Client{
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column({unique: true})
    email: string;

    @Column()
    bornDate: Date;

    @Column({type: 'varchar'})
    gender: string;

    @Column()
    address: string;

    @Column()
    phone: string;
    
    @Column()
    type: string;
}