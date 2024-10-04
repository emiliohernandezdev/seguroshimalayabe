import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../category/category.entity";
import { Provider } from "../provider/provider.entity";
import { RequestEntity } from "../request/request.entity";

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

    @Column({type: 'varchar', default: 'client', enum: ['client', 'house', 'car', 'merchandising', 'other']})
    formType: string;

    @ManyToOne(() => Category, (category) => category.products)
    category: Category;

    @ManyToOne(() => Provider, (provider) => provider.products)
    provider: Provider;

    @OneToMany(() => RequestEntity, (request) => request.product)
    requests: RequestEntity[];

}