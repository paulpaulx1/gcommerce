import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import { Cart } from './Cart';
import { Product } from './Product';

@ObjectType()
@Entity()
export class LineItem extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => Int)
  @ManyToOne(() => Product)
  product: Product;

  @Field(() => Cart)
  @ManyToOne(() => Cart)
  cart: Cart;
}
