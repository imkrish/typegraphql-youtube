import { Field, InputType } from "type-graphql";
import { Todo } from "./todo.model";

@InputType()
export class NewTodoInput implements Partial<Todo> {
  @Field()
  todo!: string;
}
