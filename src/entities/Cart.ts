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
export class Cart extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  //   @Field(() => String)
  //   @CreateDateColumn()
  //   createdAt: Date;

  //   @Field(() => String)
  //   @UpdateDateColumn()
  //   updatedAt: Date;

  @Field(() => User)
  @OneToOne(() => User, (user) => user.cart)
  user: User;

  @Field(() => LineItem)
  @OneToMany(() => LineItem, (lineitem) => lineitem.cart)
  lineItems: LineItem[];
}
