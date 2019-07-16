import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { TodoService } from "./todo.service";
import { NewTodoInput, UpdatedTodoInput } from "./todo.input";
import { Todo } from "./todo.type";

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

  @Query(returns => Todo)
  getTodo(@Arg("id") id: string): Todo | undefined {
    return this.todoService.getTodoById(id);
  }

  @Mutation(returns => Todo)
  createTodo(@Arg("newTodo") newTodo: NewTodoInput): Todo {
    return this.todoService.createTodo(newTodo);
  }

  @Mutation()
  deleteTodo(@Arg("id") id: string): boolean {
    return this.todoService.deleteTodo(id);
  }

  @Mutation(returns => Todo)
  updateTodo(
    @Arg("id") id: string,
    @Arg("updatedTodo") updatedTodo: UpdatedTodoInput
  ): Todo | undefined {
    return this.todoService.updateTodo(id, updatedTodo);
  }
}
