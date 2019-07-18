import { NewTodoInput, UpdatedTodoInput } from "./todo.input";
import { Todo } from "./todo.type";
import { TodoRepo } from "./todo.repo";
import { Service } from "typedi";

@Service()
export class TodoService {
  constructor(private todoRepo: TodoRepo) {}

  getTodos(skip?: number, take?: number): Promise<Todo[]> {
    return this.todoRepo.find(skip, take);
  }

  getTodoById(id: string): Promise<Todo | null> {
    return this.todoRepo.findById(id);
  }

  createTodo(newTodo: NewTodoInput): Promise<Todo> {
    return this.todoRepo.create(newTodo);
  }

  async deleteTodo(id: string): Promise<boolean> {
    const deletedTodo = await this.todoRepo.deleteById(id);
    return Boolean(deletedTodo);
  }

  updateTodo(id: string, updatedTodo: UpdatedTodoInput): Promise<Todo | null> {
    return this.todoRepo.update(id, updatedTodo);
  }
}
