import { Length, IsEmail } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 20, { message: 'ニックネームは1文字以上、20文字以下です。' })
  nickName: string;

  @Field()
  @IsEmail({}, { message: 'Emailを入力してください。' })
  email: string;

  @Field()
  @Length(4, 16, { message: 'パスワードは4文字以上、16文字以下です。' })
  password: string;
}
