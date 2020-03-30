import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class UserDto {
  @Field(() => ID)
  readonly id: number;

  @Field()
  readonly userName: string;

  @Field()
  readonly email: string;

  readonly password: string;

  @Field()
  readonly loginStatus: boolean;
}
