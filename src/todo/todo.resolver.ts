import { Arg, Query, Resolver } from "type-graphql";
import { Todo } from "./todo.model";
import { TodoService } from "./todo.service";

@Resolver()
export class TodoResolver {
  constructor(private todoService = new TodoService()) {}

  @Query(returns => [Todo])
  getTodos(
    @Arg("skip", { nullable: true }) skip: number,
    @Arg("take", { nullable: true }) take: number
  ): Todo[] {
    return this.todoService.getTodos(skip, take);
  }
}
