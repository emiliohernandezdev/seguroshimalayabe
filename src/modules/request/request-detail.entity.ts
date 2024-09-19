import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../auth/user.entity";

@Entity()
export class RequestDetail{

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    name: string;

    @Column({type: 'varchar'})
    description: string;

    @ManyToOne(() => User, (user) => user.requestDetails)
    user: User;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updatedAt: Date;
}