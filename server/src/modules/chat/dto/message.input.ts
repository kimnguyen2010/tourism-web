import { Field, InputType } from "@nestjs/graphql";
import { IsIn, IsString } from "class-validator";

@InputType()
export class MessageInput {
  @Field()
  @IsString()
  @IsIn(["user", "assistant"])
  role!: string;

  @Field()
  @IsString()
  content!: string;
}
