import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  link: string;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}