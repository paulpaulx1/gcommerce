import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { Field, Int, ObjectType } from 'type-graphql';

import { User } from './User';
import { LineItem } from './LineItem';

@ObjectType()
@Entity()
export class Product extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column({ unique: true })
  imageUrl!: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  price!: number;
}
