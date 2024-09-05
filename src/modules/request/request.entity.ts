import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('request')
export class RequestEntity{
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    
}