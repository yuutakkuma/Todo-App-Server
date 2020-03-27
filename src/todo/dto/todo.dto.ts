import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class TodoDto {
  @Field(() => ID)
  readonly id: number;

  @Field()
  readonly title: string;

  @Field()
  readonly userId: number;
}
