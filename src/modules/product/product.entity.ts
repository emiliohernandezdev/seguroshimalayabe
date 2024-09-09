import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../category/category.entity";

@Entity()
export class Product{
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({type: 'varchar'})
    name: string;

    @Column({type: 'varchar'})
    description: string;

    @Column({type: 'decimal', precision: 10, scale: 2})
    price: number;

    @Column({type: 'boolean', default: true})
    isAvailable: boolean;

    @ManyToOne(() => Category, (category) => category.products)
    category: Category;
}