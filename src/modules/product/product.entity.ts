import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../category/category.entity";
import { Provider } from "../provider/provider.entity";

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

    @ManyToMany(() => Provider, (provider) => provider.products)
    @JoinTable()
    providers: Provider[];
}