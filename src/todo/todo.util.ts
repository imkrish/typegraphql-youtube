import { Todo } from "./todo.model";

export class TodoUtil {
  static getNewTodo(todo: string): Todo {
    return {
      id: Date.now().toString(),
      todo,
      completed: false,
      createdTimestamp: Date.now()
    };
  }
}
