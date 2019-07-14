import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Todo {
  @Field()
  id!: string;

  @Field()
  todo!: string;

  @Field()
  createdTimestamp!: number;

  @Field()
  completed!: boolean;
}
