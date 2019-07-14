import {Arg, Mutation, Query, Resolver} from "type-graphql";
import { Todo } from "./todo.model";
import { TodoService } from "./todo.service";
import {NewTodoInput} from "./todo.input";

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
  getTodo(
      @Arg('id') id: string
  ): Todo | undefined {
      return this.todoService.getTodoById(id)
  }

  @Mutation(returns => Todo)
  createTodo(@Arg('newTodo') newTodo: NewTodoInput): Todo {
    return this.todoService.createTodo(newTodo)
  }
}
