import { Length, IsEmail } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 30, { message: 'ニックネームは1文字以上、30文字以下です。' })
  nickName: string;

  @Field()
  @IsEmail({}, { message: 'Emailを入力してください。' })
  email: string;

  @Field()
  password: string;
}
