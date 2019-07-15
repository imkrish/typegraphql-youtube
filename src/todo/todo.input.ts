import { Field, InputType } from "type-graphql";
import { Todo } from "./todo.model";

@InputType()
export class NewTodoInput implements Partial<Todo> {
  @Field()
  todo!: string;
}

@InputType()
export class UpdatedTodoInput implements Partial<Todo> {
  @Field({ nullable: true })
  todo?: string;

  @Field({ nullable: true })
  completed?: boolean;
}
