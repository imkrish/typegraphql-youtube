import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { TodoService } from "./todo.service";
import { NewTodoInput, UpdatedTodoInput } from "./todo.input";
import { Todo } from "./todo.type";

@Resolver()
export class TodoResolver {
  constructor(private todoService: TodoService) {}

  @Query(returns => [Todo])
  getTodos(
    @Arg("skip", { nullable: true }) skip: number,
    @Arg("take", { nullable: true }) take: number
  ): Promise<Todo[]> {
    return this.todoService.getTodos(skip, take);
  }

  @Query(returns => Todo)
  getTodo(@Arg("id") id: string): Promise<Todo | null> {
    return this.todoService.getTodoById(id);
  }

  @Mutation(returns => Todo)
  createTodo(@Arg("newTodo") newTodo: NewTodoInput): Promise<Todo> {
    return this.todoService.createTodo(newTodo);
  }

  @Mutation(returns => Boolean)
  deleteTodo(@Arg("id") id: string): Promise<boolean> {
    return this.todoService.deleteTodo(id);
  }

  @Mutation(returns => Todo)
  updateTodo(
    @Arg("id") id: string,
    @Arg("updatedTodo") updatedTodo: UpdatedTodoInput
  ): Promise<Todo | null> {
    return this.todoService.updateTodo(id, updatedTodo);
  }
}
