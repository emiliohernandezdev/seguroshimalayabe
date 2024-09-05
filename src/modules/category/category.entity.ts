import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "../product/product.entity";

@Entity()
export class Category{
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({type: 'varchar'})
    name: string;

    @Column({type: 'varchar'})
    description: string;

    @Column({type: 'varchar'})
    color: string;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updatedAt: Date;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];
}