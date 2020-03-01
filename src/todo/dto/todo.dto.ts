import { ObjectType, Field, ID } from 'type-graphql';
import { MaxLength } from 'class-validator';

// データ転送オブジェクト
@ObjectType()
export class TodoDto {
  @Field(() => ID)
  readonly id: number;

  @MaxLength(20)
  @Field()
  readonly title: string;
}
