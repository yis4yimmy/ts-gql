import argon from "argon2";
import { IsEmail, IsPhoneNumber, Length } from "class-validator";
import { Arg, Field, InputType, Mutation, Resolver } from "type-graphql";

import { User } from "../../entities/User";

@InputType()
class RegisterInput {
  @Field()
  @Length(2, 30)
  username: string;

  @Field()
  @IsEmail()
  @Length(5, 255)
  email: string;

  @Field({ nullable: true })
  @IsPhoneNumber()
  phone?: string;

  @Field()
  @Length(6, 30)
  password: string;
}

@Resolver()
export class Register {
  @Mutation(() => Boolean)
  async register(
    @Arg("user") { password, username, email, phone }: RegisterInput
  ): Promise<boolean> {
    const hashedPassword = await argon.hash(password);

    const user = User.create({
      username,
      email,
      phone,
      password: hashedPassword,
    });

    await user.save();

    return true;
  }
}
