import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../auth/user.entity";
import { Product } from "../product/product.entity";

@Entity('request')
export class RequestEntity{
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({type: 'varchar'})
    name: string;

    @Column({type: 'varchar'})
    description: string;

    @Column({type: 'text'})
    data: string;

    @Column({type: 'varchar', default: 'sended', enum: ['sended','inprogress', 'approved', 'rejected']})
    state: string;

    @ManyToOne(() => User, (user) => user.requests)
    user: User

    @ManyToOne(() => Product, (product) => product.requests)
    product: Product;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updatedAt: Date;
}