import {
  Resolver,
  Mutation,
  Arg,
  Field,
  Ctx,
  ObjectType,
  Query,
  FieldResolver,
  Root,
  Int,
} from 'type-graphql';
import { MyContext } from '../types';
import { User } from '../entities/User';
import argon2 from 'argon2';
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from '../constants';
import { v4 } from 'uuid';
import { getConnection } from 'typeorm';
import { FieldError } from '../utils/fieldError';
import { Product } from '../entities/Product';
import { Cart } from '../entities/Cart';
import { LineItem } from '../entities/LineItem';

@ObjectType()
class PurchaseResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Cart, { nullable: true })
  cart?: Cart;
}

@Resolver(Cart)
export class CartResolver {
  @Mutation(() => Cart)
  async addToCart(
    @Arg('productId') productId: number,
    @Ctx() { req }: MyContext
  ): Promise<Cart | null> {
    const currentUser = await User.findOne({
      where: { id: req.session.userId },
    });
    if (!currentUser) {
      return null;
    }

    const currentProduct = await Product.findOneOrFail({
      where: { id: productId },
    });

    if (!currentUser.cart) {
      const cart = await Cart.create({ lineItems: [currentProduct] });
      currentUser.cart = cart;
    } else {
      const newItem = await LineItem.create({ product: currentProduct });
      currentUser.cart.lineItems.push(newItem);
    }
    return null;
  }

  @Mutation(() => Cart)
  async removeFromCart(
    @Arg('productId') productId: number,
    @Ctx() { req }: MyContext
  ): Promise<Cart | null> {
    const currentUser = await User.findOneOrFail({
      where: { id: req.session.userId },
    });

    //if there is one product
    currentUser.cart.lineItems.filter((item) => item.id !== productId);
    return null;
  }
}
