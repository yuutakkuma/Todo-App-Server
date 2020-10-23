import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class UserDto {
  @Field(() => ID)
  readonly id: number;

  @Field()
  readonly nickname: string;

  @Field()
  readonly email: string;

  @Field()
  readonly accessToken: string;
}
