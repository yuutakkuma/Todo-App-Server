import { ObjectType, Field, ID } from 'type-graphql';
import { User } from 'src/user/entity/user.entity';

@ObjectType()
export class TodoDto {
  @Field(() => ID)
  readonly id: number;

  @Field()
  readonly title: string;

  @Field()
  readonly userId: number;

  @Field()
  readonly user: User;
}
