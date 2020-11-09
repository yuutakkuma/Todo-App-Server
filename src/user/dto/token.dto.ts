import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class TokenDto {
  @Field()
  readonly refreshToken: string;
}
