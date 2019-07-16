import { Todo } from "./todo.type";

export class TodoUtil {
  static getNewTodo(todo: string): Todo {
    return {
      _id: Date.now().toString(),
      todo,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
}
