import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Todo {
  @Field(returns => String)
  _id!: any;

  @Field()
  todo!: string;

  @Field()
  completed!: boolean;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
